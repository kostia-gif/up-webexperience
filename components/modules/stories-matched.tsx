'use client'

import { useState } from 'react'
import { Avatar, Pill, Placeholder } from './ui'

export type Story = {
  id: string
  name: string
  age?: number
  from: string
  now: string
  took: string
  quote: string
  filter: string
  photo?: string
}

/** One component, different filters: "Graduates like me", switcher stories, "People like me". */
export function StoriesMatched({
  prompt,
  filters,
  stories,
  id,
}: {
  prompt: string
  filters: { id: string; label: string }[]
  stories: Story[]
  id?: string
}) {
  const [filter, setFilter] = useState(filters[0].id)
  const shown = stories.filter((s) => s.filter === filter)
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">{prompt}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={prompt}>
          {filters.map((f) => (
            <Pill key={f.id} active={f.id === filter} onClick={() => setFilter(f.id)}>
              {f.label}
            </Pill>
          ))}
        </div>
      </div>
      <ul className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {shown.map((s) => (
          <li key={s.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <Avatar name={s.name} photo={s.photo} className="size-12" />
              <div className="flex flex-col gap-0.5">
                <p className="font-medium leading-snug">
                  {s.name}
                  {s.age ? `, ${s.age}` : ''} <Placeholder className="ml-1 align-middle" />
                </p>
                <p className="text-sm text-muted-foreground">
                  {s.from} <span aria-hidden>&rarr;</span> <span className="sr-only">to</span> {s.now}
                </p>
              </div>
            </div>
            <blockquote className="text-[15px] leading-relaxed text-pretty">&ldquo;{s.quote}&rdquo;</blockquote>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Took {s.took}</p>
          </li>
        ))}
        {shown.length === 0 && <li className="text-sm text-muted-foreground">No stories for this filter yet.</li>}
      </ul>
    </div>
  )
}
