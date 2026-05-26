import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { History, TrendingUp, TrendingDown } from 'lucide-react-native';
import { getHistoricalEvents, HistoricalEvent } from '../utils/mockData';

export default function HistoricalEventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'negative' | 'positive'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const events = getHistoricalEvents();

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'negative') return event.impactType === 'negative';
    if (selectedFilter === 'positive') return event.impactType === 'positive';
    return true;
  });

  const getImpactColor = (
    impactType: 'negative' | 'positive' | 'mixed'
  ) => {
    switch (impactType) {
      case 'negative':
        return '#ef4444';
      case 'positive':
        return '#10b981';
      case 'mixed':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getImpactIcon = (
    impactType: 'negative' | 'positive' | 'mixed'
  ) => {
    switch (impactType) {
      case 'negative':
        return TrendingDown;
      case 'positive':
        return TrendingUp;
      default:
        return null;
    }
  };

  const EventCard = ({
    item,
    index,
  }: {
    item: HistoricalEvent;
    index: number;
  }) => {
    const color = getImpactColor(item.impactType);
    const Icon = getImpactIcon(item.impactType);
    const isExpanded = expandedIndex === index;

    return (
      <TouchableOpacity
        onPress={() =>
          setExpandedIndex(isExpanded ? null : index)
        }
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          marginBottom: 12,
          overflow: 'hidden',
          borderLeftWidth: 4,
          borderLeftColor: color,
        }}
      >
        <View
          style={{
            padding: 16,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: color,
                  marginBottom: 4,
                }}
              >
                {item.year}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                {item.event}
              </Text>
            </View>
            {Icon && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: `${color}15`,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon size={20} color={color} />
              </View>
            )}
          </View>

          <Text
            style={{
              fontSize: 13,
              color: '#6b7280',
              marginBottom: 12,
              lineHeight: 18,
            }}
          >
            {item.description}
          </Text>

          {/* Impact Badge */}
          {item.percentChange !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                marginBottom: 12,
                backgroundColor: `${color}10`,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 6,
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: color,
                }}
              >
                Market Change: {item.percentChange > 0 ? '+' : ''}{item.percentChange}%
              </Text>
            </View>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <View
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: '#e5e7eb',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#4b5563',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Market Impact
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                  lineHeight: 18,
                }}
              >
                {item.marketImpact}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#ffffff',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            gap: 8,
          }}
        >
          <History size={32} color="#b45309" />
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              Historical Events
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: '#6b7280',
            marginBottom: 16,
          }}
        >
          Learn how major events shaped markets since the first public listings in 1602
        </Text>

        {/* Filter Buttons */}
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {(['all', 'negative', 'positive'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
                backgroundColor:
                  selectedFilter === filter ? '#2563eb' : '#f3f4f6',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color:
                    selectedFilter === filter ? '#ffffff' : '#4b5563',
                  textTransform: 'capitalize',
                }}
              >
                {filter === 'all' ? 'All Events' : filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Events Timeline */}
      <FlatList
        data={filteredEvents}
        renderItem={({ item, index }) => (
          <EventCard item={item} index={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        scrollEnabled={true}
      />
    </View>
  );
}
