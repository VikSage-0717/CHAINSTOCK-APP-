import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ children }: { children: React.ReactNode }) {
  return <View style={styles.accordion}>{children}</View>;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.trigger} onPress={toggleOpen}>
        <Text style={styles.triggerText}>{title}</Text>
        <ChevronDown
          size={20}
          color="#666"
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] } as any}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    borderColor: '#e5e7eb',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

export { Accordion, AccordionItem };
