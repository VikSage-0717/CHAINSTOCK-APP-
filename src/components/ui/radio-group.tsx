import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioGroupContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(
  undefined,
);

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function RadioGroup({ value: controlledValue, onValueChange, children }: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View style={styles.group}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  onPress?: () => void;
}

function RadioGroupItem({ value, disabled = false, onPress }: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  if (!context) throw new Error('RadioGroupItem must be used within RadioGroup');

  const isSelected = context.value === value;

  const handlePress = () => {
    if (!disabled) {
      context.onValueChange(value);
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.item,
        isSelected && styles.itemSelected,
        disabled && styles.itemDisabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {isSelected && <View style={styles.indicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 12,
  },
  item: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSelected: {
    borderColor: '#2563eb',
  },
  itemDisabled: {
    opacity: 0.5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
});

export { RadioGroup, RadioGroupItem };
