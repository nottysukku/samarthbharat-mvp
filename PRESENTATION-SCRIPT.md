# 🎤 SamarthBharat — 2 Minute Presentation Script

## Team ASTech | AI for Bharat Hackathon

---

### 🎬 OPENING (15 sec)

> "Namaste! We're Team ASTech, and we built **SamarthBharat** — an AI-powered platform that empowers India's farmers, students, and small business owners to access government schemes, get real-time intelligence, and chat with AI — all in their local language."

---

### 🏗️ AWS ARCHITECTURE (20 sec)

> "Our platform runs on **10 AWS services**:
> - **Amazon Bedrock** powers our AI chatbot using the Nova Lite model
> - **DynamoDB** stores chat history and user profiles
> - **S3 + CloudFront** hosts our frontend globally
> - **EC2** runs our Node.js backend API
> - **RDS PostgreSQL** and **ElastiCache Redis** handle data and caching
> - Plus **CloudWatch** for monitoring, **Route 53** for DNS, and **IAM** for security"

*[Show the /api/health endpoint — all 10 services green]*

---

### 🌾 LIVE DEMO — FARMER (30 sec)

> "Let me show you SamarthBharat in action."

1. **Open the live site** (S3 URL)
2. **Click "Farmer"** on the landing page
3. **Open Chat** → Type: *"What is the price of wheat today?"*
   - AI responds with real mandi prices
4. **Show Weather page** → Real-time forecast from OpenWeatherMap
5. **Show Schemes page** → PM-KISAN, PMFBY with eligibility details

> "Everything here is REAL data — real AI, real weather, real schemes."

---

### 📚 STUDENT DEMO (20 sec)

1. **Go back → Click "Student"**
2. **Show Scholarship Finder** → Matching scholarships by eligibility
3. **Open Chat** → Type: *"Guide me for NEET preparation"*
   - AI gives a personalized study roadmap

> "Students can find scholarships, plan careers, and get AI mentoring."

---

### 🌐 LANGUAGE DEMO (15 sec)

1. **Click Language Selector** (top-right)
2. **Switch to Hindi** → Entire UI translates
3. **Switch to Tamil** → Changes again

> "We support **12 Indian languages** — the entire interface translates dynamically using our translation API with DynamoDB caching."

---

### 🎯 CLOSING (20 sec)

> "SamarthBharat bridges the digital divide for **800 million** rural Indians who struggle to access government benefits. With Amazon Bedrock AI, multilingual support, and a fully cloud-native architecture on 10 AWS services — we're making government schemes accessible to everyone."
>
> "The platform is **live right now** — deployed on AWS, accessible from any browser. Thank you!"

---

## 📌 KEY TALKING POINTS (if judges ask)

- **Why Bedrock?** Multi-model fallback: Bedrock Nova → Gemini → OpenAI. Never fails.
- **Cost?** Under $40/month for all 10 services. DynamoDB on-demand = pay per request.
- **Scalability?** CloudFront CDN, ElastiCache Redis, DynamoDB auto-scaling — handles millions of users.
- **Security?** IAM role with 8 specific policies (least privilege), Helmet.js, CORS, rate limiting.
- **Data?** Real government scheme data, live OpenWeatherMap API, real AI responses.
- **Languages?** Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Malayalam, Punjabi, Odia, Assamese, Urdu.

## 🔗 URLS TO HAVE OPEN

1. **Live Site:** http://astech-samarthbharat-s3-bucket.s3-website.ap-south-1.amazonaws.com
2. **Health Check:** http://13.204.54.234:3000/api/health
3. **GitHub:** (your repo URL)
