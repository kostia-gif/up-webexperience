'use client'

import Image from 'next/image'
import { Award, Check, Unlock } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { usePostgrad } from './context'

export function Progression() {
  const { course, pg } = usePostgrad()
  const electives = pg.units.filter((u) => u.elective)
  const [picked, setPicked] = useState<string[]>([])

  function toggle(code: string, max: number) {
    setPicked((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code)
      const next = prev.length >= max ? [...prev.slice(1), code] : [...prev, code]
      track('elective_pick', { picked: next.join('+') })
      return next
    })
  }

  return (
    <section id="progression" aria-labelledby="progression-title" className="hairline-t scroll-mt-20 border-border">
      <div className="mx-auto max-w-[760px] px-6 py-8 md:py-12">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Your progression</p>
          <h2 id="progression-title" className="font-display text-3xl tracking-tight text-balance md:text-4xl">
            Level up, trimester by trimester
          </h2>
          <p className="mt-2 max-w-[600px] text-[15px] leading-relaxed text-pretty text-muted-foreground">{course.copy.skillsTitle}</p>
        </header>

        <ol className="mt-8 flex flex-col" aria-label="Levels of the degree">
          {pg.levels.map((level, i) => {
            const isLast = i === pg.levels.length - 1
            const unitLabels = level.units.map((code) => pg.units.find((u) => u.code === code)?.title ?? code)
            return (
              <li key={level.n} className="relative flex gap-5 pb-10 md:gap-7">
                {!isLast && <span aria-hidden className="absolute left-5 top-12 h-[calc(100%-2.5rem)] w-px bg-border md:left-6" />}
                <div className="flex shrink-0 flex-col items-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground md:size-12 md:text-xl">
                    {level.n}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4 pt-1.5">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {level.label} · {level.when}
                    </p>
                    <h3 className="font-display text-2xl leading-tight">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {unitLabels.join(' · ')}
                      {level.note && ` · ${level.note}`}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {level.skills.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[15px] leading-snug">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  {level.electivePick && (
                    <fieldset className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
                      <legend className="px-1 text-sm font-medium">Try it: pick your {level.electivePick} specialisations</legend>
                      <ul className="flex flex-wrap gap-2">
                        {electives.map((e) => {
                          const on = picked.includes(e.code)
                          return (
                            <li key={e.code}>
                              <button
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggle(e.code, level.electivePick!)}
                                className={cn(
                                  'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                                  on ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-foreground',
                                )}
                              >
                                {e.title.replace(/^Counselling (for|Skills for|Interventions for) /, '').replace(/^Counselling /, '')}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                      <div role="status" aria-live="polite" className="text-sm leading-relaxed text-muted-foreground">
                        {picked.length === 0 && <p>Choose {level.electivePick}. Each is a full unit: two in Trimester 3, two in Trimester 4.</p>}
                        {picked.length > 0 && picked.length < level.electivePick && (
                          <p>
                            {picked.length} of {level.electivePick} chosen.
                          </p>
                        )}
                        {picked.length > 0 &&
                          picked.map((code) => {
                            const u = electives.find((e) => e.code === code)!
                            return (
                              <p key={code} className="mt-1">
                                <span className="font-medium text-foreground">{u.title}.</span> {u.summary}
                              </p>
                            )
                          })}
                        {picked.length === level.electivePick && (
                          <p className="mt-2 font-medium text-foreground">That is your specialisation set. You can change any of them up to that trimester&apos;s census date.</p>
                        )}
                      </div>
                    </fieldset>
                  )}

                  {level.image && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <Image src={level.image.src} alt={level.image.alt} fill sizes="(max-width: 768px) 100vw, 680px" className="object-cover" />
                    </div>
                  )}

                  {level.unlocks && (
                    <p className="flex items-start gap-2.5 rounded-md bg-muted px-3.5 py-3 text-sm leading-snug">
                      <Unlock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="font-medium">Unlocks:</span> {level.unlocks}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            )
          })}

          <li className="flex gap-5 md:gap-7">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-coral text-coral-foreground md:size-12">
              <Award className="size-5 md:size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-3 rounded-lg bg-primary px-5 py-5 text-primary-foreground md:px-6">
              <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">Registered counsellor</p>
              <p className="font-display text-2xl leading-tight text-balance">
                Master of Counselling, Australian Counselling Association membership, and {course.outcomes.stat?.value ?? 'most'} of graduates in
                practice within a year.
              </p>
              <a href="#outcomes" className="self-start text-sm font-medium underline underline-offset-4 hover:no-underline">
                Where {course.outcomes.employersYear} graduates went
              </a>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
