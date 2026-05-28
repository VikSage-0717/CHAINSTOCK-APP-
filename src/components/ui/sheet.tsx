import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children?: React.ReactNode;
}

function Sheet({ open: controlledOpen, onOpenChange, side = 'bottom', children }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <SheetContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>
      <View>{children}</View>
    </SheetContext.Provider>
  );
}

const SheetContext = React.createContext<{ open: boolean; setOpen: (o: boolean) => void } | undefined>(undefined);

function SheetTrigger({ children }: any) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) return <>{children}</>;
  return (
    <TouchableOpacity onPress={() => ctx.setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
}

function SheetContent({ children, side = 'bottom' }: any) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) return null;

  return (
    <Modal visible={ctx.open} transparent animationType="slide" onRequestClose={() => ctx.setOpen(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => ctx.setOpen(false)}>
        <View style={[styles.sheet, side === 'top' && styles.top, side === 'left' && styles.left, side === 'right' && styles.right]}>
          <TouchableOpacity style={styles.close} onPress={() => ctx.setOpen(false)}>
            <X size={20} color="#1f2937" />
          </TouchableOpacity>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 20, minHeight: '30%' },
  top: { justifyContent: 'flex-start', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  left: { alignSelf: 'flex-start', width: '80%', borderTopRightRadius: 0, borderBottomRightRadius: 12 },
  right: { alignSelf: 'flex-end', width: '80%', borderTopLeftRadius: 0, borderBottomLeftRadius: 12 },
  close: { position: 'absolute', top: 12, right: 12 },
});

export { Sheet, SheetTrigger, SheetContent };
