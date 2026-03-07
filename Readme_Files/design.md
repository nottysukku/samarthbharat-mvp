# Design Document: SamarthBharat Platform

## Overview

The SamarthBharat platform is designed as a multi-channel, AI-powered assistant system that provides accessible information and support to underserved Indian communities. The architecture prioritizes low-bandwidth optimization, multilingual support, and graceful degradation across varying levels of technology access.

### Design Principles

1. **Channel Agnostic**: Core business logic independent of delivery channel
2. **Progressive Enhancement**: Basic functionality for all devices, enhanced features for capable devices
3. **Offline-First**: Cache-first strategy with background sync
4. **Fail-Safe**: Graceful degradation when services are unavailable
5. **Privacy-Focused**: Minimal data collection, user control over data
6. **Performance-Optimized**: Sub-3-second load times on 3G networks

### Technology Stack

**Frontend:**
- Web: React.js with PWA capabilities
- Mobile: React Native (post-MVP)
- State Management: Redux Toolkit
- UI Framework: Material-UI with custom theming
- Build Tool: Vite for fast development

**Backend:**
- Runtime: Node.js 18+ with Express.js
- API: RESTful with GraphQL for complex queries (optional)
- Authentication: JWT with refresh tokens
- Session Management: Redis for session storage

**Databases:**
- PostgreSQL 15: Structured data (users, schemes, profiles)
- MongoDB 6: Unstructured data (conversations, logs)
- Redis: Caching and session management

**AI & ML:**
- LLM: Claude 3 via Amazon Bedrock
- Vision: Claude Vision for image analysis
- Speech: Google Cloud STT/TTS

**Communication Services:**
- WhatsApp/SMS/IVR: Twilio API
- Email: SendGrid (future)
- Push Notifications: Firebase Cloud Messaging

**External APIs:**
- Weather: OpenWeatherMap API
- Mandi Prices: Agmarknet API (static data for MVP)

**Infrastructure:**
- Hosting: AWS (EC2, S3, CloudFront)
- CDN: CloudFront for static assets
- Monitoring: CloudWatch, Sentry for error tracking
- CI/CD: GitHub Actions


## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Web    │  │  Mobile  │  │ WhatsApp │  │   SMS    │       │
│  │   PWA    │  │   App    │  │   Bot    │  │ Gateway  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│       │             │              │              │              │
└───────┼─────────────┼──────────────┼──────────────┼─────────────┘
        │             │              │              │
        └─────────────┴──────────────┴──────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │      API Gateway / Load Balancer   │
        │         (Rate Limiting)            │
        └─────────────────┬─────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │      Application Layer             │
        │  ┌──────────────────────────────┐ │
        │  │   Express.js API Server      │ │
        │  │  - Authentication Service    │ │
        │  │  - Chat Service              │ │
        │  │  - User Service              │ │
        │  │  - Notification Service      │ │
        │  │  - Scheme Service            │ │
        │  └──────────────────────────────┘ │
        └─────────────────┬─────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │      Integration Layer             │
        │  ┌────────┐  ┌────────┐  ┌──────┐│
        │  │ Claude │  │ Twilio │  │ APIs ││
        │  │Bedrock │  │        │  │      ││
        │  └────────┘  └────────┘  └──────┘│
        └─────────────────┬─────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │      Data Layer                    │
        │  ┌──────────┐  ┌──────────┐       │
        │  │PostgreSQL│  │ MongoDB  │       │
        │  │  Redis   │  │          │       │
        │  └──────────┘  └──────────┘       │
        └────────────────────────────────────┘
```

### Component Architecture

The system follows a modular, service-oriented architecture with clear separation of concerns:

**1. API Gateway Layer**
- Request routing and load balancing
- Rate limiting (100 requests/minute per user)
- Request/response logging
- CORS handling
- SSL termination

**2. Authentication Service**
- Phone number-based authentication
- OTP generation and verification via Twilio
- JWT token generation and validation
- Session management with Redis
- User profile creation and updates

**3. Chat Service**
- Message routing to appropriate handlers
- Conversation context management
- Multi-turn conversation support
- Message history storage and retrieval
- Quick action button generation based on user type

**4. AI Orchestration Service**
- Claude API integration via Amazon Bedrock
- Prompt engineering and context injection
- Response streaming for real-time feedback
- Vision API integration for image analysis
- Language detection and translation coordination

**5. Voice Service**
- Google STT integration for speech-to-text
- Google TTS integration for text-to-speech
- Language detection from audio
- Audio format conversion and optimization
- IVR menu navigation logic

**6. Channel Adapters**
- Web/Mobile Adapter: REST API endpoints
- WhatsApp Adapter: Twilio webhook handlers
- SMS Adapter: Twilio SMS handlers
- IVR Adapter: Twilio Voice handlers
- Each adapter normalizes channel-specific formats to internal message format

**7. User Service**
- User profile CRUD operations
- User type classification (farmer, student, startup)
- Location management
- Language preference management
- Conversation history access

**8. Scheme Service**
- Government scheme database management
- Eligibility checking logic
- Scheme search and filtering
- Scheme recommendation engine
- Application guidance generation

**9. Notification Service**
- Multi-channel notification delivery
- Notification scheduling and queuing
- User preference management
- Delivery status tracking
- Template management for different notification types

**10. External Integration Service**
- Weather API integration (OpenWeatherMap)
- Mandi price API integration (Agmarknet)
- Retry logic with exponential backoff
- Circuit breaker pattern for resilience
- Response caching for performance

**11. Analytics Service**
- User engagement tracking
- Feature usage metrics
- Performance monitoring
- Error rate tracking
- Daily report generation


## Components and Interfaces

### Frontend Components

#### Web Application (React PWA)

**Landing Page Component**
```typescript
interface LandingPageProps {
  onUserTypeSelect: (userType: 'farmer' | 'student' | 'startup') => void;
}

// Displays three sections with visual cards for each user type
// Handles navigation to chat interface with pre-configured context
```

**Chat Interface Component**
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

interface Attachment {
  type: 'image' | 'document';
  url: string;
  filename: string;
  size: number;
}

interface ChatInterfaceProps {
  userType: 'farmer' | 'student' | 'startup';
  messages: Message[];
  onSendMessage: (content: string, attachments?: File[]) => void;
  onVoiceInput: (audioBlob: Blob, mode: 'auto' | 'manual', language?: string) => void;
  isLoading: boolean;
}

// Features:
// - Message list with auto-scroll
// - Multi-line text input with send button
// - Image upload (camera + gallery)
// - File upload (PDF, documents)
// - Two microphone buttons with different behaviors
// - Quick action buttons based on user type
// - Typing indicators
// - Error handling and retry
```

