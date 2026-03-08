# AWS Cost Shutdown Guide — SamarthBharat

## ⚠️ Run these commands AFTER the hackathon to stop all charges

### Prerequisites
```powershell
$env:PATH += ";C:\Program Files\Amazon\AWSCLIV2"
```

---

## 1. Stop EC2 Instance (biggest cost: ~$8.50/mo)
```powershell
aws ec2 stop-instances --instance-ids i-04f318cdad3f18937 --region ap-south-1
```
To **terminate permanently** (deletes the instance):
```powershell
aws ec2 terminate-instances --instance-ids i-04f318cdad3f18937 --region ap-south-1
```

## 2. Release Elastic IP (charged when EC2 is stopped: ~$3.60/mo)
```powershell
# Find the allocation ID
aws ec2 describe-addresses --region ap-south-1 --query "Addresses[?PublicIp=='13.204.54.234'].AllocationId" --output text
# Then release it (replace ALLOCATION_ID)
aws ec2 release-address --allocation-id ALLOCATION_ID --region ap-south-1
```

## 3. Delete RDS Instance (biggest cost: ~$12/mo)
```powershell
aws rds delete-db-instance --db-instance-identifier samarthbharat-postgres --skip-final-snapshot --region ap-south-1
```

## 4. Delete ElastiCache Cluster (~$12/mo)
```powershell
aws elasticache delete-cache-cluster --cache-cluster-id samarthbharat-redis --region ap-south-1
```

## 5. Delete S3 Bucket (minimal cost, ~$0.02/mo)
```powershell
aws s3 rm s3://astech-samarthbharat-s3-bucket --recursive --region ap-south-1
aws s3 rb s3://astech-samarthbharat-s3-bucket --region ap-south-1
```

## 6. Delete CloudFront Distribution
```powershell
# First disable it
aws cloudfront get-distribution-config --id E3FFW7A954RN1Y --query "DistributionConfig" --output json > cf-config.json
# Edit cf-config.json: set "Enabled": false, then update
# Wait for it to deploy, then delete
aws cloudfront delete-distribution --id E3FFW7A954RN1Y --if-match ETAG_VALUE
```

## 7. Delete DynamoDB Tables (free tier usually covers it)
```powershell
aws dynamodb delete-table --table-name SamarthBharat-Conversations --region ap-south-1
aws dynamodb delete-table --table-name SamarthBharat-UserProfiles --region ap-south-1
aws dynamodb delete-table --table-name SamarthBharat-UsageMetrics --region ap-south-1
aws dynamodb delete-table --table-name SamarthBharat-TranslationCache --region ap-south-1
aws dynamodb delete-table --table-name ASTech_SamarthBharat --region ap-south-1
```

## 8. Delete Route 53 Hosted Zone (~$0.50/mo)
```powershell
# Delete all non-NS/SOA records first, then:
aws route53 delete-hosted-zone --id Z07539741FEB4NAMSND7I
```

## 9. Delete CloudWatch Resources (free tier)
```powershell
aws cloudwatch delete-dashboards --dashboard-names SamarthBharat-Dashboard --region ap-south-1
aws logs delete-log-group --log-group-name /samarthbharat/api --region ap-south-1
aws logs delete-log-group --log-group-name /samarthbharat/frontend --region ap-south-1
aws logs delete-log-group --log-group-name /samarthbharat/bedrock --region ap-south-1
```

---

## 💰 Monthly Cost Summary (if left running)

| Service | Monthly Cost |
|---------|-------------|
| EC2 t2.micro | ~$8.50 |
| Elastic IP (idle) | ~$3.60 |
| RDS db.t3.micro | ~$12.00 |
| ElastiCache cache.t3.micro | ~$12.00 |
| Route 53 hosted zone | ~$0.50 |
| S3 + CloudFront | ~$0.10 |
| DynamoDB (on-demand) | ~$0.00 |
| CloudWatch | ~$0.00 |
| **Total if all running** | **~$37/mo** |

## 🛑 Quick Shutdown (Stop the expensive ones)
```powershell
$env:PATH += ";C:\Program Files\Amazon\AWSCLIV2"
# Stop EC2
aws ec2 stop-instances --instance-ids i-04f318cdad3f18937 --region ap-south-1
# Delete RDS
aws rds delete-db-instance --db-instance-identifier samarthbharat-postgres --skip-final-snapshot --region ap-south-1
# Delete ElastiCache
aws elasticache delete-cache-cluster --cache-cluster-id samarthbharat-redis --region ap-south-1
```
This alone saves ~$32/mo. The remaining ~$5/mo is negligible.
