'use client'

import { ChevronDown } from 'lucide-react'
import { track } from '@/lib/track'
import { usePostgrad } from './context'

export function MarketDemand() {
  const { pg } = usePostgrad()
  const md = pg.marketDemand
  if (!md) return null

  return (
    <section id="demand" aria-labelledby="demand-title" className="hairline-t scroll-mt-20 border-border bg-muted">
      <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-6 py-8 md:py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="demand-title" className="font-display text-2xl font-bold uppercase leading-none tracking-tight md:text-3xl">
            <span className="mr-3 text-primary">{md.eyebrow}.</span>
            {md.title}
          </h2>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {md.stats.map((s) => (
            <li key={s.label} className="flex flex-col gap-1.5 bg-card p-4">
              <p className="font-display text-4xl leading-none tracking-tight text-primary">{s.value}</p>
              <p className="text-sm font-medium leading-snug text-balance">{s.label}</p>
            </li>
          ))}
        </ul>

        <details className="group text-xs text-muted-foreground" onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && track('expander_open', { id: 'demand-sources' })}>
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 font-medium marker:hidden hover:text-foreground [&::-webkit-details-marker]:hidden">
            Sources <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <ol className="mt-1 flex flex-col gap-1 leading-relaxed">
            {md.stats.map((s, i) => (
              <li key={s.label}>
                {i + 1}. {s.value}: {s.source}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  )
}
