'use client'

import { Check, Mail, MessageCircle, Scale } from 'lucide-react'
import { useState } from 'react'
import { placeStatus } from '@/lib/course'
import { track } from '@/lib/track'
import { LeadForm } from '../lead-form'
import { Btn, Module, StatusPill } from '../primitives'
import { Expander } from './expander'
import { MigrationPolicy } from './intl-detail'
import { useIntl, useStudyFrom } from './study-from'

function localTime(when: string, offset: number) {
  const m = when.match(/(\d{1,2}):(\d{2})(am|pm)/i)
  if (!m || offset === 0) return null
  let h = Number(m[1]) % 12 + (m[3].toLowerCase() === 'pm' ? 12 : 0)
  let mins = Number(m[2])
  const total = h * 60 + mins + offset * 60
  const wrapped = ((total % 1440) + 1440) % 1440
  h = Math.floor(wrapped / 60)
  mins = wrapped % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  const dayShift = total < 0 ? ', the day before' : total >= 1440 ? ', the next day' : ''
  return `${h12}:${String(mins).padStart(2, '0')}${suffix} your time${dayShift}`
}

export function IntlTeam() {
  const { intl } = useIntl()
  const { country } = useStudyFrom()
  const [booking, setBooking] = useState<string | null>(null)
  const [booked, setBooked] = useState<string | null>(null)
  const [migration, setMigration] = useState(false)
  const team = intl.team

  return (
    <Module id="international" eyebrow="International team" title="Twenty minutes with someone who works only with students overseas" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-5">
          <p className="text-[15px] leading-relaxed text-pretty">
            Four AIPC staff, not agents, not paid on enrolments. Bring your degree certificate and transcript and they will tell you on the call
            whether it is recognised, what credit it may attract, and whether you need an English test.
          </p>
          <ul className="flex flex-col gap-2">
            {team.covers.slice(0, 4).map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px] leading-snug">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <p className="flex items-center gap-2 font-medium">
              <MessageCircle className="size-4 text-primary" aria-hidden /> WhatsApp {team.whatsapp}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <Mail className="size-4 text-primary" aria-hidden /> {team.email}
            </p>
          </div>

          <Expander id="intl-migration" title="Thinking about moving to Australia?" summary="Visa advice, and who is allowed to give it" className="border-warning-border bg-warning text-warning-foreground open:bg-warning">
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 font-medium">
                <Scale className="size-4" aria-hidden /> Our team cannot give visa advice. A registered agent can.
              </p>
              <MigrationPolicy intl={intl} />
              <Btn
                variant="outline"
                aria-expanded={migration}
                className="self-start"
                onClick={() => {
                  setMigration((m) => !m)
                  track('migration_referral_open', { country: country?.code })
                }}
              >
                Ask for a referral to a registered agent
              </Btn>
              {migration && (
                <LeadForm
                  title="Referral to a MARA-registered migration agent"
                  note="We pass your name, email and country to the partner agency and nothing else. They contact you for a free first consultation. AIPC receives no payment."
                  submitLabel="Request the referral"
                  onSubmit={() => {
                    track('migration_referral_submit', { country: country?.code })
                    setMigration(false)
                  }}
                  onCancel={() => setMigration(false)}
                />
              )}
            </div>
          </Expander>
        </div>

        <div className="md:col-span-7">
          {booked ? (
            <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="flex flex-col gap-2 text-[15px] leading-relaxed">
                <p className="font-display text-2xl leading-none">Booked: {booked}</p>
                <p>We have emailed a calendar invite in your time zone and a video link. Have your degree certificate and transcript to hand if you want credit and English evidence checked on the call.</p>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {team.slots.map((slot) => {
                const status = placeStatus(slot.left)
                const isOpen = booking === slot.when
                const local = country ? localTime(slot.when, country.utcOffset) : null
                return (
                  <li key={slot.when} className="p-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="text-base font-medium">{slot.when}</p>
                        <p className="text-sm text-muted-foreground">{local ? `${local}. ` : ''}20 minutes, video or WhatsApp</p>
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
                        note="We email a calendar invite in your time zone and a video link. We use these details only to talk to you about this course."
                        submitLabel="Book the call"
                        onSubmit={() => {
                          track('intl_team_book', { slot: slot.when, country: country?.code })
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
                <p className="text-sm text-muted-foreground">None of these suit your time zone?</p>
                <Btn variant="outline" className="w-full sm:w-auto" onClick={() => track('intl_team_callback', { country: country?.code })}>
                  Ask for a time that suits you
                </Btn>
              </li>
            </ul>
          )}
        </div>
      </div>
    </Module>
  )
}
