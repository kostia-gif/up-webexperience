import type { Fact } from '@/components/modules/facts-strip'
import type { Route } from '@/components/modules/getting-to-campus'
import type { Answers, CheckQuestion, CheckResult } from '@/components/modules/instant-check'
import type { PathStep } from '@/components/modules/pathway-picture'
import type { SummaryLine } from '@/components/modules/send-summary'
import type { Session } from '@/components/modules/session-picker'
import type { IntakeOption } from '@/components/modules/start-and-enrol'
import type { Story } from '@/components/modules/stories-matched'
import type { Clip } from '@/components/modules/video-reel'
import type { PlannerMode } from '@/components/modules/week-planner'
import type { WantRow } from '@/components/modules/what-employers-look-for'
import type { GradEmployer } from '@/components/modules/where-graduates-went'

/** Facts supplied in the brief. Stated once here. */
export const FLIGHT = {
  title: 'New Zealand Certificate in Flight Attending (Level 4)',
  short: 'Level 4 Flight Attending',
  weeks: 16,
  fee: 5373.06,
  levy: 205,
  intakes: ['25 January 2027', '19 July 2027'],
  campuses: ['Auckland City', 'Auckland Airport', 'Wellington', 'Hamilton', 'Christchurch'],
  times: ['Morning classes', 'Afternoon classes'],
  level3: { title: 'Level 3 Tourism', weeks: 18 },
}

export const flightFacts: Fact[] = [
  { label: 'Level', value: 'Level 4, NZQA' },
  { label: 'Length', value: `${FLIGHT.weeks} weeks` },
  { label: 'Fee', value: `$${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} plus $${FLIGHT.levy} levy` },
  { label: 'Starts', value: FLIGHT.intakes.join(' and ') },
  { label: 'Campuses', value: FLIGHT.campuses.join(', ') },
  { label: 'Classes', value: 'Morning or afternoon' },
]

export const flightQuestions: CheckQuestion[] = [
  {
    id: 'age',
    label: 'How old are you?',
    options: [
      { id: 'u18', label: '16 or 17' },
      { id: '18', label: '18 or 19' },
      { id: '20', label: '20 or over' },
    ],
  },
  {
    id: 'ncea',
    label: 'School qualifications?',
    options: [
      { id: 'l3', label: 'NCEA Level 3 or higher' },
      { id: 'l2', label: 'NCEA Level 2' },
      { id: 'none', label: 'Left before Level 2' },
      { id: 'unsure', label: 'Not sure' },
    ],
  },
  {
    id: 'cx',
    label: 'Any customer-facing work?',
    options: [
      { id: 'yes', label: 'Yes, retail or hospo' },
      { id: 'some', label: 'A bit' },
      { id: 'no', label: 'Not yet' },
    ],
  },
]

export function resolveFlight(a: Answers): CheckResult {
  const qualifies = a.ncea === 'l3' || (a.ncea === 'l2' && a.age !== 'u18') || (a.age === '20' && a.cx === 'yes')
  if (qualifies) {
    return {
      tone: 'yes',
      headline: 'You meet the entry requirements.',
      body: `You can enrol in ${FLIGHT.short}. Choose a start date and campus below to enrol online.`,
      bullets: [
        a.cx === 'no' ? 'No customer service experience yet is fine. The course includes a service placement.' : 'Your customer service experience is an advantage. Airlines ask for it.',
        'Three things to arrange before you start: swim test, passport, security check. Details below.',
      ],
      action: { label: 'Choose a start date', href: '#start' },
      secondary: { label: 'Message us first', href: '#message' },
    }
  }
  return {
    tone: 'start',
    headline: 'Start with Level 3 Tourism.',
    body: `${FLIGHT.level3.title} leads directly into Flight Attending. ${FLIGHT.level3.weeks} weeks, then you meet the entry requirement for Level 4.`,
    bullets: [
      'No NCEA Level 3 needed. Entry is open from 16.',
      'Same campuses, same tutors, morning or afternoon classes around a job.',
      'Fees Free covers it for most first-time tertiary students.',
    ],
    action: { label: 'See the pathway', href: '#pathway' },
    secondary: { label: 'Message us', href: '#message' },
  }
}

export const flightWants: WantRow[] = [
  { want: 'Composure under pressure', covered: 'Weekly cabin simulator sessions: turbulence, an unwell passenger, a delayed boarding. Assessed on composure as well as procedure.' },
  { want: 'Safety and emergency procedures', covered: 'Evacuation, fire, first aid and ditching in the simulator and the pool. A current first aid certificate is part of the course.' },
  { want: 'Customer service experience', covered: 'A service placement with an airline partner, airport lounge or hotel, counted as experience on your CV.' },
  { want: 'Grooming and presentation to airline standard', covered: 'Uniform standards, grooming workshops and a graduation photoshoot you can use for applications.' },
  { want: 'Interview and group-assessment performance', covered: 'Three mock recruitment days run the way airlines run them, with feedback from ex-recruiters.' },
  { want: 'Swim test, passport, security clearance', covered: 'Explained on day one. We book the swim test and guide you through the Aviation Security application.' },
]

