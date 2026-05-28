import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';

interface DropdownMenuProps {
  children?: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <View>{children}</View>
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(
  undefined,
);

function DropdownMenuPortal({ children }: any) {
  return <View>{children}</View>;
}

function DropdownMenuTrigger({ onPress, children }: any) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        context.setOpen(!context.open);
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

function DropdownMenuContent({ children }: any) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');

  return (
    <Modal visible={context.open} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => context.setOpen(false)}
      >
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
}

function DropdownMenuGroup({ children }: any) {
  return <View>{children}</View>;
}

interface DropdownMenuItemProps {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'destructive';
}

function DropdownMenuItem({ children, onPress, variant = 'default' }: DropdownMenuItemProps) {
  const context = React.useContext(DropdownMenuContext);
  
  const handlePress = () => {
    onPress?.();
    context?.setOpen(false);
  };

  return (
    <TouchableOpacity
      style={[
        styles.item,
        variant === 'destructive' && styles.itemDestructive,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.itemText, variant === 'destructive' && styles.itemTextDestructive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function DropdownMenuCheckboxItem({ children }: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{children}</Text>
    </View>
  );
}

function DropdownMenuRadioGroup({ children }: any) {
  return <View>{children}</View>;
}

function DropdownMenuRadioItem({ children }: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{children}</Text>
    </View>
  );
}

function DropdownMenuLabel({ children }: any) {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
}

function DropdownMenuSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 200,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  itemDestructive: {
    backgroundColor: '#fef2f2',
  },
  itemText: {
    fontSize: 14,
    color: '#1f2937',
  },
  itemTextDestructive: {
    color: '#dc2626',
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
// (web-only Radix UI implementations removed)
