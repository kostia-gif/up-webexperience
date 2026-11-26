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
import { StartSection } from '@/components/modules/start-section'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Expander, Section } from '@/components/modules/ui'
import {
  DIP,
  dipAdvisor,
  dipAdvisorRoutes,
  dipBreakdown,
  dipEarnings,
  dipFaqs,
  dipFee,
  dipFormal,
  dipFundingQuestions,
  dipGraduates,
  dipLike,
  dipLinks,
  dipOutcomes,
  dipPhases,
  dipRegions,
  resolveDipFunding,
} from '@/lib/personas/data/nzst-diploma'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#start', 'Start dates'],
  ['#outcomes-card', 'Outcomes'],
  ['#earn', 'Outcomes and earnings'],
  ['#journey', 'Your 32 weeks'],
  ['#work', 'Where graduates are'],
  ['#fees', 'Fees'],
  ['#advisor', 'Advisor'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

export function NzstDiplomaPage() {
  return (
    <PersonaShell
      brand="nzst"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS.dreams.name} (Level 4 and 5 Tourism, 24% of NZST enrolments). ${PERSONAS.dreams.oneLine}`,
        testing: 'The Yoobee template applied to NZST: billboard straight into a start date with enrol or enquire, outcomes, where graduates are, fees and an advisor. Does the same flow work for a similar audience buying the chance to travel?',
        note: 'Course facts (length, fees, intakes, campuses, entry, careers, special features) are from the live NZST page. Graduate photos, locations, employers and earnings are placeholders.',
      }}
      mainAction={{ label: 'Start 8 Feb 2027', href: '#start' }}
    >
      <main className="pb-24 sm:pb-0">
        <Billboard
          eyebrow={`NZST · ${DIP.short} · ${DIP.weeks} weeks · 5 campuses`}
          title={
            <>
              Turn a love of travel <span className="text-coral">into a career.</span>
            </>
          }
          sub="A Level 5 diploma in how tourism businesses run: operations, marketing, sustainability and customer service, with study tours, job fairs and a Walt Disney World case study. Next intake starts 8 February 2027."
          image="/images/nzst/grad-queenstown.png"
          facts={[
            { label: 'Length', value: `${DIP.weeks} weeks` },
            { label: 'Where', value: DIP.campuses.join(', ') },
            { label: 'You need', value: 'NCEA Level 3, or a Level 4 tourism qualification' },
            { label: 'Cost', value: `${dipFee} plus $${DIP.levy} levy. Free if you qualify for Fees Free` },
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
          footnote="Graduates work as front desk agents, tour guides, travel agents, concierges, airline sales staff and shore excursion staff, in New Zealand and overseas."
        />

        <StartSection
          intakes={[
            { label: '8 Feb 2027', tag: 'Next intake', status: 'open' },
            { label: '31 May 2027', tag: 'Mid-year', status: 'open' },
          ]}
          groups={[
            { legend: 'Which campus is closest?', items: DIP.campuses.map((c) => ({ name: c })) },
            { legend: 'Morning or afternoon classes?', icon: 'none', items: [{ name: 'Morning' }, { name: 'Afternoon' }] },
          ]}
          advisor={{ name: dipAdvisor.name, role: 'course advisor', photo: dipAdvisor.photo, href: '#advisor' }}
          enquiryRoutes={dipAdvisorRoutes}
          intro="Choose a date, a campus and a class time, then leave your name and number. We hold your place for 7 days and text you. No payment or application yet. Or enquire first if you have questions."
          confirmHold="Your place is held for 7 days. This is not an enrolment and nothing is decided until you confirm. We have texted you, and Aroha will call to talk through Fees Free and your start."
        />

        <InPageNav items={NAV} />

        <CourseOutcomes
          headline="What you will be able to do"
          image="/images/nzst/grad-rotorua.png"
          imageAlt="A graduate guiding a tour group through geothermal terraces"
          outcomes={dipOutcomes}
          link={{ label: 'See where graduates are working', href: '#work' }}
        />

        <Section id="earn" eyebrow="Career outcomes" title="Graduate outcomes and earnings" tone="muted">
          <EarningPotential e={dipEarnings} />
        </Section>

        <Section id="journey" eyebrow="Course overview" title="What your 32 weeks look like" intro={dipLike}>
          <WhatYouDo phases={dipPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="hairline-t scroll-mt-20 border-border bg-muted py-8 md:py-12">
          <div className="mx-auto flex max-w-[960px] flex-col gap-1 px-6 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Where graduates are</p>
            <h2 id="work-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              Graduates at work, in New Zealand and overseas
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Recent graduates and where they are working now. Names, employers and photos are placeholders.</p>
          </div>
          <StudentWorkWall disciplines={dipRegions} works={dipGraduates} countNoun="graduates" />
        </section>

        <Section id="fees" eyebrow="Fees" title="Fees and payment options">
          <FeesSimple
            total={DIP.fee + DIP.levy}
            totalNote={`${dipFee} course fee plus a $${DIP.levy} student services levy, which covers learning, employment, wellbeing and counselling support. Fees are subject to change. Free if you qualify for Fees Free: check below.`}
            currency="NZD"
            plans={[{ id: 'ft', label: 'Full-time', note: '32 weeks', months: 8 }]}
            facts={[
              'Fees Free: eligible domestic students pay nothing in their first year of tertiary study',
              'StudyLink student loan for the fee, and living costs if eligible',
              'Split payments across the course, interest free',
              'Pay up front, in full, before the start date',
            ]}
            talkHref="#advisor"
            talkLabel="a quick call with Aroha"
          />
          <Callout eyebrow="Fees Free eligibility">
            <InstantCheck title="Am I eligible for Fees Free?" intro="Three questions. Fees Free covers the first year of tertiary study for New Zealand citizens and residents." questions={dipFundingQuestions} resolve={resolveDipFunding} ctaLabel="Check" placeholderNote="Fees Free rules as published for 2027, to be confirmed." />
          </Callout>
        </Section>

        <Section id="advisor" eyebrow="Contact" title="Talk to a course advisor" tone="muted">
          <Callout eyebrow="Request a call or email">
            <EnquiryForm title={`Talk to ${dipAdvisor.name}`} intro={dipAdvisor.line} routes={dipAdvisorRoutes} cta="Request contact" />
          </Callout>
        </Section>

        <Section id="questions" eyebrow="Questions" title="Frequently asked questions">
          <div className="flex flex-col gap-2">
            {dipFaqs.map((q) => (
              <Expander key={q.q} title={q.q}>
                <p className="text-pretty">{q.a}</p>
              </Expander>
            ))}
          </div>
        </Section>

        <Section id="structure" eyebrow="Course structure" title={`8 modules, 120 credits, ${DIP.weeks} weeks`} tone="muted">
          <CourseBreakdown breakdown={dipBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={dipFormal} links={dipLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
