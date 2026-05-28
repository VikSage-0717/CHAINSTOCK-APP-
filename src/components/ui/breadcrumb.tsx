import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

function Breadcrumb({ children }: any) {
  return <View style={styles.breadcrumb}>{children}</View>;
}

function BreadcrumbList({ children }: any) {
  return <View style={styles.list}>{children}</View>;
}

function BreadcrumbItem({ children }: any) {
  return <View style={styles.item}>{children}</View>;
}

function BreadcrumbLink({ onPress, children }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
}

function BreadcrumbPage({ children }: any) {
  return <Text style={styles.page}>{children}</Text>;
}

function BreadcrumbSeparator() {
  return (
    <View style={styles.separator}>
      <ChevronRight size={16} color="#6b7280" />
    </View>
  );
}

function BreadcrumbEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <Text style={styles.ellipsisText}>...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    marginVertical: 8,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  link: {
    fontSize: 14,
    color: '#2563eb',
  },
  page: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  separator: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ellipsis: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  ellipsisText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
