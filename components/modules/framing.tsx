import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Placeholder } from './ui'

export type Outcome = { lead: string; text: string }

/**
 * A large statement, a photo, and a "Course outcomes" card with a checklist.
 * Each item leads with the outcome in a few words, then says what it means.
 */
export function CourseOutcomes({ id = 'outcomes-card', headline, image, imageAlt, outcomes }: { id?: string; headline: ReactNode; image: string; imageAlt: string; outcomes: Outcome[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="hairline-t scroll-mt-20 border-border bg-muted">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 px-6 py-12 md:gap-10 md:py-16">
        <h2 id={`${id}-title`} className="mx-auto max-w-3xl text-center font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-5xl">
          {headline}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
          <figure className="relative min-h-[320px] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
          </figure>
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-medium text-muted-foreground">Course outcomes</h3>
            <ul className="flex flex-col gap-4 border-t border-dashed border-border pt-5">
              {outcomes.map((o) => (
                <li key={o.lead} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-success text-success-foreground">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <p className="text-[15px] leading-relaxed text-pretty">
                    <span className="font-medium">{o.lead}</span> {o.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export type Reason = { title: string; text: string; href?: string; linkLabel?: string }

/** "Why this course": the reasons in one place, each linking to its proof further down. */
export function WhyThisCourse({ reasons }: { reasons: Reason[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {reasons.map((r) => (
        <li key={r.title} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-lg font-medium leading-snug">{r.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{r.text}</p>
          {r.href && (
            <a href={r.href} className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary hover:underline hover:underline-offset-4">
              {r.linkLabel ?? 'More'} <ArrowRight className="size-4" aria-hidden />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

export type PayWay = { title: string; body: string; highlight?: boolean }

/** One fee, then the flexible ways to pay it. Less on the number, more on the options. */
export function WaysToPay({ fee, feeNote, ways, note }: { fee: string; feeNote: string; ways: PayWay[]; note?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Fee</p>
        <p className="font-display text-4xl font-bold leading-none">
          {fee} <Placeholder className="ml-1 align-middle" />
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{feeNote}</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ways to pay</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ways.map((w) => (
            <li key={w.title} className={w.highlight ? 'flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground' : 'flex flex-col gap-1 rounded-lg border border-border bg-card p-4'}>
              <p className="font-medium">{w.title}</p>
              <p className={w.highlight ? 'text-sm leading-relaxed text-pretty' : 'text-sm leading-relaxed text-muted-foreground text-pretty'}>{w.body}</p>
            </li>
          ))}
        </ul>
        {note && <p className="text-xs leading-relaxed text-muted-foreground text-pretty">{note}</p>}
      </div>
    </div>
  )
}
