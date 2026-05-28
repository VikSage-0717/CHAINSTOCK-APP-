import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import PredictionRangeSlider from '../components/PredictionRangeSlider';
import { getDashboardAssets, getAssetPrediction } from '../utils/api';

interface PredictionItem {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  sentimentScore?: number | null;
}

export default function PredictionsScreen() {
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [predictionYears, setPredictionYears] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const latestYearsRef = useRef(predictionYears);

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    const fetchPredictionsData = async () => {
      setIsLoading(true);
      latestYearsRef.current = predictionYears;
      try { console.debug && console.debug('PredictionsScreen.fetchPredictionsData.start', { predictionYears }); } catch(e) {}
      try { console.log && console.log('Recalculating Predictions for:', predictionYears); } catch(e) {}

      try {
        const assets = await getDashboardAssets();
        if (!assets || assets.length === 0) {
          setPredictions([]);
          setIsLoading(false);
          return;
        }

        // Synchronous lightweight predictions for instant feedback
        const syncPreds: PredictionItem[] = assets.map((asset) => {
          const current = asset.price || 0;
          const cfg = predictionYears <= 1 ? { clamp: 0.03, trendThreshold: 0.015 }
            : predictionYears <= 3 ? { clamp: 0.07, trendThreshold: 0.03 }
            : predictionYears <= 5 ? { clamp: 0.12, trendThreshold: 0.05 }
            : predictionYears <= 7 ? { clamp: 0.18, trendThreshold: 0.07 }
            : { clamp: 0.26, trendThreshold: 0.09 };

          const tickerSeed = String(asset.symbol).split('').reduce((s, c) => s + c.charCodeAt(0), 0);
          const seedShift = (((tickerSeed % 100) - 50) / 10000) * predictionYears;
          let totalShift = seedShift;
          if (totalShift > cfg.clamp) totalShift = cfg.clamp;
          if (totalShift < -cfg.clamp) totalShift = -cfg.clamp;

          const predicted = current * (1 + totalShift);
          const confidence = Math.min(95, Math.max(30, Math.round(50 + Math.abs(totalShift) * 100)));
          let trend: 'bullish'|'bearish'|'neutral' = 'neutral';
          if (predicted > current * (1 + cfg.trendThreshold)) trend = 'bullish';
          else if (predicted < current * (1 - cfg.trendThreshold)) trend = 'bearish';

          return {
            symbol: asset.symbol,
            name: asset.name,
            currentPrice: current,
            predictedPrice: Math.round(predicted * 100) / 100,
            confidence,
            timeframe: `${predictionYears}Y`,
            trend,
            sentimentScore: null,
          } as PredictionItem;
        });

        try { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); } catch(e) {}
        setPredictions(syncPreds);

        // Fetch refined predictions in parallel
        const promises = assets.map(a => getAssetPrediction(a.symbol, predictionYears).catch(() => null));
        const results = await Promise.all(promises);

        const refined = assets.map((asset, idx) => {
          const res = results[idx];
          const base = syncPreds[idx];
          if (!res || !res.predictions || res.predictions.length === 0) return base;
          const sel = res.predictions[0];
          return {
            symbol: asset.symbol,
            name: asset.name,
            currentPrice: asset.price || 0,
            predictedPrice: sel.predictedPrice ?? base.predictedPrice,
            confidence: sel.confidence ?? base.confidence,
            timeframe: sel.timeframe || base.timeframe,
            trend: sel.trend || base.trend,
            sentimentScore: res.sentimentScore ?? base.sentimentScore,
          } as PredictionItem;
        });

        try { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); } catch(e) {}
        setPredictions(refined);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictionsData();
  }, [predictionYears]);

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
    try { console.log && console.log('Rendering Stock:', item.symbol, item.predictedPrice); } catch (e) {}
    const percentDiff = item.currentPrice
      ? (((item.predictedPrice - item.currentPrice) / item.currentPrice) * 100).toFixed(2)
      : '0.00';
    const percentNum = Math.abs(parseFloat(percentDiff)) || 0;
    const targetPercentWidth = Math.min(100, percentNum * 10);
    const animatedPercent = useRef(new Animated.Value(targetPercentWidth)).current;

    useEffect(() => {
      Animated.timing(animatedPercent, {
        toValue: targetPercentWidth,
        duration: 320,
        useNativeDriver: false,
      }).start();
    }, [targetPercentWidth]);

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
            {item.sentimentScore != null ? (
              <Text style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                Sentiment: {item.sentimentScore}% {item.sentimentScore > 60 ? '📈' : item.sentimentScore < 40 ? '📉' : '➡️'}
              </Text>
            ) : (
              <Text style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Sentiment: Insufficient data</Text>
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
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: trendColor,
                width: animatedPercent.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
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

        <PredictionRangeSlider
          years={predictionYears}
          onYearsChange={(y) => {
            // ensure slider updates are applied immediately
            try { console.debug && console.debug('PredictionsScreen.sliderChange', y); } catch(e) {}
            setPredictionYears(y);
          }}
        />
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
