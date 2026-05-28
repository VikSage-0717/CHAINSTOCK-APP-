import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

interface ContextMenuProps {
  children?: React.ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable onLongPress={() => setVisible(true)}>
        {children}
      </Pressable>
      {visible && (
        <Modal visible={visible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={styles.content} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

function ContextMenuTrigger({ children }: any) {
  return <View>{children}</View>;
}

function ContextMenuGroup({ children }: any) {
  return <View>{children}</View>;
}

function ContextMenuPortal({ children }: any) {
  return <View>{children}</View>;
}

function ContextMenuSub({ children }: any) {
  return <View>{children}</View>;
}

function ContextMenuRadioGroup({ children }: any) {
  return <View>{children}</View>;
}

function ContextMenuSubTrigger({ children }: any) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{children}</Text>
    </TouchableOpacity>
  );
}

function ContextMenuSubContent({ children }: any) {
  return <View style={styles.submenu}>{children}</View>;
}

function ContextMenuContent({ children }: any) {
  return <View style={styles.menu}>{children}</View>;
}

interface ContextMenuItemProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

function ContextMenuItem({ children, onPress }: ContextMenuItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemText}>{children}</Text>
    </TouchableOpacity>
  );
}

function ContextMenuCheckboxItem({ children }: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{children}</Text>
    </View>
  );
}

function ContextMenuRadioItem({ children }: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{children}</Text>
    </View>
  );
}

function ContextMenuLabel({ children }: any) {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
}

function ContextMenuSeparator() {
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
  },
  submenu: {
    paddingLeft: 12,
    marginTop: 4,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#1f2937',
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuRadioGroup,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
};
// (web-only Radix UI code removed)
