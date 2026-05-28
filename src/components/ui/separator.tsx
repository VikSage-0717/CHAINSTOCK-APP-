import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

function Separator({ orientation = 'horizontal', style }: SeparatorProps) {
  const separatorStyle =
    orientation === 'horizontal' ? styles.horizontal : styles.vertical;
  return <View style={[separatorStyle, style]} />;
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  vertical: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 12,
  },
});

export { Separator };
