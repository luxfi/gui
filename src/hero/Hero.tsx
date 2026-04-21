import * as React from 'react'

export type LuxHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /**
   * Optional visual rendered to the right on large screens and below
   * copy on small. Accepts any ReactNode (image, spline, video).
   */
  visual?: React.ReactNode
  renderLink?: (props: {
    href: string
    children: React.ReactNode
    className?: string
  }) => React.ReactNode
  /** Extra className applied to the outer `<section>`. */
  className?: string
}

const DefaultLink: NonNullable<LuxHeroProps['renderLink']> = ({
  href,
  children,
  className,
}) => (
  <a href={href} className={className}>
    {children}
  </a>
)

export const LuxHero: React.FC<LuxHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
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
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 flex flex-col gap-4 max-w-2xl">
          {eyebrow ? (
            <p className="text-xs tracking-widest uppercase text-white/60">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
        {visual ? (
          <div className="flex-1 flex items-center justify-center">
            {visual}
          </div>
        ) : null}
      </div>
    </section>
  )
}
