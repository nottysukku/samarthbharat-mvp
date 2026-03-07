# Feature Integration Guide
## How to Add Real Data to SamarthBharat Features

This guide explains how to replace dummy data with real API integrations for all 36 features across the platform.

---

## Table of Contents
1. [Weather Forecast](#1-weather-forecast)
2. [Crop Disease Diagnosis](#2-crop-disease-diagnosis)
3. [Mandi Prices](#3-mandi-prices)
4. [Scholarship Finder](#4-scholarship-finder)
5. [Study Roadmap](#5-study-roadmap)
6. [Funding Schemes](#6-funding-schemes)
7. [Compliance Guide](#7-compliance-guide)

---

## 1. Weather Forecast

**File**: `frontend/src/pages/WeatherPage.tsx`

### Current Implementation
- Dummy 7-day forecast data
- Static agricultural advisories
- Hardcoded location (Delhi)

### Integration Steps

#### Option A: OpenWeatherMap API (Recommended)
```typescript
// Install axios if not already installed
// npm install axios

import axios from 'axios'

const API_KEY = process.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Fetch current weather
const fetchCurrentWeather = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  })
  return response.data
}

// Fetch 7-day forecast
const fetchForecast = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      cnt: 56 // 7 days * 8 (3-hour intervals)
    }
  })
  return response.data
}
```

#### Option B: India Meteorological Department (IMD) API
```typescript
// IMD provides free weather data for India
const IMD_BASE_URL = 'https://api.imd.gov.in'

const fetchIMDWeather = async (city: string) => {
  const response = await axios.get(`${IMD_BASE_URL}/weather/${city}`)
  return response.data
}
```

### Environment Variables
Add to `.env`:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### Data Mapping
```typescript
// Map API response to component state
const mapWeatherData = (apiData: any) => ({
  temp: Math.round(apiData.main.temp),
  condition: apiData.weather[0].main,
  humidity: apiData.main.humidity,
  windSpeed: Math.round(apiData.wind.speed * 3.6), // m/s to km/h
  rainfall: apiData.rain?.['1h'] || 0,
  location: apiData.name
})
```

### Agricultural Advisories Integration
```typescript
// Create rule-based advisories based on weather
const generateAdvisories = (weather: any) => {
  const advisories = []
  
  if (weather.rainfall > 50) {
    advisories.push({
      title: 'Heavy Rain Alert',
      message: 'Postpone irrigation and harvesting activities',
      type: 'warning'
    })
  }
  
  if (weather.humidity > 80) {
    advisories.push({
      title: 'High Humidity Alert',
      message: 'Monitor crops for fungal diseases',
      type: 'warning'
    })
  }
  
  return advisories
}
```

---

## 2. Crop Disease Diagnosis

**File**: `frontend/src/pages/CropDiagnosisPage.tsx`

### Current Implementation
- Image upload with preview
- Random mock diagnosis from 2 diseases
- Static treatment recommendations

### Integration Steps

#### Option A: PlantVillage API / Plant.id
```typescript
const PLANT_ID_API_KEY = process.env.VITE_PLANT_ID_API_KEY
const PLANT_ID_URL = 'https://api.plant.id/v2/health_assessment'

const diagnoseCrop = async (imageBase64: string) => {
  const response = await axios.post(
    PLANT_ID_URL,
    {
      images: [imageBase64],
      modifiers: ['crops_fast', 'similar_images'],
      disease_details: ['cause', 'common_names', 'classification', 'description', 'treatment', 'url']
    },
    {
      headers: {
        'Api-Key': PLANT_ID_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}
```

#### Option B: Custom ML Model (TensorFlow.js)
```typescript
import * as tf from '@tensorflow/tfjs'

// Load pre-trained model
const loadModel = async () => {
  const model = await tf.loadLayersModel('/models/crop-disease/model.json')
  return model
}

// Predict disease
const predictDisease = async (imageElement: HTMLImageElement) => {
  const model = await loadModel()
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims()
  
  const predictions = await model.predict(tensor)
  return predictions
}
```

### Environment Variables
```
VITE_PLANT_ID_API_KEY=your_api_key_here
```

### Backend Integration (Recommended)
Create backend endpoint for image processing:

**File**: `backend/src/routes/diagnosis.ts`
```typescript
import multer from 'multer'
import axios from 'axios'

const upload = multer({ storage: multer.memoryStorage() })

router.post('/diagnose', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file?.buffer
    const base64Image = imageBuffer?.toString('base64')
    
    // Call external API
    const diagnosis = await diagnoseCrop(base64Image)
    
    res.json(diagnosis)
  } catch (error) {
    res.status(500).json({ error: 'Diagnosis failed' })
  }
})
```

---

## 3. Mandi Prices

**File**: `frontend/src/pages/MandiPricesPage.tsx`

### Current Implementation
- 5 static crop prices
- Hardcoded mandi locations
- Fake price trends

### Integration Steps

#### Option A: Government Data API (data.gov.in)
```typescript
const MANDI_API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
const API_KEY = process.env.VITE_DATA_GOV_API_KEY

const fetchMandiPrices = async (state: string, commodity: string) => {
  const response = await axios.get(MANDI_API_URL, {
    params: {
      'api-key': API_KEY,
      format: 'json',
      filters: {
        state,
        commodity
      },
      limit: 100
    }
  })
  return response.data.records
}
```

#### Option B: Agmarknet API
```typescript
const AGMARKNET_URL = 'https://agmarknet.gov.in/SearchCmmMkt.aspx'

// Note: Agmarknet requires web scraping or their official API access
const fetchAgmarknetPrices = async () => {
  // Contact Agmarknet for API access
  // Or use web scraping (not recommended for production)
}
```

### Backend Caching Strategy
```typescript
// Cache mandi prices for 1 hour
import { redisClient } from '../config/redis'

const getCachedMandiPrices = async (key: string) => {
  const cached = await redisClient.get(key)
  if (cached) return JSON.parse(cached)
  
  const fresh = await fetchMandiPrices()
  await redisClient.setex(key, 3600, JSON.stringify(fresh))
  return fresh
}
```

### Environment Variables
```
VITE_DATA_GOV_API_KEY=your_api_key_here
```

---

## 4. Scholarship Finder

**File**: `frontend/src/pages/ScholarshipFinderPage.tsx`

### Current Implementation
- 3 static scholarships
- Hardcoded deadlines and eligibility

### Integration Steps

#### Option A: National Scholarship Portal API
```typescript
const NSP_API_URL = 'https://scholarships.gov.in/public/api'

const fetchScholarships = async (filters: any) => {
  const response = await axios.get(`${NSP_API_URL}/scholarships`, {
    params: {
      category: filters.category,
      state: filters.state,
      class: filters.class,
      status: 'active'
    }
  })
  return response.data
}
```

#### Option B: Custom Database
Create backend endpoint:

**File**: `backend/src/routes/scholarships.ts`
```typescript
import { db } from '../config/database'

router.get('/scholarships', async (req, res) => {
  const { category, minAmount, deadline } = req.query
  
  const scholarships = await db.query(`
    SELECT * FROM scholarships
    WHERE category = $1
    AND amount >= $2
    AND deadline >= $3
    AND status = 'active'
    ORDER BY deadline ASC
  `, [category, minAmount, deadline])
  
  res.json(scholarships.rows)
})
```

### Database Schema
```sql
CREATE TABLE scholarships (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  amount INTEGER,
  deadline DATE,
  eligibility TEXT,
  category VARCHAR(100),
  provider VARCHAR(255),
  application_link TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. Study Roadmap

**File**: `frontend/src/pages/StudyRoadmapPage.tsx`

### Current Implementation
- Hardcoded JEE roadmap
- Static progress tracking
- Fixed weekly schedule

### Integration Steps

#### Backend API for Personalized Roadmaps
```typescript
// Generate roadmap based on user profile
router.post('/roadmap/generate', async (req, res) => {
  const { exam, currentLevel, targetDate, studyHours } = req.body
  
  // AI-based roadmap generation
  const roadmap = await generateRoadmap({
    exam,
    currentLevel,
    targetDate,
    studyHours
  })
  
  res.json(roadmap)
})

// Track progress
router.put('/roadmap/progress', async (req, res) => {
  const { userId, topicId, progress } = req.body
  
  await db.query(`
    UPDATE user_progress
    SET progress = $1, updated_at = NOW()
    WHERE user_id = $2 AND topic_id = $3
  `, [progress, userId, topicId])
  
  res.json({ success: true })
})
```

### Database Schema
```sql
CREATE TABLE study_roadmaps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  exam_type VARCHAR(50),
  start_date DATE,
  target_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE roadmap_topics (
  id SERIAL PRIMARY KEY,
  roadmap_id INTEGER REFERENCES study_roadmaps(id),
  subject VARCHAR(100),
  topic VARCHAR(255),
  phase VARCHAR(100),
  estimated_hours INTEGER,
  order_index INTEGER
);

CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  topic_id INTEGER REFERENCES roadmap_topics(id),
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. Funding Schemes

**File**: `frontend/src/pages/FundingSchemesPage.tsx`

### Current Implementation
- 3 static funding schemes
- Hardcoded loan amounts and interest rates

### Integration Steps

#### Option A: MUDRA/SIDBI API Integration
```typescript
const MUDRA_API_URL = 'https://www.mudra.org.in/api'

const fetchMudraSchemes = async (loanAmount: number, category: string) => {
  const response = await axios.get(`${MUDRA_API_URL}/schemes`, {
    params: {
      amount: loanAmount,
      category,
      status: 'active'
    }
  })
  return response.data
}
```

#### Option B: Custom Database with Government Schemes
```typescript
router.get('/funding-schemes', async (req, res) => {
  const { type, minAmount, maxAmount, sector } = req.query
  
  const schemes = await db.query(`
    SELECT * FROM funding_schemes
    WHERE type = $1
    AND min_amount <= $2
    AND max_amount >= $3
    AND sector = $4
    AND status = 'active'
    ORDER BY interest_rate ASC
  `, [type, minAmount, maxAmount, sector])
  
  res.json(schemes.rows)
})
```

### Database Schema
```sql
CREATE TABLE funding_schemes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  provider VARCHAR(255),
  type VARCHAR(100), -- loan, grant, equity
  min_amount BIGINT,
  max_amount BIGINT,
  interest_rate DECIMAL(5,2),
  tenure_months INTEGER,
  eligibility TEXT,
  sector VARCHAR(100),
  collateral_required BOOLEAN,
  application_link TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Compliance Guide

**File**: `frontend/src/pages/ComplianceGuidePage.tsx`

### Current Implementation
- Static GST and Labor law requirements
- Hardcoded deadlines and penalties

### Integration Steps

#### Dynamic Compliance Calendar
```typescript
router.get('/compliance/calendar', async (req, res) => {
  const { businessType, state, year } = req.query
  
  const calendar = await db.query(`
    SELECT * FROM compliance_deadlines
    WHERE business_type = $1
    AND state = $2
    AND EXTRACT(YEAR FROM deadline) = $3
    ORDER BY deadline ASC
  `, [businessType, state, year])
  
  res.json(calendar.rows)
})

// Get upcoming deadlines
router.get('/compliance/upcoming', async (req, res) => {
  const { userId, days = 30 } = req.query
  
  const deadlines = await db.query(`
    SELECT cd.*, uc.completed
    FROM compliance_deadlines cd
    LEFT JOIN user_compliance uc ON cd.id = uc.deadline_id AND uc.user_id = $1
    WHERE cd.deadline BETWEEN NOW() AND NOW() + INTERVAL '${days} days'
    AND (uc.completed IS NULL OR uc.completed = FALSE)
    ORDER BY cd.deadline ASC
  `, [userId])
  
  res.json(deadlines.rows)
})
```

### Database Schema
```sql
CREATE TABLE compliance_deadlines (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100), -- gst, labor, tax, company
  requirement VARCHAR(255),
  requirement_hi VARCHAR(255),
  description TEXT,
  deadline DATE,
  frequency VARCHAR(50), -- monthly, quarterly, annual
  business_type VARCHAR(100),
  state VARCHAR(100),
  penalty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_compliance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  deadline_id INTEGER REFERENCES compliance_deadlines(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_date DATE,
  notes TEXT
);
```

---

## General Integration Patterns

### 1. API Service Layer
Create a centralized API service:

**File**: `frontend/src/services/api.ts`
```typescript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### 2. React Query for Data Fetching
```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

// Fetch data with caching
export const useWeatherData = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeatherData(location),
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  })
}

// Mutate data
export const useDiagnoseCrop = () => {
  return useMutation({
    mutationFn: (image: string) => diagnoseCrop(image),
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    }
  })
}
```

### 3. Environment Variables
Create `.env` file:
```
# API Keys
VITE_OPENWEATHER_API_KEY=your_key
VITE_PLANT_ID_API_KEY=your_key
VITE_DATA_GOV_API_KEY=your_key

# Backend URL
VITE_API_BASE_URL=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_REAL_TIME_WEATHER=true
VITE_ENABLE_ML_DIAGNOSIS=false
```

### 4. Error Handling
```typescript
const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    toast.error(error.response.data.message)
  } else if (error.request) {
    // No response received
    toast.error('Network error. Please check your connection.')
  } else {
    // Other errors
    toast.error('An unexpected error occurred.')
  }
}
```

### 5. Loading States
```typescript
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const fetchData = async () => {
  setIsLoading(true)
  setError(null)
  
  try {
    const data = await apiClient.get('/endpoint')
    return data
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
```

---

## Testing with Mock Data

Before integrating real APIs, test with mock data:

**File**: `frontend/src/mocks/handlers.ts`
```typescript
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/weather/:location', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        temp: 28,
        condition: 'Sunny',
        humidity: 65
      })
    )
  }),
  
  rest.post('/api/diagnose', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        disease: 'Leaf Blight',
        confidence: 92
      })
    )
  })
]
```

---

## Deployment Checklist

- [ ] All API keys added to environment variables
- [ ] Backend endpoints tested with Postman/Insomnia
- [ ] Error handling implemented for all API calls
- [ ] Loading states added to all async operations
- [ ] Rate limiting configured on backend
- [ ] Caching strategy implemented (Redis/Memory)
- [ ] CORS configured properly
- [ ] Authentication/Authorization added
- [ ] API response validation with Zod/Yup
- [ ] Logging configured for debugging
- [ ] Performance monitoring setup (Sentry/LogRocket)

---

## Support & Resources

### Government APIs
- **Data.gov.in**: https://data.gov.in/
- **National Scholarship Portal**: https://scholarships.gov.in/
- **Agmarknet**: https://agmarknet.gov.in/
- **MUDRA**: https://www.mudra.org.in/

### Third-Party APIs
- **OpenWeatherMap**: https://openweathermap.org/api
- **Plant.id**: https://web.plant.id/
- **Google Maps**: https://developers.google.com/maps

### Documentation
- **React Query**: https://tanstack.com/query/latest
- **Axios**: https://axios-http.com/
- **TensorFlow.js**: https://www.tensorflow.org/js

---

## Need Help?

For integration support, contact:
- Email: dev@samarthbharat.gov.in
- Documentation: https://docs.samarthbharat.gov.in
- GitHub Issues: https://github.com/samarthbharat/mvp/issues
