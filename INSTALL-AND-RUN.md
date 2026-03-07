# 🚀 INSTALL AND RUN - Super Simple Guide

## Option 1: Automatic (Recommended)

### Windows (PowerShell)
```powershell
# Open PowerShell in samarthbharat-mvp folder

# Install everything
cd backend; npm install; cd ../frontend; npm install; cd ..

# Run backend (keep this terminal open)
cd backend; npm start
```

Open a NEW PowerShell window:
```powershell
# Run frontend
cd frontend; npm run dev
```

### Mac/Linux (Terminal)
```bash
# Open Terminal in samarthbharat-mvp folder

# Install everything
cd backend && npm install && cd ../frontend && npm install && cd ..

# Run backend (keep this terminal open)
cd backend && npm start
```

Open a NEW Terminal window:
```bash
# Run frontend
cd frontend && npm run dev
```

## Option 2: Step by Step

### Step 1: Install Backend
```bash
cd backend
npm install
```

Wait for installation to complete (2-3 minutes)

### Step 2: Install Frontend
```bash
cd ../frontend
npm install
```

Wait for installation to complete (2-3 minutes)

### Step 3: Run Backend
```bash
cd ../backend
npm start
```

You should see:
```
🚀 SamarthBharat API Server running on port 3000
📝 Environment: development
🌐 API URL: http://localhost:3000
✅ Redis connected successfully
```

**Keep this terminal open!**

### Step 4: Run Frontend (New Terminal)

Open a NEW terminal window, then:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.11  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Open Browser

Go to: **http://localhost:5173**

## ✅ Success Checklist

You should see:
- [ ] Backend terminal shows "Server running on port 3000"
- [ ] Frontend terminal shows "Local: http://localhost:5173"
- [ ] Browser shows SamarthBharat landing page
- [ ] Three colored sections (Green, Blue, Orange)
- [ ] Can click on any section and see chat interface

## 🐛 Common Issues

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Port 3000 already in use"
**Solution:** 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Issue: Backend starts but frontend shows errors
**Solution:** Make sure backend is running FIRST, then start frontend

### Issue: "EACCES: permission denied"
**Solution:**
```bash
# Mac/Linux
sudo npm install

# Windows
# Run PowerShell as Administrator
```

## 📱 Test on Mobile

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Look for IPv4 address (e.g., 192.168.1.100)

3. On your phone, open browser and go to:
   ```
   http://YOUR-IP-ADDRESS:5173
   ```

4. Make sure phone and computer are on same WiFi network

## 🎯 Quick Demo Test

Once everything is running:

1. **Test Landing Page**
   - Open http://localhost:5173
   - See 3 sections
   - Click each section

2. **Test Chat**
   - Click "Farmer" section
   - Type: "What are wheat prices?"
   - See response
   - Click quick action buttons

3. **Test Image Upload**
   - Click camera icon
   - Select any image
   - See preview
   - Send message

4. **Test All User Types**
   - Go back to home
   - Try Student section
   - Try Startup section

## 💾 Save Your Work

Before closing:
```bash
# Stop backend: Ctrl+C
# Stop frontend: Ctrl+C

# Your code is saved automatically!
```

## 🔄 Restart Later

Next time you want to run:
```bash
# Terminal 1
cd backend
npm start

# Terminal 2 (new window)
cd frontend
npm run dev
```

No need to run `npm install` again!

## 📊 What's Running

- **Backend:** http://localhost:3000
  - API endpoints
  - Mock data
  - Chat logic

- **Frontend:** http://localhost:5173
  - User interface
  - Landing page
  - Chat interface

## 🎉 You're Done!

If you see the landing page with 3 colored sections, **YOU'RE READY FOR THE DEMO!**

Open **DEMO-README.md** for demo script and tips.

---

**Need help?** Check:
1. This file (INSTALL-AND-RUN.md)
2. DEMO-README.md
3. QUICK-START.md
4. Terminal error messages
