import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CarouselProps {
  children: React.ReactNode;
  onSlideChange?: (index: number) => void;
}

function Carousel({ children, onSlideChange }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const children_ = React.Children.toArray(children);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex_ = Math.round(
      contentOffsetX / Dimensions.get('window').width,
    );
    setCurrentIndex(currentIndex_);
    onSlideChange?.(currentIndex_);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollToIndex?.({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children_}
      </ScrollView>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => scrollToIndex(Math.max(0, currentIndex - 1))}
        >
          <ChevronLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            scrollToIndex(Math.min(children_.length - 1, currentIndex + 1))
          }
        >
          <ChevronRight size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarouselContent({ children }: any) {
  const width = Dimensions.get('window').width;
  return <View style={{ width, paddingHorizontal: 8 }}>{children}</View>;
}

function CarouselItem({ children }: any) {
  return <View style={styles.item}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  item: {
    flex: 1,
  },
});

export { Carousel, CarouselContent, CarouselItem };
// Web-only carousel helpers removed. Kept React Native carousel exports above.
