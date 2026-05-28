import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined,
);

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Popover({ open: controlledOpen, onOpenChange, children }: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <View>{children}</View>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ onPress, children }: any) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error('PopoverTrigger must be used within Popover');

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

function PopoverContent({ children }: any) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error('PopoverContent must be used within Popover');

  return (
    <Modal visible={context.open} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => context.setOpen(false)}
      >
        <View style={styles.content}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function PopoverAnchor({ children }: any) {
  return <View>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    minWidth: 280,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
