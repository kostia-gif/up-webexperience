'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { BookingSlots } from '@/components/modules/booking-slots'
import { FactsStrip } from '@/components/modules/facts-strip'
import { PeopleCards } from '@/components/modules/people-cards'
import { Callout, CostPlain, DateList } from '@/components/modules/real-terms'
import { SpecialismExplorer } from '@/components/modules/specialism-explorer'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { ButtonLink, Pill, Section } from '@/components/modules/ui'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import { animCostLines, animLike } from '@/lib/personas/data/real-terms'
import { ANIM, animDisciplines, animFacts, animHoliday, animSpecialisms, animTutors, animVisitSlots, animWhereWent, animWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

const tutorsStatic = animTutors.map(({ video: _video, ...t }) => t)

export function YoobeeAnimationPage() {
  const [campus, setCampus] = useState(ANIM.campuses[0])
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#visit"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['meta-kids'].name} (29% of Yoobee students). ${PERSONAS['meta-kids'].oneLine}`,
        testing: 'Whether leading with the work and a maker\u2019s voice, then one specialism explorer and one visit booking, is enough for an 18 to 19 year old to recognise their tribe and come in.',
        note: 'Two interactive call-outs: specialism explorer and campus visit. The work wall filter is the only other control.',
      }}
      mainAction={{ label: 'Come and see the campus', href: '#visit' }}
    >
      <main className="pb-24 sm:pb-0">
        <section className="flex flex-col gap-6 pt-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{ANIM.title}</p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">This is what last year&apos;s class made.</h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Characters, environments, 2D, 3D. Eighteen to a studio, tutors who still ship work, and no one asking you to pick something sensible.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#visit" size="lg">
                Come and see the campus <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#holiday" size="lg" variant="secondary">
                Holiday programme dates
              </ButtonLink>
            </div>
          </div>
          <StudentWorkWall disciplines={animDisciplines} works={animWorks} hero />
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
            <FactsStrip facts={animFacts} />
          </div>
        </section>

        <Section id="like" eyebrow="In real terms" title="What a year here is actually like">
          <p className="max-w-3xl text-[17px] leading-relaxed text-pretty">{animLike.text}</p>
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

        <Section id="specialism" eyebrow="Pick your thing" title="What do you want to make?" intro="You study the thing you love, not a general creative course." tone="muted">
          <Callout eyebrow="Specialism explorer">
            <SpecialismExplorer specialisms={animSpecialisms} />
          </Callout>
        </Section>

        <Section id="tutors" eyebrow="Who teaches you" title="Tutors who still work in the industry">
          <PeopleCards people={tutorsStatic} />
        </Section>

        <Section id="graduates" eyebrow="Where graduates went" title="By studio and role" tone="muted">
          <WhereGraduatesWent employers={animWhereWent} />
        </Section>

        <Section id="cost" eyebrow="Cost" title="What it costs">
          <CostPlain lines={animCostLines} pay={[{ title: 'Fees Free', body: 'New Zealand citizens and residents in their first year of tertiary study. We help with the forms.' }, { title: 'Student loan', body: 'StudyLink covers the fee if Fees Free is used up, and can cover living costs.' }]} note="Fee is a placeholder until Yoobee confirms." />
        </Section>

        <Section id="visit" eyebrow="Come and see it" title="Book a campus visit" intro="Forty-five minutes in the studios while a class is on. Bring a friend or a parent if you want." tone="muted">
          <Callout eyebrow="Come and see the campus">
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

        <Section id="holiday" eyebrow="Try it first" title="Holiday programmes" intro="Three days in the studios in January. Make something, meet the tutors, see if it feels like your place.">
          <DateList
            items={animHoliday.map((h) => ({ when: h.date, detail: `${h.where}, ${h.time}` }))}
            action={
              <p className="text-sm text-muted-foreground">
                Register when you book a visit, or{' '}
                <a href="#visit" className="underline underline-offset-4">
                  ask at the campus
                </a>
                . Parents: a one-page summary of outcomes, cost and support is in the course guide (not in prototype).
              </p>
            }
          />
        </Section>
      </main>
    </PersonaShell>
  )
}
