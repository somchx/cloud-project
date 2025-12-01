from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

def seed_database():
    db = SessionLocal()
    
    # Create users (initial data - always exists)
    users_data = [
        {"email": "6710421004@stu.nida.ac.th", "password": "1234"},
        {"email": "6610421009@stu.nida.ac.th", "password": "1234"},
    ]
    
    # Clear existing users and recreate
    db.query(models.User).delete()
    
    for user_data in users_data:
        user = models.User(**user_data)
        db.add(user)
    
    db.commit()
    print("✅ Users created successfully!")
    
    # Create categories (skip if already exist)
    existing_categories = db.query(models.Category).count()
    if existing_categories > 0:
        print("✅ Categories already exist, skipping...")
        categories = db.query(models.Category).all()
    else:
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
        print("✅ Categories created successfully!")
    
    # Create products (skip if already exist)
    existing_products = db.query(models.Product).count()
    if existing_products > 0:
        print("✅ Products already exist, skipping...")
    else:
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
        print("✅ Products created successfully!")
    
    print("✅ Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    seed_database()
