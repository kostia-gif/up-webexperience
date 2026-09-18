'use client'

import { CalendarDays, Check, MessageSquare, Phone } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { Module } from '../primitives'
import { usePostgrad } from '../postgrad/context'
import { ProgramGuideCard } from '../postgrad/program-guide'
import { useStudyFrom } from '../postgrad/study-from'

export function PostgradStart() {
  const { pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const [selected, setSelected] = useState(pg.intakes[0].id)
  const intake = pg.intakes.find((i) => i.id === selected) ?? pg.intakes[0]
  const sp = pg.specialist
  const advisorHref = isIntl ? '#international' : '#specialist'
  const nextSlot = sp.slots[0]?.when

  return (
    <Module id="apply" eyebrow="Start here" title="Pick a date, then take the next step" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Most people take a while to decide, and that is completely normal. Pick the intake you are aiming for, then read the guide or
        talk it through with an advisor. Nothing is committed until you apply, and you can change your date any time.
      </p>

      <div role="group" aria-label="Start dates" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pg.intakes.map((i) => {
          const sel = i.id === selected
          return (
            <button
              key={i.id}
              type="button"
              aria-pressed={sel}
              onClick={() => {
                setSelected(i.id)
                track('intake_select', { date: i.label })
              }}
              className={cn(
                'flex min-h-24 flex-col items-start justify-between gap-2 rounded-lg border-2 bg-card p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                sel ? 'border-primary' : 'border-border hover:border-foreground/40',
              )}
            >
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <CalendarDays className="size-3.5" aria-hidden /> {i === pg.intakes[0] ? 'Next intake' : 'Intake'}
              </span>
              <span className="font-display text-2xl leading-none">{i.label}</span>
              <span className="text-xs text-muted-foreground">Starts {i.start}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span>Applications for {intake.label} close {intake.applyBy}</span>
        <span aria-hidden>·</span>
        <span>Census {intake.census} — withdraw before it and pay nothing</span>
      </p>

      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
        <ProgramGuideCard />

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
              <MessageSquare className="size-5" aria-hidden />
            </span>
            <div className="flex flex-col">
              <p className="font-medium leading-tight">Book a time to meet an advisor</p>
              <p className="text-sm text-muted-foreground">15 minutes, phone or video · no obligation</p>
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">{sp.blurb}</p>
          <ul className="flex flex-col gap-2">
            {sp.covers.slice(0, 3).map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={advisorHref}
              onClick={() => track('start_book_advisor', { intake: intake.label })}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {nextSlot ? `See times — next is ${nextSlot}` : 'See available times'}
            </a>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4 text-primary" aria-hidden /> Or call {sp.phone}, {sp.hours}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Ready to apply now?{' '}
        <a href={advisorHref} className="font-medium text-primary underline underline-offset-4">
          Mention it when you book
        </a>{' '}
        and an advisor sets it up with you — it takes about two minutes and needs no documents yet.
      </p>
    </Module>
  )
}
