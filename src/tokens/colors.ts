// Lux brand colors. Mirrors ~/work/lux/brand/brand.json theme.
// Keep in sync with @luxfi/brand; treat that package as the source of truth
// when it ships typed tokens.

export const luxLight = {
  accent1: '#000000',
  surface1: '#FFFFFF',
  surface2: '#F9F9F9',
  neutral1: '#131313',
  neutral2: 'rgba(19, 19, 19, 0.63)',
  border: 'rgba(19, 19, 19, 0.12)',
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
} as const

export const luxDark = {
  accent1: '#FFFFFF',
  surface1: '#000000',
  surface2: '#1A1A1A',
  neutral1: '#FFFFFF',
  neutral2: 'rgba(255, 255, 255, 0.65)',
  border: 'rgba(255, 255, 255, 0.12)',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const

export type LuxThemeName = 'light' | 'dark'
export type LuxColorTokens = { readonly [K in keyof typeof luxLight]: string }

export const luxColors: Record<LuxThemeName, LuxColorTokens> = {
  light: luxLight,
  dark: luxDark,
}
