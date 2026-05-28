import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface HoverCardContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HoverCardContext = React.createContext<HoverCardContextType | undefined>(
  undefined,
);

interface HoverCardProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function HoverCard({ open: controlledOpen, onOpenChange, children }: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <HoverCardContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <View>{children}</View>
    </HoverCardContext.Provider>
  );
}

function HoverCardTrigger({ children, onMouseEnter, onMouseLeave }: any) {
  const context = React.useContext(HoverCardContext);
  if (!context) throw new Error('HoverCardTrigger must be used within HoverCard');

  return (
    <TouchableOpacity
      onPressIn={() => context.setOpen(true)}
      onPressOut={() => context.setOpen(false)}
    >
      {children}
    </TouchableOpacity>
  );
}

function HoverCardContent({ children }: any) {
  const context = React.useContext(HoverCardContext);
  if (!context) throw new Error('HoverCardContent must be used within HoverCard');

  if (!context.open) return null;

  return (
    <View style={styles.content}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export { HoverCard, HoverCardTrigger, HoverCardContent };
