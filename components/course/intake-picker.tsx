'use client'

import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import { placeStatus, type Intake, type PlaceStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useBasket } from './basket-context'
import { useCourse } from './course-context'
import { LeadForm } from './lead-form'
import { Btn, Module, StatusPill } from './primitives'
import { PreStartInline } from './start-ahead'

function intakeStatus(intake: Intake): PlaceStatus {
  if (intake.unconfirmed) return 'interest'
  const lefts = intake.campuses?.map((c) => c.left) ?? []
  const max = Math.max(...lefts, 0)
  if (max === 0) return 'waitlist'
  return placeStatus(max)
}

export function IntakePicker() {
  const course = useCourse()
  const basket = useBasket()
  const [selected, setSelected] = useState(course.intakes[0].label)
  const [leadFor, setLeadFor] = useState<string | null>(null)
  const [leadDone, setLeadDone] = useState<string | null>(null)
  const intake = course.intakes.find((i) => i.label === selected) ?? course.intakes[0]

  return (
    <Module id="intakes" eyebrow="Sign up" title="Pick a date. Online or on campus." wide>
      <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-1" role="group" aria-label="Start dates">
        {course.intakes.map((i) => {
          const s = intakeStatus(i)
          const isSel = i.label === selected
          const online = i.campuses?.some((c) => c.name.startsWith('Online'))
          return (
            <button
              key={i.label}
              type="button"
              aria-pressed={isSel}
              onClick={() => {
                setSelected(i.label)
                setLeadFor(null)
                track('intake_select', { date: i.label })
              }}
              className={cn(
                'flex min-h-11 shrink-0 flex-col items-start gap-1.5 rounded-lg border-2 bg-card px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                isSel ? 'border-primary' : 'border-border hover:border-foreground/40',
              )}
            >
              <span className="font-display text-2xl font-bold leading-none">{i.label}</span>
              <span className="flex items-center gap-2">
                <StatusPill status={s} />
                {!i.unconfirmed && (
                  <span className="text-xs text-muted-foreground">{online ? 'Online' : 'On campus'}</span>
                )}
              </span>
            </button>
          )
        })}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <ul className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {intake.unconfirmed ? (
          <li className="p-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-base font-medium">All options</p>
                <p className="text-sm text-muted-foreground">Dates confirmed in the new year. Fees for this intake are not yet set.</p>
              </div>
              <StatusPill status="interest" />
              <Btn variant="outline" onClick={() => setLeadFor(leadFor ? null : 'all')} aria-expanded={leadFor === 'all'} className="w-full sm:w-auto">
                Tell me first
              </Btn>
            </div>
            {leadFor === 'all' && (
              <LeadForm
                title={`Tell me first when ${intake.label} dates are confirmed`}
                note="We use these details only to talk to you about this course."
                submitLabel="Tell me first"
                onSubmit={() => {
                  track('interest_register', { date: intake.label })
                  setLeadDone(intake.label)
                  setLeadFor(null)
                }}
                onCancel={() => setLeadFor(null)}
              />
            )}
            {leadDone === intake.label && (
              <p role="status" className="mt-3 rounded-lg bg-success px-4 py-3 text-sm text-success-foreground">
                We&apos;ll tell you first when {intake.label} dates are confirmed. We&apos;ve sent you a text.
              </p>
            )}
          </li>
        ) : (
          (intake.campuses ?? []).map((c) => {
            const status = placeStatus(c.left)
            const inBasket = basket.intake?.date === intake.label && basket.intake.mode === c.name
            const full = status === 'waitlist'
            return (
              <li key={c.name} className="p-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-base font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {full ? 'Full for this date' : `${c.left} places left · `}
                      {!full && <span className="font-medium text-foreground">Free</span>}
                    </p>
                  </div>
                  <StatusPill status={status} />
                  {full ? (
                    <Btn variant="outline" onClick={() => setLeadFor(leadFor === c.name ? null : c.name)} aria-expanded={leadFor === c.name} className="w-full sm:w-auto">
                      Join waitlist
                    </Btn>
                  ) : (
                    <Btn
                      variant={inBasket ? 'outline' : 'blue'}
                      aria-pressed={inBasket}
                      onClick={() => basket.setIntake(inBasket ? null : { date: intake.label, mode: c.name })}
                      className="w-full sm:w-auto"
                    >
                      {inBasket ? (
                        <>
                          <Check className="size-4" aria-hidden /> Chosen
                        </>
                      ) : (
                        <>
                          <Plus className="size-4" aria-hidden /> Choose this date
                        </>
                      )}
                    </Btn>
                  )}
                </div>
                {leadFor === c.name && (
                  <LeadForm
                    title={`Join the waitlist for ${c.name}, ${intake.label}`}
                    note="We use these details only to talk to you about this course."
                    submitLabel="Join waitlist"
                    onSubmit={() => {
                      track('waitlist_join', { date: intake.label, campus: c.name })
                      setLeadDone(c.name)
                      setLeadFor(null)
                    }}
                    onCancel={() => setLeadFor(null)}
                  />
                )}
                {leadDone === c.name && (
                  <p role="status" className="mt-3 rounded-lg bg-success px-4 py-3 text-sm text-success-foreground">
                    You&apos;re on the waitlist for {c.name}, {intake.label}. If a place opens, you hear first.
                  </p>
                )}
              </li>
            )
          })
        )}
      </ul>

      <PreStartInline />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Choosing a date holds nothing yet. Sign up and your place is held for 7 days while you sort StudyLink. No payment, ever, for
        February 2027 domestic places.
      </p>
    </Module>
  )
}
