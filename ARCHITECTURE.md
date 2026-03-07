# 🏗️ SamarthBharat Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  WhatsApp    │  │     IVR      │          │
│  │  (React)     │  │     Bot      │  │   (Voice)    │          │
│  │ Port: 5173   │  │   (Twilio)   │  │  (Twilio)    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │   Port: 3000    │
                    └────────┬────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                      │
┌─────────▼─────────┐                 ┌─────────▼─────────┐
│  Express Backend  │                 │   Middleware      │
│                   │                 │                   │
│  ┌─────────────┐  │                 │  ┌─────────────┐ │
│  │   Routes    │  │                 │  │Rate Limiter │ │
│  │             │  │                 │  │   (Redis)   │ │
│  │ • Auth      │  │                 │  ├─────────────┤ │
│  │ • Chat      │  │                 │  │   Logger    │ │
│  │ • Schemes   │  │                 │  ├─────────────┤ │
│  │ • Mandi     │  │                 │  │Error Handler│ │
│  │ • Weather   │  │                 │  └─────────────┘ │
│  │ • Voice     │  │                 └───────────────────┘
│  │ • Webhooks  │  │
│  └─────────────┘  │
└─────────┬─────────┘
          │
          ├──────────────────┬──────────────────┬──────────────────┐
          │                  │                  │                  │
┌─────────▼─────────┐ ┌──────▼──────┐ ┌────────▼────────┐ ┌──────▼──────┐
│   Mock Data       │ │  External   │ │   Future DBs    │ │   Cache     │
│                   │ │    APIs     │ │                 │ │             │
│ • Schemes JSON    │ │             │ │ • PostgreSQL    │ │ • Redis     │
│ • Mandi JSON      │ │ • Claude AI │ │ • MongoDB       │ │             │
│ • Weather Mock    │ │ • Twilio    │ │                 │ │ • Sessions  │
│                   │ │ • Google    │ │                 │ │ • Weather   │
│                   │ │ • OpenWeather│ │                 │ │ • Prices    │
└───────────────────┘ └─────────────┘ └─────────────────┘ └─────────────┘
```

## Current Implementation (MVP)

### Frontend (React)
```
src/
├── App.tsx                    # Main app with routing
├── pages/
│   ├── LandingPage.tsx       # 3-section landing page
│   └── ChatPage.tsx          # Chat interface
├── main.tsx                   # Entry point
└── index.css                  # Tailwind styles
```

**Features:**
- 3 user type sections (Farmer, Student, Startup)
- Full chat interface with message bubbles
- Image upload UI
- Quick action buttons
- Voice input buttons (UI ready)
- Mobile responsive

### Backend (Express + TypeScript)
```
src/
├── server.ts                  # Main server
├── routes/
│   ├── auth.routes.ts        # OTP authentication (mock)
│   ├── chat.routes.ts        # AI chat (mock responses)
│   ├── scheme.routes.ts      # Government schemes
│   ├── mandi.routes.ts       # Mandi prices
│   ├── weather.routes.ts     # Weather forecast
│   ├── user.routes.ts        # User profile
│   ├── voice.routes.ts       # Voice I/O (mock)
│   ├── webhook.routes.ts     # WhatsApp/IVR
│   └── health.routes.ts      # Health check
├── middleware/
│   ├── errorHandler.ts       # Error handling
│   ├── requestLogger.ts      # Request logging
│   └── rateLimiter.ts        # Rate limiting
├── config/
│   └── redis.ts              # Redis config
├── utils/
│   └── logger.ts             # Winston logger
└── data/
    ├── mockSchemes.json      # 12 schemes
    └── mockMandiPrices.json  # 15 crops
```

**Features:**
- RESTful API endpoints
- Mock AI responses (context-aware)
- JSON-based data storage
- Rate limiting (100 req/min)
- Error handling
- Request logging
- CORS enabled

## Data Flow

### Chat Flow
```
User Types Message
       ↓
Frontend (ChatPage.tsx)
       ↓
POST /api/chat/message
       ↓
