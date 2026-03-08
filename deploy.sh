#!/usr/bin/env bash
# ============================================
# SamarthBharat Deployment Script
# Deploys frontend to S3+CloudFront, backend to EC2
# ============================================

set -e

echo "🚀 SamarthBharat Deployment"
echo "============================"

# Configuration
REGION=${AWS_REGION:-us-east-1}
FRONTEND_BUCKET=${S3_FRONTEND_BUCKET:-samarthbharat-frontend}
BACKEND_PORT=${PORT:-3000}

# ─── Step 1: Build Frontend ───
echo ""
echo "📦 Building frontend..."
cd frontend
npm run build
echo "✅ Frontend built successfully"

# ─── Step 2: Deploy Frontend to S3 ───
echo ""
echo "☁️  Deploying frontend to S3..."

# Create bucket if not exists
aws s3 mb s3://$FRONTEND_BUCKET --region $REGION 2>/dev/null || true

# Enable static website hosting
aws s3 website s3://$FRONTEND_BUCKET \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public access
cat > /tmp/bucket-policy.json << EOF
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
EOF

aws s3api put-public-access-block \
  --bucket $FRONTEND_BUCKET \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  2>/dev/null || true

aws s3api put-bucket-policy \
  --bucket $FRONTEND_BUCKET \
  --policy file:///tmp/bucket-policy.json

# Upload built files
aws s3 sync dist/ s3://$FRONTEND_BUCKET/ \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html"

# Upload index.html with no-cache
aws s3 cp dist/index.html s3://$FRONTEND_BUCKET/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

FRONTEND_URL="http://$FRONTEND_BUCKET.s3-website-$REGION.amazonaws.com"
echo "✅ Frontend deployed to: $FRONTEND_URL"

# ─── Step 3: Create CloudFront Distribution (optional) ───
echo ""
echo "🌐 To add CloudFront CDN (recommended for HTTPS + speed):"
echo "   aws cloudfront create-distribution --origin-domain-name $FRONTEND_BUCKET.s3-website-$REGION.amazonaws.com"
echo ""

# ─── Summary ───
echo "============================================"
echo "🎉 Deployment Complete!"
echo ""
echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL:  Update .env VITE_API_URL with your EC2 public IP"
echo ""
echo "For EC2 backend deployment:"
echo "  1. SSH into your EC2 instance"
echo "  2. git clone your repo"
echo "  3. cd backend && npm install && npm start"
echo "  4. Or use PM2: pm2 start 'npm start' --name samarthbharat-api"
echo "============================================"
