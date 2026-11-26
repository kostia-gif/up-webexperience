'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Pill, Placeholder } from './ui'

export type Block = { day: number; start: number; end: number; kind: 'study' | 'live' | 'work' }
export type PlannerMode = { id: string; label: string; hours: string; note: string; blocks: Block[] }

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const START = 6
const END = 23
const SPAN = END - START

const KIND_CLASS: Record<Block['kind'], string> = {
  work: 'bg-border text-muted-foreground',
  study: 'bg-primary-tint text-primary-tint-foreground border border-primary/30',
  live: 'bg-primary text-primary-foreground',
}
const KIND_LABEL: Record<Block['kind'], string> = { work: 'Your job', study: 'Study on your own time', live: 'Live tutorial' }

/** Study hours laid over a working week. Modes carry their own blocks so one component serves full-time, part-time and shift work. */
export function WeekPlanner({ modes, title = 'My week', id }: { modes: PlannerMode[]; title?: string; id?: string }) {
  const [modeId, setModeId] = useState(modes[0].id)
  const mode = modes.find((m) => m.id === modeId) ?? modes[0]
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-2xl leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {mode.hours} <Placeholder className="ml-1 align-middle" />
          </p>
        </div>
        {modes.length > 1 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Study mode">
            {modes.map((m) => (
              <Pill key={m.id} active={m.id === modeId} onClick={() => setModeId(m.id)}>
                {m.label}
              </Pill>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5" role="img" aria-label={`${mode.label}: ${mode.hours}. ${mode.note}`}>
        <div className="ml-10 flex justify-between text-[10px] text-muted-foreground tabular-nums">
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>11pm</span>
        </div>
        {DAYS.map((d, i) => (
          <div key={d} className="flex items-center gap-2">
            <span className="w-8 text-xs text-muted-foreground">{d}</span>
            <div className="relative h-8 flex-1 rounded-sm bg-muted">
              {mode.blocks
                .filter((b) => b.day === i)
                .map((b, j) => (
                  <span
                    key={j}
                    className={cn('absolute inset-y-0.5 flex items-center overflow-hidden rounded-sm px-1.5 text-[10px] font-medium', KIND_CLASS[b.kind])}
                    style={{ left: `${((b.start - START) / SPAN) * 100}%`, width: `${((b.end - b.start) / SPAN) * 100}%` }}
                  >
                    <span className="truncate">{KIND_LABEL[b.kind]}</span>
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {(Object.keys(KIND_LABEL) as Block['kind'][]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={cn('size-3 rounded-sm', KIND_CLASS[k])} aria-hidden /> {KIND_LABEL[k]}
          </span>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{mode.note}</p>
    </div>
  )
}
