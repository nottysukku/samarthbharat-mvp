# 🇮🇳 SamarthBharat Platform - MVP Implementation

## 🎯 Mission
Build an AI-powered multi-channel assistant for underserved Indian communities (farmers, students, startups) in 4 days.

## ⏰ Timeline
**Start:** March 4, 2024
**Demo:** March 8, 2024
**Duration:** 4 days

## 🚀 Deliverables
1. ✅ Website (React PWA)
2. ✅ WhatsApp Bot (Twilio)
3. ✅ IVR System (Voice calls)
4. ✅ Claude AI Integration (Amazon Bedrock)
5. ✅ 20+ Government Schemes Database
6. ✅ Demo Video & Pitch Deck

---

## 📚 DOCUMENTATION INDEX

### 🔥 START HERE (IN ORDER):

1. **API-CREDENTIALS-CHECKLIST.md** ⚠️ MOST IMPORTANT
   - Sign up for AWS, Twilio, Google Cloud
   - Get all API keys and credentials
   - Set up local databases
   - **DO THIS FIRST - TAKES 2 HOURS**

2. **QUICK-START.md**
   - Day-by-day implementation guide
   - Developer task allocation
   - Daily checkpoints
   - Troubleshooting tips

3. **4-DAY-SPRINT-PLAN.md**
   - High-level overview
   - Critical path
   - Risk mitigation
   - Success criteria

4. **SETUP-GUIDE.md**
   - Detailed setup instructions
   - External service documentation
   - Cost breakdown
   - Support contacts

