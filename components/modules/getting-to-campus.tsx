'use client'

import { Bus, TrainFront } from 'lucide-react'
import { useState } from 'react'
import { Placeholder } from './ui'

export type Route = { suburb: string; campus: string; mode: 'train' | 'bus'; line: string; mins: number; weekly: number; changes: number }

/** Enter a suburb and see the nearest campus, the route, the time and the weekly cost. */
export function GettingToCampus({ routes, id }: { routes: Route[]; id?: string }) {
  const [suburb, setSuburb] = useState('')
  const match = routes.find((r) => r.suburb.toLowerCase() === suburb.trim().toLowerCase())
  const Icon = match?.mode === 'train' ? TrainFront : Bus
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Where are you coming from?</span>
        <input
          list="suburbs"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          placeholder="Start typing a suburb"
          className="min-h-11 rounded-md border border-input bg-background px-3 text-base"
        />
        <datalist id="suburbs">
          {routes.map((r) => (
            <option key={r.suburb} value={r.suburb} />
          ))}
        </datalist>
      </label>
      <div className="flex flex-wrap gap-2">
        {routes.slice(0, 6).map((r) => (
          <button key={r.suburb} type="button" onClick={() => setSuburb(r.suburb)} className="rounded-full border border-border px-3 py-1 text-xs hover:border-foreground">
            {r.suburb}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {match ? (
          <div className="flex items-start gap-4 rounded-lg bg-primary-tint p-4 text-primary-tint-foreground">
            <Icon className="mt-1 size-6 shrink-0" aria-hidden />
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-display text-xl leading-tight">
                {match.mins} minutes to {match.campus}
              </p>
              <p>
                {match.line}
                {match.changes ? `, ${match.changes} change` : ', no changes'}.
              </p>
              <p>
                About ${match.weekly} a week with a student concession. <Placeholder className="ml-1 align-middle" />
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Pick a suburb to see the route, the time and what it costs each week. Routes and fares are placeholders based on public timetables.
          </p>
        )}
      </div>
    </div>
  )
}
