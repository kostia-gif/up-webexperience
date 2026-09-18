'use client'

import Image from 'next/image'
import { ArrowRight, BadgeCheck, Globe, Landmark, ShieldCheck, TrendingUp } from 'lucide-react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { LinkBtn } from '../primitives'
import { usePostgrad } from './context'
import { CountryPicker } from './country-picker'
import { useStudyFrom } from './study-from'

const ICONS = [BadgeCheck, ShieldCheck, Landmark]

type HeroCta = { href: string; label: string; cta: string }

export function PostgradHero({
  primaryCta,
  secondaryCta,
  hideFeeStats = false,
}: { primaryCta?: HeroCta; secondaryCta?: HeroCta; hideFeeStats?: boolean } = {}) {
  const { course, pg, money } = usePostgrad()
  const { isIntl, country } = useStudyFrom()
  const { hero, fee, outcomes } = course
  const uniRange = pg.comparison.find((c) => c.label === 'Total tuition')?.uni
  const intl = pg.international
  const tuition = isIntl && intl ? intl.fees.total : fee.amount
  const primary = primaryCta ?? { href: '#apply', label: 'Apply for a place', cta: 'apply' }
  const secondary =
    secondaryCta ?? {
      href: isIntl ? '#international' : '#specialist',
      label: isIntl ? 'Talk to the international team' : 'Book a 15-minute call',
      cta: isIntl ? 'international' : 'specialist',
    }

  return (
    <section aria-labelledby="hero-title" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-0 md:px-6 md:pt-8">
        {intl && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3 md:mb-6 md:border-0 md:px-0 md:py-0">
            <CountryPicker />
            <p className="text-sm text-muted-foreground">
              {isIntl ? 'Showing international fees and support.' : `${intl.totalStudents} students from ${intl.totalCountries} countries have studied this degree with us.`}
            </p>
          </div>
        )}
        <div className="flex flex-col md:grid md:grid-cols-12 md:items-stretch">
          <div className="relative aspect-[4/3] md:col-span-7 md:col-start-6 md:row-start-1 md:aspect-auto md:min-h-[560px]">
            <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
          </div>

          <div className="relative bg-primary px-6 py-8 text-primary-foreground md:col-span-6 md:col-start-1 md:row-start-1 md:my-10 md:px-10 md:py-12">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
              {course.discipline} · Postgraduate · AQF Level {pg.provider.aqf}
            </p>
            <h1 id="hero-title" className="mt-4 font-display text-(length:--display-xl) tracking-(--display-tracking) text-balance">
              {hero.h1}
              {hero.h1Accent && (
                <>
                  {' '}
                  <em className="font-serif text-[1.12em]">{hero.h1Accent}</em>
                </>
              )}
            </h1>
            <p className="mt-4 text-base font-medium leading-snug text-primary-foreground/95">
              {course.title} · {pg.structure.totalUnits} units · 2 years full-time or 4 part-time
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-pretty text-primary-foreground/90">{hero.sub}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Accreditation and approvals">
              {pg.accreditations.map((a, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <li key={a.body} className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-3 py-1.5 text-sm">
                    <Icon className="size-4 text-coral" aria-hidden />
                    {a.short}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkBtn href={primary.href} variant="coral" onClick={() => track('hero_cta_click', { cta: primary.cta })}>
                {primary.label}
              </LinkBtn>
              <LinkBtn
                href={secondary.href}
                variant="outline"
                className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => track('hero_cta_click', { cta: secondary.cta })}
              >
                {secondary.label}
              </LinkBtn>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Not sure you qualify?{' '}
              <a href="#eligibility" className="font-medium text-primary-foreground underline underline-offset-4 hover:no-underline">
                Check eligibility and credit first
              </a>
            </p>
          </div>
        </div>

        <div
          className={cn(
            'mx-auto mt-6 grid gap-3 px-6 pb-8 md:mt-8 md:px-0',
            hideFeeStats ? 'max-w-sm' : 'max-w-[960px] sm:grid-cols-3',
          )}
        >
          {!hideFeeStats && (
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">
              {isIntl ? 'Total tuition, international' : `Total tuition, ${fee.year}`}
            </p>
            <p className="font-display text-4xl leading-none">{money(tuition)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isIntl ? (
                <>
                  Australian dollars, fixed per unit, paid a trimester at a time.{' '}
                  <a href="#intl-fees" className="text-primary underline underline-offset-4">
                    See all costs
                  </a>
                </>
              ) : uniRange ? (
                <>
                  A university Master of Counselling is indicatively {uniRange}.{' '}
                  <a href="#why" className="text-primary underline underline-offset-4">
                    Compare
                  </a>
                </>
              ) : (
                course.copy.feeSub
              )}
            </p>
          </div>
          )}

          {!hideFeeStats && (isIntl && intl ? (
            <div className="flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <Globe className="size-4" aria-hidden /> Study from {country?.name}
              </p>
              <p className="font-display text-4xl leading-none">{money(intl.fees.deposit)} to hold</p>
              <p className="mt-1 text-sm">
                Whole degree online from home, or move for placement. Deposit refunded in full before census.{' '}
                <a href="#intl-fees" className="font-medium underline underline-offset-4 hover:no-underline">
                  Options
                </a>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <Landmark className="size-4" aria-hidden /> FEE-HELP approved
              </p>
              <p className="font-display text-4xl leading-none">$0 upfront</p>
              <p className="mt-1 text-sm">
                Defer all tuition if eligible. Repay through tax above about {money(pg.fees.feeHelpThreshold)} a year.{' '}
                <a href="#fees" className="font-medium underline underline-offset-4 hover:no-underline">
                  How it works
                </a>
              </p>
            </div>
          ))}

          {outcomes.stat && (
            <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="size-4" aria-hidden />
                {outcomes.stat.label}
              </p>
              <p className="font-display text-4xl leading-none">{outcomes.stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{outcomes.stat.cohort} graduates</p>
              {outcomes.salary && (
                <a href="#outcomes" className="mt-2 inline-flex items-center gap-1 border-t border-border pt-3 text-sm font-medium text-primary hover:underline hover:underline-offset-4">
                  Where graduates work <ArrowRight className="size-4" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
