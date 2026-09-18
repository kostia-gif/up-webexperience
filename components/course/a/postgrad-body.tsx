'use client'

import { InPageNav, PromiseLine, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CountryBanner } from '../postgrad/country-banner'
import { AccreditedDetails } from '../postgrad/details'
import { EligibilityAndRpl } from '../postgrad/eligibility'
import { PostgradHero } from '../postgrad/hero'
import { IntlTeam } from '../postgrad/intl-team'
import { Progression } from '../postgrad/progression'
import { BookSpecialist } from '../postgrad/specialist'
import { StickyCta } from '../postgrad/sticky-cta'
import { StudyFromProvider, useStudyFrom } from '../postgrad/study-from'
import { BusinessBuilder } from './business-builder'
import { FeesLite } from './fees-lite'
import { PostgradStart } from './postgrad-start'

const DOMESTIC_NAV: [string, string][] = [
  ['#apply', 'Get started'],
  ['#specialist', 'Talk to us'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#outcomes', 'Jobs'],
  ['#eligibility', 'Eligibility'],
  ['#fees', 'Fees'],
  ['#practice', 'Your own practice'],
]

const INTL_NAV: [string, string][] = [
  ['#apply', 'Get started'],
  ['#international', 'International team'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#outcomes', 'Jobs'],
  ['#eligibility', 'Eligibility'],
  ['#fees', 'Fees'],
  ['#practice', 'Your own practice'],
]

/**
 * Option A for AIPC, trimmed to the same lean, action-first rhythm as NZMA,
 * Elite and Yoobee: hero, pick a date, talk to a person, then what it's like,
 * progression, jobs, eligibility, cost, and the practice planner. The dense
 * market-demand, comparison, quick-answers, engage-band and dig-deeper
 * sections are gone to take the complexity away.
 */
function Body() {
  const { isIntl } = useStudyFrom()
  return (
    <main className="pb-20 md:pb-16">
      <PostgradHero
        primaryCta={{ href: '#guide', label: 'Download the course guide', cta: 'guide' }}
        secondaryCta={{ href: isIntl ? '#international' : '#specialist', label: 'Book a time with an advisor', cta: 'specialist' }}
        hideFeeStats
      />
      <CountryBanner />
      <PromiseLine />
      <PostgradStart />
      {isIntl ? <IntlTeam /> : <BookSpecialist />}
      <InPageNav items={isIntl ? INTL_NAV : DOMESTIC_NAV} />
      <WhatItsLike />
      <Progression />
      <WhereItTakesYou />
      <EligibilityAndRpl />
      <FeesLite />
      <BusinessBuilder />
      <Faqs />
      <AccreditedDetails />
      <StickyCta />
    </main>
  )
}

export function PostgradBodyA() {
  return (
    <StudyFromProvider>
      <Body />
    </StudyFromProvider>
  )
}
