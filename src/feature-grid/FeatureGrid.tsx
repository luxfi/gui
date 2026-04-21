import * as React from 'react'

export type LuxFeature = {
  title: string
  description: string
  icon?: React.ReactNode
}

export type LuxFeatureGridProps = {
  heading?: React.ReactNode
  eyebrow?: string
  features: readonly LuxFeature[]
  /** Columns on large screens. Default 3. */
  columns?: 2 | 3 | 4
  /** Extra className applied to the outer `<section>`. */
  className?: string
}

const gridCols: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

export const LuxFeatureGrid: React.FC<LuxFeatureGridProps> = ({
  heading,
  eyebrow,
  features,
  columns = 3,
  className,
}) => (
  <section
    className={
      'px-6 py-24 bg-black' + (className ? ` ${className}` : '')
    }
  >
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {(eyebrow || heading) && (
        <div className="flex flex-col gap-2 max-w-2xl">
          {eyebrow ? (
            <p className="text-xs tracking-widest uppercase text-white/60">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              {heading}
            </h2>
          ) : null}
        </div>
      )}
      <div className={`grid gap-4 grid-cols-1 ${gridCols[columns]}`}>
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 p-6 rounded-xl border border-white/10 bg-white/[0.02]"
          >
            {f.icon ? <div className="text-white mb-2">{f.icon}</div> : null}
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
