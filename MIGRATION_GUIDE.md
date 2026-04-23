# React Native Migration Guide

## What's Changed From Web to React Native

This document explains all the changes made during the conversion from React web to React Native with Expo.

### 1. **Entry Point**

**Web (Old)**
```typescript
// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
createRoot(document.getElementById("root")!).render(<App />);
```

**React Native (New)**
```typescript
// src/main.tsx
import 'expo-router/entry';
```

### 2. **App Structure**

**Web (Old)**
- Used `useState` for tab management
- Direct component rendering based on state
- No formal navigation structure

**React Native (New)**
- Uses React Navigation for proper mobile navigation
- Bottom Tab Navigator for tabs
- Native Stack Navigator for detail screens
- Proper screen lifecycle management

### 3. **UI Framework Changes**

#### Removed
- **Tailwind CSS** - Not available in React Native
- **shadcn/ui** - Web-only component library
- **HTML Elements** - `<div>`, `<button>`, `<input>`, etc.
- **Recharts** - Web-only charting library

#### Added
- **React Native Components** - `View`, `Text`, `TouchableOpacity`, `ScrollView`, `FlatList`
- **react-native-svg-charts** - Native charting library
- **expo-linear-gradient** - Beautiful gradient backgrounds
- **lucide-react-native** - Native icon library

### 4. **Component Styling**

**Web (Old) - Tailwind CSS**
```jsx
<div className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700">
  Click me
</div>
```

**React Native (New) - StyleSheet**
```jsx
<View style={styles.button}>
  <Text style={styles.buttonText}>Click me</Text>
</View>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
```

### 5. **Navigation Changes**

**Web (Old) - Tab State**
```jsx
const [activeTab, setActiveTab] = useState('home');

return (
  <>
    {activeTab === 'home' && <Dashboard />}
    {activeTab === 'predictions' && <Predictions />}
    <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
  </>
);
```

**React Native (New) - React Navigation**
```jsx
<Tab.Navigator>
  <Tab.Screen name="Home" component={DashboardStack} />
  <Tab.Screen name="Predictions" component={PredictionsScreen} />
  <Tab.Screen name="History" component={HistoricalEventsScreen} />
  <Tab.Screen name="Portfolio" component={PortfolioScreen} />
</Tab.Navigator>
```

### 6. **Screen Navigation**

**Web (Old) - Single Page**
```jsx
// Modal-like state management
const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

if (selectedAsset) {
  return <AssetDetail {...selectedAsset} onBack={() => setSelectedAsset(null)} />;
}
```

**React Native (New) - Stack Navigation**
```jsx
// Proper screen stack with navigation
const handleAssetClick = (asset: Asset) => {
  navigation.navigate('AssetDetail', { asset });
};

// AssetDetailScreen receives params automatically
const route = useRoute();
const { asset } = route.params as RouteParams;
```

### 7. **Input Components**

**Web (Old) - HTML Input**
```jsx
<input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

**React Native (New) - TextInput**
```jsx
<TextInput
  placeholder="Search..."
  value={searchQuery}
  onChangeText={setSearchQuery}
  style={styles.input}
/>
```

### 8. **Lists**

**Web (Old) - Array.map() with className**
```jsx
<div className="grid grid-cols-2 gap-4">
  {assets.map((asset) => (
    <div key={asset.symbol} className="bg-white p-4 rounded-lg">
      {asset.name}
    </div>
  ))}
</div>
```

**React Native (New) - FlatList**
```jsx
<FlatList
  data={assets}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text>{item.name}</Text>
    </View>
  )}
  keyExtractor={(item) => item.symbol}
/>
```

### 9. **Touch Interactions**

**Web (Old) - Buttons & onClick**
```jsx
<button
  onClick={handleRefresh}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Refresh
</button>
```

**React Native (New) - TouchableOpacity**
```jsx
<TouchableOpacity onPress={handleRefresh} style={styles.button}>
  <Text style={styles.buttonText}>Refresh</Text>
</TouchableOpacity>
```

### 10. **Charts**

**Web (Old) - Recharts**
```jsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="price" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
```

**React Native (New) - react-native-svg-charts**
```jsx
<LineChart
  style={{ flex: 1 }}
  data={chartData}
  svg={{ stroke: '#10b981', strokeWidth: 2 }}
  contentInset={{ top: 10, bottom: 10 }}
  xAccessor={({ index }) => index}
  yAccessor={({ item }) => item.price}
>
  <Grid />
</LineChart>
```

### 11. **Scrolling**

**Web (Old) - CSS overflow**
```jsx
<div className="overflow-auto">
  {/* content */}
</div>
```

**React Native (New) - ScrollView/FlatList**
```jsx
<ScrollView showsVerticalScrollIndicator={false}>
  {/* content */}
