import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';

interface MarketCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
  onClick?: () => void;
}

export default function MarketCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  type,
  onClick,
}: MarketCardProps) {
  const isPositive = change >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onClick}
      activeOpacity={0.9}
    >
      {/* TOP SECTION */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.symbol}>
            {symbol}
          </Text>

          <Text style={styles.name}>
            {name}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {type === 'crypto'
              ? 'CRYPTO'
              : 'STOCK'}
          </Text>
        </View>
      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.price}>
            $
            {price.toLocaleString(
              'en-US',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </Text>
        </View>

        <View
          style={styles.changeContainer}
        >
          {isPositive ? (
            <TrendingUp
              size={16}
              color="#16a34a"
            />
          ) : (
            <TrendingDown
              size={16}
              color="#dc2626"
            />
          )}

          <Text
            style={[
              styles.changeText,
              {
                color: isPositive
                  ? '#16a34a'
                  : '#dc2626',
              },
            ]}
          >
            {isPositive ? '+' : ''}
            {changePercent.toFixed(2)}
            %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  name: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4b5563',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },

  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  changeText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 5,
  },
});