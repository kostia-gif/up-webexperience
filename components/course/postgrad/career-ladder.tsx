'use client'

import { TrendingUp } from 'lucide-react'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function CareerLadder() {
  const { pg } = usePostgrad()
  const cl = pg.careerLadder
  if (!cl) return null

  return (
    <Module id="trajectory" eyebrow={cl.eyebrow} title={cl.title} muted wide>
      <p className="max-w-[620px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{cl.intro}</p>

      <ol className="mt-8 flex flex-col">
        {cl.tiers.map((tier, i) => {
          const isLast = i === cl.tiers.length - 1
          return (
            <li key={tier.when} className="relative flex gap-5 pb-8 last:pb-0 md:gap-7">
              {!isLast && <span aria-hidden className="absolute left-[7px] top-4 h-full w-px bg-border" />}
              <span aria-hidden className="mt-1.5 size-4 shrink-0 rounded-full border-2 border-primary bg-background" />
              <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">{tier.when}</p>
                  <p className="inline-flex items-center gap-1.5 font-display text-xl leading-none tabular-nums text-coral">
                    <TrendingUp className="size-4" aria-hidden />
                    {tier.band}
                  </p>
                </div>
                <h3 className="font-display text-2xl leading-tight">{tier.role}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tier.settings}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{cl.note}</p>
    </Module>
  )
}
