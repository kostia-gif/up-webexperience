'use client'

import { BookmarkCheck, Check, Flame, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { intakeStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { Btn, Field, inputClass, Module, StatusPill } from '../primitives'
import { usePostgrad } from './context'
import { useStudyFrom } from './study-from'

type Panel = 'apply' | 'save' | null

export function ApplyBoard() {
  const { pg, money } = usePostgrad()
  const { isIntl, country } = useStudyFrom()
  const intl = pg.international
  const [selected, setSelected] = useState(pg.intakes[0].id)
  const [panel, setPanel] = useState<Panel>(null)
  const [done, setDone] = useState<{ id: string; kind: 'apply' | 'save' } | null>(null)
  const [pace, setPace] = useState<'Full-time' | 'Part-time'>('Part-time')
  const intake = pg.intakes.find((i) => i.id === selected) ?? pg.intakes[0]
  const status = intakeStatus(intake.left, intake.capacity)
  const taken = intake.capacity - intake.left
  const pct = Math.round((taken / intake.capacity) * 100)
  const open = panel !== null
  const isDone = done?.id === intake.id

  return (
    <Module id="apply" eyebrow="Apply" title="Hold a place in a trimester" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        {isIntl && intl ? (
          <>
            An application is non-binding. A {money(intl.fees.deposit)} deposit holds your place while the international team confirms your degree, English
            evidence and any credit; it is refunded in full if you withdraw before the census date. If you plan to study onshore, allow at least eight
            weeks before the trimester for a student visa.
          </>
        ) : (
          <>
            An application is non-binding. It holds a place while we confirm your eligibility and any credit, and nothing is charged before the census
            date. Places are capped by supervised placement capacity, not by marketing.
          </>
        )}
      </p>

      <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-1" role="group" aria-label="Intakes">
        {pg.intakes.map((i) => {
          const s = intakeStatus(i.left, i.capacity)
          const isSel = i.id === selected
          return (
            <button
              key={i.id}
              type="button"
              aria-pressed={isSel}
              onClick={() => {
                setSelected(i.id)
                setPanel(null)
                track('intake_select', { date: i.label })
              }}
              className={cn(
                'flex min-h-11 shrink-0 flex-col items-start gap-1.5 rounded-lg border-2 bg-card px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isSel ? 'border-primary' : 'border-border hover:border-foreground/40',
              )}
            >
              <span className="font-display text-xl leading-none">{i.label}</span>
              <span className="text-xs text-muted-foreground">Starts {i.start}</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusPill status={s} />
                {i.earlybirdDays !== undefined && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2 py-0.5 text-[11px] font-medium text-coral">
                    <Sparkles className="size-3" aria-hidden />
                    Scholarship
                  </span>
                )}
              </div>
            </button>
          )
        })}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <div className={cn('mt-6 rounded-lg border bg-card', status === 'filling' ? 'border-warning-border' : 'border-border')}>
        {status === 'filling' && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-t-lg border-b border-warning-border bg-warning px-5 py-3 text-warning-foreground">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <Flame className="size-4" aria-hidden />
              Filling fast: {taken} of {intake.capacity} places taken
            </p>
            <div className="flex min-w-40 flex-1 items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-warning-foreground/15" role="presentation">
                <div className="h-full rounded-full bg-warning-foreground" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs font-medium tabular-nums">{intake.left} left</span>
            </div>
            <p className="text-xs">Places are capped by supervised placement capacity. Save a space in 30 seconds while you decide.</p>
          </div>
        )}

        {intake.earlybirdDays !== undefined && (
          <div
            className={cn(
              'flex flex-wrap items-center gap-x-2 gap-y-1 px-5 py-3 text-coral-foreground',
              status === 'filling' ? 'border-t border-coral/40 bg-coral' : 'rounded-t-lg bg-coral',
            )}
          >
            <Sparkles className="size-4" aria-hidden />
            <p className="text-sm font-medium">
              Early-bird scholarship expires in {intake.earlybirdDays} {intake.earlybirdDays === 1 ? 'day' : 'days'}
            </p>
            <span className="text-xs opacity-90">Apply for {intake.label} before the deadline to have it applied automatically.</span>
          </div>
        )}

        <dl className="grid gap-4 p-5 sm:grid-cols-4">
          <Item k="Trimester starts" v={intake.start} />
          <Item k="Census date" v={intake.census} sub="Withdraw before this, pay nothing" />
          <Item k="Residential school" v={intake.residential} />
          <Item k="Apply by" v={intake.applyBy} sub={`${intake.left} of ${intake.capacity} places left`} />
        </dl>

        {!isDone && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
              {status === 'waitlist'
                ? 'This intake is full. Join the waitlist and we contact you in order.'
                : status === 'filling'
                  ? 'Not ready to apply? Save a space with just your name and email. We hold it for 7 days, no obligation.'
                  : 'Takes two minutes. No documents needed yet.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {status === 'filling' && (
                <Btn
                  variant="coral"
                  aria-expanded={panel === 'save'}
                  onClick={() => {
                    setPanel((p) => (p === 'save' ? null : 'save'))
                    track('save_space_open', { intake: intake.label })
                  }}
                >
                  <BookmarkCheck className="size-4" aria-hidden />
                  Save a space
                </Btn>
              )}
              <Btn
                variant={status === 'waitlist' ? 'outline' : status === 'filling' ? 'outline' : 'coral'}
                aria-expanded={panel === 'apply'}
                onClick={() => setPanel((p) => (p === 'apply' ? null : 'apply'))}
              >
                {status === 'waitlist' ? 'Join the waitlist' : `Apply for ${intake.label}`}
              </Btn>
            </div>
          </div>
        )}

        {panel === 'save' && !isDone && (
          <form
            className="flex flex-col gap-4 border-t border-border bg-muted p-5"
            onSubmit={(e) => {
              e.preventDefault()
              track('save_space_submit', { intake: intake.label })
              setDone({ id: intake.id, kind: 'save' })
              setPanel(null)
            }}
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Field label="First name" id="save-first">
                <input id="save-first" required autoComplete="given-name" className={inputClass} />
              </Field>
              <Field label="Email" id="save-email">
                <input id="save-email" required type="email" autoComplete="email" className={inputClass} />
              </Field>
              <Btn type="submit" variant="coral" className="min-h-11">
                Hold my space
              </Btn>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We hold one of the {intake.left} remaining places in {intake.label} for 7 days and email you a link to finish applying. No documents, no
              payment, no obligation. If you do nothing, the hold simply lapses.
            </p>
          </form>
        )}

        {panel === 'apply' && !isDone && (
          <form
            className="flex flex-col gap-4 border-t border-border bg-muted p-5"
            onSubmit={(e) => {
              e.preventDefault()
              track('application_submit', { intake: intake.label, pace })
              setDone({ id: intake.id, kind: 'apply' })
              setPanel(null)
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="First name" id="app-first">
                <input id="app-first" required autoComplete="given-name" className={inputClass} />
              </Field>
              <Field label="Last name" id="app-last">
                <input id="app-last" required autoComplete="family-name" className={inputClass} />
              </Field>
              <Field label="Email" id="app-email">
                <input id="app-email" required type="email" autoComplete="email" className={inputClass} />
              </Field>
              <Field label="Mobile" id="app-mobile">
                <input id="app-mobile" required type="tel" autoComplete="tel" className={inputClass} />
              </Field>
              <fieldset className="flex flex-col gap-1.5">
                <legend className="text-xs font-medium text-muted-foreground">Preferred pace</legend>
                <div className="flex gap-2">
                  {(['Full-time', 'Part-time'] as const).map((p) => (
                    <label
                      key={p}
                      className={cn(
                        'flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-md border text-sm font-medium',
                        pace === p ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background',
                      )}
                    >
                      <input type="radio" name="pace" value={p} checked={pace === p} onChange={() => setPace(p)} className="sr-only" />
                      {p}
                    </label>
                  ))}
                </div>
              </fieldset>
              {isIntl && intl ? (
                <Field label="Where you plan to study" id="app-mode">
                  <select id="app-mode" className={inputClass} defaultValue={intl.modes[0].id}>
                    {intl.modes.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : (
                <Field label="Nearest residential school city" id="app-city">
                  <select id="app-city" className={inputClass} defaultValue={pg.residential.cities[0]}>
                    {pg.residential.cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              )}
              {isIntl && (
                <Field label="Country" id="app-country">
                  <input id="app-country" className={inputClass} defaultValue={country?.code === '__other' ? '' : country?.name} autoComplete="country-name" />
                </Field>
              )}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We use these details to assess your application and to talk to you about this course.{' '}
              {isIntl
                ? 'The international team will email within one working day to arrange a video call in your time zone and confirm your documents. No deposit is taken until you accept a place.'
                : 'A course specialist will call within one working day to confirm your documents.'}{' '}
              You can withdraw at any time before census with nothing owed.
            </p>
            <div className="flex flex-wrap gap-2">
              <Btn type="submit" variant="coral">
                Submit application
              </Btn>
              <Btn variant="ghost" onClick={() => setPanel(null)}>
                Cancel
              </Btn>
            </div>
          </form>
        )}

        {isDone && done?.kind === 'save' && (
          <div role="status" aria-live="polite" className="flex gap-3 border-t border-success-border bg-success p-5 text-success-foreground">
            <BookmarkCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
              <p className="font-display text-2xl leading-none">Space saved for 7 days.</p>
              <p>
                One place in {intake.label} is held in your name until {holdUntil()}. We have emailed you a link to finish the application when you are
                ready; it takes about two minutes and needs no documents yet.
              </p>
              <div className="flex flex-wrap gap-2">
                <Btn
                  variant="blue"
                  size="sm"
                  onClick={() => {
                    setDone(null)
                    setPanel('apply')
                  }}
                >
                  Finish applying now
                </Btn>
                <a href={isIntl ? '#international' : '#specialist'} className="inline-flex min-h-9 items-center text-sm font-medium underline underline-offset-4">
                  {isIntl ? 'Talk to the international team first' : 'Talk to a specialist first'}
                </a>
              </div>
            </div>
          </div>
        )}

        {isDone && done?.kind === 'apply' && (
          <div role="status" aria-live="polite" className="flex gap-3 border-t border-success-border bg-success p-5 text-success-foreground">
            <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="flex flex-col gap-1 text-[15px] leading-relaxed">
              <p className="font-display text-2xl leading-none">Application received. Your place is held.</p>
              <p>
                {intake.label}, starting {intake.start}. {isIntl ? 'The international team will email within one working day to arrange a video call and confirm your transcript, English evidence and any credit.' : 'A course specialist will call within one working day to confirm your transcript and any credit.'}{' '}
                Nothing is charged before the {intake.census} census date, and you can withdraw before then with nothing owed.
              </p>
              <p className="text-sm">
                {isIntl ? 'We have emailed you a copy, the international student guide and the unit outlines.' : 'We have emailed you a copy, the FEE-HELP information booklet and the unit outlines.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Prefer to talk first?{' '}
        <a href={isIntl ? '#international' : '#specialist'} className="font-medium text-primary underline underline-offset-4">
          {isIntl ? 'Book a call with the international team' : 'Book a 15-minute call with a course specialist'}
        </a>
        .
      </p>
    </Module>
  )
}

function holdUntil() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
}

function Item({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-muted-foreground">{k}</dt>
      <dd className="text-base font-medium leading-snug">{v}</dd>
      {sub && <dd className="text-xs text-muted-foreground">{sub}</dd>}
    </div>
  )
}
