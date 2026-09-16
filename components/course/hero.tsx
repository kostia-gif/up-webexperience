'use client'

import Image from 'next/image'
import { Check, HandCoins, TrendingUp, Wallet } from 'lucide-react'
import { useRef, useState } from 'react'
import { formatNZD, isFree, type Course } from '@/lib/course'
import { track } from '@/lib/track'
import { useCourse } from './course-context'
import { LinkBtn } from './primitives'
import { MoneyPanel } from './money'

export function Hero({ facts = true }: { facts?: boolean }) {
  const [moneyOpen, setMoneyOpen] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)
  const course = useCourse()
  const { hero, fee, funding, outcomes, copy, quick } = course
  const free = isFree(course)

  function openMoney(e: React.MouseEvent<HTMLElement>, cta: string) {
    openerRef.current = e.currentTarget
    track('hero_cta_click', { cta })
    setMoneyOpen(true)
  }

  return (
    <section aria-labelledby="hero-title" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-0 md:px-6 md:pt-8">
        <div className="flex flex-col md:grid md:grid-cols-12 md:items-stretch">
          <div className="relative aspect-[4/3] md:col-span-7 md:col-start-6 md:row-start-1 md:aspect-auto md:min-h-[520px]">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>

          <div className="relative bg-primary px-6 py-8 text-primary-foreground md:col-span-6 md:col-start-1 md:row-start-1 md:my-10 md:px-10 md:py-12">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
              {course.discipline} · {course.deliveredBy}
              {course.deliveredBy !== course.brand.legalName && ` · ${course.brand.name}`}
            </p>
            <h1
              id="hero-title"
              className="mt-4 font-display text-(length:--display-xl) font-bold uppercase leading-[0.92] tracking-(--display-tracking) text-balance"
            >
              {hero.h1}
            </h1>
            <p className="mt-3 text-base font-medium leading-snug text-pretty text-primary-foreground/95">{course.title}</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-pretty text-primary-foreground/90">{hero.sub}</p>
            {!facts && (
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {free ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-sm font-medium text-coral-foreground">
                      <Check className="size-4" aria-hidden /> Free for domestic students, {fee.year}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium">
                      {formatNZD(fee.amount)}, {fee.year}
                    </span>
                  )}
                  {funding.loanApproved && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-sm">
                      <HandCoins className="size-4" aria-hidden /> Living costs up to ${funding.livingCostsMax}/wk if eligible
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary-foreground/75">
                  Next start {quick.nextStart} · {quick.length} · {quick.where}
                </p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkBtn href={copy.heroTryHref ?? '#tryit'} variant="coral" onClick={() => track('hero_cta_click', { cta: 'try' })}>
                {copy.heroTry}
              </LinkBtn>
              <LinkBtn
                href="#eligibility"
                variant="outline"
                className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => track('hero_cta_click', { cta: 'eligibility' })}
              >
                Am I in?
              </LinkBtn>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Not sure?{' '}
              <a href="#coach" className="font-medium text-primary-foreground underline underline-offset-4 hover:no-underline">
                Talk it through with a career coach
              </a>
            </p>
          </div>
        </div>

        {facts && (
        <div className="mx-auto mt-6 grid max-w-[960px] gap-3 px-6 pb-8 sm:grid-cols-3 md:mt-8 md:px-0">
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
            <FactCard label={`Total cost, ${fee.year}`} value={formatNZD(fee.amount)} sub={copy.feeSub} />
          )}

          {free && funding.loanApproved ? (
            <div className="flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <HandCoins className="size-4" aria-hidden /> Living costs while you study
              </p>
              <p className="font-display text-4xl font-bold leading-none">Up to ${funding.livingCostsMax}/wk</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm">
                <Check className="size-4 shrink-0" aria-hidden />
                If eligible, via StudyLink. Plus {formatNZD(funding.courseRelatedCosts)} for gear
              </p>
              <button
                type="button"
                onClick={(e) => openMoney(e, 'money_card')}
                className="mt-1 self-start text-sm font-medium underline underline-offset-4 hover:no-underline"
              >
                how it works
              </button>
            </div>
          ) : funding.loanApproved ? (
            <div className="flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <Wallet className="size-4" aria-hidden /> Pay with a student loan
              </p>
              <p className="font-display text-4xl font-bold leading-none">$0 upfront</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm">
                <Check className="size-4 shrink-0" aria-hidden />
                Approved for StudyLink loans
              </p>
              <button
                type="button"
                onClick={(e) => openMoney(e, 'money_card')}
                className="mt-1 self-start text-sm font-medium underline underline-offset-4 hover:no-underline"
              >
                how it works
              </button>
            </div>
          ) : (
            <FactCard label="How to pay" value="Options" sub="Pay upfront, in instalments, or ask about StudyLink." />
          )}

          {outcomes.stat && <IndustryCard stat={outcomes.stat} salary={outcomes.salary} />}
        </div>
        )}
      </div>

      {facts && <MoneyPanel open={moneyOpen} onClose={() => setMoneyOpen(false)} returnFocusTo={openerRef.current} />}
    </section>
  )
}

export function IndustryCard({
  stat,
  salary,
}: {
  stat: NonNullable<Course['outcomes']['stat']>
  salary?: Course['outcomes']['salary']
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <TrendingUp className="size-4" aria-hidden />
        {stat.label}
      </p>
      <p className="font-display text-4xl font-bold leading-none">{stat.value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{stat.cohort} graduates</p>

      {salary && (
        <dl className="mt-3 flex flex-col gap-0.5 border-t border-border pt-3">
          <dt className="text-xs font-medium text-muted-foreground">3-year goal salary</dt>
          <dd className="font-display text-2xl font-bold leading-none text-primary">{formatNZD(salary.threeYear)}</dd>
          <dd className="mt-0.5 text-xs leading-snug text-muted-foreground">Industry figure, {salary.year}.</dd>
        </dl>
      )}
    </div>
  )
}

function FactCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string
  value: string
  sub: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="font-display text-4xl font-bold leading-none">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
