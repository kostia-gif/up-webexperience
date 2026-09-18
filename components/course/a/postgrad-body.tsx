'use client'

import { InPageNav, PromiseLine, WhatItsLike } from '../above-fold'
import { Faqs, WhereItTakesYou } from '../below-fold'
import { CountryBanner } from '../postgrad/country-banner'
import { AccreditedDetails } from '../postgrad/details'
import { EligibilityAndRpl } from '../postgrad/eligibility'
import { IntlTeam } from '../postgrad/intl-team'
import { Progression } from '../postgrad/progression'
import { StickyCta } from '../postgrad/sticky-cta'
import { StudyFromProvider, useStudyFrom } from '../postgrad/study-from'
import { BusinessBuilder } from './business-builder'
import { FeesLite } from './fees-lite'
import { PostgradBillboard } from './postgrad-billboard'
import { PostgradStart } from './postgrad-start'
import { PostgradTalk } from './postgrad-talk'

const DOMESTIC_NAV: [string, string][] = [
  ['#apply', 'Get started'],
  ['#specialist', "Let's talk"],
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
      <PostgradBillboard />
      <CountryBanner />
      <PromiseLine />
      <PostgradStart />
      {isIntl ? <IntlTeam /> : <PostgradTalk />}
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
