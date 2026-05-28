import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Home, TrendingUp, History, BarChart3 } from 'lucide-react-native';

import LandingScreen from './src/screens/LandingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PredictionsScreen from './src/screens/PredictionsScreen';
import HistoricalEventsScreen from './src/screens/HistoricalEventsScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import AssetDetailScreen from './src/screens/AssetDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="AssetDetail"
        component={AssetDetailScreen}
        options={{
          animation: 'default' as any,
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let Icon;
          if (route.name === 'Home') Icon = Home;
          else if (route.name === 'Predictions') Icon = TrendingUp;
          else if (route.name === 'History') Icon = History;
          else if (route.name === 'Portfolio') Icon = BarChart3;

          return Icon ? <Icon size={size} color={color} /> : null;
        },
        tabBarLabel: route.name,
        tabBarLabelStyle: { fontSize: 12, marginTop: 4 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Predictions"
        component={PredictionsScreen}
        options={{ title: 'Predictions' }}
      />
      <Tab.Screen
        name="History"
        component={HistoricalEventsScreen}
        options={{ title: 'Events' }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ title: 'Portfolio' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  class ErrorBoundary extends React.Component<any, { error: any }>{
    constructor(props: any) {
      super(props);
      this.state = { error: null };
    }

    static getDerivedStateFromError(error: any) {
      return { error };
    }

    componentDidCatch(error: any, info: any) {
      // You can log error details to monitoring here
      // console.error(error, info);
    }

    render() {
      if (this.state.error) {
        return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
            <Text style={{fontSize:18, fontWeight:'700', marginBottom:12}}>An error occurred</Text>
            <Text style={{color:'#333'}}>{String(this.state.error)}</Text>
          </View>
        );
      }
      return this.props.children;
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {showLanding ? (
              <Stack.Screen
                name="Landing"
                options={{ animation: 'none' as any }}
                children={() => (
                  <LandingScreen onGetStarted={handleGetStarted} />
                )}
              />
            ) : (
              <Stack.Screen
                name="MainApp"
                options={{ animation: 'none' as any }}
                component={MainTabs}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}