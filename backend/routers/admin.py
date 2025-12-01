from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/admin", tags=["admin"])

@router.post("/seed")
def seed_database(db: Session = Depends(get_db)):
    """Seed the database with initial data"""
    
    # Create users if they don't exist
    users_data = [
        {"email": "6710421004@stu.nida.ac.th", "password": "1234"},
        {"email": "6610421009@stu.nida.ac.th", "password": "1234"},
    ]
    
    existing_users = db.query(models.User).count()
    if existing_users == 0:
        for user_data in users_data:
            user = models.User(**user_data)
            db.add(user)
        db.commit()
        users_created = len(users_data)
    else:
        users_created = 0
    
    # Create categories if they don't exist
    existing_categories = db.query(models.Category).count()
    if existing_categories == 0:
        categories_data = [
            {"name": "ขนม", "description": "ขนมและของว่าง"},
            {"name": "เครื่องดื่ม", "description": "น้ำดื่มและเครื่องดื่มต่างๆ"},
            {"name": "ของใช้", "description": "ของใช้ในบ้าน"},
            {"name": "อาหารแห้ง", "description": "อาหารแห้งและของกระป๋อง"},
        ]
        
        for cat_data in categories_data:
            category = models.Category(**cat_data)
            db.add(category)
        db.commit()
        categories_created = len(categories_data)
    else:
        categories_created = 0
    
    # Create products if they don't exist
    existing_products = db.query(models.Product).count()
    if existing_products == 0:
        products_data = [
            {"name": "เลย์ รสออริจินัล", "price": 20, "category_id": 1, "stock": 50},
            {"name": "โดริโทส", "price": 25, "category_id": 1, "stock": 30},
            {"name": "ช็อคโกแลต", "price": 15, "category_id": 1, "stock": 40},
            {"name": "น้ำดื่ม 600ml", "price": 7, "category_id": 2, "stock": 100},
            {"name": "โค้ก 325ml", "price": 13, "category_id": 2, "stock": 60},
            {"name": "เป็ปซี่ 325ml", "price": 13, "category_id": 2, "stock": 60},
            {"name": "น้ำชาเขียว", "price": 15, "category_id": 2, "stock": 45},
            {"name": "ทิชชู่", "price": 30, "category_id": 3, "stock": 25},
            {"name": "ถุงขยะ", "price": 35, "category_id": 3, "stock": 20},
            {"name": "สบู่", "price": 25, "category_id": 3, "stock": 30},
            {"name": "มาม่า", "price": 7, "category_id": 4, "stock": 80},
            {"name": "ยำยำ", "price": 7, "category_id": 4, "stock": 70},
        ]
        
        for prod_data in products_data:
            product = models.Product(**prod_data)
            db.add(product)
        db.commit()
        products_created = len(products_data)
    else:
        products_created = 0
    
    return {
        "message": "Database seeded successfully",
        "users_created": users_created,
        "categories_created": categories_created,
        "products_created": products_created,
        "existing_users": db.query(models.User).count(),
        "existing_categories": db.query(models.Category).count(),
        "existing_products": db.query(models.Product).count()
    }
