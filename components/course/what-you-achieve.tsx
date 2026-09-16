'use client'

import { Clapperboard, Film, PenTool, type LucideIcon } from 'lucide-react'
import { useCourse } from './course-context'
import { Module } from './primitives'

const STRAND_ICONS: LucideIcon[] = [Clapperboard, Film, PenTool]

export function WhatYouAchieve() {
  const { microCredentials, formal, funding, outcomes } = useCourse()
  const strands = (microCredentials ?? []).filter((m) => !m.taster)
  if (!strands.length) return null

  return (
    <Module id="achieve" eyebrow="What you'll achieve" title="One certificate. Three creative strands." wide>
      <p className="-mt-3 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Level {formal.level}, {formal.credits} credits, {funding.weeks} weeks online. You try all three creative disciplines, then build a
        real portfolio in the ones you love. Finish ready for a junior creative role, or step straight into a Yoobee Level 5 diploma.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {strands.map((s, i) => {
          const Icon = STRAND_ICONS[i] ?? PenTool
          return (
            <li key={s.id} className="flex flex-col gap-3 border-t-2 border-foreground pt-4">
              <Icon className="size-6 text-primary" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{s.strand}</p>
                <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{s.make}</p>
            </li>
          )
        })}
      </ul>

      {outcomes.stat && (
        <p className="mt-8 border-t border-border pt-6 text-[15px] leading-relaxed text-pretty">
          You leave with a portfolio across all three and a New Zealand qualification.{' '}
          <span className="font-medium">
            {outcomes.stat.value} of {outcomes.stat.cohort} graduates were in a creative job or further study within six months.
          </span>
        </p>
      )}
    </Module>
  )
}
