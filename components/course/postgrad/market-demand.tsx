'use client'

import { Module } from '../primitives'
import { usePostgrad } from './context'

export function MarketDemand() {
  const { pg } = usePostgrad()
  const md = pg.marketDemand
  if (!md) return null

  return (
    <Module id="demand" eyebrow={md.eyebrow} title={md.title} muted wide>
      <p className="max-w-[620px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{md.intro}</p>
      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {md.stats.map((s) => (
          <li key={s.label} className="flex flex-col gap-2 bg-card p-5">
            <p className="font-display text-5xl leading-none tracking-tight text-primary">{s.value}</p>
            <p className="text-[15px] font-medium leading-snug text-balance">{s.label}</p>
            <p className="mt-auto pt-2 text-xs leading-relaxed text-muted-foreground">{s.source}</p>
          </li>
        ))}
      </ul>
    </Module>
  )
}
