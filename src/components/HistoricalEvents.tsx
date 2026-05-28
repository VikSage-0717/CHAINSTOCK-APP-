import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  History,
  Filter,
} from 'lucide-react-native';

import HistoricalEventCard from './HistoricalEventCard';

export default function HistoricalEvents() {
  const [selectedFilter, setSelectedFilter] =
    useState<
      'all' | 'negative' | 'positive'
    >('all');

  const events = [
    {
      year: 1914,
      event: 'World War I Begins',
      description:
        'The outbreak of WWI caused major stock exchanges to close for months. NYSE closed for 4 months.',

      marketImpact:
        'Markets crashed globally. Dow Jones fell 30% before closure. Recovery took years.',

      impactType: 'negative' as const,
      percentChange: -30,
    },

    {
      year: 1929,
      event: 'The Great Depression',
      description:
        'Black Tuesday marked the worst stock market crash in history.',

      marketImpact:
        'Dow Jones lost 89% of its value from peak to trough by 1932.',

      impactType: 'negative' as const,
      percentChange: -89,
    },

    {
      year: 1939,
      event: 'World War II Begins',
      description:
        'WWII caused initial market panic but later boosted industries.',

      marketImpact:
        'Initial 12% drop followed by strong recovery.',

      impactType: 'negative' as const,
      percentChange: -12,
    },

    {
      year: 1973,
      event: 'Oil Crisis',
      description:
        'Oil embargo triggered recession and market crash.',

      marketImpact:
        'S&P 500 fell 48% from peak.',

      impactType: 'negative' as const,
      percentChange: -48,
    },

    {
      year: 1987,
      event: 'Black Monday',
      description:
        'Largest single-day market crash in history.',

      marketImpact:
        'Dow Jones fell 22.6% in one day.',

      impactType: 'negative' as const,
      percentChange: -22.6,
    },

    {
      year: 2000,
      event: 'Dot-com Bubble Burst',
      description:
        'Internet startup bubble collapsed.',

      marketImpact:
        'NASDAQ lost 78% from peak.',

      impactType: 'negative' as const,
      percentChange: -78,
    },

    {
      year: 2008,
      event:
        'Global Financial Crisis',
      description:
        'Housing collapse triggered worldwide banking crisis.',

      marketImpact:
        'S&P 500 dropped 57%.',

      impactType: 'negative' as const,
      percentChange: -57,
    },

    {
      year: 2009,
      event: 'Bitcoin Launch',
      description:
        'Bitcoin introduced decentralized currency.',

      marketImpact:
        'Started the crypto revolution.',

      impactType: 'positive' as const,
    },

    {
      year: 2020,
      event:
        'COVID-19 Pandemic',
      description:
        'Global pandemic caused historic volatility.',

      marketImpact:
        'Markets crashed then rapidly recovered.',

      impactType: 'negative' as const,
      percentChange: -34,
    },

    {
      year: 2021,
      event: 'Crypto Bull Run',
      description:
        'Bitcoin and altcoins surged massively.',

      marketImpact:
        'Crypto market exceeded $3T.',

      impactType: 'positive' as const,
      percentChange: 300,
    },

    {
      year: 2022,
      event:
        'Russia-Ukraine War',
      description:
        'War and inflation caused global turmoil.',

      marketImpact:
        'Stocks and crypto fell sharply.',

      impactType: 'negative' as const,
      percentChange: -25,
    },

    {
      year: 2024,
      event: 'AI Revolution',
      description:
        'AI boom accelerated tech innovation.',

      marketImpact:
        'Tech stocks surged strongly.',

      impactType: 'positive' as const,
      percentChange: 45,
    },
  ];

  const filteredEvents = events.filter(
    (event) => {
      if (selectedFilter === 'all') {
        return true;
      }

      return (
        event.impactType ===
        selectedFilter
      );
    }
  );

  const filters = [
    {
      id: 'all',
      label: 'All Events',
    },

    {
      id: 'negative',
      label: 'Crashes',
    },

    {
      id: 'positive',
      label: 'Bull Markets',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <History
            size={30}
            color="#d97706"
          />

          <Text style={styles.title}>
            Historical Events
          </Text>
        </View>

        <Text style={styles.subtitle}>
          How major events shaped
          financial markets
        </Text>
      </View>

      {/* FILTERS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.filterContainer
        }
      >
        <Filter
          size={18}
          color="#6b7280"
          style={styles.filterIcon}
        />

        {filters.map((filter) => {
          const isActive =
            selectedFilter ===
            filter.id;

          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() =>
                setSelectedFilter(
                  filter.id as any
                )
              }
              style={[
                styles.filterButton,

                isActive &&
                  styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,

                  isActive &&
                    styles.activeFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* EVENTS */}
      <View
        style={styles.eventsContainer}
      >
        {filteredEvents.map(
          (event, index) => (
            <HistoricalEventCard
              key={index}
              {...event}
            />
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  header: {
    marginBottom: 24,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingRight: 20,
  },

  filterIcon: {
    marginRight: 10,
  },

  filterButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: '#d97706',
  },

  filterText: {
    color: '#4b5563',
    fontWeight: '600',
    fontSize: 14,
  },

  activeFilterText: {
    color: '#ffffff',
  },

  eventsContainer: {
    marginTop: 6,
  },
});