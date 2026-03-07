# SETUP GUIDE: External Services & API Keys

## IMMEDIATE ACTION REQUIRED

You need to sign up for these services and obtain API keys/credentials TODAY (March 4).

---

## 1. AMAZON WEB SERVICES (AWS) - CRITICAL ⚠️

**Purpose:** Claude AI via Amazon Bedrock, hosting, storage

**Steps:**
1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Complete registration (requires credit card)
4. Enable Amazon Bedrock:
   - Go to AWS Console → Search "Bedrock"
   - Request access to Claude 3 Sonnet model
   - **NOTE:** Approval can take 1-2 hours, DO THIS FIRST!
5. Create IAM user with programmatic access:
   - Go to IAM → Users → Add User
   - Enable "Programmatic access"
   - Attach policy: `AmazonBedrockFullAccess`
   - Save Access Key ID and Secret Access Key

**What you'll get:**
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

**Cost:** ~$5-10 for hackathon (Claude API usage)

**Documentation:**
- Bedrock: https://docs.aws.amazon.com/bedrock/
- Claude on Bedrock: https://docs.anthropic.com/claude/docs/claude-on-amazon-bedrock

---

## 2. TWILIO - CRITICAL ⚠️

**Purpose:** WhatsApp bot, SMS, IVR/Voice calls, OTP

**Steps:**
1. Go to: https://www.twilio.com/try-twilio
2. Sign up for free trial (gives $15 credit)
3. Verify your phone number
4. Get credentials from Console Dashboard:
   - Account SID
   - Auth Token
5. Set up WhatsApp Sandbox:
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Follow instructions to connect your WhatsApp
   - Get sandbox number
6. Get a phone number:
   - Go to Phone Numbers → Buy a number
   - Choose one with Voice + SMS capabilities
   - Cost: ~$1/month (use trial credit)

**What you'll get:**
```
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+14155238886 (sandbox)
```

**Cost:** Free trial ($15 credit) - enough for hackathon

**Documentation:**
- WhatsApp: https://www.twilio.com/docs/whatsapp
- Voice/IVR: https://www.twilio.com/docs/voice
- SMS: https://www.twilio.com/docs/sms

---

## 3. GOOGLE CLOUD PLATFORM - CRITICAL ⚠️

**Purpose:** Speech-to-Text (STT), Text-to-Speech (TTS), Language Detection

**Steps:**
1. Go to: https://console.cloud.google.com/
2. Create new project: "SamarthBharat"
3. Enable APIs:
   - Cloud Speech-to-Text API
   - Cloud Text-to-Speech API
   - Cloud Translation API
4. Create Service Account:
   - Go to IAM & Admin → Service Accounts
   - Create Service Account
   - Grant roles: "Cloud Speech Client", "Cloud Text-to-Speech Client"
   - Create JSON key
   - Download and save as `google-credentials.json`

**What you'll get:**
```
GOOGLE_CREDENTIALS_PATH=/path/to/google-credentials.json
```

**Cost:** Free tier includes:
- STT: 60 minutes/month free
- TTS: 1 million characters/month free
- Translation: 500,000 characters/month free

**Documentation:**
- STT: https://cloud.google.com/speech-to-text/docs
- TTS: https://cloud.google.com/text-to-speech/docs
- Translation: https://cloud.google.com/translate/docs

---

## 4. OPENWEATHERMAP API - MEDIUM PRIORITY

**Purpose:** Weather forecasts for farmers

**Steps:**
1. Go to: https://openweathermap.org/api
2. Sign up for free account
3. Go to API Keys section
4. Copy your API key (may take 10 minutes to activate)

**What you'll get:**
```
OPENWEATHER_API_KEY=...
```

**Cost:** Free tier (1000 calls/day)

**Documentation:**
- API Docs: https://openweathermap.org/api/one-call-3

---

## 5. GOVERNMENT DATA SOURCES - LOW PRIORITY (Use Static Data for MVP)

### Agmarknet (Mandi Prices)
**URL:** https://agmarknet.gov.in/
**Status:** No API available, requires web scraping
**MVP Solution:** Use static CSV data for demo

**Static Data Source:**
- Download sample data: https://data.gov.in/catalog/agricultural-marketing
- Or create mock data for 20 common crops

### MyScheme.gov.in (Government Schemes)
**URL:** https://www.myscheme.gov.in/
**Status:** No public API
**MVP Solution:** Manually collect 20-30 schemes and create JSON database

**Schemes to Include:**
- PM-KISAN (farmers)
- Soil Health Card Scheme (farmers)
- National Scholarship Portal (students)
- Startup India Seed Fund (startups)
- MUDRA Loan (startups)
- MSME schemes
- State-specific schemes

