# 🔑 API CREDENTIALS & SETUP CHECKLIST

## ⚠️ CRITICAL: DO THESE FIRST (Next 2 Hours)

---

## 1. AWS (Amazon Web Services) - HIGHEST PRIORITY ⚠️

**Why Critical:** Claude AI runs on AWS Bedrock. Without this, no AI responses.

**Sign Up:** https://aws.amazon.com/

**Steps:**
1. Click "Create an AWS Account"
2. Enter email, password, account name
3. Add payment method (credit card required)
4. Verify phone number
5. Choose "Basic Support - Free"

**Enable Bedrock (CRITICAL - DO IMMEDIATELY):**
1. Go to AWS Console: https://console.aws.amazon.com/
2. Search for "Bedrock" in services
3. Click "Model access" in left sidebar
4. Click "Request model access"
5. Find "Anthropic - Claude 3 Sonnet"
6. Click "Request access"
7. ⏰ **WAIT 1-2 HOURS FOR APPROVAL**

**Create IAM User:**
1. Go to IAM: https://console.aws.amazon.com/iam/
2. Click "Users" → "Add users"
3. Username: `samarthbharat-api`
4. Access type: ✅ Programmatic access
5. Permissions: Attach policy "AmazonBedrockFullAccess"
6. Click through to create
7. **SAVE THESE CREDENTIALS:**
   ```
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   ```

**Cost:** ~$5-10 for hackathon (pay per API call)

**Status:** [ ] Account created [ ] Bedrock access requested [ ] IAM user created

---

## 2. TWILIO - CRITICAL ⚠️

**Why Critical:** WhatsApp bot, IVR calls, SMS, OTP authentication

**Sign Up:** https://www.twilio.com/try-twilio

**Steps:**
1. Click "Sign up and start building"
2. Enter email, password
3. Verify email
4. Verify phone number
5. Answer survey questions (select "Products & Orders" use case)

**Get Credentials:**
1. Go to Console: https://console.twilio.com/
2. Find on dashboard:
   ```
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   ```

**Set Up WhatsApp Sandbox:**
1. Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Follow instructions to send WhatsApp message
3. Send "join [your-code]" to +1 415 523 8886
4. Save sandbox number:
   ```
   TWILIO_WHATSAPP_NUMBER=+14155238886
   ```

**Buy Phone Number (for IVR):**
1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/search
2. Select country: United States
3. Capabilities: ✅ Voice ✅ SMS
4. Click "Search"
5. Buy a number (~$1/month, use trial credit)
6. Save number:
   ```
   TWILIO_PHONE_NUMBER=+1234567890
   ```

**Cost:** FREE ($15 trial credit - enough for hackathon)

**Status:** [ ] Account created [ ] Credentials saved [ ] WhatsApp sandbox connected [ ] Phone number purchased

---

## 3. GOOGLE CLOUD PLATFORM - CRITICAL ⚠️

**Why Critical:** Speech-to-Text (IVR), Text-to-Speech (IVR), Language detection

**Sign Up:** https://console.cloud.google.com/

