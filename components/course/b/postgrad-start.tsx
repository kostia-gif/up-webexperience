'use client'

import { CalendarDays, Download, FileText } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { LeadForm } from '../lead-form'
import { Btn, Module } from '../primitives'
import { usePostgrad } from '../postgrad/context'
import { useStudyFrom } from '../postgrad/study-from'

/**
 * "Pick a date" board, matching the NZMA / Elite / Yoobee start step. Choose an
 * intake, then either grab the guide or talk it through — no pressure to apply.
 * The guide is a single slim action rather than a full content list.
 */
export function PostgradStart() {
  const { pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const [selected, setSelected] = useState(pg.intakes[0].id)
  const intake = pg.intakes.find((i) => i.id === selected) ?? pg.intakes[0]
  const talkHref = isIntl ? '#international' : '#specialist'
  const guide = pg.programGuide
  const [guideOpen, setGuideOpen] = useState(false)
  const [guideSent, setGuideSent] = useState(false)

  return (
    <Module id="apply" eyebrow="Start here" title="Pick the date you're aiming for" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Most people take a while to decide, and that is completely normal. Choose the intake you are aiming for — nothing is committed
        until you apply, and you can change your date any time.
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

      {guide && (
        <div id="guide" className="mt-8 flex scroll-mt-24 flex-col gap-4 rounded-lg border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                <FileText className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col">
                <p className="font-medium leading-tight">Prefer to read first? Get the course guide</p>
                <p className="text-sm text-muted-foreground">{guide.fileLabel} · emailed to you, no obligation</p>
              </div>
            </div>
            {!guideOpen && !guideSent && (
              <Btn
                variant="blue"
                onClick={() => {
                  setGuideOpen(true)
                  track('guide_open')
                }}
              >
                <Download className="size-4" aria-hidden /> Get the guide
              </Btn>
            )}
          </div>

          {guideSent && (
            <p role="status" aria-live="polite" className="text-[15px] text-success-foreground">
              On its way to your inbox. Check your spam folder if it is not there in a few minutes.
            </p>
          )}

          {guideOpen && !guideSent && (
            <LeadForm
              title="Where should we send it?"
              note="We email you the guide and use these details only to talk to you about this course. No spam, unsubscribe any time."
              submitLabel="Email me the guide"
              onSubmit={() => {
                track('guide_request')
                setGuideSent(true)
                setGuideOpen(false)
              }}
              onCancel={() => setGuideOpen(false)}
            />
          )}
        </div>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        Not sure yet?{' '}
        <a href={talkHref} className="font-medium text-primary underline underline-offset-4">
          Talk it through with a specialist
        </a>{' '}
        — 15 minutes, no pressure.
      </p>
    </Module>
  )
}
