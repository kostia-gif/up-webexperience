import type { Accreditation } from '@/components/modules/accreditation-panel'
import type { CannedAnswer } from '@/components/modules/chat-now'
import type { CompareRow } from '@/components/modules/compare-table'
import type { CostExtra, CostVersion } from '@/components/modules/cost-calculator'
import type { EnquiryRoute } from '@/components/modules/enquiry-form'
import type { Fact } from '@/components/modules/facts-strip'
import type { Answers, CheckQuestion, CheckResult } from '@/components/modules/instant-check'
import type { OutcomeStat, PayRow } from '@/components/modules/outcomes-panel'
import type { PathStep } from '@/components/modules/pathway-picture'
import type { Person } from '@/components/modules/people-cards'
import type { SummaryLine } from '@/components/modules/send-summary'
import type { Session } from '@/components/modules/session-picker'
import type { IntakeOption } from '@/components/modules/start-and-enrol'
import type { Story } from '@/components/modules/stories-matched'
import type { PlannerMode } from '@/components/modules/week-planner'

/** 2027 structure. Stated once here and read everywhere else. */
export const AIPC_COURSE = {
  title: 'Master of Counselling',
  standard: { label: 'Master of Counselling', months: 18, subjects: 10, tuition: 34650, trimesters: 3 },
  advanced: { label: 'Master of Counselling Advanced', months: 24, subjects: 14, tuition: 47250, trimesters: 4 },
  placementHours: 200,
  directClientHours: 40,
  workshopDays: 5,
  workshopCities: ['Brisbane', 'Sydney', 'Melbourne', 'Perth'],
  feeHelpWho: 'FEE-HELP is open to Australian citizens, permanent humanitarian visa holders and eligible New Zealand citizens on a Special Category Visa.',
  intakes: ['1 March 2027', '10 May 2027', '19 July 2027', '1 November 2027'],
}

export const aipcFacts: Fact[] = [
  { label: 'Accreditation', value: 'ACA accredited' },
  { label: 'Study mode', value: 'Online, with 5 in-person practical workshop days' },
  { label: 'Length', value: '18 months (10 subjects) or 24 months Advanced (14 subjects)' },
  { label: 'Tuition', value: '$34,650 or $47,250 Advanced', placeholder: true },
  { label: 'Payment', value: 'FEE-HELP, per trimester, or a mix' },
  { label: 'Placement', value: '200 hours, at least 40 with clients' },
]

export const aipcAccreditations: Accreditation[] = [
  {
    body: 'Australian Counselling Association',
    short: 'ACA accredited course',
    what: 'The ACA accredits the course itself, not just the provider. That is checked every few years.',
    lets: 'Join the ACA register at Level 2 on graduation, use the title Registered Counsellor, and work with Medicare-linked and EAP providers that require it.',
  },
  {
    body: 'TEQSA',
    short: 'Registered higher education provider',
    what: 'AIPC is registered with the national regulator for universities and higher education providers.',
    lets: 'Your degree sits at AQF Level 9, the same level as a university master\u2019s degree.',
  },
  {
    body: 'Australian Government',
    short: 'FEE-HELP approved',
    what: 'Eligible students can defer all tuition through the Commonwealth loan scheme and repay through tax once earning above the threshold.',
    lets: AIPC_COURSE.feeHelpWho,
  },
]

export const aipcTutors: Person[] = [
  {
    id: 'helen',
    name: 'Dr Helen Whitmore',
    role: 'Program Director and practising counsellor',
    background: 'Thirty years in community mental health and private practice. Still sees clients two days a week. Supervises placement students.',
    photo: '/images/aipc/program-director.png',
    video: true,
    slots: [
      { day: 'Tue 2 Feb', times: ['12:00', '18:30', '19:00'] },
      { day: 'Wed 3 Feb', times: ['12:30', '17:30'] },
      { day: 'Thu 4 Feb', times: ['08:30', '19:00', '19:30'] },
    ],
  },
  {
    id: 'daniel',
    name: 'Daniel Okafor',
    role: 'Senior lecturer, youth and family counselling',
    background: 'Former youth worker who retrained at 31. Twelve years at headspace and in school wellbeing before teaching. Knows the frontline route well.',
    photo: '/images/advisors/aipc-daniel.png',
    video: true,
    slots: [
      { day: 'Tue 2 Feb', times: ['17:00', '18:00'] },
      { day: 'Wed 3 Feb', times: ['12:00', '12:30', '18:00'] },
      { day: 'Fri 5 Feb', times: ['09:00', '13:00'] },
    ],
  },
  {
    id: 'megan',
    name: 'Megan Hart',
    role: 'Lecturer, relationship counselling, private practice',
    background: 'Was an HR manager for fifteen years before counselling. Runs a relationship practice in Melbourne and teaches the placement units.',
    photo: '/images/advisors/aipc-megan.png',
    video: true,
    slots: [
      { day: 'Tue 2 Feb', times: ['19:00', '19:30'] },
      { day: 'Thu 4 Feb', times: ['12:00', '18:30'] },
      { day: 'Sat 6 Feb', times: ['09:00', '09:30', '10:00'] },
    ],
  },
]

