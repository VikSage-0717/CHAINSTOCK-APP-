import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';

interface InputOTPProps {
  maxLength?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

function InputOTP({
  maxLength = 6,
  value = '',
  onValueChange,
  disabled = false,
}: InputOTPProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxLength }).map((_, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, disabled && styles.disabled]}
            maxLength={1}
            keyboardType="numeric"
            editable={!disabled}
            value={value[index] || ''}
            onChangeText={(text) => {
              if (text.length <= 1) {
                const newValue = value.split('');
                newValue[index] = text;
                onValueChange?.(newValue.join(''));
              }
            }}
          />
        </View>
      ))}
    </View>
  );
}

function InputOTPGroup({ children }: any) {
  return <View style={styles.group}>{children}</View>;
}

function InputOTPSlot({ children }: any) {
  return <View style={styles.slot}>{children}</View>;
}

function InputOTPSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    width: 40,
    height: 48,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  },
  group: {
    flexDirection: 'row',
    gap: 4,
  },
  slot: {
    flex: 1,
  },
  separator: {
    width: 12,
    height: 1,
    backgroundColor: '#d1d5db',
    alignSelf: 'center',
  },
});

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
