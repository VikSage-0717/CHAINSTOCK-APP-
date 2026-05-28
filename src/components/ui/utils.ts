// React Native utils - simplified version for mobile
// clsx equivalent for React Native styles
export function cn(...inputs: any[]): any[] {
  return inputs.filter(Boolean).flat();
}

// Simple style merger
export function mergeStyles(...styles: any[]): any {
  return Object.assign({}, ...styles.filter(Boolean));
}
