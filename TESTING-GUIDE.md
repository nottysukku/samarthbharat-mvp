# 🧪 Testing Guide - SamarthBharat MVP

## Quick Test (2 Minutes)

### 1. Start the Application
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

### 2. Open Browser
Go to: http://localhost:5173

### 3. Quick Checks
- [ ] Landing page loads
- [ ] See 3 colored sections
- [ ] Click Farmer section → Chat opens
- [ ] Type "hello" → Get response
- [ ] Click Back → Return to landing page

**If all checked, you're good to go! ✅**

---

## Complete Test Suite

### Frontend Tests

#### Landing Page
- [ ] Page loads without errors
- [ ] Header shows "SamarthBharat" title
- [ ] Three sections visible (Green, Blue, Orange)
- [ ] Each section has:
  - [ ] Icon (🌾, 📚, 💼)
  - [ ] Hindi title
  - [ ] English subtitle
  - [ ] Description text
  - [ ] "Start Chat →" button
- [ ] Hover effects work on sections
- [ ] Features section shows 4 features
- [ ] Footer displays correctly
- [ ] Mobile responsive (resize browser)

#### Chat Page - Farmer
- [ ] Click Farmer section → Navigate to /chat/farmer
- [ ] Header shows green gradient
- [ ] Header shows 🌾 icon and "किसान सहायक"
- [ ] Back button works
- [ ] Initial greeting message appears
- [ ] Quick action buttons visible:
  - [ ] Check Mandi Prices 💰
  - [ ] Weather Forecast 🌤️
  - [ ] Diagnose Crop Disease 🌾
- [ ] Text input field works
- [ ] Can type multi-line messages
- [ ] Send button enabled when text entered
- [ ] Send button disabled when empty
- [ ] Press Enter sends message
- [ ] Message appears in chat (right side, green)
- [ ] AI response appears (left side, white)
- [ ] Timestamp shows on messages
- [ ] Loading indicator shows while waiting
- [ ] Image upload button (📷) visible
- [ ] Voice buttons visible (🎤 EN/HI, 🌐 Auto)
- [ ] Scroll to bottom on new message
- [ ] Mobile responsive

#### Chat Page - Student
- [ ] Navigate to /chat/student
- [ ] Header shows blue gradient
- [ ] Header shows 📚 icon and "छात्र सहायक"
- [ ] Quick actions show:
  - [ ] Find Scholarships 🎓
  - [ ] Generate Study Plan 📅
  - [ ] Study Resources 📚
- [ ] All chat features work (same as Farmer)

#### Chat Page - Startup
- [ ] Navigate to /chat/startup
- [ ] Header shows orange gradient
- [ ] Header shows 💼 icon and "व्यवसाय सहायक"
- [ ] Quick actions show:
  - [ ] Funding Schemes 💵
  - [ ] Compliance Guide 📝
  - [ ] Market Research 📊
- [ ] All chat features work (same as Farmer)

#### Image Upload
- [ ] Click camera button (📷)
- [ ] File picker opens
- [ ] Select image file
- [ ] Image preview appears
- [ ] Can remove image (✕ button)
- [ ] Send button enabled with image
- [ ] Image sends with message
- [ ] Get crop disease diagnosis response

#### Quick Actions
- [ ] Click "Check Mandi Prices" → Input filled
- [ ] Click "Weather Forecast" → Input filled
- [ ] Click "Diagnose Crop Disease" → Input filled
- [ ] Can edit pre-filled text
- [ ] Send button works with quick action text

### Backend Tests

#### Health Check
```bash
curl http://localhost:3000/api/health
```
Expected:
```json
{
  "status": "ok",
  "timestamp": "2024-03-04T...",
  "uptime": 123.45,
  "services": {
    "redis": "healthy"
  }
}
```

#### Authentication - Request OTP
```bash
curl -X POST http://localhost:3000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210"}'
```
Expected:
```json
{
  "success": true,
  "message": "OTP sent successfully (MOCK)",
  "expiresIn": 300
}
```

