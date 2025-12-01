# วิธี Push โปรเจกต์ไป GitHub

## ขั้นตอนการ Setup Git และ Push

### 1. Initialize Git Repository

```bash
# เข้าไปที่โฟลเดอร์โปรเจกต์หลัก
cd /Users/somchx/Desktop/pos-cloud

# สร้าง Git repository
git init
```

### 2. เพิ่ม Remote Repository

```bash
# เชื่อม local repository กับ GitHub
git remote add origin https://github.com/somchx/cloud-project.git

# ตรวจสอบ remote
git remote -v
```

### 3. เพิ่มไฟล์และ Commit

```bash
# เพิ่มไฟล์ทั้งหมด
git add .

# ตรวจสอบสถานะ
git status

# Commit พร้อมข้อความ
git commit -m "Initial POS grocery system"
```

### 4. Push ไป GitHub

```bash
# เปลี่ยน branch เป็น main
git branch -M main

# Push ขึ้น GitHub
git push -u origin main
```

---

## คำสั่ง Git ที่ใช้บ่อย

### ตรวจสอบสถานะ

```bash
# ดูไฟล์ที่เปลี่ยนแปลง
git status

# ดูประวัติ commit
git log
git log --oneline

# ดูการเปลี่ยนแปลงในไฟล์
git diff
```

### การ Commit

```bash
# เพิ่มไฟล์เฉพาะ
git add filename.txt

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Your commit message"

# Commit แบบละเอียด
git commit -m "Title" -m "Description of changes"

# แก้ไข commit ล่าสุด
git commit --amend -m "New message"
```

### การ Push และ Pull

```bash
# Push ไป GitHub
git push origin main

# Push และตั้งเป็น default
git push -u origin main

# Pull อัพเดทล่าสุดจาก GitHub
git pull origin main

# Fetch ข้อมูลโดยไม่ merge
git fetch origin
```

### การจัดการ Branch

```bash
# ดู branch ทั้งหมด
git branch

# สร้าง branch ใหม่
git branch feature/new-feature

# เปลี่ยน branch
git checkout feature/new-feature

# สร้างและเปลี่ยน branch พร้อมกัน
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature

# ลบ branch
git branch -d feature/new-feature

# Push branch ไป GitHub
git push origin feature/new-feature
```

### การยกเลิกการเปลี่ยนแปลง

```bash
# ยกเลิกการเปลี่ยนแปลงในไฟล์ (ยังไม่ได้ add)
git checkout -- filename.txt

# ยกเลิก git add
git reset HEAD filename.txt

# ยกเลิก commit ล่าสุด (เก็บการเปลี่ยนแปลงไว้)
git reset --soft HEAD~1

# ยกเลิก commit ล่าสุด (ลบการเปลี่ยนแปลง)
git reset --hard HEAD~1
```

---

## การทำงานแบบทีม (Collaboration)

### 1. Clone Repository

```bash
# Clone repository จาก GitHub
git clone https://github.com/somchx/cloud-project.git

# เข้าไปในโฟลเดอร์
cd cloud-project
```

### 2. Workflow สำหรับทีม

```bash
# 1. Pull อัพเดทล่าสุด
git pull origin main

# 2. สร้าง branch สำหรับ feature ใหม่
git checkout -b feature/add-payment

# 3. ทำงานและ commit
git add .
git commit -m "Add payment feature"

# 4. Push branch
git push origin feature/add-payment

# 5. สร้าง Pull Request บน GitHub
# (ทำใน GitHub Web Interface)

# 6. หลังจาก merge แล้ว
git checkout main
git pull origin main
git branch -d feature/add-payment
```

---

## .gitignore - ไฟล์ที่ไม่ต้อง Push

ไฟล์ `.gitignore` ที่สร้างไว้แล้วจะป้องกันไฟล์เหล่านี้:

```
# Python
__pycache__/
*.pyc
venv/
*.db

# Node
node_modules/
build/

# Environment
.env
.env.local

# OS
.DS_Store
```

---

## Commit Message Best Practices

### รูปแบบที่ดี

```bash
# Feature ใหม่
git commit -m "feat: Add product search functionality"

# Bug fix
git commit -m "fix: Fix cart calculation error"

# Documentation
git commit -m "docs: Update deployment instructions"

# Refactor
git commit -m "refactor: Improve database query performance"

# Style changes
git commit -m "style: Format code with prettier"

# Test
git commit -m "test: Add unit tests for sales API"
```

### ตัวอย่าง Commit Messages ที่ดี

```bash
git commit -m "feat: Add category filter in POS page"
git commit -m "fix: Resolve CORS issue in production"
git commit -m "perf: Optimize product loading speed"
git commit -m "docs: Add AWS deployment guide"
git commit -m "chore: Update dependencies to latest version"
```

---

## Troubleshooting

### ลืมเพิ่มไฟล์ใน commit

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

### Push ถูกปิดกั้น (non-fast-forward)

```bash
# ดึงอัพเดทล่าสุดและ merge
git pull origin main

# หรือ rebase
git pull --rebase origin main
```

### ลบไฟล์ที่ commit ไปแล้ว

```bash
# ลบจาก Git แต่เก็บไฟล์ไว้
git rm --cached filename.txt
git commit -m "Remove filename.txt from tracking"
```

### เปลี่ยน remote URL

```bash
# ดู remote ปัจจุบัน
git remote -v

# เปลี่ยน URL
git remote set-url origin https://github.com/somchx/cloud-project.git
```

---

## GitHub Workflow สำหรับโปรเจกต์นี้

### การทำงานครั้งแรก

```bash
cd /Users/somchx/Desktop/pos-cloud
git init
git remote add origin https://github.com/somchx/cloud-project.git
git add .
git commit -m "Initial POS grocery system"
git branch -M main
git push -u origin main
```

### การอัพเดทครั้งต่อไป

```bash
# แก้ไขโค้ด...

# เช็คว่าแก้ไขอะไรบ้าง
git status
git diff

# Commit
git add .
git commit -m "Update dashboard with real-time stats"

# Push
git push origin main
```

### การทำงานแบบมี Branch

```bash
# สร้าง branch สำหรับ feature ใหม่
git checkout -b feature/add-reports

# ทำงาน...
git add .
git commit -m "Add sales reports page"

# Push branch
git push origin feature/add-reports

# สร้าง Pull Request บน GitHub

# หลัง merge แล้ว กลับไป main
git checkout main
git pull origin main
git branch -d feature/add-reports
```

---

## Best Practices

1. **Commit บ่อยๆ**: อย่ารอจนเสร็จทั้งหมด
2. **Commit message ชัดเจน**: อธิบายว่าเปลี่ยนอะไร
3. **ใช้ branch**: แยก feature แต่ละอันออกจากกัน
4. **Pull ก่อน Push**: หลีกเลี่ยง conflict
5. **ตรวจสอบ .gitignore**: ไม่ push ไฟล์ที่ไม่จำเป็น
6. **Test ก่อน Commit**: แน่ใจว่าโค้ดทำงานได้

---

## Quick Reference

```bash
# Setup
git init
git remote add origin https://github.com/somchx/cloud-project.git

# Daily workflow
git pull origin main
git add .
git commit -m "Your message"
git push origin main

# Branch workflow
git checkout -b feature/name
git push origin feature/name
# Create Pull Request on GitHub
git checkout main
git pull origin main

# Emergency
git status              # ดูสถานะ
git log --oneline      # ดูประวัติ
git diff               # ดูการเปลี่ยนแปลง
```

---

**Happy Coding! 🚀**
