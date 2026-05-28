import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react-native';

interface PredictionCardProps {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
}

export default function PredictionCard({
  symbol,
  name,
  currentPrice,
  predictedPrice,
  confidence,
  timeframe,
  trend,
}: PredictionCardProps) {
  const change =
    ((predictedPrice -
      currentPrice) /
      currentPrice) *
    100;

  const trendConfig = {
    bullish: {
      backgroundColor: '#ecfdf5',
      borderColor: '#bbf7d0',
      icon: TrendingUp,
      iconColor: '#16a34a',
      badgeBg: '#dcfce7',
    },

    bearish: {
      backgroundColor: '#fef2f2',
      borderColor: '#fecaca',
      icon: TrendingDown,
      iconColor: '#dc2626',
      badgeBg: '#fee2e2',
    },

    neutral: {
      backgroundColor: '#f9fafb',
      borderColor: '#d1d5db',
      icon: Minus,
      iconColor: '#6b7280',
      badgeBg: '#e5e7eb',
    },
  };

  const config = trendConfig[trend];

  const TrendIcon = config.icon;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            config.backgroundColor,
          borderColor:
            config.borderColor,
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <View style={styles.symbolRow}>
            <Brain
              size={18}
              color="#9333ea"
            />

            <Text style={styles.symbol}>
              {symbol}
            </Text>
          </View>

          <Text style={styles.name}>
            {name}
          </Text>
        </View>

        <View
          style={[
            styles.trendBadge,
            {
              backgroundColor:
                config.badgeBg,
            },
          ]}
        >
          <TrendIcon
            size={16}
            color={config.iconColor}
          />

          <Text
            style={[
              styles.trendText,
              {
                color:
                  config.iconColor,
              },
            ]}
          >
            {trend.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* PRICE SECTION */}
      <View style={styles.priceGrid}>
        <View style={styles.priceBox}>
          <Text style={styles.label}>
            Current Price
          </Text>

          <Text style={styles.price}>
            $
            {currentPrice.toFixed(
              2
            )}
          </Text>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.label}>
            Predicted ({timeframe})
          </Text>

          <Text style={styles.price}>
            $
            {predictedPrice.toFixed(
              2
            )}
          </Text>
        </View>
      </View>

      {/* CHANGE */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>
          Expected Change
        </Text>

        <Text
          style={[
            styles.changeText,
            {
              color:
                change >= 0
                  ? '#16a34a'
                  : '#dc2626',
            },
          ]}
        >
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}%
        </Text>
      </View>

      {/* CONFIDENCE */}
      <View style={styles.confidenceSection}>
        <View style={styles.infoRow}>
          <Text
            style={styles.infoLabel}
          >
            Confidence
          </Text>

          <Text
            style={
              styles.confidenceText
            }
          >
            {confidence}%
          </Text>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${confidence}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 6,
  },

  name: {
    fontSize: 14,
    color: '#6b7280',
  },

  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  trendText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },

  priceGrid: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 16,
  },

  priceBox: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 14,
    color: '#4b5563',
  },

  changeText: {
    fontSize: 15,
    fontWeight: '700',
  },

  confidenceSection: {
    marginTop: 6,
  },

  confidenceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  progressBg: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 4,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#9333ea',
    borderRadius: 999,
  },
});