export const aipcTeachers: Person[] = [
  { id: 't1', name: 'Dr Priya Raman', role: 'Senior lecturer, counselling theory and ethics', background: 'Twenty years in private practice and community health. Teaches the foundation subjects and supervises placements in Melbourne.', photo: '/images/advisors/aipc-sophie.png' },
  { id: 't2', name: 'Tom Ngata', role: 'Lecturer, trauma and crisis counselling', background: 'Fifteen years at Lifeline and in regional mental health services. Teaches the crisis and trauma electives.' },
  { id: 't3', name: 'Dr Sarah Lindqvist', role: 'Lecturer, family and relationship counselling', background: 'Family therapist in Brisbane for eighteen years. Leads the practical workshops.' },
]

export const aipcSessions: Session[] = [
  { id: 's1', date: 'Tue 2 Feb 2027', time: '7:00pm AEDT', where: 'Online, 45 minutes', left: 18 },
  { id: 's2', date: 'Thu 11 Feb 2027', time: '12:30pm AEDT', where: 'Online, 45 minutes', left: 24 },
  { id: 's3', date: 'Wed 24 Feb 2027', time: '7:00pm AEDT', where: 'Online, 45 minutes', left: 30 },
]

const work9to5 = [0, 1, 2, 3, 4].map((day) => ({ day, start: 9, end: 17, kind: 'work' as const }))

export const aipcPlannerModes: PlannerMode[] = [
  {
    id: 'part-time',
    label: 'Part-time, around a full-time job',
    hours: 'About 12 to 15 hours a week, two subjects a trimester',
    note: 'Two evenings, a Saturday morning and one live tutorial a week. Most students in their forties study this way. You can switch to full-time between trimesters.',
    blocks: [
      ...work9to5,
      { day: 1, start: 19, end: 21, kind: 'study' },
      { day: 2, start: 19, end: 20.5, kind: 'live' },
      { day: 3, start: 19, end: 21, kind: 'study' },
      { day: 5, start: 9, end: 13, kind: 'study' },
      { day: 6, start: 14, end: 17, kind: 'study' },
    ],
  },
  {
    id: 'full-time',
    label: 'Full-time, around a part-time job',
    hours: 'About 25 to 30 hours a week, four subjects a trimester',
    note: 'Suits a three-day working week. Two full study days, a Saturday morning, two evenings and the live tutorial.',
    blocks: [
      { day: 0, start: 9, end: 17, kind: 'work' },
      { day: 1, start: 9, end: 17, kind: 'work' },
      { day: 2, start: 9, end: 17, kind: 'work' },
      { day: 0, start: 19, end: 21, kind: 'study' },
      { day: 1, start: 19, end: 21, kind: 'study' },
      { day: 2, start: 19, end: 20.5, kind: 'live' },
      { day: 3, start: 9, end: 15, kind: 'study' },
      { day: 4, start: 9, end: 15, kind: 'study' },
      { day: 5, start: 9, end: 13, kind: 'study' },
      { day: 6, start: 13, end: 16, kind: 'study' },
    ],
  },
]