**Steps:**
1. Click "Get started for free"
2. Sign in with Google account
3. Accept terms
4. Add payment method (won't be charged in free tier)

**Create Project:**
1. Click "Select a project" → "New Project"
2. Project name: `samarthbharat`
3. Click "Create"

**Enable APIs:**
1. Go to: https://console.cloud.google.com/apis/library
2. Search and enable:
   - ✅ Cloud Speech-to-Text API
   - ✅ Cloud Text-to-Speech API
   - ✅ Cloud Translation API

**Create Service Account:**
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Name: `samarthbharat-api`
4. Click "Create and Continue"
5. Grant roles:
   - Cloud Speech Client
   - Cloud Text-to-Speech Client
   - Cloud Translation API User
6. Click "Done"
7. Click on the service account email
8. Go to "Keys" tab
9. Click "Add Key" → "Create new key"
10. Choose JSON format
11. Click "Create"
12. **SAVE THE DOWNLOADED FILE as `google-credentials.json`**

**Cost:** FREE (generous free tier)
- STT: 60 minutes/month free
- TTS: 1 million characters/month free
- Translation: 500,000 characters/month free

**Status:** [ ] Account created [ ] Project created [ ] APIs enabled [ ] Service account JSON downloaded

---

## 4. OPENWEATHERMAP - OPTIONAL

**Why Needed:** Weather forecasts for farmers

**Sign Up:** https://openweathermap.org/api

**Steps:**
1. Click "Sign Up"
2. Enter email, password, username
3. Verify email
4. Go to: https://home.openweathermap.org/api_keys
5. Copy your API key:
   ```
   OPENWEATHER_API_KEY=...
   ```
6. ⏰ **Wait 10 minutes for key activation**

**Cost:** FREE (1000 calls/day)

**Status:** [ ] Account created [ ] API key saved

---

## 5. GOVERNMENT DATA SOURCES - MANUAL COLLECTION

### Commodity Online (Mandi Prices)
**URL:** https://www.commodityonline.com/

**Status:** ✅ Web scraping available

**Solution for MVP:** Scrape real-time data from Commodity Online

**Data Available:**
- Live commodity prices
- Agricultural commodities (Wheat, Rice, Cotton, etc.)
- Market trends and updates
- Historical data

**Implementation:**
- Use web scraping (Puppeteer/Cheerio) to fetch live prices
- Cache data in Redis (24-hour TTL)
- Fallback to cached data if scraping fails

**Action Required:**
- [ ] Implement web scraper service for Commodity Online
- [ ] Set up caching strategy
- [ ] Handle rate limiting and errors gracefully

### MyScheme.gov.in (Government Schemes)
**URL:** https://www.myscheme.gov.in/

**Status:** ❌ No API available

**Solution for MVP:** Manually collect 20-30 schemes

**Schemes to Include:**

**For Farmers:**
1. PM-KISAN - https://pmkisan.gov.in/
2. Soil Health Card Scheme
3. Pradhan Mantri Fasal Bima Yojana (Crop Insurance)
4. Kisan Credit Card
5. National Agriculture Market (e-NAM)

**For Students:**
6. National Scholarship Portal - https://scholarships.gov.in/
7. PM Scholarship Scheme
8. Post Matric Scholarship for SC/ST
9. Merit-cum-Means Scholarship
10. INSPIRE Scholarship

**For Startups:**
11. Startup India Seed Fund - https://www.startupindia.gov.in/
12. MUDRA Loan - https://www.mudra.org.in/
13. MSME Schemes - https://msme.gov.in/
14. Stand-Up India
15. Credit Guarantee Fund Scheme

**Action Required:**
- [ ] Create `backend/src/data/schemes.json` with 20-30 schemes
- [ ] Include: name, description, eligibility, benefits, application process, official link

**Sample Scheme Structure:**
```json
{
  "id": "pm-kisan",
  "name": "PM-KISAN",
  "nameLocal": {
    "hi": "प्रधानमंत्री किसान सम्मान निधि"
  },
  "description": "Income support to all farmer families",
  "category": "agriculture",
  "targetUserTypes": ["farmer"],
  "eligibility": [
    "Small and marginal farmers",
    "Land holding up to 2 hectares"
  ],
  "benefits": [
    "₹6000 per year in 3 installments of ₹2000 each"
  ],
  "applicationProcess": "Visit pmkisan.gov.in and register with Aadhaar",
  "requiredDocuments": [
    "Aadhaar Card",
    "Bank Account Details",
    "Land Ownership Documents"
  ],
  "officialLink": "https://pmkisan.gov.in/",
  "helplineNumber": "155261",
  "isOngoing": true
}
```

---

## 6. LOCAL DEVELOPMENT SETUP

### PostgreSQL
**Download:** https://www.postgresql.org/download/

**Windows:** https://www.postgresql.org/download/windows/
**Mac:** `brew install postgresql`
**Linux:** `sudo apt install postgresql`

**After Installation:**
```bash
# Create database
createdb samarthbharat

# Test connection
psql -d samarthbharat -c "SELECT version();"
```

**Connection String:**
```
DATABASE_URL=postgresql://localhost:5432/samarthbharat
```

**Status:** [ ] Installed [ ] Database created [ ] Connection tested

### MongoDB
**Download:** https://www.mongodb.com/try/download/community

**Or use MongoDB Atlas (Cloud - FREE):**
https://www.mongodb.com/cloud/atlas/register

**After Installation:**
```bash
# Start MongoDB (if local)
mongod

# Test connection
mongo --eval "db.version()"
```

**Connection String:**
```
# Local
MONGODB_URI=mongodb://localhost:27017/samarthbharat

# Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samarthbharat
```

**Status:** [ ] Installed [ ] Connection tested

### Redis
**Download:**
- **Windows:** https://github.com/microsoftarchive/redis/releases
- **Mac:** `brew install redis`
- **Linux:** `sudo apt install redis-server`

**After Installation:**
```bash
# Start Redis
redis-server

# Test connection
redis-cli ping
# Should return: PONG
```

**Connection:**
```
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Status:** [ ] Installed [ ] Running [ ] Connection tested

---

## 7. DEVELOPMENT TOOLS

### Node.js 18+
**Download:** https://nodejs.org/

**Verify:**
```bash
node --version  # Should be v18.x or higher
npm --version
```

**Status:** [ ] Installed

### Git
**Download:** https://git-scm.com/downloads

**Status:** [ ] Installed

### VS Code (Recommended)
**Download:** https://code.visualstudio.com/

**Recommended Extensions:**
- ESLint
- Prettier
- TypeScript
- REST Client

**Status:** [ ] Installed

### Postman (API Testing)
**Download:** https://www.postman.com/downloads/

**Status:** [ ] Installed

---

## 8. COMPLETE .env FILE

Once you have all credentials, create `backend/.env`:

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

# AWS Bedrock (FROM STEP 1)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# Google Cloud (FROM STEP 3)
GOOGLE_CREDENTIALS_PATH=./google-credentials.json

# Twilio (FROM STEP 2)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+14155238886

# OpenWeatherMap (FROM STEP 4)
OPENWEATHER_API_KEY=...

# JWT Secrets (GENERATE RANDOM STRINGS)
JWT_SECRET=change-this-to-a-random-32-char-secret
JWT_EXPIRES_IN=30m
REFRESH_TOKEN_SECRET=change-this-to-another-random-32-char-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

---

## 9. VERIFICATION CHECKLIST

Before starting development, verify:

- [ ] AWS Bedrock access approved (check email)
- [ ] Twilio account active with $15 credit
- [ ] WhatsApp sandbox connected (test by sending message)
- [ ] Google Cloud APIs enabled
- [ ] All API keys added to .env file
- [ ] PostgreSQL running and database created
- [ ] MongoDB running
- [ ] Redis running
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Government schemes data collected (20-30 schemes)
- [ ] Mandi price data created (20 crops)

---

## 10. TESTING YOUR SETUP

### Test AWS Bedrock
```bash
# Will test in code once backend is running
```

### Test Twilio WhatsApp
1. Send message to: +1 415 523 8886
2. Text: "join [your-code]"
3. Should receive confirmation

### Test Twilio Voice
1. Call your Twilio number
2. Should hear greeting (once IVR is set up)

### Test Google Cloud
```bash
# Will test in code once backend is running
```

### Test Databases
```bash
# PostgreSQL
psql -d samarthbharat -c "SELECT 1;"

# MongoDB
mongo samarthbharat --eval "db.stats()"

# Redis
redis-cli ping
```

---

## 🚨 TROUBLESHOOTING

### AWS Bedrock Access Denied
- **Solution:** Wait for approval email (1-2 hours)
- **Backup:** Use mock responses for demo

### Twilio WhatsApp Not Working
- **Solution:** Make sure you sent "join [code]" message
- **Backup:** Show screenshots of working sandbox

### Google Cloud Quota Exceeded
- **Solution:** Use free tier limits wisely
- **Backup:** Cache TTS responses

### Database Connection Failed
- **Solution:** Check if service is running
- **Commands:**
  ```bash
  # PostgreSQL
  sudo service postgresql start
  
  # MongoDB
  sudo service mongod start
  
  # Redis
  sudo service redis-server start
  ```

---

## 📞 SUPPORT

**AWS:** https://console.aws.amazon.com/support/
**Twilio:** https://www.twilio.com/help/contact
**Google Cloud:** https://cloud.google.com/support
**Stack Overflow:** https://stackoverflow.com/

---

## ✅ FINAL CHECKLIST

Print this and check off as you complete:

- [ ] AWS account created
- [ ] AWS Bedrock access approved
- [ ] AWS IAM credentials saved
- [ ] Twilio account created
- [ ] Twilio credentials saved
- [ ] WhatsApp sandbox connected
- [ ] Twilio phone number purchased
- [ ] Google Cloud project created
- [ ] Google Cloud APIs enabled
- [ ] Google service account JSON downloaded
- [ ] OpenWeatherMap API key obtained
- [ ] PostgreSQL installed and running
- [ ] MongoDB installed and running
- [ ] Redis installed and running
- [ ] Node.js 18+ installed
- [ ] .env file created with all credentials
- [ ] Government schemes data collected
- [ ] Mandi price data created
- [ ] All database connections tested

**Once all checked, you're ready to start coding! 🚀**

---

## 💰 TOTAL COST ESTIMATE

- AWS Bedrock: $5-10
- Twilio: $0 (free trial)
- Google Cloud: $0 (free tier)
- OpenWeatherMap: $0 (free tier)
- AWS EC2 (deployment): $10-15
- **TOTAL: ~$20-30 for entire hackathon**

---

**NEXT STEP:** Open `QUICK-START.md` and follow Day 1 plan!
