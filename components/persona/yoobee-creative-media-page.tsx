'use client'

import { CalendarClock, MessageCircle, Play, TrendingUp } from 'lucide-react'
import { InPageNav } from '@/components/course/above-fold'
import { CourseBreakdown, FormalDetails, FormalHeading } from '@/components/modules/compliance'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { CourseOutcomes, WaysToPay, WhyThisCourse } from '@/components/modules/framing'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { Callout, StoryCards, WhatItsLike, WhatYouDo } from '@/components/modules/real-terms'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { TasterLesson } from '@/components/modules/taster-lesson'
import { Section } from '@/components/modules/ui'
import { creativeMediaLevel4 } from '@/lib/courses'
import { cmBreakdown, cmFormal, cmLinks } from '@/lib/personas/data/compliance'
import { cmAdvisorRoute, cmOutcomes, cmReasons, cmWays } from '@/lib/personas/data/framing'
import { cmPhases } from '@/lib/personas/data/real-terms'
import { CM, cmAdvisor, cmEmployers, cmNext, cmOutcomeStats, cmPay as cmPayBands, cmStories, cmWorks } from '@/lib/personas/data/yoobee'
import { PERSONAS } from '@/lib/personas/registry'
import { PanelButton, SplitHero } from './billboard'
import { PersonaShell } from './shell'

const NAV: [string, string][] = [
  ['#outcomes-card', 'Outcomes'],
  ['#like', "What it's like"],
  ['#journey', 'What you will make'],
  ['#work', 'Student work'],
  ['#why', 'Why this course'],
  ['#cost', 'Fees'],
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
        testing: 'Whether a readable course page framed around outcomes and "why this course", with a free taster as the main action, speeds up the decision for an adult with commitments.',
        note: 'Two call-outs: taster lesson and advisor form. Course choice belongs on the course listing, not here.',
      }}
      mainAction={{ label: 'Try a free lesson', href: '#taster' }}
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
              <PanelButton href="#taster" primary>
                <Play className="size-4" aria-hidden /> Try a free lesson
              </PanelButton>
              <PanelButton href="#advisor">
                <MessageCircle className="size-4" aria-hidden /> Talk to an advisor
              </PanelButton>
            </>
          }
          cards={[
            { label: 'Fee, 2027', value: '$0', tone: 'coral', placeholder: true, sub: 'Free for eligible domestic students under Fees Free. Otherwise $4,753, with split payments available.' },
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

        <CourseOutcomes headline="Make a living from what you make" image="/images/yoobee/mc-design.png" imageAlt="A student reviewing a poster layout on screen" outcomes={cmOutcomes} />

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

        <Section id="why" eyebrow="Why this course" title="Why Yoobee" tone="muted">
          <WhyThisCourse reasons={cmReasons} />
        </Section>

        <Section id="outcomes" eyebrow="Why this course" title="Where graduates work">
          <OutcomesPanel stats={cmOutcomeStats} employers={cmEmployers} pay={cmPayBands} />
        </Section>

        <Section id="stories" eyebrow="Why this course" title="People who switched" tone="muted">
          <StoryCards stories={cmStories.slice(0, 3)} />
        </Section>

        <Section id="cost" eyebrow="Fees" title="Fees and ways to pay">
          <WaysToPay fee="$0" feeNote="For eligible domestic students under Fees Free in 2027. Otherwise $4,753, which covers tuition, levy and software with nothing added later." ways={cmWays} note="Fees Free conditions as published for 2027, to be confirmed." />
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
            <EnquiryForm title={`Talk to ${cmAdvisor.name}`} intro={cmAdvisor.line} routes={cmAdvisorRoute} cta="Ask Sam to get in touch" />
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