export const aipcShiftModes: PlannerMode[] = [
  {
    id: 'shifts',
    label: 'Rotating shifts',
    hours: 'About 12 to 15 hours a week, two subjects a trimester',
    note: 'Early shifts Monday and Tuesday, lates Wednesday and Thursday. Study slots move with the roster. The live tutorial is recorded, so a missed one is not a problem.',
    blocks: [
      { day: 0, start: 7, end: 15, kind: 'work' },
      { day: 1, start: 7, end: 15, kind: 'work' },
      { day: 2, start: 14, end: 22, kind: 'work' },
      { day: 3, start: 14, end: 22, kind: 'work' },
      { day: 0, start: 17, end: 19.5, kind: 'study' },
      { day: 1, start: 17, end: 19.5, kind: 'study' },
      { day: 2, start: 9, end: 12, kind: 'study' },
      { day: 3, start: 9, end: 12, kind: 'study' },
      { day: 5, start: 9, end: 12, kind: 'study' },
      { day: 6, start: 18, end: 19.5, kind: 'live' },
    ],
  },
  {
    id: 'nights',
    label: 'Night shifts',
    hours: 'About 12 to 15 hours a week, two subjects a trimester',
    note: 'Four nights on, three off. Study sits in the afternoons before a shift and across the days off.',
    blocks: [
      { day: 0, start: 20, end: 23, kind: 'work' },
      { day: 1, start: 20, end: 23, kind: 'work' },
      { day: 2, start: 20, end: 23, kind: 'work' },
      { day: 3, start: 20, end: 23, kind: 'work' },
      { day: 0, start: 15, end: 17.5, kind: 'study' },
      { day: 2, start: 15, end: 17.5, kind: 'study' },
      { day: 4, start: 10, end: 14, kind: 'study' },
      { day: 5, start: 10, end: 13, kind: 'study' },
      { day: 6, start: 18, end: 19.5, kind: 'live' },
    ],
  },
]

export const aipcCostVersions: CostVersion[] = [
  { id: 'standard', ...AIPC_COURSE.standard },
  { id: 'advanced', ...AIPC_COURSE.advanced },
]

export const aipcCostExtras: CostExtra[] = [
  { id: 'travel', label: 'Workshop travel and stay', amount: 1500, hint: `${AIPC_COURSE.workshopDays} days in ${AIPC_COURSE.workshopCities.join(', ')}. Less if one is your city.` },
  { id: 'placement', label: 'Placement costs', amount: 450, hint: 'Police check, working with children check, student insurance, travel to your placement.' },
  { id: 'books', label: 'Textbooks and software', amount: 600, hint: 'Most readings are supplied. Two or three core texts and a telehealth tool.' },
  { id: 'aca', label: 'ACA student membership', amount: 100, hint: 'Optional while studying, required to register on graduation.' },
]

export const aipcPathway: PathStep[] = [
  {
    label: 'Step 1, if you have no degree',
    title: 'Diploma of Counselling',
    time: '12 to 18 months',
    detail: 'Nationally recognised, online. Leads into the Bachelor with credit.',
  },
  {
    label: 'Step 2, if you have no degree',
    title: 'Bachelor of Counselling',
    time: '3 years, or less with credit',
    detail: 'Or skip both steps: a bachelor degree in any field meets the entry requirement for the Master.',
  },
  {
    label: 'You are here',
    title: 'Master of Counselling',
    time: '18 or 24 months',
    detail: 'A bachelor degree in any field meets the entry requirement. Graduate eligible for ACA registration with 200 hours of supervised client work.',
    current: true,
    href: '#facts',
  },
]

export const aipcStoryFilters = [
  { id: 'nurse', label: 'I was a nurse' },
  { id: 'teacher', label: 'I was a teacher' },
  { id: 'manager', label: 'I was a manager' },
  { id: 'other', label: 'Something else' },
]

export const aipcStories: Story[] = [
  {
    id: 'anjali',
    name: 'Anjali',
    age: 44,
    from: 'ICU nurse, 19 years',
    now: 'School counsellor, Brisbane',
    took: '18 months part-time, while still nursing three days a week',
    quote: 'I had sat with families in the worst moments of their lives for two decades. The degree gave that a name and a structure.',
    filter: 'nurse',
    photo: '/images/aipc/story-anjali.png',
  },
  {
    id: 'ruth',
    name: 'Ruth',
    age: 52,
    from: 'Primary teacher, 24 years',
    now: 'Private practice, two days a week',
    took: '24 months on the Advanced version',
    quote: 'My own kids had left home and I had a year of thinking about it. Talking to a tutor who had done the same thing is what tipped me.',
    filter: 'teacher',
  },
  {
    id: 'miguel',
    name: 'Miguel',
    age: 47,
    from: 'HR manager',
    now: 'EAP counsellor, Melbourne',
    took: '18 months part-time',
    quote: 'Half my job was already counselling people through redundancy and conflict. Now I do it properly, and I am paid to do only that.',
    filter: 'manager',
    photo: '/images/aipc/story-miguel.png',
  },
  {
    id: 'tom',
    name: 'Tom',
    age: 41,
    from: 'Project manager, construction',
    now: 'Counsellor at headspace',
    took: '18 months, with one trimester paused',
    quote: 'I went through counselling myself after a burnout. Nobody asked me about that in a form, which I appreciated. It came up with my tutor instead.',
    filter: 'other',
  },
]

