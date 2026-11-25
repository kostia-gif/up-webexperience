import { Placeholder } from './ui'

export type OutcomeStat = { value: string; label: string; source: string }
export type PayRow = { role: string; band: string; source: string }

/** One number, one meaning, one source. */
export function OutcomesPanel({ stats, employers, pay, id }: { stats: OutcomeStat[]; employers: string[]; pay: PayRow[]; id?: string }) {
  return (
    <div id={id} className="grid scroll-mt-20 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <p className="font-display text-4xl tabular-nums">
              {s.value} <Placeholder className="ml-1 align-middle" />
            </p>
            <p className="text-sm font-medium">{s.label}</p>
            <p className="text-xs text-muted-foreground">Source: {s.source}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Where graduates work</p>
        <ul className="flex flex-wrap gap-2">
          {employers.map((e) => (
            <li key={e} className="rounded-md border border-border px-3 py-1.5 text-sm">
              {e}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          <Placeholder /> Example employers of recent graduates, to be confirmed by UP.
        </p>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Starting pay by role</p>
        <dl className="flex flex-col divide-y divide-border">
          {pay.map((p) => (
            <div key={p.role} className="flex items-baseline justify-between gap-3 py-2 text-sm">
              <dt>{p.role}</dt>
              <dd className="flex flex-col items-end">
                <span className="font-medium tabular-nums">{p.band}</span>
                <span className="text-[11px] text-muted-foreground">{p.source}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
