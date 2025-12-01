# Deploy Backend to AWS Elastic Beanstalk

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- EB CLI installed

## Step-by-Step Deployment

### 1. Install EB CLI

**macOS:**
```bash
brew install awsebcli
```

**Using pip:**
```bash
pip install awsebcli
```

### 2. Configure AWS Credentials

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

### 3. Deploy Backend

```bash
# Navigate to backend folder
cd backend

# Initialize Elastic Beanstalk
eb init -p python-3.11 pos-backend --region us-east-1

# Create environment and deploy
eb create pos-backend-env

# Wait for deployment to complete (5-10 minutes)

# Open application in browser
eb open
```

### 4. Test Deployment

Your backend API will be available at:
```
http://pos-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com
```

Test endpoints:
```bash
curl http://your-backend-url.elasticbeanstalk.com/
curl http://your-backend-url.elasticbeanstalk.com/health
curl http://your-backend-url.elasticbeanstalk.com/docs
```

### 5. Update Deployment

After making changes:

```bash
eb deploy
```

### 6. Useful Commands

```bash
# View logs
eb logs

# Check status
eb status

# SSH into instance
eb ssh

# Set environment variables
eb setenv VAR_NAME=value

# Scale application
eb scale 2

# Terminate environment
eb terminate pos-backend-env
```

## Troubleshooting

### Application health is degraded
```bash
# Check logs
eb logs --all

# Common issues:
# 1. Missing dependencies in requirements.txt
# 2. Database connection issues
# 3. Port configuration (EB expects port 8000)
```

### Deployment fails
```bash
# Check EB CLI version
eb --version

# Verify Procfile exists and is correct
cat Procfile

# Check Python version
python --version
```

## Cost Optimization

- Use t2.micro for development (Free Tier eligible)
- Terminate environment when not in use: `eb terminate`
- Monitor costs in AWS Console

## Production Checklist

- [ ] Set proper CORS origins (not *)
- [ ] Use RDS instead of SQLite
- [ ] Set up environment variables securely
- [ ] Configure HTTPS/SSL
- [ ] Set up monitoring and alarms
- [ ] Configure auto-scaling
- [ ] Set up backup strategy
