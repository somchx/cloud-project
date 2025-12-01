from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
import models
import schemas
from database import get_db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats", response_model=schemas.DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Get today's date range
    today = datetime.utcnow().date()
    tomorrow = today + timedelta(days=1)
    
    # Total sales today
    total_sales_today = db.query(func.sum(models.Sale.total_amount))\
        .filter(models.Sale.created_at >= today)\
        .filter(models.Sale.created_at < tomorrow)\
        .scalar() or 0.0
    
    # Total orders today
    total_orders_today = db.query(func.count(models.Sale.id))\
        .filter(models.Sale.created_at >= today)\
        .filter(models.Sale.created_at < tomorrow)\
        .scalar() or 0
    
    # Top selling products (all time)
    top_products = db.query(
        models.Product.id,
        models.Product.name,
        func.sum(models.SaleItem.quantity).label('total_sold')
    ).join(models.SaleItem)\
     .group_by(models.Product.id)\
     .order_by(func.sum(models.SaleItem.quantity).desc())\
     .limit(5)\
     .all()
    
    top_selling_products = [
        {
            "id": p.id,
            "name": p.name,
            "total_sold": p.total_sold
        }
        for p in top_products
    ]
    
    return {
        "total_sales_today": total_sales_today,
        "total_orders_today": total_orders_today,
        "top_selling_products": top_selling_products
    }
