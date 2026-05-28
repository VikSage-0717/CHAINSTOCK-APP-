import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

interface ScrollAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  horizontal?: boolean;
}

function ScrollArea({ children, style, horizontal }: ScrollAreaProps) {
  return (
    <ScrollView
      style={[styles.scrollArea, style]}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
});

export { ScrollArea };
// Removed web-only ScrollArea primitive remnants. RN `ScrollArea` above is used instead.