5. **.kiro/specs/samarthbharat-platform/**
   - `requirements.md` - Full requirements
   - `design.md` - Technical architecture
   - `tasks.md` - Detailed task breakdown

---

## 🏗️ Project Structure

```
samarthbharat-mvp/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── server.ts       # Main server file
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── config/         # Configuration
│   │   ├── utils/          # Utilities
│   │   └── data/           # Static data (schemes, mandi prices)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/               # React + TypeScript
│   ├── src/
│   │   ├── App.tsx
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API client
│   │   ├── store/          # State management
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── vite.config.ts
│
└── docs/                   # Documentation
    ├── API-CREDENTIALS-CHECKLIST.md
    ├── QUICK-START.md
    ├── 4-DAY-SPRINT-PLAN.md
    └── SETUP-GUIDE.md
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Databases:** PostgreSQL, MongoDB, Redis
- **AI:** Claude 3 Sonnet (Amazon Bedrock)
- **Voice:** Google Cloud STT/TTS
- **Communication:** Twilio (WhatsApp, SMS, Voice)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Routing:** React Router

### Infrastructure
- **Hosting:** AWS EC2
- **Web Server:** Nginx
- **Process Manager:** PM2
- **SSL:** Let's Encrypt

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- MongoDB 6+
- Redis 7+
- Git

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd samarthbharat-mvp

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys

# Frontend setup
cd ../frontend
npm install

# Create databases
createdb samarthbharat
```

### Development

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Redis
redis-server

# Terminal 4: MongoDB
mongod
```

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 🔑 Required API Keys

You need accounts and API keys for:

1. **AWS** (Claude AI) - https://aws.amazon.com/
2. **Twilio** (WhatsApp, IVR) - https://www.twilio.com/
3. **Google Cloud** (Voice) - https://console.cloud.google.com/
4. **OpenWeatherMap** (Weather) - https://openweathermap.org/

**See `API-CREDENTIALS-CHECKLIST.md` for detailed setup instructions.**

---

## 📱 Features

### For Farmers
- 🌾 Crop disease diagnosis (image upload)
- 💰 Mandi price information
- 🌤️ Weather forecasts
- 📋 Government schemes (PM-KISAN, subsidies)
- ⚖️ Legal rights information

### For Students
- 📚 Study resources (PDFs, videos)
- 🎓 Scholarship finder
- 📅 Study roadmap generator
- 💼 Career guidance
- 🏆 Competitive exam prep

### For Startups
- 💵 Funding schemes (Startup India, MUDRA)
- 📝 Compliance guidance
- 📊 Market research
- 🤝 Networking resources
- 📈 Business advisory

---

## 🌐 Channels

### 1. Website
- Responsive web app (PWA)
- 3-section landing page
- Chat interface with Claude AI
- Image/file upload
- Voice input (EN/HI)

### 2. WhatsApp Bot
- Text and voice messages
- Image upload for crop diagnosis
- Menu-driven navigation
- Automated responses

### 3. IVR System
- Toll-free number
- Multi-language support
- Voice menu navigation
- TTS responses

---

## 📊 Demo Scenarios

### Scenario 1: Farmer
1. Upload crop image
2. Get disease diagnosis
3. Ask about treatment
4. Check mandi prices
5. Find government schemes

### Scenario 2: Student
1. Send WhatsApp: "I need scholarship"
2. Get scholarship recommendations
3. Request study roadmap
4. Receive UPSC preparation plan

### Scenario 3: Startup
1. Call IVR number
2. Select startup services
3. Ask about funding
4. Get Startup India information
5. Receive SMS with details

---

## 🔒 Security

- ✅ HTTPS only
- ✅ JWT authentication
- ✅ Rate limiting (100 req/min)
- ✅ Input sanitization
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Environment variables for secrets

---

## 📈 Performance

- ⚡ API response < 2 seconds
- ⚡ Web load time < 3 seconds on 3G
- ⚡ Image processing < 5 seconds
- ⚡ Voice transcription < 3 seconds
- ⚡ Mobile app < 15MB

---

## 🧪 Testing

### Unit Tests
- Jest for backend
- React Testing Library for frontend
- 80% code coverage target

### Property-Based Tests
- fast-check for backend
- 100 iterations per property
- Critical properties validated

### Integration Tests
- End-to-end user flows
- Cross-channel testing
- API integration testing

---

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
# Build
npm run build

# Start
npm start
```

### AWS EC2
See `QUICK-START.md` Day 4 for deployment guide.

---

## 📝 Environment Variables

See `.env.example` for all required variables.

**Critical variables:**
- `AWS_ACCESS_KEY_ID` - AWS Bedrock access
- `AWS_SECRET_ACCESS_KEY` - AWS Bedrock access
- `TWILIO_ACCOUNT_SID` - Twilio services
- `TWILIO_AUTH_TOKEN` - Twilio services
- `GOOGLE_CREDENTIALS_PATH` - Google Cloud services

---

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL, MongoDB, Redis are running
- Verify .env file has all required variables
- Check logs in `backend/logs/`

### Frontend won't connect to backend
- Verify backend is running on port 3000
- Check CORS settings in backend
- Verify `FRONTEND_URL` in backend .env

### WhatsApp bot not responding
- Check Twilio webhook URL is correct
- Verify WhatsApp sandbox is connected
- Check backend logs for errors

### IVR not working
- Verify Twilio phone number is configured
- Check voice webhook URL
- Test Google Cloud TTS/STT credentials

---

## 📞 Support

- **Documentation:** See docs/ folder
- **Issues:** Create GitHub issue
- **Email:** your-email@example.com

---

## 👥 Team

- Developer 1: Backend + Infrastructure
- Developer 2: Frontend + Integration

---

## 📅 Timeline

- **Day 1 (Mar 4):** Foundation & Core Backend
- **Day 2 (Mar 5):** Frontend & WhatsApp
- **Day 3 (Mar 6):** IVR & Polish
- **Day 4 (Mar 7):** Deployment & Demo Prep
- **Day 5 (Mar 8):** DEMO DAY! 🎉

---

## 🎯 Success Metrics

By March 8, we must have:
- ✅ Working website (public URL)
- ✅ WhatsApp bot responding
- ✅ IVR system answering calls
- ✅ Claude AI generating responses
- ✅ Image upload working
- ✅ 20+ government schemes
- ✅ Demo video (3 min)
- ✅ Pitch deck (10 slides)

---

## 💰 Cost

**Total estimated cost:** ~$20-30 for hackathon
- AWS Bedrock: $5-10
- Twilio: $0 (free trial)
- Google Cloud: $0 (free tier)
- AWS EC2: $10-15

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

- AWS for Bedrock access
- Twilio for communication APIs
- Google Cloud for voice services
- OpenWeatherMap for weather data
- Government of India for scheme data

---

## 🚀 LET'S BUILD!

**Next Steps:**
1. Open `API-CREDENTIALS-CHECKLIST.md`
2. Sign up for all services (2 hours)
3. Open `QUICK-START.md`
4. Follow Day 1 plan
5. Build something amazing! 💪

---

**"Empowering India, One Conversation at a Time"** 🇮🇳
