# Deploy Frontend to AWS S3 Static Website

## Method 1: AWS S3 Static Website Hosting

### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Frontend built successfully

### Step-by-Step Deployment

#### 1. Build Frontend

```bash
cd frontend

# Create production environment file
echo "REACT_APP_API_URL=http://your-backend-url.elasticbeanstalk.com" > .env.production

# Build for production
npm run build
```

#### 2. Create S3 Bucket

**Using AWS Console:**
1. Go to S3 Console
2. Click "Create bucket"
3. Bucket name: `pos-grocery-frontend` (must be unique globally)
4. Region: us-east-1
5. Uncheck "Block all public access"
6. Click "Create bucket"

**Using AWS CLI:**
```bash
aws s3 mb s3://pos-grocery-frontend --region us-east-1
```

#### 3. Upload Files to S3

```bash
# Upload build folder
aws s3 sync build/ s3://pos-grocery-frontend --delete

# Set files to public read
aws s3 sync build/ s3://pos-grocery-frontend --acl public-read --delete
```

#### 4. Enable Static Website Hosting

**Using AWS Console:**
1. Go to bucket → Properties
2. Scroll to "Static website hosting"
3. Click "Edit"
4. Enable "Static website hosting"
5. Index document: `index.html`
6. Error document: `index.html`
7. Save changes

**Using AWS CLI:**
```bash
aws s3 website s3://pos-grocery-frontend \
  --index-document index.html \
  --error-document index.html
```

#### 5. Set Bucket Policy

Create `bucket-policy.json`:
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

Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket pos-grocery-frontend \
  --policy file://bucket-policy.json
```

#### 6. Access Your Website

Your website will be available at:
```
http://pos-grocery-frontend.s3-website-us-east-1.amazonaws.com
```

### Update Deployment

After making changes:

```bash
# Build
npm run build

# Upload
aws s3 sync build/ s3://pos-grocery-frontend --delete --acl public-read
```

---

## Method 2: AWS Amplify (Recommended for Production)

### Advantages
- Automatic HTTPS
- Custom domains
- Continuous deployment from GitHub
- CDN included
- Easy rollback

### Step-by-Step Deployment

#### 1. Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

#### 2. Configure Amplify

```bash
amplify configure
```

Follow the prompts to:
1. Sign in to AWS Console
2. Create IAM user
3. Set up access keys

#### 3. Initialize Amplify

```bash
cd frontend
amplify init
```

Settings:
- Project name: pos-grocery-frontend
- Environment: production
- Default editor: Visual Studio Code
- App type: javascript
- Framework: react
- Source directory: src
- Distribution directory: build
- Build command: npm run build
- Start command: npm start

#### 4. Add Hosting

```bash
amplify add hosting
```

Choose:
- Hosting with Amplify Console (Managed hosting)
- Manual deployment

#### 5. Publish

```bash
amplify publish
```

#### 6. Set Environment Variables

In AWS Amplify Console:
1. Go to App Settings → Environment variables
2. Add: `REACT_APP_API_URL` = your backend URL
3. Redeploy

### Continuous Deployment from GitHub

```bash
amplify add hosting
```

Choose:
- Hosting with Amplify Console
- Continuous deployment

Then:
1. Connect to GitHub
2. Select repository: somchx/cloud-project
3. Select branch: main
4. Amplify will auto-deploy on every push

---

## Method 3: CloudFront + S3 (Enterprise)

### Advantages
- Global CDN
- HTTPS/SSL certificate
- Better performance
- Custom domain support

### Quick Setup

```bash
# Create S3 bucket (private)
aws s3 mb s3://pos-grocery-frontend-private

# Upload files
aws s3 sync build/ s3://pos-grocery-frontend-private

# Create CloudFront distribution (use AWS Console)
```

In AWS Console:
1. Go to CloudFront
2. Create Distribution
3. Origin: S3 bucket
4. Origin access: Origin access control
5. Viewer protocol: Redirect HTTP to HTTPS
6. Default root object: index.html

---

## Troubleshooting

### CORS Errors
Make sure backend allows frontend domain:
```python
# backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://pos-grocery-frontend.s3-website-us-east-1.amazonaws.com",
        "https://your-amplify-url.amplify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API URL Not Working
Check `.env.production`:
```bash
REACT_APP_API_URL=http://your-actual-backend-url.elasticbeanstalk.com
```

### 404 Errors on Refresh
For S3: Error document must be `index.html`
For Amplify: Add redirects in `amplify.yml`

---

## Cost Comparison

### S3 Static Hosting
- **Cost**: ~$0.50/month (low traffic)
- **Best for**: Development/Testing

### Amplify
- **Cost**: ~$1-5/month
- **Best for**: Production with CI/CD

### CloudFront + S3
- **Cost**: ~$1-10/month
- **Best for**: High traffic production

---

## Production Checklist

- [ ] Environment variables set correctly
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Error pages configured
- [ ] CORS properly configured
- [ ] API URL points to production backend
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Performance optimized (lazy loading, code splitting)

---

## Useful Commands

```bash
# Clear S3 bucket
aws s3 rm s3://pos-grocery-frontend --recursive

# Delete bucket
aws s3 rb s3://pos-grocery-frontend

# Amplify status
amplify status

# Amplify delete
amplify delete
```
