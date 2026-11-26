'use client'

import { Download, MessageCircle } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EarningPotential } from '@/components/modules/earning-potential'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes } from '@/components/modules/framing'
import { InstantCheck } from '@/components/modules/instant-check'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, DateList, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { StoriesMatched } from '@/components/modules/stories-matched'
import { CompareTable } from '@/components/modules/compare-table'
import { SpecialistPanel } from '@/components/modules/specialist-panel'
import { Expander, Section } from '@/components/modules/ui'
import { AIPC_COURSE, aipcCompare, aipcCompareNote, aipcCreditQuestions, aipcEarnings, aipcGuideRoutes, aipcQuestions, aipcStories, aipcStoryFilters, aipcTeachers, resolveCredit } from '@/lib/personas/data/aipc'
import { aipcBreakdown, aipcFormal, aipcLinks } from '@/lib/personas/data/compliance'
import { aipcOutcomes } from '@/lib/personas/data/framing'
import { aipcLike, aipcPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { LightButton, LightHero } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#outcomes-card', 'Outcomes'],
  ['#earn', 'Earnings'],
  ['#like', 'How it works'],
  ['#journey', 'Your 18 months'],
  ['#talk', "Let's talk"],
  ['#fees', 'Fees'],
  ['#stories', 'Graduates'],
  ['#compare', 'Compare'],
  ['#credit', 'Credit'],
  ['#structure', 'Subjects'],
  ['#formal', 'Details'],
]

