'use client'

import { ArrowDown, CalendarClock, MessageCircle } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EarningPotential } from '@/components/modules/earning-potential'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes } from '@/components/modules/framing'
import { InstantCheck } from '@/components/modules/instant-check'
import { Callout, WhatYouDo } from '@/components/modules/real-terms'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmBreakdown, cmFormal, cmLinks } from '@/lib/personas/data/compliance'
import { cmOutcomes } from '@/lib/personas/data/framing'
import { cmLike, cmPhases } from '@/lib/personas/data/real-terms'
import { CM, cmAdvisor, cmAdvisorRoutes, cmEarnings, cmFundingQuestions, cmWorks, resolveCmFunding } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#start', 'Start dates'],
  ['#outcomes-card', 'Outcomes'],
  ['#earn', 'Outcomes and earnings'],
  ['#journey', 'Your 19 weeks'],
  ['#work', 'Student work'],
  ['#fees', 'Fees'],
  ['#advisor', 'Advisor'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

export const CM_INTAKES = [
  { id: 'feb', date: '8 Feb 2027', label: 'Online and campus' },
  { id: 'jul', date: '12 Jul 2027', label: 'Online and campus' },
]

export const CM_FEE_FACTS = [
  'Fees Free: eligible domestic students pay nothing in their first year of tertiary study',
  'Pay up front, in full, before the start date',
  'Split payments weekly or monthly across the course, interest free',
  'StudyLink loan and living costs if Fees Free is used up',
]

export function YoobeeCreativeMediaPage() {
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name} (64% of Yoobee students). ${PERSONAS['plan-b'].oneLine}`,
        testing: 'Whether the Option A billboard leading straight to cost and a start date, followed by outcomes and what you will make, is enough for an adult with commitments to enrol. Compare with the online-only view.',
        note: 'Three call-outs: start date and enrol, the Fees Free check, talk to an advisor. The timetable is stated plainly: two live classes a day, 10am and 1pm; part-time over 38 weeks for people keeping a job.',
      }}
      mainAction={{ label: 'Start 8 Feb 2027', href: '#start' }}
    >
      <main className="pb-24 sm:pb-0">
        <Billboard
          eyebrow={`Yoobee · ${CM.short} · ${CM.weeks} weeks · Online or on campus`}
          title={
            <>
              Turn your passion <span className="text-coral">into a new path.</span>
            </>
          }
          sub="Animation, film and design in one certificate. Full-time over 19 weeks, or part-time over 38 if you are keeping a job. Next class starts 8 February 2027."
          image="/images/yoobee/hero-home-studio.png"
          facts={[
            { label: 'Length', value: `${CM.weeks} weeks, or 38 part-time` },
            { label: 'Where', value: 'Online, or Auckland, Wellington, Christchurch' },
            { label: 'You need', value: '16+, NCEA Level 2' },
            { label: 'Cost', value: '$4,753 total. Free if you qualify for Fees Free', placeholder: true },
          ]}
          actions={
            <>
              <HeroButton href="#start" primary>
                <ArrowDown className="size-5" aria-hidden /> Start 8 Feb 2027
              </HeroButton>
              <HeroButton href="#start">
                <CalendarClock className="size-5" aria-hidden /> Start later
              </HeroButton>
              <HeroButton href="#advisor">
                <MessageCircle className="size-5" aria-hidden /> Talk to an advisor
              </HeroButton>
            </>
          }
          footnote="84% of last year's graduates were in creative work or further study within six months (placeholder). Entry is open from 16 with NCEA Level 2."
        />

        <Section id="start" eyebrow="Enrol" title="Choose a start date" dense tone="muted">
          <Callout eyebrow="Enrol now">
            <StartAndEnrol
              intakes={CM_INTAKES}
              times={['Online, full-time', 'Online, part-time', 'On campus']}
              timesLabel="How you will study"
              cta="Enrol now"
              confirm="A confirmation has been emailed to you with your Fees Free check and what to have ready for week one. Classes are at 10am and 1pm; part-time students attend half of them. Sam, a course advisor, will email you within a day."
            />
          </Callout>
        </Section>

        <InPageNav items={NAV} />

        <CourseOutcomes
          headline="What you will be able to do"
          image="/images/yoobee/mc-design.png"
          imageAlt="A student reviewing a poster layout on screen"
          outcomes={cmOutcomes}
          link={{ label: 'View student portfolios', href: '#work' }}
        />

        <Section id="earn" eyebrow="Career outcomes" title="Graduate outcomes and earnings" tone="muted">
          <EarningPotential e={cmEarnings} />
        </Section>

        <Section id="journey" eyebrow="Course overview" title="What your 19 weeks look like" intro={cmLike}>
          <WhatYouDo phases={cmPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="hairline-t scroll-mt-20 border-border bg-muted py-8 md:py-12">
          <div className="mx-auto flex max-w-[960px] flex-col gap-1 px-6 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Student portfolios</p>
            <h2 id="work-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              Work from the last class
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Work by recent students, credited to each student. It shows the standard you can expect to reach.</p>
          </div>
          <StudentWorkWall disciplines={[]} works={cmWorks} />
        </section>

        <Section id="fees" eyebrow="What it costs" title="Fees and payment options">
          <FeesSimple
            total={4753}
            totalNote="Tuition $4,464.72, levy $102.50 and software $186. Nothing extra. Free if you qualify for Fees Free: check below."
            currency="NZD"
            plans={[
              { id: 'ft', label: 'Full-time', note: '19 weeks', months: 4.5 },
              { id: 'pt', label: 'Part-time', note: '38 weeks', months: 9 },
            ]}
            facts={CM_FEE_FACTS}
            talkHref="#advisor"
            talkLabel="a quick call with Sam"
          />
          <Callout eyebrow="Fees Free eligibility">
            <InstantCheck title="Am I eligible for Fees Free?" intro="Three questions. Fees Free covers the first year of tertiary study for New Zealand citizens and residents." questions={cmFundingQuestions} resolve={(a) => resolveCmFunding(a, { enrol: '#start', talk: '#advisor' })} ctaLabel="Check" placeholderNote="Fees Free rules as published for 2027, to be confirmed." />
          </Callout>
        </Section>

        <Section id="advisor" eyebrow="Contact" title="Talk to a course advisor" tone="muted">
          <Callout eyebrow="Request a call or email">
            <EnquiryForm title={`Talk to ${cmAdvisor.name}`} intro={cmAdvisor.line} routes={cmAdvisorRoutes} cta="Request contact" />
          </Callout>
        </Section>

        <Section id="structure" eyebrow="Course structure" title={`4 modules, ${creativeMediaLevel4.formal.credits} credits, ${CM.weeks} weeks`}>
          <CourseBreakdown breakdown={cmBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border bg-muted">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={cmFormal} links={cmLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
