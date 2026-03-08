# 🇮🇳 SamarthBharat — AI-Powered Platform for Rural India

> **Empowering farmers, students, and small business owners** with real-time government scheme access, AI chat assistance, weather/crop intelligence, and multilingual support — all deployed on AWS.

**Live Demo:** [http://astech-samarthbharat-s3-bucket.s3-website.ap-south-1.amazonaws.com](http://astech-samarthbharat-s3-bucket.s3-website.ap-south-1.amazonaws.com)  
**API Health:** [http://13.204.54.234:3000/api/health](http://13.204.54.234:3000/api/health)

---

## 🏗️ Architecture — 10 AWS Services

| # | AWS Service | Purpose | Status |
|---|-------------|---------|--------|
| 1 | **Amazon Bedrock** | AI chat (Nova Lite model) | ✅ Active |
| 2 | **DynamoDB** | Chat history, user profiles, translation cache | ✅ 5 Tables |
| 3 | **S3** | Frontend hosting + image uploads | ✅ Active |
| 4 | **EC2** | Backend API server (t2.micro, Elastic IP) | ✅ Running |
| 5 | **RDS** | PostgreSQL 15 database (db.t3.micro) | ✅ Provisioned |
| 6 | **ElastiCache** | Redis 7.0 caching layer | ✅ Provisioned |
| 7 | **CloudFront** | CDN for frontend distribution | ✅ Active |
| 8 | **CloudWatch** | Metrics, logs, dashboards, alarms | ✅ Active |
| 9 | **Route 53** | DNS (samarthbharat.in) + health checks | ✅ Configured |
| 10 | **IAM** | Role-based access (8 policies) | ✅ Active |

---

## ✨ Key Features

### For Farmers 🌾
- AI-powered crop diagnosis & soil health analysis
- Real-time mandi prices (15+ commodities)
- Live weather forecasts (OpenWeatherMap)
- Government schemes: PM-KISAN, PMFBY, Kisan Credit Card
- Multilingual support (Hindi, Tamil, Telugu, Kannada, Bengali + more)

### For Students 📚
- Scholarship finder with eligibility matching
- Career guidance & study roadmaps
- College finder tool
- Government schemes: NSP, PM Vidyalakshmi, AICTE scholarships

### For Small Businesses 💼
- Business registration guidance
- Compliance & licensing help
- Government schemes: MUDRA, Startup India, Stand-Up India

### AI Chatbot 🤖
- Amazon Bedrock (Nova Lite) → Gemini 2.0 Flash → OpenAI fallback chain
- Context-aware responses based on user type
- Chat history saved to DynamoDB

### Translation 🌐
- 12 Indian languages supported
- MyMemory API → Gemini fallback
- Translation cache in DynamoDB

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 · TypeScript · Vite 5 · Tailwind CSS 3.4 |
| **Backend** | Node.js 18 · Express 4.18 · TypeScript (tsx) |
| **AI** | Amazon Bedrock Nova Lite · Google Gemini 2.0 · OpenAI |
| **Database** | DynamoDB · PostgreSQL 15 (RDS) · Redis 7.0 (ElastiCache) |
| **Hosting** | S3 + CloudFront (frontend) · EC2 + PM2 (backend) |
| **APIs** | OpenWeatherMap · MyMemory Translation · Twilio |

---

## 📂 Project Structure

```
samarthbharat-mvp/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Express API entry point
│   │   ├── routes/            # 12 API route modules
│   │   │   ├── ai.routes.ts       # Bedrock AI endpoints
│   │   │   ├── chat.routes.ts     # Chat with AI
│   │   │   ├── health.routes.ts   # 10-service health check
│   │   │   ├── translate.ts       # Translation API
│   │   │   ├── weather.routes.ts  # OpenWeatherMap
│   │   │   ├── scheme.routes.ts   # Government schemes
│   │   │   ├── mandi.routes.ts    # Mandi prices
│   │   │   └── ...
│   │   ├── services/          # AWS service integrations
│   │   │   ├── bedrock.ts         # Amazon Bedrock AI
│   │   │   ├── dynamodb.ts        # DynamoDB operations
│   │   │   ├── s3.ts              # S3 file uploads
│   │   │   ├── rds.ts             # PostgreSQL connection
│   │   │   ├── elasticache.ts     # Redis caching
│   │   │   ├── cloudwatch.ts      # Metrics publishing
│   │   │   └── weather.ts         # Weather service
│   │   ├── middleware/        # Auth, rate limiting, logging
│   │   └── data/              # Mock data (JSON)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Router with 20+ pages
│   │   ├── pages/             # All feature pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   ├── WeatherPage.tsx
│   │   │   ├── MandiPricesPage.tsx
│   │   │   ├── CropDiagnosisPage.tsx
│   │   │   ├── SoilHealthPage.tsx
│   │   │   ├── FarmerSchemesPage.tsx
│   │   │   ├── StudentSchemesPage.tsx
│   │   │   ├── ScholarshipFinderPage.tsx
│   │   │   ├── CareerGuidancePage.tsx
│   │   │   └── ...
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # Language context provider
│   │   └── hooks/             # Translation hook
│   └── package.json
│
└── README.md
```

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/samarthbharat-mvp.git
cd samarthbharat-mvp

# Backend
cd backend
npm install
cp .env.example .env   # Add your API keys
npx tsx src/server.ts   # Starts on port 3000

# Frontend (new terminal)
cd frontend
npm install
npm run dev             # Starts on port 5173
```

---

## 🌐 Deployment (AWS)

- **Frontend** → S3 static website + CloudFront CDN
- **Backend** → EC2 (t2.micro) with PM2 process manager
- **Database** → DynamoDB (on-demand), RDS PostgreSQL, ElastiCache Redis
- **DNS** → Route 53 (samarthbharat.in)

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Full 10-service health check |
| `/api/chat` | POST | AI chat (Bedrock → Gemini → OpenAI) |
| `/api/translate` | POST | Translate text (12 languages) |
| `/api/translate-batch` | POST | Batch translation |
| `/api/weather/current/:city` | GET | Live weather data |
| `/api/schemes` | GET | Government schemes list |
| `/api/mandi/prices` | GET | Commodity market prices |
| `/api/ai/bedrock` | POST | Direct Bedrock AI query |
| `/api/crop/diagnose` | POST | Crop disease analysis |

---

## 👥 Team ASTech

Built for the **AI for Bharat Hackathon** — March 2026

---

## 📄 License

MIT License

---

**"Empowering India, One Conversation at a Time"** 🇮🇳
