import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  onValueChange,
  disabled = false,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(min);
  const [width, setWidth] = useState(0);
  const isControlled = controlledValue !== undefined;
  const current = isControlled ? controlledValue! : internalValue;

  const handlePress = (evt: any) => {
    if (disabled || width === 0) return;
    const locationX = evt.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, locationX / width));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const newValue = Math.max(min, Math.min(max, stepped));
    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const percentage = ((current - min) / (max - min)) * 100;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        onLayout={onLayout}
        style={styles.trackWrapper}
        disabled={disabled}
      >
        <View style={styles.track} />
        <View style={[styles.filled, { width: `${percentage}%` }]} />
      </TouchableOpacity>
      <Text style={styles.valueText}>{current}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  trackWrapper: {
    height: 32,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  filled: {
    height: 6,
    backgroundColor: '#2563eb',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
  },
  valueText: {
    marginTop: 8,
    fontSize: 12,
    color: '#374151',
  },
});

export { Slider };
