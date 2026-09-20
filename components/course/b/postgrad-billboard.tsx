'use client'

import Image from 'next/image'
import { CalendarClock, Download, MessageCircle } from 'lucide-react'
import { track } from '@/lib/track'
import { LinkBtn } from '../primitives'
import { usePostgrad } from '../postgrad/context'
import { useStudyFrom } from '../postgrad/study-from'

/**
 * A bright, elegant split hero for AIPC's Option A. Action-first like the other
 * three schools (choose a date, download the guide, or talk to us), but light
 * and positive rather than a dark full-bleed overlay — a clean clinical feel
 * with a warm daylight study photo alongside the copy.
 */
export function PostgradBillboard() {
  const { course, pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const { hero, outcomes } = course
  const next = pg.intakes[0]
  const talkHref = isIntl ? '#international' : '#specialist'

  return (
    <section aria-labelledby="hero-title" className="bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-14 pt-20 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-24">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary-foreground">
            {course.discipline} · Postgraduate · AQF Level {pg.provider.aqf}
          </p>

          <h1
            id="hero-title"
            className="font-display text-4xl leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {hero.h1}
            {hero.h1Accent && (
              <>
                {' '}
                <span className="text-coral">{hero.h1Accent}</span>
              </>
            )}
            .
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
            {hero.sub} Next intake starts <span className="font-medium text-foreground">{next.start}</span>.
          </p>

          <ul aria-label="Accreditation and approvals" className="flex flex-wrap gap-2">
            {pg.accreditations.map((a) => (
              <li
                key={a.body}
                className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {a.short}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkBtn
              href="#apply"
              variant="coral"
              className="min-h-14 px-6 text-base"
              onClick={() => track('hero_cta_click', { cta: 'choose_date' })}
            >
              <CalendarClock className="size-5" aria-hidden /> Choose a start date
            </LinkBtn>
            <LinkBtn
              href="#guide"
              variant="outline"
              className="min-h-14 px-6 text-base"
              onClick={() => track('hero_cta_click', { cta: 'guide' })}
            >
              <Download className="size-5" aria-hidden /> Download the guide
            </LinkBtn>
            <LinkBtn
              href={talkHref}
              variant="ghost"
              className="min-h-14 px-6 text-base text-foreground hover:bg-secondary"
              onClick={() => track('hero_cta_click', { cta: 'talk' })}
            >
              <MessageCircle className="size-5" aria-hidden /> Talk to us
            </LinkBtn>
          </div>

          <p className="text-sm text-muted-foreground">
            {outcomes.stat && (
              <>
                {outcomes.stat.value} of the {outcomes.stat.cohort} class: {outcomes.stat.label.toLowerCase()}.{' '}
              </>
            )}
            Any bachelor degree gets you in.{' '}
            <a href="#eligibility" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
              Check eligibility
            </a>
          </p>
        </div>

        <div className="relative order-first md:order-last">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary sm:aspect-[5/4] md:aspect-[4/5]">
            <Image
              src="/images/aipc/hero-home-study.png"
              alt="A woman studying at home at a sunlit table with her laptop and notes"
              fill
              priority
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
