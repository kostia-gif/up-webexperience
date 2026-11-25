'use client'

import { CalendarCheck } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, Field, ResultCard } from './ui'

export type Session = { id: string; date: string; time: string; where: string; left?: number }

/** Next sessions with one-tap registration. Information sessions, holiday programmes, drop-in days. */
export function SessionPicker({
  sessions,
  what,
  cta = 'Register',
  bring,
  id,
}: {
  sessions: Session[]
  what: string
  cta?: string
  bring?: string
  id?: string
}) {
  const [pick, setPick] = useState<Session | null>(null)
  const [done, setDone] = useState(false)

  if (done && pick) {
    return (
      <ResultCard tone="yes">
        <div className="flex items-start gap-3 text-sm">
          <CalendarCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-pretty">
            <span className="font-medium">You are registered for the {what}</span> on {pick.date} at {pick.time}, {pick.where}. A reminder
            will come the day before. {bring}
          </p>
        </div>
      </ResultCard>
    )
  }

  return (
    <form
      id={id}
      className="flex scroll-mt-20 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (pick) setDone(true)
      }}
    >
      <ul className="grid gap-2 sm:grid-cols-3">
        {sessions.map((s) => {
          const active = pick?.id === s.id
          return (
            <li key={s.id}>
              <label
                className={cn(
                  'flex h-full cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors',
                  active ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border bg-card hover:border-foreground',
                )}
              >
                <input type="radio" name={`session-${what}`} checked={active} onChange={() => setPick(s)} className="sr-only" />
                <span className="font-medium">{s.date}</span>
                <span className="text-sm">{s.time}</span>
                <span className="text-xs opacity-80">{s.where}</span>
                {s.left !== undefined && <span className="mt-1 text-xs opacity-80">{s.left} places left</span>}
              </label>
            </li>
          )
        })}
      </ul>
      {pick && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
        </div>
      )}
      <Button type="submit" disabled={!pick} className="self-start">
        {pick ? `${cta} for ${pick.date}` : 'Pick a date'}
      </Button>
    </form>
  )
}
