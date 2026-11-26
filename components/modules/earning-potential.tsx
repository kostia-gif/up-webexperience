import { TrendingUp } from 'lucide-react'
import { Placeholder } from './ui'

export type Earnings = {
  currency: 'NZD' | 'AUD'
  start: number
  threeYear: number
  source: string
  year: number
  stat?: { value: string; label: string; cohort: number }
  employers: string[]
  employersMore: number
  employersYear: number
}

function money(n: number, currency: 'NZD' | 'AUD') {
  return n.toLocaleString(currency === 'AUD' ? 'en-AU' : 'en-NZ', { style: 'currency', currency, maximumFractionDigits: 0 })
}

/** The earning-potential module from the original round: starting pay, the three-year figure, the outcome stat, and who hired recent graduates. */
export function EarningPotential({ e }: { e: Earnings }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1 rounded-lg bg-coral p-4 text-coral-foreground">
          <p className="text-xs font-medium">Starting salary</p>
          <p className="font-display text-4xl font-bold leading-none">{money(e.start, e.currency)}</p>
          <p className="mt-1 text-sm">
            Typical first role, {e.year}. <Placeholder className="ml-1 align-middle" />
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <TrendingUp className="size-4" aria-hidden /> 3-year goal salary
          </p>
          <p className="font-display text-4xl font-bold leading-none text-primary">{money(e.threeYear, e.currency)}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">
            {e.source}, {e.year}.
          </p>
        </div>
        {e.stat && (
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{e.stat.label}</p>
            <p className="font-display text-4xl font-bold leading-none">{e.stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{e.stat.cohort} graduates</p>
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
          + {e.employersMore} more hired our {e.employersYear} grads
        </li>
      </ul>
    </div>
  )
}
