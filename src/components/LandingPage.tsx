import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import {
  TrendingUp,
  Brain,
  History,
  Sparkles,
  ArrowRight,
  BarChart3,
  ChevronDown,
  RefreshCw,
} from 'lucide-react-native';

import { getDashboardAssets, getAssetPrediction } from '../utils/api';

const { width } = Dimensions.get('window');

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingScreen({
  onGetStarted,
}: LandingPageProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [devRunning, setDevRunning] = useState(false);

  const tickerItems = [
    { symbol: 'BTC', price: '$67,432', change: '+2.4%' },
    { symbol: 'ETH', price: '$3,521', change: '+1.8%' },
    { symbol: 'AAPL', price: '$178.32', change: '+0.9%' },
    { symbol: 'NVDA', price: '$892.15', change: '+3.2%' },
    { symbol: 'TSLA', price: '$245.67', change: '-1.2%' },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Live Market Data',
      description: 'Real-time tracking of stocks and cryptocurrencies',
      color: '#2563eb',
      bg: '#dbeafe',
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Machine learning powered price forecasts',
      color: '#9333ea',
      bg: '#f3e8ff',
    },
    {
      icon: History,
      title: 'Historical Events',
      description: 'Learn how major events shaped markets since WWI',
      color: '#d97706',
      bg: '#fef3c7',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments in one place',
      color: '#16a34a',
      bg: '#dcfce7',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const runDevPredictions = async () => {
    try {
      setDevRunning(true);

      const assets = await getDashboardAssets();

      const targets = (assets || []).slice(0, 5);

      for (const t of targets) {
        try {
          const pred = await getAssetPrediction(t.symbol);
          console.log(t.symbol, pred);
        } catch (err) {
          console.log(err);
        }
      }

      Alert.alert('Success', 'Predictions completed');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Something went wrong');
    } finally {
      setDevRunning(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563eb"
      />

      {/* Ticker */}
      <View style={styles.tickerCard}>
        <View style={styles.tickerTop}>
          <View style={styles.row}>
            <RefreshCw size={14} color="#d1d5db" />
            <Text style={styles.liveText}> Live Markets</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.liveDot} />
            <Text style={styles.updatedText}>
              Updated just now
            </Text>
          </View>
        </View>

        <View style={styles.tickerBottom}>
          <Text style={styles.symbol}>
            {tickerItems[tickerIndex].symbol}
          </Text>

          <Text style={styles.price}>
            {tickerItems[tickerIndex].price}
          </Text>

          <Text
            style={[
              styles.change,
              {
                color: tickerItems[
                  tickerIndex
                ].change.startsWith('+')
                  ? '#86efac'
                  : '#fca5a5',
              },
            ]}
          >
            {tickerItems[tickerIndex].change}
          </Text>
        </View>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <TrendingUp
            size={64}
            color="#ffffff"
            strokeWidth={2.5}
          />
        </View>

        <Text style={styles.title}>ChainStock</Text>

        <Text style={styles.subtitle}>
          Your intelligent companion for crypto and
          stock market analysis
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featureGrid}>
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <View key={index} style={styles.featureCard}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: feature.bg },
                ]}
              >
                <Icon
                  size={24}
                  color={feature.color}
                />
              </View>

              <Text style={styles.featureTitle}>
                {feature.title}
              </Text>

              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1000+</Text>
          <Text style={styles.statLabel}>Assets</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>AI</Text>
          <Text style={styles.statLabel}>Powered</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>24/7</Text>
          <Text style={styles.statLabel}>Live Data</Text>
        </View>
      </View>

      {/* Dev Button */}
      <TouchableOpacity
        style={styles.devButton}
        onPress={runDevPredictions}
        disabled={devRunning}
      >
        <Text style={styles.devButtonText}>
          {devRunning
            ? 'Running Predictions...'
            : 'Dev: Run Predictions'}
        </Text>
      </TouchableOpacity>

      {/* CTA */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={onGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaText}>
          Get Started
        </Text>

        <ArrowRight size={22} color="#7c3aed" />
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Sparkles size={14} color="#d1d5db" />

        <Text style={styles.footerText}>
          Free to use • No signup required
        </Text>
      </View>

      {/* Scroll Indicator */}
      <View style={styles.scrollIndicator}>
        <Text style={styles.scrollText}>
          Scroll to explore
        </Text>

        <ChevronDown size={18} color="#d1d5db" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
  },

  content: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },

  tickerCard: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },

  tickerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tickerBottom: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveText: {
    color: '#d1d5db',
    fontSize: 12,
  },

  updatedText: {
    color: '#86efac',
    fontSize: 12,
    marginLeft: 4,
  },

  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },

  symbol: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 15,
  },

  price: {
    color: '#e5e7eb',
    fontSize: 16,
    marginRight: 10,
  },

  change: {
    fontSize: 14,
    fontWeight: '600',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 25,
    borderRadius: 30,
    marginBottom: 25,
  },

  title: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  subtitle: {
    color: '#e5e7eb',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },

  featureGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  featureCard: {
    width: width * 0.42,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
  },

  iconBox: {
    padding: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  featureTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  featureDescription: {
    color: '#d1d5db',
    fontSize: 12,
    lineHeight: 18,
  },

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  statItem: {
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#d1d5db',
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  devButton: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 15,
  },

  devButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  ctaButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  ctaText: {
    color: '#7c3aed',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  footerText: {
    color: '#d1d5db',
    fontSize: 12,
    marginLeft: 6,
  },

  scrollIndicator: {
    alignItems: 'center',
  },

  scrollText: {
    color: '#d1d5db',
    fontSize: 12,
    marginBottom: 4,
  },
});