export const flightAirlines: GradEmployer[] = [
  { employer: 'Air New Zealand', kind: 'Domestic and international', grads: [{ name: 'Mia T.', role: 'Cabin crew, domestic', year: 2025 }, { name: 'Josh R.', role: 'Cabin crew, Pacific', year: 2024 }] },
  { employer: 'Jetstar', kind: 'Trans-Tasman', grads: [{ name: 'Ana F.', role: 'Cabin crew', year: 2025 }] },
  { employer: 'Qantas', kind: 'Based in Sydney', grads: [{ name: 'Tyrese M.', role: 'Cabin crew, international', year: 2024 }] },
  { employer: 'Emirates', kind: 'Based in Dubai', grads: [{ name: 'Priya S.', role: 'Cabin crew', year: 2023 }] },
  { employer: 'Fiji Airways', kind: 'Based in Nadi', grads: [{ name: 'Sala V.', role: 'Cabin crew', year: 2025 }] },
  { employer: 'Auckland Airport', kind: 'Ground and lounge roles while you wait for a cabin intake', grads: [{ name: 'Kahu W.', role: 'Lounge host', year: 2025 }] },
]

export const flightClips: Clip[] = [
  { id: 'c1', name: 'Mia, 20', employer: 'Air New Zealand', caption: 'First week in uniform. Still not over it.', tone: 'bg-primary' },
  { id: 'c2', name: 'Josh, 21', employer: 'Air New Zealand', caption: 'Rarotonga layover. This was a Tuesday.', tone: 'bg-coral' },
  { id: 'c3', name: 'Ana, 19', employer: 'Jetstar', caption: 'Graduated in June, flying by October.', tone: 'bg-primary-hover' },
  { id: 'c4', name: 'Tyrese, 22', employer: 'Qantas', caption: 'Moved to Sydney for it. Zero regrets.', tone: 'bg-foreground' },
  { id: 'c5', name: 'Sala, 20', employer: 'Fiji Airways', caption: 'Left school at 16. Did Level 3 first. Now this.', tone: 'bg-primary-tint-foreground' },
  { id: 'c6', name: 'Priya, 24', employer: 'Emirates', caption: 'Dubai base. Forty cities a year.', tone: 'bg-coral-hover' },
]

export const flightPathway: PathStep[] = [
  { label: 'Step 1, if you need it', title: FLIGHT.level3.title, time: `${FLIGHT.level3.weeks} weeks`, detail: 'For students without NCEA Level 3. Customer service skills and confidence, and entry to Flight Attending on completion.' },
  { label: 'Step 2', title: FLIGHT.short, time: `${FLIGHT.weeks} weeks`, detail: 'Safety, service, grooming and three mock recruitment days. This course.', current: true, href: '#facts' },
  { label: 'Step 3', title: 'Airline recruitment', time: 'After the course', detail: 'Airline recruitment, with recruiters on campus in the final fortnight. Time to first flying role: placeholder until UP supplies graduate data.' },
]

export const flightStoryFilters = [
  { id: 'early', label: 'I left school early' },
  { id: 'nol3', label: 'No Level 3' },
  { id: 'hospo', label: 'Working in hospo or retail' },
]

export const flightStories: Story[] = [
  { id: 'sala', name: 'Sala', age: 20, from: 'Left school at 16', now: 'Cabin crew, Fiji Airways', took: 'Level 3, then Flight. 34 weeks all up', quote: 'I thought the course was for the confident girls. Turns out the course is where you get confident.', filter: 'early' },
  { id: 'kahu', name: 'Kahu', age: 19, from: 'Finished Year 13 without Level 3', now: 'Lounge host, Auckland Airport, applying for cabin crew', took: 'Level 3 then Flight', quote: 'The careers bus brought us to the Airport campus. I signed up for Level 3 that day. Nobody made it a big deal that I did not have the credits.', filter: 'nol3' },
  { id: 'ana', name: 'Ana', age: 19, from: 'Two years at a cafe', now: 'Cabin crew, Jetstar', took: '16 weeks, then four months to a job', quote: 'Cafe work got me in and got me through the recruitment day. They care about how you handle a grumpy customer, not your grades.', filter: 'hospo' },
  { id: 'tai', name: 'Tai', age: 23, from: 'Supermarket, five years', now: 'Flight student, Wellington', took: 'Starting Level 3 in January', quote: 'I was the oldest in my info session and the most nervous. The tutor texted me that night. That is why I enrolled.', filter: 'hospo' },
]

