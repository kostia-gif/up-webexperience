'use client'

import Image from 'next/image'
import { ArrowDown, CalendarClock, MessageCircle } from 'lucide-react'
import { formatNZD } from '@/lib/course'
import { track } from '@/lib/track'
import { useCourse } from '../course-context'
import { LinkBtn } from '../primitives'

export function Billboard() {
  const course = useCourse()
  const { hero, outcomes, quick, funding } = course
  const salary = outcomes.salary

  return (
    <section aria-labelledby="hero-title" className="relative bg-foreground text-background">
      <div className="absolute inset-0">
        <Image src={hero.image} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-[960px] flex-col justify-end gap-6 px-6 pb-10 pt-24 md:min-h-[640px] md:pb-14">
        <p className="text-xs font-medium uppercase tracking-wide text-background/80">
          {course.deliveredBy} · {quick.length} · {quick.where}
        </p>

        <h1
          id="hero-title"
          className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          {hero.h1}.
          {salary && (
            <>
              <br />
              <span className="text-coral">Earn {formatNZD(salary.start)}</span> to start.
            </>
          )}
        </h1>

        <p className="max-w-lg text-lg leading-relaxed text-pretty text-background/90 md:text-xl">
          {hero.sub} Next class starts <span className="font-medium text-background">{quick.nextStart}</span>.
          {funding.loanApproved && ' Nothing to pay upfront.'}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LinkBtn
            href="#start"
            variant="coral"
            className="min-h-14 px-6 text-base"
            onClick={() => track('hero_cta_click', { cta: 'start_now' })}
          >
            <ArrowDown className="size-5" aria-hidden /> Start {quick.nextStart}
          </LinkBtn>
          <LinkBtn
            href="#start"
            variant="outline"
            className="min-h-14 border-background/50 bg-transparent px-6 text-base text-background hover:border-background hover:bg-background/10"
            onClick={() => track('hero_cta_click', { cta: 'start_later' })}
          >
            <CalendarClock className="size-5" aria-hidden /> Start later
          </LinkBtn>
          <LinkBtn
            href="#talk"
            variant="outline"
            className="min-h-14 border-background/50 bg-transparent px-6 text-base text-background hover:border-background hover:bg-background/10"
            onClick={() => track('hero_cta_click', { cta: 'talk' })}
          >
            <MessageCircle className="size-5" aria-hidden /> Talk to someone
          </LinkBtn>
        </div>

        <p className="text-sm text-background/75">
          {outcomes.stat && (
            <>
              {outcomes.stat.value} of the {outcomes.stat.cohort} class: {outcomes.stat.label.toLowerCase()}.{' '}
            </>
          )}
          You need to be {course.entry.minAge}+. That&apos;s about it.
        </p>
      </div>
    </section>
  )
}
