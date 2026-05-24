import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Wallet, Plus, TrendingUp } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
}

export default function PortfolioScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [holdings, setHoldings] = useState<any[]>([]);

  const totalValue = holdings.reduce((sum, item) => sum + (item.amount * item.price), 0);
  const totalGain = 0;
  const totalGainPercent = 0;

  const isEmpty = holdings.length === 0;

  const HoldingCard = ({ holding }: any) => {
    const value = holding.amount * holding.price;
    const changeAmount = value * (holding.changePercent / 100);

    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 4,
            }}
          >
            {holding.symbol}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#6b7280',
              marginBottom: 4,
            }}
          >
            {holding.amount.toFixed(4)} {holding.symbol}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#6b7280',
            }}
          >
            @ ${holding.price.toFixed(2)}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 4,
            }}
          >
            ${value.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: holding.changePercent >= 0 ? '#10b981' : '#ef4444',
            }}
          >
            {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
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
          {isEmpty ? 'Your portfolio is empty' : 'Track your investments'}
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
            backgroundColor: '#16a34a',
            borderRadius: 12,
            paddingVertical: 20,
            paddingHorizontal: 16,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: 8,
            }}
          >
            Total Portfolio Value
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            ${totalValue.toFixed(2)}
          </Text>

          {!isEmpty && (
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
                +${totalGain.toFixed(2)} ({totalGainPercent}%)
              </Text>
            </View>
          )}
        </View>

        {isEmpty ? (
          <>
            {/* Empty State */}
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 12,
                padding: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderStyle: 'dashed',
              }}
            >
              <Wallet size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#6b7280',
                  marginBottom: 8,
                  textAlign: 'center',
                }}
              >
                Your portfolio is empty
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  marginBottom: 24,
                  textAlign: 'center',
                }}
              >
                Start by buying your first asset from the market
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={{
                  backgroundColor: '#2563eb',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Plus size={20} color="#ffffff" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}
                >
                  Browse Assets
                </Text>
              </TouchableOpacity>
            </View>

            {/* Getting Started Section */}
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
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: 16,
                }}
              >
                How to Get Started
              </Text>
              {[
                { num: '1', text: 'Go to Dashboard' },
                { num: '2', text: 'Select an asset to view details' },
                { num: '3', text: 'Click "Buy" to add to your portfolio' },
                { num: '4', text: 'Track your investments here' },
              ].map((step, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingVertical: 12,
                    borderBottomWidth: index < 3 ? 1 : 0,
                    borderBottomColor: '#f3f4f6',
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: '#dbeafe',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#0284c7',
                      }}
                    >
                      {step.num}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#4b5563',
                    }}
                  >
                    {step.text}
                  </Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Holdings List */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
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

            {/* Action Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
              style={{
                backgroundColor: '#2563eb',
                borderRadius: 8,
                paddingVertical: 14,
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Plus size={20} color="#ffffff" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}
                >
                  Buy More Assets
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}
