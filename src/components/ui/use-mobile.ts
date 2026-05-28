import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const { width } = useWindowDimensions();
  return width < MOBILE_BREAKPOINT;
}

export function useMobile() {
  return useIsMobile();
}
