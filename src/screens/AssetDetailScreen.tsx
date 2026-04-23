import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { generateChartData, Asset } from '../utils/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface RouteParams {
  asset: Asset;
}

export default function AssetDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { asset } = route.params as RouteParams;

  const isPositive = asset.changePercent >= 0;
  const chartData = useMemo(
    () => generateChartData(asset.price, asset.changePercent, 30),
    [asset.price, asset.changePercent]
  );

  const stats = [
    { label: '24h High', value: `$${(asset.price * 1.05).toFixed(2)}` },
    { label: '24h Low', value: `$${(asset.price * 0.95).toFixed(2)}` },
    { label: 'Market Cap', value: asset.type === 'crypto' ? '$1.2T' : '$2.8T' },
    { label: 'Volume', value: '$45.2B' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#ffffff',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ArrowLeft size={24} color="#374151" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      >
        {/* Asset Info */}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              {asset.symbol}
            </Text>
            <View
              style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#4b5563',
                }}
              >
                {asset.type === 'crypto' ? 'CRYPTO' : 'STOCK'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: '#6b7280',
              marginBottom: 16,
            }}
          >
            {asset.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              ${asset.price.toFixed(2)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  backgroundColor: isPositive ? '#dcfce7' : '#fee2e2',
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: isPositive ? '#166534' : '#991b1b',
                  }}
                >
                  {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                }}
              >
                ${Math.abs(asset.change).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            height: 240,
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
            30-Day Performance
          </Text>
          <View style={{ flex: 1 }}>
            <LineChart
              style={{ flex: 1 }}
              data={chartData}
              svg={{
                stroke: isPositive ? '#10b981' : '#ef4444',
                strokeWidth: 2,
              }}
              contentInset={{ top: 10, bottom: 10, left: 0, right: 0 }}
              xAccessor={({ index }) => index}
              yAccessor={({ item }) => item.price}
            >
              <Grid />
            </LineChart>
          </View>
        </View>

        {/* Stats Grid */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
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
            Market Stats
          </Text>
          <View
            style={{
              gap: 12,
            }}
          >
            {stats.map((stat, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  borderBottomWidth: index < stats.length - 1 ? 1 : 0,
                  borderBottomColor: '#f3f4f6',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6b7280',
                  }}
                >
                  {stat.label}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#111827',
                  }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View
          style={{
            gap: 12,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#2563eb',
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#ffffff',
              }}
            >
              Buy {asset.symbol}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#111827',
              }}
            >
              Add to Portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
