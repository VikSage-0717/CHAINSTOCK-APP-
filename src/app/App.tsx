import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar } from 'react-native';
import { Home, TrendingUp, History, BarChart3 } from 'lucide-react-native';

import LandingScreen from '../screens/LandingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PredictionsScreen from '../screens/PredictionsScreen';
import HistoricalEventsScreen from '../screens/HistoricalEventsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import AssetDetailScreen from '../screens/AssetDetailScreen';

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
          animationEnabled: true,
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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showLanding ? (
            <Stack.Screen
              name="Landing"
              options={{ animationEnabled: false }}
              children={() => (
                <LandingScreen onGetStarted={handleGetStarted} />
              )}
            />
          ) : (
            <Stack.Screen
              name="MainApp"
              options={{ animationEnabled: false }}
              component={MainTabs}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}