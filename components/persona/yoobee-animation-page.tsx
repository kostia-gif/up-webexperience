'use client'

import { ArrowRight, Video } from 'lucide-react'
import { useState } from 'react'
import { BookingSlots } from '@/components/modules/booking-slots'
import { FactsStrip } from '@/components/modules/facts-strip'
import { PeopleCards } from '@/components/modules/people-cards'
import { SendSummary } from '@/components/modules/send-summary'
import { SessionPicker } from '@/components/modules/session-picker'
import { SpecialismExplorer } from '@/components/modules/specialism-explorer'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { ButtonLink, Pill, Placeholder, Section } from '@/components/modules/ui'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import {
  ANIM,
  animDisciplines,
  animFacts,
  animHoliday,
  animParentSummary,
  animSpecialisms,
  animTutors,
  animVisitSlots,
  animWhereWent,
  animWorks,
} from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

export function YoobeeAnimationPage() {
  const [campus, setCampus] = useState(ANIM.campuses[0])
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#visit"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['meta-kids'].name} (29% of Yoobee students). ${PERSONAS['meta-kids'].oneLine}`,
        testing: 'Whether leading with student work and a maker\u2019s voice, with no stock imagery or business language, makes an 18 to 19 year old recognise their tribe and book a campus visit.',
        note: 'Student work tiles are placeholders. Each will be a real, credited piece.',
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
                Join a holiday programme
              </ButtonLink>
            </div>
          </div>
          <StudentWorkWall disciplines={animDisciplines} works={animWorks} hero />
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
            <FactsStrip facts={animFacts} />
          </div>
        </section>

        <Section id="specialism" eyebrow="Pick your thing" title="What do you want to make?" intro="Pick it and see the craft, the tools and the jobs. You study the thing you love, not a general creative course.">
          <SpecialismExplorer specialisms={animSpecialisms} />
        </Section>

        <Section id="tutors" eyebrow="Who teaches you" title="Tutors who still work in the industry" intro="Their credits, their own work, and what they are making this term." tone="muted">
          <PeopleCards people={animTutors} />
        </Section>

        <Section id="studios" eyebrow="The place" title="The studios and the people">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { h: 'The studios', b: 'Wacoms on every desk, a render farm, a mocap corner and a wall that gets repainted with student work every term. Open till 9pm.' },
              { h: 'The people', b: 'Eighteen per studio. Half came straight from school, half took a year off to draw at home. Most found their people in the first fortnight.' },
              { h: 'The year', b: 'Two big projects, a film festival screening, a studio open night where employers come to you, and a showreel at the end.' },
            ].map((x) => (
              <div key={x.h} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg font-medium leading-snug">{x.h}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{x.b}</p>
              </div>
            ))}
          </div>
          <button type="button" className="flex aspect-[21/9] w-full items-center justify-center gap-2 rounded-xl bg-muted text-sm text-muted-foreground hover:bg-border" aria-label="Play the studio walk-through (placeholder)">
            <Video className="size-5" aria-hidden /> Studio walk-through, filmed by students <Placeholder />
          </button>
        </Section>

        <Section id="graduates" eyebrow="Where graduates went" title="By studio and role" intro="Names, studios and what they do there. No percentages." tone="muted">
          <WhereGraduatesWent employers={animWhereWent} />
        </Section>

        <Section id="visit" eyebrow="Come and see it" title="Book a campus visit" intro="Forty-five minutes in the studios while a class is on. Bring a friend or a parent if you want. Or take the virtual tour first.">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Campus">
              {ANIM.campuses.map((c) => (
                <Pill key={c} active={campus === c} onClick={() => setCampus(c)}>
                  {c}
                </Pill>
              ))}
            </div>
            <BookingSlots days={animVisitSlots} what={`a campus visit at ${campus}`} confirmLine="A text with the address and who to ask for will come the day before. Bring anyone you like." />
            <ButtonLink href="#visit" variant="link" className="self-start text-sm">
              Take the virtual tour instead (not in prototype)
            </ButtonLink>
          </div>
        </Section>

        <Section id="holiday" eyebrow="Try it first" title="Join a holiday programme" intro="Three days in the studios in January. Make something, meet the tutors, and see if it feels like your place." tone="muted">
          <SessionPicker sessions={animHoliday} what="holiday programme" cta="Register" bring="Bring a laptop if you have one. Everything else is here." />
        </Section>

        <Section id="parent" eyebrow="For a parent" title="Send to a parent" intro="The outcomes, the cost and the support in one page, without the sales pitch.">
          <SendSummary to="a parent" title="Diploma in Animation, Yoobee" intro="A short, plain summary for a parent or caregiver." lines={animParentSummary} />
        </Section>
      </main>
    </PersonaShell>
  )
}