#### Authentication - Verify OTP
```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210", "otp": "123456"}'
```
Expected:
```json
{
  "success": true,
  "accessToken": "mock-jwt-token-...",
  "refreshToken": "mock-refresh-token-...",
  "user": {
    "id": "user-+919876543210",
    "phoneNumber": "+919876543210",
    "userType": null
  }
}
```

#### Chat - Send Message
```bash
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are wheat prices?",
    "userType": "farmer",
    "conversationId": null
  }'
```
Expected:
```json
{
  "conversationId": "...",
  "response": "I can show you current mandi prices...",
  "suggestions": [...],
  "quickActions": [...]
}
```

#### Schemes - List All
```bash
curl http://localhost:3000/api/schemes
```
Expected: Array of 12 schemes

#### Schemes - Filter by User Type
```bash
curl "http://localhost:3000/api/schemes?userType=farmer"
```
Expected: Array of farmer schemes (PM-KISAN, etc.)

#### Schemes - Search
```bash
curl "http://localhost:3000/api/schemes?search=scholarship"
```
Expected: Array of scholarship schemes

#### Schemes - Get by ID
```bash
curl http://localhost:3000/api/schemes/pm-kisan
```
Expected: PM-KISAN scheme details

#### Schemes - Check Eligibility
```bash
curl -X POST http://localhost:3000/api/schemes/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "schemeId": "pm-kisan",
    "userProfile": {
      "age": 35,
      "landSize": 1.5
    }
  }'
```
Expected:
```json
{
  "eligible": true,
  "reasons": [...],
  "missingInfo": []
}
```

#### Mandi Prices - All
```bash
curl http://localhost:3000/api/mandi/prices
```
Expected: Array of 15 crop prices

#### Mandi Prices - Filter by Crop
```bash
curl "http://localhost:3000/api/mandi/prices?crop=wheat"
```
Expected: Wheat prices

#### Mandi Prices - Filter by Location
```bash
curl "http://localhost:3000/api/mandi/prices?location=delhi"
```
Expected: Delhi mandi prices

#### Weather - Forecast
```bash
curl "http://localhost:3000/api/weather/forecast?location=Delhi&days=7"
```
Expected: 7-day weather forecast

#### User - Get Profile
```bash
curl http://localhost:3000/api/user/profile
```
Expected: User profile object

#### User - Update Profile
```bash
curl -X PUT http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "farmer",
    "location": {
      "state": "Punjab",
      "district": "Ludhiana"
    }
  }'
```
Expected: Updated user profile

### Integration Tests

#### Complete User Flow - Farmer
1. Open landing page
2. Click Farmer section
3. Type: "What are wheat prices?"
4. Verify response mentions mandi prices
5. Click "Check Mandi Prices" quick action
6. Send message
7. Verify response shows wheat prices
8. Upload crop image
9. Verify diagnosis response
10. Go back to landing page

#### Complete User Flow - Student
1. Open landing page
2. Click Student section
3. Type: "I need scholarships"
4. Verify response mentions scholarships
5. Type: "Create UPSC study plan"
6. Verify roadmap response
7. Go back to landing page

#### Complete User Flow - Startup
1. Open landing page
2. Click Startup section
3. Type: "Show funding options"
4. Verify response mentions MUDRA, Startup India
5. Go back to landing page

### Performance Tests

#### Page Load Time
- [ ] Landing page loads in < 2 seconds
- [ ] Chat page loads in < 1 second
- [ ] Navigation between pages is instant

#### API Response Time
- [ ] Health check: < 100ms
- [ ] Chat message: < 500ms
- [ ] Schemes list: < 200ms
- [ ] Mandi prices: < 200ms
- [ ] Weather forecast: < 300ms

#### Concurrent Users
```bash
# Test with Apache Bench (if installed)
ab -n 100 -c 10 http://localhost:3000/api/health
```
Expected: All requests succeed

