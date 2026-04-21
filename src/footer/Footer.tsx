import * as React from 'react'
import { LUX_PRODUCTS } from '../nav/products'

export type LuxFooterProps = {
  renderLink?: (props: {
    href: string
    children: React.ReactNode
    className?: string
  }) => React.ReactNode
  legalEntity?: string
  year?: number
  topSlot?: React.ReactNode
  className?: string
}

const DefaultLink: NonNullable<LuxFooterProps['renderLink']> = ({
  href,
  children,
  className,
}) => (
  <a href={href} className={className}>
    {children}
  </a>
)

export const LuxFooter: React.FC<LuxFooterProps> = ({
  renderLink,
  legalEntity = 'Lux Industries Inc.',
  year,
  topSlot,
  className,
}) => {
  const Link = renderLink ?? DefaultLink
  const displayYear = year ?? new Date().getUTCFullYear()

  return (
    <footer
      className={
        'py-10 sm:py-12 px-4 sm:px-6 bg-black border-t border-white/10' +
        (className ? ` ${className}` : '')
      }
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {topSlot}

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {LUX_PRODUCTS.map((section) => (
            <div key={section.section} className="flex flex-col gap-3">
              <p className="text-xs text-white/50 uppercase tracking-widest">
                {section.section}
              </p>
              <ul className="flex flex-col gap-2 text-sm text-white/80">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-xs sm:text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {displayYear} {legalEntity}. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="https://lux.network/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="https://lux.network/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="https://status.lux.network" className="hover:text-white transition-colors">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
