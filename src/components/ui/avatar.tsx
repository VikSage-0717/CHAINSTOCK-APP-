import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';

interface AvatarProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

function Avatar({ style, children }: AvatarProps) {
  return (
    <View style={[styles.avatar, style]}>
      {children}
    </View>
  );
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
}

function AvatarImage({ src, alt }: AvatarImageProps) {
  if (!src) return null;
  return (
    <Image
      source={{ uri: src }}
      style={styles.image}
      defaultSource={require('react-native/Libraries/NewAppScreen/components/logo.png')}
    />
  );
}

interface AvatarFallbackProps {
  children?: React.ReactNode;
}

function AvatarFallback({ children }: AvatarFallbackProps) {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d5db',
  },
  fallbackText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export { Avatar, AvatarImage, AvatarFallback };