</ScrollView>

// OR for lists

<FlatList
  data={data}
  renderItem={({ item }) => {/* ... */}}
  keyExtractor={(item) => item.id}
  scrollEnabled={true}
/>
```

### 12. **Refresh Control**

**Web (Old) - Manual refresh button**
```jsx
<button onClick={handleRefresh}>Refresh</button>
```

**React Native (New) - Pull-to-refresh**
```jsx
<FlatList
  data={assets}
  refreshControl={
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      tintColor="#2563eb"
    />
  }
/>
```

### 13. **Icons**

**Web (Old) - lucide-react**
```jsx
import { RefreshCw } from 'lucide-react';
<RefreshCw size={20} />
```

**React Native (New) - lucide-react-native**
```jsx
import { RefreshCw } from 'lucide-react-native';
<RefreshCw size={20} color="#ffffff" />
```

### 14. **Gradients**

**Web (Old) - Tailwind**
```jsx
<div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
  {/* content */}
</div>
```

**React Native (New) - expo-linear-gradient**
```jsx
<LinearGradient
  colors={['#2563eb', '#9333ea', '#ec4899']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1 }}
>
  {/* content */}
</LinearGradient>
```

### 15. **Responsive Design**

**Web (Old) - Tailwind breakpoints**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* responsive grid */}
</div>
```

**React Native (New) - Dimensions & useWindowDimensions**
```jsx
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Responsive calculations
const itemWidth = screenWidth > 600 ? 200 : 100;
```

### 16. **File Structure Changes**

**Old Structure**
```
src/app/
  ├── App.tsx
  └── components/
      ├── Dashboard.tsx
      ├── LandingPage.tsx
      ├── Predictions.tsx
      ├── HistoricalEvents.tsx
      ├── Portfolio.tsx
      ├── AssetDetail.tsx
      └── ui/
```

**New Structure**
```
src/
  ├── app/
  │   └── App.tsx           (Navigation setup)
  ├── screens/              (NEW - Screen components)
  │   ├── LandingScreen.tsx
  │   ├── DashboardScreen.tsx
  │   ├── PredictionsScreen.tsx
  │   ├── HistoricalEventsScreen.tsx
  │   ├── PortfolioScreen.tsx
  │   └── AssetDetailScreen.tsx
  ├── utils/               (NEW - Shared utilities)
  │   └── mockData.ts
  └── components/
      └── native/          (NEW - Reusable components)
```

### 17. **Package Dependencies**

**Removed**
- `@vitejs/plugin-react`
- `tailwindcss` & `@tailwindcss/vite`
- `react-router`
- `recharts`
- `react-dnd`
- `react-slick`
- All shadcn/ui packages
- All Radix UI packages

**Added**
- `expo` & `expo-router`
- `@react-navigation/*`
- `react-native-screens`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `expo-linear-gradient`
- `react-native-svg-charts`
- `lucide-react-native`

## Performance Improvements

1. **Native Code**: Runs on native thread, better performance
2. **Smaller Bundle**: No web-only libraries
3. **Optimized Lists**: FlatList provides virtualization
4. **Native Scrolling**: Hardware-accelerated scrolling
5. **Touch Optimization**: Native touch handling

## Breaking Changes

1. **No CSS** - All styling must use React Native StyleSheet
2. **No HTML** - Use React Native components only
3. **Navigation Required** - Must use React Navigation for screen management
4. **Different Layouts** - Flexbox only, no CSS Grid
5. **Platform Specific** - Some code may differ between iOS and Android

## Common Patterns

### Conditional Rendering
```jsx
// Instead of className
<View style={isActive ? styles.activeButton : styles.button}>
  {/* content */}
</View>
```

### Dynamic Styles
```jsx
const dynamicStyle = {
  backgroundColor: isPositive ? '#10b981' : '#ef4444',
  color: isPositive ? 'green' : 'red',
};

<View style={dynamicStyle}>
  {/* content */}
</View>
```

### Safe Area
```jsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1 }}>
  {/* content is automatically inset */}
</SafeAreaView>
```

## Migration Checklist

- [x] Convert App structure to use React Navigation
- [x] Convert all screens to React Native components
- [x] Replace Tailwind with StyleSheet
- [x] Replace HTML elements with RN components
- [x] Replace Recharts with react-native-svg-charts
- [x] Replace web icons with native icons
- [x] Set up bottom tab navigation
- [x] Set up stack navigation for details
- [x] Add pull-to-refresh functionality
- [x] Handle safe areas and notches
- [ ] Add platform-specific code if needed
- [ ] Test on actual devices
- [ ] Optimize performance
- [ ] Prepare for app store submission

---

## Questions?

Refer to the main [REACT_NATIVE_README.md](./REACT_NATIVE_README.md) for setup and running instructions.