### Mobile Tests

#### Responsive Design
- [ ] Test on phone (or resize browser to 375px width)
- [ ] Landing page sections stack vertically
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Chat interface fits screen
- [ ] Input area accessible
- [ ] Messages display correctly
- [ ] Quick actions scroll horizontally

#### Touch Interactions
- [ ] Can tap sections
- [ ] Can tap buttons
- [ ] Can type in input
- [ ] Can scroll messages
- [ ] Can upload images
- [ ] Back button works

### Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Error Handling Tests

#### Frontend Errors
- [ ] Backend not running → Show error message
- [ ] Network error → Show retry option
- [ ] Invalid response → Show error message
- [ ] Image too large → Show error message

#### Backend Errors
- [ ] Invalid request → 400 Bad Request
- [ ] Not found → 404 Not Found
- [ ] Server error → 500 Internal Server Error
- [ ] Rate limit exceeded → 429 Too Many Requests

### Security Tests

#### Input Validation
- [ ] XSS attempt: `<script>alert('xss')</script>` → Sanitized
- [ ] SQL injection: `'; DROP TABLE users; --` → Sanitized
- [ ] Very long input (10000 chars) → Handled gracefully

#### Rate Limiting
```bash
# Send 101 requests quickly
for i in {1..101}; do
  curl http://localhost:3000/api/health &
done
wait
```
Expected: Some requests return 429 (rate limited)

### Accessibility Tests

#### Keyboard Navigation
- [ ] Can tab through landing page sections
- [ ] Can press Enter to select section
- [ ] Can tab through chat interface
- [ ] Can use keyboard in text input
- [ ] Can press Enter to send message

#### Screen Reader
- [ ] Landing page sections have proper labels
- [ ] Chat messages are readable
- [ ] Buttons have descriptive text
- [ ] Images have alt text

---

## Automated Testing (Future)

### Unit Tests
```bash
cd backend
npm test
```

### Integration Tests
```bash
cd backend
npm run test:integration
```

### E2E Tests
```bash
cd frontend
npm run test:e2e
```

---

## Test Results Template

```
Date: ___________
Tester: ___________

Frontend Tests:
[ ] Landing Page: PASS / FAIL
[ ] Chat - Farmer: PASS / FAIL
[ ] Chat - Student: PASS / FAIL
[ ] Chat - Startup: PASS / FAIL
[ ] Image Upload: PASS / FAIL
[ ] Mobile Responsive: PASS / FAIL

Backend Tests:
[ ] Health Check: PASS / FAIL
[ ] Authentication: PASS / FAIL
[ ] Chat API: PASS / FAIL
[ ] Schemes API: PASS / FAIL
[ ] Mandi API: PASS / FAIL
[ ] Weather API: PASS / FAIL

Integration Tests:
[ ] Farmer Flow: PASS / FAIL
[ ] Student Flow: PASS / FAIL
[ ] Startup Flow: PASS / FAIL

Performance:
[ ] Page Load < 2s: PASS / FAIL
[ ] API Response < 500ms: PASS / FAIL

Issues Found:
1. ___________
2. ___________
3. ___________

Overall Status: PASS / FAIL
```

---

## Quick Smoke Test (30 seconds)

```bash
# 1. Start backend
cd backend && npm start &

# 2. Wait 5 seconds
sleep 5

# 3. Test health endpoint
curl http://localhost:3000/api/health

# 4. Test chat endpoint
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"test","userType":"farmer"}'

# 5. Start frontend
cd ../frontend && npm run dev
```

If all commands succeed, you're ready! ✅

---

## Pre-Demo Checklist

- [ ] All frontend tests pass
- [ ] All backend tests pass
- [ ] Integration tests pass
- [ ] Mobile responsive works
- [ ] No console errors
- [ ] No terminal errors
- [ ] Screenshots taken
- [ ] Demo script practiced

---

**Ready to test? Start with the Quick Test at the top!**
