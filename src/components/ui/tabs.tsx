import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

function Tabs({ defaultValue = '', children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View style={styles.container}>{children}</View>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
}

function TabsList({ children }: TabsListProps) {
  return <View style={styles.tabsList}>{children}</View>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

function TabsTrigger({ value, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <TouchableOpacity
      style={[styles.trigger, isActive && styles.triggerActive]}
      onPress={() => context.setActiveTab(value)}
    >
      <Text style={[styles.triggerText, isActive && styles.triggerTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  trigger: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerActive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  triggerTextActive: {
    color: '#1f2937',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