export const aipcCompare: CompareRow[] = [
  { label: 'Total tuition', us: '$34,650 (18 months) or $47,250 Advanced', them: '$62,000 to $78,000' },
  { label: 'Entry', us: 'Any bachelor degree', them: 'Related degree, often an interview' },
  { label: 'Intakes a year', us: 'Four: March, May, July, November', them: 'One or two' },
  { label: 'Pace', us: 'Full-time or part-time, change between them', them: 'Fixed at enrolment' },
  { label: 'Where', us: 'Online, 5 workshop days in total', them: 'On campus or blended, weekly' },
  { label: 'Placement', us: '200 hours, arranged with you by a placement coordinator', them: 'Usually 200 to 400 hours, often self-sourced' },
  { label: 'Accreditation', us: 'ACA', them: 'ACA or PACFA' },
  { label: 'Focus', us: 'Counselling only, since 1990', them: 'One faculty of many' },
]

export const aipcCompareNote =
  'University figures are indicative 2026 domestic fee ranges for two-year Master of Counselling programs at Australian universities, pending sourced data. Check each provider.'

export const aipcGuideRoutes: EnquiryRoute[] = [
  {
    id: 'new',
    label: 'New to counselling',
    hint: 'Changing from another career',
    confirmation: 'The course guide has been emailed to you. The sections on placement, weekly study load and pathways are first, as these are the most common questions from people changing careers.',
    next: [
      'Today: the guide as a PDF, from Megan Hart.',
      'In a week: one email with two graduate stories.',
      'In three weeks: a reminder of the next information session. No further emails unless you ask.',
    ],
  },
  {
    id: 'field',
    label: 'Already working in the field',
    hint: 'Youth, support or community work',
    confirmation: 'The course guide has been emailed to you, with the recognition of prior learning section first and a one-page summary for your employer attached.',
    next: [
      'Today: the guide and employer summary, from Daniel Okafor.',
      'In three days: how to apply for credit, and the enrolment link.',
      'No further emails unless you reply.',
    ],
  },
]

export const aipcCreditQuestions: CheckQuestion[] = [
  {
    id: 'role',
    label: 'What is your current role?',
    options: [
      { id: 'youth', label: 'Youth worker' },
      { id: 'support', label: 'Support worker' },
      { id: 'community', label: 'Community services' },
      { id: 'other', label: 'Something else' },
    ],
  },
  {
    id: 'study',
    label: 'What have you studied before?',
    options: [
      { id: 'aipc-dip', label: 'AIPC Diploma of Counselling' },
      { id: 'bach-related', label: 'Bachelor in a related field' },
      { id: 'dip-cs', label: 'Diploma of Community Services' },
      { id: 'bach-other', label: 'Bachelor in another field' },
    ],
  },
  {
    id: 'years',
    label: 'Years of paid helping work?',
    options: [
      { id: 'lt2', label: 'Under 2' },
      { id: '2to5', label: '2 to 5' },
      { id: '5plus', label: '5 or more' },
    ],
  },
]

const SUBJECT_FEE = AIPC_COURSE.standard.tuition / AIPC_COURSE.standard.subjects
const MONTHS_PER_SUBJECT = AIPC_COURSE.standard.months / AIPC_COURSE.standard.subjects

export function resolveCredit(a: Answers): CheckResult {
  const fromStudy: Record<string, number> = { 'aipc-dip': 3, 'bach-related': 2, 'dip-cs': 1, 'bach-other': 0 }
  let credits = fromStudy[a.study] ?? 0
  if (a.years === '5plus') credits += 1
  credits = Math.min(credits, 4)
  const months = Math.round(credits * MONTHS_PER_SUBJECT)
  const saved = Math.round(credits * SUBJECT_FEE)
  const placementNote =
    a.years === 'lt2'
      ? 'Your current role can count towards placement once you have 12 months in it.'
      : `Up to ${AIPC_COURSE.directClientHours} of your ${AIPC_COURSE.placementHours} placement hours can be logged in your current role, with supervision.`

  if (credits === 0) {
    return {
      tone: 'start',
      headline: 'Your experience can count towards placement.',
      body: 'Subject credit is unlikely from that study. Your work experience can count towards placement hours, and a bachelor degree in any field meets the entry requirement.',
      bullets: [placementNote, '10 subjects over 18 months part-time, around your shifts.', 'Formal assessment happens after you enrol and costs nothing.'],
      action: { label: 'Talk to a course specialist', href: '#talk' },
      secondary: { label: 'Download the guide', href: '#guide' },
    }
  }
  return {
    tone: 'yes',
    headline: 'Your experience is likely to count towards the degree.',
    body: `Based on your answers, credit for up to ${credits} subject${credits > 1 ? 's' : ''} is likely. That shortens the course and reduces the fee. A formal assessment after enrolment confirms it, at no cost.`,
    bullets: [placementNote, 'Maximum credit is 4 of the 10 subjects.'],
    action: { label: 'Talk to a course specialist', href: '#talk' },
    secondary: { label: 'Download the guide', href: '#guide' },
  }
}

