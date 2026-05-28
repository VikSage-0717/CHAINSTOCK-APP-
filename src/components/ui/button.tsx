import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function Button({
  onPress,
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    disabled && styles.disabled,
    style,
  ];

  const contentStyle = [
    styles.text,
    styles[`text-size-${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={contentStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  'variant-default': {
    backgroundColor: '#2563eb',
  },
  'variant-destructive': {
    backgroundColor: '#dc2626',
  },
  'variant-outline': {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  'variant-secondary': {
    backgroundColor: '#f3f4f6',
  },
  'variant-ghost': {
    backgroundColor: 'transparent',
  },
  'variant-link': {
    backgroundColor: 'transparent',
  },
  'size-default': {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  'size-sm': {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  'size-lg': {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  'size-icon': {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
    color: '#ffffff',
  },
  'text-size-sm': {
    fontSize: 12,
  },
  'text-size-lg': {
    fontSize: 16,
  },
  'text-size-icon': {
    fontSize: 16,
  },
});

export { Button };
