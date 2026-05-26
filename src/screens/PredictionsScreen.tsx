import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
// Use simple emoji for icons to avoid external icon package issues on web
import { getDashboardAssets, getAssetPrediction } from '../utils/api';

interface PredictionItem {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  sentimentScore?: number;
}

export default function PredictionsScreen() {
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);

  const timeframes = ['24h', '7d', '30d'];

  useEffect(() => {
    const fetchPredictionsData = async () => {
      setIsLoading(true);
      try {
        const assets = await getDashboardAssets();
        
        if (!assets || assets.length === 0) {
          setPredictions([]);
          setIsLoading(false);
          return;
        }

        const newPredictions: PredictionItem[] = [];
        // Get first 10 assets instead of 6 to show more variety
        const topAssets = assets.slice(0, 10);

        for (const asset of topAssets) {
          try {
            const pred = await getAssetPrediction(asset.symbol);
            if (pred && pred.predictions && pred.predictions.length > 0) {
              const selectedPred = pred.predictions.find(
                (p: any) => p.timeframe === selectedTimeframe
              );
              if (selectedPred) {
                newPredictions.push({
                  symbol: asset.symbol,
                  name: asset.name,
                  currentPrice: asset.price || 0,
                  predictedPrice: selectedPred.predictedPrice || asset.price,
                  confidence: selectedPred.confidence || 65,
                  timeframe: selectedTimeframe,
                  trend: selectedPred.trend || 'neutral',
                  sentimentScore: pred.sentimentScore,
                });
              }
            }
          } catch (assetError) {
            console.error(`Error fetching prediction for ${asset.symbol}:`, assetError);
            // Continue with next asset
          }
        }
        setPredictions(newPredictions);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictionsData();
  }, [selectedTimeframe]);

  const getTrendColor = (trend: 'bullish' | 'bearish' | 'neutral') => {
    switch (trend) {
      case 'bullish':
        return '#10b981';
      case 'bearish':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTrendBgColor = (trend: 'bullish' | 'bearish' | 'neutral') => {
    switch (trend) {
      case 'bullish':
        return '#dcfce7';
      case 'bearish':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const PredictionCard = ({ item }: { item: PredictionItem }) => {
    const trendColor = getTrendColor(item.trend);
    const trendBgColor = getTrendBgColor(item.trend);
    const percentDiff = (
      ((item.predictedPrice - item.currentPrice) / item.currentPrice) *
      100
    ).toFixed(2);

    return (
      <View
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
            alignItems: 'flex-start',
            marginBottom: 12,
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
              {item.symbol}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#6b7280',
              }}
            >
              {item.name}
            </Text>
            {item.sentimentScore !== undefined && (
              <Text
                style={{
                  fontSize: 11,
                  color: '#9ca3af',
                  marginTop: 4,
                }}
              >
                Sentiment: {item.sentimentScore}% {item.sentimentScore > 60 ? '📈' : item.sentimentScore < 40 ? '📉' : '➡️'}
              </Text>
            )}
          </View>
          <View
            style={{
              backgroundColor: trendBgColor,
              paddingHorizontal: 8,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: trendColor,
                textTransform: 'capitalize',
              }}
            >
              {item.trend}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
                color: '#6b7280',
                marginBottom: 4,
              }}
            >
              Current Price
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#111827',
              }}
            >
              ${item.currentPrice.toFixed(2)}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: 12,
                color: '#6b7280',
                marginBottom: 4,
              }}
            >
              Predicted Price
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: trendColor,
              }}
            >
              ${item.predictedPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: '#f3f4f6',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#6b7280',
              }}
            >
              Expected Change
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: trendColor,
              }}
            >
              {percentDiff}%
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 6,
              backgroundColor: '#f3f4f6',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${Math.min(100, Math.abs(parseFloat(percentDiff)) * 10)}%`,
                backgroundColor: trendColor,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#f3f4f6',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#6b7280',
            }}
          >
            Prediction Confidence
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#111827',
            }}
          >
            {Math.round(item.confidence)}%
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontSize: 48, marginBottom: 16 }}>✨</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#6b7280',
          marginBottom: 8,
        }}
      >
        {isLoading ? 'Loading predictions...' : 'No predictions available'}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#9ca3af',
          textAlign: 'center',
        }}
      >
        {isLoading
          ? 'Analyzing market data with our ML models'
          : 'Check back later for market forecasts'}
      </Text>
    </View>
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
            alignItems: 'center',
            marginBottom: 8,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 32, marginRight: 8 }}>🧠</Text>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              AI Predictions
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: '#6b7280',
            marginBottom: 16,
          }}
        >
          Machine learning powered market forecasts
        </Text>

        {/* Info Banner */}
        <View
          style={{
            backgroundColor: '#faf5ff',
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 20, marginRight: 8 }}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: '#111827',
                marginBottom: 4,
              }}
            >
              How it works
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#4b5563',
              }}
            >
              Our ML models analyze historical data, market sentiment, and
              volumes to predict price movements.
            </Text>
          </View>
        </View>

        {/* Timeframe Selector */}
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {timeframes.map((tf) => (
            <TouchableOpacity
              key={tf}
              onPress={() => setSelectedTimeframe(tf)}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                backgroundColor:
                  selectedTimeframe === tf ? '#2563eb' : '#f3f4f6',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: selectedTimeframe === tf ? '#ffffff' : '#4b5563',
                  textAlign: 'center',
                }}
              >
                {tf}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Predictions List */}
      {isLoading && predictions.length === 0 ? (
        renderEmptyState()
      ) : predictions.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={predictions}
          renderItem={({ item }) => <PredictionCard item={item} />}
          keyExtractor={(item) => `${item.symbol}-${item.timeframe}`}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
          scrollEnabled={true}
        />
      )}
    </View>
  );
}
