# @luxfi/gui

Lux UI chrome on [`@hanzo/gui`](https://github.com/hanzoai/gui) (Tamagui).
Every Lux web property (`lux.network`, `lux.finance`, `lux.exchange`,
`lux.financial`, `lux.cloud`, `lux.industries`, `lux.id`, etc.) consumes this
package so header, footer, and primitives are identical across the portfolio.

Components are Tamagui primitives (`YStack`, `XStack`, `H1`..`H6`, `Paragraph`,
`Button`, `Popover`, `Sheet`, etc.) re-composed into Lux-branded surfaces.
Responsive behavior uses Tamagui media queries (`$gtSm`, `$gtMd`, `$gtLg`) —
no Tailwind, no runtime CSS — so the same components work on mobile, tablet,
laptop, and desktop out of the box.

## What's in here

| Export                 | Purpose                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `LuxHeader`            | Brand + cross-product nav bar, variant per app               |
| `LuxProductMenu`       | Mega-menu of every Lux product, grouped by section           |
| `LuxFooter`            | Multi-column footer with cross-links and legal strip         |
| `LuxHero`              | Landing page hero (eyebrow / title / subtitle / CTAs / visual) |
| `LuxFeatureGrid`       | N-column feature callout grid                                |
| `LuxStatCard` / `LuxStatRow` | KPI tile used on dashboards and marketing              |
| `LuxCta`               | Closing call-to-action block with primary + secondary button |
| `LUX_PRODUCTS`         | Canonical nav structure (sections + items)                   |
| `LUX_PRIMARY_LINKS`    | Short top-level nav (Network / Finance / Exchange / Cloud / Docs) |
| `luxColors`            | Light + dark brand color tokens                              |
| `luxFontStack`         | Typography tokens                                            |
| `luxSpace`, `luxRadius`, `luxMaxWidth` | Spacing / layout tokens                      |

Every component is tree-shakeable. Subpath imports:

```ts
import { LuxHeader } from '@luxfi/gui/header'
import { LuxFooter } from '@luxfi/gui/footer'
import { luxColors } from '@luxfi/gui/tokens'
```

## Install

```bash
pnpm add @luxfi/gui @hanzo/gui react react-dom
```

`@hanzo/gui`, `react`, `react-dom` are peer dependencies.

## Use

`@luxfi/gui` components are Tamagui-based. They must be rendered inside a
`GuiProvider` from `@hanzo/gui`. The Lux config is exposed at
`@luxfi/gui/config`.

```tsx
// app/providers.tsx
'use client'
import { GuiProvider } from '@hanzo/gui'
import luxConfig from '@luxfi/gui/config'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GuiProvider config={luxConfig} defaultTheme="lux_dark">
      {children}
    </GuiProvider>
  )
}
```

```tsx
// any page
import { LuxHeader, LuxFooter, LuxHero, LuxFeatureGrid } from '@luxfi/gui'
import Link from 'next/link'

const renderLink = ({ href, children }) => <Link href={href}>{children}</Link>

export default function Page() {
  return (
    <>
      <LuxHeader variant="finance" renderLink={renderLink} />
      <LuxHero
        eyebrow="Introducing Lux Finance"
        title={<>Self-repaying loans on every asset.</>}
        subtitle="Borrow against anything. Pay nothing."
        primaryCta={{ label: 'Get started', href: '/app' }}
        secondaryCta={{ label: 'Read docs', href: 'https://docs.lux.financial' }}
        renderLink={renderLink}
      />
      <LuxFeatureGrid
        eyebrow="Why Lux"
        heading="Built for the next decade of finance."
        features={[
          { title: 'Non-custodial', description: 'Your keys, your coins.' },
          { title: 'Cross-chain', description: '9 chains today, 50 soon.' },
          { title: 'Open source', description: 'Audited and on-chain.' },
        ]}
      />
      <LuxFooter renderLink={renderLink} />
    </>
  )
}
```

### Variants

Pass `variant` on `LuxHeader` to highlight the active product and brand the
wordmark: `network`, `finance`, `financial`, `exchange`, `credit`, `fund`,
`invest`, `safe`, `market`, `cloud`, `id`, `industries`, `docs`, `default`.

### Render-prop links

All components accept `renderLink={({ href, children }) => ReactNode}` so the
host app keeps ownership of its router (Next, TanStack Router, Expo Router,
etc). The default renderer is a plain `<a>`.

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
```

## Versioning

`@luxfi/gui` follows semver. Peer-depends on `@hanzo/gui >= 4.7.0`. Breaking
changes bump the major.

## License

MIT. See [LICENSE](./LICENSE).
