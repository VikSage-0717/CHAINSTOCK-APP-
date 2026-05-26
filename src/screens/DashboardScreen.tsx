import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshCw, Search } from 'lucide-react-native';
import { Asset } from '../utils/mockData';
import { getDashboardAssets, searchAssets, getAssetDetails } from '../utils/api';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
}

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchResults, setSearchResults] = useState<Asset[]>([]);

  const loadAssets = async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardAssets();
      if (data && data.length > 0) {
        setAssets(data);
      } else {
        setAssets([]);
      }
    } catch (error) {
      console.error('Error loading assets:', error);
      setAssets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();

    const interval = setInterval(() => {
      if (!searchQuery) {
        loadAssets();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const delayDebounceFn = setTimeout(async () => {
        setIsLoading(true);
        const results = await searchAssets(searchQuery);
        setSearchResults(results);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAssets();
    setIsRefreshing(false);
  };

  const handleAssetClick = async (asset: Asset) => {
    navigation.navigate('AssetDetail', {
      asset,
    });
  };

  const displayAssets = searchQuery.length > 1 ? searchResults : assets;

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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                {asset.symbol}
              </Text>
              <View
                style={{
                  backgroundColor: asset.type === 'crypto' ? '#fef3c7' : '#dbeafe',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '600',
                    color: asset.type === 'crypto' ? '#92400e' : '#0284c7',
                  }}
                >
                  {asset.type === 'crypto' ? 'CRYPTO' : 'STOCK'}
                </Text>
              </View>
            </View>
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
                backgroundColor: isPositive ? '#dcfce7' : '#fee2e2',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: isPositive ? '#166534' : '#991b1b',
                }}
              >
                {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor="#2563eb"
        />
      }
    >
      <View style={{ alignItems: 'center' }}>
        <Search size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#6b7280',
            marginBottom: 8,
          }}
        >
          {searchQuery ? 'No results found' : 'Loading assets...'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#9ca3af',
            textAlign: 'center',
          }}
        >
          {searchQuery
            ? `No assets match "${searchQuery}"`
            : 'Fetching real-time market data'}
        </Text>
      </View>
    </ScrollView>
  );

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
            disabled={isRefreshing}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#2563eb',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <RefreshCw size={20} color="#ffffff" />
            )}
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
      {isLoading && displayAssets.length === 0 ? (
        renderEmptyState()
      ) : displayAssets.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={displayAssets}
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
      )}
    </View>
  );
}
