'use client'

import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { ApplyBoard } from './apply'
import { HowWeCompare } from './compare'
import { CountryBanner } from './country-banner'
import { AccreditedDetails } from './details'
import { EligibilityAndRpl } from './eligibility'
import { FeesAndHelp } from './fees'
import { PostgradHero } from './hero'
import { IntlFees } from './intl-fees'
import { IntlTeam } from './intl-team'
import { Progression } from './progression'
import { BookSpecialist } from './specialist'
import { StudyFromProvider, useStudyFrom } from './study-from'

const DOMESTIC_NAV: [string, string][] = [
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#fees', 'Fees and FEE-HELP'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#specialist', 'Talk to us'],
  ['#details', 'Details'],
]

const INTL_NAV: [string, string][] = [
  ['#why', 'Why AIPC'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#intl-fees', 'International fees'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#international', 'International team'],
  ['#details', 'Details'],
]

function Body() {
  const { isIntl } = useStudyFrom()
  return (
    <main>
      <PostgradHero />
      <CountryBanner />
      <PromiseLine />
      <QuickAnswers />
      <InPageNav items={isIntl ? INTL_NAV : DOMESTIC_NAV} />
      <HowWeCompare />
      <WhatItsLike />
      <Progression />
      <WhereItTakesYou />
      {isIntl ? <IntlFees /> : <FeesAndHelp />}
      <EligibilityAndRpl />
      <ApplyBoard />
      {isIntl ? <IntlTeam /> : <BookSpecialist />}
      <CareerCoach />
      <Faqs />
      <AccreditedDetails />
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
