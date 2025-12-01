# วิธีติดตั้งและรันโปรเจกต์

## สำหรับ Backend (FastAPI)

### macOS / Linux

```bash
# 1. เข้าไปที่โฟลเดอร์ backend
cd backend

# 2. สร้าง virtual environment
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate

# 4. ติดตั้ง dependencies
pip install -r requirements.txt

# 5. สร้างข้อมูลตัวอย่าง
python seed_data.py

# 6. รัน server
uvicorn main:app --reload

# Backend จะรันที่: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Windows

```bash
# 1. เข้าไปที่โฟลเดอร์ backend
cd backend

# 2. สร้าง virtual environment
python -m venv venv

# 3. Activate virtual environment
venv\Scripts\activate

# 4. ติดตั้ง dependencies
pip install -r requirements.txt

# 5. สร้างข้อมูลตัวอย่าง
python seed_data.py

# 6. รัน server
uvicorn main:app --reload
```

---

## สำหรับ Frontend (React)

### ทุก OS (macOS, Linux, Windows)

```bash
# 1. เข้าไปที่โฟลเดอร์ frontend
cd frontend

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างไฟล์ .env
cp .env.example .env

# 4. รัน development server
npm start

# Frontend จะรันที่: http://localhost:3000
```

---

## การรันทั้งระบบพร้อมกัน

### ใช้ 2 Terminal

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # หรือ venv\Scripts\activate บน Windows
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## ตรวจสอบว่าทำงานได้

1. **Backend**: เปิด http://localhost:8000/docs
2. **Frontend**: เปิด http://localhost:3000
3. ลองเพิ่มสินค้าในหน้า "จัดการสินค้า"
4. ลองขายของในหน้า "ขายของ (POS)"
5. ดูสถิติในหน้า "Dashboard"

---

## Troubleshooting

### Backend ไม่รัน

```bash
# ตรวจสอบ Python version
python --version  # ต้อง >= 3.11

# ลองติดตั้ง dependencies ใหม่
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend ไม่รัน

```bash
# ลบและติดตั้ง node_modules ใหม่
rm -rf node_modules package-lock.json
npm install

# หรือใช้ yarn
yarn install
```

### Port 8000 ถูกใช้งานอยู่

```bash
# หา process ที่ใช้ port 8000
# macOS/Linux:
lsof -i :8000
kill -9 <PID>

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### CORS Error

ตรวจสอบว่า Backend เปิด CORS แล้ว:
```python
# backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    ...
)
```