Backend (chat.routes.ts)
       ↓
Mock AI Response (context-aware)
       ↓
Response with:
  - AI message
  - Quick actions
  - Suggestions
       ↓
Frontend displays message
```

### Scheme Search Flow
```
User Selects User Type
       ↓
Frontend sends request
       ↓
GET /api/schemes?userType=farmer
       ↓
Backend (scheme.routes.ts)
       ↓
Filter mockSchemes.json
       ↓
Return filtered schemes
       ↓
Frontend displays schemes
```

### Image Upload Flow
```
User Uploads Image
       ↓
Frontend (ChatPage.tsx)
       ↓
POST /api/chat/message (with attachment)
       ↓
Backend (chat.routes.ts)
       ↓
Mock Image Analysis
       ↓
Return diagnosis:
  - Disease name
  - Severity
  - Treatment
       ↓
Frontend displays diagnosis
```

## API Endpoints

### Authentication
- `POST /api/auth/request-otp` - Send OTP (mock)
- `POST /api/auth/verify-otp` - Verify OTP (mock)
- `POST /api/auth/refresh` - Refresh token (mock)

### Chat
- `POST /api/chat/message` - Send message, get AI response
- `GET /api/chat/history` - Get conversation history

### Schemes
- `GET /api/schemes` - List schemes (with filters)
- `GET /api/schemes/:id` - Get scheme details
- `POST /api/schemes/check-eligibility` - Check eligibility

### Mandi Prices
- `GET /api/mandi/prices` - Get mandi prices (with filters)

### Weather
- `GET /api/weather/forecast` - Get weather forecast

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `DELETE /api/user/profile` - Delete profile

### Voice
- `POST /api/voice/transcribe` - Speech to text (mock)
- `POST /api/voice/synthesize` - Text to speech (mock)

### Webhooks
- `POST /webhooks/whatsapp` - WhatsApp webhook
- `POST /webhooks/voice` - IVR webhook
- `POST /webhooks/voice/menu` - IVR menu handler

### Health
- `GET /api/health` - Health check

## Mock Data Structure

### Government Scheme
```json
{
  "id": "pm-kisan",
  "name": "PM-KISAN",
  "nameLocal": { "hi": "प्रधानमंत्री किसान सम्मान निधि" },
  "description": "Income support scheme...",
  "category": "agriculture",
  "targetUserTypes": ["farmer"],
  "eligibility": ["Small farmers", "Land up to 2 hectares"],
  "benefits": ["₹6000 per year"],
  "applicationProcess": "Visit pmkisan.gov.in...",
  "requiredDocuments": ["Aadhaar", "Bank details"],
  "officialLink": "https://pmkisan.gov.in/",
  "helplineNumber": "155261",
  "isOngoing": true
}
```

### Mandi Price
```json
{
  "crop": "Wheat",
  "variety": "Lokwan",
  "market": "Azadpur Mandi",
  "state": "Delhi",
  "district": "North Delhi",
  "date": "2024-03-04",
  "minPrice": 2000,
  "maxPrice": 2200,
  "modalPrice": 2100,
  "unit": "quintal",
  "trend": "up"
}
```

## Future Architecture (With Real APIs)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACES                          │
│  Web App | WhatsApp Bot | IVR System | Mobile App               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                ┌─────────▼─────────┐
                │   Load Balancer   │
                │   (AWS ALB)       │
                └─────────┬─────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
┌─────────▼─────────┐         ┌──────────▼──────────┐
│  API Server 1     │         │  API Server 2       │
│  (Auto-scaling)   │         │  (Auto-scaling)     │
└─────────┬─────────┘         └──────────┬──────────┘
          │                               │
          └───────────────┬───────────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
┌─────────▼─────────┐         ┌──────────▼──────────┐
│  AWS Bedrock      │         │  Twilio Services    │
│  (Claude AI)      │         │  (WhatsApp/Voice)   │
└───────────────────┘         └─────────────────────┘
          │                               │
┌─────────▼─────────┐         ┌──────────▼──────────┐
│  Google Cloud     │         │  OpenWeatherMap     │
│  (STT/TTS)        │         │  (Weather API)      │
└───────────────────┘         └─────────────────────┘
          │
┌─────────▼─────────────────────────────────────────┐
│              Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │PostgreSQL│  │ MongoDB  │  │  Redis   │        │
│  │  (RDS)   │  │(DocumentDB)│ │(ElastiCache)│    │
│  └──────────┘  └──────────┘  └──────────┘        │
└────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                  │
├─────────────────────────────────────────┤
│                                          │
│  1. HTTPS/TLS (SSL Certificate)         │
│     └─ All traffic encrypted             │
│                                          │
│  2. Rate Limiting (Redis)                │
│     └─ 100 requests/min per user        │
│                                          │
│  3. Input Sanitization                   │
│     └─ Prevent XSS, SQL injection       │
│                                          │
│  4. JWT Authentication                   │
│     └─ Secure token-based auth          │
│                                          │
│  5. CORS Protection                      │
│     └─ Whitelist frontend domain        │
│                                          │
│  6. Helmet.js Security Headers           │
│     └─ XSS, clickjacking protection     │
│                                          │
└─────────────────────────────────────────┘
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    CloudFlare CDN                        │
│              (Static Assets, DDoS Protection)            │
└─────────────────────────┬───────────────────────────────┘
                          │
                ┌─────────▼─────────┐
                │   Route 53 DNS    │
                └─────────┬─────────┘
                          │
                ┌─────────▼─────────┐
                │  CloudFront CDN   │
                │  (AWS)            │
                └─────────┬─────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
┌─────────▼─────────┐         ┌──────────▼──────────┐
│  S3 Bucket        │         │  Application        │
│  (Static Files)   │         │  Load Balancer      │
└───────────────────┘         └──────────┬──────────┘
                                         │
                          ┌──────────────┴──────────────┐
                          │                             │
                ┌─────────▼─────────┐       ┌──────────▼──────────┐
                │  EC2 Instance 1   │       │  EC2 Instance 2     │
                │  (Auto-scaling)   │       │  (Auto-scaling)     │
                └─────────┬─────────┘       └──────────┬──────────┘
                          │                             │
                          └──────────────┬──────────────┘
                                         │
                          ┌──────────────▼──────────────┐
                          │     Database Layer          │
                          │  RDS | DocumentDB | Redis   │
                          └─────────────────────────────┘
```

