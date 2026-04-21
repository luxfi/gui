// @luxfi/gui — Lux-branded UI chrome on top of @hanzo/gui (Tamagui).
// Types-only reference so the Tamagui config augmentation in ./gui.config is
// visible when consumers use @luxfi/gui. The runtime config is exposed
// separately via `@luxfi/gui/config`.
import type {} from './gui.config'
//
// Usage:
//   import { LuxHeader, LuxFooter, LuxHero, LuxFeatureGrid, LuxStatRow,
//            LuxCta, LUX_PRODUCTS, luxColors } from '@luxfi/gui'
//
// Or import surfaces directly for tree-shaking:
//   import { LuxHeader } from '@luxfi/gui/header'

export * from './tokens'
export * from './nav'
export * from './header'
export * from './footer'
export * from './hero'
export * from './feature-grid'
export * from './stat-card'
export * from './cta'
