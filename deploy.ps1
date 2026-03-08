# ============================================
# SamarthBharat Deployment Script (Windows)
# Deploys frontend to S3, sets up static website hosting
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "🚀 SamarthBharat Deployment" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

# Configuration
$REGION = if ($env:AWS_REGION) { $env:AWS_REGION } else { "us-east-1" }
$FRONTEND_BUCKET = if ($env:S3_FRONTEND_BUCKET) { $env:S3_FRONTEND_BUCKET } else { "samarthbharat-frontend" }

# ─── Step 1: Build Frontend ───
Write-Host "`n📦 Building frontend..." -ForegroundColor Yellow
Push-Location frontend
npm run build
Pop-Location
Write-Host "✅ Frontend built successfully" -ForegroundColor Green

# ─── Step 2: Create S3 Bucket ───
Write-Host "`n☁️  Setting up S3 bucket..." -ForegroundColor Yellow
try {
    aws s3 mb "s3://$FRONTEND_BUCKET" --region $REGION 2>$null
} catch {
    Write-Host "   Bucket may already exist, continuing..." -ForegroundColor Gray
}

# Enable static website hosting
aws s3 website "s3://$FRONTEND_BUCKET" --index-document index.html --error-document index.html

# Disable block public access
aws s3api put-public-access-block `
    --bucket $FRONTEND_BUCKET `
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Set bucket policy
$policy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$FRONTEND_BUCKET/*"
    }
  ]
}
"@
$policy | Out-File -Encoding utf8 "$env:TEMP\bucket-policy.json"
aws s3api put-bucket-policy --bucket $FRONTEND_BUCKET --policy "file://$env:TEMP\bucket-policy.json"

# ─── Step 3: Upload Files ───
Write-Host "`n📤 Uploading files to S3..." -ForegroundColor Yellow
aws s3 sync "frontend/dist/" "s3://$FRONTEND_BUCKET/" `
    --delete `
    --cache-control "public, max-age=31536000" `
    --exclude "index.html"

aws s3 cp "frontend/dist/index.html" "s3://$FRONTEND_BUCKET/index.html" `
    --cache-control "no-cache, no-store, must-revalidate"

$FRONTEND_URL = "http://$FRONTEND_BUCKET.s3-website-$REGION.amazonaws.com"

# ─── Summary ───
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend URL: $FRONTEND_URL" -ForegroundColor White
Write-Host ""
Write-Host "Next: Deploy backend to EC2:" -ForegroundColor Yellow
Write-Host "  1. Launch an EC2 instance (Amazon Linux 2 / Ubuntu)" -ForegroundColor Gray
Write-Host "  2. SSH in, install Node.js 18+" -ForegroundColor Gray
Write-Host "  3. git clone your repo" -ForegroundColor Gray
Write-Host "  4. cd backend && npm install" -ForegroundColor Gray
Write-Host "  5. Set .env with your keys" -ForegroundColor Gray
Write-Host "  6. npm start  (or use PM2: pm2 start 'npm start')" -ForegroundColor Gray
Write-Host "  7. Open port 3000 in Security Group" -ForegroundColor Gray
Write-Host "  8. Update frontend .env: VITE_API_URL=http://<EC2-PUBLIC-IP>:3000" -ForegroundColor Gray
Write-Host "============================================" -ForegroundColor Cyan
