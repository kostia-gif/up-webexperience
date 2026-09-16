'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { placeStatus, type Intake, type PlaceStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from './course-context'
import { LeadForm } from './lead-form'
import { Btn, Module, StatusPill } from './primitives'

const ACTION: Record<PlaceStatus, string> = {
  spaces: 'Hold a seat',
  filling: 'Hold a seat',
  waitlist: 'Join waitlist',
  interest: 'Tell me first',
}

type Row = { key: string; campus: string; status: PlaceStatus; left?: number }

function intakeStatus(intake: Intake): PlaceStatus {
  if (intake.unconfirmed) return 'interest'
  const lefts = intake.campuses?.map((c) => c.left) ?? []
  const max = Math.max(...lefts, 0)
  if (max === 0) return 'waitlist'
  return placeStatus(max)
}

export function IntakeBoard() {
  const course = useCourse()
  const [selected, setSelected] = useState(course.intakes[0].label)
  const [active, setActive] = useState<Row | null>(null)
  const [done, setDone] = useState<{ row: Row; date: string } | null>(null)
  const intake = course.intakes.find((i) => i.label === selected) ?? course.intakes[0]

  const rows: Row[] = intake.unconfirmed
    ? [{ key: 'all', campus: 'All campuses', status: 'interest' }]
    : (intake.campuses ?? []).map((c) => ({
        key: c.name,
        campus: c.name,
        status: placeStatus(c.left),
        left: c.left,
      }))

  function submit(row: Row) {
    const evt = row.status === 'waitlist' ? 'waitlist_join' : row.status === 'interest' ? 'interest_register' : 'seat_hold'
    track(evt, { date: intake.label, campus: row.campus })
    setDone({ row, date: intake.label })
    setActive(null)
  }

  return (
    <Module id="intakes" eyebrow="When can I start?" title="Pick a date, then a campus" wide>
      <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-1" role="group" aria-label="Start dates">
        {course.intakes.map((i) => {
          const s = intakeStatus(i)
          const isSel = i.label === selected
          return (
            <button
              key={i.label}
              type="button"
              aria-pressed={isSel}
              onClick={() => {
                setSelected(i.label)
                setActive(null)
                setDone(null)
                track('intake_select', { date: i.label })
              }}
              className={cn(
                'flex min-h-11 shrink-0 flex-col items-start gap-1.5 rounded-lg border-2 bg-card px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isSel ? 'border-primary' : 'border-border hover:border-foreground/40',
              )}
            >
              <span className="font-display text-2xl font-bold leading-none">{i.label}</span>
              <StatusPill status={s} />
            </button>
          )
        })}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <ul className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {rows.map((row) => (
          <li key={row.key} className="p-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-base font-medium">{row.campus}</p>
                <p className="text-sm text-muted-foreground">
                  {row.status === 'interest' && 'Dates confirmed in the new year'}
                  {row.status === 'waitlist' && 'Full for this date'}
                  {(row.status === 'spaces' || row.status === 'filling') && `${row.left} places left`}
                </p>
              </div>
              <StatusPill status={row.status} />
              <Btn
                variant={row.status === 'waitlist' || row.status === 'interest' ? 'outline' : 'blue'}
                onClick={() => setActive(active?.key === row.key ? null : row)}
                aria-expanded={active?.key === row.key}
                className="w-full sm:w-auto"
              >
                {ACTION[row.status]}
              </Btn>
            </div>

            {active?.key === row.key && (
              <LeadForm
                title={
                  row.status === 'waitlist'
                    ? `Join the waitlist for ${row.campus}, ${intake.label}`
                    : row.status === 'interest'
                      ? `Tell me first when ${intake.label} dates are confirmed`
                      : `Hold a seat at ${row.campus} for ${intake.label}`
                }
                note={
                  row.status === 'spaces' || row.status === 'filling'
                    ? 'A hold keeps your place for 7 days. No payment, no application. We text you to confirm and use these details only to talk to you about this course.'
                    : 'We use these details only to talk to you about this course.'
                }
                submitLabel={ACTION[row.status]}
                onSubmit={() => submit(row)}
                onCancel={() => setActive(null)}
              />
            )}

            {done?.row.key === row.key && done.date === intake.label && (
              <div role="status" aria-live="polite" className="mt-3 flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
                <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                <div className="text-sm leading-relaxed">
                  {done.row.status === 'waitlist' && (
                    <p>
                      <span className="font-medium">You&apos;re on the waitlist</span> for {done.row.campus}, {done.date}. We&apos;ve sent you a text. If a seat opens, you hear first.
                    </p>
                  )}
                  {done.row.status === 'interest' && (
                    <p>
                      <span className="font-medium">We&apos;ll tell you first</span> when {done.date} dates are confirmed. We&apos;ve sent you a text.
                    </p>
                  )}
                  {(done.row.status === 'spaces' || done.row.status === 'filling') && (
                    <p>
                      <span className="font-medium">Seat held</span> at {done.row.campus} for {done.date}. It&apos;s yours for 7 days. No payment, no application. We&apos;ve sent you a text.
                    </p>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-warning-foreground">Filling fast</span> means fewer than 5 places left on that date at that campus.{' '}
        <span className="font-medium text-foreground">Waitlist</span> means the intake is full and we contact you in order if a seat opens.
      </p>
    </Module>
  )
}
