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
          sub="A sixteen-week course for people who want to work as cabin crew. About half the course is in the cabin simulator, with three mock recruitment days and airline recruiters on campus in the final fortnight."
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
          footnote={`Next intake starts ${FLIGHT.intakes[0]}. Morning or afternoon classes.`}
          videoLabel="Vertical video, graduates in uniform"
        />
        <InPageNav items={NAV} />

        <Section id="check" eyebrow="Entry check" title="Can I get in?" dense tone="muted">
          <Callout eyebrow="Three questions">
            <InstantCheck title="Check your entry point" intro="Find out whether you can enrol in Level 4 Flight Attending now, or start with Level 3 Tourism." questions={flightQuestions} resolve={resolveFlight} ctaLabel="Tell me" placeholderNote={null} />
          </Callout>
        </Section>

        <CourseOutcomes headline="What you will be able to do" image="/images/nzst/graduate-uniform.png" imageAlt="A recent graduate in cabin crew uniform at an airport terminal" outcomes={flightOutcomes} compact />

        <Section id="like" eyebrow="The course" title="How the course works" dense>
          <p className="max-w-[720px] text-[15px] leading-relaxed text-pretty md:text-[17px]">{flightLike.text}</p>
          <Expander title="Week by week: the sixteen-week course outline">
            <WhatYouDo phases={flightPhases} />
          </Expander>
        </Section>

        <Section id="why" eyebrow="Why this course" title="Why study with NZST" dense tone="muted">
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
            <Expander title="Graduate videos">
              <VideoReel clips={flightClips} />
            </Expander>
          </div>
        </Section>

        <Section id="pathway" eyebrow="Pathway" title="Level 3 Tourism, then Flight Attending, then airline recruitment" intro="If you do not have NCEA Level 3, Level 3 Tourism leads directly into this course at the same campus." dense>
          <PathwayPicture steps={flightPathway} />
          <Expander title="Graduates who started without Level 3">
            <StoryCards stories={flightStories.slice(0, 3)} />
          </Expander>
        </Section>

        <Section id="cost" eyebrow="Fees" title="Fees and payment options" dense tone="muted">
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
            <Expander title="Requirements before you start: swim test, passport, security check">
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

        <Section id="message" eyebrow="Contact" title="Message us" dense tone="muted">
          <Callout eyebrow="Message us">
            <MessageUs who="Aroha, Flight tutor" hours="8am to 8pm, seven days" />
          </Callout>
          <Expander title="Drop-in days at each campus">
            <DateList items={flightDropIns.map((d) => ({ when: d.date, detail: `${d.where}, ${d.time}` }))} />
          </Expander>
        </Section>

        <Section id="start" eyebrow="Enrol" title="Choose a start date and campus" dense tone="muted">
          <Callout eyebrow="Enrol online">
            <Expander title={`Start ${FLIGHT.intakes[0]} or ${FLIGHT.intakes[1]}, at one of five campuses`}>
              <StartAndEnrol
                intakes={flightIntakes}
                campuses={FLIGHT.campuses}
                times={FLIGHT.times}
                cta="Enrol now"
                confirm="Aroha will text you within the hour with the three requirements to arrange before you start, and the Fees Free form. We will not phone unless you ask us to."
              />
            </Expander>
          </Callout>
        </Section>

        <Section id="structure" eyebrow="Course details" title="Course structure and formal details" dense>
          <div className="flex flex-col gap-2">
            <Expander title={`Course structure: 6 modules, 60 credits, ${FLIGHT.weeks} weeks`}>
              <CourseBreakdown breakdown={flightBreakdown} />
            </Expander>
            <Expander title="Formal details: qualification, entry, fees, funding and policies">
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
