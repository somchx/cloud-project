# API Documentation

Base URL: `http://localhost:8000`

## Authentication
Currently, no authentication is required. For production, implement JWT or OAuth2.

---

## Categories API

### Get All Categories
```http
GET /categories/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "ขนม",
    "description": "ขนมและของว่าง"
  }
]
```

### Create Category
```http
POST /categories/
Content-Type: application/json

{
  "name": "ขนม",
  "description": "ขนมและของว่าง"
}
```

### Get Single Category
```http
GET /categories/{category_id}
```

---

## Products API

### Get All Products
```http
GET /products/
```

**Query Parameters:**
- `category_id` (optional): Filter by category
- `search` (optional): Search by product name

**Example:**
```http
GET /products/?category_id=1
GET /products/?search=น้ำ
GET /products/?category_id=1&search=โค้ก
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "น้ำดื่ม 600ml",
    "price": 7.0,
    "category_id": 2,
    "stock": 100,
    "image_url": null,
    "category": {
      "id": 2,
      "name": "เครื่องดื่ม",
      "description": "น้ำดื่มและเครื่องดื่มต่างๆ"
    }
  }
]
```

### Create Product
```http
POST /products/
Content-Type: application/json

{
  "name": "น้ำดื่ม 600ml",
  "price": 7.0,
  "category_id": 2,
  "stock": 100,
  "image_url": "https://example.com/image.jpg"
}
```

### Get Single Product
```http
GET /products/{product_id}
```

### Update Product
```http
PUT /products/{product_id}
Content-Type: application/json

{
  "name": "น้ำดื่ม 600ml",
  "price": 8.0,
  "stock": 150
}
```

**Note:** All fields are optional in update

### Delete Product
```http
DELETE /products/{product_id}
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Sales API

### Get All Sales
```http
GET /sales/
```

**Response:**
```json
[
  {
    "id": 1,
    "total_amount": 47.0,
    "created_at": "2025-12-01T10:30:00",
    "items": [
      {
        "id": 1,
        "sale_id": 1,
        "product_id": 1,
        "quantity": 2,
        "price": 7.0,
        "product": {
          "id": 1,
          "name": "น้ำดื่ม 600ml",
          "price": 7.0,
          "category_id": 2,
          "stock": 98,
          "image_url": null
        }
      }
    ]
  }
]
```

### Create Sale (Checkout)
```http
POST /sales/
Content-Type: application/json

{
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 7.0
    },
    {
      "product_id": 5,
      "quantity": 1,
      "price": 13.0
    }
  ]
}
```

**Note:** 
- `total_amount` is calculated automatically
- Product stock is decreased automatically
- Price should be the current product price

**Response:**
```json
{
  "id": 1,
  "total_amount": 27.0,
  "created_at": "2025-12-01T10:30:00",
  "items": [...]
}
```

### Get Single Sale
```http
GET /sales/{sale_id}
```

---

## Dashboard API

### Get Dashboard Statistics
```http
GET /dashboard/stats
```

**Response:**
```json
{
  "total_sales_today": 1250.50,
  "total_orders_today": 15,
  "top_selling_products": [
    {
      "id": 1,
      "name": "น้ำดื่ม 600ml",
      "total_sold": 45
    },
    {
      "id": 5,
      "name": "โค้ก 325ml",
      "total_sold": 32
    }
  ]
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "detail": "Product not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "price"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Data Models

### Category
```typescript
{
  id: number
  name: string
  description?: string
}
```

### Product
```typescript
{
  id: number
  name: string
  price: number
  category_id: number
  stock: number
  image_url?: string
  category?: Category
}
```

### Sale
```typescript
{
  id: number
  total_amount: number
  created_at: datetime
  items: SaleItem[]
}
```

### SaleItem
```typescript
{
  id: number
  sale_id: number
  product_id: number
  quantity: number
  price: number
  product?: Product
}
```

---

## Example Usage (JavaScript/Axios)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Get products
const products = await axios.get(`${API_URL}/products/`);

// Create product
const newProduct = await axios.post(`${API_URL}/products/`, {
  name: 'น้ำดื่ม 600ml',
  price: 7.0,
  category_id: 2,
  stock: 100
});

// Create sale
const sale = await axios.post(`${API_URL}/sales/`, {
  items: [
    { product_id: 1, quantity: 2, price: 7.0 },
    { product_id: 5, quantity: 1, price: 13.0 }
  ]
});

// Get dashboard stats
const stats = await axios.get(`${API_URL}/dashboard/stats`);
```

---

## Example Usage (Python/Requests)

```python
import requests

API_URL = 'http://localhost:8000'

# Get products
response = requests.get(f'{API_URL}/products/')
products = response.json()

# Create product
new_product = {
    'name': 'น้ำดื่ม 600ml',
    'price': 7.0,
    'category_id': 2,
    'stock': 100
}
response = requests.post(f'{API_URL}/products/', json=new_product)

# Create sale
sale_data = {
    'items': [
        {'product_id': 1, 'quantity': 2, 'price': 7.0},
        {'product_id': 5, 'quantity': 1, 'price': 13.0}
    ]
}
response = requests.post(f'{API_URL}/sales/', json=sale_data)
```

---

## Interactive API Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These interfaces allow you to:
- View all endpoints
- Test API calls directly in the browser
- See request/response schemas
- Download OpenAPI specification

---

## Rate Limiting (Production)

For production, implement rate limiting:

```python
# Example with slowapi
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/products/")
@limiter.limit("100/minute")
async def get_products():
    ...
```

---

## CORS Configuration

Current CORS settings (Development):

```python
allow_origins=["*"]  # Allow all origins
```

Production CORS settings:

```python
allow_origins=[
    "https://yourdomain.com",
    "https://www.yourdomain.com"
]
```
