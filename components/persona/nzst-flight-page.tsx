'use client'

import { ArrowDown, MessageCircle } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails } from '@/components/modules/compliance'
import { InstantCheck } from '@/components/modules/instant-check'
import { MessageUs } from '@/components/modules/message-us'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { FeesSimple } from '@/components/modules/fees-simple'
import { CourseOutcomes, WhyThisCourse } from '@/components/modules/framing'
import { Callout, DateList, StoryCards, WhatYouDo } from '@/components/modules/real-terms'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { Expander, Placeholder, Section } from '@/components/modules/ui'
import { VideoReel } from '@/components/modules/video-reel'
import { WhatEmployersLookFor } from '@/components/modules/what-employers-look-for'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import { flightBreakdown, flightFormal, flightLinks } from '@/lib/personas/data/compliance'
import {
  FLIGHT,
  flightAirlines,
  flightClips,
  flightDropIns,
  flightIntakes,
  flightPathway,
  flightQuestions,
  flightRoutes,
  flightStories,
  flightUpFront,
  flightWants,
  resolveFlight,
} from '@/lib/personas/data/nzst'
import { flightOutcomes, flightReasons } from '@/lib/personas/data/framing'
import { flightLike, flightPhases } from '@/lib/personas/data/real-terms'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#check', 'Can I get in'],
  ['#outcomes-card', 'Outcomes'],
  ['#like', "What it's like"],
  ['#why', 'Why NZST'],
  ['#airlines', 'Airlines'],
  ['#pathway', 'Pathway'],
  ['#cost', 'Cost'],
  ['#message', 'Message us'],
  ['#start', 'Enrol'],
  ['#structure', 'Details'],
]

const fee = `$${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}`

