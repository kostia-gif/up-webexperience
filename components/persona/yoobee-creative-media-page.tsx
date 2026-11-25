'use client'

import { CalendarClock, Play, Search, TrendingUp } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { CourseFinder } from '@/components/modules/course-finder'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { Callout, CostPlain, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { TasterLesson } from '@/components/modules/taster-lesson'
import { Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmBreakdown, cmFormal, cmLinks } from '@/lib/personas/data/compliance'
import { cmCostLines, cmPay, cmPhases } from '@/lib/personas/data/real-terms'
import { CM, cmAdvisor, cmAdvisorRoutes, cmEmployers, cmFinderCourses, cmFinderQuestions, cmNext, cmOutcomeStats, cmPay as cmPayBands, cmStories, cmWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PanelButton, SplitHero } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#like', "What it's like"],
  ['#journey', 'What you will make'],
  ['#work', 'Student work'],
  ['#outcomes', 'Jobs'],
  ['#finder', 'Which course'],
  ['#cost', 'Cost'],
  ['#taster', 'Try it'],
  ['#structure', 'Modules'],
  ['#formal', 'Details'],
]

export function YoobeeCreativeMediaPage() {
  const like = creativeMediaLevel4.like
  return (
    <PersonaShell
      brand="yoobee"
      applyHref="#advisor"
      applyLabel="Enrol"
      reviewer={{
        forWho: `${PERSONAS['plan-b'].name} (64% of Yoobee students). ${PERSONAS['plan-b'].oneLine}`,
        testing: 'Whether a readable page that shows what you make and what comes after, with a course finder and a taster as the call-outs, speeds up the decision for an adult with commitments.',
        note: 'Visual structure follows the original round. Three call-outs: course finder, taster, advisor form. The 84% figure appears once.',
      }}
      mainAction={{ label: 'Find the right course', href: '#finder' }}
    >
      <main className="pb-24 sm:pb-0">
        <SplitHero
          eyebrow="Creative media · Yoobee College of Creative Innovation"
          title="Turn your passion into a new path"
          titleLine={CM.title}
          sub="You were the one who drew, filmed or made things, then got steered somewhere sensible. Nineteen weeks, online or on campus, around the job you have now."
          image="/images/yoobee/hero-home-studio.png"
          imageAlt="A student at a kitchen table animating a 2D character on a laptop with a drawing tablet"
          actions={
            <>
              <PanelButton href="#finder" primary>
                <Search className="size-4" aria-hidden /> Find the right course
              </PanelButton>
              <PanelButton href="#taster">
                <Play className="size-4" aria-hidden /> Try a free lesson
              </PanelButton>
            </>
          }
          note={
            <>
              Not sure?{' '}
              <a href="#advisor" className="font-medium text-primary-foreground underline underline-offset-4 hover:no-underline">
                Talk it through with Sam, a course advisor
              </a>
            </>
          }
          cards={[
            {
              label: 'Total cost, 2027',
              value: '$0',
              tone: 'coral',
              placeholder: true,
              sub: 'Free for eligible domestic students under Fees Free. Otherwise $4,753 all-in.',
            },
            {
              label: 'Next start',
              value: '8 Feb 2027',
              icon: <CalendarClock className="size-4" aria-hidden />,
              sub: `${CM.weeks} weeks full-time or 38 part-time. Online, or Auckland, Wellington and Christchurch. You need to be 16+ with NCEA Level 2.`,
            },
            {
              label: 'In creative work or further study within six months',
              value: '84%',
              placeholder: true,
              icon: <TrendingUp className="size-4" aria-hidden />,
              sub: (
                <>
                  2025 graduates.{' '}
                  <a href="#outcomes" className="text-primary underline underline-offset-4">
                    Where graduates work
                  </a>
                </>
              ),
            },
          ]}
        />
        <InPageNav items={NAV} />

        <Section id="like" eyebrow="The course" title="What it's like">
          <WhatItsLike text={like.text} schedule={like.schedule} poster={like.videoPoster} caption={like.videoCaption} />
        </Section>

        <Section id="journey" eyebrow="Week by week" title="What you will be making" tone="muted">
          <WhatYouDo phases={cmPhases} />
        </Section>

        <section id="work" aria-labelledby="work-title" className="hairline-t scroll-mt-20 border-border py-8 md:py-12">
          <div className="mx-auto flex max-w-[960px] flex-col gap-1 px-6 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Student work</p>
            <h2 id="work-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              Work from the last class
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">Credited to the students who made it. This is the standard you will reach.</p>
          </div>
          <StudentWorkWall disciplines={[]} works={cmWorks} />
        </section>

        <Section id="outcomes" eyebrow="Outcomes" title="Where graduates work" tone="muted">
          <OutcomesPanel stats={cmOutcomeStats} employers={cmEmployers} pay={cmPayBands} />
        </Section>

        <Section id="stories" eyebrow="Graduates" title="People who switched">
          <StoryCards stories={cmStories.slice(0, 3)} />
        </Section>

        <Section id="finder" eyebrow="Not sure which course?" title="Find the right course" tone="muted">
          <Callout eyebrow="Course finder">
            <CourseFinder questions={cmFinderQuestions} courses={cmFinderCourses} advisor={cmAdvisor} talkHref="#advisor" />
          </Callout>
        </Section>

        <Section id="cost" eyebrow="Fees" title="What it costs">
          <CostPlain lines={cmCostLines} pay={cmPay} note="Fees Free conditions as published for 2027, to be confirmed." />
        </Section>

        <Section id="taster" eyebrow="Try it" title="A free lesson from week two" tone="muted">
          <Callout eyebrow="Free taster lesson">
            <TasterLesson
              lesson="Typography and layout: a poster in ninety minutes"
              minutes={90}
              covers={['Hierarchy, grid and type pairing, the way week two teaches it', 'The brief, the files and a worked example', 'Submit it if you like and get written feedback from a tutor']}
              tutor="Priya Nair, Creative Media tutor"
            />
          </Callout>
        </Section>

        <Section id="next" eyebrow="Pathway" title="Where this leads">
          <PathwayPicture steps={cmNext} />
        </Section>

        <Section id="advisor" eyebrow="Advisor" title="Talk to a course advisor" tone="muted">
          <Callout eyebrow="Talk to an advisor">
            <EnquiryForm title={`Talk to ${cmAdvisor.name}`} intro={cmAdvisor.line} routes={cmAdvisorRoutes} cta="Ask Sam to get in touch" />
          </Callout>
        </Section>

        <Section id="structure" eyebrow="Course structure" title={`4 modules, ${creativeMediaLevel4.formal.credits} credits, ${CM.weeks} weeks`}>
          <CourseBreakdown breakdown={cmBreakdown} />
        </Section>
        <section id="formal" aria-labelledby="formal-title" className="hairline-t scroll-mt-20 border-border bg-muted">
          <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-8 md:py-12">
            <FormalHeading />
            <FormalDetails rows={cmFormal} links={cmLinks} />
          </div>
        </section>
      </main>
    </PersonaShell>
  )
}
