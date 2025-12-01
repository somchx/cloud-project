# 🛒 POS ร้านขายของชำ - ระบบขายของแบบครบวงจร

[![Deployed](https://img.shields.io/badge/Deployed-AWS-orange)](http://pos-grocery-frontend-1764571829.s3-website-ap-southeast-1.amazonaws.com)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](http://pos-backend-prod.eba-n3hivubt.ap-southeast-1.elasticbeanstalk.com/docs)
[![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)](http://pos-grocery-frontend-1764571829.s3-website-ap-southeast-1.amazonaws.com)

## 🌐 Live Demo

- **Frontend**: http://pos-grocery-frontend-1764571829.s3-website-ap-southeast-1.amazonaws.com
- **Backend API**: http://pos-backend-prod.eba-n3hivubt.ap-southeast-1.elasticbeanstalk.com
- **API Docs**: http://pos-backend-prod.eba-n3hivubt.ap-southeast-1.elasticbeanstalk.com/docs

## 📖 ภาพรวมโปรเจกต์

ระบบ POS (Point of Sale) สำหรับร้านขายของชำ พัฒนาด้วย **FastAPI** (Backend) และ **React** (Frontend) พร้อม **SQLite** Database และ Deploy บน **AWS** (Elastic Beanstalk + S3)

### ✨ ฟีเจอร์หลัก
- 🛒 **หน้าขายของ (POS)**: เลือกสินค้าได้หลายชิ้น คำนวณยอดรวมอัตโนมัติ
- 📦 **จัดการสินค้า**: เพิ่ม แก้ไข ลบสินค้า และตั้งราคา
- 📊 **Dashboard**: แสดงยอดขายวันนี้ จำนวนบิล และสินค้าขายดี
- 🏷️ **หมวดหมู่สินค้า**: จัดกลุ่มสินค้าตามประเภท
- 🔍 **ค้นหาสินค้า**: ค้นหาตามชื่อหรือหมวดหมู่
- ☁️ **Cloud Deployment**: Deploy แบบ Production-ready บน AWS

---

## 🏗️ โครงสร้างโปรเจกต์

```
pos-cloud/
├── backend/              # FastAPI Backend
│   ├── routers/
│   │   ├── categories.py
│   │   ├── products.py
│   │   ├── sales.py
│   │   └── dashboard.py
│   ├── database.py       # Database configuration
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── main.py           # FastAPI app entry point
│   ├── seed_data.py      # Sample data
│   ├── requirements.txt
│   └── Procfile          # For Elastic Beanstalk
│
├── frontend/             # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── POS.js
│   │   │   └── ProductManagement.js
│   │   ├── api.js        # API calls
│   │   ├── config.js     # Configuration
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## ☁️ AWS Deployment (Production)

### 🚀 Live URLs

ระบบนี้ถูก Deploy แล้วบน AWS:

- **🌐 Frontend**: http://pos-grocery-frontend-1764571829.s3-website-ap-southeast-1.amazonaws.com
- **🔌 Backend API**: http://pos-backend-prod.eba-n3hivubt.ap-southeast-1.elasticbeanstalk.com
- **📚 API Docs**: http://pos-backend-prod.eba-n3hivubt.ap-southeast-1.elasticbeanstalk.com/docs

### 📋 Architecture

```
User Browser → S3 (Frontend) → Elastic Beanstalk (Backend + SQLite)
```

### 🔄 Update Deployment

**Backend:**
```bash
cd backend
eb deploy pos-backend-prod
```

**Frontend:**
```bash
cd frontend
npm run build
aws s3 sync build/ s3://pos-grocery-frontend-1764571829/ --delete
```

---

## 🚀 วิธีรันโปรเจกต์ในเครื่อง (Local)

### Backend (FastAPI)

```bash
# 1. เข้าไปที่โฟลเดอร์ backend
cd backend

# 2. สร้าง virtual environment
python -m venv venv

# 3. Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 4. ติดตั้ง dependencies
pip install -r requirements.txt

# 5. สร้างข้อมูลตัวอย่าง (optional)
python seed_data.py

# 6. รัน server
uvicorn main:app --reload

# Backend จะรันที่: http://localhost:8000
# API Documentation: http://localhost:8000/docs
```

### Frontend (React)

```bash
# 1. เปิด Terminal ใหม่ และเข้าไปที่โฟลเดอร์ frontend
cd frontend

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างไฟล์ .env สำหรับ config
cp .env.example .env

# 4. รัน development server
npm start

# Frontend จะรันที่: http://localhost:3000
```

---

## 📡 API Endpoints

### Categories
- `GET /categories/` - ดึงรายการหมวดหมู่ทั้งหมด
- `POST /categories/` - สร้างหมวดหมู่ใหม่

### Products
- `GET /products/` - ดึงรายการสินค้า (รองรับ query: category_id, search)
- `POST /products/` - เพิ่มสินค้าใหม่
- `GET /products/{id}` - ดึงข้อมูลสินค้า
- `PUT /products/{id}` - แก้ไขสินค้า
- `DELETE /products/{id}` - ลบสินค้า

### Sales
- `GET /sales/` - ดึงประวัติการขายทั้งหมด
- `POST /sales/` - บันทึกการขาย
- `GET /sales/{id}` - ดึงข้อมูลการขาย

### Dashboard
- `GET /dashboard/stats` - ดึงสถิติยอดขาย

---

## ☁️ วิธี Deploy ไป AWS

### 1️⃣ Deploy Backend ไป AWS Elastic Beanstalk

#### ติดตั้ง EB CLI

```bash
# macOS
brew install awsebcli

# หรือใช้ pip
pip install awsebcli
```

#### Deploy Backend

```bash
# 1. เข้าไปที่โฟลเดอร์ backend
cd backend

# 2. Initialize Elastic Beanstalk
eb init -p python-3.11 pos-backend --region us-east-1

# 3. สร้าง environment และ deploy
eb create pos-backend-env

# 4. เปิด application
eb open

# 5. ดูสถานะ
eb status

# 6. Deploy อัพเดทใหม่
eb deploy
```

#### คำสั่งที่เป็นประโยชน์

```bash
# ดู logs
eb logs

# SSH เข้า server
eb ssh

# ตั้งค่า environment variables
eb setenv API_KEY=your_key

# ลบ environment
eb terminate pos-backend-env
```

#### ⚠️ สำคัญ: หลัง Deploy Backend

1. คัดลอก URL ของ Backend (เช่น `http://pos-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com`)
2. เก็บ URL นี้ไว้สำหรับตั้งค่า Frontend

---

### 2️⃣ Deploy Frontend ไป AWS S3 Static Website

#### สร้าง S3 Bucket

```bash
# ใช้ AWS CLI หรือ AWS Console
aws s3 mb s3://pos-grocery-frontend --region us-east-1
```

#### Deploy Frontend

```bash
# 1. เข้าไปที่โฟลเดอร์ frontend
cd frontend

# 2. แก้ไขไฟล์ .env ให้ชี้ไปที่ Backend URL
# สร้างไฟล์ .env.production
echo "REACT_APP_API_URL=http://your-backend-url.elasticbeanstalk.com" > .env.production

# 3. Build production
npm run build

# 4. Upload ไป S3
aws s3 sync build/ s3://pos-grocery-frontend --delete

# 5. ตั้งค่า S3 เป็น Static Website Hosting
aws s3 website s3://pos-grocery-frontend --index-document index.html --error-document index.html

# 6. ตั้งค่า Public Access
aws s3api put-bucket-policy --bucket pos-grocery-frontend --policy file://bucket-policy.json
```

#### สร้างไฟล์ bucket-policy.json

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::pos-grocery-frontend/*"
    }
  ]
}
```

#### URL ของ Frontend

```
http://pos-grocery-frontend.s3-website-us-east-1.amazonaws.com
```

---

### 3️⃣ Deploy Frontend ด้วย AWS Amplify (ทางเลือก)

```bash
# 1. ติดตั้ง Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure Amplify
amplify configure

# 3. Initialize Amplify ในโฟลเดอร์ frontend
cd frontend
amplify init

# 4. Add Hosting
amplify add hosting

# เลือก: Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)

# 5. Publish
amplify publish
```

---

## 🔐 วิธี Push ไปที่ GitHub

```bash
# 1. สร้าง Git repository ในโฟลเดอร์หลัก
cd pos-cloud
git init

# 2. เพิ่ม remote repository
git remote add origin https://github.com/somchx/cloud-project.git

# 3. เพิ่มไฟล์ทั้งหมด
git add .

# 4. Commit
git commit -m "Initial POS grocery system"

# 5. Push ไป GitHub
git branch -M main
git push -u origin main
```

### คำสั่ง Git เพิ่มเติม

```bash
# ดูสถานะไฟล์
git status

# Pull อัพเดทล่าสุด
git pull origin main

# สร้าง branch ใหม่
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature

# Push branch
git push origin feature/new-feature
```

---

## 🗄️ Database Schema

### Categories Table
```sql
- id: Integer (Primary Key)
- name: String (Unique)
- description: String (Nullable)
```

### Products Table
```sql
- id: Integer (Primary Key)
- name: String
- price: Float
- category_id: Integer (Foreign Key)
- stock: Integer
- image_url: String (Nullable)
```

### Sales Table
```sql
- id: Integer (Primary Key)
- total_amount: Float
- created_at: DateTime
```

### Sale_Items Table
```sql
- id: Integer (Primary Key)
- sale_id: Integer (Foreign Key)
- product_id: Integer (Foreign Key)
- quantity: Integer
- price: Float
```

---

## 🛠️ Tech Stack

**Backend:**
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- Uvicorn 0.24.0
- SQLite (Database)

**Frontend:**
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2

**Deployment:**
- AWS Elastic Beanstalk (Backend)
- AWS S3 / Amplify (Frontend)

---

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite:///./pos_grocery.db
CORS_ORIGINS=*
```

### Frontend (.env.production)
```
REACT_APP_API_URL=http://your-backend-url.elasticbeanstalk.com
```

---

## 🐛 Troubleshooting

### Backend ไม่รัน
```bash
# ตรวจสอบ Python version
python --version  # ต้อง >= 3.11

# ลองติดตั้ง dependencies ใหม่
pip install --upgrade -r requirements.txt
```

### Frontend ไม่รัน
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
- ตรวจสอบว่า Backend เปิด CORS สำหรับ Frontend URL แล้ว
- อัพเดท `allow_origins` ใน `main.py`

### Database Error
```bash
# ลบ database และสร้างใหม่
rm pos_grocery.db
python seed_data.py
```

---

## 📞 Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- GitHub Issues: https://github.com/somchx/cloud-project/issues

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Created by somchx

---

**Happy Coding! 🚀**
