import type { Course } from '@/lib/course'
import { InPageNav, WhatItsLike } from '../above-fold'
import { Faqs, FormalBit, WhereItTakesYou } from '../below-fold'
import { CareerCoach } from '../career-coach'
import { CourseStructure } from '../course-structure'
import { Eligibility } from '../eligibility'
import { Billboard } from '../emotional/billboard'
import { StartBar } from '../emotional/start-bar'
import { StartNow } from '../emotional/start-now'
import { StudentVoices } from '../emotional/talk-and-voices'
import { FreeAndFunded } from '../free-and-funded'
import { Journey } from '../journey'
import { ReadinessKit } from '../readiness-kit'
import { Shell } from '../shell'
import { TryIt } from '../try-it'
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
  ['#tryit', 'Come visit'],
  ['#eligibility', 'Am I in'],
  ['#money', 'Cost'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

/**
 * Option A for NZMA and Elite. Billboard, pick a date, talk to a person,
 * then reassurance. "See it before you decide" floats in as an inviting card
 * once the reader is past the journey, and the same module also sits inline
 * lower down for anyone who scrolls straight past the nudge.
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
        <TryIt />
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
  ['#start', 'Start dates'],
  ['#talk', 'Talk to someone'],
  ['#achieve', 'What you get'],
  ['#like', "What it's like"],
  ['#journey', 'Your journey'],
  ['#outcomes', 'Jobs'],
  ['#eligibility', 'Am I in'],
  ['#money', 'Free and funded'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

/**
 * Option A for Yoobee. Same simple structure as NZMA and Elite: a billboard,
 * pick a start date, then talk to a person, with cost sitting low. The old
 * basket and multi-step checkout are dropped to take complexity away.
 */
export function OnlineCoursePageA({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <main className="pb-20">
        <Billboard />
        <StartNow />
        <TalkA />
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
      <StartBar />
      <SeeItCard />
    </Shell>
  )
}

/**
 * Option A for AIPC. Same action-first shape: hero, apply for a place, talk to
 * a specialist, then reassurance. The complex fees module is gone and the AI
 * coach is replaced by a "start your own practice" planner.
 */
export function PostgradCoursePageA({ course }: { course: Course }) {
  // Option A drops the comparison section, so the shared "Why AIPC" header
  // link (#why) has no target here. Neutralize it to match the other
  // placeholder header items without touching the shared course data.
  const courseA: Course = {
    ...course,
    brand: {
      ...course.brand,
      nav: course.brand.nav.map((item) => (item.href === '#why' ? { ...item, href: '#' } : item)),
    },
  }
  return (
    <Shell course={courseA}>
      <PostgradBodyA />
    </Shell>
  )
}
