'use client'

import { ArrowRight, Download } from 'lucide-react'
import { useState } from 'react'
import { AccreditationPanel } from '@/components/modules/accreditation-panel'
import { BookingSlots } from '@/components/modules/booking-slots'
import { CompareTable } from '@/components/modules/compare-table'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FactsStrip } from '@/components/modules/facts-strip'
import { InstantCheck } from '@/components/modules/instant-check'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, CostPlain, DateList, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { RoutingQuestion } from '@/components/modules/routing-question'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { ButtonLink, Expander, Section } from '@/components/modules/ui'
import { WeekPlanner } from '@/components/modules/week-planner'
import {
  AIPC_COURSE,
  aipcAccreditations,
  aipcCompare,
  aipcCompareNote,
  aipcCreditQuestions,
  aipcEmployers,
  aipcFacts,
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
import { aipcCostLines, aipcDanLike, aipcLike, aipcPay, aipcPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

type Who = 'sarah' | 'dan'

const ROUTES = [
  { id: 'sarah' as const, label: 'I am new to counselling', hint: 'Thinking about a change from another career' },
  { id: 'dan' as const, label: 'I already work in the field', hint: 'Youth, support or community work' },
]

const tutorsStatic = aipcTutors.map(({ slots: _slots, video: _video, ...t }) => t)

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
          : 'Whether a calm, readable page that explains the course in real terms, with "Talk to a tutor" as the only main action, earns more conversations than "Apply now".',
        note: 'Two or three interactive call-outs per version; everything else is plain text to read and scroll. Figures use the 2027 structure. Both personas are assumed.',
      }}
      mainAction={isDan ? { label: 'Check my credit', href: '#credit' } : { label: 'Talk to a tutor', href: '#talk' }}
    >
      <main className="pb-24 sm:pb-0">
        <section className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{AIPC_COURSE.title}</p>
              {isDan ? (
                <h1 className="font-display text-4xl leading-[1.1] text-balance sm:text-5xl">
                  Turn the work you already do into a <span className="font-serif">recognised</span> qualification.
                </h1>
              ) : (
                <h1 className="font-display text-4xl leading-[1.1] text-balance sm:text-5xl">
                  Become the counsellor you <span className="font-serif">once needed.</span>
                </h1>
              )}
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {isDan
                  ? 'You already do the helping. This gets you the title, the registration and the pay band, online around your shifts, with credit for what you have done.'
                  : 'An ACA-accredited master\u2019s degree taught by practising counsellors, online around a working life. No pressure to apply. Take the time you need.'}
              </p>
              <div className="flex flex-wrap gap-3">
                {isDan ? (
                  <ButtonLink href="#credit" size="lg">
                    Check my credit <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                ) : (
                  <>
                    <ButtonLink href="#talk" size="lg">
                      Talk to a tutor <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                    <ButtonLink href="#guide" size="lg" variant="secondary">
                      <Download className="size-4" aria-hidden /> Course guide
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isDan ? '/images/aipc/hero-home-study.png' : '/images/aipc/hero-evening-study.png'}
                alt={isDan ? 'A support worker studying at a kitchen table after a shift' : 'A woman in her forties reading course notes at home in the evening'}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <FactsStrip facts={aipcFacts} />
          <RoutingQuestion question="Are you new to counselling, or already working in the field?" options={ROUTES} value={who} onChange={setWho} compact />
        </section>

        {isDan ? <DanSections /> : <SarahSections />}
      </main>
    </PersonaShell>
  )
}

