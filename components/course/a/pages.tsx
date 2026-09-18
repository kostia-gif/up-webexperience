import type { Course } from '@/lib/course'
import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from '../above-fold'
import { BasketBar, CheckoutDrawer } from '../basket'
import { BasketProvider } from '../basket-context'
import { Faqs, FormalBit, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { CourseStructure } from '../course-structure'
import { Eligibility } from '../eligibility'
import { Billboard } from '../emotional/billboard'
import { StartBar } from '../emotional/start-bar'
import { StartNow } from '../emotional/start-now'
import { StudentVoices } from '../emotional/talk-and-voices'
import { FreeAndFunded } from '../free-and-funded'
import { Hero } from '../hero'
import { IntakePicker } from '../intake-picker'
import { Journey } from '../journey'
import { Shell } from '../shell'
import { ReadinessKit } from '../readiness-kit'
import { WhatYouAchieve } from '../what-you-achieve'
import { PostgradBodyA } from './postgrad-body'
import { SeeItCard } from './see-it-card'
import { TalkA } from './talk'

const VOCATIONAL_NAV: [string, string][] = [
  ['#start', 'Start dates'],
  ['#talk', 'Talk to someone'],
  ['#voices', 'Students'],
  ['#journey', 'Your year'],
  ['#like', "What it's like"],
  ['#outcomes', 'Jobs'],
  ['#eligibility', 'Am I in'],
  ['#money', 'Cost'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

/**
 * Option A for NZMA and Elite. Billboard, pick a date, talk to a person,
 * then reassurance. "See it before you decide" floats in as a card once the
 * reader is past the journey, instead of taking a section low on the page.
 */
export function VocationalCoursePageA({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <main className="pb-20">
        <Billboard />
        <StartNow />
        <TalkA />
        <InPageNav items={VOCATIONAL_NAV} />
        <StudentVoices />
        <Journey />
        <WhatItsLike />
        <WhereItTakesYou />
        <Eligibility />
        <FreeAndFunded />
        <CareerCoach />
        <Faqs />
        <CourseStructure />
        <FormalBit />
      </main>
      <StartBar />
      <SeeItCard />
    </Shell>
  )
}

const ONLINE_NAV: [string, string][] = [
  ['#intakes', 'Sign up'],
  ['#talk', 'Talk to someone'],
  ['#achieve', 'What you get'],
  ['#like', "What it's like"],
  ['#journey', 'Your journey'],
  ['#eligibility', 'Am I in'],
  ['#money', 'Free and funded'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

/**
 * Option A for Yoobee. Online and a step up in level, so the existing hero
 * and promise stay, but the sign-up picker and a named advisor move up to
 * sit directly under them, and money moves down past eligibility.
 */
export function OnlineCoursePageA({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <BasketProvider>
        <main className="pb-24">
          <Hero facts={false} />
          <PromiseLine />
          <IntakePicker />
          <TalkA tone="card" />
          <QuickAnswers />
          <InPageNav items={ONLINE_NAV} />
          <WhatYouAchieve />
          <WhatItsLike />
          <Journey dayOne={<ReadinessKit />} />
          <WhereItTakesYou />
          <Eligibility />
          <FreeAndFunded />
          <CareerCoach />
          <Faqs />
          <CourseStructure />
          <FormalBit />
        </main>
        <BasketBar />
        <CheckoutDrawer />
      </BasketProvider>
    </Shell>
  )
}

/** Option A for AIPC. Apply and specialist move up under the promise; fees move down past eligibility. */
export function PostgradCoursePageA({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <PostgradBodyA />
    </Shell>
  )
}