**Voice Input Components**
```typescript
interface VoiceInputAutoProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isRecording: boolean;
}

// Primary microphone with auto language detection
// Shows colorful wave animation during recording
// Handles audio capture and blob creation

interface VoiceInputManualProps {
  onRecordingComplete: (audioBlob: Blob, language: 'en' | 'hi') => void;
  selectedLanguage: 'en' | 'hi';
  onLanguageToggle: () => void;
  isRecording: boolean;
}

// Secondary microphone with EN/HI toggle
// Shows dual-flag indicator
// Allows manual language selection
```

**Quick Action Buttons**
```typescript
interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string; // Pre-defined query to send
}

// Farmer actions: "Check Mandi Prices", "Weather Forecast", "Diagnose Crop Disease"
// Student actions: "Find Scholarships", "Generate Study Plan", "Exam Resources"
// Startup actions: "Funding Schemes", "Compliance Guide", "Market Research"
```

**Image Upload Component**
```typescript
interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  maxSize: number; // 5MB
  acceptedFormats: string[]; // ['image/jpeg', 'image/png']
}

// Supports camera capture and gallery selection
// Client-side image compression before upload
// Preview before sending
```

#### Mobile Application (React Native - Post-MVP)

Similar component structure to web with native optimizations:
- Native camera integration
- Native file picker
- Native audio recording
- Offline storage with AsyncStorage
- Background sync capabilities

### Backend API Interfaces

#### Authentication API

```typescript
// POST /api/auth/request-otp
interface RequestOTPRequest {
  phoneNumber: string; // E.164 format: +91XXXXXXXXXX
  countryCode: string; // 'IN'
}

interface RequestOTPResponse {
  success: boolean;
  message: string;
  expiresIn: number; // seconds
}

// POST /api/auth/verify-otp
interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

interface VerifyOTPResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

// POST /api/auth/refresh
interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}
```

#### Chat API

```typescript
// POST /api/chat/message
interface SendMessageRequest {
  message: string;
  userType: 'farmer' | 'student' | 'startup';
  conversationId?: string;
  attachments?: {
    type: 'image' | 'document';
    data: string; // Base64 encoded
    filename: string;
  }[];
}

interface SendMessageResponse {
  conversationId: string;
  response: string;
  suggestions?: string[]; // Follow-up suggestions
  quickActions?: QuickAction[];
}

// GET /api/chat/history
interface GetHistoryRequest {
  conversationId?: string;
  limit?: number;
  offset?: number;
}

interface GetHistoryResponse {
  conversations: {
    id: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
}
```

#### Voice API

```typescript
// POST /api/voice/transcribe
interface TranscribeRequest {
  audio: string; // Base64 encoded audio
  mode: 'auto' | 'manual';
  language?: string; // Required if mode is 'manual'
}

interface TranscribeResponse {
  text: string;
  detectedLanguage?: string; // Present if mode is 'auto'
  confidence: number;
}

// POST /api/voice/synthesize
interface SynthesizeRequest {
  text: string;
  language: string;
  voice?: string; // Optional voice selection
}

interface SynthesizeResponse {
  audio: string; // Base64 encoded audio
  duration: number; // seconds
}
```

#### Scheme API

```typescript
// GET /api/schemes
interface GetSchemesRequest {
  userType?: 'farmer' | 'student' | 'startup';
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string;
  documents: string[];
  deadline?: Date;
  officialLink: string;
}

interface GetSchemesResponse {
  schemes: Scheme[];
  total: number;
}

// POST /api/schemes/check-eligibility
interface CheckEligibilityRequest {
  schemeId: string;
  userProfile: {
    age?: number;
    income?: number;
    category?: string;
    state?: string;
    // Other relevant fields
  };
}

interface CheckEligibilityResponse {
  eligible: boolean;
  reasons: string[];
  missingInfo?: string[];
}
```

#### User API

```typescript
// GET /api/user/profile
interface GetProfileResponse {
  id: string;
  phoneNumber: string;
  userType?: 'farmer' | 'student' | 'startup';
  location?: {
    state: string;
    district: string;
    pincode: string;
  };
  language: string;
  preferences: {
    notifications: {
      push: boolean;
      sms: boolean;
      whatsapp: boolean;
      email: boolean;
    };
  };
  createdAt: Date;
}

// PUT /api/user/profile
interface UpdateProfileRequest {
  userType?: 'farmer' | 'student' | 'startup';
  location?: {
    state: string;
    district: string;
    pincode: string;
  };
  language?: string;
  preferences?: {
    notifications: {
      push?: boolean;
      sms?: boolean;
      whatsapp?: boolean;
      email?: boolean;
    };
  };
}

// DELETE /api/user/profile
// Deletes user account and all associated data
```

#### Weather API

```typescript
// GET /api/weather/forecast
interface GetWeatherRequest {
  location: {
    latitude: number;
    longitude: number;
  } | {
    pincode: string;
  };
  days?: number; // Default 7
}

interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
    unit: 'celsius';
  };
  rainfall: {
    probability: number; // 0-100
    amount?: number; // mm
  };
  wind: {
    speed: number; // km/h
    direction: string;
  };
  advisory: string; // Farming-specific advisory
}

interface GetWeatherResponse {
  location: string;
  forecast: WeatherForecast[];
}
```

#### Mandi Price API

```typescript
// GET /api/mandi/prices
interface GetMandiPricesRequest {
  location?: string; // State or district
  crop?: string;
  date?: Date;
}

interface MandiPrice {
  crop: string;
  variety?: string;
  market: string;
  state: string;
  district: string;
  date: Date;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string; // 'quintal'
  trend: 'up' | 'down' | 'stable';
}

interface GetMandiPricesResponse {
  prices: MandiPrice[];
  nearestMarket?: {
    name: string;
    distance: number; // km
  };
}
```

### WhatsApp Bot Interface

```typescript
// Webhook handler for incoming WhatsApp messages
interface WhatsAppWebhook {
  from: string; // Phone number
  body: string; // Message text
  mediaUrl?: string; // Image/document URL
  mediaType?: string;
}

// Response format
interface WhatsAppResponse {
  to: string;
  body: string;
  mediaUrl?: string;
}

// Bot commands:
// - "help" - Show available commands
// - "price [crop]" - Get mandi prices
// - "weather" - Get weather forecast
// - "schemes" - List government schemes
// - "roadmap [exam]" - Generate study roadmap
// - Send image - Crop disease diagnosis
```

### SMS Gateway Interface

```typescript
// Incoming SMS handler
interface SMSWebhook {
  from: string;
  body: string;
}

// Outgoing SMS
interface SMSResponse {
  to: string;
  body: string; // Max 160 characters per segment
}

// SMS commands similar to WhatsApp
// Responses are concise due to character limits
```

### IVR System Interface

```typescript
// IVR menu structure
interface IVRMenu {
  greeting: string; // TTS greeting
  options: {
    digit: string;
    label: string;
    action: 'submenu' | 'handler' | 'callback';
    submenu?: IVRMenu;
    handler?: string;
  }[];
}

// Example IVR flow:
// "Press 1 for Farmer services"
// "Press 2 for Student services"
// "Press 3 for Startup services"
// "Press 9 to speak with an agent"
```


