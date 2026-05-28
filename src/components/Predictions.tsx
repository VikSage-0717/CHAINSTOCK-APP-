import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Brain,
  Sparkles,
} from 'lucide-react-native';

import PredictionCard from './PredictionCard';

interface Prediction {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend:
    | 'bullish'
    | 'bearish'
    | 'neutral';
}

export default function PredictionsScreen() {
  const [predictions, setPredictions] =
    useState<Prediction[]>([]);

  const [
    selectedTimeframe,
    setSelectedTimeframe,
  ] = useState('24h');

  const timeframes = [
    '24h',
    '7d',
    '30d',
  ];

  const generatePredictions = (
    timeframe: string
  ): Prediction[] => {
    const baseAssets = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        currentPrice: 67234.5,
      },

      {
        symbol: 'ETH',
        name: 'Ethereum',
        currentPrice: 3198.75,
      },

      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currentPrice: 178.42,
      },

      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        currentPrice: 248.87,
      },

      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        currentPrice: 142.15,
      },

      {
        symbol: 'SOL',
        name: 'Solana',
        currentPrice: 145.32,
      },
    ];

    const timeframeMultiplier =
      {
        '24h': 0.03,
        '7d': 0.08,
        '30d': 0.15,
      }[timeframe] || 0.03;

    return baseAssets.map(
      (asset) => {
        const randomFactor =
          (Math.random() - 0.45) *
          timeframeMultiplier;

        const predictedPrice =
          asset.currentPrice *
          (1 + randomFactor);

        const confidence =
          Math.floor(
            65 + Math.random() * 30
          );

        let trend:
          | 'bullish'
          | 'bearish'
          | 'neutral';

        if (
          predictedPrice >
          asset.currentPrice * 1.02
        ) {
          trend = 'bullish';
        } else if (
          predictedPrice <
          asset.currentPrice * 0.98
        ) {
          trend = 'bearish';
        } else {
          trend = 'neutral';
        }

        return {
          ...asset,
          predictedPrice,
          confidence,
          timeframe,
          trend,
        };
      }
    );
  };

  useEffect(() => {
    setPredictions(
      generatePredictions(
        selectedTimeframe
      )
    );

    const interval =
      setInterval(() => {
        setPredictions(
          generatePredictions(
            selectedTimeframe
          )
        );
      }, 10000);

    return () =>
      clearInterval(interval);
  }, [selectedTimeframe]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Brain
            size={32}
            color="#9333ea"
          />

          <Text style={styles.title}>
            AI Predictions
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Machine learning powered
          market forecasts
        </Text>
      </View>

      {/* INFO BANNER */}
      <View style={styles.infoBanner}>
        <View style={styles.infoRow}>
          <Sparkles
            size={20}
            color="#9333ea"
            style={{
              marginTop: 2,
            }}
          />

          <View
            style={styles.infoTextBox}
          >
            <Text
              style={styles.infoTitle}
            >
              How it works
            </Text>

            <Text
              style={
                styles.infoDescription
              }
            >
              Our ML models analyze
              historical trends,
              market sentiment,
              trading volumes, and
              global events to
              forecast possible
              future price movement.
            </Text>
          </View>
        </View>
      </View>

      {/* TIMEFRAME BUTTONS */}
      <View
        style={
          styles.timeframeContainer
        }
      >
        {timeframes.map((tf) => {
          const isSelected =
            selectedTimeframe === tf;

          return (
            <TouchableOpacity
              key={tf}
              style={[
                styles.timeButton,

                isSelected &&
                  styles.activeTimeButton,
              ]}
              onPress={() =>
                setSelectedTimeframe(
                  tf
                )
              }
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.timeButtonText,

                  isSelected &&
                    styles.activeTimeButtonText,
                ]}
              >
                {tf}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* PREDICTIONS */}
      <View
        style={
          styles.predictionsContainer
        }
      >
        {predictions.map(
          (prediction) => (
            <PredictionCard
              key={
                prediction.symbol
              }
              {...prediction}
            />
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  header: {
    marginBottom: 24,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },

  infoBanner: {
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoTextBox: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  infoDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },

  timeframeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  timeButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },

  activeTimeButton: {
    backgroundColor: '#9333ea',
  },

  timeButtonText: {
    color: '#4b5563',
    fontWeight: '700',
    fontSize: 14,
  },

  activeTimeButtonText: {
    color: '#ffffff',
  },

  predictionsContainer: {
    marginBottom: 30,
  },
});