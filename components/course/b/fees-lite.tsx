'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { usePostgrad } from '../postgrad/context'
import { Module } from '../primitives'

type Load = 'ft' | 'pt'

const PLANS: Record<Load, { label: string; note: string; months: number }> = {
  ft: { label: 'Full-time', note: '2 years', months: 24 },
  pt: { label: 'Part-time', note: '4 years', months: 48 },
}

/**
 * Deliberately small, SaaS-style pricing for Option A: one headline number —
 * an indicative cost per month — with a full-time / part-time toggle, instead
 * of the full fees module with per-unit tables and calculators.
 */
export function FeesLite() {
  const { pg, money } = usePostgrad()
  const f = pg.fees
  const [load, setLoad] = useState<Load>('pt')
  const plan = PLANS[load]
  const perMonth = Math.round(f.total / plan.months)

  const facts = [
    `${money(f.total)} total course fee — nothing extra`,
    '$0 upfront: defer the lot with FEE-HELP if eligible',
    'Pay as you study, trimester by trimester',
    'Withdraw before a unit’s census date and pay nothing for it',
  ]

  return (
    <Module id="fees" eyebrow="What it costs" title="Simple monthly pricing" wide>
      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
          <div role="tablist" aria-label="Study load" className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
            {(Object.keys(PLANS) as Load[]).map((key) => {
              const active = key === load
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setLoad(key)}
                  className={`flex min-h-11 flex-col items-center justify-center rounded-md text-sm font-medium ${
                    active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {PLANS[key].label}
                  <span className="text-xs font-normal text-muted-foreground">{PLANS[key].note}</span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex items-baseline gap-1.5">
              <span className="text-sm text-muted-foreground">from</span>
              <span className="font-display text-5xl leading-none">{money(perMonth)}</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
            <p className="text-sm text-muted-foreground text-pretty">
              Indicative, studying {plan.label.toLowerCase()} over {plan.note}. Actual fees are charged per unit each trimester.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-2.5">
            {facts.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5 text-[15px] leading-snug text-pretty">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {fact}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Want the numbers for your exact situation? A course specialist can walk through FEE-HELP and repayments on a{' '}
            <a href="#specialist" className="font-medium text-primary underline underline-offset-4 hover:no-underline">
              15-minute call
            </a>
            .
          </p>
        </div>
      </div>
    </Module>
  )
}
