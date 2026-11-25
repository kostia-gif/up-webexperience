'use client'

import { Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { AccreditationPanel } from '@/components/modules/accreditation-panel'
import { BookingSlots } from '@/components/modules/booking-slots'
import { ChatNow } from '@/components/modules/chat-now'
import { CompareTable } from '@/components/modules/compare-table'
import { CostCalculator } from '@/components/modules/cost-calculator'
import { CourseFinder } from '@/components/modules/course-finder'
import { EnquiryForm } from '@/components/modules/enquiry-form'
import { FactsStrip } from '@/components/modules/facts-strip'
import { GettingToCampus } from '@/components/modules/getting-to-campus'
import { InstantCheck, type Answers, type CheckResult } from '@/components/modules/instant-check'
import { MessageUs } from '@/components/modules/message-us'
import { OutcomesPanel } from '@/components/modules/outcomes-panel'
import { PathwayPicture } from '@/components/modules/pathway-picture'
import { PeopleCards } from '@/components/modules/people-cards'
import { RoutingQuestion } from '@/components/modules/routing-question'
import { SendSummary } from '@/components/modules/send-summary'
import { SpecialismExplorer } from '@/components/modules/specialism-explorer'
import { StartAndEnrol } from '@/components/modules/start-and-enrol'
import { StoriesMatched } from '@/components/modules/stories-matched'
import { StudentWorkWall } from '@/components/modules/student-work-wall'
import { TasterLesson } from '@/components/modules/taster-lesson'
import { TextMeBack } from '@/components/modules/text-me-back'
import { VideoReel } from '@/components/modules/video-reel'
import { WeekPlanner } from '@/components/modules/week-planner'
import { WhatEmployersLookFor } from '@/components/modules/what-employers-look-for'
import { WhereGraduatesWent } from '@/components/modules/where-graduates-went'
import * as A from '@/lib/personas/data/aipc'
import * as N from '@/lib/personas/data/nzst'
import * as Y from '@/lib/personas/data/yoobee'
import type { BrandKey } from '@/lib/personas/registry'

function IdeaCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-muted p-5 text-sm text-muted-foreground">
      <Lightbulb className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p className="leading-relaxed text-pretty">{text}</p>
    </div>
  )
}

function RoutingDemo({ brand }: { brand: BrandKey }) {
  const opts = {
    aipc: [
      { id: 'new', label: 'I am new to counselling', hint: 'Changing from another career' },
      { id: 'field', label: 'I already work in the field', hint: 'Youth, support or community work' },
    ],
    yoobee: [
      { id: 'school', label: 'Finishing school' },
      { id: 'working', label: 'Working or studying something else' },
      { id: 'parent', label: 'A parent' },
    ],
    nzst: [
      { id: 'ready', label: 'Ready to be cabin crew' },
      { id: 'nol3', label: 'No Level 3 yet' },
      { id: 'family', label: 'Family or whānau' },
    ],
  }[brand]
  const [v, setV] = useState(opts[0].id)
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <RoutingQuestion question="Which sounds most like you?" options={opts} value={v} onChange={setV} />
      <p className="mt-3 text-xs text-muted-foreground">Selected: {opts.find((o) => o.id === v)?.label}. On a school page this switches the hero, main action and follow-up.</p>
    </div>
  )
}

function resolveYoobeeEntry(a: Answers): CheckResult {
  const ok = a.age !== 'u16'
  return ok
    ? { tone: 'yes', headline: "You're in.", body: 'The Certificate in Creative Media takes you from 16 with NCEA Level 1 literacy and numeracy, or with a short chat about your work. Pick a start date.', action: { label: 'Pick a start date', href: '#' } }
    : { tone: 'start', headline: 'Start here: the holiday programme.', body: 'You can join a holiday programme now and enrol the term you turn 16. Your place is held.', action: { label: 'See holiday programmes', href: '#' } }
}

