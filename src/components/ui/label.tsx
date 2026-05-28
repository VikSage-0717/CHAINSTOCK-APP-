import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface LabelProps {
  children?: React.ReactNode;
}

function Label({ children }: LabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1f2937',
  },
});

export { Label };
