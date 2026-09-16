'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { courseHref } from '@/lib/course'
import { track } from '@/lib/track'
import { LinkBtn } from '../primitives'
import { OTHER, useIntl, useStudyFrom } from './study-from'

export function CountryBanner() {
  const { intl, course } = useIntl()
  const { country } = useStudyFrom()
  if (!country) return null

  const isOther = country.code === OTHER
  const story = intl.caseStudies.find((s) => s.slug === country.caseStudy) ?? intl.caseStudies[0]
  const quotes = country.testimonials.slice(0, 3)
  const storyHref = `${courseHref(course)}/stories/${story.slug}?from=${country.code}`

  return (
    <section aria-labelledby="country-title" className="border-y border-primary/15 bg-primary-tint text-primary-tint-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-8 md:py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">For students in {isOther ? 'other countries' : country.name}</p>
            <h2 id="country-title" className="max-w-[820px] font-display text-3xl leading-[1.1] tracking-(--display-tracking) text-balance md:text-4xl">
              {isOther ? (
                <>
                  {intl.totalStudents} students from {intl.totalCountries} countries have studied this degree with us in the last two years.
                </>
              ) : (
                <>
                  {country.students} students from {country.name} have studied this degree with us in the last two years.
                </>
              )}
            </h2>
            <p className="max-w-[640px] text-[15px] leading-relaxed text-pretty">
              Same degree, same lecturers, same qualification. The page now shows international fees and the team who work with students overseas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkBtn href="#international" variant="blue" onClick={() => track('country_banner_cta', { cta: 'team', country: country.code })}>
              Talk to the international team
            </LinkBtn>
            <LinkBtn
              href={`${courseHref(course)}/international?from=${country.code}`}
              variant="outline"
              onClick={() => track('country_banner_cta', { cta: 'guide', country: country.code })}
            >
              International guide
            </LinkBtn>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          {quotes.length > 0 && (
            <ul className="grid gap-3 md:col-span-7 md:grid-cols-1 lg:grid-cols-3">
              {quotes.map((t) => (
                <li key={t.name} className="flex flex-col gap-3 rounded-lg border border-primary/15 bg-card p-4 text-card-foreground">
                  <Quote className="size-5 text-coral" aria-hidden />
                  <p className="text-[15px] leading-relaxed text-pretty">{t.quote}</p>
                  <p className="mt-auto text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.name}</span>, {t.city}. {t.cohort}.{t.now && <> Now {t.now}.</>}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={storyHref}
            onClick={() => track('case_study_click', { slug: story.slug, country: country.code })}
            className={
              quotes.length > 0
                ? 'group flex overflow-hidden rounded-lg border border-primary/15 bg-card text-card-foreground md:col-span-5'
                : 'group flex overflow-hidden rounded-lg border border-primary/15 bg-card text-card-foreground md:col-span-12'
            }
          >
            <div className="relative w-2/5 shrink-0">
              <Image src={story.image.src} alt={story.image.alt} fill sizes="(max-width: 768px) 40vw, 240px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">Graduate story</p>
              <p className="font-display text-xl leading-tight text-balance">{story.headline}</p>
              <p className="text-sm text-muted-foreground">
                {story.name}, from {story.from}. Now {story.now}, working at {story.employer}.
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary group-hover:underline group-hover:underline-offset-4">
                Read how {story.name.split(' ')[0]} did it <ArrowRight className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
