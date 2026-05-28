import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChartContainerProps {
  children?: React.ReactNode;
  config?: Record<string, any>;
}

function ChartContainer({ children, config }: ChartContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

interface ChartTooltipProps {
  children?: React.ReactNode;
}

function ChartTooltip({ children }: ChartTooltipProps) {
  return <View style={styles.tooltip}>{children}</View>;
}

interface ChartTooltipContentProps {
  children?: React.ReactNode;
}

function ChartTooltipContent({ children }: ChartTooltipContentProps) {
  return <Text style={styles.tooltipContent}>{children}</Text>;
}

interface ChartLegendProps {
  children?: React.ReactNode;
}

function ChartLegend({ children }: ChartLegendProps) {
  return <View style={styles.legend}>{children}</View>;
}

interface ChartLegendContentProps {
  children?: React.ReactNode;
}

function ChartLegendContent({ children }: ChartLegendContentProps) {
  return <View style={styles.legendContent}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
  },
  tooltip: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipContent: {
    fontSize: 12,
    color: '#1f2937',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  legendContent: {
    flexDirection: 'row',
    gap: 12,
  },
});

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
// Trimmed heavy web-only Recharts-based implementations. The RN placeholders above are used instead.
