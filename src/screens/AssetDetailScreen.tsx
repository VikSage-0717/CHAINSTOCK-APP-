import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import { Asset } from '../utils/mockData';
import { getAssetHistory, getAssetNews } from '../utils/api';
import { addHolding } from '../utils/portfolio';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface RouteParams {
  asset: Asset;
}

export default function AssetDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { asset } = route.params as RouteParams;

  const isPositive = asset.changePercent >= 0;
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [news, setNews] = React.useState<any[]>([]);
  const [overallSentiment, setOverallSentiment] = React.useState('');
  const [isBuying, setIsBuying] = React.useState(false);

  const handleBuy = async () => {
    setIsBuying(true);
    try {
      await addHolding({
        symbol: asset.symbol,
        amount: 1,
        price: asset.price || 0,
        changePercent: asset.changePercent || 0,
      });
      navigation.navigate('Portfolio');
    } catch (err) {
      console.error('Error adding to portfolio:', err);
    } finally {
      setIsBuying(false);
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      const history = await getAssetHistory(asset.symbol);
      if (history && history.length > 0) {
        setChartData(history);
      }
      const newsData = await getAssetNews(asset.symbol);
      if (newsData && newsData.articles) {
        setNews(newsData.articles);
        setOverallSentiment(newsData.overall_sentiment);
      }
    };
    loadData();
  }, [asset.symbol]);

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

          <VictoryChart theme={VictoryTheme.material}>
            <VictoryAxis dependentAxis />
            <VictoryAxis />

            <VictoryLine
              data={chartData.map((item, index) => ({
                x: index,
                y: item.price,
              }))}
              style={{
                data: {
                  stroke: isPositive ? '#10b981' : '#ef4444',
                  strokeWidth: 2,
                },
              }}
            />
          </VictoryChart>
        </View>

        {/* News Section */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#111827',
              }}
            >
              Market Events & News
            </Text>
            <View
              style={{
                backgroundColor:
                  overallSentiment === 'Positive'
                    ? '#dcfce7'
                    : overallSentiment === 'Negative'
                      ? '#fee2e2'
                      : '#f3f4f6',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color:
                    overallSentiment === 'Positive'
                      ? '#166534'
                      : overallSentiment === 'Negative'
                        ? '#991b1b'
                        : '#6b7280',
                }}
              >
                {overallSentiment}
              </Text>
            </View>
          </View>
          {news.length > 0 ? (
            <View style={{ gap: 12 }}>
              {news.map((article, index) => (
                <View
                  key={index}
                  style={{
                    borderBottomWidth: index < news.length - 1 ? 1 : 0,
                    borderBottomColor: '#f3f4f6',
                    paddingBottom: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 4,
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#111827',
                        flex: 1,
                      }}
                    >
                      {article.title}
                    </Text>
                    <View
                      style={{
                        backgroundColor:
                          article.sentiment === 'positive'
                            ? '#dcfce7'
                            : article.sentiment === 'negative'
                              ? '#fee2e2'
                              : '#f3f4f6',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '600',
                          color:
                            article.sentiment === 'positive'
                              ? '#166534'
                              : article.sentiment === 'negative'
                                ? '#991b1b'
                                : '#6b7280',
                        }}
                      >
                        {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#9ca3af',
                      marginBottom: 4,
                    }}
                  >
                    {article.source}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#6b7280',
                    }}
                  >
                    Score: {(article.score * 100).toFixed(0)}% | {new Date(article.date).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#6b7280',
                  textAlign: 'center',
                }}
              >
                No recent news available
              </Text>
            </View>
          )}
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

        {/* Action Buttons - single Buy button (adds to portfolio) */}
        <View
          style={{
            gap: 12,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleBuy}
            disabled={isBuying}
            style={{
              backgroundColor: '#2563eb',
              opacity: isBuying ? 0.7 : 1,
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
              {isBuying ? `Adding ${asset.symbol}...` : `Buy ${asset.symbol}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
