'use client'

import { ArrowRight } from 'lucide-react'
import { CourseFinder } from '@/components/modules/course-finder'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FactsStrip } from '@/components/modules/facts-strip'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { Callout, CostPlain, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { TasterLesson } from '@/components/modules/taster-lesson'
import { ButtonLink, Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmCostLines, cmPay, cmPhases } from '@/lib/personas/data/real-terms'
import {
  CM,
  cmAdvisor,
  cmAdvisorRoutes,
  cmEmployers,
  cmFacts,
  cmFinderCourses,
  cmFinderQuestions,
  cmNext,
  cmOutcomeStats,
  cmPay as cmPayBands,
  cmStories,
  cmWorks,
} from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

export function YoobeeCreativeMediaPage() {
  const like = creativeMediaLevel4.like
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#advisor"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name} (64% of Yoobee students). ${PERSONAS['plan-b'].oneLine}`,
        testing: 'Whether a plain, scrollable page that shows what you make and what comes after, with a course finder and a taster as the only call-outs, speeds up the decision for an adult with commitments.',
        note: 'Three interactive call-outs: course finder, taster lesson, advisor form. Everything else is to read. The 84% figure appears once.',
      }}
      mainAction={{ label: 'Find the right course for me', href: '#finder' }}
    >
      <main className="pb-24 sm:pb-0">
        <section className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{CM.short}</p>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">Turn your passion into a new path.</h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                You were the one who drew, filmed or made things, then got steered somewhere sensible. Nineteen weeks, online or on campus, around the job you
                have now. With the numbers on what comes after.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#finder" size="lg">
                  Find the right course for me <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="#taster" size="lg" variant="secondary">
                  Try a free taster lesson
                </ButtonLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/yoobee/hero-home-studio.png" alt="A home desk set up for design work in the evening" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
          <FactsStrip facts={cmFacts} />
        </section>

        <Section id="like" eyebrow="In real terms" title="What the course is actually like" tone="muted">
          <WhatItsLike text={like.text} schedule={like.schedule} poster={like.videoPoster} caption={like.videoCaption} />
        </Section>

        <Section id="journey" eyebrow="What you make, and when" title="Nineteen weeks, three things you can hold up">
          <WhatYouDo phases={cmPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="scroll-mt-20 bg-muted py-12 sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 pb-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Student work</p>
            <h2 id="work-title" className="font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              The standard you will reach
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground text-pretty">Work from the last cohort, credited. Judge it yourself.</p>
          </div>
          <StudentWorkWall disciplines={[]} works={cmWorks} />
        </section>

        <Section id="outcomes" eyebrow="Does it pay?" title="Where graduates work and what they earn" intro="One figure, one meaning, one source.">
          <OutcomesPanel stats={cmOutcomeStats} employers={cmEmployers} pay={cmPayBands} />
        </Section>

        <Section id="stories" eyebrow="People who switched" title="From the old job to the new one" tone="muted">
          <StoryCards stories={cmStories.slice(0, 3)} />
        </Section>

        <Section id="finder" eyebrow="Not sure which course?" title="Find the right course for me">
          <Callout eyebrow="Course finder">
            <CourseFinder questions={cmFinderQuestions} courses={cmFinderCourses} advisor={cmAdvisor} talkHref="#advisor" />
          </Callout>
        </Section>

        <Section id="cost" eyebrow="Cost" title="What it costs, in plain terms" tone="muted">
          <CostPlain lines={cmCostLines} pay={cmPay} note="Fees Free conditions as published for 2027, to be confirmed." />
        </Section>

        <Section id="taster" eyebrow="Try before you decide" title="A free taster lesson" intro="A real lesson from week two. Do it on a Sunday and see how it feels.">
          <Callout eyebrow="Free taster lesson">
            <TasterLesson
              lesson="Typography and layout: a poster in ninety minutes"
              minutes={90}
              covers={['Hierarchy, grid and type pairing, the same way week two teaches it', 'The brief, the files and a worked example', 'Submit it if you like and get written feedback from a tutor']}
              tutor="Priya Nair, Creative Media tutor"
            />
          </Callout>
        </Section>

        <Section id="next" eyebrow="What this leads to" title="Next courses" tone="muted">
          <PathwayPicture steps={cmNext} />
        </Section>

        <Section id="advisor" eyebrow="Talk to a course advisor" title="A named person who gets back to you when you choose">
          <Callout eyebrow="Talk to an advisor">
            <EnquiryForm title={`Talk to ${cmAdvisor.name}`} intro={cmAdvisor.line} routes={cmAdvisorRoutes} cta="Ask Sam to get in touch" />
          </Callout>
        </Section>
      </main>
    </PersonaShell>
  )
}
