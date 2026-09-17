'use client'

import { CalendarRange } from 'lucide-react'
import type { StudyRhythm as StudyRhythmData } from '@/lib/course'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function StudyRhythmContent({ sr }: { sr: StudyRhythmData }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[560px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{sr.intro}</p>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm font-medium">
          <CalendarRange className="size-4 text-primary" aria-hidden />
          {sr.weeks}-week trimester · {sr.perBlock}
        </p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {sr.phases.map((phase, i) => (
          <li key={phase.span} className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{i + 1}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{phase.span}</span>
            </div>
            <h3 className="font-display text-lg leading-tight">{phase.label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{phase.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function StudyRhythm() {
  const { pg } = usePostgrad()
  const sr = pg.studyRhythm
  if (!sr) return null
  return (
    <Module id="rhythm" eyebrow={sr.eyebrow} title={sr.title} wide>
      <StudyRhythmContent sr={sr} />
    </Module>
  )
}