## Performance Optimization

### Frontend
- Code splitting (React.lazy)
- Image optimization (WebP)
- Lazy loading
- Service Worker (PWA)
- Gzip compression
- CDN for static assets

### Backend
- Response caching (Redis)
- Database indexing
- Connection pooling
- Query optimization
- API response compression
- Rate limiting

### Network
- HTTP/2
- CDN (CloudFront)
- Load balancing
- Auto-scaling
- Health checks

## Monitoring & Logging

```
┌─────────────────────────────────────────┐
│         Monitoring Stack                 │
├─────────────────────────────────────────┤
│                                          │
│  Application Logs                        │
│  └─ Winston → CloudWatch Logs           │
│                                          │
│  Error Tracking                          │
│  └─ Sentry (future)                     │
│                                          │
│  Performance Monitoring                  │
│  └─ CloudWatch Metrics                  │
│                                          │
│  API Monitoring                          │
│  └─ Response times, error rates         │
│                                          │
│  User Analytics                          │
│  └─ Usage patterns, popular features    │
│                                          │
└─────────────────────────────────────────┘
```

## Scalability Plan

### Phase 1: MVP (Current)
- Single server
- Mock data
- Local development

### Phase 2: Production
- AWS EC2 deployment
- Real APIs integrated
- Basic monitoring

### Phase 3: Scale
- Auto-scaling groups
- Load balancer
- CDN
- Database replication

### Phase 4: Enterprise
- Multi-region deployment
- Microservices architecture
- Advanced caching
- Real-time analytics

---

**Current Status:** Phase 1 (MVP) - Complete and ready for demo!
