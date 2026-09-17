'use client'

import { useState } from 'react'
import { Check, MessageCircle, Phone, Video } from 'lucide-react'
import type { CountryProfile } from './data'
import { SectionHead } from './place'

export function Enquire({ country }: { country: CountryProfile }) {
  const [sent, setSent] = useState(false)
  const [role, setRole] = useState<'student' | 'parent' | 'agent'>('parent')

  const channels = [
    { icon: Video, h: 'Family video call', d: `30 minutes with the international office and a current student, ${country.callWindow}.` },
    { icon: MessageCircle, h: `Message on ${country.messaging}`, d: `Add our ${country.advisor} and ask anything. Replies within one working day.` },
    { icon: Phone, h: 'Call the international office', d: '+64 9 373 0888, or we will call you at a time you choose.' },
  ]

  return (
    <section id="enquire" aria-labelledby="enquire-h" className="border-b border-border">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 md:grid-cols-[1fr_1.1fr] md:py-16">
        <div className="flex flex-col gap-8">
          <SectionHead
            id="enquire-h"
            kicker="Contact the international office"
            title="Talk with a real person, in your language, before you decide anything"
            lede="Most families begin with a video call. Nothing is asked of you beyond the conversation."
          />
          <ul className="flex flex-col gap-5">
            {channels.map((c) => (
              <li key={c.h} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5 text-sm">
                  <span className="font-medium">{c.h}</span>
                  <span className="leading-relaxed text-muted-foreground">{c.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {sent ? (
          <div className="flex flex-col items-start gap-4 rounded-md border border-border bg-card p-8" role="status">
            <span className="flex size-10 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-5" aria-hidden />
            </span>
            <h3 className="font-display text-2xl text-primary">Thank you. We will be in touch within one working day.</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your {country.advisor} will reply by email and, if you gave one, on {country.messaging}, with three times for a family call.
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5 rounded-md border border-border bg-card p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium">I am a</legend>
              <div className="grid grid-cols-3 gap-2" role="radiogroup">
                {(
                  [
                    ['parent', 'Parent or guardian'],
                    ['student', 'Student'],
                    ['agent', 'Education agent'],
                  ] as const
                ).map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={role === v}
                    onClick={() => setRole(v)}
                    className={`min-h-11 rounded-md border px-3 text-sm ${
                      role === v ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-primary'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" autoComplete="name" />
              <Field id="email" label="Email" type="email" autoComplete="email" />
              <Field id="phone" label={`Phone or ${country.messaging} ID`} autoComplete="tel" />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className="text-sm font-medium">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  defaultValue={country.code === 'OTHER' ? '' : country.name}
                  className="min-h-11 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
            </div>

            {role === 'parent' && <Field id="student" label="Student's name and age" />}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="question" className="text-sm font-medium">
                What would you most like to know? <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea id="question" name="question" rows={3} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" name="call" defaultChecked className="mt-1 size-4 accent-primary" />
              <span>Yes, please offer times for a family video call {country.callWindow}.</span>
            </label>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Send to the international office
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We use your details only to reply to this enquiry. Your information is held in New Zealand under the Privacy Act 2020.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ id, label, type = 'text', autoComplete }: { id: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} required className="min-h-11 rounded-md border border-input bg-background px-3 text-sm" />
    </div>
  )
}
