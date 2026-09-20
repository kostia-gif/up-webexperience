'use client'

import { ArrowRight, Check, Circle } from 'lucide-react'
import { useRef, useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { Module } from '../primitives'

export type PBChoice = { id: string; label: string; note?: string }
export type PBCovered = { t: string; s: string }

export type PathwayBuilderProps = {
  id: string
  eyebrow: string
  title: string
  intro: string
  settingLegend: string
  settings: PBChoice[]
  specialtyLegend: string
  specialtyHint: string
  specialties: PBChoice[]
  cap: number
  baseCovered: PBCovered[]
  specialtyCoveredNote: string
  needsBySetting: Record<string, string[]>
  givesTitle: string
  needsTitle: string
  footnote: string
  ctaHref: string
  ctaLabel: string
  ctaNote: string
  revealLabel: string
  trackPrefix: string
}

/**
 * Shared, data-driven "map your training to the thing you want to build" module.
 * The reader answers two questions first; the mapping stays hidden behind a
 * button so the section is an interaction, not a wall of static text. Once
 * revealed, the two columns update live as the answers change. Used by AIPC
 * (your own practice) and Elite (your own clinic).
 */
export function PathwayBuilder(props: PathwayBuilderProps) {
  const {
    id, eyebrow, title, intro, settingLegend, settings, specialtyLegend, specialtyHint,
    specialties, cap, baseCovered, specialtyCoveredNote, needsBySetting, givesTitle,
    needsTitle, footnote, ctaHref, ctaLabel, ctaNote, revealLabel, trackPrefix,
  } = props

  const [setting, setSetting] = useState(settings[0].id)
  const [picked, setPicked] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const covered: PBCovered[] = [
    ...baseCovered,
    ...specialties.filter((s) => picked.includes(s.id)).map((s) => ({ t: s.label, s: specialtyCoveredNote })),
  ]
  const needs = needsBySetting[setting] ?? []

  function toggle(pid: string) {
    setPicked((prev) => {
      if (prev.includes(pid)) return prev.filter((c) => c !== pid)
      if (prev.length >= cap) return prev
      track(`${trackPrefix}_specialty`, { id: pid })
      return [...prev, pid]
    })
  }

  function reveal() {
    setRevealed(true)
    track(`${trackPrefix}_reveal`, { setting, specialties: picked.length })
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }

  return (
    <Module id={id} eyebrow={eyebrow} title={title} wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{intro}</p>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">{settingLegend}</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {settings.map((s) => {
            const sel = s.id === setting
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setSetting(s.id)
                  track(`${trackPrefix}_setting`, { setting: s.id })
                }}
                className={cn(
                  'flex min-h-20 flex-col items-start justify-start gap-1 rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  sel ? 'border-primary bg-primary-tint' : 'border-border bg-card hover:border-foreground/40',
                )}
              >
                <span className="text-[15px] font-medium leading-snug">{s.label}</span>
                {s.note && <span className="text-sm text-muted-foreground">{s.note}</span>}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6 flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium">
          {specialtyLegend}{' '}
          <span className="font-normal text-muted-foreground">
            {specialtyHint} ({picked.length}/{cap})
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {specialties.map((u) => {
            const sel = picked.includes(u.id)
            const full = !sel && picked.length >= cap
            return (
              <button
                key={u.id}
                type="button"
                aria-pressed={sel}
                disabled={full}
                onClick={() => toggle(u.id)}
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
                {u.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {!revealed ? (
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={reveal}
            className="inline-flex min-h-12 items-center gap-1.5 rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:bg-primary-hover"
          >
            {revealLabel} <ArrowRight className="size-4" aria-hidden />
          </button>
          <p className="text-sm text-muted-foreground">We&apos;ll match your answers to what the course already covers.</p>
        </div>
      ) : (
        <div ref={resultRef} className="mt-8 flex scroll-mt-24 flex-col gap-6">
          <div aria-live="polite" className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border border-success-border bg-success/40 p-5">
              <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">{givesTitle}</h3>
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
              <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">{needsTitle}</h3>
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
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{footnote}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={ctaHref}
              onClick={() => track(`${trackPrefix}_cta`, { setting, specialties: picked.length })}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              {ctaLabel} <ArrowRight className="size-4" aria-hidden />
            </a>
            <p className="text-sm text-muted-foreground">{ctaNote}</p>
          </div>
        </div>
      )}
    </Module>
  )
}
