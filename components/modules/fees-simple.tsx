'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Placeholder } from './ui'

export type FeePlan = { id: string; label: string; note: string; months: number }

/**
 * Pricing in the Option A spirit, with the total course fee first and the
 * monthly spread second. One number to remember, then how to pay it.
 */
export function FeesSimple({
  total,
  totalNote,
  currency,
  plans,
  facts,
  talkHref,
  talkLabel = 'a 20-minute call',
}: {
  total: number
  totalNote: string
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
    <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total course fee</p>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold leading-none">{money(total)}</span>
            <Placeholder className="self-center" />
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{totalNote}</p>
        </div>

        <div className={cn('flex flex-col gap-3 border-t border-border pt-5', plans.length === 1 && 'hidden md:flex')}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Spread over the course</p>
          {plans.length > 1 && (
            <div role="tablist" aria-label="Study load" className={cn('grid gap-1 rounded-lg bg-muted p-1', plans.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
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
          )}
          <p className="flex items-baseline gap-1.5">
            <span className="text-sm text-muted-foreground">about</span>
            <span className="font-display text-3xl font-bold leading-none">{money(perMonth)}</span>
            <span className="text-sm text-muted-foreground">/ month over {plan.note}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Payment options</p>
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
          For figures specific to your situation, ask{' '}
          <a href={talkHref} className="font-medium text-primary underline underline-offset-4 hover:no-underline">
            {talkLabel}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
