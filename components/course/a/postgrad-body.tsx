'use client'

import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { ApplyBoard } from '../postgrad/apply'
import { HowWeCompare } from '../postgrad/compare'
import { CountryBanner } from '../postgrad/country-banner'
import { AccreditedDetails } from '../postgrad/details'
import { DigDeeper } from '../postgrad/dig-deeper'
import { EligibilityAndRpl } from '../postgrad/eligibility'
import { EngageBand } from '../postgrad/engage-band'
import { FeesAndHelp } from '../postgrad/fees'
import { PostgradHero } from '../postgrad/hero'
import { IntlFees } from '../postgrad/intl-fees'
import { IntlTeam } from '../postgrad/intl-team'
import { MarketDemand } from '../postgrad/market-demand'
import { Progression } from '../postgrad/progression'
import { BookSpecialist } from '../postgrad/specialist'
import { StickyCta } from '../postgrad/sticky-cta'
import { StudyFromProvider, useStudyFrom } from '../postgrad/study-from'

const DOMESTIC_NAV: [string, string][] = [
  ['#apply', 'Apply'],
  ['#specialist', 'Talk to us'],
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#eligibility', 'Eligibility and credit'],
  ['#fees', 'Fees and FEE-HELP'],
  ['#deeper', 'Dig deeper'],
]

const INTL_NAV: [string, string][] = [
  ['#apply', 'Apply'],
  ['#international', 'International team'],
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#eligibility', 'Eligibility and credit'],
  ['#intl-fees', 'International fees'],
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
      <EngageBand />
      <EligibilityAndRpl />
      {isIntl ? <IntlFees /> : <FeesAndHelp />}
      <DigDeeper />
      <CareerCoach />
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