## Data Models

### User Model (PostgreSQL)

```typescript
interface User {
  id: string; // UUID
  phoneNumber: string; // Unique, indexed
  phoneVerified: boolean;
  userType?: 'farmer' | 'student' | 'startup';
  
  // Profile information
  profile: {
    name?: string;
    age?: number;
    gender?: string;
    
    // Location
    location?: {
      state: string;
      district: string;
      pincode: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    
    // Language preference
    language: string; // ISO 639-1 code (en, hi, ta, etc.)
    
    // User-type specific data
    farmerData?: {
      landSize?: number; // acres
      crops?: string[];
      farmingType?: 'organic' | 'conventional' | 'mixed';
    };
    
    studentData?: {
      education?: string;
      targetExams?: string[];
      subjects?: string[];
    };
    
    startupData?: {
      businessName?: string;
      sector?: string;
      stage?: 'idea' | 'mvp' | 'early' | 'growth';
      registrationType?: string;
    };
  };
  
  // Preferences
  preferences: {
    notifications: {
      push: boolean;
      sms: boolean;
      whatsapp: boolean;
      email: boolean;
    };
    channels: string[]; // Preferred channels
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
}

// Indexes:
// - phoneNumber (unique)
// - userType
// - profile.location.state
// - createdAt
```

### Conversation Model (MongoDB)

```typescript
interface Conversation {
  _id: string; // MongoDB ObjectId
  userId: string; // Reference to User.id
  channel: 'web' | 'mobile' | 'whatsapp' | 'sms' | 'ivr';
  userType: 'farmer' | 'student' | 'startup';
  
  messages: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    
    // Attachments
    attachments?: {
      type: 'image' | 'document' | 'audio';
      url: string;
      filename: string;
      size: number;
      metadata?: any; // Image analysis results, etc.
    }[];
    
    // Metadata
    metadata?: {
      language?: string;
      confidence?: number;
      processingTime?: number;
      tokens?: number;
    };
  }[];
  
  // Context for multi-turn conversations
  context: {
    intent?: string;
    entities?: Record<string, any>;
    lastAction?: string;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Indexes:
// - userId
// - channel
// - createdAt
// - isActive
```

### Scheme Model (PostgreSQL)

```typescript
interface Scheme {
  id: string; // UUID
  name: string;
  nameLocal?: Record<string, string>; // Translations
  description: string;
  descriptionLocal?: Record<string, string>;
  
  // Categorization
  category: string; // 'agriculture' | 'education' | 'business' | 'social'
  subcategory?: string;
  targetUserTypes: ('farmer' | 'student' | 'startup')[];
  
  // Eligibility
  eligibility: {
    criteria: string[];
    criteriaLocal?: Record<string, string[]>;
    
    // Structured eligibility for automated checking
    structured?: {
      minAge?: number;
      maxAge?: number;
      maxIncome?: number;
      categories?: string[]; // SC/ST/OBC/General
      states?: string[]; // Applicable states
      gender?: 'male' | 'female' | 'other' | 'all';
    };
  };
  
  // Benefits
  benefits: string[];
  benefitsLocal?: Record<string, string[]>;
  
  // Application
  applicationProcess: string;
  applicationProcessLocal?: Record<string, string>;
  requiredDocuments: string[];
  officialLink: string;
  helplineNumber?: string;
  
  // Deadlines
  deadline?: Date;
  isOngoing: boolean;
  
  // Metadata
  source: string; // Government department
  lastUpdated: Date;
  isActive: boolean;
  priority: number; // For ranking
  
  createdAt: Date;
  updatedAt: Date;
}

// Indexes:
// - category
// - targetUserTypes (array index)
// - eligibility.structured.states (array index)
// - isActive
// - priority
```

### Notification Model (PostgreSQL)

```typescript
interface Notification {
  id: string; // UUID
  userId: string; // Reference to User.id
  
  // Content
  title: string;
  body: string;
  titleLocal?: Record<string, string>;
  bodyLocal?: Record<string, string>;
  
  // Type and priority
  type: 'mandi_price' | 'weather_alert' | 'scholarship_deadline' | 'scheme_update' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Delivery
  channels: ('push' | 'sms' | 'whatsapp' | 'email')[];
  deliveryStatus: {
    channel: string;
    status: 'pending' | 'sent' | 'delivered' | 'failed';
    sentAt?: Date;
    deliveredAt?: Date;
    error?: string;
  }[];
  
  // Scheduling
  scheduledFor?: Date;
  expiresAt?: Date;
  
  // Metadata
  metadata?: {
    schemeId?: string;
    conversationId?: string;
    actionUrl?: string;
  };
  
  createdAt: Date;
  readAt?: Date;
}

// Indexes:
// - userId
// - type
// - scheduledFor
// - createdAt
```

### Session Model (Redis)

```typescript
interface Session {
  sessionId: string; // Key
  userId: string;
  accessToken: string;
  refreshToken: string;
  
  // Device info
  deviceInfo: {
    userAgent: string;
    ip: string;
    platform: string;
  };
  
  // Timestamps
  createdAt: number; // Unix timestamp
  expiresAt: number; // Unix timestamp
  lastActivityAt: number;
}

// TTL: 30 minutes for access token, 7 days for refresh token
```

### Analytics Event Model (MongoDB)

```typescript
interface AnalyticsEvent {
  _id: string;
  userId?: string;
  sessionId?: string;
  
  // Event details
  eventType: string; // 'page_view' | 'message_sent' | 'feature_used' | 'error' | etc.
  eventData: Record<string, any>;
  
  // Context
  channel: 'web' | 'mobile' | 'whatsapp' | 'sms' | 'ivr';
  userType?: 'farmer' | 'student' | 'startup';
  
  // Technical details
  performance?: {
    loadTime?: number;
    responseTime?: number;
    errorRate?: number;
  };
  
  // Metadata
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}

// Indexes:
// - eventType
// - userId
// - timestamp
// - channel
```

### Cache Models (Redis)

