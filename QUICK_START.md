# Quick Start Guide

## 🚀 Get Your React Native App Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Expo Development Server
```bash
npm start
```

You'll see a QR code in the terminal.

### Step 3: Choose Your Platform

#### Option A: iOS Simulator (Mac only)
```bash
npm run ios
```

#### Option B: Android Emulator
```bash
npm run android
```

#### Option C: Expo Go App (Recommended - Fastest!)
1. Download **Expo Go** app from App Store or Google Play
2. Scan the QR code from terminal with your phone camera
3. App opens instantly! 📱

#### Option D: Web Browser
```bash
npm run web
```

## 📋 What You'll See

After starting, you'll see:

```
│                                   │
│        ChainStock                 │
│   Real-time Market Analysis       │
│                                   │
│        [Landing Page]             │
│    [Get Started Button]           │
│                                   │
```

**Tap "Get Started"** to enter the app with:
- **Home** - Market dashboard with live assets
- **Predictions** - AI price forecasts
- **Events** - Historical market timeline
- **Portfolio** - Asset allocation & holdings

## 🛠️ Development Commands

```bash
# Start dev server
npm start

# iOS development
npm run ios

# Android development
npm run android

# Web development
npm run web

# Full rebuild (if issues occur)
npm start -- -c

# Install specific package
npm install package-name
```

## 🐛 Troubleshooting

### Issue: "Module not found" errors
```bash
# Clear cache and reinstall
npm install
npm start -- -c
```

### Issue: Simulator won't launch
```bash
# Restart with clean build
npm start -- --clear
```

### Issue: Port 19000 already in use
```bash
# Kill process on port 19000
# macOS/Linux:
lsof -ti:19000 | xargs kill -9

# Windows:
netstat -ano | findstr :19000
taskkill /PID <PID> /F
```

## 📱 Device Testing

### Using Your Real Phone

1. **Install Expo Go** from your app store
2. **Make sure your phone and computer are on the same WiFi**
3. **Run:**
   ```bash
   npm start
   ```
4. **Scan QR code** with your phone camera
5. **App opens on your device!**

### No WiFi? Use Tunnel Mode

```bash
npm start -- --tunnel
```

## 🎯 Next Steps After Getting It Running

### 1. Make Your First Change
Edit `src/screens/DashboardScreen.tsx`:
- Change "ChainStock" text
- Modify colors
- Add your logo
- See live reload instantly!

### 2. Replace Mock Data
Edit `src/utils/mockData.ts`:
- Replace `generateMockAssets()` with real API
- Update `generatePredictions()` with your ML model
- Integrate actual market data

### 3. Add API Integration
```typescript
// Example: Replace mock with real data
import { generateMockAssets } from '../utils/mockData';

// OLD: setAssets(generateMockAssets());

// NEW:
const fetchAssets = async () => {
  const response = await fetch('https://api.example.com/assets');
  const data = await response.json();
  setAssets(data);
};
fetchAssets();
```

### 4. Customize App Config
Edit `app.json`:
```json
{
  "expo": {
    "name": "My Finance App",
    "slug": "my-finance-app",
    "ios": { "bundleIdentifier": "com.example.myapp" },
    "android": { "package": "com.example.myapp" }
  }
}
```

### 5. Add Assets (App Icon, Splash)
```bash
# Generate icon and splash images
expo-cli prebuild

# Place in /assets folder:
# - icon.png (1024x1024)
# - splash.png (1242x2208)
# - adaptive-icon.png (108x108)
```

## 💡 Pro Tips

### Hot Reload
- **Save file** → App updates automatically
- No need to restart server!

### Debugging
```bash
# Open DevTools in Expo Go:
# Shake your phone (or Ctrl+M on Android emulator)
# Select "Debug remote JS"
```

### View Logs
```bash
# Terminal will show all console.log() messages
npm start

# Look for 🔥 symbols for hot reload notifications
```

### Performance Check
- Install React DevTools Chrome extension
- Monitor component renders
- Check performance metrics

## 📚 Learn More

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Expo Go App](https://expo.dev/go)

## ✅ Verification Checklist

After running the app:

- [ ] App launches without errors
- [ ] Landing page displays correctly
- [ ] "Get Started" button works
- [ ] Bottom tabs navigate between screens
- [ ] Dashboard shows mock assets
- [ ] Can see asset details
- [ ] Predictions display AI scores
- [ ] Historical events show timeline
- [ ] Portfolio shows allocation chart
- [ ] Pull-to-refresh works on dashboard

## 🎉 Success!

If you see all the screens working, you've successfully converted your app to React Native! 

**Next:** Follow the [REACT_NATIVE_README.md](./REACT_NATIVE_README.md) for API integration and app store deployment.

---

**Questions?** Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed conversion explanations.
