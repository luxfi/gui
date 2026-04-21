// Canonical Lux product / domain navigation structure.
// Apps consume this through <LuxHeader variant="..." /> and <LuxFooter />.
// Add / update domains here, not in each app.

export type LuxNavItem = {
  name: string
  href: string
  desc?: string
  external?: boolean
}

export type LuxNavSection = {
  section: string
  items: readonly LuxNavItem[]
}

export const LUX_PRODUCTS: readonly LuxNavSection[] = [
  {
    section: 'Finance',
    items: [
      { name: 'Lux Finance', href: 'https://lux.finance', desc: 'Self-repaying loans' },
      { name: 'Lux Financial', href: 'https://lux.financial', desc: 'Regulated banking platform' },
      { name: 'Lux Exchange', href: 'https://lux.exchange', desc: 'DEX + CEX' },
      { name: 'Lux Credit', href: 'https://lux.credit', desc: 'Zero-interest lending' },
      { name: 'Lux Fund', href: 'https://lux.fund', desc: 'Investment fund' },
      { name: 'Lux Invest', href: 'https://lux.invest', desc: 'Investment portal' },
      { name: 'Lux Safe', href: 'https://lux.safe', desc: 'Multi-sig custody' },
      { name: 'Lux Market', href: 'https://lux.market', desc: 'Marketplace' },
    ],
  },
  {
    section: 'Infrastructure',
    items: [
      { name: 'Lux Network', href: 'https://lux.network', desc: 'Blockchain' },
      { name: 'Lux Cloud', href: 'https://lux.cloud', desc: 'Cloud compute' },
      { name: 'Lux ID', href: 'https://lux.id', desc: 'Identity' },
      { name: 'Bridge', href: 'https://bridge.lux.network', desc: 'Cross-chain bridge' },
      { name: 'Markets', href: 'https://markets.lux.network', desc: 'On-chain markets' },
      { name: 'Explorer', href: 'https://explore.lux.network', desc: 'Block explorer' },
    ],
  },
  {
    section: 'Developers',
    items: [
      { name: 'Docs', href: 'https://docs.lux.network' },
      { name: 'Financial Docs', href: 'https://docs.lux.financial' },
      { name: 'Status', href: 'https://status.lux.network' },
      { name: 'GitHub', href: 'https://github.com/luxfi', external: true },
    ],
  },
  {
    section: 'Research',
    items: [
      { name: 'Lux Papers', href: 'https://github.com/luxfi/papers', desc: 'Consensus, PQ crypto, FHE, DeFi', external: true },
      { name: 'Lux Proofs', href: 'https://github.com/luxfi/proofs', desc: 'Formal verification (Lean4, TLA+, Tamarin)', external: true },
      { name: 'Hanzo Papers', href: 'https://github.com/hanzoai/papers', desc: 'AI/ML, HMM, ASO, agents', external: true },
      { name: 'Zoo Papers', href: 'https://github.com/zooai/papers', desc: 'DeSci and conservation AI', external: true },
      { name: 'Lux Audits', href: 'https://github.com/luxfi/audits', desc: 'Independent security audits', external: true },
    ],
  },
  {
    section: 'Open Source',
    items: [
      { name: 'Lux on GitHub', href: 'https://github.com/luxfi', external: true },
      { name: 'Hanzo on GitHub', href: 'https://github.com/hanzoai', external: true },
      { name: 'Zoo on GitHub', href: 'https://github.com/zooai', external: true },
      { name: 'Hanzo S3', href: 'https://github.com/hanzos3', external: true },
    ],
  },
] as const

// Variant -> product key. Used to highlight the active section in <LuxHeader>.
export type LuxVariant =
  | 'network'
  | 'finance'
  | 'financial'
  | 'exchange'
  | 'credit'
  | 'fund'
  | 'invest'
  | 'safe'
  | 'market'
  | 'cloud'
  | 'id'
  | 'industries'
  | 'bitcoin'
  | 'coin'
  | 'vote'
  | 'shop'
  | 'cash'
  | 'partners'
  | 'quest'
  | 'help'
  | 'docs'
  | 'default'

export const LUX_VARIANT_HREF: Record<LuxVariant, string> = {
  network: 'https://lux.network',
  finance: 'https://lux.finance',
  financial: 'https://lux.financial',
  exchange: 'https://lux.exchange',
  credit: 'https://lux.credit',
  fund: 'https://lux.fund',
  invest: 'https://lux.invest',
  safe: 'https://lux.safe',
  market: 'https://lux.market',
  cloud: 'https://lux.cloud',
  id: 'https://lux.id',
  industries: 'https://lux.industries',
  bitcoin: 'https://lux.bitcoin',
  coin: 'https://lux.coin',
  vote: 'https://vote.lux.network',
  shop: 'https://lux.shop',
  cash: 'https://lux.cash',
  partners: 'https://lux.partners',
  quest: 'https://lux.quest',
  help: 'https://lux.help',
  docs: 'https://docs.lux.network',
  default: 'https://lux.network',
}

// Primary top-level links shown collapsed on mobile.
export const LUX_PRIMARY_LINKS: readonly LuxNavItem[] = [
  { name: 'Network', href: LUX_VARIANT_HREF.network },
  { name: 'Finance', href: LUX_VARIANT_HREF.finance },
  { name: 'Exchange', href: LUX_VARIANT_HREF.exchange },
  { name: 'Cloud', href: LUX_VARIANT_HREF.cloud },
  { name: 'Docs', href: LUX_VARIANT_HREF.docs },
] as const
