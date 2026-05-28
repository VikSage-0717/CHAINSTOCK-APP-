import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({
  checked = false,
  onCheckedChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
    >
      {checked && (
        <Check size={14} color="#ffffff" strokeWidth={3} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Checkbox };
