# ChainStock - React Native App

A fully converted React Native application for iOS and Android using Expo. Real-time financial market tracking with stocks, cryptocurrencies, AI-powered predictions, historical market events, and portfolio management.

## 🚀 What's Been Converted

Your entire React web application has been converted to React Native with the following features:

### ✅ Features Included
- **Landing Page** - Beautiful gradient onboarding screen with feature showcase
- **Dashboard** - Real-time market data for stocks and cryptocurrencies with live updates
- **AI Predictions** - Machine learning powered price forecasts with confidence scores
- **Historical Events** - Timeline of major market events from WWI to today
- **Portfolio** - Asset allocation visualization with holdings tracking
- **Asset Details** - Detailed charts and statistics for individual assets
- **Bottom Tab Navigation** - Seamless navigation between all sections

### 📱 Platform Support
- **iOS** - Full support for iPhone and iPad
- **Android** - Full support for Android devices
- **Web** - Bonus web support via Expo

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Steps to Run

1. **Install dependencies:**
```bash
npm install
# or
yarn install
```

2. **Start the Expo development server:**
```bash
npm start
# or
yarn start
```

3. **Run on specific platform:**
```bash
# iOS (Mac only)
npm run ios

# Android
npm run android

# Web
npm run web
```

### Using Expo Go (Quickest Method)
1. Install the [Expo Go](https://expo.dev/go) app on your phone
2. Scan the QR code displayed in the terminal
3. App loads instantly on your device!

## 📦 Project Structure

```
src/
├── app/
│   └── App.tsx                 # Main app with navigation setup
├── screens/                    # Screen components
│   ├── LandingScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── PredictionsScreen.tsx
│   ├── HistoricalEventsScreen.tsx
│   ├── PortfolioScreen.tsx
│   └── AssetDetailScreen.tsx
├── utils/
│   └── mockData.ts            # Mock data generators
└── components/
    └── native/               # Reusable native components (for future use)

app.json                       # Expo configuration
babel.config.js               # Babel configuration
tsconfig.json                 # TypeScript configuration
package.json                  # Dependencies and scripts
```

## 🔄 Key Conversions Made

### UI Components
- ❌ Removed: Tailwind CSS, shadcn/ui, HTML divs
- ✅ Added: React Native Views, native styling with StyleSheet
- ✅ Added: Lucide React Native icons (mobile-optimized)

### Navigation
- ❌ Removed: Tab state management in useState
- ✅ Added: React Navigation with Bottom Tab Navigator
- ✅ Added: Native Stack Navigator for detail views

### Charts & Data Visualization
- ❌ Removed: Recharts (web-only)
- ✅ Added: react-native-svg-charts (native support)
- ✅ Added: PieChart for portfolio allocation

### Styling
- ❌ Removed: Tailwind CSS classes
- ✅ Added: React Native StyleSheet for performance
- ✅ Added: Expo Linear Gradient for beautiful backgrounds

### Additional Features
- ✅ Native bottom tab navigation
- ✅ Smooth screen transitions
- ✅ Pull-to-refresh functionality
- ✅ Dark mode compatible
- ✅ Safe area handling for notches/rounded corners

## 🎨 Design Features

- **Beautiful Gradient UI** - Material Design inspired colors
- **Responsive Layouts** - Works on all screen sizes
- **Touch-Optimized** - Large touch targets for mobile
- **Status Bar Integration** - Proper status bar styling
- **Smooth Animations** - React Navigation transitions

## 📊 Mock Data

All data is generated locally using functions in `src/utils/mockData.ts`:

- **Assets**: Bitcoin, Ethereum, AAPL, GOOGL, TSLA, MSFT, SOL, AMZN
- **Predictions**: AI predictions with confidence scores
- **Events**: 10+ historical market events with impact analysis
- **Charts**: 30-day historical price data

### Ready for Real API Integration
Simply replace the mock data generators with actual API calls:

```typescript
// Example: Replace in DashboardScreen.tsx
// OLD: const assets = generateMockAssets();
// NEW: const assets = await fetchAssetsFromAPI();
```

## 🔌 API Integration Guide

### For Stock/Crypto Data
Popular APIs you can integrate:
- **Alpha Vantage** - Stock data
- **CoinGecko** - Cryptocurrency data
- **IEX Cloud** - Real-time market data
- **Finnhub** - Financial data

### For Predictions
- **TensorFlow.js** - Run ML models in React Native
- **Custom ML Backend** - Your own prediction API

### Implementation Pattern
```typescript
import { generateMockAssets } from '../utils/mockData';

// In your screen
const [assets, setAssets] = useState<Asset[]>([]);

useEffect(() => {
  // Option 1: Use mock data (development)
  setAssets(generateMockAssets());

  // Option 2: Use real API (production)
  // const data = await fetch('https://api.example.com/assets');
  // setAssets(await data.json());
}, []);
```

## 📱 Build for App Stores

### Build APK/IPA
```bash
# Build for iOS
npm run prebuild
eas build --platform ios

# Build for Android
npm run prebuild
eas build --platform android
```

### Submit to Stores
- **Apple App Store**: [EAS Submit Guide](https://docs.expo.dev/build/submit-to-app-stores/)
- **Google Play Store**: [EAS Submit Guide](https://docs.expo.dev/build/submit-to-app-stores/)

## ⚙️ Configuration

### App Branding
Edit `app.json`:
```json
{
  "expo": {
    "name": "ChainStock",
    "slug": "chainstock",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.chainstock.app"
    },
    "android": {
      "package": "com.chainstock.app"
    }
  }
}
```

### Environment Variables
Create a `.env` file for API keys:
```
EXPO_PUBLIC_ALPHA_VANTAGE_KEY=your_key
EXPO_PUBLIC_COINGECKO_KEY=your_key
```

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
npm install
npm start -- -c
```

### Dependencies Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Simulator Issues
```bash
# Restart the development server
npm start -- -c --no-cache
```

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-svg-charts](https://github.com/JesperLekland/react-native-svg-charts)

## 📝 Next Steps

1. **Replace Mock Data** - Integrate real APIs for assets, predictions, and events
2. **Add Authentication** - User login and account management
3. **Implement Trading** - Buy/sell functionality with real transactions
4. **Add Notifications** - Price alerts and market news
5. **User Preferences** - Dark mode, watchlist, portfolio customization
6. **Offline Support** - AsyncStorage for data caching
7. **Analytics** - Track user behavior and app performance
8. **Push Notifications** - Market alerts and price updates

## 🎯 Performance Tips

- **Lazy Load Screens**: Use React Navigation's lazy loading
- **Memoize Components**: Use `React.memo()` for list items
- **Optimize Images**: Use appropriate image sizes and formats
- **Reduce Bundles**: Tree-shake unused dependencies

## 📄 License

This converted app maintains the same license as the original project.

## 🤝 Support

For issues with React Native conversion:
1. Check React Native documentation
2. Review Expo troubleshooting guides
3. Check component-specific library documentation
4. Create an issue with error logs and device info

---

**Happy coding! 🚀**
