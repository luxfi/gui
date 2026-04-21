import * as React from 'react'

export type LuxCtaProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  renderLink?: (props: {
    href: string
    children: React.ReactNode
    className?: string
  }) => React.ReactNode
  /** Extra className applied to the outer `<section>`. */
  className?: string
}

const DefaultLink: NonNullable<LuxCtaProps['renderLink']> = ({
  href,
  children,
  className,
}) => (
  <a href={href} className={className}>
    {children}
  </a>
)

export const LuxCta: React.FC<LuxCtaProps> = ({
  title,
  subtitle,
  primary,
  secondary,
  renderLink,
  className,
}) => {
  const Link = renderLink ?? DefaultLink
  return (
    <section
      className={
        'px-6 py-24 bg-black' + (className ? ` ${className}` : '')
      }
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-lg text-white/80 max-w-xl">{subtitle}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          <Link
            href={primary.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
