'use client'

import { BadgeCheck, CalendarClock, Download, Landmark, MessageCircle, Search, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { InPageNav } from '@/components/course/above-fold'
import { AccreditationPanel } from '@/components/modules/accreditation-panel'
import { BookingSlots } from '@/components/modules/booking-slots'
import { CompareTable } from '@/components/modules/compare-table'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { InstantCheck } from '@/components/modules/instant-check'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, CostPlain, DateList, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { RoutingQuestion } from '@/components/modules/routing-question'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { Expander, Section } from '@/components/modules/ui'
import { WeekPlanner } from '@/components/modules/week-planner'
import {
  AIPC_COURSE,
  aipcAccreditations,
  aipcCompare,
  aipcCompareNote,
  aipcCreditQuestions,
  aipcEmployers,
  aipcGuideRoutes,
  aipcIntakes,
  aipcOutcomeStats,
  aipcPay as aipcPayBands,
  aipcQuestions,
  aipcSessions,
  aipcShiftModes,
  aipcStories,
  aipcTutors,
  resolveCredit,
} from '@/lib/personas/data/aipc'
import { aipcBreakdown, aipcFormal, aipcLinks } from '@/lib/personas/data/compliance'
import { aipcCostLines, aipcDanLike, aipcLike, aipcPay, aipcPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { PanelButton, SplitHero } from './billboard'
import { PersonaShell } from './shell'

type Who = 'sarah' | 'dan'

const ROUTES = [
  { id: 'sarah' as const, label: 'I am new to counselling', hint: 'Thinking about a change from another career' },
  { id: 'dan' as const, label: 'I already work in the field', hint: 'Youth, support or community work' },
]

const tutorsStatic = aipcTutors.map(({ slots: _slots, video: _video, ...t }) => t)

const SARAH_NAV: [string, string][] = [
  ['#like', "What it's like"],
  ['#journey', 'What you will do'],
  ['#talk', 'Who teaches you'],
  ['#cost', 'Cost'],
  ['#stories', 'Graduates'],
  ['#compare', 'Compare'],
  ['#structure', 'Subjects'],
  ['#formal', 'Details'],
]

const DAN_NAV: [string, string][] = [
  ['#credit', 'Credit'],
  ['#like', 'Around shifts'],
  ['#jobs', 'Jobs and pay'],
  ['#cost', 'Cost'],
  ['#enrol', 'Enrol'],
  ['#structure', 'Subjects'],
  ['#formal', 'Details'],
]

export function AipcCounsellingPage({ initial = 'sarah' }: { initial?: Who }) {
  const [who, setWho] = useState<Who>(initial)
  const isDan = who === 'dan'

  return (
    <PersonaShell
      brand="aipc"
      applyHref="#start"
      reviewer={{
        forWho: isDan ? `${PERSONAS.dan.name}. ${PERSONAS.dan.oneLine}` : `${PERSONAS.sarah.name}. ${PERSONAS.sarah.oneLine}`,
        testing: isDan
          ? 'Whether a plain credit answer and enrolling online without a call move frontliners faster than a callback.'
          : 'Whether a calm, readable page with "Talk to a tutor" as the only main action earns more conversations than "Apply now".',
        note: 'Visual structure follows the original round: billboard, quick answers, in-page nav, course structure and the formal bit. Figures use the 2027 structure. Both personas are assumed.',
      }}
      mainAction={isDan ? { label: 'Check my credit', href: '#credit' } : { label: 'Talk to a tutor', href: '#talk' }}
    >
      <main className="pb-24 sm:pb-0">
        <SplitHero
          eyebrow="Counselling · Postgraduate · AQF Level 9"
          title={
            isDan ? (
              <>
                Turn the work you already do into a <em className="font-serif">recognised qualification</em>
              </>
            ) : (
              <>
                Become the counsellor <em className="font-serif">you once needed</em>
              </>
            )
          }
          titleLine={`Master of Counselling · ${AIPC_COURSE.standard.subjects} subjects · 18 months part-time, or 24 months Advanced`}
          sub={
            isDan
              ? 'You already do the helping. This gets you the title, the registration and the pay band, online around your roster, with credit for what you have done.'
              : 'An ACA-accredited master\u2019s degree taught by practising counsellors, online around a working life. Any bachelor degree gets you in.'
          }
          image={isDan ? '/images/aipc/hero-home-study.png' : '/images/aipc/hero-evening-study.png'}
          imageAlt={isDan ? 'A support worker studying at a kitchen table after a shift' : 'A woman in her forties reading course notes at home in the evening'}
          pills={[
            { icon: <BadgeCheck className="size-4" aria-hidden />, label: 'ACA accredited' },
            { icon: <ShieldCheck className="size-4" aria-hidden />, label: 'Registered HE provider' },
            { icon: <Landmark className="size-4" aria-hidden />, label: 'FEE-HELP approved' },
          ]}
          actions={
            isDan ? (
              <>
                <PanelButton href="#credit" primary>
                  <Search className="size-4" aria-hidden /> Check my credit
                </PanelButton>
                <PanelButton href="#enrol">Enrol online</PanelButton>
              </>
            ) : (
              <>
                <PanelButton href="#talk" primary>
                  <MessageCircle className="size-4" aria-hidden /> Talk to a tutor
                </PanelButton>
                <PanelButton href="#guide">
                  <Download className="size-4" aria-hidden /> Course guide
                </PanelButton>
              </>
            )
          }
          note={isDan ? 'Up to four subjects credited. Enrol without a call.' : 'No pressure to apply. Take the time you need.'}
          cards={[
            {
              label: 'Total tuition, 2027',
              value: '$34,650',
              placeholder: true,
              sub: (
                <>
                  A university Master of Counselling is indicatively $62,000 to $78,000.{' '}
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
                    How it works
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
        <div className="hairline-t border-border bg-background">
          <div className="mx-auto max-w-[960px] px-6 py-5">
            <RoutingQuestion question="Are you new to counselling, or already working in the field?" options={ROUTES} value={who} onChange={setWho} compact />
          </div>
        </div>
        <InPageNav items={isDan ? DAN_NAV : SARAH_NAV} />

        {isDan ? <DanSections /> : <SarahSections />}

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

function SarahSections() {
  return (
    <>
      <Section id="like" eyebrow="The course" title="What it's like">
        <WhatItsLike {...aipcLike} />
      </Section>

      <Section id="journey" eyebrow="Month by month" title="What you will be doing" tone="muted">
        <WhatYouDo phases={aipcPhases} />
      </Section>

      <Section id="accreditation" eyebrow="Recognition" title="Accredited, and what that means">
        <AccreditationPanel items={aipcAccreditations} />
      </Section>

      <Section id="talk" eyebrow="Your tutors" title="Who teaches you" intro="Practising counsellors. Book twenty minutes with one before you decide. It is a conversation, not a sales call." tone="muted">
        <PeopleCards people={tutorsStatic} />
        <Callout eyebrow="Talk to a tutor">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
            <p className="text-sm text-muted-foreground">Pick a time. Whoever is free that slot will call.</p>
            <BookingSlots
              days={[
                { day: 'Tue 2 Feb', times: ['12:00', '18:30', '19:00'] },
                { day: 'Wed 3 Feb', times: ['12:30', '17:30', '18:00'] },
                { day: 'Thu 4 Feb', times: ['08:30', '19:00', '19:30'] },
              ]}
              what="a 20-minute conversation with a tutor"
            />
            <p className="text-xs text-muted-foreground">Information sessions: {aipcSessions.map((s) => s.date).join(', ')}, 45 minutes online. Ask for the link when you book.</p>
          </div>
        </Callout>
      </Section>

      <Section id="cost" eyebrow="Fees" title="What it costs">
        <CostPlain lines={aipcCostLines} pay={aipcPay} note="Extras are estimates until UP confirms them." />
      </Section>

      <Section id="stories" eyebrow="Graduates" title="People who changed careers" tone="muted">
        <StoryCards stories={aipcStories.slice(0, 3)} />
      </Section>

      <Section id="compare" eyebrow="Comparison" title="Compared with a university">
        <CompareTable rows={aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={aipcCompareNote} />
      </Section>

      <Section id="questions" eyebrow="Questions" title="Common questions" tone="muted">
        <div className="flex flex-col gap-2">
          {aipcQuestions.map((q) => (
            <Expander key={q.q} title={q.q}>
              <p className="text-pretty">{q.a}</p>
            </Expander>
          ))}
        </div>
      </Section>

      <Section id="guide" eyebrow="Course guide" title="Download the course guide">
        <Callout eyebrow="Course guide">
          <EnquiryForm title="Everything on this page, as a PDF" intro="Subjects, placement, fees, dates and the pathway. An email address is all we ask for." routes={aipcGuideRoutes} cta="Send me the guide" emailOnly />
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
    </>
  )
}

function DanSections() {
  return (
    <>
      <Section id="credit" eyebrow="Credit" title="How much could you skip?">
        <Callout eyebrow="Check my credit">
          <InstantCheck title="Three questions" intro="Subjects credited, months saved and cost saved. The formal assessment is free after you enrol." questions={aipcCreditQuestions} resolve={resolveCredit} ctaLabel="Show my credit" />
        </Callout>
      </Section>

      <Section id="like" eyebrow="The course" title="How it fits around shifts" tone="muted">
        <p className="max-w-[720px] text-[17px] leading-relaxed text-pretty">{aipcDanLike.text}</p>
        <WeekPlanner modes={[aipcShiftModes[0]]} title="A typical week on rotating shifts" />
      </Section>

      <Section id="jobs" eyebrow="Outcomes" title="Jobs and pay">
        <OutcomesPanel stats={aipcOutcomeStats} employers={aipcEmployers} pay={aipcPayBands} />
      </Section>

      <Section id="cost" eyebrow="Fees" title="What it costs" tone="muted">
        <CostPlain lines={aipcCostLines} pay={aipcPay} note="Extras are estimates until UP confirms them." />
        <p className="text-sm text-muted-foreground">
          Need something for your manager?{' '}
          <a href="#cost" className="underline underline-offset-4">
            Download the one-page employer summary (not in prototype)
          </a>
          .
        </p>
      </Section>

      <Section id="enrol" eyebrow="Enrol" title="Pick a start date and enrol" intro="No information session required.">
        <Callout eyebrow="Enrol online">
          <StartAndEnrol
            intakes={aipcIntakes}
            cta="Enrol online"
            confirm="A confirmation is on its way with your credit assessment form and the FEE-HELP form. Daniel Okafor, who teaches the youth units, will email you by the end of the day to check the credit estimate."
          />
        </Callout>
      </Section>
      <div id="start" className="sr-only">
        Start dates are listed under Enrol.
      </div>
    </>
  )
}
