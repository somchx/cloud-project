from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    price: float
    category_id: int
    stock: int = 0
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None

class Product(ProductBase):
    id: int
    category: Optional[Category] = None
    
    class Config:
        from_attributes = True

# Sale Item Schemas
class SaleItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float

class SaleItemCreate(SaleItemBase):
    pass

class SaleItem(SaleItemBase):
    id: int
    sale_id: int
    product: Optional[Product] = None
    
    class Config:
        from_attributes = True

# Sale Schemas
class SaleBase(BaseModel):
    total_amount: float

class SaleCreate(BaseModel):
    items: List[SaleItemCreate]

class Sale(SaleBase):
    id: int
    created_at: datetime
    items: List[SaleItem] = []
    
    class Config:
        from_attributes = True

# Dashboard Schemas
class DashboardStats(BaseModel):
    total_sales_today: float
    total_orders_today: int
    top_selling_products: List[dict]
