import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';

export default function PortfolioScreen() {
  const portfolioData = [
    {
      name: 'Bitcoin',
      value: 45000,
      percentage: 40,
      color: '#f7931a',
    },

    {
      name: 'Ethereum',
      value: 28000,
      percentage: 25,
      color: '#627eea',
    },

    {
      name: 'Stocks',
      value: 22000,
      percentage: 20,
      color: '#10b981',
    },

    {
      name: 'Altcoins',
      value: 11000,
      percentage: 10,
      color: '#8b5cf6',
    },

    {
      name: 'Cash',
      value: 5600,
      percentage: 5,
      color: '#6b7280',
    },
  ];

  const totalValue =
    portfolioData.reduce(
      (sum, item) => sum + item.value,
      0
    );

  const totalGain = 15420;

  const totalGainPercent = 15.8;

  const holdings = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.67,
      value: 45000,
      change: 12.4,
      isPositive: true,
    },

    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 8.75,
      value: 28000,
      change: 8.2,
      isPositive: true,
    },

    {
      symbol: 'AAPL',
      name: 'Apple',
      amount: 125,
      value: 22000,
      change: -2.3,
      isPositive: false,
    },

    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 75,
      value: 11000,
      change: 18.7,
      isPositive: true,
    },
  ];

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
          <Wallet
            size={32}
            color="#16a34a"
          />

          <Text style={styles.title}>
            Portfolio
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Track your investments
        </Text>
      </View>

      {/* TOTAL VALUE CARD */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Total Portfolio Value
        </Text>

        <Text style={styles.totalValue}>
          $
          {totalValue.toLocaleString()}
        </Text>

        <View style={styles.gainBox}>
          <TrendingUp
            size={18}
            color="#ffffff"
          />

          <Text style={styles.gainText}>
            +$
            {totalGain.toLocaleString()}
            {'  '}
            ({totalGainPercent}%)
          </Text>
        </View>
      </View>

      {/* ALLOCATION */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Asset Allocation
        </Text>

        {portfolioData.map(
          (item, index) => (
            <View
              key={index}
              style={styles.allocationRow}
            >
              <View
                style={
                  styles.allocationLeft
                }
              >
                <View
                  style={[
                    styles.colorDot,
                    {
                      backgroundColor:
                        item.color,
                    },
                  ]}
                />

                <Text
                  style={
                    styles.assetName
                  }
                >
                  {item.name}
                </Text>
              </View>

              <View
                style={
                  styles.allocationRight
                }
              >
                <Text
                  style={
                    styles.assetPercent
                  }
                >
                  {item.percentage}%
                </Text>

                <Text
                  style={
                    styles.assetValue
                  }
                >
                  $
                  {item.value.toLocaleString()}
                </Text>
              </View>
            </View>
          )
        )}
      </View>

      {/* HOLDINGS */}
      <View style={styles.holdingsSection}>
        <Text style={styles.sectionTitle}>
          Your Holdings
        </Text>

        {holdings.map(
          (holding, index) => (
            <View
              key={index}
              style={styles.holdingCard}
            >
              <View
                style={
                  styles.holdingTop
                }
              >
                <View>
                  <Text
                    style={
                      styles.holdingSymbol
                    }
                  >
                    {holding.symbol}
                  </Text>

                  <Text
                    style={
                      styles.holdingName
                    }
                  >
                    {holding.name}
                  </Text>
                </View>

                <View
                  style={
                    styles.changeContainer
                  }
                >
                  {holding.isPositive ? (
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
                        color:
                          holding.isPositive
                            ? '#16a34a'
                            : '#dc2626',
                      },
                    ]}
                  >
                    {holding.isPositive
                      ? '+'
                      : ''}
                    {holding.change}%
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.holdingBottom
                }
              >
                <Text
                  style={
                    styles.unitsText
                  }
                >
                  {holding.amount} units
                </Text>

                <Text
                  style={
                    styles.valueText
                  }
                >
                  $
                  {holding.value.toLocaleString()}
                </Text>
              </View>
            </View>
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

  totalCard: {
    backgroundColor: '#16a34a',
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
  },

  totalLabel: {
    color: '#dcfce7',
    fontSize: 14,
    marginBottom: 6,
  },

  totalValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  gainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

  gainText: {
    color: '#ffffff',
    fontWeight: '700',
    marginLeft: 8,
  },

  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },

  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  allocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  allocationRight: {
    alignItems: 'flex-end',
  },

  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },

  assetName: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },

  assetPercent: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  assetValue: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  holdingsSection: {
    marginBottom: 40,
  },

  holdingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  holdingTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  holdingSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  holdingName: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
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

  holdingBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  unitsText: {
    fontSize: 14,
    color: '#6b7280',
  },

  valueText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
});