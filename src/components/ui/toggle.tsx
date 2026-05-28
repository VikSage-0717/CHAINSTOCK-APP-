import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

function Toggle({
  pressed: controlledPressed,
  onPressedChange,
  variant = 'default',
  size = 'default',
  children,
  style,
  disabled = false,
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(false);
  const isPressed =
    controlledPressed !== undefined ? controlledPressed : uncontrolledPressed;

  const handlePress = () => {
    if (controlledPressed === undefined) {
      setUncontrolledPressed(!uncontrolledPressed);
    }
    onPressedChange?.(!isPressed);
  };

  const sizeStyle = styles[`size-${size}`] || styles['size-default'];
  const variantStyle =
    variant === 'outline' ? styles['variant-outline'] : styles['variant-default'];
  const pressedStyle = isPressed ? styles.pressed : {};

  return (
    <TouchableOpacity
      style={[
        styles.toggle,
        sizeStyle,
        variantStyle,
        pressedStyle,
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'variant-default': {
    backgroundColor: 'transparent',
  },
  'variant-outline': {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'transparent',
  },
  'size-default': {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 36,
  },
  'size-sm': {
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 32,
  },
  'size-lg': {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 40,
  },
  pressed: {
    backgroundColor: '#fbbf24',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Toggle };