export function AipcCounsellingPage() {
  return (
    <PersonaShell
      brand="aipc"
      applyHref="#start"
      reviewer={{
        forWho: `${PERSONAS.sarah.name} (lead) and ${PERSONAS.dan.name} (second), on one page. ${PERSONAS.sarah.oneLine}`,
        testing: 'Whether a short, plainly written course page with a course specialist as the main action leads to more conversations than an apply-first page.',
        note: 'Copy written in a plain Australian register: no sales phrasing, outcomes stated as capabilities. Teaching staff, graduate stories and the university comparison are placeholders. Figures use the 2027 structure.',
      }}
      mainAction={{ label: 'Talk to a course specialist', href: '#talk' }}
    >
      <main className="pb-24 sm:pb-0">
        <LightHero
          eyebrow="Counselling · Postgraduate · AQF Level 9"
          title={
            <>
              Be ready to help others, <span className="text-coral">as a career</span>.
            </>
          }
          courseName="Master of Counselling"
          sub={
            <>
              An ACA-accredited master&rsquo;s degree, studied online and taught by practising counsellors. A bachelor degree in any field meets the entry requirement. Next intake starts{' '}
              <span className="font-medium text-foreground">{AIPC_COURSE.intakes[0]}</span>.
            </>
          }
          image="/images/aipc/hero-home-study.png"
          imageAlt="A woman studying at home at a sunlit table with her laptop and notes"
          pills={['ACA accredited', 'Registered HE provider', 'FEE-HELP approved']}
          actions={
            <>
              <LightButton href="#talk" variant="coral">
                <MessageCircle className="size-5" aria-hidden /> Talk to a course specialist
              </LightButton>
              <LightButton href="#guide">
                <Download className="size-5" aria-hidden /> Course guide (PDF)
              </LightButton>
            </>
          }
          note={
            <>
              A bachelor degree in any field meets the entry requirement.{' '}
              <a href="#credit" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
                Prior study or experience may count towards the degree
              </a>
            </>
          }
        />
        <InPageNav items={NAV} />

        <CourseOutcomes headline="What you will be able to do" image="/images/aipc/placement.png" imageAlt="A counselling student in a supervised placement session" outcomes={aipcOutcomes} />

        <Section id="earn" eyebrow="Career outcomes" title="Graduate outcomes and earnings" tone="muted">
          <EarningPotential e={aipcEarnings} />
        </Section>

        <Section id="like" eyebrow="The course" title="How the course works">
          <WhatItsLike {...aipcLike} />
        </Section>

        <Section id="journey" eyebrow="Course overview" title="What your 18 months look like">
          <WhatYouDo phases={aipcPhases} />
        </Section>

        <Section id="tutors" eyebrow="Your teaching staff" title="Who teaches you" intro="Counsellors who teach on the degree and continue to practise.">
          <PeopleCards people={aipcTeachers} />
        </Section>

        <Section
          id="talk"
          eyebrow="Talk to us"
          title="Talk to a course specialist"
          intro="Our course specialists are practising counsellors. A 20-minute conversation about the course, how it would fit your situation, and any credit for prior study. Request a call back, or choose a time."
        >
          <Callout eyebrow="Request a call back, or choose a time">
            <SpecialistPanel
              specialists={[
                { name: 'Dr Helen Whitmore', years: '30 years practising', expertise: 'Community mental health, clinical supervision', photo: '/images/aipc/program-director.png' },
                { name: 'Daniel Okafor', years: '12 years practising', expertise: 'Youth and family counselling, credit for prior experience', photo: '/images/advisors/aipc-daniel.png' },
                { name: 'Megan Hart', years: '9 years practising', expertise: 'Relationship counselling, career changers', photo: '/images/advisors/aipc-megan.png' },
              ]}
              days={[
                { day: 'Tue 2 Feb', times: ['12:00', '18:30', '19:00'] },
                { day: 'Wed 3 Feb', times: ['12:30', '17:30', '18:00'] },
                { day: 'Thu 4 Feb', times: ['08:30', '19:00', '19:30'] },
              ]}
              what="a 20-minute conversation with a course specialist"
            />
          </Callout>
        </Section>

        <Section id="fees" eyebrow="Fees" title="Fees and payment options" tone="muted">
          <FeesSimple
            total={AIPC_COURSE.standard.tuition}
            totalNote="Master of Counselling, 10 subjects at $3,465 each, billed per subject. The 24-month Advanced is $47,250. Allow about $2,500 across the course for workshop travel, placement checks and books."
            currency="AUD"
            plans={[
              { id: 'pt', label: 'Part-time', note: '18 months', months: 18 },
              { id: 'ft', label: 'Full-time', note: '12 months', months: 12 },
            ]}
            facts={[
              'FEE-HELP: $0 upfront, defer the lot and repay through tax if eligible',
              'Pay as you study, trimester by trimester',
              'Pay up front, in full or subject by subject, or mix the two',
              'Withdraw before a subject\u2019s census date and pay nothing for it',
            ]}
            talkHref="#talk"
          />
        </Section>

        <Section id="stories" eyebrow="Graduate stories" title="Graduates who changed careers">
          <StoriesMatched prompt="Before counselling, I was..." filters={aipcStoryFilters} stories={aipcStories} />
        </Section>

        <Section id="compare" eyebrow="Comparison" title="How AIPC compares with a university master's" tone="muted">
          <CompareTable rows={aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={aipcCompareNote} />
        </Section>

        <Section id="credit" eyebrow="Credit" title="Credit for prior study and experience" intro="Relevant prior study and work experience may count towards the degree. Answer three questions for an indication. The formal assessment is free once you enrol." tone="default">
          <Callout eyebrow="Check your credit">
            <InstantCheck title="Check if your experience may count" questions={aipcCreditQuestions} resolve={resolveCredit} ctaLabel="Check" />
          </Callout>
        </Section>

        <Section id="questions" eyebrow="Questions" title="Frequently asked questions" tone="muted">
          <div className="flex flex-col gap-2">
            {aipcQuestions.slice(0, 4).map((q) => (
              <Expander key={q.q} title={q.q}>
                <p className="text-pretty">{q.a}</p>
              </Expander>
            ))}
          </div>
        </Section>

        <Section id="guide" eyebrow="Course guide" title="Download the course guide">
          <Callout eyebrow="Course guide">
            <EnquiryForm title="Full course details to help you decide" intro="Subjects, placement, fees, credit and pathways, as a PDF. We only need an email address." routes={aipcGuideRoutes} cta="Email me the guide" emailOnly />
          </Callout>
        </Section>

        <Section id="start" eyebrow="Intakes" title="Start dates" tone="muted">
          <DateList
            items={AIPC_COURSE.intakes.map((d, i) => ({ when: d, detail: i === 0 ? 'Trimester 1, 2027' : 'Applications open' }))}
            action={
              <p className="text-sm text-muted-foreground">
                Four intakes a year.{' '}
                <a href="#start" className="underline underline-offset-4">
                  Apply (not in prototype)
                </a>
              </p>
            }
          />
        </Section>

        <Section id="structure" eyebrow="Course structure" title={`Master of Counselling: ${AIPC_COURSE.standard.subjects} subjects, 18 months`}>
          <CourseBreakdown breakdown={aipcBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border bg-muted">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={aipcFormal} links={aipcLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