export function NzstFlightPage() {
  return (
    <PersonaShell
      brand="nzst"
      applyHref="#start"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS.tailwinds.name} (41% of new enrolments). ${PERSONAS.tailwinds.oneLine} The "Start here" result also serves ${PERSONAS.confidence.name} (30%).`,
        testing: 'Whether one instant "Can I get in?" plus a short, readable page lifts enquiry to application on a phone, and whether "Start here" keeps people without Level 3.',
        note: 'Cut to about eight phone screens: hero, check, outcomes, why NZST, pathway, cost and enrol stay open; airlines, graduates, stories, drop-in days, structure and the formal bit are closed expanders.',
      }}
      mainAction={{ label: 'Can I get in?', href: '#check' }}
    >
      <main className="pb-24 sm:pb-0">
        <Billboard
          eyebrow={`NZST · ${FLIGHT.short} · ${FLIGHT.weeks} weeks · 5 campuses`}
          title={
            <>
              Wake up in a different city. <span className="text-coral">Start in {FLIGHT.weeks} weeks.</span>
            </>
          }
          sub="Sixteen weeks to cabin crew. Half of it in the simulator, three mock recruitment days, and airlines on campus in the final fortnight."
          facts={[
            { label: 'Length', value: `${FLIGHT.weeks} weeks` },
            { label: 'Where', value: FLIGHT.campuses.join(', ') },
            { label: 'You need', value: '16+, NCEA Level 2, or start with Level 3' },
            { label: 'Cost', value: `${fee} plus $${FLIGHT.levy} levy` },
          ]}
          actions={
            <>
              <HeroButton href="#check" primary>
                <ArrowDown className="size-5" aria-hidden /> Can I get in?
              </HeroButton>
              <HeroButton href="#message">
                <MessageCircle className="size-5" aria-hidden /> Message us
              </HeroButton>
            </>
          }
          footnote={`Next class starts ${FLIGHT.intakes[0]}. Morning or afternoon.`}
          videoLabel="Vertical video, graduates in uniform"
        />
        <InPageNav items={NAV} />

        <Section id="check" eyebrow="Thirty seconds" title="Can I get in?" dense tone="muted">
          <Callout eyebrow="Instant check">
            <InstantCheck title="Three questions" intro="A yes and a start date, or the first step of the same journey. Never a no." questions={flightQuestions} resolve={resolveFlight} ctaLabel="Tell me" placeholderNote={null} />
          </Callout>
        </Section>

        <CourseOutcomes headline="Ready for the recruiters in sixteen weeks" image="/images/nzst/graduate-uniform.png" imageAlt="A recent graduate in cabin crew uniform at an airport terminal" outcomes={flightOutcomes} compact />

        <Section id="like" eyebrow="The course" title="What it's like" dense>
          <p className="max-w-[720px] text-[15px] leading-relaxed text-pretty md:text-[17px]">{flightLike.text}</p>
          <Expander title="Week by week: what the sixteen weeks look like">
            <WhatYouDo phases={flightPhases} />
          </Expander>
        </Section>

        <Section id="why" eyebrow="Why this course" title="Why NZST" dense tone="muted">
          <WhyThisCourse reasons={flightReasons} compact />
        </Section>

        <Section id="airlines" eyebrow="Why this course" title="Airlines and graduates" dense>
          <div className="flex flex-col gap-2">
            <Expander title="What airlines look for, and how the course covers it">
              <WhatEmployersLookFor rows={flightWants} who="airline recruiters" />
            </Expander>
            <Expander title="Who hires our graduates, by airline">
              <div id="hired" className="scroll-mt-20">
                <WhereGraduatesWent employers={flightAirlines} />
              </div>
            </Expander>
            <Expander title="Graduates in uniform, in their words">
              <VideoReel clips={flightClips} />
            </Expander>
          </div>
        </Section>

        <Section id="pathway" eyebrow="Pathway" title="Level 3, then Flight, then your wings" intro="No Level 3? Start here. Same campuses, same tutors, and your place in Flight is held." dense>
          <PathwayPicture steps={flightPathway} />
          <Expander title="People who started without Level 3">
            <StoryCards stories={flightStories.slice(0, 3)} />
          </Expander>
        </Section>

        <Section id="cost" eyebrow="What it costs" title="Fees and ways to pay" dense tone="muted">
          <FeesSimple
            total={FLIGHT.fee + FLIGHT.levy}
            totalNote={`${fee} course fee plus a $${FLIGHT.levy} student levy. Allow about $630 for the uniform kit, swim test, passport and security check.`}
            currency="NZD"
            plans={[{ id: 'ft', label: 'Full-time', note: '16 weeks', months: 4 }]}
            facts={[
              'Fees Free for most first-time students: a tutor does the forms with you in week one',
              'Split payments across the sixteen weeks, interest free',
              'StudyLink loan and living costs if Fees Free is used up',
              'Pay up front, in full, before the start date',
            ]}
            talkHref="#message"
            talkLabel="WhatsApp or Instagram"
          />
          <div className="flex flex-col gap-2">
            <Expander title="Before you start: swim test, passport, security check">
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

        <Section id="message" eyebrow="Talk to us" title="Message us" dense tone="muted">
          <Callout eyebrow="Message us">
            <MessageUs who="Aroha, Flight tutor" hours="8am to 8pm, seven days" />
          </Callout>
          <Expander title="Drop-in days: come and see a campus, bring someone with you">
            <DateList items={flightDropIns.map((d) => ({ when: d.date, detail: `${d.where}, ${d.time}` }))} />
          </Expander>
        </Section>

        <Section id="start" eyebrow="Enrol" title="Pick your start date and campus" dense tone="muted">
          <Callout eyebrow="Enrol online">
            <Expander title={`Start ${FLIGHT.intakes[0]} or ${FLIGHT.intakes[1]}, at one of five campuses`}>
              <StartAndEnrol
                intakes={flightIntakes}
                campuses={FLIGHT.campuses}
                times={FLIGHT.times}
                cta="Enrol now"
                confirm="Aroha will text you within the hour with the three things to sort before day one, and the Fees Free form. No phone call unless you want one."
              />
            </Expander>
          </Callout>
        </Section>

        <Section id="structure" eyebrow="The detail" title="Course structure and the formal bit" dense>
          <div className="flex flex-col gap-2">
            <Expander title={`Course structure: 6 modules, 60 credits, ${FLIGHT.weeks} weeks`}>
              <CourseBreakdown breakdown={flightBreakdown} />
            </Expander>
            <Expander title="The formal bit: qualification, entry, fees, funding and policies">
              <div id="formal" className="scroll-mt-20">
                <FormalDetails rows={flightFormal} links={flightLinks} />
              </div>
            </Expander>
          </div>
        </Section>
      </main>
    </PersonaShell>
  )
}
