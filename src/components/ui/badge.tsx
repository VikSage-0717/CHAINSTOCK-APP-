import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function Badge({
  children,
  variant = 'default',
  style,
  textStyle,
}: BadgeProps) {
  const badgeStyle = [styles.badge, styles[`variant-${variant}`], style];
  const textColorStyle = [styles.text, styles[`text-${variant}`], textStyle];

  return (
    <View style={badgeStyle}>
      <Text style={textColorStyle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  'variant-default': {
    backgroundColor: '#2563eb',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  'variant-secondary': {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  'variant-destructive': {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  'variant-outline': {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  'text-default': {
    color: '#ffffff',
  },
  'text-secondary': {
    color: '#1f2937',
  },
  'text-destructive': {
    color: '#ffffff',
  },
  'text-outline': {
    color: '#1f2937',
  },
});

export { Badge };
