'use client'

import Image from 'next/image'
import { ArrowRight, Check, FileText, MessageSquareQuote } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { formatNZD } from '@/lib/course'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from './course-context'
import { CvBuilder } from './cv-builder'
import { Btn } from './primitives'

export function Journey({ dayOne }: { dayOne?: ReactNode }) {
  const { kit, stages, outcomes, copy, cv } = useCourse()
  const [active, setActive] = useState(0)
  const [cvOpen, setCvOpen] = useState(false)
  const cvBtnRef = useRef<HTMLSpanElement>(null)
  const current = stages[active]
  const stepLabels = ['Day 1', ...stages.map((s) => s.label.replace('By ', '').replace(/^w/, 'W')), 'First job']

  return (
    <section id="journey" aria-labelledby="journey-title" className="hairline-t scroll-mt-20 border-border">
      <div className="mx-auto max-w-[960px] px-6 pt-8 md:pt-12">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Your journey with us</p>
          <h2 id="journey-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
            Day 1 to first job
          </h2>
        </header>

        <ol className="mt-6 flex items-center gap-1 overflow-x-auto pb-1 text-sm font-medium scrollbar-none" aria-label="Journey steps">
          {stepLabels.map((label, i) => (
            <li key={label} className="flex shrink-0 items-center gap-1">
              <span
                className={cn(
                  'inline-flex min-h-8 items-center gap-1.5 rounded-full px-3',
                  i === 0 ? 'bg-foreground text-background' : 'text-muted-foreground',
                )}
              >
                <span
                  aria-hidden
                  className={cn('size-1.5 rounded-full', i === 0 ? 'bg-coral' : 'bg-border')}
                />
                {label}
              </span>
              {i < stepLabels.length - 1 && <span aria-hidden className="h-px w-5 bg-border" />}
            </li>
          ))}
        </ol>
      </div>

      {dayOne ??
        (kit && (
          <div className="mx-auto mt-6 max-w-[1200px] bg-foreground text-background md:mt-8 md:px-6">
            <div className="flex flex-col md:grid md:grid-cols-12 md:items-center">
              <div className="relative aspect-[4/3] md:col-span-7 md:col-start-1 md:row-start-1 md:aspect-auto md:min-h-[520px]">
                <Image src={kit.image} alt={kit.imageAlt} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
                <span className="absolute left-6 top-6 inline-flex items-center rounded-full bg-coral px-3 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-coral-foreground">
                  Yours to keep
                </span>
              </div>
              <div className="relative z-10 flex flex-col gap-5 px-6 py-10 md:col-span-6 md:col-start-7 md:row-start-1 md:-ml-16 md:bg-foreground md:px-10 md:py-12">
                <p className="text-xs font-medium uppercase tracking-wide text-background/70">{copy.kitStep}</p>
                <h3 className="font-display text-(length:--display-xl) font-bold uppercase leading-[0.9] tracking-(--display-tracking) text-balance">
                  {copy.kitTitle}
                </h3>
                <p className="max-w-md text-lg leading-relaxed text-pretty text-background/85">{kit.lede}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {kit.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coral text-coral-foreground">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-background/20 pt-4 text-sm text-background/70">
                  Worth about {formatNZD(kit.value)}. Included in the fee, nothing to buy before you start.
                </p>
              </div>
            </div>
          </div>
        ))}

      <div id="do" className="mx-auto max-w-[720px] scroll-mt-20 px-6 py-8 md:py-12">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Steps 2 to 4 · Your skills, stage by stage</p>
          <h3 className="text-lg font-medium">{copy.skillsTitle}</h3>
        </div>

        <div role="tablist" aria-label="Course stage" className="mt-5 flex gap-1 border-b border-border">
          {stages.map((s, i) => {
            const selected = i === active
            return (
              <button
                key={s.label}
                role="tab"
                type="button"
                id={`stage-tab-${i}`}
                aria-selected={selected}
                aria-controls="stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  setActive(i)
                  track('stage_tab', { index: i })
                }}
                onKeyDown={(e) => {
                  const n = stages.length
                  let next = active
                  if (e.key === 'ArrowRight') next = (active + 1) % n
                  else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n
                  else return
                  e.preventDefault()
                  setActive(next)
                  document.getElementById(`stage-tab-${next}`)?.focus()
                }}
                className={cn(
                  '-mb-px min-h-11 border-b-2 px-3 text-sm font-medium transition-colors',
                  selected ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        <ul id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className="mt-5 flex flex-col divide-y divide-border">
          {current.items.map((item) => (
            <li key={item.can} className="flex flex-col gap-3 py-4">
              <div className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium leading-snug">{item.can}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.means}</p>
                </div>
              </div>
              {item.quote?.approvedOn && (
                <blockquote className="ml-8 border-l-2 border-primary pl-4">
                  <p className="text-sm italic leading-relaxed">&ldquo;{item.quote.text}&rdquo;</p>
                  <footer className="mt-1 text-xs text-muted-foreground">
                    {item.quote.role}, {item.quote.venue}, {item.quote.city}
                  </footer>
                </blockquote>
              )}
            </li>
          ))}
        </ul>

        {current.voice?.consent && (
          <figure
            key={current.label}
            className="mt-6 flex flex-col gap-4 rounded-lg bg-primary px-5 py-5 text-primary-foreground md:px-6"
          >
            <figcaption className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
              <MessageSquareQuote className="size-4" aria-hidden />
              Student voice · {current.label.replace('By ', '')}
            </figcaption>
            <blockquote className="font-display text-2xl font-bold leading-tight text-balance sm:text-3xl">
              &ldquo;{current.voice.text}&rdquo;
            </blockquote>
            <p className="flex flex-col gap-0.5 text-sm">
              <span className="font-medium">
                {current.voice.name}, {current.voice.campus}
              </span>
              <span className="text-primary-foreground/75">{current.voice.surveyed}</span>
            </p>
          </figure>
        )}

        {cv ? (
          <div id="firstjob" className="mt-6 flex flex-col gap-5 rounded-lg bg-foreground px-5 py-6 text-background scroll-mt-20 md:px-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-background/70">Step 5 · First job</p>
              <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-balance sm:text-3xl">
                See the CV you&apos;ll walk out with
              </h3>
              <p className="max-w-lg text-[15px] leading-relaxed text-pretty text-background/85">{cv.blurb}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span ref={cvBtnRef} className="inline-flex" tabIndex={-1}>
                <Btn
                  variant="coral"
                  onClick={() => {
                    setCvOpen(true)
                    track('journey_view_cv_click')
                  }}
                >
                  <FileText className="size-4" aria-hidden /> View my CV
                </Btn>
              </span>
              {outcomes.stat && (
                <a
                  href="#outcomes"
                  onClick={() => track('journey_first_job_click')}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-background/85 underline-offset-4 hover:underline"
                >
                  {outcomes.stat.value} hired within six months
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              )}
            </div>
            <CvBuilder open={cvOpen} onClose={() => setCvOpen(false)} returnFocusTo={cvBtnRef.current?.querySelector('button') ?? null} />
          </div>
        ) : (
          outcomes.stat && (
            <a
              href="#outcomes"
              onClick={() => track('journey_first_job_click')}
              className="mt-4 flex min-h-12 items-center justify-between gap-4 rounded-lg border border-border px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary"
            >
              <span>
                Step 5 · First job: {outcomes.stat.value} hired within six months
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden />
            </a>
          )
        )}
      </div>
    </section>
  )
}
