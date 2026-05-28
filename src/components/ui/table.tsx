import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function Table({ children }: { children?: React.ReactNode }) {
  return <ScrollView horizontal style={styles.container}>{children}</ScrollView>;
}

function TableHeader({ children }: { children?: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function TableBody({ children }: { children?: React.ReactNode }) {
  return <View style={styles.body}>{children}</View>;
}

function TableFooter({ children }: { children?: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

function TableRow({ children }: { children?: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

function TableHead({ children }: { children?: React.ReactNode }) {
  return <Text style={styles.head}>{children}</Text>;
}

function TableCell({ children }: { children?: React.ReactNode }) {
  return <Text style={styles.cell}>{children}</Text>;
}

function TableCaption({ children }: { children?: React.ReactNode }) {
  return <Text style={styles.caption}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  body: {
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  head: {
    fontWeight: '700',
    paddingHorizontal: 8,
    minWidth: 100,
  },
  cell: {
    paddingHorizontal: 8,
    minWidth: 100,
  },
  caption: {
    color: '#6b7280',
    marginTop: 8,
  },
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
