'use client'

import Image from 'next/image'
import { Check, Phone, Quote } from 'lucide-react'
import { useState } from 'react'
import { AIPC_TEAM } from '@/lib/advisors'
import { placeStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { LeadForm } from '../lead-form'
import { Btn, Module, StatusPill } from '../primitives'
import { usePostgrad } from '../postgrad/context'

/**
 * The engaging "let's talk" section for AIPC Option A. Most postgrad enquirers
 * are not ready to apply, so the key action is a real conversation. It leads
 * with the faces of the people you actually meet, then lets you book a time.
 */
export function PostgradTalk() {
  const { pg } = usePostgrad()
  const sp = pg.specialist
  const [booking, setBooking] = useState<string | null>(null)
  const [booked, setBooked] = useState<string | null>(null)
  const lead = AIPC_TEAM[0]

  return (
    <Module id="specialist" eyebrow="Let's talk" title="Let's talk about your learning" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-5">
          <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
            Before you commit to anything, have a real conversation with one of our specialists. They&apos;ll look at your background,
            what credit you might get for prior study, how placement works near you, and whether full-time or part-time fits your life.
            No script, no pressure.
          </p>

          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">The people you&apos;ll actually talk to</p>
            <ul className="grid grid-cols-3 gap-3">
              {AIPC_TEAM.map((a) => (
                <li key={a.name} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center">
                  <Image
                    src={a.photo}
                    alt={`${a.name}, ${a.role} at AIPC`}
                    width={64}
                    height={64}
                    className="size-16 rounded-full object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">{a.name}</span>
                    <span className="text-xs leading-tight text-muted-foreground">{a.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <figure className="flex gap-3 rounded-lg bg-muted p-4">
              <Quote className="size-5 shrink-0 text-primary" aria-hidden />
              <figcaption className="text-[15px] leading-relaxed text-pretty">
                &ldquo;{lead.line}&rdquo; <span className="text-sm text-muted-foreground">— {lead.name}</span>
              </figcaption>
            </figure>
          </div>

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

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="size-4 text-primary" aria-hidden /> Or call {sp.phone}, {sp.hours}
          </p>
        </div>

        <div className="md:col-span-7">
          {booked ? (
            <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
                <p className="font-display text-2xl leading-none">Booked: {booked}</p>
                <p>We&apos;ve texted you a calendar invite. Have your transcript handy if you want credit assessed on the call.</p>
                <p className="text-sm">
                  Want a head start?{' '}
                  <a href="#eligibility" className="font-medium underline underline-offset-4 hover:no-underline">
                    Run the eligibility check
                  </a>{' '}
                  and we&apos;ll pick up from your result.
                </p>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              <li className="p-4">
                <p className="text-sm font-medium">Book a 15-minute call</p>
                <p className="text-sm text-muted-foreground">Phone or video, whatever suits. Pick a time that works.</p>
              </li>
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
