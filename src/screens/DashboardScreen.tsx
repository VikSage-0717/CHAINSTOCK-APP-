import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshCw, Search } from 'lucide-react-native';
import { generateMockAssets, generateChartData, Asset } from '../utils/mockData';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
}

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAssets(generateMockAssets());
    setIsLoading(false);

    const interval = setInterval(() => {
      setAssets(generateMockAssets());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setAssets(generateMockAssets());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleAssetClick = (asset: Asset) => {
    navigation.navigate('AssetDetail', {
      asset,
    });
  };

  const filteredAssets = assets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const AssetCard = ({ asset }: { asset: Asset }) => {
    const isPositive = asset.changePercent >= 0;

    return (
      <TouchableOpacity
        onPress={() => handleAssetClick(asset)}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#e5e7eb',
        }}
      >
        <View
          style={{
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
              {asset.symbol}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6b7280',
              }}
            >
              {asset.name}
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
              ${asset.price.toFixed(2)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: isPositive ? '#10b981' : '#ef4444',
                }}
              >
                {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isPositive ? '#10b981' : '#ef4444',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              ChainStock
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#6b7280',
              }}
            >
              Real-time Market Analysis
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleRefresh}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#2563eb',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RefreshCw size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 40,
          }}
        >
          <Search size={18} color="#9ca3af" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: '#111827',
            }}
            placeholder="Search stocks or crypto..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Assets List */}
      <FlatList
        data={filteredAssets}
        renderItem={({ item }) => <AssetCard asset={item} />}
        keyExtractor={(item) => item.symbol}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#2563eb"
          />
        }
      />
    </View>
  );
}
