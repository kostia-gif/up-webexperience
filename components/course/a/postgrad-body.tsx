'use client'

import { Building2 } from 'lucide-react'
import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { ApplyBoard } from '../postgrad/apply'
import { HowWeCompare } from '../postgrad/compare'
import { CountryBanner } from '../postgrad/country-banner'
import { AccreditedDetails } from '../postgrad/details'
import { DigDeeper } from '../postgrad/dig-deeper'
import { EligibilityAndRpl } from '../postgrad/eligibility'
import { EngageBand } from '../postgrad/engage-band'
import { PostgradHero } from '../postgrad/hero'
import { IntlTeam } from '../postgrad/intl-team'
import { MarketDemand } from '../postgrad/market-demand'
import { Progression } from '../postgrad/progression'
import { BookSpecialist } from '../postgrad/specialist'
import { StickyCta } from '../postgrad/sticky-cta'
import { StudyFromProvider, useStudyFrom } from '../postgrad/study-from'
import { BusinessBuilder } from './business-builder'
import { FeesLite } from './fees-lite'

const DOMESTIC_NAV: [string, string][] = [
  ['#apply', 'Apply'],
  ['#specialist', 'Talk to us'],
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#eligibility', 'Eligibility and credit'],
  ['#practice', 'Your own practice'],
  ['#deeper', 'Dig deeper'],
]

const INTL_NAV: [string, string][] = [
  ['#apply', 'Apply'],
  ['#international', 'International team'],
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#eligibility', 'Eligibility and credit'],
  ['#practice', 'Your own practice'],
  ['#deeper', 'Dig deeper'],
]

function Body() {
  const { isIntl } = useStudyFrom()
  return (
    <main className="pb-20 md:pb-16">
      <PostgradHero />
      <CountryBanner />
      <PromiseLine />
      <ApplyBoard />
      {isIntl ? <IntlTeam /> : <BookSpecialist />}
      <QuickAnswers />
      <InPageNav items={isIntl ? INTL_NAV : DOMESTIC_NAV} />
      <MarketDemand />
      <HowWeCompare />
      <WhatItsLike />
      <Progression />
      <WhereItTakesYou />
      <EngageBand
        midAction={{
          icon: Building2,
          title: 'Plan your own practice',
          body: 'Map the degree against the counselling practice you want to build.',
          href: '#practice',
          cta: 'practice',
        }}
      />
      <EligibilityAndRpl />
      <FeesLite />
      <BusinessBuilder />
      <DigDeeper />
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
