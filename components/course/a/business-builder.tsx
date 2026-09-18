'use client'

import { ArrowRight, Check, Circle } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { usePostgrad } from '../postgrad/context'
import { Module } from '../primitives'

type SettingId = 'solo' | 'group' | 'online' | 'community'

const SETTINGS: { id: SettingId; label: string; note: string; extra: string | null }[] = [
  { id: 'solo', label: 'Solo private practice', note: 'Your own clients, your own room.', extra: 'Consulting rooms, or a room-hire arrangement' },
  { id: 'group', label: 'Group or shared clinic', note: 'Practising alongside others.', extra: 'An associate or room-hire agreement with the clinic' },
  { id: 'online', label: 'Online / telehealth', note: 'See clients from anywhere.', extra: 'A secure telehealth and online-booking platform' },
  { id: 'community', label: 'Community or NGO role', note: 'Employed or contracted in a service.', extra: null },
]

const BASE_COVERED = [
  {
    t: 'A recognised, ACA-accredited Master',
    s: 'You graduate straight into Australian Counselling Association membership and registration, the credential clients and insurers look for.',
  },
  {
    t: '168 hours of supervised placement',
    s: 'Real client hours with agency supervision (MC10), the practice base every association and insurer expects before you go out on your own.',
  },
  {
    t: 'Ethics, confidentiality and client rights',
    s: 'MC04 covers the professional and legal boundaries your own practice runs on day to day.',
  },
  {
    t: 'Assessment, planning and referral',
    s: 'MC08 is how you decide what belongs in your room and what to refer on, so you practise within your scope.',
  },
]

const BASE_NEEDS = [
  'An ABN and a business structure (sole trader or company)',
  'Professional indemnity and public liability insurance',
  'Bookkeeping, invoicing, GST and tax',
  'Client notes and practice-management software',
  'Marketing and a referral network to bring clients in',
]

/**
 * Repurposes the "career coach" idea into a concrete planner: the applicant
 * describes the practice they want to build, and it maps the parts the Master
 * of Counselling already gives them against the business pieces they line up
 * themselves. No AI, no backend, just a match between the course and the goal.
 */
export function BusinessBuilder() {
  const { pg } = usePostgrad()
  const electives = pg.units.filter((u) => u.elective)
  const cap = pg.structure.electivesRequired

  const [setting, setSetting] = useState<SettingId>('solo')
  const [picked, setPicked] = useState<string[]>([])

  const active = SETTINGS.find((s) => s.id === setting) ?? SETTINGS[0]
  const specialtyCovered = electives
    .filter((u) => picked.includes(u.code))
    .map((u) => ({ t: u.title, s: `Practise this at depth as one of your four specialisations (${u.code}).` }))
  const covered = [...BASE_COVERED, ...specialtyCovered]
  const needs = active.extra ? [...BASE_NEEDS, active.extra] : BASE_NEEDS

  function toggle(code: string) {
    setPicked((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code)
      if (prev.length >= cap) return prev
      track('practice_specialty', { code })
      return [...prev, code]
    })
  }

  return (
    <Module id="practice" eyebrow="Studying to start your own practice?" title="Map the degree to the practice you want" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Plenty of graduates want to work for themselves. Tell us the kind of counselling practice you have in mind and we&apos;ll show
        what the Master of Counselling already builds for you, and the few business pieces you line up yourself.
      </p>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">What do you want to build?</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SETTINGS.map((s) => {
            const sel = s.id === setting
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setSetting(s.id)
                  track('practice_setting', { setting: s.id })
                }}
                className={cn(
                  'flex min-h-20 flex-col items-start justify-start gap-1 rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  sel ? 'border-primary bg-primary-tint' : 'border-border bg-card hover:border-foreground/40',
                )}
              >
                <span className="text-[15px] font-medium leading-snug">{s.label}</span>
                <span className="text-sm text-muted-foreground">{s.note}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6 flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium">
          Who do you want to work with?{' '}
          <span className="font-normal text-muted-foreground">
            Pick up to {cap} specialisations ({picked.length}/{cap})
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {electives.map((u) => {
            const sel = picked.includes(u.code)
            const full = !sel && picked.length >= cap
            return (
              <button
                key={u.code}
                type="button"
                aria-pressed={sel}
                disabled={full}
                onClick={() => toggle(u.code)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
                  sel
                    ? 'border-primary bg-primary text-primary-foreground'
                    : full
                      ? 'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-60'
                      : 'border-input bg-background text-foreground hover:border-foreground',
                )}
              >
                {sel && <Check className="size-4" aria-hidden />}
                {u.title.replace(/^Counselling (for |Skills for )?/, '').replace(/^the /, '')}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border border-success-border bg-success/40 p-5">
          <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">The Master gives you</h3>
          <ul className="flex flex-col gap-4">
            {covered.map((c) => (
              <li key={c.t} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-foreground/10 text-success-foreground">
                  <Check className="size-4" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium leading-snug">{c.t}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground text-pretty">{c.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
          <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">You line up yourself</h3>
          <ul className="flex flex-col gap-3">
            {needs.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                  <Circle className="size-2.5 fill-current" aria-hidden />
                </span>
                <span className="text-[15px] leading-snug text-pretty">{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
            Your placement supervisor and AIPC&apos;s alumni network are good first ports of call for the business side. The degree makes
            you a counsellor; these turn it into a practice.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href="#specialist"
          onClick={() => track('practice_cta', { setting, specialties: picked.length })}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Talk this through with a specialist <ArrowRight className="size-4" aria-hidden />
        </a>
        <p className="text-sm text-muted-foreground">They can sanity-check your plan and point you to the right specialisations.</p>
      </div>
    </Module>
  )
}
