import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

function Card({ children, style }: CardProps) {
  return <View style={[styles.card].concat(style as any)}>{children}</View>;
}

function CardHeader({ children, style }: CardProps) {
  return <View style={[styles.cardHeader].concat(style as any)}>{children}</View>;
}

function CardTitle({ children, style }: CardProps) {
  return <Text style={[styles.cardTitle].concat(style as any)}>{children}</Text>;
}

function CardDescription({ children, style }: CardProps) {
  return <Text style={[styles.cardDescription].concat(style as any)}>{children}</Text>;
}

function CardAction({ children, style }: any) {
  return <View style={style}>{children}</View>;
}

function CardContent({ children, style }: any) {
  return <View style={[styles.cardContent].concat(style as any)}>{children}</View>;
}

function CardFooter({ children, style }: any) {
  return <View style={[styles.cardFooter].concat(style as any)}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    paddingTop: 8,
  },
  cardFooter: {
    marginTop: 12,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
