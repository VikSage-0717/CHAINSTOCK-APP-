import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <AlertDialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      <View>{children}</View>
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextType | undefined>(undefined);

function AlertDialogTrigger({ onPress, children }: any) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error('AlertDialogTrigger must be used within AlertDialog');

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        context.onOpenChange(true);
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

function AlertDialogContent({ children }: any) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error('AlertDialogContent must be used within AlertDialog');

  return (
    <Modal
      visible={context.open}
      transparent
      animationType="fade"
      onRequestClose={() => context.onOpenChange(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => context.onOpenChange(false)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
}

function AlertDialogHeader({ children }: any) {
  return <View style={styles.header}>{children}</View>;
}

function AlertDialogFooter({ children }: any) {
  return <View style={styles.footer}>{children}</View>;
}

function AlertDialogTitle({ children }: any) {
  return <Text style={styles.title}>{children}</Text>;
}

function AlertDialogDescription({ children }: any) {
  return <Text style={styles.description}>{children}</Text>;
}

function AlertDialogAction({ onPress, children }: any) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

function AlertDialogCancel({ onPress, children }: any) {
  return (
    <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
      <Text style={styles.cancelButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    maxWidth: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  closeText: {
    fontSize: 28,
    color: '#6b7280',
  },
  header: {
    marginBottom: 12,
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
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 14,
  },
});

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
