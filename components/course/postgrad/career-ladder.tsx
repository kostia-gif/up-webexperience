'use client'

import { TrendingUp } from 'lucide-react'
import type { CareerLadder as CareerLadderData } from '@/lib/course'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function CareerLadderContent({ cl }: { cl: CareerLadderData }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-[620px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{cl.intro}</p>

      <ol className="flex flex-col">
        {cl.tiers.map((tier, i) => {
          const isLast = i === cl.tiers.length - 1
          return (
            <li key={tier.when} className="relative flex gap-4 pb-4 last:pb-0">
              {!isLast && <span aria-hidden className="absolute left-[7px] top-4 h-full w-px bg-border" />}
              <span aria-hidden className="mt-1.5 size-4 shrink-0 rounded-full border-2 border-primary bg-background" />
              <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg border border-border bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">{tier.when}</p>
                  <p className="inline-flex items-center gap-1.5 font-display text-lg leading-none tabular-nums text-coral">
                    <TrendingUp className="size-4" aria-hidden />
                    {tier.band}
                  </p>
                </div>
                <h3 className="font-display text-xl leading-tight">{tier.role}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tier.settings}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="text-xs leading-relaxed text-muted-foreground">{cl.note}</p>
    </div>
  )
}

export function CareerLadder() {
  const { pg } = usePostgrad()
  const cl = pg.careerLadder
  if (!cl) return null
  return (
    <Module id="trajectory" eyebrow={cl.eyebrow} title={cl.title} muted wide>
      <CareerLadderContent cl={cl} />
    </Module>
  )
}
