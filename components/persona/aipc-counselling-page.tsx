'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { AccreditationPanel } from '@/components/modules/accreditation-panel'
import { ChatNow } from '@/components/modules/chat-now'
import { CompareTable } from '@/components/modules/compare-table'
import { CostCalculator } from '@/components/modules/cost-calculator'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FactsStrip } from '@/components/modules/facts-strip'
import { InstantCheck } from '@/components/modules/instant-check'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { PeopleCards } from '@/components/modules/people-cards'
import { RoutingQuestion } from '@/components/modules/routing-question'
import { SendSummary } from '@/components/modules/send-summary'
import { SessionPicker } from '@/components/modules/session-picker'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { StoriesMatched } from '@/components/modules/stories-matched'
import { ButtonLink, Expander, Placeholder, Section } from '@/components/modules/ui'
import { WeekPlanner } from '@/components/modules/week-planner'
import {
  AIPC_COURSE,
  aipcAccreditations,
  aipcChat,
  aipcCompare,
  aipcCompareNote,
  aipcCostExtras,
  aipcCostVersions,
  aipcCreditQuestions,
  aipcEmployerSummary,
  aipcEmployers,
  aipcFacts,
  aipcGuideRoutes,
  aipcIntakes,
  aipcOutcomeStats,
  aipcPathway,
  aipcPay,
  aipcPlannerModes,
  aipcQuestions,
  aipcSessions,
  aipcShiftModes,
  aipcStories,
  aipcStoryFilters,
  aipcTutors,
  resolveCredit,
} from '@/lib/personas/data/aipc'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

type Who = 'sarah' | 'dan'

const ROUTES = [
  { id: 'sarah' as const, label: 'I am new to counselling', hint: 'Thinking about a change from another career' },
  { id: 'dan' as const, label: 'I already work in the field', hint: 'Youth, support or community work' },
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
          ? 'Whether a plain credit answer and the option to enrol without a call move frontliners faster than a callback. Second action: chat.'
          : 'Whether a calm, proof-led page with "Talk to a tutor" as the main action earns more conversations than "Apply now". Second action: the course guide.',
        note: 'Both personas are assumed, not researched. Switch between them with the question under the headline. Figures use the 2027 structure.',
      }}
      mainAction={isDan ? { label: 'Check my credit', href: '#credit' } : { label: 'Talk to a tutor', href: '#tutors' }}
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
                  <>
                    <ButtonLink href="#credit" size="lg">
                      Check my credit <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                    <ButtonLink href="#chat" size="lg" variant="secondary">
                      Chat now
                    </ButtonLink>
                  </>
                ) : (
                  <>
                    <ButtonLink href="#tutors" size="lg">
                      Talk to a tutor <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                    <ButtonLink href="#sessions" size="lg" variant="secondary">
                      Join an information session
                    </ButtonLink>
                    <ButtonLink href="#guide" variant="link" className="text-sm">
                      Download the course guide
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
          <div className="rounded-xl border border-border bg-muted p-5">
            <RoutingQuestion question="Are you new to counselling, or already working in the field?" options={ROUTES} value={who} onChange={setWho} />
          </div>
        </section>

        {isDan ? <DanSections /> : <SarahSections />}
      </main>
    </PersonaShell>
  )
}

