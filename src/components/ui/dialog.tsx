import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';

interface DialogProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Dialog({ isOpen, onOpenChange, children }: DialogProps) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

function DialogTrigger({ onPress, children }: any) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function DialogContent({ children }: any) {
  return <View style={styles.innerContent}>{children}</View>;
}

function DialogHeader({ children }: any) {
  return <View style={styles.header}>{children}</View>;
}

function DialogTitle({ children }: any) {
  return <Text style={styles.title}>{children}</Text>;
}

function DialogDescription({ children }: any) {
  return <Text style={styles.description}>{children}</Text>;
}

function DialogFooter({ children }: any) {
  return <View style={styles.footer}>{children}</View>;
}

function DialogClose({ onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <X size={20} color="#1f2937" />
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
    maxWidth: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  innerContent: {
    flex: 1,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
});

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
// Web-only Dialog primitives removed. RN Modal-based Dialog above is used instead.
