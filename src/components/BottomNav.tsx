import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Home,
  TrendingUp,
  History,
  BarChart3,
} from 'lucide-react-native';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({
  activeTab,
  onTabChange,
}: BottomNavProps) {
  const tabs = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
    },
    {
      id: 'predictions',
      icon: TrendingUp,
      label: 'Predictions',
    },
    {
      id: 'history',
      icon: History,
      label: 'Events',
    },
    {
      id: 'portfolio',
      icon: BarChart3,
      label: 'Portfolio',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        const isActive =
          activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() =>
              onTabChange(tab.id)
            }
            activeOpacity={0.8}
          >
            <Icon
              size={24}
              color={
                isActive
                  ? '#2563eb'
                  : '#6b7280'
              }
              strokeWidth={
                isActive ? 2.5 : 2
              }
            />

            <Text
              style={[
                styles.label,
                {
                  color: isActive
                    ? '#2563eb'
                    : '#6b7280',
                  fontWeight: isActive
                    ? '700'
                    : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: 12,
    marginTop: 4,
  },
});