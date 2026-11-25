'use client'

import { CalendarClock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { InPageNav } from '@/components/course/above-fold'
import { BookingSlots } from '@/components/modules/booking-slots'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { CourseOutcomes, WaysToPay, WhyThisCourse } from '@/components/modules/framing'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, DateList, WhatYouDo } from '@/components/modules/real-terms'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Pill, Section } from '@/components/modules/ui'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import { animBreakdown, animFormal, animLinks } from '@/lib/personas/data/compliance'
import { animNext, animOutcomes, animPhases, animReasons, cmWays } from '@/lib/personas/data/framing'
import { animLike } from '@/lib/personas/data/real-terms'
import { ANIM, animDisciplines, animHoliday, animTutors, animVisitSlots, animWhereWent, animWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PanelButton, SplitHero } from './billboard'
import { PersonaShell } from './shell'

const tutorsStatic = animTutors.map(({ video: _video, ...t }) => t)

const NAV: [string, string][] = [
  ['#outcomes-card', 'Outcomes'],
  ['#like', "What it's like"],
  ['#journey', 'What you will make'],
  ['#work', 'Student work'],
  ['#why', 'Why this course'],
  ['#cost', 'Fees'],
  ['#visit', 'Visit'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

export function YoobeeAnimationPage() {
  const [campus, setCampus] = useState(ANIM.campuses[0])
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#visit"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['meta-kids'].name} (29% of Yoobee students). ${PERSONAS['meta-kids'].oneLine}`,
        testing: 'Same structure as the Creative Media page, with the work wall and a campus visit as the main action. Whether that is enough for an 18 to 19 year old to recognise their tribe and come in.',
        note: 'One call-out: the campus visit.',
      }}
      mainAction={{ label: 'Visit the campus', href: '#visit' }}
    >
      <main className="pb-24 sm:pb-0">
        <SplitHero
          eyebrow="Animation · Yoobee College of Creative Innovation"
          title="This is what last year's class made"
          titleLine={`${ANIM.title} · 1 year · On campus`}
          sub="Characters, environments, 2D, 3D. Eighteen to a studio, tutors who still ship work, and nobody asking you to pick something sensible."
          image="/images/yoobee/mc-animation.png"
          imageAlt="A student animating a character frame by frame on a drawing tablet"
          actions={
            <>
              <PanelButton href="#visit" primary>
                <MapPin className="size-4" aria-hidden /> Visit the campus
              </PanelButton>
              <PanelButton href="#holiday">
                <CalendarClock className="size-4" aria-hidden /> Holiday programme
              </PanelButton>
            </>
          }
          cards={[
            { label: 'Fee, 2027', value: '$0', tone: 'coral', placeholder: true, sub: 'Fees Free for eligible first-year students. Otherwise $8,990, with split payments available.' },
            {
              label: 'Next start',
              value: '15 Feb 2027',
              icon: <CalendarClock className="size-4" aria-hidden />,
              sub: `One year, four days a week, in ${ANIM.campuses.join(', ')}. You need to be 17+ with NCEA Level 2, or bring a portfolio.`,
            },
            { label: 'Class size', value: 'Max 18', placeholder: true, sub: 'One tutor per studio, and tutors who still work at Weta FX, PikPok and Mukpuddy.' },
          ]}
        />
        <InPageNav items={NAV} />

        <CourseOutcomes headline="Make things move" image="/images/yoobee/studio-crit.png" imageAlt="A tutor and students reviewing a 3D animation in the studio" outcomes={animOutcomes} />

        <Section id="like" eyebrow="The course" title="What it's like">
          <p className="max-w-[720px] text-[17px] leading-relaxed text-pretty">{animLike.text}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { h: 'The studios', b: 'Wacoms on every desk, a render farm, a mocap corner and a wall that gets repainted with student work every term.' },
              { h: 'The people', b: 'Half came straight from school, half took a year off to draw at home. Most found their people in the first fortnight.' },
              { h: 'The year', b: 'Two big projects, a film festival screening, a studio open night where employers come to you, and a showreel at the end.' },
            ].map((x) => (
              <div key={x.h} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg font-medium leading-snug">{x.h}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{x.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="journey" eyebrow="Term by term" title="What you will be making" tone="muted">
          <WhatYouDo phases={animPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="hairline-t scroll-mt-20 border-border py-8 md:py-12">
          <div className="mx-auto flex max-w-[960px] flex-col gap-1 px-6 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Student work</p>
            <h2 id="work-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              Work from the last class
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Filter by what you want to make. Every piece is credited.</p>
          </div>
          <StudentWorkWall disciplines={animDisciplines} works={animWorks} hero />
        </section>

        <Section id="why" eyebrow="Why this course" title="Why Yoobee" tone="muted">
          <WhyThisCourse reasons={animReasons} />
        </Section>

        <Section id="tutors" eyebrow="Why this course" title="Who teaches you">
          <PeopleCards people={tutorsStatic} />
        </Section>

        <Section id="graduates" eyebrow="Why this course" title="Where graduates went" tone="muted">
          <WhereGraduatesWent employers={animWhereWent} />
        </Section>

        <Section id="cost" eyebrow="Fees" title="Fees and ways to pay">
          <WaysToPay fee="$0" feeNote="For eligible first-year students under Fees Free in 2027. Otherwise $8,990 for the year, tuition and levy included." ways={cmWays} note="Fee is a placeholder until Yoobee confirms." />
        </Section>

        <Section id="visit" eyebrow="Visit" title="Come and see the campus" intro="Forty-five minutes in the studios while a class is on. Bring a friend or a parent if you want." tone="muted">
          <Callout eyebrow="Book a visit">
            <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Campus">
                {ANIM.campuses.map((c) => (
                  <Pill key={c} active={campus === c} onClick={() => setCampus(c)}>
                    {c}
                  </Pill>
                ))}
              </div>
              <BookingSlots days={animVisitSlots} what={`a campus visit at ${campus}`} confirmLine="A text with the address and who to ask for will come the day before. Bring anyone you like." />
            </div>
          </Callout>
        </Section>

        <Section id="holiday" eyebrow="Holiday programme" title="Three days in the studios" intro="January. Make something, meet the tutors, see if it feels like your place.">
          <DateList
            items={animHoliday.map((h) => ({ when: h.date, detail: `${h.where}, ${h.time}` }))}
            action={
              <p className="text-sm text-muted-foreground">
                Register when you book a visit, or{' '}
                <a href="#visit" className="underline underline-offset-4">
                  ask at the campus
                </a>
                .
              </p>
            }
          />
        </Section>

        <Section id="next" eyebrow="Pathway" title="Where this leads" tone="muted">
          <PathwayPicture steps={animNext} />
        </Section>

        <Section id="structure" eyebrow="Course structure" title="8 modules, 120 credits, 1 year">
          <CourseBreakdown breakdown={animBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border bg-muted">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={animFormal} links={animLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
