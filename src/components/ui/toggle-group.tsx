import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleGroupContext = React.createContext({ size: 'default', variant: 'default' } as any);

function ToggleGroup({ children, size = 'default', variant = 'default', style }: any) {
  return (
    <ToggleGroupContext.Provider value={{ size, variant }}>
      <View style={[styles.group, style]}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({ children, onPress, style, isActive }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, isActive && styles.active, style]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: 'row', alignItems: 'center' },
  item: { padding: 8 },
  active: { backgroundColor: '#e5e7eb' },
});

export { ToggleGroup, ToggleGroupItem };
