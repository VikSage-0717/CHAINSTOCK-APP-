import React, { createContext, useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { PanelLeft } from 'lucide-react-native';
import { useIsMobile } from './use-mobile';

type SidebarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider');
  return ctx;
}

export function SidebarProvider({ children }: { children?: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen((v) => !v);

  const value = useMemo(() => ({ open, setOpen, isMobile, toggleSidebar }), [open, isMobile]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function Sidebar({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const { open } = useSidebar();
  if (!open) return null;
  return <View style={[styles.sidebar, style]}>{children}</View>;
}

export function SidebarContent({ children, style }: any) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function SidebarHeader({ children, style }: any) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SidebarFooter({ children, style }: any) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function SidebarTrigger({ style }: any) {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity onPress={toggleSidebar} style={[styles.trigger, style]}>
      <PanelLeft size={20} color="#111827" />
    </TouchableOpacity>
  );
}

export function SidebarMenu({ children, style }: any) {
  return <View style={[styles.menu, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 12,
  },
  content: { flex: 1 },
  header: { marginBottom: 8 },
  footer: { marginTop: 8 },
  menu: { marginTop: 4 },
  trigger: { padding: 8 },
});

export default Sidebar;
