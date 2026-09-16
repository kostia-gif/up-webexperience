'use client'

import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { AcademicLead } from './academic-lead'
import { ApplyBoard } from './apply'
import { CareerLadder } from './career-ladder'
import { HowWeCompare } from './compare'
import { CountryBanner } from './country-banner'
import { AccreditedDetails } from './details'
import { EligibilityAndRpl } from './eligibility'
import { FeesAndHelp } from './fees'
import { PostgradHero } from './hero'
import { IntlFees } from './intl-fees'
import { IntlTeam } from './intl-team'
import { MarketDemand } from './market-demand'
import { PathwayLadder } from './pathway-ladder'
import { Progression } from './progression'
import { ProgramGuide } from './program-guide'
import { BookSpecialist } from './specialist'
import { StudyRhythm } from './study-rhythm'
import { StudyFromProvider, useStudyFrom } from './study-from'

const DOMESTIC_NAV: [string, string][] = [
  ['#demand', 'Why now'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#pathways', 'Pathways'],
  ['#fees', 'Fees and FEE-HELP'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#specialist', 'Talk to us'],
]

const INTL_NAV: [string, string][] = [
  ['#demand', 'Why now'],
  ['#like', "What it's like"],
  ['#progression', 'Your progression'],
  ['#pathways', 'Pathways'],
  ['#intl-fees', 'International fees'],
  ['#eligibility', 'Eligibility and credit'],
  ['#apply', 'Apply'],
  ['#international', 'International team'],
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
      <MarketDemand />
      <HowWeCompare />
      <WhatItsLike />
      <StudyRhythm />
      <Progression />
      <PathwayLadder />
      <WhereItTakesYou />
      <CareerLadder />
      {isIntl ? <IntlFees /> : <FeesAndHelp />}
      <EligibilityAndRpl />
      <AcademicLead />
      <ApplyBoard />
      <ProgramGuide />
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
