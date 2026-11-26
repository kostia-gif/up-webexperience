import { TrendingUp } from 'lucide-react'
import { Placeholder } from './ui'

export type Sourced = { source: string; href?: string; year?: number }

export type Earnings = {
  currency: 'NZD' | 'AUD'
  /** Typical starting salary for a first role. */
  start: { value: number; role: string } & Sourced
  /** Where the career can go: a later role and its typical salary. */
  pathway: { value: number; role: string; when: string } & Sourced
  /** The qualification premium: what people with this level of qualification earn compared with school leavers. */
  premium?: { value: string; label: string } & Sourced
  stat?: { value: string; label: string; cohort: number; placeholder?: boolean }
  employers: string[]
  employersMore: number
  employersYear: number
}

function money(n: number, currency: 'NZD' | 'AUD') {
  return n.toLocaleString(currency === 'AUD' ? 'en-AU' : 'en-NZ', { style: 'currency', currency, maximumFractionDigits: 0 })
}

function Source({ s, placeholder }: { s: Sourced; placeholder?: boolean }) {
  const text = `${s.source}${s.year ? `, ${s.year}` : ''}`
  return (
    <p className="mt-1 text-xs leading-snug text-muted-foreground">
      Source:{' '}
      {s.href ? (
        <a href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
          {text}
        </a>
      ) : (
        text
      )}
      {placeholder && <Placeholder className="ml-1.5 align-middle" />}
    </p>
  )
}

/**
 * Earnings with a source on every figure: a starting salary, a career
 * pathway salary, the qualification premium from national statistics, and
 * the outcome rate, then who employs recent graduates.
 */
export function EarningPotential({ e }: { e: Earnings }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1 rounded-lg bg-coral p-4 text-coral-foreground">
          <p className="text-xs font-medium">Starting salary</p>
          <p className="font-display text-4xl font-bold leading-none">{money(e.start.value, e.currency)}</p>
          <p className="mt-1 text-sm">{e.start.role}</p>
          <p className="mt-1 text-xs leading-snug opacity-90">
            Source: {e.start.source}
            {e.start.year ? `, ${e.start.year}` : ''}. <Placeholder className="ml-1 align-middle" />
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <TrendingUp className="size-4" aria-hidden /> Career pathway salary
          </p>
          <p className="font-display text-4xl font-bold leading-none text-primary">{money(e.pathway.value, e.currency)}</p>
          <p className="mt-1 text-sm">
            {e.pathway.role}, {e.pathway.when}
          </p>
          <Source s={e.pathway} placeholder />
        </div>
        {e.premium && (
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">Qualification premium</p>
            <p className="font-display text-4xl font-bold leading-none">{e.premium.value}</p>
            <p className="mt-1 text-sm leading-snug text-pretty">{e.premium.label}</p>
            <Source s={e.premium} />
          </div>
        )}
        {e.stat && (
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{e.stat.label}</p>
            <p className="font-display text-4xl font-bold leading-none">{e.stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {e.stat.cohort} graduates {e.stat.placeholder !== false && <Placeholder className="ml-1 align-middle" />}
            </p>
          </div>
        )}
      </div>
      <ul className="flex flex-wrap gap-2" aria-label="Employers">
        {e.employers.map((x) => (
          <li key={x} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium">
            {x}
          </li>
        ))}
        <li className="rounded-full bg-primary-tint px-3.5 py-2 text-sm font-medium text-primary-tint-foreground">
          + {e.employersMore} more employers of {e.employersYear} graduates
        </li>
      </ul>
      <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
        Salary figures are medians or typical ranges for the roles named and vary by employer, region and experience. The qualification premium is a national statistic, not a guarantee for this course.
      </p>
    </div>
  )
}
