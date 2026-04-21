import * as React from 'react'

export type LuxStatCardProps = {
  label: string
  value: React.ReactNode
  delta?: React.ReactNode
  /**
   * Visual emphasis. 'danger' and 'success' color the delta.
   */
  tone?: 'neutral' | 'success' | 'danger'
  /** Formatter hint, e.g. $ / %. Rendered as a small suffix. */
  suffix?: string
  className?: string
}

const toneClass: Record<NonNullable<LuxStatCardProps['tone']>, string> = {
  neutral: 'text-white',
  success: 'text-emerald-400',
  danger: 'text-red-400',
}

export const LuxStatCard: React.FC<LuxStatCardProps> = ({
  label,
  value,
  delta,
  tone = 'neutral',
  suffix,
  className,
}) => (
  <div
    className={
      'flex flex-col gap-2 p-4 rounded-xl border border-white/10 bg-black' +
      (className ? ` ${className}` : '')
    }
  >
    <p className="text-xs text-white/60 uppercase tracking-widest">{label}</p>
    <p className="text-3xl font-bold leading-none text-white">
      {value}
      {suffix ? (
        <span className="ml-1 text-lg font-medium text-white/60">
          {suffix}
        </span>
      ) : null}
    </p>
    {delta !== undefined && delta !== null ? (
      <p className={`text-sm ${toneClass[tone]}`}>{delta}</p>
    ) : null}
  </div>
)

export type LuxStatRowProps = {
  stats: readonly LuxStatCardProps[]
  className?: string
}

export const LuxStatRow: React.FC<LuxStatRowProps> = ({
  stats,
  className,
}) => (
  <section
    className={
      'px-6 py-12 bg-black' + (className ? ` ${className}` : '')
    }
  >
    <div className="max-w-7xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {stats.map((s) => (
        <LuxStatCard key={s.label} {...s} />
      ))}
    </div>
  </section>
)
