// 4px scale, matches @hanzo/gui default space scale.

export const luxSpace = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const

export const luxRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

export const luxMaxWidth = {
  container: 1280,
  prose: 720,
  narrow: 560,
} as const

export type LuxSpace = keyof typeof luxSpace
export type LuxRadius = keyof typeof luxRadius
