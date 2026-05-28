import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value: controlledValue, onValueChange, children }: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View>{children}</View>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children: React.ReactNode;
  placeholder?: string;
  onPress?: () => void;
}

function SelectTrigger({ children, placeholder, onPress }: SelectTriggerProps) {
  return (
    <TouchableOpacity style={styles.trigger} onPress={onPress}>
      <Text style={styles.triggerText}>{children || placeholder || 'Select...'}</Text>
      <ChevronDown size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}

interface SelectContentProps {
  children: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
}

function SelectContent({ children, visible = true, onClose }: SelectContentProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

function SelectItem({ value, children }: SelectItemProps) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within Select');

  const isSelected = context.value === value;

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemSelected]}
      onPress={() => context.onValueChange(value)}
    >
      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function SelectValue() {
  const context = React.useContext(SelectContext);
  return <Text>{context?.value || 'Select...'}</Text>;
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40,
  },
  triggerText: {
    fontSize: 14,
    color: '#1f2937',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '70%',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemSelected: {
    backgroundColor: '#eff6ff',
  },
  itemText: {
    fontSize: 14,
    color: '#1f2937',
  },
  itemTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
// (web-only implementations removed)
