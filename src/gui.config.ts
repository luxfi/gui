// Lux Tamagui config. Apps should import this (or their own extension of it)
// and pass to <GuiProvider config={...}> at the app root.
//
//   import { GuiProvider } from '@hanzo/gui'
//   import luxConfig from '@luxfi/gui/config'
//   <GuiProvider config={luxConfig} defaultTheme="lux_dark"> ... </GuiProvider>
//
// The config extends @hanzogui/config/v5 defaults with Lux brand themes.
// @hanzogui/config is a transitive dependency of @hanzo/gui — consuming apps
// that already install @hanzo/gui get it for free.

import { defaultConfig } from '@hanzogui/config/v5'
import { createGui } from '@hanzo/gui'
import { luxLight, luxDark } from './tokens/colors'

// Minimal theme overrides — apps can extend further.
const lux_dark = {
  ...defaultConfig.themes.dark,
  background: luxDark.surface1,
  color: luxDark.neutral1,
  borderColor: luxDark.border,
}

const lux_light = {
  ...defaultConfig.themes.light,
  background: luxLight.surface1,
  color: luxLight.neutral1,
  borderColor: luxLight.border,
}

export const config = createGui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    lux_dark,
    lux_light,
  },
})

export default config
export type LuxConf = typeof config

declare module '@hanzogui/web' {
  interface GuiCustomConfig extends LuxConf {}
}
