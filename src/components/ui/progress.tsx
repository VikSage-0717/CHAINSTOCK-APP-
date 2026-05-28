import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
  value?: number;
  max?: number;
}

function Progress({ value = 0, max = 100 }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          {
            width: `${percentage}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  bar: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
});

export { Progress };
