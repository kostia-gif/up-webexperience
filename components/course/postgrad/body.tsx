'use client'

import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { ApplyBoard } from './apply'
import { HowWeCompare } from './compare'
import { CountryBanner } from './country-banner'
import { AccreditedDetails } from './details'
import { DigDeeper } from './dig-deeper'
import { EligibilityAndRpl } from './eligibility'
import { EngageBand } from './engage-band'
import { FeesAndHelp } from './fees'
import { PostgradHero } from './hero'
import { IntlFees } from './intl-fees'
import { IntlTeam } from './intl-team'
import { MarketDemand } from './market-demand'
import { Progression } from './progression'
import { BookSpecialist } from './specialist'
import { StickyCta } from './sticky-cta'
import { StudyFromProvider, useStudyFrom } from './study-from'

const DOMESTIC_NAV: [string, string][] = [
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#fees', 'Fees and FEE-HELP'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#deeper', 'Dig deeper'],
  ['#specialist', 'Talk to us'],
]

const INTL_NAV: [string, string][] = [
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#intl-fees', 'International fees'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#deeper', 'Dig deeper'],
  ['#international', 'International team'],
]

function Body() {
  const { isIntl } = useStudyFrom()
  return (
    <main className="pb-20 md:pb-16">
      <PostgradHero />
      <CountryBanner />
      <PromiseLine />
      <QuickAnswers />
      <InPageNav items={isIntl ? INTL_NAV : DOMESTIC_NAV} />
      <MarketDemand />
      <HowWeCompare />
      <WhatItsLike />
      <Progression />
      <WhereItTakesYou />
      <EngageBand />
      {isIntl ? <IntlFees /> : <FeesAndHelp />}
      <EligibilityAndRpl />
      <ApplyBoard />
      <DigDeeper />
      {isIntl ? <IntlTeam /> : <BookSpecialist />}
      <CareerCoach />
      <Faqs />
      <AccreditedDetails />
      <StickyCta />
    </main>
  )
}

export function PostgradBody() {
  return (
    <StudyFromProvider>
      <Body />
    </StudyFromProvider>
  )
}
