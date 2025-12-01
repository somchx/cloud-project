# Quick Start Guide

## รันโปรเจกต์แบบง่าย (macOS/Linux)

```bash
# ให้สิทธิ์รันสคริปต์
chmod +x start.sh

# รัน
./start.sh
```

## รันโปรเจกต์แบบง่าย (Windows)

```bash
# Double-click
start.bat

# หรือใน Command Prompt
start.bat
```

---

## รันแบบแยก Terminal

### Terminal 1 - Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# หรือ venv\Scripts\activate  # Windows
pip install -r requirements.txt
python seed_data.py
uvicorn main:app --reload
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

---

## เปิดใช้งาน

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

---

## ข้อมูล Login ตัวอย่าง

ระบบนี้ยังไม่มี Authentication
สามารถเข้าใช้งานได้เลยที่ http://localhost:3000

---

## ทดสอบระบบ

1. เปิด http://localhost:3000
2. ไปที่ "จัดการสินค้า" - ลองเพิ่มสินค้า
3. ไปที่ "ขายของ (POS)" - ลองขายสินค้า
4. ไปที่ "Dashboard" - ดูสถิติ

---

## หยุดการทำงาน

กด `Ctrl + C` ใน Terminal ที่รัน server
