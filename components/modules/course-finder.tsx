'use client'

import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Avatar, Button, ButtonLink, Placeholder, ResultCard } from './ui'

export type FinderQuestion = { id: string; label: string; options: { id: string; label: string; weights?: Record<string, number> }[] }
export type FinderCourse = { id: string; title: string; level: string; mode: string; weeks: string; why: string; href?: string }
export type Advisor = { name: string; role: string; photo?: string; line: string }

/** Four or five questions ending in a recommended course, an alternative, and an advisor conversation. */
export function CourseFinder({
  questions,
  courses,
  advisor,
  talkHref,
  id,
}: {
  questions: FinderQuestion[]
  courses: FinderCourse[]
  advisor: Advisor
  talkHref: string
  id?: string
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const finished = step >= questions.length

  const scores = courses.map((c) => ({
    course: c,
    score: questions.reduce((s, q) => {
      const o = q.options.find((x) => x.id === answers[q.id])
      return s + (o?.weights?.[c.id] ?? 0)
    }, 0),
  }))
  scores.sort((a, b) => b.score - a.score)
  const [best, alt] = scores

  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      {!finished ? (
        <>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span className="flex gap-1" aria-hidden>
              {questions.map((_, i) => (
                <span key={i} className={cn('h-1 w-6 rounded-full', i <= step ? 'bg-primary' : 'bg-border')} />
              ))}
            </span>
          </div>
          <fieldset className="flex flex-col gap-3">
            <legend className="font-display text-2xl leading-tight">{questions[step].label}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {questions[step].options.map((o) => {
                const active = answers[questions[step].id] === o.id
                return (
                  <label
                    key={o.id}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center rounded-lg border px-4 text-sm transition-colors',
                      active ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border hover:border-foreground',
                    )}
                  >
                    <input
                      type="radio"
                      name={questions[step].id}
                      checked={active}
                      onChange={() => setAnswers((a) => ({ ...a, [questions[step].id]: o.id }))}
                      className="sr-only"
                    />
                    {o.label}
                  </label>
                )
              })}
            </div>
          </fieldset>
          <div className="flex items-center justify-between">
            <Button variant="link" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-sm">
              <ArrowLeft className="size-4" aria-hidden /> Back
            </Button>
            <Button onClick={() => setStep((s) => s + 1)} disabled={!answers[questions[step].id]}>
              {step === questions.length - 1 ? 'Show my course' : 'Next'} <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5" aria-live="polite">
          <ResultCard tone="yes">
            <p className="text-xs font-medium uppercase tracking-wide opacity-80">Our suggestion</p>
            <p className="font-display text-2xl leading-tight">{best.course.title}</p>
            <p className="text-sm">
              {best.course.level} &middot; {best.course.mode} &middot; {best.course.weeks}
            </p>
            <p className="text-sm leading-relaxed text-pretty">{best.course.why}</p>
            <p className="text-xs opacity-80">
              Also worth a look: {alt.course.title}. <Placeholder className="ml-1 align-middle" />
            </p>
          </ResultCard>
          <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
            <Avatar name={advisor.name} photo={advisor.photo} className="size-14" />
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-medium">
                Talk it through with {advisor.name} <Placeholder className="ml-1 align-middle" />
              </p>
              <p className="text-sm text-muted-foreground">{advisor.role}</p>
              <p className="text-sm leading-relaxed text-pretty">&ldquo;{advisor.line}&rdquo;</p>
            </div>
            <ButtonLink href={talkHref} variant="primary">
              Book a time <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <Button
            variant="link"
            className="self-start text-xs"
            onClick={() => {
              setStep(0)
              setAnswers({})
            }}
          >
            <RotateCcw className="size-3.5" aria-hidden /> Start again
          </Button>
        </div>
      )}
    </div>
  )
}
