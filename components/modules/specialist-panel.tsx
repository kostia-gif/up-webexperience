'use client'

import { PhoneCall } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { BookingSlots, type SlotDay } from './booking-slots'
import { Avatar, Button, Field, Placeholder, ResultCard } from './ui'

export type Specialist = { name: string; years: string; expertise: string; photo?: string }

/**
 * Simple specialist profiles (name, years, expertise) and one choice:
 * ask for a call back, or pick a time. Nothing is sent.
 */
export function SpecialistPanel({ specialists, days, what }: { specialists: Specialist[]; days: SlotDay[]; what: string }) {
  const [mode, setMode] = useState<'callback' | 'time'>('callback')
  const [sent, setSent] = useState(false)

  return (
    <div className="grid gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
      <ul className="flex flex-col divide-y divide-border">
        {specialists.map((s) => (
          <li key={s.name} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <Avatar name={s.name} photo={s.photo} className="size-14" />
            <div className="flex flex-col gap-0.5">
              <p className="font-medium leading-snug">
                {s.name} <Placeholder className="ml-1 align-middle" />
              </p>
              <p className="text-sm text-muted-foreground">
                {s.years} &middot; {s.expertise}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div role="tablist" aria-label="How would you like us to contact you?" className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
          {(
            [
              ['callback', 'Request a call back'],
              ['time', 'Choose a time'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={cn('min-h-11 rounded-md text-sm font-medium', mode === id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === 'callback' ? (
          sent ? (
            <ResultCard tone="yes">
              <div className="flex items-start gap-3 text-sm">
                <PhoneCall className="mt-0.5 size-5 shrink-0" aria-hidden />
                <p className="text-pretty">
                  <span className="font-medium">A course specialist will call you within one working day.</span> If we cannot reach you, we will email instead.
                </p>
              </div>
            </ResultCard>
          ) : (
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" name="name" required autoComplete="name" />
                <Field label="Phone" name="tel" type="tel" required autoComplete="tel" />
              </div>
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Button type="submit" size="lg" className="self-start">
                <PhoneCall className="size-4" aria-hidden /> Request a call back
              </Button>
            </form>
          )
        ) : (
          <BookingSlots days={days} what={what} compact />
        )}
      </div>
    </div>
  )
}
