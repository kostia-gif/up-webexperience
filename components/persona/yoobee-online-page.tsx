'use client'

import { ArrowDown, Check, Laptop } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EarningPotential } from '@/components/modules/earning-potential'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes } from '@/components/modules/framing'
import { InstantCheck } from '@/components/modules/instant-check'
import { Callout, WhatYouDo } from '@/components/modules/real-terms'
import { StartSection } from '@/components/modules/start-section'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmBreakdown, cmFormal, cmLinks } from '@/lib/personas/data/compliance'
import { cmOutcomes } from '@/lib/personas/data/framing'
import { CM_LOAD, cmLike, cmPhases } from '@/lib/personas/data/real-terms'
import { CM, cmAdvisorRoutes, cmEarnings, cmFundingQuestions, cmWorks, resolveCmFunding } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton } from './billboard'
import { PersonaShell } from './shell'
import { CM_FEE_FACTS } from './yoobee-creative-media-page'

const NAV: [string, string][] = [
  ['#start', 'Enrol'],
  ['#outcomes-card', 'Outcomes'],
  ['#earn', 'Outcomes and earnings'],
  ['#journey', 'Your 19 weeks'],
  ['#work', 'Student work'],
  ['#fees', 'Fees'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]


const NEED = ['A laptop or desktop that runs Adobe apps, and a webcam', CM_LOAD, 'Two live online classes a day, 10am and 1pm, Monday to Friday. Part-time students attend half of them; a missed class is recorded for catch-up', 'Nothing else. Software is included in the fee']

/**
 * Comparison view: the same course sold as an online-only product. The page is
 * about signing up: see what you get, pick a date, pay simply. Shorter than the
 * blended page. Same February and July intakes.
 */
export function YoobeeOnlinePage() {
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name}, studying online from anywhere in New Zealand.`,
        testing: 'A comparison with the blended page: online is about buying and signing up. Enrol at the top, outcomes and portfolios as the proof, simple pricing, and nothing that needs a conversation. Same February and July intakes as the blended page.',
        note: 'Hero leads straight into the Option A start-date band. Enrol or enquire in one place; no separate advisor section. Weekly load stated once: about 15 hours live plus 20 of project work full-time, half that part-time.',
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
          sub="Animation, film and design in one online certificate, taught live from anywhere in New Zealand. Full-time over 19 weeks, or part-time over 38 if you are keeping a job. Next class starts 8 February 2027."
          image="/images/yoobee/hero-home-studio.png"
          facts={[
            { label: 'Length', value: `${CM.weeks} weeks, or 38 part-time` },
            { label: 'Where', value: 'Online, anywhere in New Zealand' },
            { label: 'You need', value: '16+, NCEA Level 2, a laptop' },
            { label: 'Cost', value: '$4,753 total. Free if you qualify for Fees Free', placeholder: true },
          ]}
          actions={
            <>
              <HeroButton href="#start" primary>
                <ArrowDown className="size-5" aria-hidden /> Enrol now
              </HeroButton>
              <HeroButton href="#fees">See pricing</HeroButton>
            </>
          }
          footnote="Enrolment takes about three minutes. Full refund if you withdraw within the first two weeks. Entry is open from 16 with NCEA Level 2."
        />

        <StartSection
          intakes={[
            { label: '8 Feb 2027', tag: 'Next intake', status: 'open' },
            { label: '12 Jul 2027', tag: 'Mid-year', status: 'open' },
          ]}
          groups={[{ legend: 'Pace', icon: 'none', items: [{ name: 'Full-time', note: '19 weeks' }, { name: 'Part-time', note: '38 weeks' }] }]}
          advisor={{ name: 'Sam', role: 'course advisor', photo: '/images/advisors/yoobee-sam.png', href: '#start' }}
          enquiryRoutes={cmAdvisorRoutes}
          holdLabel="Enrol for"
          intro="Choose a date and a pace, then leave your name and number. Enrolment takes about three minutes and you can withdraw within two weeks for a full refund. Or enquire first."
          confirmHold="You are enrolled. A confirmation has been emailed to you with your Fees Free check, your login and the week-one brief. Your tutor will email you tomorrow."
        />
        <div className="hairline-t border-border bg-background">
          <div className="mx-auto grid max-w-[960px] gap-3 px-6 py-6 sm:grid-cols-2">
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
        </div>

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
              Work from the online class
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Work by last year&apos;s online students, credited to each student.</p>
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
            talkHref="#start"
            talkLabel="the enrolment form, and we will check your Fees Free eligibility"
          />
          <Callout eyebrow="Fees Free eligibility">
            <InstantCheck title="Am I eligible for Fees Free?" intro="Three questions. Fees Free covers the first year of tertiary study for New Zealand citizens and residents." questions={cmFundingQuestions} resolve={(a) => resolveCmFunding(a, { enrol: '#start', talk: '#start' })} ctaLabel="Check" placeholderNote="Fees Free rules as published for 2027, to be confirmed." />
          </Callout>
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
