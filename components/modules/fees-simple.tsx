'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Placeholder } from './ui'

export type FeePlan = { id: string; label: string; note: string; months: number }

/**
 * The small, SaaS-style pricing module from Option A: one indicative figure a
 * month with a study-load toggle, and four plain facts beside it.
 */
export function FeesSimple({
  total,
  currency,
  plans,
  facts,
  talkHref,
  talkLabel = 'a 20-minute call',
}: {
  total: number
  currency: 'AUD' | 'NZD'
  plans: FeePlan[]
  facts: string[]
  talkHref: string
  talkLabel?: string
}) {
  const [planId, setPlanId] = useState(plans[0].id)
  const plan = plans.find((p) => p.id === planId) ?? plans[0]
  const money = (n: number) => n.toLocaleString(currency === 'AUD' ? 'en-AU' : 'en-NZ', { style: 'currency', currency, maximumFractionDigits: 0 })
  const perMonth = Math.round(total / plan.months)

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
        <div role="tablist" aria-label="Study load" className={cn('grid gap-1 rounded-lg bg-muted p-1', plans.length === 1 ? 'grid-cols-1' : plans.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
          {plans.map((p) => {
            const active = p.id === planId
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setPlanId(p.id)}
                className={cn('flex min-h-11 flex-col items-center justify-center rounded-md text-sm font-medium', active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              >
                {p.label}
                <span className="text-xs font-normal text-muted-foreground">{p.note}</span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-baseline gap-1.5">
            <span className="text-sm text-muted-foreground">from</span>
            <span className="font-display text-5xl leading-none">{money(perMonth)}</span>
            <span className="text-sm text-muted-foreground">/ month</span>
            <Placeholder className="ml-1 self-center" />
          </p>
          <p className="text-sm text-muted-foreground text-pretty">
            Indicative, studying {plan.label.toLowerCase()} over {plan.note}. Actual fees are charged per subject each trimester.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-2.5">
          {facts.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-pretty">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                <Check className="size-3.5" aria-hidden />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          Want the numbers for your exact situation? A course specialist can walk through it on{' '}
          <a href={talkHref} className="font-medium text-primary underline underline-offset-4 hover:no-underline">
            {talkLabel}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
