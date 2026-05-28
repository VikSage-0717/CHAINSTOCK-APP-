import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = React.createContext<DrawerContextType | undefined>(
  undefined,
);

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Drawer({ open: controlledOpen, onOpenChange, children }: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <View>{children}</View>
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ onPress, children }: any) {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error('DrawerTrigger must be used within Drawer');

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        context.setOpen(true);
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

function DrawerPortal({ children }: any) {
  return <View>{children}</View>;
}

function DrawerClose({ onPress }: any) {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error('DrawerClose must be used within Drawer');

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        context.setOpen(false);
      }}
    >
      <X size={24} color="#1f2937" />
    </TouchableOpacity>
  );
}

function DrawerOverlay() {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error('DrawerOverlay must be used within Drawer');

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={() => context.setOpen(false)}
      activeOpacity={1}
    />
  );
}

function DrawerContent({ children, direction = 'bottom' }: any) {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error('DrawerContent must be used within Drawer');

  return (
    <Modal
      visible={context.open}
      transparent
      animationType="slide"
      onRequestClose={() => context.setOpen(false)}
    >
      <DrawerOverlay />
      <View
        style={[
          styles.content,
          direction === 'left' && styles.contentLeft,
          direction === 'right' && styles.contentRight,
          direction === 'top' && styles.contentTop,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}

function DrawerHeader({ children }: any) {
  return <View style={styles.header}>{children}</View>;
}

function DrawerFooter({ children }: any) {
  return <View style={styles.footer}>{children}</View>;
}

function DrawerTitle({ children }: any) {
  return <Text style={styles.title}>{children}</Text>;
}

function DrawerDescription({ children }: any) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    minHeight: '50%',
  },
  contentLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 12,
    width: '75%',
  },
  contentRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 12,
    marginLeft: 'auto',
    width: '75%',
  },
  contentTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1f2937',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
