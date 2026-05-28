import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';

function Menubar({ children }: { children?: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

function MenubarTrigger({ children }: any) {
  return <TouchableOpacity>{children}</TouchableOpacity>;
}

function MenubarContent({ children, visible = false, onClose }: any) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.menu}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  menu: { backgroundColor: '#fff', padding: 8, borderRadius: 8, margin: 24 },
});

export { Menubar, MenubarTrigger, MenubarContent };
