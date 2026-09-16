'use client'

import { Check, Phone } from 'lucide-react'
import { useState } from 'react'
import { placeStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { LeadForm } from '../lead-form'
import { Btn, Module, StatusPill } from '../primitives'
import { usePostgrad } from './context'

export function BookSpecialist() {
  const { pg } = usePostgrad()
  const [booking, setBooking] = useState<string | null>(null)
  const [booked, setBooked] = useState<string | null>(null)
  const sp = pg.specialist

  return (
    <Module id="specialist" eyebrow="Talk to a specialist" title="Book a 15-minute call" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-5">
          <p className="text-[15px] leading-relaxed text-pretty">{sp.blurb}</p>
          <ul className="flex flex-col gap-2">
            {sp.covers.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px] leading-snug">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 rounded-lg bg-muted p-4 text-sm">
            <p className="flex items-center gap-2 font-medium">
              <Phone className="size-4 text-primary" aria-hidden /> Or call {sp.phone}
            </p>
            <p className="text-muted-foreground">{sp.hours}. Free from landlines and mobiles in Australia.</p>
          </div>
        </div>

        <div className="md:col-span-7">
          {booked ? (
            <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
                <p className="font-display text-2xl leading-none">Booked: {booked}</p>
                <p>We have texted you a calendar invite. Have your transcript handy if you want credit assessed on the call.</p>
                <p className="text-sm">
                  Want a head start?{' '}
                  <a href="#eligibility" className="font-medium underline underline-offset-4 hover:no-underline">
                    Run the eligibility check
                  </a>{' '}
                  and we will pick up from your result.
                </p>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {sp.slots.map((slot) => {
                const status = placeStatus(slot.left)
                const isOpen = booking === slot.when
                return (
                  <li key={slot.when} className="p-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="text-base font-medium">{slot.when}</p>
                        <p className="text-sm text-muted-foreground">15 minutes, phone or video</p>
                      </div>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        {slot.left} left
                        {status === 'filling' && <StatusPill status="filling" />}
                      </span>
                      <Btn variant="blue" aria-expanded={isOpen} onClick={() => setBooking(isOpen ? null : slot.when)} className="w-full sm:w-auto">
                        Book
                      </Btn>
                    </div>
                    {isOpen && (
                      <LeadForm
                        title={`Book: ${slot.when}`}
                        note="We text you a calendar invite and call you at this time. We use these details only to talk to you about this course."
                        submitLabel="Book the call"
                        onSubmit={() => {
                          track('specialist_book', { slot: slot.when })
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
                <Btn variant="outline" className="w-full sm:w-auto" onClick={() => track('specialist_callback')}>
                  Request a callback
                </Btn>
              </li>
            </ul>
          )}
        </div>
      </div>
    </Module>
  )
}
