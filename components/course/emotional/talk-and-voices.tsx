'use client'

import { Check, MessageSquareQuote, Phone } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { useCourse } from '../course-context'
import { Btn, Field, inputClass, Module } from '../primitives'

export function TalkToSomeone() {
  const course = useCourse()
  const talk = course.tryIt?.find((m) => m.mode === 'Talk to someone')
  const [slot, setSlot] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section id="talk" aria-labelledby="talk-title" className="hairline-t scroll-mt-20 border-border bg-muted">
      <div className="mx-auto grid max-w-[960px] gap-8 px-6 py-10 md:grid-cols-2 md:py-14">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Not ready to pick a date?</p>
          <h2 id="talk-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
            Talk to a real person
          </h2>
          <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
            {talk?.blurb ?? 'Fifteen minutes with a course advisor. No script, no pressure.'} They sort the paperwork, the loan and the
            questions you did not know to ask. Or just ring {course.brand.phone}.
          </p>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {['Whether this is the right course for you', 'What the student loan actually means for you', 'How to get in without NCEA'].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
          {done ? (
            <div role="status" aria-live="polite" className="flex gap-3 text-[15px] leading-relaxed">
              <Check className="mt-0.5 size-5 shrink-0 text-success-foreground" aria-hidden />
              <p>
                <span className="font-medium">Booked, {name}.</span> {slot}. We&apos;ve texted you the details.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                track('advisor_book', { slot: slot ?? undefined })
                setDone(true)
              }}
            >
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium">When suits?</legend>
                {(talk?.slots ?? []).map((s) => {
                  const id = `talk-${s.when.replace(/\W+/g, '-')}`
                  return (
                    <label
                      key={s.when}
                      htmlFor={id}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-input px-3 py-2 has-[:checked]:border-primary has-[:checked]:bg-primary-tint"
                    >
                      <input id={id} type="radio" name="slot" required value={s.when} onChange={() => setSlot(s.when)} className="accent-primary" />
                      <span className="flex flex-col">
                        <span className="text-sm font-medium">{s.when}</span>
                        <span className="text-xs text-muted-foreground">{s.what}</span>
                      </span>
                    </label>
                  )
                })}
              </fieldset>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="First name" id="talk-name">
                  <input id="talk-name" required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </Field>
                <Field label="Mobile" id="talk-mobile">
                  <input id="talk-mobile" required type="tel" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} />
                </Field>
              </div>
              <Btn type="submit" variant="blue" className="min-h-12">
                <Phone className="size-4" aria-hidden /> Book the call
              </Btn>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function StudentVoices() {
  const { stages, outcomes, copy } = useCourse()
  // Lead with the "got a job" voice: for this audience the outcome matters more than the journey.
  const voices = [
    ...stages
      .filter((s) => s.voice?.consent)
      .map((s) => ({ text: s.voice!.text, who: `${s.voice!.name}, ${s.voice!.campus}`, when: s.label }))
      .reverse(),
    ...(outcomes.story?.consent
      ? [{ text: outcomes.story.text, who: `${outcomes.story.initials}, ${outcomes.story.campus}`, when: `Graduated ${outcomes.story.year}` }]
      : []),
  ]

  return (
    <Module id="voices" eyebrow="Hear it from students" title="People who were where you are" wide>
      <ul className="grid gap-4 md:grid-cols-2">
        {voices.map((v, i) => (
          <li
            key={v.text}
            className={
              i === 0
                ? 'flex flex-col gap-4 rounded-lg bg-primary p-6 text-primary-foreground md:col-span-2'
                : 'flex flex-col gap-4 rounded-lg border border-border bg-card p-6'
            }
          >
            <MessageSquareQuote className={i === 0 ? 'size-6 opacity-80' : 'size-6 text-primary'} aria-hidden />
            <blockquote
              className={
                i === 0
                  ? 'font-display text-2xl font-bold leading-tight text-balance sm:text-3xl md:text-4xl'
                  : 'text-lg font-medium leading-snug text-balance'
              }
            >
              &ldquo;{v.text}&rdquo;
            </blockquote>
            <p className={i === 0 ? 'text-sm text-primary-foreground/80' : 'text-sm text-muted-foreground'}>
              <span className={i === 0 ? 'font-medium text-primary-foreground' : 'font-medium text-foreground'}>{v.who}</span> · {v.when}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        Real students, quoted with permission. They were asked about {copy.jobNoun.toLowerCase()} training, not to sell it.
      </p>
    </Module>
  )
}
