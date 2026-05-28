import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface CollapsibleContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(
  undefined,
);

interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <CollapsibleContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <View>{children}</View>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

function CollapsibleTrigger({ children, onPress }: CollapsibleTriggerProps) {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error('CollapsibleTrigger must be used within Collapsible');

  const handlePress = () => {
    context.setOpen(!context.open);
    onPress?.();
  };

  return (
    <TouchableOpacity style={styles.trigger} onPress={handlePress}>
      <Text style={styles.triggerText}>{children}</Text>
      <ChevronDown
        size={20}
        color="#1f2937"
        style={{
          transform: [{ rotate: context.open ? '180deg' : '0deg' }],
        }}
      />
    </TouchableOpacity>
  );
}

interface CollapsibleContentProps {
  children?: React.ReactNode;
}

function CollapsibleContent({ children }: CollapsibleContentProps) {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error('CollapsibleContent must be used within Collapsible');

  if (!context.open) return null;

  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 4,
  },
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
