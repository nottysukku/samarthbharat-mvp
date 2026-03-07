# 🚀 QUICK START GUIDE - SamarthBharat MVP

## ⏰ TIMELINE: March 4-8, 2024 (4 DAYS)

---

## 📋 IMMEDIATE ACTIONS (DO THIS NOW - 2 HOURS)

### Step 1: Sign Up for Critical Services (30 minutes)

**Open these links in separate tabs and sign up simultaneously:**

1. **AWS (MOST CRITICAL - DO FIRST)**
   - URL: https://aws.amazon.com/
   - Sign up → Request Bedrock access → Enable Claude 3 Sonnet
   - ⚠️ **APPROVAL TAKES 1-2 HOURS - START NOW!**

2. **Twilio (CRITICAL)**
   - URL: https://www.twilio.com/try-twilio
   - Sign up → Get $15 free credit
   - Set up WhatsApp Sandbox
   - Buy a phone number ($1)

3. **Google Cloud (CRITICAL)**
   - URL: https://console.cloud.google.com/
   - Create project → Enable STT/TTS APIs
   - Create service account → Download JSON key

4. **OpenWeatherMap (OPTIONAL)**
   - URL: https://openweathermap.org/api
   - Sign up → Get free API key

### Step 2: Install Local Dependencies (30 minutes)

**Install these on your development machine:**

```bash
# Node.js 18+ (if not installed)
# Download from: https://nodejs.org/

# PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# MongoDB
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Redis
# Windows: https://github.com/microsoftarchive/redis/releases
# Mac: brew install redis
# Linux: sudo apt install redis-server
```

### Step 3: Clone and Setup Project (30 minutes)

```bash
# Navigate to project directory
cd samarthbharat-mvp

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys (from Step 1)

# Create logs directory
mkdir logs

# Frontend setup (we'll create this next)
cd ../frontend
npm install
```

### Step 4: Create Databases (15 minutes)

```bash
# PostgreSQL
createdb samarthbharat

# MongoDB (starts automatically)
# Redis (starts automatically)

# Test connections
psql -d samarthbharat -c "SELECT version();"
mongo --eval "db.version()"
redis-cli ping
```

### Step 5: Add API Keys to .env (15 minutes)

Edit `backend/.env` file with your credentials from Step 1:

```env
# AWS Bedrock
AWS_ACCESS_KEY_ID=AKIA...  # From AWS IAM
AWS_SECRET_ACCESS_KEY=...   # From AWS IAM

# Twilio
TWILIO_ACCOUNT_SID=AC...    # From Twilio Console
TWILIO_AUTH_TOKEN=...       # From Twilio Console
TWILIO_PHONE_NUMBER=+1...   # Your Twilio number
TWILIO_WHATSAPP_NUMBER=+14155238886  # Sandbox number

# Google Cloud
GOOGLE_CREDENTIALS_PATH=./google-credentials.json  # Downloaded JSON

# OpenWeatherMap
OPENWEATHER_API_KEY=...     # From OpenWeatherMap

# JWT Secrets (generate random strings)
JWT_SECRET=your-random-32-char-secret-here
REFRESH_TOKEN_SECRET=another-random-32-char-secret-here
```

---

## 🏗️ DAY 1 (March 4) - BUILD FOUNDATION

### Morning Session (9 AM - 1 PM)

**Developer 1: Backend Core**
```bash
cd backend

# Start development server
npm run dev

# In separate terminal, test health endpoint
curl http://localhost:3000/api/health
```

**Tasks:**
- [ ] Complete auth service (OTP via Twilio)
- [ ] Integrate Claude AI (Amazon Bedrock)
- [ ] Create chat service
- [ ] Test all endpoints with Postman

**Developer 2: Frontend Setup**
```bash
cd frontend

# Create React app with Vite
npm create vite@latest . -- --template react-ts
npm install

# Install dependencies
npm install axios react-router-dom zustand tailwindcss

# Start dev server
npm run dev
```

**Tasks:**
- [ ] Create landing page structure
- [ ] Set up routing
- [ ] Create API client
- [ ] Build authentication UI

