'use client'

import { CalendarCheck } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, Field, ResultCard } from './ui'

export type SlotDay = { day: string; times: string[] }

/**
 * Day and time picker with on-page confirmation. Shared by tutor conversations,
 * information sessions, campus visits and drop-in days. Sends nothing.
 */
export function BookingSlots({
  days,
  what,
  withWho,
  confirmLine,
  compact,
}: {
  days: SlotDay[]
  what: string
  withWho?: string
  confirmLine?: string
  compact?: boolean
}) {
  const [pick, setPick] = useState<{ day: string; time: string } | null>(null)
  const [done, setDone] = useState(false)

  if (done && pick) {
    return (
      <ResultCard tone="yes">
        <div className="flex items-start gap-3">
          <CalendarCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="flex flex-col gap-1 text-sm">
            <p className="font-medium">
              Booked: {what}, {pick.day} at {pick.time}
              {withWho ? ` with ${withWho}` : ''}.
            </p>
            <p className="text-pretty">{confirmLine ?? 'You will get a calendar invite and a reminder the day before. Nothing else, and no follow-up calls.'}</p>
          </div>
        </div>
      </ResultCard>
    )
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (pick) setDone(true)
      }}
    >
      <div className={cn('grid gap-3', compact ? 'grid-cols-1' : 'sm:grid-cols-3')}>
        {days.map((d) => (
          <fieldset key={d.day} className="flex flex-col gap-2">
            <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{d.day}</legend>
            <div className="flex flex-wrap gap-2">
              {d.times.map((t) => {
                const active = pick?.day === d.day && pick.time === t
                return (
                  <label
                    key={t}
                    className={cn(
                      'inline-flex min-h-10 cursor-pointer items-center rounded-md border px-3 text-sm tabular-nums transition-colors',
                      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-foreground',
                    )}
                  >
                    <input type="radio" name={`slot-${what}`} checked={active} onChange={() => setPick({ day: d.day, time: t })} className="sr-only" />
                    {t}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {pick && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
        </div>
      )}
      <Button type="submit" disabled={!pick} className="self-start">
        {pick ? `Confirm ${pick.day} ${pick.time}` : 'Pick a time'}
      </Button>
    </form>
  )
}
