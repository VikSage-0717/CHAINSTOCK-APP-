import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  numberOfLines?: number;
}

function Textarea({
  placeholder,
  value,
  onChangeText,
  editable = true,
  numberOfLines = 4,
}: TextareaProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        multiline
        numberOfLines={numberOfLines}
        placeholderTextColor="#9ca3af"
        style={styles.textarea}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    minHeight: 100,
  },
});

export { Textarea };
