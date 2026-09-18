import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { courseHref, type Course } from '@/lib/course'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { InPageNav, PromiseLine, QuickAnswers, WhatItsLike } from './above-fold'
import { BasketBar, CheckoutDrawer } from './basket'
import { BasketProvider } from './basket-context'
import { Faqs, FormalBit, WhereItTakesYou } from './below-fold'
import { CareerCoach } from './career-coach'
import { CourseProvider } from './course-context'
import { Eligibility } from './eligibility'
import { Billboard } from './emotional/billboard'
import { StartBar } from './emotional/start-bar'
import { StartNow } from './emotional/start-now'
import { StudentVoices, TalkToSomeone } from './emotional/talk-and-voices'
import { FreeAndFunded } from './free-and-funded'
import { Hero } from './hero'
import { IntakeBoard } from './intake-board'
import { IntakePicker } from './intake-picker'
import { Journey } from './journey'
import { MoneyContent } from './money'
import { PostgradBody } from './postgrad/body'
import { ReadinessKit } from './readiness-kit'
import { TryIt } from './try-it'
import { WhatYouAchieve } from './what-you-achieve'

function Shell({ course, children }: { course: Course; children: ReactNode }) {
  return (
    <CourseProvider course={course}>
      <div data-brand={course.brand.id} className="bg-background text-foreground">
        <SiteHeader brand={course.brand} />
        {children}
        <SiteFooter brand={course.brand} />
      </div>
    </CourseProvider>
  )
}

export function CoursePage({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <main>
        <Hero />
        <PromiseLine />
        <QuickAnswers />
        <InPageNav />
        <WhatItsLike />
        <Journey />
        <WhereItTakesYou />
        <Eligibility />
        <IntakeBoard />
        <TryIt />
        <CareerCoach />
        <Faqs />
        <FormalBit />
      </main>
    </Shell>
  )
}

const SHOP_NAV: [string, string][] = [
  ['#achieve', 'What you get'],
  ['#like', "What it's like"],
  ['#journey', 'Your journey'],
  ['#money', 'Free and funded'],
  ['#eligibility', 'Am I in'],
  ['#intakes', 'Sign up'],
  ['#formal', 'Details'],
]

export function ShopCoursePage({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <BasketProvider>
        <main className="pb-24">
          <Hero facts={false} />
          <PromiseLine />
          <QuickAnswers />
          <InPageNav items={SHOP_NAV} />
          <WhatYouAchieve />
          <WhatItsLike />
          <Journey dayOne={<ReadinessKit />} />
          <WhereItTakesYou />
          <FreeAndFunded />
          <Eligibility />
          <IntakePicker />
          <CareerCoach />
          <Faqs />
          <FormalBit />
        </main>
        <BasketBar />
        <CheckoutDrawer />
      </BasketProvider>
    </Shell>
  )
}

const EMOTIONAL_NAV: [string, string][] = [
  ['#start', 'Start dates'],
  ['#talk', 'Talk to someone'],
  ['#voices', 'Students'],
  ['#journey', 'Your year'],
  ['#like', "What it's like"],
  ['#outcomes', 'Jobs'],
  ['#eligibility', 'Am I in'],
  ['#money', 'Cost'],
  ['#formal', 'Details'],
]

/**
 * Emotional-buyer variant. Decision is already made ("I want to be a chef");
 * the page's job is to get them to a date or a phone call, then reassure.
 * Money and eligibility sit low; a course advisor handles them in person.
 */
export function EmotionalCoursePage({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <main className="pb-20">
        <Billboard />
        <StartNow />
        <TalkToSomeone />
        <InPageNav items={EMOTIONAL_NAV} />
        <StudentVoices />
        <Journey />
        <WhatItsLike />
        <WhereItTakesYou />
        <Eligibility />
        <FreeAndFunded />
        <TryIt />
        <CareerCoach />
        <Faqs />
        <FormalBit />
      </main>
      <StartBar />
    </Shell>
  )
}

export function PostgradCoursePage({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <PostgradBody />
    </Shell>
  )
}

export function PostgradStoryPage({ course, children }: { course: Course; children: ReactNode }) {
  return <Shell course={course}>{children}</Shell>
}

export function CourseMoneyPage({ course }: { course: Course }) {
  return (
    <Shell course={course}>
      <main className="mx-auto max-w-[720px] px-6 py-8 md:py-12">
        <a
          href={courseHref(course)}
          className="mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to {course.title}
        </a>
        <MoneyContent standalone />
      </main>
    </Shell>
  )
}
