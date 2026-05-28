import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  style?: ViewStyle;
}

function Skeleton({ style }: SkeletonProps) {
  return <View style={[styles.skeleton, style]} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    height: 16,
    marginVertical: 8,
  },
});

export { Skeleton };
