import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
}: SwitchProps) {
  return (
    <TouchableOpacity
      style={[
        styles.switch,
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.thumb,
          checked && styles.thumbChecked,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  checked: {
    backgroundColor: '#2563eb',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  thumbChecked: {
    alignSelf: 'flex-end',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Switch };
