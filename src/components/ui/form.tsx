import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FormFieldContextType {
  name: string;
  error?: boolean;
  value?: any;
}

const FormFieldContext = React.createContext<FormFieldContextType | undefined>(
  undefined,
);

function Form({ children, style, ...props }: any) {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
}

function FormField({ name, children }: any) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <View>{children}</View>
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) throw new Error('useFormField must be used within a FormField');
  return ctx;
}

function FormItem({ children }: any) {
  return <View style={styles.item}>{children}</View>;
}

function FormLabel({ children }: any) {
  return <Text style={styles.label}>{children}</Text>;
}

function FormControl({ children }: any) {
  return <View style={styles.control}>{children}</View>;
}

function FormDescription({ children }: any) {
  return <Text style={styles.description}>{children}</Text>;
}

function FormMessage({ children }: any) {
  return <Text style={styles.error}>{children}</Text>;
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 12,
    gap: 8 as any,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as any,
    marginBottom: 6,
    color: '#1f2937',
  },
  control: {
    marginVertical: 4,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  error: {
    fontSize: 13,
    color: '#dc2626',
    marginTop: 4,
  },
});

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
