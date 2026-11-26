'use client'

import { Check, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { EnquiryRoute } from './enquiry-form'
import { RoutingQuestion } from './routing-question'
import { Avatar } from './ui'

export type StartIntake = { label: string; tag: string; status: 'open' | 'filling' | 'waitlist' | 'later' }
export type StartGroup = { legend: string; items: { name: string; note?: string }[]; icon?: 'map' | 'none' }
export type StartAdvisor = { name: string; role: string; photo?: string; href: string }

const STATUS_LABEL = { open: 'Places available', filling: 'Filling', waitlist: 'Waitlist', later: 'Register interest' }

const INPUT = 'min-h-11 w-full rounded-md border border-input bg-background px-3 text-[15px] text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary'

/**
 * The Option A "Pick your start date" band: a full-bleed brand-colour section
 * straight after the hero, large date cards, then a white panel with the
 * campus or study-mode choice, a two-field form, and the choice to enrol,
 * enquire first, or be called. Prototype only; nothing is sent.
 */
export function StartSection({
  intakes,
  groups,
  advisor,
  enquiryRoutes,
  holdLabel = 'Hold my place for',
  intro,
  confirmHold,
  journeyHref = '#journey',
  dense,
}: {
  intakes: StartIntake[]
  groups: StartGroup[]
  advisor: StartAdvisor
  enquiryRoutes?: EnquiryRoute[]
  holdLabel?: string
  intro: string
  confirmHold: string
  journeyHref?: string
  dense?: boolean
}) {
  const [date, setDate] = useState(intakes[0].label)
  const [picked, setPicked] = useState<Record<string, string>>({})
  const [mode, setMode] = useState<'enrol' | 'enquire'>('enrol')
  const [route, setRoute] = useState(enquiryRoutes?.[0]?.id ?? '')
  const [name, setName] = useState('')
  const [done, setDone] = useState<'hold' | 'call' | 'enquire' | null>(null)

  const intake = intakes.find((i) => i.label === date) ?? intakes[0]
  const ready = groups.every((g) => picked[g.legend])
  const chosenRoute = enquiryRoutes?.find((r) => r.id === route) ?? enquiryRoutes?.[0]
  const summary = groups.map((g) => picked[g.legend]).filter(Boolean).join(', ')

  return (
    <section id="start" aria-labelledby="start-title" className="scroll-mt-20 bg-coral text-coral-foreground">
      <div className={cn('mx-auto flex max-w-[960px] flex-col gap-8 px-6', dense ? 'py-8 md:py-10' : 'py-10 md:py-14')}>
        <header className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide opacity-80">Takes about 30 seconds</p>
          <h2 id="start-title" className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-5xl">
            Pick your start date
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-pretty opacity-90">{intro}</p>
        </header>

        <div role="group" aria-label="Start dates" className="grid gap-3 sm:grid-cols-3">
          {intakes.map((i) => {
            const sel = i.label === date
            return (
              <button
                key={i.label}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setDate(i.label)
                  setDone(null)
                }}
                className={cn(
                  'flex min-h-24 flex-col items-start justify-between gap-3 rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-foreground',
                  sel ? 'border-coral-foreground bg-background text-foreground' : 'border-coral-foreground/30 bg-coral-foreground/10 hover:border-coral-foreground/70',
                )}
              >
                <span className="text-xs font-medium uppercase tracking-wide opacity-80">{i.tag}</span>
                <span className="font-display text-3xl font-bold leading-none">{i.label}</span>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none',
                    sel
                      ? i.status === 'open'
                        ? 'border-success-border bg-success text-success-foreground'
                        : i.status === 'filling'
                          ? 'border-warning-border bg-warning text-warning-foreground'
                          : 'border-border bg-muted text-muted-foreground'
                      : 'border-coral-foreground/40 bg-transparent text-coral-foreground',
                  )}
                >
                  {STATUS_LABEL[i.status]}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-5 rounded-lg bg-background p-5 text-foreground md:p-6">
          {groups.map((g) => (
            <fieldset key={g.legend} className="flex flex-col gap-3">
              <legend className="mb-3 flex items-center gap-2 text-base font-medium">
                {g.icon !== 'none' && <MapPin className="size-5 text-primary" aria-hidden />} {g.legend}
              </legend>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => {
                  const sel = picked[g.legend] === it.name
                  return (
                    <button
                      key={it.name}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => {
                        setPicked((p) => ({ ...p, [g.legend]: it.name }))
                        setDone(null)
                      }}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 rounded-md border-2 px-4 text-[15px] font-medium transition-colors',
                        sel ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-foreground',
                      )}
                    >
                      {it.name}
                      {it.note && <span className={cn('text-xs font-normal', sel ? 'opacity-80' : 'text-muted-foreground')}>{it.note}</span>}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}

          {enquiryRoutes && !done && (
            <div role="tablist" aria-label="Enrol or enquire" className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
              {(
                [
                  ['enrol', 'Enrol'],
                  ['enquire', 'Enquire first'],
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
          )}

          {!done && mode === 'enrol' && (ready ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                setDone('hold')
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
                  First name
                  <input required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
                  Mobile
                  <input required type="tel" autoComplete="tel" className={INPUT} />
                </label>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-coral px-6 text-[15px] font-medium text-coral-foreground hover:bg-coral-hover">
                  {holdLabel} {date}
                </button>
                <button type="button" onClick={() => setDone('call')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-[15px] font-medium hover:border-foreground">
                  <Phone className="size-4" aria-hidden /> Call me instead
                </button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                We text you within the hour, then {advisor.name} calls to confirm the details. Your number is used only to contact you about this course.
              </p>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">Choose an option above to hold your place.</p>
          ))}

          {!done && mode === 'enquire' && chosenRoute && enquiryRoutes && (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                setDone('enquire')
              }}
            >
              <RoutingQuestion question="Which sounds most like you?" options={enquiryRoutes} value={route} onChange={setRoute} compact />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
                  First name
                  <input required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
                  Email
                  <input required type="email" autoComplete="email" className={INPUT} />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
                Your question (optional)
                <textarea rows={3} className={cn(INPUT, 'min-h-20 py-2')} />
              </label>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-md bg-coral px-6 text-[15px] font-medium text-coral-foreground hover:bg-coral-hover">
                Send enquiry
              </button>
            </form>
          )}

          {!done && (
            <a href={advisor.href} className="flex items-center gap-3 rounded-lg border border-input p-3 text-left transition-colors hover:border-foreground">
              <Avatar name={advisor.name} photo={advisor.photo} className="size-12" />
              <span className="text-sm leading-snug">
                <span className="font-medium">Not ready to pick a date?</span> <span className="text-muted-foreground">Talk to {advisor.name}, {advisor.role}, first.</span>
              </span>
            </a>
          )}

          {done && (
            <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
                {done === 'hold' && (
                  <p>
                    <span className="font-medium">Place held{name ? `, ${name}` : ''}.</span> {summary ? `${summary}, ` : ''}
                    {date}. {confirmHold}
                  </p>
                )}
                {done === 'call' && (
                  <p>
                    <span className="font-medium">We will call you{name ? `, ${name}` : ''}.</span> {advisor.name} will phone within one working day to talk through {date}
                    {summary ? ` at ${summary}` : ''}.
                  </p>
                )}
                {done === 'enquire' && chosenRoute && (
                  <>
                    <p>{chosenRoute.confirmation}</p>
                    <ol className="flex flex-col gap-1 text-sm">
                      {chosenRoute.next.map((n, i) => (
                        <li key={n} className="flex gap-2">
                          <span className="tabular-nums opacity-70">{i + 1}.</span>
                          {n}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                <a href={journeyHref} className="text-sm font-medium underline underline-offset-4 hover:no-underline">
                  Meanwhile, see what the course looks like
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
