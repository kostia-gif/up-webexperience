'use client'

import { Check, HandCoins } from 'lucide-react'
import { useRef, useState } from 'react'
import { formatNZD, isFree } from '@/lib/course'
import { track } from '@/lib/track'
import { useCourse } from './course-context'
import { IndustryCard } from './hero'
import { MoneyPanel } from './money'

export function FreeAndFunded() {
  const [moneyOpen, setMoneyOpen] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)
  const course = useCourse()
  const { fee, funding, outcomes, copy } = course
  const free = isFree(course)

  function openMoney(e: React.MouseEvent<HTMLElement>) {
    openerRef.current = e.currentTarget
    track('hero_cta_click', { cta: 'money_card' })
    setMoneyOpen(true)
  }

  return (
    <section id="money" aria-labelledby="money-module-title" className="scroll-mt-20 bg-background">
      <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-6 pb-10 pt-8 md:pt-2">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {free ? `Free for domestic students, ${fee.year}` : `Fees and funding, ${fee.year}`}
          </p>
          <h2
            id="money-module-title"
            className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl"
          >
            {free ? 'Nothing to pay. Help to live on while you learn.' : 'What it costs and how to pay'}
          </h2>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {free ? (
            <div className="flex flex-col gap-1 rounded-lg bg-coral p-4 text-coral-foreground">
              <p className="text-xs font-medium">Total cost, {fee.year}</p>
              <p className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold leading-none">$0</span>
                {fee.standardAmount && <s className="text-sm opacity-70">{formatNZD(fee.standardAmount)}</s>}
              </p>
              <p className="mt-1 text-sm">{copy.feeSub}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-medium text-muted-foreground">Total cost, {fee.year}</p>
              <p className="font-display text-4xl font-bold leading-none">{formatNZD(fee.amount)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{copy.feeSub}</p>
            </div>
          )}

          {funding.loanApproved && (
            <div className="flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <HandCoins className="size-4" aria-hidden /> Living costs while you study
              </p>
              <p className="font-display text-4xl font-bold leading-none">Up to ${funding.livingCostsMax}/wk</p>
              <p className="mt-1 flex items-start gap-1.5 text-sm leading-snug">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  You may be eligible for a Student Allowance or a StudyLink living-costs loan, plus{' '}
                  {formatNZD(funding.courseRelatedCosts)} for gear. Paid to you, not to us.
                </span>
              </p>
              <button
                type="button"
                onClick={openMoney}
                className="mt-1 self-start text-sm font-medium underline underline-offset-4 hover:no-underline"
              >
                how it works and who qualifies
              </button>
            </div>
          )}

          {outcomes.stat && <IndustryCard stat={outcomes.stat} salary={outcomes.salary} />}
        </div>
      </div>

      <MoneyPanel open={moneyOpen} onClose={() => setMoneyOpen(false)} returnFocusTo={openerRef.current} />
    </section>
  )
}
