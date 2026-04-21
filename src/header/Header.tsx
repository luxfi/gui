'use client'
import * as React from 'react'
import {
  LUX_PRIMARY_LINKS,
  LUX_PRODUCTS,
  LUX_VARIANT_HREF,
  type LuxVariant,
} from '../nav/products'

export type LuxHeaderProps = {
  variant?: LuxVariant
  renderLink?: (props: {
    href: string
    children: React.ReactNode
    className?: string
  }) => React.ReactNode
  actions?: React.ReactNode
  label?: string
  className?: string
  /** Optional brand mark override (e.g. custom SVG logo). */
  brandMark?: React.ReactNode
}

const DefaultLink: NonNullable<LuxHeaderProps['renderLink']> = ({
  href,
  children,
  className,
}) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const variantLabel = (variant: LuxVariant): string => {
  if (variant === 'default') return ''
  if (variant === 'id') return 'ID'
  return variant.charAt(0).toUpperCase() + variant.slice(1)
}

export const LuxHeader: React.FC<LuxHeaderProps> = ({
  variant = 'default',
  renderLink,
  actions,
  label,
  className,
  brandMark,
}) => {
  const Link = renderLink ?? DefaultLink
  const suffix = label ?? variantLabel(variant)
  const activeHref = LUX_VARIANT_HREF[variant]
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    if (!mobileOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [mobileOpen])

  return (
    <header
      className={
        'fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10' +
        (className ? ` ${className}` : '')
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Link
          href={activeHref}
          className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-wider text-white shrink-0"
        >
          {brandMark ?? <LuxMark />}
          <span className="whitespace-nowrap">Lux{suffix ? ` ${suffix}` : ''}</span>
        </Link>

        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm text-white/70 flex-1 justify-center">
          {LUX_PRIMARY_LINKS.map((item) => {
            const isActive = item.href === activeHref
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'text-white font-semibold transition-colors'
                    : 'hover:text-white transition-colors'
                }
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {actions}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-6">
            {LUX_PRODUCTS.map((section) => (
              <div key={section.section} className="flex flex-col gap-2">
                <p className="text-xs text-white/50 uppercase tracking-widest">
                  {section.section}
                </p>
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const isActive = item.href === activeHref
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={
                          'py-2 text-sm ' +
                          (isActive ? 'text-white font-semibold' : 'text-white/75 hover:text-white')
                        }
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

const LuxMark: React.FC = () => (
  <span className="inline-flex w-6 h-6 rounded-md bg-white items-center justify-center">
    <span className="text-black font-bold text-sm leading-none">L</span>
  </span>
)

export const LuxProductMenu: React.FC<{
  renderLink?: LuxHeaderProps['renderLink']
  className?: string
}> = ({ renderLink, className }) => {
  const Link = renderLink ?? DefaultLink
  return (
    <div
      className={
        'grid gap-4 p-4 bg-black rounded-xl border border-white/10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' +
        (className ? ` ${className}` : '')
      }
    >
      {LUX_PRODUCTS.map((section) => (
        <div key={section.section} className="flex flex-col gap-2 min-w-48">
          <p className="text-xs text-white/50 uppercase tracking-widest">
            {section.section}
          </p>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                <span className="font-medium">{item.name}</span>
                {item.desc ? (
                  <span className="block text-xs text-white/40">{item.desc}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
