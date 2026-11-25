'use client'

import { ArrowDown, Play } from 'lucide-react'
import { FactsStrip } from '@/components/modules/facts-strip'
import { InstantCheck } from '@/components/modules/instant-check'
import { MessageUs } from '@/components/modules/message-us'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { Callout, CostPlain, DateList, StoryCards, WhatYouDo } from '@/components/modules/real-terms'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { ButtonLink, Expander, Placeholder, Section } from '@/components/modules/ui'
import { VideoReel } from '@/components/modules/video-reel'
import { WhatEmployersLookFor } from '@/components/modules/what-employers-look-for'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import {
  FLIGHT,
  flightAirlines,
  flightClips,
  flightDropIns,
  flightFacts,
  flightIntakes,
  flightPathway,
  flightQuestions,
  flightRoutes,
  flightStories,
  flightUpFront,
  flightWants,
  resolveFlight,
} from '@/lib/personas/data/nzst'
import { flightCostLines, flightLike, flightPay, flightPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

export function NzstFlightPage() {
  return (
    <PersonaShell
      brand="nzst"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS.tailwinds.name} (41% of new enrolments). ${PERSONAS.tailwinds.oneLine} The "Start here" result also serves ${PERSONAS.confidence.name} (30%).`,
        testing: 'Whether one instant "Can I get in?" plus a short, readable page lifts enquiry to application on a phone, and whether "Start here" keeps people without Level 3.',
        note: 'Three call-outs: the check, message us, enrol. Everything else scrolls. Fee, levy, dates and campuses are from the brief.',
      }}
      mainAction={{ label: 'Can I get in?', href: '#check' }}
    >
      <main className="pb-24 sm:pb-0">
        <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" aria-hidden />
          <button type="button" className="absolute inset-x-0 top-1/3 mx-auto flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground" aria-label="Play graduates in uniform (placeholder video)">
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
              <ButtonLink href="#message" size="lg" variant="secondary" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground">
                Message us
              </ButtonLink>
            </div>
          </div>
        </section>

        <Section id="check" eyebrow="Thirty seconds" title="Can I get in?" dense tone="muted">
          <Callout eyebrow="Instant check">
            <InstantCheck title="Three questions. A yes and a start date, or the first step." questions={flightQuestions} resolve={resolveFlight} ctaLabel="Tell me" placeholderNote={null} />
          </Callout>
        </Section>

        <section className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <FactsStrip facts={flightFacts} />
        </section>

        <Section id="like" eyebrow="In real terms" title="What the sixteen weeks are actually like" dense>
          <p className="max-w-3xl text-[17px] leading-relaxed text-pretty">{flightLike.text}</p>
          <WhatYouDo phases={flightPhases} />
        </Section>

        <Section id="airlines" eyebrow="Recruiters" title="What airlines look for, and how we cover it" dense tone="muted">
          <WhatEmployersLookFor rows={flightWants} who="airline recruiters" />
        </Section>

        <Section id="hired" eyebrow="Who hires our graduates" title="The airlines, and the people they took" dense>
          <WhereGraduatesWent employers={flightAirlines} />
          <VideoReel clips={flightClips} />
        </Section>

        <Section id="pathway" eyebrow="The journey" title="Level 3, then Flight, then your wings" intro="No Level 3? Start here. Same campuses, same tutors, and your place in Flight is held." dense tone="muted">
          <PathwayPicture steps={flightPathway} />
          <StoryCards stories={flightStories.slice(0, 3)} />
        </Section>

        <Section id="cost" eyebrow="Cost and dates" title="No surprises" dense>
          <CostPlain lines={flightCostLines} pay={flightPay} note="Kit and document costs are estimates." />
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
            <Expander title="Getting to campus: typical routes, time and weekly cost">
              <ul className="flex flex-col divide-y divide-border">
                {flightRoutes.map((r) => (
                  <li key={r.suburb} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                    <span className="text-foreground">
                      {r.suburb} <span aria-hidden>&rarr;</span> {r.campus}
                    </span>
                    <span className="tabular-nums">
                      {r.mins} min, about ${r.weekly} a week
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                Student concession fares, from public timetables. <Placeholder />
              </p>
            </Expander>
          </div>
        </Section>

        <Section id="message" eyebrow="Talk to us" title="Message us. Reply in minutes." dense tone="muted">
          <Callout eyebrow="Message us">
            <MessageUs who="Aroha, Flight tutor" hours="8am to 8pm, seven days" />
          </Callout>
        </Section>

        <Section id="dropin" eyebrow="Come and see" title="Drop-in days" intro="Bring someone with you. No booking needed." dense>
          <DateList items={flightDropIns.map((d) => ({ when: d.date, detail: `${d.where}, ${d.time}` }))} />
        </Section>

        <Section id="start" eyebrow="You're in" title="Pick your start date and campus" dense tone="muted">
          <Callout eyebrow="Enrol online">
            <StartAndEnrol
              intakes={flightIntakes}
              campuses={FLIGHT.campuses}
              times={FLIGHT.times}
              cta="Enrol now"
              confirm="Aroha will text you within the hour with the three things to sort before day one, and the Fees Free form. No phone call unless you want one."
            />
          </Callout>
        </Section>
      </main>
    </PersonaShell>
  )
}
