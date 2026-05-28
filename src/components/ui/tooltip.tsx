import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

function Tooltip({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <View>{children}</View>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({ children }: { children?: React.ReactNode }) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) return <>{children}</>;
  return (
    <TouchableOpacity
      onPress={() => ctx.setOpen(true)}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}

function TooltipContent({ children }: { children?: React.ReactNode }) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) return null;
  return (
    <Modal transparent visible={ctx.open} animationType="fade" onRequestClose={() => ctx.setOpen(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => ctx.setOpen(false)}>
        <View style={styles.content}>
          <Text style={styles.text}>{children as string}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: '#111827',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    maxWidth: '80%',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});

export { Tooltip, TooltipTrigger, TooltipContent };