### Afternoon Session (2 PM - 6 PM)

**Developer 1:**
- [ ] File upload handling
- [ ] Claude Vision integration
- [ ] Scheme database seeding
- [ ] WhatsApp webhook setup

**Developer 2:**
- [ ] Chat interface UI
- [ ] Image upload component
- [ ] Quick action buttons
- [ ] Connect to backend APIs

### Evening Session (7 PM - 9 PM)

**Both Developers:**
- [ ] Integration testing
- [ ] Fix bugs
- [ ] Test end-to-end flow
- [ ] Prepare for Day 2

**END OF DAY 1 CHECKPOINT:**
✅ Backend APIs responding
✅ Claude AI working
✅ Frontend showing landing page
✅ Can send messages and get responses

---

## 🚀 DAY 2 (March 5) - COMPLETE WEB + WHATSAPP

### Morning Session (9 AM - 1 PM)

**Developer 1: WhatsApp Bot**
```bash
# Test WhatsApp webhook
ngrok http 3000  # Expose local server

# Configure Twilio webhook URL:
# https://your-ngrok-url.ngrok.io/webhooks/whatsapp
```

**Tasks:**
- [ ] WhatsApp message handling
- [ ] WhatsApp media support
- [ ] User identification
- [ ] Test with your phone

**Developer 2: Frontend Polish**
- [ ] Responsive design
- [ ] Voice input (EN/HI toggle)
- [ ] Loading states
- [ ] Error handling

### Afternoon Session (2 PM - 6 PM)

**Both Developers:**
- [ ] End-to-end testing (Web + WhatsApp)
- [ ] Bug fixes
- [ ] UI/UX improvements
- [ ] Add more government schemes

### Evening Session (7 PM - 9 PM)

**Both Developers:**
- [ ] Security testing
- [ ] Performance optimization
- [ ] Documentation
- [ ] Prepare demo scenarios

**END OF DAY 2 CHECKPOINT:**
✅ Website fully functional
✅ WhatsApp bot responding
✅ Image upload working
✅ 20+ schemes in database

---

## 📞 DAY 3 (March 6) - ADD IVR SYSTEM

### Morning Session (9 AM - 1 PM)

**Developer 1: IVR System**
```bash
# Configure Twilio Voice webhook
# URL: https://your-ngrok-url.ngrok.io/webhooks/voice
```

**Tasks:**
- [ ] Create IVR menu structure
- [ ] Implement voice webhook
- [ ] Integrate Google TTS
- [ ] Integrate Google STT
- [ ] Test by calling Twilio number

**IVR Menu Structure:**
```
"Welcome to SamarthBharat"
Press 1 for Farmer services (Hindi)
Press 2 for Student services (Hindi)
Press 3 for Startup services (English)
Press 9 to speak with agent
```

**Developer 2: Additional Features**
- [ ] Mandi price service (static data)
- [ ] Weather service integration
- [ ] Study roadmap generator
- [ ] Testing and bug fixes

### Afternoon Session (2 PM - 6 PM)

**Both Developers:**
- [ ] IVR testing and refinement
- [ ] Add more IVR menu options
- [ ] Test all 3 channels (Web + WhatsApp + IVR)
- [ ] Security hardening

### Evening Session (7 PM - 9 PM)

**Both Developers:**
- [ ] Performance testing
- [ ] Load testing (basic)
- [ ] Fix critical bugs
- [ ] Prepare for deployment

**END OF DAY 3 CHECKPOINT:**
✅ IVR system working
✅ All 3 channels functional
✅ Security measures in place
✅ Ready for deployment

---

## 🌐 DAY 4 (March 7) - DEPLOY & DEMO PREP

### Morning Session (9 AM - 1 PM)

**Developer 1: AWS Deployment**
```bash
# Launch EC2 instance
# Instance type: t3.medium
# OS: Ubuntu 22.04 LTS

# SSH into server
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm postgresql mongodb redis nginx

# Clone repository
git clone your-repo-url
cd samarthbharat-mvp/backend

# Setup environment
cp .env.example .env
# Edit .env with production values

# Install PM2
sudo npm install -g pm2

# Start application
pm2 start dist/server.js --name samarthbharat
pm2 save
pm2 startup
```

