'use client'

import { ArrowDown, Play, Share2 } from 'lucide-react'
import { useState } from 'react'
import { FactsStrip } from '@/components/modules/facts-strip'
import { GettingToCampus } from '@/components/modules/getting-to-campus'
import { InstantCheck } from '@/components/modules/instant-check'
import { MessageUs } from '@/components/modules/message-us'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { SendSummary } from '@/components/modules/send-summary'
import { SessionPicker } from '@/components/modules/session-picker'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { StoriesMatched } from '@/components/modules/stories-matched'
import { TextMeBack } from '@/components/modules/text-me-back'
import { Button, ButtonLink, Expander, Placeholder, Section } from '@/components/modules/ui'
import { VideoReel } from '@/components/modules/video-reel'
import { WeekPlanner } from '@/components/modules/week-planner'
import { WhatEmployersLookFor } from '@/components/modules/what-employers-look-for'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import {
  FLIGHT,
  flightAirlines,
  flightClips,
  flightDropIns,
  flightFacts,
  flightFamilySummary,
  flightIntakes,
  flightPathway,
  flightQuestions,
  flightRoutes,
  flightStories,
  flightStoryFilters,
  flightTimetable,
  flightUpFront,
  flightWants,
  resolveFlight,
} from '@/lib/personas/data/nzst'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

export function NzstFlightPage() {
  const [shared, setShared] = useState(false)
  return (
    <PersonaShell
      brand="nzst"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS.tailwinds.name} (41% of new enrolments). ${PERSONAS.tailwinds.oneLine} The "Start here" result also serves ${PERSONAS.confidence.name} (30%): ${PERSONAS.confidence.oneLine}`,
        testing: 'Whether an instant "Can I get in?" lifts enquiry to application on a phone, whether "Start here" keeps people without Level 3, and whether messaging beats a callback form.',
        note: 'Phone first. View at a narrow width. Fee, levy, dates and campuses are from the brief; everything else is placeholder.',
      }}
      mainAction={{ label: 'Can I get in?', href: '#check' }}
    >
      <main className="pb-24 sm:pb-0">
        <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" aria-hidden />
          <button
            type="button"
            className="absolute inset-x-0 top-1/3 mx-auto flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground"
            aria-label="Play graduates in uniform (placeholder video)"
          >
            <Play className="ml-1 size-7" aria-hidden />
          </button>
          <span className="absolute left-5 top-5 sm:left-8">
            <Placeholder>Vertical video, graduates in uniform</Placeholder>
          </span>
          <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 pb-10 sm:px-8 sm:pb-14">
            <p className="text-xs font-medium uppercase tracking-wide opacity-90">{FLIGHT.short}</p>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl">
              Wake up in a different city. Start in {FLIGHT.weeks} weeks.
            </h1>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#check" size="lg">
                Can I get in? <ArrowDown className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#message" size="lg" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground" variant="secondary">
                Message us
              </ButtonLink>
            </div>
          </div>
        </section>

        <Section id="check" eyebrow="Thirty seconds" title="Can I get in?" intro="Three questions. A yes and a start date, or the first step of the same journey. Never a no." dense tone="muted">
          <InstantCheck title="Can I get in?" questions={flightQuestions} resolve={resolveFlight} ctaLabel="Tell me" placeholderNote={null} />
        </Section>

        <section className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <FactsStrip facts={flightFacts} />
        </section>

        <Section id="airlines" eyebrow="Recruiters" title="What airlines look for, and how we cover it" dense>
          <WhatEmployersLookFor rows={flightWants} who="airline recruiters" />
        </Section>

        <Section id="hired" eyebrow="Who hires our graduates" title="The airlines, and the people they took" dense tone="muted">
          <WhereGraduatesWent employers={flightAirlines} />
        </Section>

        <Section id="reel" eyebrow="Graduates" title="In uniform, in their words" dense>
          <VideoReel clips={flightClips} />
        </Section>

        <Section id="pathway" eyebrow="The journey" title="Level 3, then Flight, then your wings" intro="No Level 3? Start here. Same campuses, same tutors, and your place in Flight is held." dense tone="muted">
          <PathwayPicture steps={flightPathway} />
          <StoriesMatched prompt="People like me" filters={flightStoryFilters} stories={flightStories} />
        </Section>

        <Section id="cost" eyebrow="Cost and dates" title="One line, no surprises" dense>
          <p className="rounded-xl border border-border bg-card p-5 text-[15px] leading-relaxed text-pretty">
            <span className="font-medium">${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}</span> plus a ${FLIGHT.levy} student levy. Fees Free covers it for most
            first-time students. Starts {FLIGHT.intakes.join(' or ')}, at {FLIGHT.campuses.join(', ')}. Morning or afternoon classes.{' '}
            <a href="#facts" className="underline underline-offset-4">
              All the facts
            </a>
            .
          </p>
          <div className="flex flex-col gap-2">
            <Expander title="What you need to know up front: swim test, passport, security check">
              <ul className="flex flex-col gap-3">
                {flightUpFront.map((x) => (
                  <li key={x.h} className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{x.h}</span>
                    <span className="text-pretty">{x.b}</span>
                  </li>
                ))}
              </ul>
            </Expander>
            <Expander title="Timetable: morning or afternoon classes around a job">
              <WeekPlanner modes={flightTimetable} title="Timetable fit" />
            </Expander>
            <Expander title="Funding help: Fees Free, StudyLink and who helps you apply">
              <p className="text-pretty">
                Fees Free covers tuition for most students in their first year of tertiary study. StudyLink can cover living costs. A named tutor sits with you
                to do the forms in your first week, and we answer Work and Income questions before you enrol. <Placeholder />
              </p>
            </Expander>
          </div>
        </Section>

        <Section id="campus" eyebrow="Getting there" title="How long, and what it costs each week" dense tone="muted">
          <GettingToCampus routes={flightRoutes} />
        </Section>

        <Section id="message" eyebrow="Talk to us" title="Message us, or get a text back" dense>
          <MessageUs who="Aroha, Flight tutor" hours="8am to 8pm, seven days" />
          <TextMeBack id="text" person="Aroha Ngata" role="Flight Attending tutor, Auckland Airport" minutes={10} />
        </Section>

        <Section id="dropin" eyebrow="Come and see" title="Drop-in days" intro="Bring someone with you." dense tone="muted">
          <SessionPicker sessions={flightDropIns} what="drop-in day" cta="Save my spot" bring="Bring a friend or family. The bus from South Auckland schools runs on the Saturday dates." />
        </Section>

        <Section id="start" eyebrow="You're in" title="Pick your start date and campus" dense>
          <StartAndEnrol
            intakes={flightIntakes}
            campuses={FLIGHT.campuses}
            times={FLIGHT.times}
            cta="Enrol now"
            confirm="Aroha will text you within the hour with the three things to sort before day one, and the Fees Free form. No phone call unless you want one."
          />
        </Section>

        <Section id="share" eyebrow="Tell someone" title="Share this with a friend or your family" dense tone="muted">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShared(true)} variant="secondary">
              <Share2 className="size-4" aria-hidden /> {shared ? 'Link copied (prototype)' : 'Share this page'}
            </Button>
          </div>
          <SendSummary to="your family" title="Level 4 Flight Attending, NZST" intro="A short summary for family, with the cost and where graduates work." lines={flightFamilySummary} />
        </Section>
      </main>
    </PersonaShell>
  )
}