function SarahSections() {
  return (
    <>
      <Section
        id="accreditation"
        eyebrow="Accreditation"
        title="Recognised, and what that lets you do"
        intro="The qualification is the thing you are checking, so here it is first."
        tone="muted"
      >
        <AccreditationPanel items={aipcAccreditations} />
      </Section>

      <Section
        id="tutors"
        eyebrow="Who teaches you"
        title="Practising counsellors. Book twenty minutes with one."
        intro="Not a sales call. A conversation with someone who does the work and teaches it, about whether this is right for you at this stage of life."
      >
        <PeopleCards people={aipcTutors} bookLabel="Book 20 minutes" what="a 20-minute conversation" />
        <div id="sessions" className="flex scroll-mt-20 flex-col gap-4 rounded-xl border border-border bg-muted p-5 sm:p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl leading-tight">Or join an information session</h3>
            <p className="text-sm text-muted-foreground">The next three. Forty-five minutes online, with time for questions, and no follow-up calls.</p>
          </div>
          <SessionPicker sessions={aipcSessions} what="information session" cta="Register" />
        </div>
      </Section>

      <Section
        id="week"
        eyebrow="My week"
        title="The real hours, alongside a job"
        intro="Choose how you would study and see where it sits in a working week. Most people in their forties take the part-time route."
        tone="muted"
      >
        <WeekPlanner modes={aipcPlannerModes} />
      </Section>

      <Section
        id="placement"
        eyebrow="Placement"
        title={`${AIPC_COURSE.placementHours} hours, arranged with you`}
        intro="Placement is where the degree lands with a real person in front of you. It is organised, supervised and counted properly."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { h: 'How many hours', b: `${AIPC_COURSE.placementHours} hours in total, at least ${AIPC_COURSE.directClientHours} of them face to face with clients. The rest is observation, case notes, supervision and service work.` },
            { h: 'How it is arranged', b: 'A placement coordinator starts with you in your second trimester and matches you to a service near where you live or work. You do not cold-call agencies.' },
            { h: 'What support you get', b: 'Fortnightly supervision with a practising counsellor, a placement handbook, and a tutor you can call if something is hard.' },
          ].map((x) => (
            <div key={x.h} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
              <h3 className="text-lg font-medium leading-snug">{x.h}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="cost"
        eyebrow="Full cost"
        title="Everything it costs, including the bits people forget"
        intro="Tuition, workshop travel, placement checks and books, then the three ways to pay, side by side."
        tone="muted"
      >
        <CostCalculator versions={aipcCostVersions} extras={aipcCostExtras} currency="AUD" feeHelpNote={AIPC_COURSE.feeHelpWho} />
      </Section>

      <Section id="pathway" eyebrow="The pathway" title="Steps, not a leap" intro="Where the Master sits, and how people without a degree get here.">
        <PathwayPicture steps={aipcPathway} />
      </Section>

      <Section
        id="stories"
        eyebrow="Graduates like me"
        title="People your age who changed careers"
        intro="Pick what you did before and see who else made the same move, how old they were and how long it took."
        tone="muted"
      >
        <StoriesMatched prompt="Before counselling, I was..." filters={aipcStoryFilters} stories={aipcStories} />
      </Section>

      <Section
        id="compare"
        eyebrow="An honest comparison"
        title="AIPC against a university master's"
        intro="You are comparing anyway. Here is the table, including where a university might suit you better."
      >
        <CompareTable rows={aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={aipcCompareNote} />
      </Section>

      <Section id="questions" eyebrow="Questions" title="The ones career changers ask" tone="muted">
        <div className="flex flex-col gap-2">
          {aipcQuestions.map((q) => (
            <Expander key={q.q} title={q.q}>
              <p className="text-pretty">{q.a}</p>
            </Expander>
          ))}
        </div>
      </Section>

      <Section id="guide" eyebrow="The course guide" title="Take it away and read it properly">
        <EnquiryForm
          title="Download the course guide"
          intro="Subjects, placement, fees, dates and the pathway in one PDF. An email address is all we ask for."
          routes={aipcGuideRoutes}
          cta="Send me the guide"
          emailOnly
        />
      </Section>

      <Section id="start" eyebrow="When you are ready" title="Start dates" intro="Four a year. Apply when it suits you, not when a timer says so." tone="muted">
        <ul className="grid gap-2 sm:grid-cols-4">
          {AIPC_COURSE.intakes.map((d) => (
            <li key={d} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium">
              {d}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="#tutors" variant="secondary">
            Talk to a tutor first
          </ButtonLink>
          <ButtonLink href="#start" variant="link" className="text-sm">
            Apply (not in prototype)
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}

function DanSections() {
  return (
    <>
      <Section
        id="credit"
        eyebrow="Credit for what you have done"
        title="Check my credit"
        intro="Three questions. Subjects credited, months saved and cost saved, straight away. The formal assessment is free after you enrol."
        tone="muted"
      >
        <InstantCheck title="How much could you skip?" questions={aipcCreditQuestions} resolve={resolveCredit} ctaLabel="Show my credit" />
      </Section>

      <Section id="jobs" eyebrow="Jobs and pay" title="What the qualification opens up" intro="Roles, employers and pay bands, each with where the number comes from.">
        <OutcomesPanel stats={aipcOutcomeStats} employers={aipcEmployers} pay={aipcPay} />
      </Section>

      <Section id="shifts" eyebrow="Study around shifts" title="Where it fits in a roster" intro="Set to shift work. The live tutorial is recorded, so a missed one does not matter." tone="muted">
        <WeekPlanner modes={aipcShiftModes} title="My week, on shifts" />
      </Section>

      <Section id="fees" eyebrow="Fees and payment" title="What it costs and how to pay" intro="Pick the version, see the full figure, compare FEE-HELP, per trimester and a mix.">
        <CostCalculator versions={aipcCostVersions} extras={aipcCostExtras} currency="AUD" feeHelpNote={AIPC_COURSE.feeHelpWho} />
      </Section>

      <Section id="employer" eyebrow="For your manager" title="Summary for my employer" intro="One page with the course, cost, time and recognition. Send it or download it to ask about funding or study leave." tone="muted">
        <SendSummary to="your employer" title="Master of Counselling, AIPC" intro="A one-page summary for a manager considering study support." lines={aipcEmployerSummary} />
      </Section>

      <Section id="chat" eyebrow="Chat now" title="Answers on the page, not in a call" intro="Scripted answers for the common questions, and a real tutor when you want one.">
        <ChatNow canned={aipcChat} person="Daniel Okafor" />
      </Section>

      <Section id="enrol" eyebrow="Enrol online" title="Pick a start date and enrol" intro="No information session required. Enrol, then the credit assessment and placement planning start." tone="muted">
        <StartAndEnrol
          intakes={aipcIntakes}
          cta="Enrol online"
          confirm="A confirmation is on its way with your credit assessment form and the FEE-HELP form. Daniel Okafor will email you by the end of the day to check the credit estimate, not to sell you anything."
        />
        <p className="text-xs text-muted-foreground">
          <Placeholder /> Intake dates follow the 2027 calendar and are placeholders until confirmed.
        </p>
      </Section>
      <div id="start" className="sr-only">
        Start dates are listed under Enrol online.
      </div>
    </>
  )
}
