'use client'

import Image from 'next/image'
import { CalendarClock, Download, MessageCircle } from 'lucide-react'
import { track } from '@/lib/track'
import { LinkBtn } from '../primitives'
import { usePostgrad } from '../postgrad/context'
import { useStudyFrom } from '../postgrad/study-from'

/**
 * A full-bleed image hero for AIPC's Option A, matching the Billboard used by
 * NZMA, Elite and Yoobee so the four schools open the same way. Action-first:
 * choose a date, download the guide, or talk to us.
 */
export function PostgradBillboard() {
  const { course, pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const { hero, outcomes } = course
  const next = pg.intakes[0]
  const talkHref = isIntl ? '#international' : '#specialist'

  return (
    <section aria-labelledby="hero-title" className="relative bg-foreground text-background">
      <div className="absolute inset-0">
        <Image src={hero.image} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/25" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-[960px] flex-col justify-end gap-6 px-6 pb-10 pt-24 md:min-h-[620px] md:pb-14">
        <p className="text-xs font-medium uppercase tracking-wide text-background/80">
          {course.discipline} · Postgraduate · AQF Level {pg.provider.aqf}
        </p>

        <h1
          id="hero-title"
          className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-balance sm:text-6xl md:text-7xl"
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

        <p className="max-w-lg text-lg leading-relaxed text-pretty text-background/90 md:text-xl">
          {hero.sub} Next intake starts <span className="font-medium text-background">{next.start}</span>.
        </p>

        <ul aria-label="Accreditation and approvals" className="flex flex-wrap gap-2">
          {pg.accreditations.map((a) => (
            <li
              key={a.body}
              className="inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-sm text-background/90"
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
            className="min-h-14 border-background/50 bg-transparent px-6 text-base text-background hover:border-background hover:bg-background/10"
            onClick={() => track('hero_cta_click', { cta: 'guide' })}
          >
            <Download className="size-5" aria-hidden /> Download the guide
          </LinkBtn>
          <LinkBtn
            href={talkHref}
            variant="outline"
            className="min-h-14 border-background/50 bg-transparent px-6 text-base text-background hover:border-background hover:bg-background/10"
            onClick={() => track('hero_cta_click', { cta: 'talk' })}
          >
            <MessageCircle className="size-5" aria-hidden /> Talk to us
          </LinkBtn>
        </div>

        <p className="text-sm text-background/75">
          {outcomes.stat && (
            <>
              {outcomes.stat.value} of the {outcomes.stat.cohort} class: {outcomes.stat.label.toLowerCase()}.{' '}
            </>
          )}
          Any bachelor degree gets you in.{' '}
          <a href="#eligibility" className="font-medium text-background underline underline-offset-4 hover:no-underline">
            Check eligibility
          </a>
        </p>
      </div>
    </section>
  )
}
