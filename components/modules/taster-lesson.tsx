'use client'

import { Mail, Play } from 'lucide-react'
import { useState } from 'react'
import { Button, Field, Placeholder, ResultCard } from './ui'

/** A real lesson from the course, for an email address only. */
export function TasterLesson({
  lesson,
  minutes,
  covers,
  tutor,
  id,
}: {
  lesson: string
  minutes: number
  covers: string[]
  tutor: string
  id?: string
}) {
  const [done, setDone] = useState(false)
  return (
    <div id={id} className="grid scroll-mt-20 gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex aspect-video items-center justify-center gap-2 rounded-lg bg-muted text-sm text-muted-foreground">
          <Play className="size-5" aria-hidden /> {minutes}-minute lesson preview <Placeholder />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-2xl leading-tight">{lesson}</h3>
          <p className="text-sm text-muted-foreground">
            Taught by {tutor} <Placeholder className="ml-1 align-middle" />
          </p>
        </div>
        <ul className="flex flex-col gap-1.5 text-sm">
          {covers.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden>&middot;</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center gap-4">
        {done ? (
          <ResultCard tone="yes">
            <div className="flex items-start gap-3 text-sm">
              <Mail className="mt-0.5 size-5 shrink-0" aria-hidden />
              <p className="text-pretty">
                <span className="font-medium">The lesson is on its way.</span> That is the only email you will get unless you ask for more.
              </p>
            </div>
          </ResultCard>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              The whole lesson, the files and the brief. No phone number, no call. Just an email address to send it to.
            </p>
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Button type="submit" size="lg" className="self-start">
              Send me the lesson
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
