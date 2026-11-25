'use client'

import { BadgeCheck, CalendarClock, Download, Landmark, MessageCircle, ShieldCheck } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { AccreditationPanel } from '@/components/modules/accreditation-panel'
import { BookingSlots } from '@/components/modules/booking-slots'
import { CompareTable } from '@/components/modules/compare-table'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { CourseOutcomes, WaysToPay, WhyThisCourse } from '@/components/modules/framing'
import { InstantCheck } from '@/components/modules/instant-check'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, DateList, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { Expander, Section } from '@/components/modules/ui'
import { AIPC_COURSE, aipcAccreditations, aipcCompare, aipcCompareNote, aipcCreditQuestions, aipcQuestions, aipcSessions, aipcStories, aipcTutors, resolveCredit } from '@/lib/personas/data/aipc'
import { aipcBreakdown, aipcFormal, aipcLinks } from '@/lib/personas/data/compliance'
import { aipcGuideRoute, aipcOutcomes, aipcReasons, aipcWays } from '@/lib/personas/data/framing'
import { aipcLike, aipcPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { PanelButton, SplitHero } from './billboard'
import { PersonaShell } from './shell'

const tutorsStatic = aipcTutors.map(({ slots: _slots, video: _video, ...t }) => t)

const NAV: [string, string][] = [
  ['#outcomes-card', 'Outcomes'],
  ['#like', "What it's like"],
  ['#journey', 'What you will do'],
  ['#why', 'Why this course'],
  ['#talk', 'Talk to us'],
  ['#cost', 'Fees'],
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
        testing: 'Whether a calm, readable course page framed around outcomes and "why this course", with a course specialist as the main action, earns more conversations than "Apply now". The credit check serves people already in the field without a separate version.',
        note: 'Three call-outs: talk to a course specialist, check your credit, course guide. Figures use the 2027 structure. Both personas are assumed.',
      }}
      mainAction={{ label: 'Talk to a course specialist', href: '#talk' }}
    >
      <main className="pb-24 sm:pb-0">
        <SplitHero
          eyebrow="Counselling · Postgraduate · AQF Level 9"
          title={
            <>
              Make helping people <em className="font-serif">your profession</em>
            </>
          }
          titleLine={`Master of Counselling · ${AIPC_COURSE.standard.subjects} subjects · 18 months part-time, or 24 months Advanced`}
          sub="An ACA-accredited master\u2019s degree taught by practising counsellors, online around a working life. Any bachelor degree gets you in."
          image="/images/aipc/hero-evening-study.png"
          imageAlt="A woman in her forties reading course notes at home in the evening"
          pills={[
            { icon: <BadgeCheck className="size-4" aria-hidden />, label: 'ACA accredited' },
            { icon: <ShieldCheck className="size-4" aria-hidden />, label: 'Registered HE provider' },
            { icon: <Landmark className="size-4" aria-hidden />, label: 'FEE-HELP approved' },
          ]}
          actions={
            <>
              <PanelButton href="#talk" primary>
                <MessageCircle className="size-4" aria-hidden /> Talk to a course specialist
              </PanelButton>
              <PanelButton href="#guide">
                <Download className="size-4" aria-hidden /> Course guide
              </PanelButton>
            </>
          }
          note={
            <>
              Already working in the field?{' '}
              <a href="#credit" className="font-medium text-primary-foreground underline underline-offset-4 hover:no-underline">
                Check your credit for prior study and experience
              </a>
            </>
          }
          cards={[
            {
              label: 'Tuition, 2027',
              value: '$34,650',
              placeholder: true,
              sub: (
                <>
                  Or $47,250 for the 24-month Advanced. A university master\u2019s is indicatively $62,000 to $78,000.{' '}
                  <a href="#compare" className="text-primary underline underline-offset-4">
                    Compare
                  </a>
                </>
              ),
            },
            {
              label: 'FEE-HELP approved',
              value: '$0 upfront',
              tone: 'success',
              icon: <Landmark className="size-4" aria-hidden />,
              sub: (
                <>
                  Defer all tuition if eligible and repay through tax.{' '}
                  <a href="#cost" className="font-medium underline underline-offset-4 hover:no-underline">
                    Ways to pay
                  </a>
                </>
              ),
            },
            {
              label: 'Next start',
              value: '1 March 2027',
              icon: <CalendarClock className="size-4" aria-hidden />,
              sub: 'Four intakes a year: March, May, July and November. Online, with five in-person workshop days.',
            },
          ]}
        />
        <InPageNav items={NAV} />

        <CourseOutcomes
          headline="Become the person others turn to"
          image="/images/aipc/placement.png"
          imageAlt="A counselling student in a supervised placement session"
          outcomes={aipcOutcomes}
        />

        <Section id="like" eyebrow="The course" title="What it's like">
          <WhatItsLike {...aipcLike} />
        </Section>

        <Section id="journey" eyebrow="Month by month" title="What you will be doing" tone="muted">
          <WhatYouDo phases={aipcPhases} />
        </Section>

        <Section id="why" eyebrow="Why this course" title="Why AIPC">
          <WhyThisCourse reasons={aipcReasons} />
        </Section>

        <Section id="accreditation" eyebrow="Why this course" title="Recognition" tone="muted">
          <AccreditationPanel items={aipcAccreditations} />
        </Section>

        <Section id="tutors" eyebrow="Why this course" title="Who teaches you" intro="Practising counsellors. Every tutor still sees clients.">
          <PeopleCards people={tutorsStatic} />
        </Section>

        <Section id="compare" eyebrow="Why this course" title="Compared with a university" tone="muted">
          <CompareTable rows={aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={aipcCompareNote} />
        </Section>

        <Section
          id="talk"
          eyebrow="Talk to us"
          title="Talk to a course specialist"
          intro="Our course specialists are practising counsellors who know the sector. Twenty minutes to work out whether this is right for you, how it would fit your life, and what credit you might get. Not a sales call."
        >
          <Callout eyebrow="Book twenty minutes">
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
              <BookingSlots
                days={[
                  { day: 'Tue 2 Feb', times: ['12:00', '18:30', '19:00'] },
                  { day: 'Wed 3 Feb', times: ['12:30', '17:30', '18:00'] },
                  { day: 'Thu 4 Feb', times: ['08:30', '19:00', '19:30'] },
                ]}
                what="a 20-minute conversation with a course specialist"
              />
              <p className="text-xs text-muted-foreground">Prefer a group session? Online information sessions: {aipcSessions.map((s) => s.date).join(', ')}. Ask for the link when you book.</p>
            </div>
          </Callout>
        </Section>

        <Section id="cost" eyebrow="Fees" title="Fees and ways to pay" tone="muted">
          <WaysToPay
            fee="$34,650"
            feeNote="Master of Counselling, 18 months, billed per subject at $3,465. The 24-month Advanced is $47,250. Allow about $2,500 across the course for workshop travel, placement checks and books."
            ways={aipcWays}
            note={AIPC_COURSE.feeHelpWho}
          />
        </Section>

        <Section id="stories" eyebrow="Graduates" title="People who changed careers">
          <StoryCards stories={aipcStories.slice(0, 3)} />
        </Section>

        <Section id="credit" eyebrow="Already in the field?" title="Credit for prior study and experience" intro="Youth, support and community workers often skip subjects. Three questions for an estimate; the formal assessment is free after you enrol." tone="muted">
          <Callout eyebrow="Check your credit">
            <InstantCheck title="How much could you skip?" questions={aipcCreditQuestions} resolve={resolveCredit} ctaLabel="Show my credit" />
          </Callout>
        </Section>

        <Section id="questions" eyebrow="Questions" title="Common questions">
          <div className="flex flex-col gap-2">
            {aipcQuestions.map((q) => (
              <Expander key={q.q} title={q.q}>
                <p className="text-pretty">{q.a}</p>
              </Expander>
            ))}
          </div>
        </Section>

        <Section id="guide" eyebrow="Course guide" title="Download the course guide" tone="muted">
          <Callout eyebrow="Course guide">
            <EnquiryForm title="Everything on this page, as a PDF" intro="Subjects, placement, fees, credit and the pathway. An email address is all we ask for." routes={aipcGuideRoute} cta="Send me the guide" emailOnly />
          </Callout>
        </Section>

        <Section id="start" eyebrow="Intakes" title="Start dates">
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

        <Section id="structure" eyebrow="Course structure" title={`${AIPC_COURSE.standard.subjects} subjects, 18 months`} tone="muted">
          <CourseBreakdown breakdown={aipcBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={aipcFormal} links={aipcLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
