import { Check, Play } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { Story } from './stories-matched'
import { Avatar, Placeholder } from './ui'

/**
 * Static, readable blocks that explain a course in real terms. No interaction:
 * what it is like, what you do and when, what it costs. Carried over from the
 * previous round, where this plainness was the thing people liked.
 */

export function WhatItsLike({ text, schedule, poster, caption }: { text: string; schedule: string; poster: string; caption: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
      <div className="flex flex-col gap-4">
        <p className="text-[17px] leading-relaxed text-pretty">{text}</p>
        <p className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          <span className="font-medium text-foreground">In a sentence: </span>
          {schedule}.
        </p>
      </div>
      <figure className="flex flex-col gap-2">
        <button type="button" className="group relative aspect-video overflow-hidden rounded-xl bg-muted" aria-label={`Play video: ${caption} (placeholder)`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground group-hover:bg-background">
              <Play className="ml-0.5 size-6" aria-hidden />
            </span>
          </span>
        </button>
        <figcaption className="text-xs text-muted-foreground">
          {caption} <Placeholder className="ml-1 align-middle" />
        </figcaption>
      </figure>
    </div>
  )
}

export type Phase = { when: string; title: string; detail: string; can?: string[] }

/** What you do and when, as a readable timeline. */
export function WhatYouDo({ phases }: { phases: Phase[] }) {
  return (
    <ol className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
      {phases.map((p) => (
        <li key={p.title} className="grid gap-3 p-5 md:grid-cols-[160px_1fr] md:gap-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground md:pt-1">{p.when}</p>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium leading-snug">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{p.detail}</p>
            {p.can && (
              <ul className="mt-1 grid gap-1.5 text-sm sm:grid-cols-2">
                {p.can.map((c) => (
                  <li key={c} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export type CostLine = { label: string; value: string; note?: string }

/** Cost stated plainly: a short list, not a calculator. */
export function CostPlain({ lines, pay, note }: { lines: CostLine[]; pay: { title: string; body: string }[]; note?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <dl className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
        {lines.map((l) => (
          <div key={l.label} className="flex flex-col gap-0.5 p-4">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{l.label}</dt>
              <dd className="text-right font-medium tabular-nums">{l.value}</dd>
            </div>
            {l.note && <p className="text-xs text-muted-foreground text-pretty">{l.note}</p>}
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ways to pay</p>
        {pay.map((p) => (
          <div key={p.title} className="flex flex-col gap-1 rounded-lg border border-border p-4">
            <p className="font-medium">{p.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{p.body}</p>
          </div>
        ))}
        {note && (
          <p className="flex items-start gap-2 text-xs text-muted-foreground text-pretty">
            <Placeholder className="mt-0.5 shrink-0" /> {note}
          </p>
        )}
      </div>
    </div>
  )
}

/** Three stories, no filter. */
export function StoryCards({ stories, className }: { stories: Story[]; className?: string }) {
  return (
    <ul className={cn('grid gap-4 md:grid-cols-3', className)}>
      {stories.map((s) => (
        <li key={s.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Avatar name={s.name} photo={s.photo} className="size-12" />
            <div className="flex flex-col gap-0.5">
              <p className="font-medium leading-snug">
                {s.name}
                {s.age ? `, ${s.age}` : ''} <Placeholder className="ml-1 align-middle" />
              </p>
              <p className="text-sm text-muted-foreground">
                {s.from} <span aria-hidden>&rarr;</span> {s.now}
              </p>
            </div>
          </div>
          <blockquote className="text-[15px] leading-relaxed text-pretty">&ldquo;{s.quote}&rdquo;</blockquote>
          <p className="mt-auto text-xs font-medium uppercase tracking-wide text-muted-foreground">Took {s.took}</p>
        </li>
      ))}
    </ul>
  )
}

/** A quiet list of dates or sessions with one link, instead of a picker. */
export function DateList({ items, action }: { items: { when: string; detail: string }[]; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid gap-2 sm:grid-cols-3">
        {items.map((i) => (
          <li key={i.when} className="flex flex-col gap-0.5 rounded-lg border border-border bg-card px-4 py-3">
            <span className="font-medium">{i.when}</span>
            <span className="text-sm text-muted-foreground">{i.detail}</span>
          </li>
        ))}
      </ul>
      {action}
    </div>
  )
}

/** One interactive module, framed so it reads as a deliberate call-out on an otherwise scrollable page. */
export function Callout({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
        <span className="size-2 rounded-full bg-coral" aria-hidden />
        {eyebrow}
      </p>
      {children}
    </div>
  )
}
