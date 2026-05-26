import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getMarketEvents, MarketEvent } from '../utils/marketEvents';

export default function HistoricalEventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'negative' | 'positive'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [query, setQuery] = useState<string>('');

  const events = getMarketEvents();

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter(event => {
        if (selectedFilter === 'negative' && event.impactType !== 'negative') return false;
        if (selectedFilter === 'positive' && event.impactType !== 'positive') return false;
        return true;
      })
      .filter(event => {
        if (!q) return true;
        const hay = (event.event + ' ' + event.description + ' ' + (event.affectedAssets || []).join(' ') + ' ' + event.year).toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => b.year - a.year);
  }, [events, selectedFilter, query]);

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

  const getImpactEmoji = (
    impactType: 'negative' | 'positive' | 'mixed'
  ) => {
    switch (impactType) {
      case 'negative':
        return '📉';
      case 'positive':
        return '📈';
      default:
        return '➖';
    }
  };

  const EventCard = ({ item, index }: { item: MarketEvent; index: number }) => {
    const color = getImpactColor(item.impactType);
    const emoji = getImpactEmoji(item.impactType);
    const isExpanded = expandedIndex === index;

    return (
      <TouchableOpacity
        onPress={() => setExpandedIndex(isExpanded ? null : index)}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          marginBottom: 12,
          overflow: 'hidden',
          borderLeftWidth: 4,
          borderLeftColor: color,
        }}
      >
        <View style={{ padding: 16 }}>
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
              <Text style={{ fontSize: 14, fontWeight: '500', color: color, marginBottom: 4 }}>
                {item.year}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{item.event}</Text>
            </View>
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
              <Text style={{ fontSize: 18 }}>{emoji}</Text>
            </View>
          </View>

          <Text style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, lineHeight: 18 }}>{item.description}</Text>

          {/* Impact Badge */}
          {item.priceImpact !== undefined && (
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
              <Text style={{ fontSize: 12, fontWeight: '600', color: color }}>
                Market Change: {item.priceImpact > 0 ? '+' : ''}{item.priceImpact}%
              </Text>
            </View>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#4b5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Market Impact
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280', lineHeight: 18 }}>{item.marketImpact}</Text>
              {item.affectedAssets && item.affectedAssets.length > 0 && (
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>{'Affected: ' + item.affectedAssets.join(', ')}</Text>
              )}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
          <Text style={{ fontSize: 28 }}>📜</Text>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827' }}>Historical Events</Text>
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

        {/* Search input */}
        <View style={{ marginBottom: 12 }}>
          <TextInput
            placeholder="Search events, assets, year or keywords"
            value={query}
            onChangeText={setQuery}
            style={{
              backgroundColor: '#f3f4f6',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              fontSize: 14,
            }}
          />
        </View>

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
