import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { Search } from 'lucide-react-native';

interface CommandProps {
  children?: React.ReactNode;
}

function Command({ children }: CommandProps) {
  return <View style={styles.container}>{children}</View>;
}

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function CommandDialog({ open, onOpenChange, children }: CommandDialogProps) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange?.(false)}>
      <View style={styles.overlay}>
        {children}
      </View>
    </Modal>
  );
}

interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function CommandInput({ placeholder, value, onValueChange }: CommandInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Search size={18} color="#9ca3af" style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder || 'Search...'}
        value={value}
        onChangeText={onValueChange}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}

interface CommandListProps {
  children?: React.ReactNode;
}

function CommandList({ children }: CommandListProps) {
  return <View style={styles.list}>{children}</View>;
}

interface CommandEmptyProps {
  children?: React.ReactNode;
}

function CommandEmpty({ children }: CommandEmptyProps) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{children || 'No results found'}</Text>
    </View>
  );
}

interface CommandGroupProps {
  children?: React.ReactNode;
  heading?: string;
}

function CommandGroup({ children, heading }: CommandGroupProps) {
  return (
    <View>
      {heading && <Text style={styles.groupHeading}>{heading}</Text>}
      <View>{children}</View>
    </View>
  );
}

function CommandSeparator() {
  return <View style={styles.separator} />;
}

interface CommandItemProps {
  onSelect?: () => void;
  children?: React.ReactNode;
}

function CommandItem({ onSelect, children }: CommandItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onSelect}>
      {children}
    </TouchableOpacity>
  );
}

function CommandShortcut({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <Text style={[styles.shortcut, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color: '#1f2937',
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 12,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#6b7280',
  },
});

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
};

// Web-only CommandShortcut removed. RN `CommandShortcut` provided above and exported.