```typescript
// Weather cache
interface WeatherCache {
  key: string; // "weather:{pincode}"
  data: WeatherForecast[];
  ttl: number; // 6 hours
}

// Mandi price cache
interface MandiPriceCache {
  key: string; // "mandi:{state}:{crop}"
  data: MandiPrice[];
  ttl: number; // 24 hours
}

// Scheme cache
interface SchemeCache {
  key: string; // "schemes:{userType}"
  data: Scheme[];
  ttl: number; // 1 hour
}

// Conversation context cache
interface ConversationContextCache {
  key: string; // "context:{conversationId}"
  data: {
    messages: Message[];
    context: any;
  };
  ttl: number; // 30 minutes
}
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Cross-Channel Consistency

*For any* user query and conversation context, when the same query is submitted through different channels (web, mobile, WhatsApp, SMS), the system should return semantically equivalent responses with consistent core information.

**Validates: Requirements 1.7**

### Property 2: Cross-Channel Context Preservation

*For any* user with an active conversation, when switching from one channel to another channel, the conversation history and context should be accessible and preserved in the new channel.

**Validates: Requirements 1.8**

### Property 3: User Type Context Initialization

*For any* user type selection (farmer, student, startup), when a user navigates to the chat interface, the system should initialize the conversation context with user-type-specific quick actions and appropriate AI prompting.

**Validates: Requirements 2.5**

### Property 4: Image Processing Performance

*For any* valid image upload (JPEG or PNG, under 5MB), the system should complete image processing and return results within 5 seconds.

**Validates: Requirements 3.8**

### Property 5: File Upload Validation

*For any* file upload attempt, the system should validate the file type and size before processing, rejecting files that don't match accepted formats (PDF, DOC, DOCX) or exceed the size limit (10MB), and accepting valid files.

**Validates: Requirements 3.9**

### Property 6: Voice Transcription Performance

*For any* voice input (audio blob under 60 seconds), the system should convert speech to text and return the transcription within 3 seconds.

**Validates: Requirements 4.6**

### Property 7: Crop Image Analysis

*For any* crop image uploaded by a farmer, the Vision_System should analyze it and return a structured response containing either disease information or health confirmation.

**Validates: Requirements 5.1**

### Property 8: Vision Analysis Performance

*For any* crop image analysis request, the system should return diagnosis results within 10 seconds.

**Validates: Requirements 5.2**

### Property 9: Disease Diagnosis Response Structure

*For any* crop disease diagnosis that detects a disease, the response should contain disease name, severity assessment, treatment recommendations, and all content should be in the user's preferred language.

**Validates: Requirements 5.3, 5.4**

### Property 10: Crop Disease Query Persistence

*For any* crop disease query submitted by a user, the system should store the query (including image, diagnosis, and timestamp) and make it retrievable in the user's conversation history.

**Validates: Requirements 5.7**

### Property 11: Location-Based Mandi Prices

*For any* mandi price request with valid location data, the system should return prices filtered to the user's location (state or district) with at least the crop name, market, price range, and date.

**Validates: Requirements 6.1, 6.2, 6.3, 6.4**

### Property 12: Weather Forecast Structure

*For any* weather forecast request with valid location, the system should return exactly 7 days of forecast data, with each day containing temperature, rainfall probability, wind speed, and farming advisory.

**Validates: Requirements 7.1, 7.2, 7.3**

### Property 13: Severe Weather Alerts

*For any* weather forecast that predicts severe conditions (heavy rainfall >100mm, extreme temperatures, or high winds >40km/h), the system should trigger a proactive notification to affected users.

**Validates: Requirements 7.4**

### Property 14: Scheme Response Structure

*For any* government scheme returned by the system, the response should contain scheme name, description, eligibility criteria, benefits, and application process.

**Validates: Requirements 8.2**

### Property 15: Scheme Filtering by User Type

*For any* scheme query with a specified user type, all returned schemes should have that user type in their targetUserTypes array.

**Validates: Requirements 8.3**

### Property 16: Eligibility-Based Application Guidance

*For any* user who checks eligibility for a scheme and is determined to be eligible, the system should provide step-by-step application guidance in the response.

**Validates: Requirements 8.8**

### Property 17: User Profile Creation on First Authentication

*For any* new phone number that completes OTP verification successfully, the system should create a User_Profile record with the phone number, default language preference, and empty conversation history.

**Validates: Requirements 22.3**

### Property 18: User Profile Data Structure

*For any* User_Profile in the database, it should contain fields for user type, location, language preference, and a reference to conversation history.

**Validates: Requirements 22.4**

### Property 19: Session Context Restoration

*For any* returning user who logs in, the system should restore their previous conversation context including message history and user preferences.

**Validates: Requirements 22.5**

### Property 20: API Response Time

*For any* API request to core endpoints (chat, schemes, weather, mandi prices), the system should respond within 2 seconds under normal load conditions.

**Validates: Requirements 23.3**

### Property 21: Rate Limiting Enforcement

*For any* user making API requests, when the request count exceeds 100 requests per minute, the system should reject subsequent requests with a 429 status code until the rate limit window resets.

**Validates: Requirements 24.4**

### Property 22: Input Sanitization

*For any* user input (text, query parameters, form data), the system should sanitize the input to remove or escape potentially malicious content (SQL injection, XSS, script tags) before processing.

**Validates: Requirements 24.5**

### Property 23: Suspicious Activity Response

*For any* detected suspicious activity pattern (rapid failed login attempts, unusual request patterns, malicious input attempts), the system should temporarily block the user and create an alert for administrators.

**Validates: Requirements 24.9**

### Property 24: Language Consistency

*For any* user with a selected language preference, all system responses (AI messages, UI text, notifications) should be in that language.

**Validates: Requirements 26.4**

### Property 25: Service Failure Graceful Degradation

*For any* external service failure (Claude API, weather API, mandi price API), the system should either return cached data if available or provide a user-friendly error message explaining the temporary unavailability, without crashing.

**Validates: Requirements 28.9**

### Property 26: User-Friendly Error Messages

*For any* error that occurs during user interaction, the system should display an error message that is understandable to non-technical users and provides actionable guidance when possible.

**Validates: Requirements 29.1**


## Error Handling

### Error Categories

**1. User Input Errors**
- Invalid file formats or sizes
- Malformed phone numbers
- Empty or whitespace-only messages
- Unsupported languages

**Response Strategy:**
- Return 400 Bad Request with descriptive error message
- Provide guidance on correct format
- Log for analytics but not as system errors

**2. Authentication Errors**
- Invalid OTP
- Expired OTP
- Invalid or expired tokens
- Unauthorized access attempts

**Response Strategy:**
- Return 401 Unauthorized or 403 Forbidden
- Clear error messages without exposing security details
- Implement exponential backoff for repeated failures
- Log for security monitoring

**3. External Service Errors**
- Claude API unavailable or rate limited
- Twilio service failures
- Weather/Mandi API timeouts
- Database connection failures

**Response Strategy:**
- Implement circuit breaker pattern
- Return cached data when available
- Provide fallback responses for AI services
- Return 503 Service Unavailable with retry-after header
- Log with high priority for monitoring

**4. Performance Errors**
- Request timeouts
- Memory limits exceeded
- Processing queue full

**Response Strategy:**
- Return 504 Gateway Timeout
- Implement request queuing with limits
- Graceful degradation (reduce quality/features)
- Alert monitoring systems

**5. Data Errors**
- Database constraint violations
- Data not found
- Corrupted data

**Response Strategy:**
- Return 404 Not Found or 409 Conflict
- Provide clear error messages
- Implement data validation before storage
- Log for investigation

### Error Handling Patterns

**Circuit Breaker for External Services**

```typescript
class CircuitBreaker {
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  async execute<T>(operation: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > 60000) { // 1 minute
        this.state = 'half-open';
      } else {
        if (fallback) return fallback();
        throw new Error('Circuit breaker is open');
      }
    }
    
    try {
      const result = await operation();
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failureCount = 0;
      }
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      
      if (this.failureCount >= 5) {
        this.state = 'open';
      }
      
      if (fallback) return fallback();
      throw error;
    }
  }
}
```

**Retry with Exponential Backoff**

```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}
```

**Graceful Degradation for AI Services**

```typescript
async function getAIResponse(message: string, context: any): Promise<string> {
  try {
    // Try Claude API
    return await claudeAPI.generateResponse(message, context);
  } catch (error) {
    logger.error('Claude API failed', error);
    
    // Fallback to cached responses for common queries
    const cachedResponse = await getCachedResponse(message);
    if (cachedResponse) return cachedResponse;
    
    // Fallback to rule-based responses
    return getRuleBasedResponse(message, context);
  }
}
```

### Error Response Format

All API errors follow a consistent format:

```typescript
interface ErrorResponse {
  error: {
    code: string; // Machine-readable error code
    message: string; // User-friendly message
    details?: any; // Additional context (dev mode only)
    timestamp: string;
    requestId: string; // For tracking
  };
}

