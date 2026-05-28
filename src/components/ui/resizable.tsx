import React from 'react';
import { View, StyleSheet } from 'react-native';

function ResizablePanelGroup({ children, vertical }: any) {
  return <View style={[styles.group, vertical && styles.vertical]}>{children}</View>;
}

function ResizablePanel({ children, style }: any) {
  return <View style={style}>{children}</View>;
}

function ResizableHandle({ withHandle, style }: any) {
  return <View style={[styles.handle, style]}>{withHandle ? <View /> : null}</View>;
}

const styles = StyleSheet.create({
  group: { flex: 1, flexDirection: 'row' },
  vertical: { flexDirection: 'column' },
  handle: { width: 8, alignItems: 'center', justifyContent: 'center' },
});

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