function resolveNzstFunding(a: Answers): CheckResult {
  if (a.first === 'yes') return { tone: 'yes', headline: 'Fees Free should cover it.', body: 'First year of tertiary study, New Zealand resident. Tuition and levy covered. A tutor does the forms with you in week one.', bullets: [a.situation === 'working' ? 'Keep your job: morning or afternoon classes.' : 'StudyLink living costs are likely available too.'], action: { label: 'Can I get in?', href: '#' } }
  return { tone: 'start', headline: 'Likely help available. Here is who sorts it.', body: 'If Fees Free is used up, a student loan covers the fee and StudyLink may cover living costs. Aroha checks your entitlement in a day.', action: { label: 'Text me back', href: '#' } }
}

export function ModuleDemo({ slug, brand }: { slug: string; brand: BrandKey }) {
  switch (slug) {
    case 'instant-check':
      return brand === 'nzst' ? (
        <InstantCheck title="Can I get in?" questions={N.flightQuestions} resolve={N.resolveFlight} ctaLabel="Tell me" placeholderNote={null} />
      ) : (
        <InstantCheck
          title="Am I in?"
          questions={[
            { id: 'age', label: 'How old are you?', options: [{ id: 'u16', label: 'Under 16' }, { id: '16', label: '16 to 19' }, { id: '20', label: '20 or over' }] },
            { id: 'work', label: 'Got some work to show?', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'Not yet' }] },
          ]}
          resolve={resolveYoobeeEntry}
        />
      )
    case 'credit-checker':
      return <InstantCheck title="How much could you skip?" questions={A.aipcCreditQuestions} resolve={A.resolveCredit} ctaLabel="Show my credit" />
    case 'cost-and-funding-checker':
      return brand === 'nzst' ? (
        <InstantCheck
          title="What help can I get?"
          questions={[
            { id: 'first', label: 'First time studying after school?', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] },
            { id: 'situation', label: 'Right now you are...', options: [{ id: 'school', label: 'At school' }, { id: 'working', label: 'Working' }, { id: 'neither', label: 'Neither' }] },
          ]}
          resolve={resolveNzstFunding}
        />
      ) : (
        <InstantCheck title="Is it free for me?" intro={Y.CM.fee} questions={Y.cmFundingQuestions} resolve={Y.resolveCmFunding} />
      )
    case 'full-cost-calculator':
      return <CostCalculator versions={A.aipcCostVersions} extras={A.aipcCostExtras} currency="AUD" feeHelpNote={A.AIPC_COURSE.feeHelpWho} />
    case 'course-finder':
      return <CourseFinder questions={Y.cmFinderQuestions} courses={Y.cmFinderCourses} advisor={Y.cmAdvisor} talkHref="#" />
    case 'routing-question':
      return <RoutingDemo brand={brand} />
    case 'people-cards':
      return brand === 'aipc' ? <PeopleCards people={A.aipcTutors} /> : <PeopleCards people={Y.animTutors} />
    case 'stories-matched':
      return brand === 'aipc' ? (
        <StoriesMatched prompt="Before counselling, I was..." filters={A.aipcStoryFilters} stories={A.aipcStories} />
      ) : brand === 'yoobee' ? (
        <StoriesMatched prompt="Right now I am in..." filters={Y.cmStoryFilters} stories={Y.cmStories} />
      ) : (
        <StoriesMatched prompt="People like me" filters={N.flightStoryFilters} stories={N.flightStories} />
      )
    case 'outcomes-panel':
      return brand === 'aipc' ? (
        <OutcomesPanel stats={A.aipcOutcomeStats} employers={A.aipcEmployers} pay={A.aipcPay} />
      ) : (
        <OutcomesPanel stats={Y.cmOutcomeStats} employers={Y.cmEmployers} pay={Y.cmPay} />
      )
    case 'where-graduates-went':
      return brand === 'nzst' ? <WhereGraduatesWent employers={N.flightAirlines} /> : <WhereGraduatesWent employers={Y.animWhereWent} />
    case 'accreditation-panel':
      return <AccreditationPanel items={A.aipcAccreditations} />
    case 'compare-with-university':
      return brand === 'aipc' ? (
        <CompareTable rows={A.aipcCompare} usLabel="AIPC Master of Counselling" themLabel="University Master of Counselling" note={A.aipcCompareNote} />
      ) : (
        <CompareTable
          rows={[
            { label: 'Length', us: '19 weeks', them: '3 years' },
            { label: 'Cost', us: 'Fees Free or $4,753', them: '$7,000 to $9,000 a year' },
            { label: 'Entry', us: '16+, NCEA Level 2', them: 'University Entrance' },
            { label: 'Around a job', us: 'Online, part-time option', them: 'Mostly on campus, daytime' },
            { label: 'Leads to', us: 'Diploma with credit, or work', them: 'Degree' },
          ]}
          usLabel="Yoobee Certificate in Creative Media"
          themLabel="University design degree"
          note="University figures are indicative 2026 domestic fees, pending sourced data."
        />
      )
    case 'what-employers-look-for':
      return <WhatEmployersLookFor rows={N.flightWants} who="airline recruiters" />
    case 'student-work-wall':
      return <StudentWorkWall disciplines={Y.animDisciplines} works={Y.animWorks} />
    case 'graduate-video-reel':
      return brand === 'nzst' ? (
        <VideoReel clips={N.flightClips} />
      ) : (
        <VideoReel
          clips={[
            { id: 'y1', name: 'Hemi, 21', employer: 'Weta FX', caption: 'Creature rig for a film I cannot name yet.', tone: 'bg-primary' },
            { id: 'y2', name: 'Ava, 22', employer: 'Weta FX', caption: 'Environment TD. Started with a flooded Queen St.', tone: 'bg-coral' },
            { id: 'y3', name: 'Noah, 20', employer: 'Mukpuddy', caption: '2D animator. Walk cycles all day and I love it.', tone: 'bg-foreground' },
            { id: 'y4', name: 'Ruby, 20', employer: 'Freelance', caption: 'VTuber rigs and Twitch emotes. Paying my rent.', tone: 'bg-primary-hover' },
          ]}
        />
      )
    case 'facts-strip':
      return <FactsStrip id="demo-facts" facts={brand === 'aipc' ? A.aipcFacts : brand === 'yoobee' ? Y.cmFacts : N.flightFacts} />
    case 'week-planner':
      return <WeekPlanner modes={brand === 'aipc' ? [...A.aipcPlannerModes, ...A.aipcShiftModes] : brand === 'yoobee' ? Y.cmPlannerModes : N.flightTimetable} />
    case 'pathway-picture':
      return <PathwayPicture steps={brand === 'aipc' ? A.aipcPathway : N.flightPathway} />
    case 'specialism-explorer':
      return <SpecialismExplorer specialisms={Y.animSpecialisms} />
    case 'getting-to-campus':
      return <GettingToCampus routes={N.flightRoutes} />
    case 'is-this-right-for-me':
      return <IdeaCard text="Idea, not built. A short guided reflection for Sarah: what draws you to counselling, what you would give up, what a good first year looks like. Ends with a suggested entry point and an optional tutor conversation. Not a quiz." />
    case 'booking-slots':
      return (
        <div className="rounded-xl border border-border bg-card p-5">
          <BookingSlots
            days={brand === 'aipc' ? A.aipcTutors[0].slots! : brand === 'yoobee' ? Y.animVisitSlots : [{ day: 'Sat 12 Dec', times: ['10:00', '11:00', '12:00'] }, { day: 'Wed 16 Dec', times: ['16:00', '17:00'] }]}
            what={brand === 'aipc' ? 'a 20-minute conversation' : brand === 'yoobee' ? 'a campus visit' : 'a drop-in day'}
            withWho={brand === 'aipc' ? A.aipcTutors[0].name : undefined}
          />
        </div>
      )
    case 'free-taster-lesson':
      return <TasterLesson lesson="Typography and layout: a poster in ninety minutes" minutes={90} covers={['Hierarchy, grid and type pairing', 'The brief and a worked example', 'Optional written feedback from a tutor']} tutor="Priya Nair, Creative Media tutor" />
    case 'start-date-and-enrol':
      return brand === 'nzst' ? (
        <StartAndEnrol intakes={N.flightIntakes} campuses={N.FLIGHT.campuses} times={N.FLIGHT.times} cta="Enrol now" confirm="Aroha will text you within the hour with the three things to sort before day one." />
      ) : (
        <StartAndEnrol intakes={A.aipcIntakes} cta="Enrol online" confirm="A confirmation is on its way with the credit assessment and FEE-HELP forms." />
      )
    case 'send-a-summary':
      return brand === 'aipc' ? (
        <SendSummary to="your employer" title="Master of Counselling, AIPC" intro="For a manager considering study support." lines={A.aipcEmployerSummary} />
      ) : brand === 'yoobee' ? (
        <SendSummary to="a parent" title="Diploma in Animation, Yoobee" intro="For a parent or caregiver." lines={Y.animParentSummary} />
      ) : (
        <SendSummary to="your family" title="Level 4 Flight Attending, NZST" intro="For family." lines={N.flightFamilySummary} />
      )
    case 'message-us':
      return <MessageUs who="Aroha, Flight tutor" hours="8am to 8pm, seven days" />
    case 'chat-now':
      return brand === 'aipc' ? (
        <ChatNow canned={A.aipcChat} person="Daniel Okafor" />
      ) : (
        <ChatNow
          canned={[
            { q: 'Is it really free?', a: 'For eligible domestic students in their first year of tertiary study, yes: tuition, levy and software. Otherwise $4,753 all-in.' },
            { q: 'Can I keep my job?', a: 'Yes. The online part-time option is about 10 hours a week over 38 weeks, with the live crit recorded.' },
            { q: 'Do I need a portfolio?', a: 'No. Bring anything you have made, or nothing. The course builds the portfolio.' },
            { q: 'What comes after?', a: 'A Level 5 diploma with credit, or junior work. Most Plan B graduates go to work first.' },
          ]}
          person="Sam"
        />
      )
    case 'text-me-back':
      return <TextMeBack person="Aroha Ngata" role="Flight Attending tutor, Auckland Airport" />
    case 'what-happens-next':
      return brand === 'aipc' ? (
        <EnquiryForm title="Download the course guide" intro="The confirmation and the next three messages change with your answer." routes={A.aipcGuideRoutes} cta="Send me the guide" emailOnly />
      ) : brand === 'yoobee' ? (
        <EnquiryForm title="Talk to Sam" intro="The confirmation and the next three messages change with your answer." routes={Y.cmAdvisorRoutes} cta="Ask Sam to get in touch" />
      ) : (
        <EnquiryForm
          title="Get in touch"
          intro="The confirmation and the next three messages change with your answer."
          routes={[
            { id: 'ready', label: 'Ready to be cabin crew', confirmation: 'Aroha will text you within ten minutes with the next start date and the three things to sort before day one.', next: ['Within 10 minutes: a text from Aroha.', 'Tomorrow: the Fees Free form, pre-filled.', 'A week before the start: what to bring.'] },
            { id: 'nol3', label: 'No Level 3 yet', confirmation: 'Aroha will text you within ten minutes about Level 3 Tourism, which is step one of the same journey. No one will ask about your grades.', next: ['Within 10 minutes: a text from Aroha.', 'This week: a drop-in day invite, bring someone.', 'Then: nothing unless you reply.'] },
            { id: 'family', label: 'Family or whānau', confirmation: 'A one-page summary with the cost, dates and where graduates work is on its way. Aroha can call if you want her to.', next: ['Today: the family summary as a PDF.', 'A call only if you ask.', 'Nothing else.'] },
          ]}
          cta="Send"
        />
      )
    default:
      return <IdeaCard text="No demo for this module yet." />
  }
}
