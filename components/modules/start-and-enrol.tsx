'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, Field, Pill, ResultCard } from './ui'

export type IntakeOption = { id: string; date: string; label?: string }

/** Pick an intake (and campus or time where relevant), then enrol without a call. */
export function StartAndEnrol({
  intakes,
  campuses,
  times,
  id,
  cta = 'Enrol online',
  confirm,
  timesLabel = 'Classes',
}: {
  intakes: IntakeOption[]
  campuses?: string[]
  times?: string[]
  id?: string
  cta?: string
  confirm: string
  timesLabel?: string
}) {
  const [intake, setIntake] = useState(intakes[0].id)
  const [campus, setCampus] = useState(campuses?.[0])
  const [time, setTime] = useState(times?.[0])
  const [done, setDone] = useState(false)
  const chosen = intakes.find((i) => i.id === intake) ?? intakes[0]

  if (done) {
    return (
      <ResultCard tone="yes">
        <div className="flex items-start gap-3 text-sm">
          <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-pretty">
            <span className="font-medium">
              You are enrolling for {chosen.date}
              {campus ? ` at ${campus}` : ''}
              {time ? `, ${time}` : ''}.
            </span>{' '}
            {confirm}
          </p>
        </div>
      </ResultCard>
    )
  }

  return (
    <form
      id={id}
      className="flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Start date</legend>
        <div className="flex flex-wrap gap-2">
          {intakes.map((i) => (
            <label
              key={i.id}
              className={cn(
                'flex cursor-pointer flex-col rounded-lg border px-4 py-2.5 transition-colors',
                intake === i.id ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border hover:border-foreground',
              )}
            >
              <input type="radio" name="intake" checked={intake === i.id} onChange={() => setIntake(i.id)} className="sr-only" />
              <span className="text-sm font-medium">{i.date}</span>
              {i.label && <span className="text-xs opacity-80">{i.label}</span>}
            </label>
          ))}
        </div>
      </fieldset>
      {campuses && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Campus</legend>
          <div className="flex flex-wrap gap-2">
            {campuses.map((c) => (
              <Pill key={c} active={campus === c} onClick={() => setCampus(c)}>
                {c}
              </Pill>
            ))}
          </div>
        </fieldset>
      )}
      {times && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">{timesLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {times.map((t) => (
              <Pill key={t} active={time === t} onClick={() => setTime(t)}>
                {t}
              </Pill>
            ))}
          </div>
        </fieldset>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Mobile" name="tel" type="tel" required autoComplete="tel" />
      </div>
      <Button type="submit" size="lg" className="self-start">
        {cta}
      </Button>
    </form>
  )
}
