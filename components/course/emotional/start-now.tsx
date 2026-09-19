'use client'

import Image from 'next/image'
import { Check, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { advisorFor } from '@/lib/advisors'
import { placeStatus, type Intake, type PlaceStatus } from '@/lib/course'
import { floating } from '@/lib/floating-store'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from '../course-context'
import { Btn, Field, inputClass, StatusPill } from '../primitives'

function intakeStatus(intake: Intake): PlaceStatus {
  if (intake.unconfirmed) return 'interest'
  const max = Math.max(...(intake.campuses?.map((c) => c.left) ?? []), 0)
  return max === 0 ? 'waitlist' : placeStatus(max)
}

type Done = { date: string; campus: string; mode: 'seat' | 'call' }

export function StartNow({ optionA = false }: { optionA?: boolean } = {}) {
  const course = useCourse()
  const advisor = advisorFor(course.brand.id)
  const [date, setDate] = useState(course.intakes[0].label)
  const [campus, setCampus] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [done, setDone] = useState<Done | null>(null)

  const intake = course.intakes.find((i) => i.label === date) ?? course.intakes[0]
  const campuses = intake.unconfirmed ? [] : (intake.campuses ?? [])
  const chosen = campuses.find((c) => c.name === campus)
  const chosenStatus = chosen ? placeStatus(chosen.left) : intake.unconfirmed ? 'interest' : null
  const ready = intake.unconfirmed || chosen

  function submit(mode: Done['mode']) {
    track(mode === 'call' ? 'callback_request' : chosenStatus === 'waitlist' ? 'waitlist_join' : 'seat_hold', {
      date,
      campus: campus ?? 'any',
    })
    setDone({ date, campus: campus ?? 'any campus', mode })
    if (optionA) floating.markSubmitted()
  }

  return (
    <section id="start" aria-labelledby="start-title" className="scroll-mt-20 bg-coral text-coral-foreground">
      <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-6 py-10 md:py-14">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide opacity-80">{optionA ? 'Takes about 30 seconds' : 'Step 1 of 1'}</p>
          <h2 id="start-title" className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-5xl">
            Pick your start date
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-pretty opacity-90">
            Choose a date and a campus, leave your name and number. We hold your seat for 7 days and text you. No payment, no forms,
            no application yet.
          </p>
        </header>

        <div role="group" aria-label="Start dates" className="grid gap-3 sm:grid-cols-3">
          {course.intakes.map((i) => {
            const sel = i.label === date
            const s = intakeStatus(i)
            return (
              <button
                key={i.label}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setDate(i.label)
                  setCampus(null)
                  setDone(null)
                  track('intake_select', { date: i.label })
                }}
                className={cn(
                  'flex min-h-24 flex-col items-start justify-between gap-3 rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-foreground',
                  sel ? 'border-coral-foreground bg-background text-foreground' : 'border-coral-foreground/30 bg-coral-foreground/10 hover:border-coral-foreground/70',
                )}
              >
                <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                  {i.unconfirmed ? 'Later' : i === course.intakes[0] ? 'Next class' : 'Mid-year'}
                </span>
                <span className="font-display text-3xl font-bold leading-none">{i.label}</span>
                <StatusPill status={s} className={sel ? '' : 'border-coral-foreground/40 bg-transparent text-coral-foreground'} />
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-5 rounded-lg bg-background p-5 text-foreground md:p-6">
          {!intake.unconfirmed && (
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 flex items-center gap-2 text-base font-medium">
                <MapPin className="size-5 text-primary" aria-hidden /> Which campus is closest?
              </legend>
              <div className="flex flex-wrap gap-2">
                {campuses.map((c) => {
                  const s = placeStatus(c.left)
                  const sel = c.name === campus
                  return (
                    <button
                      key={c.name}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => {
                        setCampus(c.name)
                        setDone(null)
                      }}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 rounded-md border-2 px-4 text-[15px] font-medium transition-colors',
                        sel ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-foreground',
                      )}
                    >
                      {c.name}
                      <span className={cn('text-xs font-normal', sel ? 'opacity-80' : 'text-muted-foreground')}>
                        {s === 'waitlist' ? 'full, waitlist' : s === 'filling' ? `${c.left} left` : 'open'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {intake.unconfirmed && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {intake.label} dates are confirmed in the new year. Leave your details and you hear first.
            </p>
          )}

          {ready && !done && (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                submit('seat')
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="First name" id="start-name">
                  <input id="start-name" required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </Field>
                <Field label="Mobile" id="start-mobile">
                  <input id="start-mobile" required type="tel" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} />
                </Field>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Btn type="submit" variant="coral" className="min-h-12 px-6">
                  {chosenStatus === 'waitlist' ? `Join the waitlist for ${date}` : chosenStatus === 'interest' ? 'Tell me first' : `Hold my seat for ${date}`}
                </Btn>
                <Btn variant="outline" className="min-h-12" onClick={() => submit('call')} disabled={!name || !mobile}>
                  <Phone className="size-4" aria-hidden /> Call me instead
                </Btn>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We text you within the hour, then a course advisor calls to sort the rest: the details, the loan, the gear. We use your
                number only to talk about this course.
              </p>
            </form>
          )}

          {!ready && !done && (
            <p className="text-sm text-muted-foreground">Choose a campus above to hold your seat.</p>
          )}

          {optionA && !done && (
            <a
              href="#talk"
              className="flex items-center gap-3 rounded-lg border border-input p-3 text-left transition-colors hover:border-foreground"
              onClick={() => track('advisor_card_click', { from: 'start' })}
            >
              <Image
                src={advisor.photo}
                alt={`${advisor.name}, ${advisor.role}`}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <span className="text-sm leading-snug">
                <span className="font-medium">Not ready to pick a date?</span>{' '}
                <span className="text-muted-foreground">Talk to {advisor.name} first.</span>
              </span>
            </a>
          )}

          {done && (
            <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="flex flex-col gap-1 text-[15px] leading-relaxed">
                {done.mode === 'call' ? (
                  <p>
                    <span className="font-medium">We&apos;ll call you, {name}.</span> {advisor.name} rings within a working day to talk through{' '}
                    {done.date} at {done.campus}. Nothing to prepare.
                  </p>
                ) : chosenStatus === 'waitlist' ? (
                  <p>
                    <span className="font-medium">You&apos;re on the list, {name}.</span> {done.campus} is full for {done.date}, so if a seat opens
                    you hear first.{optionA ? ' This isn\u2019t an enrolment and nothing is decided until you say so.' : ''} We&apos;ve texted you.
                  </p>
                ) : chosenStatus === 'interest' ? (
                  <p>
                    <span className="font-medium">Done, {name}.</span> You hear first when {done.date} dates are confirmed.
                    {optionA ? ' This isn\u2019t an enrolment and nothing is decided until you say so.' : ''} We&apos;ve texted you.
                  </p>
                ) : optionA ? (
                  <p>
                    <span className="font-medium">Seat held, {name}.</span> {done.campus}, {done.date}, yours for 7 days. This isn&apos;t an
                    enrolment and nothing is decided until you say so. We&apos;ve texted you. {advisor.name} will call to talk through the
                    loan, the gear and your start.
                  </p>
                ) : (
                  <p>
                    <span className="font-medium">Seat held, {name}.</span> {done.campus}, {done.date}. It&apos;s yours for 7 days. We&apos;ve texted
                    you, and a course advisor will call to sort the rest.
                  </p>
                )}
                <a href="#journey" className="text-sm font-medium underline underline-offset-4 hover:no-underline">
                  Meanwhile, see what your year looks like
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
