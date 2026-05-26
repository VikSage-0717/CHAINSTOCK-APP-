import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Wallet, Plus, TrendingUp, X } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getHoldings, sellHolding } from '../utils/portfolio';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
}

export default function PortfolioScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [holdings, setHoldings] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sellModalVisible, setSellModalVisible] = React.useState(false);
  const [selectedForSell, setSelectedForSell] = React.useState<any>(null);
  const [sellAmount, setSellAmount] = React.useState('');

  const totalValue = holdings.reduce((sum, item) => sum + (item.amount * item.price), 0);
  const totalGain = 0;
  const totalGainPercent = 0;
  const isEmpty = !isLoading && holdings.length === 0;

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadHoldings = async () => {
        try {
          const currentHoldings = await getHoldings();
          if (isActive) {
            setHoldings(currentHoldings);
          }
        } catch (error) {
          console.error('Error loading portfolio:', error);
          if (isActive) {
            setHoldings([]);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadHoldings();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleSellPress = (holding: any) => {
    setSelectedForSell(holding);
    setSellAmount('');
    setSellModalVisible(true);
  };

  const handleConfirmSell = async () => {
    if (!selectedForSell || !sellAmount) return;

    const amount = parseFloat(sellAmount);
    if (isNaN(amount) || amount <= 0 || amount > selectedForSell.amount) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to sell');
      return;
    }

    try {
      const success = await sellHolding(selectedForSell.symbol, amount);
      if (success) {
        setSellModalVisible(false);
        setSelectedForSell(null);
        setSellAmount('');
        
        // Reload holdings
        const updated = await getHoldings();
        setHoldings(updated);
        
        Alert.alert('Success', `Sold ${amount} ${selectedForSell.symbol} shares`);
      } else {
        Alert.alert('Error', 'Could not complete the sale');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sell shares');
      console.error('Sell error:', error);
    }
  };

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

        <View style={{ alignItems: 'flex-end', marginRight: 12 }}>
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

        <TouchableOpacity
          onPress={() => handleSellPress(holding)}
          style={{
            backgroundColor: '#fee2e2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#dc2626',
            }}
          >
            Sell
          </Text>
        </TouchableOpacity>
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
          {isLoading ? 'Loading your portfolio...' : isEmpty ? 'Your portfolio is empty' : 'Track your investments'}
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

        {isLoading ? (
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
              Loading your portfolio
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#9ca3af',
                textAlign: 'center',
              }}
            >
              One moment while we refresh your holdings.
            </Text>
          </View>
        ) : isEmpty ? (
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
                onPress={() => navigation.navigate('Home')}
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
              onPress={() => navigation.navigate('Home')}
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

      {/* Sell Modal */}
      <Modal
        visible={sellModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSellModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '80%',
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                Sell {selectedForSell?.symbol}
              </Text>
              <TouchableOpacity onPress={() => setSellModalVisible(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Available Amount */}
            <View
              style={{
                backgroundColor: '#f3f4f6',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 4,
                }}
              >
                Available to Sell
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                {selectedForSell?.amount.toFixed(4)} {selectedForSell?.symbol}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginTop: 4,
                }}
              >
                Current Price: ${selectedForSell?.price.toFixed(2)}
              </Text>
            </View>

            {/* Amount Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: 8,
                }}
              >
                Amount to Sell
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  fontSize: 16,
                  color: '#111827',
                }}
                placeholder="Enter amount"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                value={sellAmount}
                onChangeText={setSellAmount}
              />
            </View>

            {/* Projected Proceeds */}
            {sellAmount && (
              <View
                style={{
                  backgroundColor: '#dcfce7',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: '#166534',
                    marginBottom: 4,
                  }}
                >
                  You will receive
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#166534',
                  }}
                >
                  ${((parseFloat(sellAmount) || 0) * (selectedForSell?.price || 0)).toFixed(2)}
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setSellModalVisible(false)}
                style={{
                  flex: 1,
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
                    color: '#6b7280',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmSell}
                style={{
                  flex: 1,
                  backgroundColor: '#dc2626',
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
                  Confirm Sell
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
