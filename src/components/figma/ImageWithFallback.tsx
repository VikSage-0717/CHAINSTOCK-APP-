import React, { useState } from 'react';

import {
  Image,
  ImageProps,
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props extends ImageProps {}

export default function ImageWithFallback(
  props: Props
) {
  const [hasError, setHasError] =
    useState(false);

  if (hasError) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.text}>
          Image failed to load
        </Text>
      </View>
    );
  }

  return (
    <Image
      {...props}
      onError={() =>
        setHasError(true)
      }
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
  },

  text: {
    color: '#6b7280',
    fontSize: 14,
  },
});