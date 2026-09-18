'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { placeStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { useCourse } from './course-context'
import { LeadForm } from './lead-form'
import { Btn, Module, Segmented, StatusPill } from './primitives'

export function TryIt({ idBase = 'tryit' }: { idBase?: string } = {}) {
  const course = useCourse()
  const tryIt = course.tryIt ?? []
  const modes = tryIt.map((m) => m.mode)
  const [mode, setMode] = useState(modes[0])
  const [booking, setBooking] = useState<string | null>(null)
  const [booked, setBooked] = useState<string | null>(null)
  const current = tryIt.find((m) => m.mode === mode) ?? tryIt[0]
  if (!current) return null

  return (
    <Module id={idBase} eyebrow="See it before you decide" title="All free. Bring a mate or a parent.">
      <Segmented
        items={modes}
        value={mode}
        label="Ways to try it"
        idPrefix={idBase}
        onChange={(v) => {
          setMode(v)
          setBooking(null)
          setBooked(null)
          track('tryit_mode', { mode: v })
        }}
      />
      <div id={`${idBase}-panel`} role="tabpanel" className="mt-6">
        <p className="text-[15px] leading-relaxed text-pretty">{current.blurb}</p>

        {booked ? (
          <div role="status" aria-live="polite" className="mt-4 flex gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
            <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
              <p className="font-display text-2xl font-bold uppercase leading-none">Booked: {booked}</p>
              <p>Details have been texted to you.</p>
              <p>
                Bringing someone?{' '}
                <button
                  type="button"
                  onClick={() => track('tryit_plus_one')}
                  className="font-medium underline underline-offset-4 hover:no-underline"
                >
                  Reply with their name
                </button>{' '}
                and we&apos;ll add them.
              </p>
            </div>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
            {current.slots.map((slot) => {
              const status = slot.left !== undefined ? placeStatus(slot.left) : null
              const isOpen = booking === slot.when
              return (
                <li key={slot.when} className="p-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="text-base font-medium">{slot.when}</p>
                      <p className="text-sm text-muted-foreground">{slot.what}</p>
                    </div>
                    {slot.left !== undefined && (
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        {slot.left} left
                        {status === 'filling' && <StatusPill status="filling" />}
                      </span>
                    )}
                    <Btn
                      variant="blue"
                      aria-expanded={isOpen}
                      onClick={() => setBooking(isOpen ? null : slot.when)}
                      className="w-full sm:w-auto"
                    >
                      Book
                    </Btn>
                  </div>
                  {isOpen && (
                    <LeadForm
                      title={`Book: ${slot.when}`}
                      note="We text you the details and a reminder the day before. We use these details only to talk to you about this course."
                      submitLabel="Book it"
                      onSubmit={() => {
                        track('tryit_book', { mode, slot: slot.when })
                        setBooked(slot.when)
                        setBooking(null)
                      }}
                      onCancel={() => setBooking(null)}
                    />
                  )}
                </li>
              )
            })}
            <li className="flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="text-sm text-muted-foreground">None of these work?</p>
              <Btn variant="outline" className="w-full sm:w-auto">
                Pick another time
              </Btn>
            </li>
          </ul>
        )}
      </div>
    </Module>
  )
}