export const aipcOutcomeStats: OutcomeStat[] = [
  { value: '9 in 10', label: 'graduates in counselling-related work within six months', source: 'UP graduate survey, placeholder' },
]
export const aipcEmployers = ['headspace', 'Relationships Australia', 'Anglicare', 'Lifeline', 'Uniting', 'Mission Australia', 'School wellbeing teams']
export const aipcPay: PayRow[] = [
  { role: 'Provisional counsellor, on graduation', band: '$70K to $78K', source: 'Seek ads, Jan 2026, placeholder' },
  { role: 'Youth AOD counsellor', band: '$80K to $88K', source: 'SCHADS award level 5, placeholder' },
  { role: 'Registered counsellor, 2 to 4 years', band: '$85K to $96K', source: 'Seek ads, Jan 2026, placeholder' },
]

export const aipcChat: CannedAnswer[] = [
  { q: 'How much does it cost?', a: '$34,650 for the 18-month Master, or $47,250 for the 24-month Advanced. FEE-HELP can defer all of it, or pay per trimester, or mix the two.' },
  { q: 'Can I get credit?', a: 'Up to 4 of the 10 subjects, depending on prior study and experience. Use the credit checker above for an instant estimate; the formal assessment is free after you enrol.' },
  { q: 'How many hours a week?', a: 'About 12 to 15 hours part-time, with one live tutorial a week that is recorded. The shift planner above shows how it sits around a roster.' },
  { q: 'When does it start?', a: 'Four times a year: 1 March, 10 May, 19 July and 1 November 2027. You can enrol online below without a call.' },
  { q: 'Do I need to come to campus?', a: 'Five practical workshop days in total, in Brisbane, Sydney, Melbourne or Perth. Everything else is online.' },
]

export const aipcEmployerSummary: SummaryLine[] = [
  { label: 'Course', value: 'Master of Counselling, ACA accredited' },
  { label: 'Provider', value: 'AIPC, TEQSA-registered, since 1990' },
  { label: 'Length', value: '18 months part-time' },
  { label: 'Weekly hours', value: '12 to 15, outside shifts' },
  { label: 'Time away from work', value: '5 workshop days, plus placement' },
  { label: 'Cost', value: '$34,650, FEE-HELP eligible' },
  { label: 'On graduation', value: 'ACA Registered Counsellor' },
]

export const aipcIntakes: IntakeOption[] = AIPC_COURSE.intakes.map((d, i) => ({ id: `i${i}`, date: d, label: i === 0 ? 'Trimester 1' : undefined }))

export const aipcQuestions = [
  {
    q: 'How is placement arranged, and what support do I get?',
    a: `A placement coordinator works with you from your second trimester to find a service near you. You complete ${AIPC_COURSE.placementHours} hours, at least ${AIPC_COURSE.directClientHours} of them with clients, with fortnightly supervision from a practising counsellor.`,
  },
  {
    q: 'I came to counselling through my own experience. Does that matter?',
    a: 'No. Many counsellors did. You are not asked to disclose it in an application. If you would like to discuss it, a course specialist or tutor is the right person.',
  },
  {
    q: 'Who can use FEE-HELP?',
    a: `${AIPC_COURSE.feeHelpWho} Repayments start through tax once your income passes the Government threshold.`,
  },
  {
    q: 'Can I pause if life gets in the way?',
    a: 'Yes. You can take a trimester off and return to the same course. If you withdraw before the census date, no fee is charged for that trimester.',
  },
  {
    q: 'What is the difference between the Master and the Master Advanced?',
    a: 'The Advanced adds four subjects and six months, with a specialisation stream and a research project. Most career changers take the 18-month Master and add the Advanced subjects later if they want them.',
  },
]
