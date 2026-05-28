import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';

import {
  RefreshCw,
  Search,
} from 'lucide-react-native';

import {
  LineChart,
} from 'react-native-chart-kit';

import MarketCard from './MarketCard';
import {
  getDashboardAssets,
  getAssetPrediction,
} from '../utils/api';

const screenWidth = Dimensions.get('window').width;

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

interface Props {
  onAssetClick: (asset: Asset) => void;
}

export default function Dashboard({
  onAssetClick,
}: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [devRunning, setDevRunning] = useState(false);

  // Generate mock assets
  const generateMockData = (): Asset[] => {
    const baseAssets = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        base: 67000,
        type: 'crypto' as const,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        base: 3200,
        type: 'crypto' as const,
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        base: 178,
        type: 'stock' as const,
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        base: 142,
        type: 'stock' as const,
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        base: 248,
        type: 'stock' as const,
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        base: 418,
        type: 'stock' as const,
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        base: 145,
        type: 'crypto' as const,
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        base: 186,
        type: 'stock' as const,
      },
    ];

    return baseAssets.map((asset) => {
      const randomChange =
        (Math.random() - 0.5) * 10;

      const changePercent = randomChange;

      const price =
        asset.base * (1 + changePercent / 100);

      return {
        symbol: asset.symbol,
        name: asset.name,
        type: asset.type,
        price: Number(price.toFixed(2)),
        change: Number(
          (price - asset.base).toFixed(2)
        ),
        changePercent: Number(
          changePercent.toFixed(2)
        ),
      };
    });
  };

  useEffect(() => {
    setAssets(generateMockData());

    const interval = setInterval(() => {
      setAssets(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setAssets(generateMockData());

    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const runDevPredictions = async () => {
    try {
      setDevRunning(true);

      const apiAssets =
        await getDashboardAssets();

      const targets =
        (apiAssets || []).slice(0, 5);

      for (const t of targets) {
        try {
          const pred =
            await getAssetPrediction(t.symbol);

          console.log(
            'Prediction:',
            t.symbol,
            pred
          );
        } catch (err) {
          console.log(err);
        }
      }

      Alert.alert(
        'Success',
        'Predictions completed'
      );
    } catch (err: any) {
      Alert.alert(
        'Error',
        err?.message || 'Something went wrong'
      );
    } finally {
      setDevRunning(false);
    }
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.symbol
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      asset.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Chart values
  const chartValues = Array.from(
    { length: 12 },
    () => 65000 + Math.random() * 4000
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            ChainStock
          </Text>

          <Text style={styles.subtitle}>
            Real-time Market Analysis
          </Text>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
          >
            {isRefreshing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <RefreshCw
                size={20}
                color="#fff"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Search
          size={20}
          color="#9ca3af"
          style={styles.searchIcon}
        />

        <TextInput
          placeholder="Search stocks or crypto..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* DEV BUTTON */}
      <TouchableOpacity
        style={styles.devButton}
        onPress={runDevPredictions}
        disabled={devRunning}
      >
        <Text style={styles.devButtonText}>
          {devRunning
            ? 'Running Predictions...'
            : 'Dev: Run Predictions'}
        </Text>
      </TouchableOpacity>

      {/* CHART */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Market Overview (24h)
        </Text>

        <LineChart
          data={{
            labels: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
            ],
            datasets: [
              {
                data: chartValues,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          bezier
          chartConfig={{
            backgroundGradientFrom: '#2563eb',
            backgroundGradientTo: '#7c3aed',
            decimalPlaces: 0,

            color: (opacity = 1) =>
              `rgba(255,255,255,${opacity})`,

            labelColor: (opacity = 1) =>
              `rgba(255,255,255,${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* ASSETS */}
      <View style={styles.assetsContainer}>
        <Text style={styles.assetsTitle}>
          Trending Assets
        </Text>

        {filteredAssets.map((asset) => (
          <MarketCard
            key={asset.symbol}
            {...asset}
            onClick={() =>
              onAssetClick(asset)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  headerButtons: {
    flexDirection: 'row',
  },

  refreshButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 50,
  },

  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#111827',
  },

  devButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  devButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  chartCard: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingTop: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },

  chartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },

  chart: {
    borderRadius: 20,
  },

  assetsContainer: {
    paddingBottom: 40,
  },

  assetsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 14,
  },
});