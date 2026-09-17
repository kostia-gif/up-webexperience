'use client'

import { ArrowDown, LifeBuoy } from 'lucide-react'
import type { PathwayLadder as PathwayLadderData } from '@/lib/course'
import { cn } from '@/lib/utils'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function PathwayLadderContent({ pl }: { pl: PathwayLadderData }) {
  const maxUnits = Math.max(...pl.rungs.map((r) => r.unitCount))
  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-[620px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{pl.intro}</p>

      <ol className="flex flex-col gap-2">
        {pl.rungs.map((rung, i) => {
          const pct = Math.round((rung.unitCount / maxUnits) * 100)
          return (
            <li key={rung.award}>
              {i > 0 && (
                <p className="flex items-center justify-center py-0.5 text-muted-foreground">
                  <ArrowDown className="size-4" aria-hidden />
                  <span className="sr-only">then stacks into</span>
                </p>
              )}
              <div
                className={cn(
                  'flex flex-col gap-3 rounded-lg border p-4',
                  rung.isTarget ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background',
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl leading-tight">{rung.award}</h3>
                  <p className={cn('text-sm', rung.isTarget ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {rung.unitCount} units · {rung.duration}
                  </p>
                </div>
                <div
                  className={cn('h-1.5 overflow-hidden rounded-full', rung.isTarget ? 'bg-primary-foreground/20' : 'bg-muted')}
                  role="img"
                  aria-label={`${rung.unitCount} of ${maxUnits} units toward the Master`}
                >
                  <span className={cn('block h-full rounded-full', rung.isTarget ? 'bg-coral' : 'bg-primary')} style={{ width: `${pct}%` }} />
                </div>
                <p className={cn('text-sm leading-relaxed text-pretty', rung.isTarget ? 'text-primary-foreground/90' : 'text-muted-foreground')}>{rung.gets}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {rung.roles.map((role) => (
                    <span
                      key={role}
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs',
                        rung.isTarget ? 'border-primary-foreground/30 text-primary-foreground' : 'border-border bg-muted text-foreground',
                      )}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="flex items-start gap-3 rounded-lg border border-success-border bg-success p-4 text-sm leading-relaxed text-pretty text-success-foreground">
        <LifeBuoy className="mt-0.5 size-4 shrink-0" aria-hidden />
        {pl.safetyNote}
      </p>
    </div>
  )
}

export function PathwayLadder() {
  const { pg } = usePostgrad()
  const pl = pg.pathwayLadder
  if (!pl) return null
  return (
    <Module id="pathways" eyebrow={pl.eyebrow} title={pl.title} wide>
      <PathwayLadderContent pl={pl} />
    </Module>
  )
}