**Developer 2: Frontend Deployment**
```bash
# Build frontend
cd frontend
npm run build

# Copy to server
scp -r dist/* ubuntu@your-ec2-ip:/var/www/samarthbharat/

# Configure Nginx
# (See deployment guide)
```

### Afternoon Session (2 PM - 6 PM)

**Both Developers:**
- [ ] SSL certificate setup (Let's Encrypt)
- [ ] Domain configuration (if available)
- [ ] Production testing
- [ ] Fix deployment issues
- [ ] Update Twilio webhooks to production URL

### Evening Session (7 PM - 9 PM)

**Both Developers:**
- [ ] Create demo video (3 minutes)
- [ ] Prepare pitch deck (10 slides)
- [ ] Test demo scenarios
- [ ] Create backup demo (screenshots)
- [ ] Write documentation

**END OF DAY 4 CHECKPOINT:**
✅ Fully deployed on AWS
✅ Public URL accessible
✅ All channels working in production
✅ Demo video ready
✅ Pitch deck ready

---

## 📊 DEMO SCENARIOS (March 8)

### Scenario 1: Farmer with Crop Disease
1. Open website → Select "Farmer/Worker"
2. Upload crop image
3. Get disease diagnosis
4. Ask about treatment
5. Check mandi prices

### Scenario 2: Student Seeking Scholarship
1. Send WhatsApp message: "I need scholarship"
2. Bot asks about education level
3. Bot recommends scholarships
4. Student asks for study roadmap
5. Bot generates UPSC preparation plan

### Scenario 3: Startup Seeking Funding
1. Call IVR number
2. Press 3 for Startup services
3. Ask about funding schemes
4. Get information about Startup India
5. Receive SMS with details

---

## 🆘 TROUBLESHOOTING

### If AWS Bedrock Access Not Approved:
- Use mock responses for demo
- Show "AI integration pending approval" message
- Have backup responses ready

### If Twilio WhatsApp Fails:
- Focus on web interface
- Show WhatsApp screenshots as backup
- Explain it works in sandbox mode

### If Deployment Issues:
- Use ngrok for local demo
- Have video backup ready
- Show localhost demo

### If Time Running Short:
- Cut voice input from web
- Simplify IVR to basic menu
- Use static data for all services
- Focus on core chat functionality

---

## ✅ DAILY CHECKLIST

### Every Morning:
- [ ] Pull latest code
- [ ] Check all services running
- [ ] Review yesterday's progress
- [ ] Plan today's tasks
- [ ] Sync with team

### Every Evening:
- [ ] Commit and push code
- [ ] Test what you built
- [ ] Document issues
- [ ] Plan tomorrow
- [ ] Get rest!

---

## 📞 SUPPORT CONTACTS

**AWS Support:** https://console.aws.amazon.com/support/
**Twilio Support:** https://www.twilio.com/help/contact
**Google Cloud Support:** https://cloud.google.com/support

---

## 🎯 SUCCESS CRITERIA

By March 8, you MUST have:
- ✅ Working website (public URL)
- ✅ WhatsApp bot responding
- ✅ IVR system answering calls
- ✅ Claude AI generating responses
- ✅ Image upload working
- ✅ 20+ government schemes
- ✅ Demo video (3 min)
- ✅ Pitch deck (10 slides)

---

## 💪 MOTIVATION

You have 4 days to build something amazing that will help millions of underserved Indians. Stay focused, work smart, and remember:

**"Done is better than perfect"**

Focus on getting it working first, then make it better. You got this! 🚀

---

## 📝 NEXT STEPS

1. **RIGHT NOW:** Sign up for AWS, Twilio, Google Cloud
2. **While waiting:** Install local dependencies
3. **Once approved:** Add API keys to .env
4. **Start coding:** Follow Day 1 plan
5. **Stay focused:** One task at a time

**LET'S BUILD! 💪**
