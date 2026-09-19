'use client'

import Image from 'next/image'
import { Check, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { advisorFor, CALL_WINDOWS } from '@/lib/advisors'
import { track } from '@/lib/track'
import { useCourse } from '../course-context'
import { Btn, Field, inputClass } from '../primitives'

type Channel = 'call' | 'email'

/**
 * Softer version of "Talk to a real person": a named advisor with a face,
 * a time of day instead of a fixed slot, and a no-choice fallback
 * ("just call me back" / "email me back").
 */
export function TalkA({
  tone = 'muted',
  id = 'talk',
  heading = 'Talk to a real person',
}: { tone?: 'muted' | 'card'; id?: string; heading?: string } = {}) {
  const course = useCourse()
  const advisor = advisorFor(course.brand.id)
  const talk = course.tryIt?.find((m) => m.mode === 'Talk to someone')
  const [channel, setChannel] = useState<Channel>('call')
  const [window, setWindow] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [done, setDone] = useState(false)

  const whenText = window ? CALL_WINDOWS.find((w) => w.id === window)?.label.toLowerCase() : 'when it suits us both'

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tone === 'muted' ? 'hairline-t scroll-mt-20 border-border bg-muted' : 'scroll-mt-20'}
    >
      <div className="mx-auto grid max-w-[960px] gap-8 px-6 py-10 md:grid-cols-[1fr_1.1fr] md:py-14">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Not ready to pick a date?</p>
            <h2 id={`${id}-title`} className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              {heading}
            </h2>
            <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
              {talk?.blurb ?? 'Fifteen minutes with a course advisor. No script, no pressure.'} Or just ring {course.brand.phone}.
            </p>
          </div>

          <figure className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <Image
              src={advisor.photo}
              alt={`${advisor.name}, ${advisor.role}`}
              width={72}
              height={72}
              className="size-[72px] shrink-0 rounded-full object-cover"
            />
            <figcaption className="flex flex-col gap-1">
              <p className="text-base font-medium leading-tight">
                {advisor.name} <span className="font-normal text-muted-foreground">· {advisor.role}</span>
              </p>
              <blockquote className="text-sm leading-snug text-muted-foreground">&ldquo;{advisor.line}&rdquo;</blockquote>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
          {done ? (
            <div role="status" aria-live="polite" className="flex gap-3 text-[15px] leading-relaxed">
              <Check className="mt-0.5 size-5 shrink-0 text-success-foreground" aria-hidden />
              <p>
                <span className="font-medium">Thanks, {name}.</span>{' '}
                {channel === 'call'
                  ? `${advisor.name} will call you ${whenText}. If you miss it, she'll text first next time.`
                  : `${advisor.name} will email you back within one working day.`}
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                track('advisor_book', { channel, window: window ?? 'any' })
                setDone(true)
              }}
            >
              <div role="radiogroup" aria-label="How should we get back to you" className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['call', 'Call me back', Phone],
                    ['email', 'Email me back', Mail],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={channel === id}
                    onClick={() => {
                      setChannel(id)
                      setContact('')
                    }}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-md border text-sm font-medium ${
                      channel === id ? 'border-primary bg-primary-tint text-foreground' : 'border-input text-muted-foreground hover:border-foreground'
                    }`}
                  >
                    <Icon className="size-4" aria-hidden /> {label}
                  </button>
                ))}
              </div>

              {channel === 'call' && (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-sm">
                    <span className="font-medium">Best time?</span> <span className="text-muted-foreground">Optional. Skip it and we&apos;ll try you anyway.</span>
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {CALL_WINDOWS.map((w) => (
                      <label
                        key={w.id}
                        htmlFor={`talk-${w.id}`}
                        className="flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-md border border-input px-2 py-2 text-center has-[:checked]:border-primary has-[:checked]:bg-primary-tint"
                      >
                        <input id={`talk-${w.id}`} type="radio" name="window" value={w.id} onChange={() => setWindow(w.id)} className="sr-only" />
                        <span className="text-sm font-medium">{w.label}</span>
                        <span className="text-xs text-muted-foreground">{w.hours}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="First name" id="talk-name">
                  <input id="talk-name" required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </Field>
                {channel === 'call' ? (
                  <Field label="Mobile" id="talk-contact">
                    <input id="talk-contact" required type="tel" autoComplete="tel" value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} />
                  </Field>
                ) : (
                  <Field label="Email" id="talk-contact">
                    <input id="talk-contact" required type="email" autoComplete="email" value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} />
                  </Field>
                )}
              </div>

              <Btn type="submit" variant="blue" className="min-h-12">
                {channel === 'call' ? (
                  <>
                    <Phone className="size-4" aria-hidden /> {window ? `Call me in the ${whenText}` : 'Call me back'}
                  </>
                ) : (
                  <>
                    <Mail className="size-4" aria-hidden /> Email me back
                  </>
                )}
              </Btn>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We only use this to talk to you about this course. No newsletter, no follow-up campaign.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
