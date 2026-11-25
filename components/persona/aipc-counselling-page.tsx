'use client'

import { Download, MessageCircle } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes } from '@/components/modules/framing'
import { InstantCheck } from '@/components/modules/instant-check'
import { Callout, DateList, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { SpecialistPanel } from '@/components/modules/specialist-panel'
import { Expander, Section } from '@/components/modules/ui'
import { AIPC_COURSE, aipcCreditQuestions, aipcQuestions, resolveCredit } from '@/lib/personas/data/aipc'
import { aipcBreakdown, aipcFormal, aipcLinks } from '@/lib/personas/data/compliance'
import { aipcGuideRoute, aipcOutcomes } from '@/lib/personas/data/framing'
import { aipcLike, aipcPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { LightButton, LightHero } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#outcomes-card', 'Outcomes'],
  ['#like', "What it's like"],
  ['#journey', 'What you will do'],
  ['#talk', "Let's talk"],
  ['#fees', 'Fees'],
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
        testing: 'Whether a short, calm course page in the Option A style, with a course specialist as the main action, earns more conversations than "Apply now".',
        note: 'Three call-outs: talk to a course specialist, check your credit, course guide. Figures use the 2027 structure.',
      }}
      mainAction={{ label: 'Talk to a course specialist', href: '#talk' }}
    >
      <main className="pb-24 sm:pb-0">
        <LightHero
          eyebrow="Counselling · Postgraduate · AQF Level 9"
          title={
            <>
              Make helping people <span className="text-coral">your profession</span>.
            </>
          }
          courseName="Master of Counselling"
          sub={
            <>
              An industry-accredited master&rsquo;s degree from Australia&rsquo;s counselling specialists. Online, with any bachelor degree, taught by practising counsellors. Next intake starts{' '}
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
                <Download className="size-5" aria-hidden /> Download the guide
              </LightButton>
            </>
          }
          note={
            <>
              Any bachelor degree gets you in. Already working in the field?{' '}
              <a href="#credit" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
                Check your credit
              </a>
            </>
          }
        />
        <InPageNav items={NAV} />

        <CourseOutcomes headline="Become the person others turn to" image="/images/aipc/placement.png" imageAlt="A counselling student in a supervised placement session" outcomes={aipcOutcomes} />

        <Section id="like" eyebrow="The course" title="What it's like">
          <WhatItsLike {...aipcLike} />
        </Section>

        <Section id="journey" eyebrow="Month by month" title="What you will be doing" tone="muted">
          <WhatYouDo phases={aipcPhases} />
        </Section>

        <Section
          id="talk"
          eyebrow="Let's talk"
          title="Talk to a course specialist"
          intro="Practising counsellors who know the sector and can help you work out whether and how to do this. Ask for a call back, or pick a time that suits you."
        >
          <Callout eyebrow="Call me back, or pick a time">
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

        <Section id="fees" eyebrow="What it costs" title="Simple monthly pricing" tone="muted">
          <FeesSimple
            total={AIPC_COURSE.standard.tuition}
            currency="AUD"
            plans={[
              { id: 'pt', label: 'Part-time', note: '18 months', months: 18 },
              { id: 'ft', label: 'Full-time', note: '12 months', months: 12 },
            ]}
            facts={[
              `$${AIPC_COURSE.standard.tuition.toLocaleString('en-AU')} total course fee for the 18-month Master, billed per subject`,
              '$0 upfront: defer the lot with FEE-HELP if eligible',
              'Pay as you study, trimester by trimester, or mix the two',
              'Withdraw before a subject\u2019s census date and pay nothing for it',
            ]}
            talkHref="#talk"
          />
        </Section>

        <Section id="credit" eyebrow="Already in the field?" title="Credit for prior study and experience" intro="Youth, support and community workers often skip subjects. Three questions for an estimate; the formal assessment is free after you enrol.">
          <Callout eyebrow="Check your credit">
            <InstantCheck title="How much could you skip?" questions={aipcCreditQuestions} resolve={resolveCredit} ctaLabel="Show my credit" />
          </Callout>
        </Section>

        <Section id="questions" eyebrow="Questions" title="Common questions" tone="muted">
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
            <EnquiryForm title="Everything on this page, as a PDF" intro="Subjects, placement, fees, credit and the pathway. An email address is all we ask for." routes={aipcGuideRoute} cta="Send me the guide" emailOnly />
          </Callout>
        </Section>

        <Section id="start" eyebrow="Intakes" title="Start dates" tone="muted">
          <DateList
            items={AIPC_COURSE.intakes.map((d, i) => ({ when: d, detail: i === 0 ? 'Trimester 1, 2027' : 'Applications open' }))}
            action={
              <p className="text-sm text-muted-foreground">
                Four a year. Apply when it suits you.{' '}
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