**Data Structure:**
```json
{
  "id": "pm-kisan",
  "name": "PM-KISAN",
  "category": "agriculture",
  "targetUserTypes": ["farmer"],
  "eligibility": ["Small and marginal farmers", "Land holding up to 2 hectares"],
  "benefits": ["₹6000 per year in 3 installments"],
  "applicationProcess": "Visit pmkisan.gov.in and register",
  "officialLink": "https://pmkisan.gov.in/"
}
```

---

## 6. DATABASE SETUP - LOCAL DEVELOPMENT

### PostgreSQL
```bash
# Install PostgreSQL
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# Create database
createdb samarthbharat

# Connection string
DATABASE_URL=postgresql://localhost:5432/samarthbharat
```

### MongoDB
```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Or use MongoDB Atlas (free cloud):
# https://www.mongodb.com/cloud/atlas/register

# Connection string
MONGODB_URI=mongodb://localhost:27017/samarthbharat
# Or Atlas: mongodb+srv://username:password@cluster.mongodb.net/samarthbharat
```

### Redis
```bash
# Install Redis
# Windows: Download from https://github.com/microsoftarchive/redis/releases
# Mac: brew install redis
# Linux: sudo apt install redis-server

# Connection
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 7. DEPLOYMENT - AWS EC2 (Day 4)

**Steps:**
1. Launch EC2 instance:
   - Go to EC2 → Launch Instance
   - Choose Ubuntu 22.04 LTS
   - Instance type: t3.medium (2 vCPU, 4GB RAM)
   - Configure security group (ports 80, 443, 22)
   - Create key pair for SSH access

2. Domain (optional):
   - Register domain on Namecheap/GoDaddy
   - Or use EC2 public IP for demo

3. SSL Certificate:
   - Use Let's Encrypt (free)
   - Or AWS Certificate Manager

**Cost:** ~$0.10/hour = ~$2.40/day (stop after demo)

---

## COMPLETE .env FILE TEMPLATE

Create `.env` file in backend directory:

```env
# Server
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://localhost:5432/samarthbharat
MONGODB_URI=mongodb://localhost:27017/samarthbharat
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# AWS Bedrock (Claude AI)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# Google Cloud (Voice)
GOOGLE_CREDENTIALS_PATH=./google-credentials.json

# Twilio (WhatsApp, SMS, Voice)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+14155238886

# External APIs
OPENWEATHER_API_KEY=...

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=30m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-key-change-this
REFRESH_TOKEN_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## PRIORITY ORDER FOR TODAY (March 4)

### MUST DO NOW (Next 2 hours):
1. ✅ AWS account + Bedrock access request
2. ✅ Twilio account + WhatsApp sandbox
3. ✅ Google Cloud project + credentials

### CAN DO LATER TODAY:
4. OpenWeatherMap API key
5. Install databases locally
6. Collect government schemes data

### CAN DO TOMORROW:
7. AWS EC2 setup (deployment)
8. Domain registration

---

## TESTING CREDENTIALS

For development/testing, you can use:

**Test Phone Numbers (Twilio):**
- Your verified phone number during trial

**Test WhatsApp:**
- Your personal WhatsApp connected to Twilio sandbox

**Test Users:**
- Create test accounts with your phone number

---

## COST SUMMARY

**Total estimated cost for hackathon:**
- AWS Bedrock: $5-10
- Twilio: $0 (free trial)
- Google Cloud: $0 (free tier)
- OpenWeatherMap: $0 (free tier)
- AWS EC2: $10-15 (4 days)
- **TOTAL: ~$20-30**

---

## SUPPORT & DOCUMENTATION

**If you get stuck:**
- AWS Bedrock: https://docs.aws.amazon.com/bedrock/
- Twilio: https://www.twilio.com/docs
- Google Cloud: https://cloud.google.com/docs
- Stack Overflow: Search for specific errors

**Community:**
- AWS Discord: https://discord.gg/aws
- Twilio Discord: https://discord.gg/twilio

---

## NEXT STEPS

1. **RIGHT NOW:** Sign up for AWS, Twilio, Google Cloud
2. **While waiting for approvals:** Start coding the project structure
3. **Once you have credentials:** Add them to .env file
4. **Test each integration:** One at a time, don't move forward until working

---

## CHECKLIST

- [ ] AWS account created
- [ ] Bedrock access requested (WAIT FOR APPROVAL)
- [ ] AWS IAM user created with keys
- [ ] Twilio account created
- [ ] Twilio WhatsApp sandbox connected
- [ ] Twilio phone number purchased
- [ ] Google Cloud project created
- [ ] Google Cloud APIs enabled
- [ ] Google service account JSON downloaded
- [ ] OpenWeatherMap API key obtained
- [ ] PostgreSQL installed locally
- [ ] MongoDB installed locally
- [ ] Redis installed locally
- [ ] .env file created with all credentials
- [ ] Government schemes data collected (20-30 schemes)

**Once all checked, you're ready to start coding!**
