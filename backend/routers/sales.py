from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/", response_model=List[schemas.Sale])
def get_sales(db: Session = Depends(get_db)):
    sales = db.query(models.Sale).all()
    return sales

@router.post("/", response_model=schemas.Sale)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    # Calculate total amount
    total_amount = sum(item.price * item.quantity for item in sale.items)
    
    # Create sale
    db_sale = models.Sale(total_amount=total_amount)
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    
    # Create sale items
    for item in sale.items:
        db_sale_item = models.SaleItem(
            sale_id=db_sale.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_sale_item)
        
        # Update product stock
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if product:
            product.stock -= item.quantity
    
    db.commit()
    db.refresh(db_sale)
    return db_sale

@router.get("/{sale_id}", response_model=schemas.Sale)
def get_sale(sale_id: int, db: Session = Depends(get_db)):
    sale = db.query(models.Sale).filter(models.Sale.id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale
