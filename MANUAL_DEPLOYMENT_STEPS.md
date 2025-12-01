# 🚀 คำสั่ง Deploy ที่ต้องรันใน Terminal

## ขั้นตอนที่ 1: Deploy Backend ไป AWS Elastic Beanstalk

```bash
# 1. เข้าไปยังโฟลเดอร์ backend
cd /Users/somchx/Desktop/pos-cloud/backend

# 2. ตรวจสอบว่ามี .elasticbeanstalk
ls -la .elasticbeanstalk/

# 3. สร้าง environment (ใช้เวลา 5-10 นาที)
eb create pos-backend-prod --instance-type t3.micro --single

# 4. รอให้ deployment เสร็จ จะเห็นข้อความ:
# Environment details for: pos-backend-prod
# ...
# Successfully launched environment: pos-backend-prod

# 5. ดู URL ของ Backend
eb status

# 6. ทดสอบ Backend
eb open
# หรือ
curl http://pos-backend-prod.ap-southeast-1.elasticbeanstalk.com/
```

## ผลที่คาดหวัง

หลัง `eb create` สำเร็จ คุณจะเห็น:

```
Environment details for: pos-backend-prod
  Application name: pos-grocery-backend
  Region: ap-southeast-1
  Platform: Python 3.11
  CNAME: pos-backend-prod.ap-southeast-1.elasticbeanstalk.com
  Status: Ready
```

**🔴 สำคัญ:** เก็บ URL นี้ไว้:
```
http://pos-backend-prod.ap-southeast-1.elasticbeanstalk.com
```

---

## ขั้นตอนที่ 2: Deploy Frontend ไป AWS S3

หลังจาก Backend สำเร็จแล้ว รันคำสั่งเหล่านี้:

```bash
# 1. เข้าไปยังโฟลเดอร์ frontend
cd /Users/somchx/Desktop/pos-cloud/frontend

# 2. สร้างไฟล์ .env.production โดยใส่ Backend URL จริง
echo "REACT_APP_API_URL=http://pos-backend-prod.ap-southeast-1.elasticbeanstalk.com" > .env.production

# 3. Build frontend
npm run build

# 4. สร้าง S3 bucket (ชื่อต้องไม่ซ้ำใครในโลก)
aws s3 mb s3://pos-grocery-somchx --region ap-southeast-1

# 5. Upload ไป S3
aws s3 sync build/ s3://pos-grocery-somchx --delete

# 6. ตั้งค่า public access
aws s3api put-public-access-block \
  --bucket pos-grocery-somchx \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 7. Set ACL ให้ public-read
aws s3 sync build/ s3://pos-grocery-somchx --acl public-read --delete

# 8. เปิด Static Website Hosting
aws s3 website s3://pos-grocery-somchx \
  --index-document index.html \
  --error-document index.html

# 9. ตั้งค่า Bucket Policy
cat > /tmp/bucket-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::pos-grocery-somchx/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket pos-grocery-somchx \
  --policy file:///tmp/bucket-policy.json
```

**Frontend URL:**
```
http://pos-grocery-somchx.s3-website-ap-southeast-1.amazonaws.com
```

---

## ขั้นตอนที่ 3: อัพเดท CORS ใน Backend

```bash
cd /Users/somchx/Desktop/pos-cloud/backend
```

แก้ไขไฟล์ `main.py` บรรทัดที่มี `allow_origins`:

```python
allow_origins=[
    "http://pos-grocery-somchx.s3-website-ap-southeast-1.amazonaws.com",
    "http://localhost:3000"
],
```

จากนั้น deploy ใหม่:

```bash
git add .
git commit -m "Update CORS for production frontend"
git push origin main

cd backend
eb deploy
```

---

## ✅ Checklist

### Backend:
- [ ] `eb create` สำเร็จ
- [ ] `eb status` แสดง Status: Ready
- [ ] เข้า URL ได้ เห็น `{"message":"Welcome to POS Grocery System API"}`
- [ ] เข้า `/docs` ได้ เห็น Swagger UI

### Frontend:
- [ ] Build สำเร็จ (`npm run build`)
- [ ] Upload ไป S3 สำเร็จ
- [ ] เข้า S3 URL ได้
- [ ] เว็บโหลดสมบูรณ์

### CORS:
- [ ] แก้ไข `main.py` แล้ว
- [ ] `eb deploy` สำเร็จ
- [ ] Frontend เรียก Backend ได้ (ไม่มี CORS error)

---

## 🐛 Troubleshooting

### Backend deploy ล้มเหลว

```bash
# ดู logs
eb logs

# SSH เข้า server
eb ssh

# ตรวจสอบ Python version
python3 --version

# ตรวจสอบ dependencies
pip list
```

### Frontend ไม่แสดง

```bash
# ตรวจสอบ bucket
aws s3 ls s3://pos-grocery-somchx/

# ตรวจสอบ website configuration
aws s3api get-bucket-website --bucket pos-grocery-somchx

# ตรวจสอบ policy
aws s3api get-bucket-policy --bucket pos-grocery-somchx
```

### CORS Error

เช็คใน Browser Console:
- ถ้าเห็น "CORS policy" → อัพเดท `allow_origins` ใน `main.py`
- ถ้าเห็น "Network Error" → Backend อาจจะล่ม ตรวจสอบ `eb health`

---

## 📞 บอกผมเมื่อ...

1. **Backend deploy สำเร็จ** → บอก URL ของ Backend
2. **Frontend deploy สำเร็จ** → บอก URL ของ Frontend
3. **เจอ Error** → ส่ง error message มา

แล้วผมจะช่วยแก้ปัญหาต่อครับ! 🚀
