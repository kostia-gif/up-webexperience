'use client'

import { CalendarClock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { InPageNav } from '@/components/course/above-fold'
import { BookingSlots } from '@/components/modules/booking-slots'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, CostPlain, DateList } from '@/components/modules/real-terms'
import { SpecialismExplorer } from '@/components/modules/specialism-explorer'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { Pill, Section } from '@/components/modules/ui'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import { animBreakdown, animFormal, animLinks } from '@/lib/personas/data/compliance'
import { animCostLines, animLike } from '@/lib/personas/data/real-terms'
import { ANIM, animDisciplines, animHoliday, animSpecialisms, animTutors, animVisitSlots, animWhereWent, animWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { Billboard, HeroButton, QuickAnswers } from './billboard'
import { PersonaShell } from './shell'

const tutorsStatic = animTutors.map(({ video: _video, ...t }) => t)

const NAV: [string, string][] = [
  ['#work', 'Student work'],
  ['#like', "What it's like"],
  ['#specialism', 'Your specialism'],
  ['#tutors', 'Tutors'],
  ['#graduates', 'Graduates'],
  ['#cost', 'Cost'],
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
        testing: 'Whether leading with the work, then one specialism explorer and one visit booking, is enough for an 18 to 19 year old to recognise their tribe and come in.',
        note: 'Visual structure follows the original round. Two call-outs: specialism explorer and campus visit.',
      }}
      mainAction={{ label: 'Visit the campus', href: '#visit' }}
    >
      <main className="pb-24 sm:pb-0">
        <Billboard
          eyebrow={`Yoobee · ${ANIM.title} · 1 year · On campus`}
          title={
            <>
              This is what last year&apos;s <span className="text-coral">class made.</span>
            </>
          }
          sub="Characters, environments, 2D, 3D. Eighteen to a studio, tutors who still ship work, and nobody asking you to pick something sensible."
          facts={[
            { label: 'Length', value: '1 year, full-time' },
            { label: 'Where', value: ANIM.campuses.join(', ') },
            { label: 'You need', value: '17+, NCEA Level 2 or a portfolio' },
            { label: 'Cost', value: 'Fees Free if eligible, or $8,990', placeholder: true },
          ]}
          actions={
            <>
              <HeroButton href="#visit" primary>
                <MapPin className="size-5" aria-hidden /> Visit the campus
              </HeroButton>
              <HeroButton href="#holiday">
                <CalendarClock className="size-5" aria-hidden /> Holiday programme
              </HeroButton>
            </>
          }
          videoLabel="Studio footage, filmed by students"
        />
        <section id="work" aria-labelledby="work-title" className="scroll-mt-20">
          <h2 id="work-title" className="sr-only">
            Student work
          </h2>
          <div className="pt-4">
            <StudentWorkWall disciplines={animDisciplines} works={animWorks} hero />
          </div>
        </section>
        <QuickAnswers
          pairs={[
            ['Next start', '15 Feb 2027'],
            ['How long', '1 year'],
            ['Where', '3 campuses'],
            ['Class size', 'Max 18'],
            ['You get', 'Level 5 diploma'],
          ]}
        />
        <InPageNav items={NAV} />

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

        <Section id="specialism" eyebrow="Specialisms" title="What do you want to make?" tone="muted">
          <Callout eyebrow="Pick a specialism">
            <SpecialismExplorer specialisms={animSpecialisms} />
          </Callout>
        </Section>

        <Section id="tutors" eyebrow="Your tutors" title="Who teaches you">
          <PeopleCards people={tutorsStatic} />
        </Section>

        <Section id="graduates" eyebrow="Graduates" title="Where graduates went" tone="muted">
          <WhereGraduatesWent employers={animWhereWent} />
        </Section>

        <Section id="cost" eyebrow="Fees" title="What it costs">
          <CostPlain
            lines={animCostLines}
            pay={[
              { title: 'Fees Free', body: 'New Zealand citizens and residents in their first year of tertiary study. We help with the forms.' },
              { title: 'Student loan', body: 'StudyLink covers the fee if Fees Free is used up, and can cover living costs.' },
            ]}
            note="Fee is a placeholder until Yoobee confirms."
          />
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
                . Parents: the course guide has a one-page summary of outcomes, cost and support (not in prototype).
              </p>
            }
          />
        </Section>

        <Section id="structure" eyebrow="Course structure" title="8 modules, 120 credits, 1 year" tone="muted">
          <CourseBreakdown breakdown={animBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={animFormal} links={animLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
