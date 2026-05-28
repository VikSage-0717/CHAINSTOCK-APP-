import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface AlertTitleProps {
  children?: React.ReactNode;
}

interface AlertDescriptionProps {
  children?: React.ReactNode;
}

function Alert({ variant = 'default', children, style }: AlertProps) {
  const alertStyle =
    variant === 'destructive' ? styles.destructive : styles.default;
  return (
    <View style={[alertStyle, style]}>
      {children}
    </View>
  );
}

function AlertTitle({ children }: AlertTitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

function AlertDescription({ children }: AlertDescriptionProps) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9fafb',
  },
  destructive: {
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fef2f2',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1f2937',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
});

export { Alert, AlertTitle, AlertDescription };
