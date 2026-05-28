import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CalendarProps {
  value?: Date;
  onDateChange?: (date: Date) => void;
}

function Calendar({ value, onDateChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(value || new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
            )
          }
        >
          <ChevronLeft size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
            )
          }
        >
          <ChevronRight size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.dayHeader}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {days.map((date, index) =>
          date ? (
            <TouchableOpacity
              key={index}
              style={styles.day}
              onPress={() => onDateChange?.(date)}
            >
              <Text style={styles.dayText}>{date.getDate()}</Text>
            </TouchableOpacity>
          ) : (
            <View key={index} style={styles.emptyDay} />
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingVertical: 8,
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayText: {
    fontSize: 14,
    color: '#1f2937',
  },
});

export { Calendar };
