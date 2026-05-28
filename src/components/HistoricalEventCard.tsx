import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Calendar,
  TrendingDown,
  TrendingUp,
} from 'lucide-react-native';

interface HistoricalEventCardProps {
  year: number;
  event: string;
  description: string;
  marketImpact: string;
  impactType: 'negative' | 'positive' | 'mixed';
  percentChange?: number;
}

export default function HistoricalEventCard({
  year,
  event,
  description,
  marketImpact,
  impactType,
  percentChange,
}: HistoricalEventCardProps) {
  const impactStyles = {
    negative: {
      borderColor: '#dc2626',
      backgroundColor: '#fef2f2',
    },

    positive: {
      borderColor: '#16a34a',
      backgroundColor: '#f0fdf4',
    },

    mixed: {
      borderColor: '#ca8a04',
      backgroundColor: '#fefce8',
    },
  };

  const currentStyle =
    impactStyles[impactType];

  const isNegative =
    percentChange !== undefined &&
    percentChange < 0;

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor:
            currentStyle.borderColor,

          backgroundColor:
            currentStyle.backgroundColor,
        },
      ]}
    >
      <View style={styles.row}>
        {/* ICON */}
        <View style={styles.iconContainer}>
          <Calendar
            size={20}
            color="#374151"
          />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* YEAR + CHANGE */}
          <View style={styles.topRow}>
            <Text style={styles.year}>
              {year}
            </Text>

            {percentChange !==
              undefined && (
              <View
                style={
                  styles.percentContainer
                }
              >
                {isNegative ? (
                  <TrendingDown
                    size={14}
                    color="#dc2626"
                  />
                ) : (
                  <TrendingUp
                    size={14}
                    color="#16a34a"
                  />
                )}

                <Text
                  style={[
                    styles.percentText,
                    {
                      color: isNegative
                        ? '#dc2626'
                        : '#16a34a',
                    },
                  ]}
                >
                  {percentChange >= 0
                    ? '+'
                    : ''}
                  {percentChange}%
                </Text>
              </View>
            )}
          </View>

          {/* EVENT */}
          <Text style={styles.eventTitle}>
            {event}
          </Text>

          {/* DESCRIPTION */}
          <Text style={styles.description}>
            {description}
          </Text>

          {/* MARKET IMPACT */}
          <View
            style={styles.impactBox}
          >
            <Text style={styles.impactLabel}>
              Market Impact:
            </Text>

            <Text style={styles.impactText}>
              {marketImpact}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 10,
  },

  percentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  percentText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },

  impactBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
  },

  impactLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },

  impactText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
});