// Example:
{
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "कृपया केवल JPG या PNG छवियाँ अपलोड करें (Please upload only JPG or PNG images)",
    "details": {
      "receivedType": "application/pdf",
      "acceptedTypes": ["image/jpeg", "image/png"]
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Logging Strategy

**Log Levels:**
- ERROR: System errors requiring immediate attention
- WARN: Degraded functionality, external service issues
- INFO: Important business events (user registration, scheme queries)
- DEBUG: Detailed execution flow (dev/staging only)

**Structured Logging:**

```typescript
logger.error('External API failed', {
  service: 'weather-api',
  endpoint: '/forecast',
  statusCode: 503,
  responseTime: 5000,
  userId: 'user_123',
  requestId: 'req_abc123',
  error: error.message
});
```

**Log Aggregation:**
- CloudWatch for AWS infrastructure logs
- Sentry for error tracking and alerting
- Custom dashboard for business metrics


## Testing Strategy

### Dual Testing Approach

The SamarthBharat platform requires both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing

**Framework:** Jest for JavaScript/TypeScript

**Coverage Goals:**
- Minimum 80% code coverage for core business logic
- 100% coverage for authentication and security modules
- Focus on edge cases and error conditions

**Unit Test Categories:**

1. **Component Tests (Frontend)**
   - Landing page renders three sections
   - Chat interface displays messages correctly
   - Voice input buttons trigger recording
   - File upload validates file types
   - Quick action buttons send correct queries

2. **API Endpoint Tests**
   - Authentication flow (OTP request, verification, token refresh)
   - Chat message handling
   - Scheme search and filtering
   - User profile CRUD operations
   - Error responses for invalid inputs

3. **Service Layer Tests**
   - AI prompt construction
   - Language detection logic
   - Eligibility checking algorithm
   - Notification scheduling
   - Cache management

4. **Integration Tests**
   - Database operations (CRUD)
   - External API mocking (Claude, Twilio, Weather)
   - Redis caching
   - Session management

5. **Edge Case Tests**
   - Empty or whitespace-only inputs
   - Very long messages (>10,000 characters)
   - Malformed phone numbers
   - Invalid OTPs
   - Expired tokens
   - Missing required fields
   - Concurrent requests from same user

**Example Unit Tests:**

```typescript
describe('Authentication Service', () => {
  test('should send OTP for valid phone number', async () => {
    const result = await authService.requestOTP('+919876543210');
    expect(result.success).toBe(true);
    expect(result.expiresIn).toBe(300); // 5 minutes
  });
  
  test('should reject invalid phone number format', async () => {
    await expect(authService.requestOTP('invalid'))
      .rejects.toThrow('Invalid phone number format');
  });
  
  test('should verify correct OTP', async () => {
    const otp = await authService.requestOTP('+919876543210');
    const result = await authService.verifyOTP('+919876543210', '123456');
    expect(result.success).toBe(true);
    expect(result.accessToken).toBeDefined();
  });
});

describe('Scheme Service', () => {
  test('should filter schemes by user type', async () => {
    const schemes = await schemeService.getSchemes({ userType: 'farmer' });
    schemes.forEach(scheme => {
      expect(scheme.targetUserTypes).toContain('farmer');
    });
  });
  
  test('should return empty array for unknown category', async () => {
    const schemes = await schemeService.getSchemes({ category: 'unknown' });
    expect(schemes).toEqual([]);
  });
});
```

### Property-Based Testing

**Framework:** fast-check for JavaScript/TypeScript

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: samarthbharat-platform, Property {number}: {property_text}`

**Property Test Implementation:**

Each correctness property from the design document must be implemented as a property-based test. The test should:
1. Generate random valid inputs
2. Execute the operation
3. Verify the property holds

**Example Property Tests:**

```typescript
import fc from 'fast-check';

// Feature: samarthbharat-platform, Property 5: File Upload Validation
describe('Property 5: File Upload Validation', () => {
  test('should validate file type and size for all uploads', () => {
    fc.assert(
      fc.property(
        fc.record({
          filename: fc.string(),
          size: fc.integer({ min: 0, max: 20 * 1024 * 1024 }), // 0-20MB
          type: fc.constantFrom(
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'text/plain'
          )
        }),
        async (file) => {
          const result = await fileService.validateFile(file);
          
          const validTypes = ['application/pdf', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          const maxSize = 10 * 1024 * 1024; // 10MB
          
          const shouldBeValid = validTypes.includes(file.type) && file.size <= maxSize;
          
          expect(result.valid).toBe(shouldBeValid);
          if (!shouldBeValid) {
            expect(result.error).toBeDefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: samarthbharat-platform, Property 15: Scheme Filtering by User Type
describe('Property 15: Scheme Filtering by User Type', () => {
  test('should return only schemes matching user type', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('farmer', 'student', 'startup'),
        async (userType) => {
          const schemes = await schemeService.getSchemes({ userType });
          
          schemes.forEach(scheme => {
            expect(scheme.targetUserTypes).toContain(userType);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: samarthbharat-platform, Property 21: Rate Limiting Enforcement
describe('Property 21: Rate Limiting Enforcement', () => {
  test('should block requests exceeding rate limit', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 101, max: 200 }), // Request counts over limit
        async (requestCount) => {
          const userId = 'test_user_' + Math.random();
          let blockedCount = 0;
          
          for (let i = 0; i < requestCount; i++) {
            try {
              await apiService.makeRequest(userId, '/api/test');
            } catch (error) {
              if (error.statusCode === 429) {
                blockedCount++;
              }
            }
          }
          
          // Should block at least (requestCount - 100) requests
          expect(blockedCount).toBeGreaterThanOrEqual(requestCount - 100);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: samarthbharat-platform, Property 22: Input Sanitization
describe('Property 22: Input Sanitization', () => {
  test('should sanitize all user inputs', () => {
    fc.assert(
      fc.property(
        fc.string(),
        async (userInput) => {
          const sanitized = inputService.sanitize(userInput);
          
          // Should not contain script tags
          expect(sanitized).not.toMatch(/<script/i);
          
          // Should not contain SQL injection patterns
          expect(sanitized).not.toMatch(/;\s*DROP\s+TABLE/i);
          
          // Should escape HTML entities
          if (userInput.includes('<') || userInput.includes('>')) {
            expect(sanitized).not.toEqual(userInput);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: samarthbharat-platform, Property 2: Cross-Channel Context Preservation
describe('Property 2: Cross-Channel Context Preservation', () => {
  test('should preserve conversation context across channels', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1, maxLength: 500 }), { minLength: 1, maxLength: 10 }),
        fc.constantFrom('web', 'mobile', 'whatsapp', 'sms'),
        fc.constantFrom('web', 'mobile', 'whatsapp', 'sms'),
        async (messages, channel1, channel2) => {
          const userId = 'test_user_' + Math.random();
          
          // Send messages through channel1
          let conversationId;
          for (const message of messages) {
            const response = await chatService.sendMessage({
              userId,
              channel: channel1,
              message,
              conversationId
            });
            conversationId = response.conversationId;
          }
          
          // Retrieve history through channel2
          const history = await chatService.getHistory({
            userId,
            channel: channel2,
            conversationId
          });
          
          // Should have all messages
          expect(history.messages.length).toBeGreaterThanOrEqual(messages.length);
          
          // Should preserve message content
          messages.forEach((msg, idx) => {
            const userMessages = history.messages.filter(m => m.role === 'user');
            expect(userMessages[idx].content).toBe(msg);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Data Management

**Test Database:**
- Separate test database instances
- Seed data for schemes, users, conversations
- Reset between test runs

**Mock Data Generators:**

```typescript
// Generate random user profiles
const userGenerator = fc.record({
  phoneNumber: fc.string().map(s => '+91' + Math.random().toString().slice(2, 12)),
  userType: fc.constantFrom('farmer', 'student', 'startup'),
  language: fc.constantFrom('en', 'hi', 'ta', 'te', 'bn'),
  location: fc.record({
    state: fc.constantFrom('Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh'),
    district: fc.string(),
    pincode: fc.integer({ min: 100000, max: 999999 }).map(String)
  })
});

// Generate random schemes
const schemeGenerator = fc.record({
  name: fc.string({ minLength: 10, maxLength: 100 }),
  category: fc.constantFrom('agriculture', 'education', 'business'),
  targetUserTypes: fc.array(fc.constantFrom('farmer', 'student', 'startup'), { minLength: 1 }),
  eligibility: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  benefits: fc.array(fc.string(), { minLength: 1, maxLength: 5 })
});
```

### Performance Testing

**Load Testing:**
- Tool: Artillery or k6
- Scenarios:
  - 100 concurrent users sending chat messages
  - 50 concurrent image uploads
  - 200 requests/second to scheme API
- Success criteria: <2s response time for 95th percentile

**Stress Testing:**
- Gradually increase load until system degrades
- Identify bottlenecks
- Test rate limiting effectiveness

### Security Testing

**Automated Security Scans:**
- OWASP ZAP for vulnerability scanning
- npm audit for dependency vulnerabilities
- Snyk for continuous monitoring

**Manual Security Testing:**
- SQL injection attempts
- XSS attempts
- CSRF testing
- Authentication bypass attempts
- Rate limit bypass attempts

### End-to-End Testing

**Framework:** Playwright for web UI testing

**Critical User Flows:**
1. User registration and authentication
2. Farmer uploads crop image and receives diagnosis
3. Student generates study roadmap
4. Startup searches for funding schemes
5. User receives and views notification
6. Cross-channel conversation continuity

### MVP Testing Priorities

For the 24-hour hackathon, focus on:

1. **Critical Path Unit Tests:**
   - Authentication flow
   - Chat message handling
   - Image upload and processing
   - Scheme search

2. **Essential Property Tests:**
   - Property 5: File Upload Validation
   - Property 15: Scheme Filtering
   - Property 21: Rate Limiting
   - Property 22: Input Sanitization

3. **Manual Testing:**
   - End-to-end user flows
   - Cross-browser compatibility
   - Mobile responsiveness
   - WhatsApp bot interaction

4. **Security Basics:**
   - Input sanitization verification
   - HTTPS enforcement
   - Token validation

### Continuous Integration

**GitHub Actions Workflow:**

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run property tests
        run: npm run test:property
      
      - name: Check coverage
        run: npm run test:coverage
      
      - name: Security audit
        run: npm audit
```

### Test Documentation

Each test file should include:
- Purpose and scope
- Setup requirements
- Expected outcomes
- Property number reference (for property tests)
- Requirements traceability


## Implementation Details

### AI Integration with Claude

**Amazon Bedrock Setup:**

```typescript
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

class ClaudeService {
  private client: BedrockRuntimeClient;
  private modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';
  
  constructor() {
    this.client = new BedrockRuntimeClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }
  
  async generateResponse(
    message: string,
    context: ConversationContext,
    userType: 'farmer' | 'student' | 'startup'
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(userType, context);
    
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system: systemPrompt
    };
    
    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: JSON.stringify(payload)
    });
    
    const response = await this.client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    return responseBody.content[0].text;
  }
  
  private buildSystemPrompt(
    userType: 'farmer' | 'student' | 'startup',
    context: ConversationContext
  ): string {
    const basePrompt = `You are SamarthBharat, an AI assistant helping underserved Indian communities. 
You provide information in simple, accessible language. Always be respectful, empathetic, and helpful.`;
    
    const userTypePrompts = {
      farmer: `You are helping a farmer or agricultural worker. Focus on:
- Crop diseases and treatments
- Market prices (mandi rates)
- Weather advisories for farming
- Government schemes for farmers
- Agricultural best practices
Provide practical, actionable advice.`,
      
      student: `You are helping a student. Focus on:
- Competitive exam preparation
- Scholarship opportunities
- Study planning and roadmaps
- Career guidance
- Educational resources
Be encouraging and supportive.`,
      
      startup: `You are helping an early-stage entrepreneur. Focus on:
- Government funding schemes
- Business compliance and regulations
- Market research guidance
- Networking opportunities
Provide clear, actionable business advice.`
    };
    
    const languageNote = context.language !== 'en' 
      ? `\nRespond in ${context.language} language.` 
      : '';
    
    return `${basePrompt}\n\n${userTypePrompts[userType]}${languageNote}`;
  }
  
  async analyzeImage(imageBase64: string, userType: string): Promise<any> {
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: 'Analyze this crop image for diseases. Provide: 1) Disease name if any, 2) Severity (mild/moderate/severe), 3) Treatment recommendations. If healthy, confirm that.'
            }
          ]
        }
      ]
    };
    
    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: JSON.stringify(payload)
    });
    
    const response = await this.client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    return this.parseImageAnalysis(responseBody.content[0].text);
  }
  
  private parseImageAnalysis(text: string): any {
    // Parse the AI response into structured format
    return {
      hasDisease: !text.toLowerCase().includes('healthy'),
      diseaseName: this.extractDiseaseName(text),
      severity: this.extractSeverity(text),
      treatment: this.extractTreatment(text),
      rawAnalysis: text
    };
  }
}
```

### Voice Integration with Google Cloud

**Speech-to-Text:**

```typescript
import { SpeechClient } from '@google-cloud/speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

class VoiceService {
  private sttClient: SpeechClient;
  private ttsClient: TextToSpeechClient;
  
  constructor() {
    this.sttClient = new SpeechClient({
      keyFilename: process.env.GOOGLE_CREDENTIALS_PATH
    });
    this.ttsClient = new TextToSpeechClient({
      keyFilename: process.env.GOOGLE_CREDENTIALS_PATH
    });
  }
  
  async transcribe(
    audioBuffer: Buffer,
    mode: 'auto' | 'manual',
    language?: string
  ): Promise<{ text: string; detectedLanguage?: string; confidence: number }> {
    const config = {
      encoding: 'LINEAR16' as const,
      sampleRateHertz: 16000,
      languageCode: mode === 'manual' ? language : 'hi-IN',
      alternativeLanguageCodes: mode === 'auto' ? [
        'en-IN', 'hi-IN', 'ta-IN', 'te-IN', 'bn-IN', 
        'mr-IN', 'gu-IN', 'kn-IN', 'ml-IN', 'pa-IN'
      ] : undefined,
      enableAutomaticPunctuation: true
    };
    
    const audio = {
      content: audioBuffer.toString('base64')
    };
    
    const [response] = await this.sttClient.recognize({ config, audio });
    const transcription = response.results?.[0];
    
    return {
      text: transcription?.alternatives?.[0]?.transcript || '',
      detectedLanguage: mode === 'auto' ? transcription?.languageCode : undefined,
      confidence: transcription?.alternatives?.[0]?.confidence || 0
    };
  }
  
  async synthesize(
    text: string,
    language: string
  ): Promise<Buffer> {
    const request = {
      input: { text },
      voice: {
        languageCode: this.getLanguageCode(language),
        ssmlGender: 'NEUTRAL' as const
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.9, // Slightly slower for clarity
        pitch: 0
      }
    };
    
    const [response] = await this.ttsClient.synthesizeSpeech(request);
    return Buffer.from(response.audioContent as Uint8Array);
  }
  
  private getLanguageCode(language: string): string {
    const languageMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN'
    };
    return languageMap[language] || 'en-IN';
  }
}
```

### WhatsApp Integration with Twilio

**Webhook Handler:**

```typescript
import twilio from 'twilio';

class WhatsAppService {
  private client: twilio.Twilio;
  
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  
  async handleIncomingMessage(req: Request): Promise<void> {
    const { From, Body, MediaUrl0, MediaContentType0 } = req.body;
    
    // Extract phone number
    const phoneNumber = From.replace('whatsapp:', '');
    
    // Get or create user
    const user = await userService.getOrCreateUser(phoneNumber, 'whatsapp');
    
    // Handle media if present
    let attachments = [];
    if (MediaUrl0) {
      const mediaBuffer = await this.downloadMedia(MediaUrl0);
      attachments.push({
        type: MediaContentType0.startsWith('image/') ? 'image' : 'document',
        data: mediaBuffer.toString('base64'),
        filename: 'upload'
      });
    }
    
    // Process message
    const response = await chatService.sendMessage({
      userId: user.id,
      channel: 'whatsapp',
      message: Body,
      attachments,
      userType: user.userType
    });
    
    // Send response
    await this.sendMessage(phoneNumber, response.response);
  }
  
  async sendMessage(to: string, message: string, mediaUrl?: string): Promise<void> {
    await this.client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message,
      mediaUrl: mediaUrl ? [mediaUrl] : undefined
    });
  }
  
  private async downloadMedia(url: string): Promise<Buffer> {
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(
          `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
        ).toString('base64')
      }
    });
    return Buffer.from(await response.arrayBuffer());
  }
}
```

### Caching Strategy

**Redis Implementation:**

```typescript
import Redis from 'ioredis';

class CacheService {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => Math.min(times * 50, 2000)
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }
  
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }
  
  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
  
  // Cache patterns
  async cacheWeather(pincode: string, data: any): Promise<void> {
    await this.set(`weather:${pincode}`, data, 6 * 60 * 60); // 6 hours
  }
  
  async cacheMandiPrices(state: string, crop: string, data: any): Promise<void> {
    await this.set(`mandi:${state}:${crop}`, data, 24 * 60 * 60); // 24 hours
  }
  
  async cacheSchemes(userType: string, data: any): Promise<void> {
    await this.set(`schemes:${userType}`, data, 60 * 60); // 1 hour
  }
  
  async cacheConversationContext(conversationId: string, data: any): Promise<void> {
    await this.set(`context:${conversationId}`, data, 30 * 60); // 30 minutes
  }
}
```

### Rate Limiting

**Express Middleware:**

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379')
});

export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:'
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      retryAfter: 60
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return req.user?.id || req.ip;
  }
});

// Stricter limit for authentication endpoints
export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again later.',
      retryAfter: 900
    }
  }
});
```

### Database Migrations

**PostgreSQL Schema:**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  phone_verified BOOLEAN DEFAULT FALSE,
  user_type VARCHAR(20) CHECK (user_type IN ('farmer', 'student', 'startup')),
  profile JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{"notifications": {"push": true, "sms": true, "whatsapp": true, "email": false}}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_created ON users(created_at);

-- Schemes table
CREATE TABLE schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_local JSONB,
  description TEXT NOT NULL,
  description_local JSONB,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  target_user_types VARCHAR(20)[] NOT NULL,
  eligibility JSONB NOT NULL,
  benefits TEXT[] NOT NULL,
  benefits_local JSONB,
  application_process TEXT NOT NULL,
  application_process_local JSONB,
  required_documents TEXT[],
  official_link VARCHAR(500),
  helpline_number VARCHAR(20),
  deadline TIMESTAMP,
  is_ongoing BOOLEAN DEFAULT TRUE,
  source VARCHAR(100),
  last_updated TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_schemes_category ON schemes(category);
CREATE INDEX idx_schemes_target_types ON schemes USING GIN(target_user_types);
CREATE INDEX idx_schemes_active ON schemes(is_active);
CREATE INDEX idx_schemes_priority ON schemes(priority DESC);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  title_local JSONB,
  body_local JSONB,
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  channels VARCHAR(20)[] NOT NULL,
  delivery_status JSONB DEFAULT '[]',
  scheduled_for TIMESTAMP,
  expires_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_scheduled ON notifications(scheduled_for);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

### Environment Configuration

```env
# Server
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.samarthbharat.in

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=samarthbharat
POSTGRES_USER=admin
POSTGRES_PASSWORD=secure_password

MONGODB_URI=mongodb://localhost:27017/samarthbharat

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secure_password

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Google Cloud
GOOGLE_CREDENTIALS_PATH=/path/to/credentials.json

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_SMS_NUMBER=+1234567890
TWILIO_PHONE_NUMBER=+1234567890

# External APIs
OPENWEATHER_API_KEY=your_api_key
AGMARKNET_API_KEY=your_api_key

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring
SENTRY_DSN=your_sentry_dsn
```


## Deployment Strategy

### MVP Deployment (24-Hour Hackathon)

**Infrastructure:**
- Single AWS EC2 instance (t3.medium)
- PostgreSQL and MongoDB on same instance
- Redis on same instance
- Nginx as reverse proxy
- Let's Encrypt for SSL

**Deployment Steps:**

1. **Server Setup:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Install Redis
sudo apt install -y redis-server

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Application Deployment:**
```bash
# Clone repository
git clone https://github.com/your-org/samarthbharat.git
cd samarthbharat

# Install dependencies
npm install

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Setup environment
cp .env.example .env
# Edit .env with production values

# Run database migrations
npm run migrate

# Seed initial data (schemes)
npm run seed

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. **Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name samarthbharat.in www.samarthbharat.in;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name samarthbharat.in www.samarthbharat.in;
    
    ssl_certificate /etc/letsencrypt/live/samarthbharat.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/samarthbharat.in/privkey.pem;
    
    # Frontend
    location / {
        root /var/www/samarthbharat/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Webhooks (Twilio)
    location /webhooks {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;" always;
}
```

4. **SSL Certificate:**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d samarthbharat.in -d www.samarthbharat.in
```

5. **Monitoring Setup:**
```bash
# PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# System monitoring
sudo apt install -y htop iotop nethogs
```

### Production Deployment (Post-Hackathon)

**Infrastructure:**
- AWS ECS/EKS for container orchestration
- RDS for PostgreSQL (Multi-AZ)
- DocumentDB for MongoDB
- ElastiCache for Redis
- S3 for file storage
- CloudFront for CDN
- Route 53 for DNS
- Application Load Balancer
- Auto Scaling Groups

**Architecture Diagram:**

```
                                    ┌─────────────┐
                                    │  Route 53   │
                                    │     DNS     │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ CloudFront  │
                                    │     CDN     │
                                    └──────┬──────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                      │
                 ┌──────▼──────┐                      ┌───────▼────────┐
                 │     S3      │                      │      ALB       │
                 │   Static    │                      │ Load Balancer  │
                 │   Assets    │                      └───────┬────────┘
                 └─────────────┘                              │
                                                    ┌─────────┴─────────┐
                                                    │                   │
                                             ┌──────▼──────┐    ┌──────▼──────┐
                                             │   ECS/EKS   │    │   ECS/EKS   │
                                             │  Container  │    │  Container  │
                                             │   Group 1   │    │   Group 2   │
                                             └──────┬──────┘    └──────┬──────┘
                                                    │                   │
                        ┌───────────────────────────┴───────────────────┴────────┐
                        │                           │                            │
                 ┌──────▼──────┐           ┌───────▼────────┐          ┌────────▼────────┐
                 │     RDS     │           │  ElastiCache   │          │   DocumentDB    │
                 │ PostgreSQL  │           │     Redis      │          │    MongoDB      │
                 │  (Multi-AZ) │           └────────────────┘          └─────────────────┘
                 └─────────────┘
```

**CI/CD Pipeline:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:coverage
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: samarthbharat
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster samarthbharat-cluster --service samarthbharat-service --force-new-deployment
```

**Docker Configuration:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build frontend
RUN cd frontend && npm ci && npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy dependencies and built files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Monitoring and Observability

**CloudWatch Dashboards:**
- API response times
- Error rates
- Database connections
- Cache hit rates
- Active users
- Request volume

**Alerts:**
- Error rate > 5%
- Response time > 2s (95th percentile)
- Database CPU > 80%
- Memory usage > 85%
- Disk space < 20%

**Logging:**
- Application logs → CloudWatch Logs
- Access logs → S3
- Error tracking → Sentry
- Performance monitoring → New Relic or Datadog

### Backup and Disaster Recovery

**Database Backups:**
- Automated daily backups (RDS)
- Point-in-time recovery enabled
- Cross-region replication for critical data
- Backup retention: 30 days

**Application Backups:**
- Code in Git (GitHub)
- Docker images in ECR
- Configuration in AWS Systems Manager Parameter Store

**Disaster Recovery Plan:**
1. RTO (Recovery Time Objective): 1 hour
2. RPO (Recovery Point Objective): 15 minutes
3. Multi-region failover capability
4. Regular DR drills (quarterly)

### Scaling Strategy

**Horizontal Scaling:**
- Auto Scaling Groups for EC2/ECS
- Scale up: CPU > 70% for 5 minutes
- Scale down: CPU < 30% for 10 minutes
- Min instances: 2
- Max instances: 10

**Database Scaling:**
- Read replicas for PostgreSQL
- Sharding for MongoDB (by user region)
- Redis cluster mode for cache

**Cost Optimization:**
- Reserved instances for baseline capacity
- Spot instances for burst capacity
- S3 lifecycle policies for old data
- CloudFront caching to reduce origin load

### Security Hardening

**Network Security:**
- VPC with private subnets for databases
- Security groups with least privilege
- WAF rules for common attacks
- DDoS protection with AWS Shield

**Application Security:**
- Regular dependency updates
- Automated vulnerability scanning
- Secrets in AWS Secrets Manager
- IAM roles with minimal permissions
- Regular security audits

**Compliance:**
- GDPR compliance for data handling
- Data encryption at rest and in transit
- Audit logging for all data access
- User data deletion on request

### Performance Optimization

**Frontend:**
- Code splitting and lazy loading
- Image optimization and WebP format
- Service Worker for offline support
- Gzip/Brotli compression
- HTTP/2 and HTTP/3 support

**Backend:**
- Database query optimization
- Connection pooling
- Caching strategy (Redis)
- CDN for static assets
- API response compression

**Mobile:**
- App size optimization
- Incremental updates
- Background sync
- Offline-first architecture

### MVP to Production Roadmap

**Phase 1: MVP (24 hours)**
- Core features functional
- Single server deployment
- Basic monitoring
- Manual testing

**Phase 2: Beta (Week 1-2)**
- Bug fixes from MVP
- User feedback integration
- Performance optimization
- Security hardening

**Phase 3: Production (Week 3-4)**
- Multi-server deployment
- Auto-scaling setup
- Comprehensive monitoring
- Load testing
- Security audit

**Phase 4: Scale (Month 2+)**
- Multi-region deployment
- Advanced features
- Mobile app launch
- Marketing and user acquisition

