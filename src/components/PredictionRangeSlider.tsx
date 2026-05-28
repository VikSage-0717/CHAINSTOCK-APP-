import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';

interface PredictionRangeSliderProps {
  years: number;
  onYearsChange: (years: number) => void;
}

export default function PredictionRangeSlider({
  years,
  onYearsChange,
}: PredictionRangeSliderProps) {
  const [internalYears, setInternalYears] = useState(years);
  const { width } = useWindowDimensions();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(pulse, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [internalYears, pulse]);

  const sliderWidth = Math.max(140, Math.round((width - 32) * 0.78));

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const markerItems = [
    { label: '1Y', value: 1 },
    { label: '3Y', value: 3 },
    { label: '5Y', value: 5 },
    { label: '7Y', value: 7 },
    { label: '10Y', value: 10 },
  ];

  useEffect(() => {
    setInternalYears(years);
  }, [years]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>AI Prediction</Text>
          <Text style={styles.subtitle}>Prediction horizon</Text>
        </View>
      </View>
      <View style={styles.badgeWrap} pointerEvents="none">
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Premium</Text>
        </View>
      </View>

      <Animated.View style={[styles.valueWrapper, { transform: [{ scale: pulseScale }] }]}> 
        <Text style={styles.valueLabel}>{years}</Text>
        <Text style={styles.valueSuffix}>yr</Text>
      </Animated.View>

      <View style={[styles.sliderShell, { width: sliderWidth }]}> 
        <View style={styles.trackBackground} />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={internalYears}
          minimumTrackTintColor="#8b5cf6"
          maximumTrackTintColor="#dbeafe"
          thumbTintColor="#a855f7"
          onValueChange={(value) => {
            // Visual update
            setInternalYears(value);
            // Temporary console log for debugging in browser/Metro
            try { console.log && console.log('Slider Changed:', value); } catch (e) {}
            try { console.debug && console.debug('PredictionRangeSlider.onValueChange', value); } catch (e) {}
            onYearsChange(value);
          }}
          thumbTouchSize={{ width: 44, height: 44 }}
          accessibilityRole="adjustable"
        />
      </View>

      <View style={styles.markerRow}>
        {markerItems.map((item) => (
          <View key={item.value} style={styles.markerItem}>
            <Text
              style={[
                styles.markerLabel,
                item.value === internalYears && styles.markerLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.helperText}>
        Longer forecast horizons create wider AI prediction ranges.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 6,
    borderWidth: 1,
    borderColor: 'rgba(167,85,247,0.1)',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  titleGroup: {
    flex: 1,
    paddingRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.06,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 14,
  },
  badgeWrap: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  badge: {
    backgroundColor: '#f3e8ff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.18)',
  },
  badgeText: {
    color: '#7c3aed',
    fontSize: 9,
    fontWeight: '700',
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  valueLabel: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    lineHeight: 26,
  },
  valueSuffix: {
    fontSize: 11,
    color: '#6b7280',
    marginLeft: 6,
    marginBottom: 2,
    fontWeight: '600',
  },
  sliderShell: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 0,
    marginBottom: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(59,130,246,0.06)',
    overflow: 'hidden',
  },
  trackBackground: {
    position: 'absolute',
    left: 6,
    right: 6,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(59,130,246,0.12)',
  },
  slider: {
    width: '100%',
    height: 14,
  },
  markerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  markerItem: {
    alignItems: 'center',
    flex: 1,
  },
  markerLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontWeight: '700',
  },
  markerLabelActive: {
    color: '#4338ca',
  },
  helperText: {
    color: '#6b7280',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    opacity: 0.95,
  },
});
