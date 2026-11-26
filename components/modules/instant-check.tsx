'use client'

import { ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button, ButtonLink, Placeholder, ResultCard } from './ui'

export type CheckQuestion = {
  id: string
  label: string
  options: { id: string; label: string }[]
}

export type CheckResult = {
  tone: 'yes' | 'start' | 'info'
  headline: string
  body: string
  bullets?: string[]
  action?: { label: string; href: string }
  secondary?: { label: string; href: string }
  extra?: ReactNode
}

export type Answers = Record<string, string>

/**
 * The shared "three or four questions, one positive answer" pattern. Used as
 * "Can I get in?", the credit checker and the cost and funding checkers.
 */
export function InstantCheck({
  id,
  title,
  intro,
  questions,
  resolve,
  ctaLabel = 'Show my answer',
  placeholderNote = 'Rules and figures are placeholders until confirmed by UP.',
  className,
}: {
  id?: string
  title: string
  intro?: string
  questions: CheckQuestion[]
  resolve: (answers: Answers) => CheckResult
  ctaLabel?: string
  placeholderNote?: string | null
  className?: string
}) {
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<CheckResult | null>(null)
  const complete = questions.every((q) => answers[q.id])

  return (
    <div id={id} className={cn('flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6', className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl leading-tight">{title}</h3>
        {intro && <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{intro}</p>}
      </div>
      {result ? (
        <ResultCard tone={result.tone}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-current/15">
              <Check className="size-4" aria-hidden />
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-display text-xl leading-tight">{result.headline}</p>
              <p className="text-sm leading-relaxed text-pretty">{result.body}</p>
              {result.bullets && (
                <ul className="flex flex-col gap-1 text-sm">
                  {result.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden>&middot;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {result.extra}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {result.action && (
              <ButtonLink href={result.action.href} variant="primary">
                {result.action.label} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            )}
            {result.secondary && (
              <ButtonLink href={result.secondary.href} variant="secondary">
                {result.secondary.label}
              </ButtonLink>
            )}
            <Button
              variant="link"
              className="ml-auto text-xs"
              onClick={() => {
                setResult(null)
                setAnswers({})
              }}
            >
              <RotateCcw className="size-3.5" aria-hidden /> Start again
            </Button>
          </div>
        </ResultCard>
      ) : (
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            if (complete) setResult(resolve(answers))
          }}
        >
          {questions.map((q, i) => (
            <fieldset key={q.id} className="flex flex-col gap-2">
              <legend className="text-sm font-medium">
                <span className="mr-2 text-muted-foreground tabular-nums">{i + 1}.</span>
                {q.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const active = answers[q.id] === o.id
                  return (
                    <label
                      key={o.id}
                      className={cn(
                        'inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors',
                        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-foreground',
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={o.id}
                        checked={active}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                        className="sr-only"
                      />
                      {o.label}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={!complete} size="lg">
              {ctaLabel} <ArrowRight className="size-4" aria-hidden />
            </Button>
            {placeholderNote && (
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <Placeholder /> {placeholderNote}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
