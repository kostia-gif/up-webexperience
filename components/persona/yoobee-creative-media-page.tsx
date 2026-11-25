'use client'

import { ArrowRight } from 'lucide-react'
import { CourseFinder } from '@/components/modules/course-finder'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FactsStrip } from '@/components/modules/facts-strip'
import { InstantCheck } from '@/components/modules/instant-check'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { StoriesMatched } from '@/components/modules/stories-matched'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { TasterLesson } from '@/components/modules/taster-lesson'
import { ButtonLink, Placeholder, Section } from '@/components/modules/ui'
import { WeekPlanner } from '@/components/modules/week-planner'
import {
  CM,
  cmAdvisor,
  cmAdvisorRoutes,
  cmEmployers,
  cmFacts,
  cmFinderCourses,
  cmFinderQuestions,
  cmFundingQuestions,
  cmNext,
  cmOutcomeStats,
  cmPay,
  cmPlannerModes,
  cmStories,
  cmStoryFilters,
  cmWorks,
  resolveCmFunding,
} from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PersonaShell } from './shell'

export function YoobeeCreativeMediaPage() {
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#advisor"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name} (64% of Yoobee students). ${PERSONAS['plan-b'].oneLine}`,
        testing: 'Whether outcomes evidence, switcher stories and a course finder speed up the decision for an adult with commitments, and whether a taster converts better than a brochure.',
        note: 'Speaks to an adult with a job, not a school leaver. The 84% figure appears once, with one meaning.',
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
                You were the one who drew, filmed or made things, then got steered somewhere sensible. Nineteen weeks, online or on campus, around the job
                you have now. With the numbers on what comes after.
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

        <Section id="finder" eyebrow="Start here" title="Find the right course for me" intro="Four questions. One suggested course, one alternative, and a person to talk it through with." tone="muted">
          <CourseFinder questions={cmFinderQuestions} courses={cmFinderCourses} advisor={cmAdvisor} talkHref="#advisor" />
        </Section>

        <Section id="outcomes" eyebrow="Does it pay?" title="Where graduates work and what they earn" intro="One figure, one meaning, one source. Employers and pay bands by role.">
          <OutcomesPanel stats={cmOutcomeStats} employers={cmEmployers} pay={cmPay} />
        </Section>

        <Section id="stories" eyebrow="Switcher stories" title="From the old job to the new one" intro="Pick what you do now and see who made the same move, and how long it took." tone="muted">
          <StoriesMatched prompt="Right now I am in..." filters={cmStoryFilters} stories={cmStories} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 pb-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Student work</p>
            <h2 id="work-title" className="font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              The standard you will reach in nineteen weeks
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground text-pretty">Real work from the last cohort, credited. Judge it yourself.</p>
          </div>
          <StudentWorkWall disciplines={['Design', 'Motion', 'Film']} works={cmWorks} />
        </section>

        <Section id="week" eyebrow="My week" title="Online or part-time, laid over a working week" intro="Choose how you would study and see the hours against a job." tone="muted">
          <WeekPlanner modes={cmPlannerModes} />
        </Section>

        <Section id="cost" eyebrow="Cost and funding" title="Is it free for me?" intro="Three questions. A straight answer, with the conditions shown rather than hidden behind an asterisk.">
          <InstantCheck
            title="Is it free for me?"
            intro={CM.fee}
            questions={cmFundingQuestions}
            resolve={resolveCmFunding}
            ctaLabel="Show my answer"
            placeholderNote="Fees Free rules as published for 2027, to be confirmed."
          />
        </Section>

        <Section id="taster" eyebrow="Try before you decide" title="A free taster lesson" intro="A real lesson from week two, for an email address only. Do it on a Sunday and see how it feels." tone="muted">
          <TasterLesson
            lesson="Typography and layout: a poster in ninety minutes"
            minutes={90}
            covers={['Hierarchy, grid and type pairing, the same way week two teaches it', 'The brief, the files and a worked example', 'Submit it if you like and get written feedback from a tutor']}
            tutor="Priya Nair, Creative Media tutor"
          />
        </Section>

        <Section id="next" eyebrow="What this leads to" title="Next courses" intro="The certificate is the entry point. Here is what it opens.">
          <PathwayPicture steps={cmNext} />
        </Section>

        <Section id="advisor" eyebrow="Talk to a course advisor" title="A named person who calls or emails back when you choose" intro="Not a sales team. Sam did this course at 28 and will tell you straight." tone="muted">
          <EnquiryForm
            title={`Talk to ${cmAdvisor.name}`}
            intro={cmAdvisor.line}
            routes={cmAdvisorRoutes}
            cta="Ask Sam to get in touch"
          />
          <p className="text-xs text-muted-foreground">
            <Placeholder /> Advisor, stories, employers and figures are placeholders until Yoobee supplies real ones.
          </p>
        </Section>
      </main>
    </PersonaShell>
  )
}
