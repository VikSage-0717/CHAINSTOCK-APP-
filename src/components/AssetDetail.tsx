import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
} from 'lucide-react-native';

import {
  LineChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface AssetDetailProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
  onBack: () => void;
}

export default function AssetDetail({
  symbol,
  name,
  price,
  change,
  changePercent,
  type,
  onBack,
}: AssetDetailProps) {
  const isPositive = change >= 0;

  // Generate chart data
  const generateChartData = () => {
    const basePrice =
      price / (1 + changePercent / 100);

    return Array.from({ length: 30 }, (_, i) => {
      const variation =
        (Math.random() - 0.5) * 0.08;

      return Number(
        (
          basePrice *
          (1 + variation) *
          (1 +
            (changePercent * i) /
              (30 * 100))
        ).toFixed(2)
      );
    });
  };

  const chartData = generateChartData();

  const stats = [
    {
      label: '24h High',
      value: `$${(price * 1.05).toFixed(2)}`,
    },
    {
      label: '24h Low',
      value: `$${(price * 0.95).toFixed(2)}`,
    },
    {
      label: 'Market Cap',
      value:
        type === 'crypto'
          ? '$1.2T'
          : '$2.8T',
    },
    {
      label: 'Volume',
      value: '$45.2B',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <ArrowLeft
            size={24}
            color="#111827"
          />

          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* ASSET INFO */}
        <View style={styles.assetInfo}>
          <View style={styles.assetRow}>
            <Text style={styles.symbol}>
              {symbol}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {type === 'crypto'
                  ? 'CRYPTO'
                  : 'STOCK'}
              </Text>
            </View>
          </View>

          <Text style={styles.assetName}>
            {name}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ${price.toFixed(2)}
            </Text>

            <View
              style={[
                styles.changeContainer,
                {
                  backgroundColor:
                    isPositive
                      ? '#dcfce7'
                      : '#fee2e2',
                },
              ]}
            >
              {isPositive ? (
                <TrendingUp
                  size={18}
                  color="#16a34a"
                />
              ) : (
                <TrendingDown
                  size={18}
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
                {changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        {/* CHART */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Clock
              size={18}
              color="#6b7280"
            />

            <Text style={styles.chartTitle}>
              30 Day Price History
            </Text>
          </View>

          <LineChart
            data={{
              labels: [
                '1',
                '5',
                '10',
                '15',
                '20',
                '25',
                '30',
              ],
              datasets: [
                {
                  data: chartData,
                },
              ],
            }}
            width={screenWidth - 40}
            height={240}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            bezier
            chartConfig={{
              backgroundGradientFrom:
                '#ffffff',

              backgroundGradientTo:
                '#ffffff',

              decimalPlaces: 2,

              color: (opacity = 1) =>
                isPositive
                  ? `rgba(16,185,129,${opacity})`
                  : `rgba(239,68,68,${opacity})`,

              labelColor: (
                opacity = 1
              ) =>
                `rgba(107,114,128,${opacity})`,
            }}
            style={styles.chart}
          />
        </View>

        {/* STATS */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={styles.statCard}
            >
              <Text style={styles.statLabel}>
                {stat.label}
              </Text>

              <Text style={styles.statValue}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.buyButton}
          >
            <Text style={styles.actionText}>
              Buy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sellButton}
          >
            <Text style={styles.actionText}>
              Sell
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  header: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },

  content: {
    padding: 16,
  },

  assetInfo: {
    marginBottom: 24,
  },

  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  symbol: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 10,
  },

  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4b5563',
  },

  assetName: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 18,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 12,
  },

  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 5,
  },

  changeText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },

  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingTop: 18,
    marginBottom: 24,
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },

  chart: {
    borderRadius: 20,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  buyButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 8,
  },

  sellButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginLeft: 8,
  },

  actionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});