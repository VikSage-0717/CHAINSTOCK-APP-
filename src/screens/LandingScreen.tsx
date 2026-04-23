import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TrendingUp,
  Brain,
  History,
  BarChart3,
} from 'lucide-react-native';

interface LandingScreenProps {
  onGetStarted: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LandingScreen({ onGetStarted }: LandingScreenProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Live Market Data',
      description: 'Real-time tracking of stocks and cryptocurrencies',
      color: '#2563eb',
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Machine learning powered price forecasts',
      color: '#9333ea',
    },
    {
      icon: History,
      title: 'Historical Events',
      description: 'Learn how major events shaped markets since WWI',
      color: '#b45309',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments in one place',
      color: '#16a34a',
    },
  ];

  return (
    <LinearGradient
      colors={['#2563eb', '#9333ea', '#ec4899']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
        }}
      >
        {/* Logo Section */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <TrendingUp size={64} color="#ffffff" strokeWidth={2.5} />
          </View>

          <Text
            style={{
              fontSize: 48,
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: 16,
              letterSpacing: -1.5,
            }}
          >
            ChainStock
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            Your intelligent companion for crypto and stock market analysis
          </Text>
        </View>

        {/* Features Grid */}
        <View
          style={{
            marginBottom: 32,
            gap: 12,
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Icon size={28} color={feature.color} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {feature.description}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 32,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#ffffff',
              }}
            >
              1000+
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: 4,
              }}
            >
              Assets
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#ffffff',
              }}
            >
              AI
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: 4,
              }}
            >
              Powered
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#ffffff',
              }}
            >
              24/7
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: 4,
              }}
            >
              Live Data
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={onGetStarted}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            alignItems: 'center',
            marginTop: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#2563eb',
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
