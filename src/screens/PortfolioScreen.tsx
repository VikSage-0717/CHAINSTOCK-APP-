import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Wallet, TrendingUp } from 'lucide-react-native';
import { PieChart } from 'react-native-svg-charts';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PortfolioScreen() {
  const portfolioData = [
    { name: 'Bitcoin', value: 45000, percentage: 40, color: '#f7931a' },
    { name: 'Ethereum', value: 28000, percentage: 25, color: '#627eea' },
    { name: 'Stocks', value: 22000, percentage: 20, color: '#10b981' },
    { name: 'Altcoins', value: 11000, percentage: 10, color: '#8b5cf6' },
    { name: 'Cash', value: 5600, percentage: 5, color: '#6b7280' },
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
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

  const pieData = portfolioData.map(item => ({
    value: item.value,
    svg: {
      fill: item.color,
    },
    key: item.name,
  }));

  const HoldingCard = ({ holding }: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 2,
            }}
          >
            {holding.symbol}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#6b7280',
            }}
          >
            {holding.amount} {holding.symbol}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 2,
            }}
          >
            ${holding.value.toLocaleString()}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: holding.isPositive ? '#10b981' : '#ef4444',
            }}
          >
            {holding.isPositive ? '+' : ''}{holding.change}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#ffffff',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            gap: 8,
          }}
        >
          <Wallet size={32} color="#16a34a" />
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              Portfolio
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: '#6b7280',
          }}
        >
          Track your investments
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        {/* Total Value Card */}
        <View
          style={{
            backgroundColor: 'linear-gradient(to right, #16a34a, #059669)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View
            style={{
              backgroundColor: '#16a34a',
              borderRadius: 12,
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: 4,
              }}
            >
              Total Portfolio Value
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: 12,
              }}
            >
              ${totalValue.toLocaleString()}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignSelf: 'flex-start',
                gap: 8,
              }}
            >
              <TrendingUp size={18} color="#ffffff" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#ffffff',
                }}
              >
                +${totalGain.toLocaleString()} ({totalGainPercent}%)
              </Text>
            </View>
          </View>
        </View>

        {/* Allocation Chart */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 16,
            }}
          >
            Asset Allocation
          </Text>
          <View
            style={{
              height: 240,
              marginBottom: 16,
            }}
          >
            <PieChart data={pieData} />
          </View>

          {/* Legend */}
          <View style={{ gap: 12 }}>
            {portfolioData.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      backgroundColor: item.color,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#4b5563',
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: '#111827',
                    }}
                  >
                    ${item.value.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    {item.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Holdings */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 12,
            }}
          >
            Your Holdings
          </Text>
          {holdings.map((holding, index) => (
            <HoldingCard key={index} holding={holding} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
