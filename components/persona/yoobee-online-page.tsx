'use client'

import { ArrowDown, Check, Laptop } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EarningPotential } from '@/components/modules/earning-potential'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes } from '@/components/modules/framing'
import { Callout, WhatYouDo } from '@/components/modules/real-terms'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmBreakdown, cmFormal, cmLinks } from '@/lib/personas/data/compliance'
import { cmOutcomes } from '@/lib/personas/data/framing'
import { cmPhases } from '@/lib/personas/data/real-terms'
import { CM, cmEarnings, cmWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton } from './billboard'
import { PersonaShell } from './shell'
import { CM_FEE_FACTS } from './yoobee-creative-media-page'

const NAV: [string, string][] = [
  ['#start', 'Enrol'],
  ['#outcomes-card', 'Outcomes'],
  ['#earn', 'Earnings'],
  ['#journey', 'Your 19 weeks'],
  ['#work', 'Student work'],
  ['#fees', 'Fees'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

const ONLINE_INTAKES = [
  { id: 'feb', date: '8 Feb 2027', label: 'Next start' },
  { id: 'mar', date: '8 Mar 2027' },
  { id: 'apr', date: '12 Apr 2027' },
  { id: 'may', date: '10 May 2027' },
]

const NEED = ['A laptop or desktop that runs Adobe apps, and a webcam', 'About 20 hours a week full-time, or 10 part-time', 'Two live online classes a day, 10am and 1pm, recorded if you miss one', 'Nothing else. Software is included in the fee']

/**
 * Comparison view: the same course sold as an online-only product. The page is
 * about signing up: start now, see what you get, pay simply. Shorter than the
 * blended page and with monthly starts.
 */
export function YoobeeOnlinePage() {
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name}, studying online from anywhere in New Zealand.`,
        testing: 'A comparison with the blended page: online is about buying and signing up. Monthly starts, enrol at the top, outcomes and portfolios as the proof, simple pricing, and nothing that needs a conversation.',
        note: 'One call-out: enrol. No advisor section; the page is built to be completed alone.',
      }}
      mainAction={{ label: 'Enrol now', href: '#start' }}
    >
      <main className="pb-24 sm:pb-0">
        <Billboard
          eyebrow={`Yoobee Online · ${CM.short} · ${CM.weeks} weeks · 100% online`}
          title={
            <>
              Make a living <span className="text-coral">off creative media.</span>
            </>
          }
          sub="Animation, film and design in one online certificate, taught live around the job you have now. Starts every month, from anywhere in New Zealand."
          image="/images/yoobee/hero-home-studio.png"
          facts={[
            { label: 'Length', value: `${CM.weeks} weeks, or 38 part-time` },
            { label: 'Where', value: 'Online, anywhere in New Zealand' },
            { label: 'You need', value: '16+, NCEA Level 2, a laptop' },
            { label: 'Cost', value: 'Free for domestic students starting February 2027. Otherwise $4,753 total: tuition, levy and software', placeholder: true },
          ]}
          actions={
            <>
              <HeroButton href="#start" primary>
                <ArrowDown className="size-5" aria-hidden /> Enrol now
              </HeroButton>
              <HeroButton href="#fees">See pricing</HeroButton>
            </>
          }
          footnote="Enrolling takes about three minutes. Full refund if you withdraw in the first two weeks."
        />

        <Section id="start" eyebrow="Enrol" title="Pick a start date and enrol" dense tone="muted">
          <Callout eyebrow="About three minutes">
            <StartAndEnrol
              intakes={ONLINE_INTAKES}
              times={['Full-time, 19 weeks', 'Part-time, 38 weeks']}
              timesLabel="Pace"
              cta="Enrol now"
              confirm="You are in. A confirmation is on its way with your Fees Free check, your login, and the week-one brief. Your tutor will say hello by email tomorrow."
            />
          </Callout>
          <div className="grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
              <Laptop className="size-4 text-primary" aria-hidden /> What you need
            </p>
            {NEED.map((n) => (
              <p key={n} className="flex items-start gap-2 text-sm text-muted-foreground text-pretty">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {n}
              </p>
            ))}
          </div>
        </Section>

        <InPageNav items={NAV} />

        <CourseOutcomes
          headline="Make a living from what you make"
          image="/images/yoobee/mc-design.png"
          imageAlt="A student reviewing a poster layout on screen"
          outcomes={cmOutcomes}
          link={{ label: 'View student portfolios', href: '#work' }}
        />

        <Section id="earn" eyebrow="Where this takes you" title="What you could earn" tone="muted">
          <EarningPotential e={cmEarnings} />
        </Section>

        <Section id="journey" eyebrow="Week by week" title="What your 19 weeks look like" intro={creativeMediaLevel4.like.text}>
          <WhatYouDo phases={cmPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="hairline-t scroll-mt-20 border-border bg-muted py-8 md:py-12">
          <div className="mx-auto flex max-w-[960px] flex-col gap-1 px-6 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Student portfolios</p>
            <h2 id="work-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              Made online, from kitchen tables
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Work from last year&apos;s online class, credited to the students who made it.</p>
          </div>
          <StudentWorkWall disciplines={[]} works={cmWorks} />
        </section>

        <Section id="fees" eyebrow="What it costs" title="Fees and ways to pay">
          <FeesSimple
            total={4753}
            totalNote="Tuition $4,464.72, levy $102.50 and software $186. Nothing extra. Free for eligible domestic students under Fees Free in 2027."
            currency="NZD"
            plans={[
              { id: 'ft', label: 'Full-time', note: '19 weeks', months: 4.5 },
              { id: 'pt', label: 'Part-time', note: '38 weeks', months: 9 },
            ]}
            facts={CM_FEE_FACTS}
            talkHref="#start"
            talkLabel="the enrolment form, and we will check Fees Free for you"
          />
        </Section>

        <Section id="structure" eyebrow="Course structure" title={`4 modules, ${creativeMediaLevel4.formal.credits} credits, ${CM.weeks} weeks`} tone="muted">
          <CourseBreakdown breakdown={cmBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={cmFormal} links={cmLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