export const flightTimetable: PlannerMode[] = [
  {
    id: 'morning',
    label: 'Morning classes',
    hours: '9am to 1pm, Monday to Thursday, plus one practical afternoon',
    note: 'Leaves afternoons and evenings for a job. Friday is yours.',
    blocks: [
      { day: 0, start: 9, end: 13, kind: 'live' },
      { day: 1, start: 9, end: 13, kind: 'live' },
      { day: 2, start: 9, end: 13, kind: 'live' },
      { day: 3, start: 9, end: 13, kind: 'live' },
      { day: 2, start: 14, end: 16, kind: 'study' },
      { day: 0, start: 16, end: 22, kind: 'work' },
      { day: 1, start: 16, end: 22, kind: 'work' },
      { day: 3, start: 16, end: 22, kind: 'work' },
      { day: 5, start: 10, end: 18, kind: 'work' },
    ],
  },
  {
    id: 'afternoon',
    label: 'Afternoon classes',
    hours: '1pm to 5pm, Monday to Thursday, plus one practical morning',
    note: 'Keeps mornings free for an early shift or the school run.',
    blocks: [
      { day: 0, start: 13, end: 17, kind: 'live' },
      { day: 1, start: 13, end: 17, kind: 'live' },
      { day: 2, start: 13, end: 17, kind: 'live' },
      { day: 3, start: 13, end: 17, kind: 'live' },
      { day: 2, start: 9, end: 11, kind: 'study' },
      { day: 0, start: 6, end: 11, kind: 'work' },
      { day: 1, start: 6, end: 11, kind: 'work' },
      { day: 4, start: 6, end: 14, kind: 'work' },
      { day: 6, start: 10, end: 16, kind: 'work' },
    ],
  },
]

export const flightRoutes: Route[] = [
  { suburb: 'Manurewa', campus: 'Auckland Airport', mode: 'bus', line: 'Bus 33 to Papatoetoe, then AirportLink', mins: 38, weekly: 26, changes: 1 },
  { suburb: 'Mangere', campus: 'Auckland Airport', mode: 'bus', line: 'Bus 380 direct', mins: 22, weekly: 18, changes: 0 },
  { suburb: 'Henderson', campus: 'Auckland City', mode: 'train', line: 'Western Line to Britomart', mins: 41, weekly: 30, changes: 0 },
  { suburb: 'Papakura', campus: 'Auckland City', mode: 'train', line: 'Southern Line to Britomart', mins: 52, weekly: 34, changes: 0 },
  { suburb: 'Porirua', campus: 'Wellington', mode: 'train', line: 'Kapiti Line to Wellington', mins: 24, weekly: 28, changes: 0 },
  { suburb: 'Lower Hutt', campus: 'Wellington', mode: 'train', line: 'Hutt Valley Line to Wellington', mins: 21, weekly: 26, changes: 0 },
  { suburb: 'Huntly', campus: 'Hamilton', mode: 'bus', line: 'Bus 23 to Hamilton Transport Centre', mins: 45, weekly: 30, changes: 0 },
  { suburb: 'Hornby', campus: 'Christchurch', mode: 'bus', line: 'Bus 5 Orbiter to City', mins: 32, weekly: 20, changes: 0 },
  { suburb: 'Linwood', campus: 'Christchurch', mode: 'bus', line: 'Bus 60 to City', mins: 14, weekly: 20, changes: 0 },
]

export const flightDropIns: Session[] = [
  { id: 'd1', date: 'Sat 12 Dec 2026', time: '10am to 1pm', where: 'Auckland Airport campus' },
  { id: 'd2', date: 'Wed 16 Dec 2026', time: '4pm to 6pm', where: 'Wellington campus' },
  { id: 'd3', date: 'Sat 16 Jan 2027', time: '10am to 1pm', where: 'All five campuses' },
]

export const flightIntakes: IntakeOption[] = FLIGHT.intakes.map((d, i) => ({ id: `f${i}`, date: d, label: i === 0 ? 'Summer start' : 'Winter start' }))

export const flightFamilySummary: SummaryLine[] = [
  { label: 'Course', value: `${FLIGHT.short}, NZQA` },
  { label: 'Length', value: `${FLIGHT.weeks} weeks, Mon to Thu` },
  { label: 'Cost', value: `$${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} plus $${FLIGHT.levy} levy. Fees Free for most first-time students` },
  { label: 'Starts', value: FLIGHT.intakes.join(' or ') },
  { label: 'Where graduates work', value: 'Air NZ, Jetstar, Qantas, Emirates, Fiji Airways' },
  { label: 'Support', value: 'Named tutor, learner support, help with StudyLink' },
]

export const flightUpFront = [
  { h: 'Swim test', b: 'Airlines require it. You swim 50 metres and tread water for a few minutes. We book it in week two and run practice sessions if you need them.' },
  { h: 'Passport', b: 'You need one to fly, and recruiters ask for it. Apply in week one if you do not have one. It takes about three weeks.' },
  { h: 'Security check', b: 'An Aviation Security clearance. Some past convictions matter and some do not. Ask us before you enrol if you are unsure, and we will tell you straight.' },
]