function SarahSections() {
  return (
    <>
      <Section id="like" eyebrow="In real terms" title="What studying this actually looks like" tone="muted">
        <WhatItsLike {...aipcLike} />
      </Section>

      <Section id="journey" eyebrow="What you do, and when" title="Eighteen months in three stretches">
        <WhatYouDo phases={aipcPhases} />
      </Section>

      <Section id="accreditation" eyebrow="Recognition" title="Accredited, and what that lets you do" tone="muted">
        <AccreditationPanel items={aipcAccreditations} />
      </Section>

      <Section
        id="talk"
        eyebrow="Who teaches you"
        title="Practising counsellors. Talk to one before you decide."
        intro="Not a sales call. Twenty minutes with someone who does the work and teaches it, about whether this is right for you at this stage of life."
      >
        <PeopleCards people={tutorsStatic} />
        <Callout eyebrow="Talk to a tutor">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
            <p className="text-sm text-muted-foreground">Pick a time. Whoever is free that slot will call. Or come to the next information session instead.</p>
            <BookingSlots
              days={[
                { day: 'Tue 2 Feb', times: ['12:00', '18:30', '19:00'] },
                { day: 'Wed 3 Feb', times: ['12:30', '17:30', '18:00'] },
                { day: 'Thu 4 Feb', times: ['08:30', '19:00', '19:30'] },
              ]}
              what="a 20-minute conversation with a tutor"
            />
            <p className="text-xs text-muted-foreground">
              Information sessions: {aipcSessions.map((s) => s.date).join(', ')}, 45 minutes online. Ask for the link when you book.
            </p>
          </div>
        </Callout>
      </Section>

      <Section id="cost" eyebrow="Cost" title="What it costs, including the bits people forget" tone="muted">
        <CostPlain lines={aipcCostLines} pay={aipcPay} note="Extras are estimates until UP confirms them." />
      </Section>

      <Section id="stories" eyebrow="Graduates like you" title="People your age who changed careers">
        <StoryCards stories={aipcStories.slice(0, 3)} />
      </Section>

      <Section id="compare" eyebrow="An honest comparison" title="AIPC against a university master's" tone="muted">
        <CompareTable rows={aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={aipcCompareNote} />
      </Section>

      <Section id="questions" eyebrow="Questions" title="The ones career changers ask">
        <div className="flex flex-col gap-2">
          {aipcQuestions.map((q) => (
            <Expander key={q.q} title={q.q}>
              <p className="text-pretty">{q.a}</p>
            </Expander>
          ))}
        </div>
      </Section>

      <Section id="guide" eyebrow="Take it away" title="The course guide" tone="muted">
        <Callout eyebrow="Download the course guide">
          <EnquiryForm
            title="Everything on this page, in a PDF"
            intro="Subjects, placement, fees, dates and the pathway. An email address is all we ask for."
            routes={aipcGuideRoutes}
            cta="Send me the guide"
            emailOnly
          />
        </Callout>
      </Section>

      <Section id="start" eyebrow="When you are ready" title="Start dates">
        <DateList
          items={AIPC_COURSE.intakes.map((d, i) => ({ when: d, detail: i === 0 ? 'Trimester 1, 2027' : 'Applications open' }))}
          action={
            <p className="text-sm text-muted-foreground">
              Four a year. Apply when it suits you, not when a timer says so.{' '}
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
      <Section id="credit" eyebrow="Credit for what you have done" title="How much could you skip?" tone="muted">
        <Callout eyebrow="Check my credit">
          <InstantCheck
            title="Three questions, instant answer"
            intro="Subjects credited, months saved and cost saved. The formal assessment is free after you enrol."
            questions={aipcCreditQuestions}
            resolve={resolveCredit}
            ctaLabel="Show my credit"
          />
        </Callout>
      </Section>

      <Section id="like" eyebrow="In real terms" title="How it fits around shifts">
        <p className="max-w-3xl text-[17px] leading-relaxed text-pretty">{aipcDanLike.text}</p>
        <WeekPlanner modes={[aipcShiftModes[0]]} title="A typical week on rotating shifts" />
      </Section>

      <Section id="jobs" eyebrow="Jobs and pay" title="What the qualification opens up" tone="muted">
        <OutcomesPanel stats={aipcOutcomeStats} employers={aipcEmployers} pay={aipcPayBands} />
      </Section>

      <Section id="cost" eyebrow="Cost" title="What it costs and how to pay">
        <CostPlain lines={aipcCostLines} pay={aipcPay} note="Extras are estimates until UP confirms them." />
        <p className="text-sm text-muted-foreground">
          Need something for your manager?{' '}
          <a href="#cost" className="underline underline-offset-4">
            Download the one-page employer summary (not in prototype)
          </a>
          .
        </p>
      </Section>

      <Section id="enrol" eyebrow="Enrol online" title="Pick a start date and enrol" intro="No information session required." tone="muted">
        <Callout eyebrow="Enrol online">
          <StartAndEnrol
            intakes={aipcIntakes}
            cta="Enrol online"
            confirm="A confirmation is on its way with your credit assessment form and the FEE-HELP form. Daniel Okafor, who teaches the youth units, will email you by the end of the day to check the credit estimate."
          />
        </Callout>
      </Section>
      <div id="start" className="sr-only">
        Start dates are listed under Enrol online.
      </div>
    </>
  )
}
