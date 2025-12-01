from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

def seed_database():
    db = SessionLocal()
    
    # Create categories
    categories_data = [
        {"name": "ขนม", "description": "ขนมและของว่าง"},
        {"name": "เครื่องดื่ม", "description": "น้ำดื่มและเครื่องดื่มต่างๆ"},
        {"name": "ของใช้", "description": "ของใช้ในบ้าน"},
        {"name": "อาหารแห้ง", "description": "อาหารแห้งและของกระป๋อง"},
    ]
    
    categories = []
    for cat_data in categories_data:
        category = models.Category(**cat_data)
        db.add(category)
        categories.append(category)
    
    db.commit()
    
    # Create products
    products_data = [
        {"name": "เลย์ รสออริจินัล", "price": 20, "category_id": 1, "stock": 50},
        {"name": "โดริโทส", "price": 25, "category_id": 1, "stock": 30},
        {"name": "โปเกม่อน", "price": 15, "category_id": 1, "stock": 40},
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
    print("✅ Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    seed_database()
