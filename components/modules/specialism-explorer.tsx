'use client'

import { useState } from 'react'
import { Pill, Placeholder } from './ui'

export type Specialism = { id: string; label: string; craft: string; tools: string[]; jobs: string[]; course: string }

/** Pick a passion and see the course, the craft and the jobs. */
export function SpecialismExplorer({ specialisms, id }: { specialisms: Specialism[]; id?: string }) {
  const [sId, setSId] = useState(specialisms[0].id)
  const s = specialisms.find((x) => x.id === sId) ?? specialisms[0]
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">What do you want to make?</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Specialism">
          {specialisms.map((x) => (
            <Pill key={x.id} active={x.id === sId} onClick={() => setSId(x.id)}>
              {x.label}
            </Pill>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3" aria-live="polite">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">The craft</p>
          <p className="text-sm leading-relaxed text-pretty">{s.craft}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tools you will live in</p>
          <ul className="flex flex-wrap gap-1.5">
            {s.tools.map((t) => (
              <li key={t} className="rounded-sm bg-muted px-2 py-0.5 text-xs">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Jobs it leads to</p>
          <ul className="flex flex-col gap-1 text-sm">
            {s.jobs.map((j) => (
              <li key={j}>{j}</li>
            ))}
          </ul>
          <p className="mt-1 text-xs text-muted-foreground">
            In {s.course} <Placeholder className="ml-1" />
          </p>
        </div>
      </div>
    </div>
  )
}
