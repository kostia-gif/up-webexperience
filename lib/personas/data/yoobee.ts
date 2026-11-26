import type { Advisor, FinderCourse, FinderQuestion } from '@/components/modules/course-finder'
import type { EnquiryRoute } from '@/components/modules/enquiry-form'
import type { Fact } from '@/components/modules/facts-strip'
import type { Answers, CheckQuestion, CheckResult } from '@/components/modules/instant-check'
import type { OutcomeStat, PayRow } from '@/components/modules/outcomes-panel'
import type { PathStep } from '@/components/modules/pathway-picture'
import type { Person } from '@/components/modules/people-cards'
import type { SummaryLine } from '@/components/modules/send-summary'
import type { Session } from '@/components/modules/session-picker'
import type { Specialism } from '@/components/modules/specialism-explorer'
import type { Story } from '@/components/modules/stories-matched'
import type { Work } from '@/components/modules/student-work-wall'
import type { PlannerMode } from '@/components/modules/week-planner'
import type { GradEmployer } from '@/components/modules/where-graduates-went'
import type { Earnings } from '@/components/modules/earning-potential'

/* Creative Media, for Plan B */

export const CM = {
  title: 'New Zealand Certificate in Creative Media (Level 4)',
  short: 'Certificate in Creative Media',
  weeks: 19,
  intakes: ['8 February 2027', '12 July 2027'],
  fee: 'Free for eligible domestic students in 2027 under Fees Free. Otherwise $4,753 all-in.',
}

export const cmFacts: Fact[] = [
  { label: 'Qualification', value: CM.title },
  { label: 'Length', value: `${CM.weeks} weeks, full-time or part-time` },
  { label: 'Study mode', value: 'Online, or on campus in Auckland, Wellington and Christchurch' },
  { label: 'Next starts', value: CM.intakes.join(' and ') },
  { label: 'Cost', value: 'Free for eligible domestic students, or $4,753', placeholder: true },
  { label: 'Weekly hours', value: 'About 35 full-time (15 live, 20 project), half that part-time' },
]

export const cmOutcomeStats: OutcomeStat[] = [
  { value: '84%', label: 'of 2025 graduates in creative work or further study within six months', source: 'Yoobee graduate survey 2025, placeholder' },
]
export const cmEmployers = ['Weta FX', 'Augusto', 'Clemenger BBDO', 'TVNZ', 'Spark', 'Trade Me', 'Freelance and small studios']
export const cmPay: PayRow[] = [
  { role: 'Junior graphic or motion designer', band: '$52K to $60K', source: 'Seek NZ ads, Jan 2026, placeholder' },
  { role: 'Content creator, in-house', band: '$55K to $65K', source: 'Seek NZ ads, Jan 2026, placeholder' },
  { role: 'Designer, 3 years in', band: '$70K to $85K', source: 'Hays creative salary guide 2026, placeholder' },
]

export const cmEarnings: Earnings = {
  currency: 'NZD',
  start: 52000,
  threeYear: 68000,
  source: 'Designers Institute of NZ salary survey',
  year: 2025,
  stat: { value: '84%', label: 'In a creative job or further study within 6 months', cohort: 2025 },
  employers: ['Weta Workshop', 'Mukpuddy Animation', 'DDB Aotearoa', 'Trade Me', 'Sky', 'Watermark Creative'],
  employersMore: 40,
  employersYear: 2025,
}

export const cmStoryFilters = [
  { id: 'hospo', label: 'Hospitality or retail' },
  { id: 'office', label: 'An office job' },
  { id: 'trade', label: 'A trade or the family business' },
  { id: 'degree', label: 'A degree I did not love' },
]

export const cmStories: Story[] = [
  { id: 'tane', name: 'Tane', age: 27, from: 'Barista and bar manager', now: 'Motion designer, Augusto', took: '19 weeks, then the Level 5 diploma', quote: 'I drew on every napkin for ten years. The certificate was the first time someone paid me to finish a drawing.', filter: 'hospo' },
  { id: 'lucy', name: 'Lucy', age: 31, from: 'Insurance claims, 8 years', now: 'In-house content designer, Spark', took: '19 weeks part-time, online, while working', quote: 'I was not going to quit a salary on a hunch. The taster lesson was the thing. I did it on a Sunday and knew.', filter: 'office' },
  { id: 'sione', name: 'Sione', age: 24, from: 'Family plumbing business', now: 'Freelance brand designer', took: '19 weeks online from Hamilton', quote: 'Dad thought it was a hobby until he saw the invoices. Now I do the van livery for half his mates.', filter: 'trade' },
  { id: 'mei', name: 'Mei', age: 29, from: 'Accounting degree, two years in practice', now: 'Junior designer, Clemenger BBDO', took: '19 weeks, then a diploma', quote: 'I was good at a thing I hated. Everyone kept telling me how sensible I was. The sensible thing was to stop.', filter: 'degree' },
]

export const cmWorks: Work[] = [
  { id: 'w1', title: 'Night market poster series', student: 'Aroha T.', course: 'Creative Media', discipline: 'Design', tone: 'bg-primary' },
  { id: 'w2', title: 'Ten-second logo sting', student: 'Ben K.', course: 'Creative Media', discipline: 'Motion', tone: 'bg-coral' },
  { id: 'w3', title: 'One-shot short film', student: 'Lucy P.', course: 'Creative Media', discipline: 'Film', tone: 'bg-primary-tint-foreground' },
  { id: 'w4', title: 'Zine on the 2am bus', student: 'Mei L.', course: 'Creative Media', discipline: 'Design', tone: 'bg-muted-foreground' },
  { id: 'w5', title: 'Frame-by-frame walk cycle', student: 'Tane R.', course: 'Creative Media', discipline: 'Motion', tone: 'bg-coral-hover' },
  { id: 'w6', title: 'Band photography set', student: 'Sione F.', course: 'Creative Media', discipline: 'Film', tone: 'bg-primary-hover' },
  { id: 'w7', title: 'Typeface from street signs', student: 'Priya N.', course: 'Creative Media', discipline: 'Design', tone: 'bg-foreground' },
  { id: 'w8', title: 'Kinetic type lyric video', student: 'Jordan W.', course: 'Creative Media', discipline: 'Motion', tone: 'bg-primary' },
]

export const cmPlannerModes: PlannerMode[] = [
  {
    id: 'online-pt',
    label: 'Online, part-time, around a job',
    hours: 'About 10 hours a week over 38 weeks',
    note: 'Two evenings and a half day at the weekend. Briefs are released weekly and the live crit is recorded. Built for people who are not leaving work yet.',
    blocks: [
      ...[0, 1, 2, 3, 4].map((day) => ({ day, start: 9, end: 17, kind: 'work' as const })),
      { day: 1, start: 19, end: 21, kind: 'study' },
      { day: 3, start: 19, end: 20.5, kind: 'live' },
      { day: 3, start: 20.5, end: 21.5, kind: 'study' },
      { day: 5, start: 9, end: 13, kind: 'study' },
    ],
  },
  {
    id: 'online-ft',
    label: 'Online, full-time',
    hours: 'About 35 hours a week over 19 weeks: 15 of live classes, 20 of project work',
    note: 'Suits a part-time job of two or three days. Mornings for briefs, one live crit a week.',
    blocks: [
      { day: 3, start: 9, end: 17, kind: 'work' },
      { day: 4, start: 9, end: 17, kind: 'work' },
      { day: 0, start: 9, end: 13, kind: 'study' },
      { day: 1, start: 9, end: 13, kind: 'study' },
      { day: 2, start: 9, end: 12, kind: 'study' },
      { day: 2, start: 13, end: 14.5, kind: 'live' },
      { day: 5, start: 9, end: 13, kind: 'study' },
      { day: 6, start: 14, end: 16, kind: 'study' },
    ],
  },
  {
    id: 'campus',
    label: 'On campus, full-time',
    hours: 'About 35 hours a week over 19 weeks: 15 of live classes, 20 of project work',
    note: 'Four half days on campus and one at home. Evenings and weekends are yours.',
    blocks: [
      { day: 0, start: 9, end: 13, kind: 'live' },
      { day: 1, start: 9, end: 13, kind: 'live' },
      { day: 2, start: 9, end: 13, kind: 'live' },
      { day: 3, start: 9, end: 13, kind: 'live' },
      { day: 4, start: 9, end: 13, kind: 'study' },
    ],
  },
]

export const cmFundingQuestions: CheckQuestion[] = [
  {
    id: 'res',
    label: 'Are you a New Zealand citizen or resident?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'prior',
    label: 'Have you done more than half a year of tertiary study before?',
    options: [
      { id: 'none', label: 'No' },
      { id: 'some', label: 'Yes, some' },
      { id: 'degree', label: 'Yes, a degree' },
    ],
  },
  {
    id: 'mode',
    label: 'How would you study?',
    options: [
      { id: 'ft', label: 'Full-time' },
      { id: 'pt', label: 'Part-time' },
    ],
  },
]

export function resolveCmFunding(a: Answers, hrefs: { enrol: string; talk: string } = { enrol: '#start', talk: '#advisor' }): CheckResult {
  if (a.res === 'no') {
    return {
      tone: 'info',
      headline: 'Not free: $4,753 total, nothing added later.',
      body: 'Fees Free is for New Zealand citizens and residents in their first year of tertiary study. The fee covers tuition, levy and software, and can be split across the course.',
      action: { label: 'Pick a start date', href: hrefs.enrol },
    }
  }
  if (a.prior === 'none') {
    return {
      tone: 'yes',
      headline: 'Yes, you qualify. This course costs you nothing.',
      body: 'Fees Free covers the first year of tertiary study for New Zealand citizens and residents. This is your first year, so tuition, levy and software are covered.',
      bullets: ['Tuition, levy and software are all covered.', a.mode === 'pt' ? 'Part-time study is covered too, pro rata.' : 'Full-time students can also apply for a living-costs loan or allowance.', 'You need a RealMe login and your NSN. We help with both.'],
      action: { label: 'Pick a start date', href: hrefs.enrol },
    }
  }
  return {
    tone: 'start',
    headline: 'Possibly free. One thing to check.',
    body: 'Fees Free covers the first year of tertiary study only. If you have studied before, what is left of that year can cover this course. We check your entitlement for you in a day.',
    bullets: ['If nothing is left, it is $4,753 total, with split payments or a student loan.', 'Nothing is added to what you owe without you agreeing first.'],
    action: { label: 'Ask us to check', href: hrefs.talk },
  }
}

export const cmFinderQuestions: FinderQuestion[] = [
  {
    id: 'make',
    label: 'What did you always end up making?',
    options: [
      { id: 'draw', label: 'Drawings and characters', weights: { anim: 3, cm: 1 } },
      { id: 'layout', label: 'Posters, layouts, logos', weights: { cm: 3, design: 2 } },
      { id: 'video', label: 'Videos and edits', weights: { cm: 2, film: 3 } },
      { id: 'code', label: 'Websites and little apps', weights: { cm: 1, web: 3 } },
    ],
  },
  {
    id: 'exp',
    label: 'How much have you done formally?',
    options: [
      { id: 'none', label: 'Nothing, just for myself', weights: { cm: 3 } },
      { id: 'some', label: 'A short course or a lot of YouTube', weights: { cm: 2, design: 1, anim: 1, film: 1, web: 1 } },
      { id: 'pro', label: 'Paid work, informally', weights: { design: 2, anim: 2, film: 2, web: 2 } },
    ],
  },
  {
    id: 'time',
    label: 'How much time can you give it?',
    options: [
      { id: 'evenings', label: 'Evenings and weekends', weights: { cm: 3 } },
      { id: 'part', label: 'Two or three days a week', weights: { cm: 2, design: 1 } },
      { id: 'full', label: 'I could go full-time', weights: { design: 2, anim: 2, film: 2, web: 2 } },
    ],
  },
  {
    id: 'goal',
    label: 'What do you want at the end?',
    options: [
      { id: 'test', label: 'To know if this is for me', weights: { cm: 3 } },
      { id: 'job', label: 'A junior job in a studio', weights: { design: 2, anim: 2, film: 2, web: 2, cm: 1 } },
      { id: 'side', label: 'Paid side work while I keep my job', weights: { cm: 2, design: 1, web: 1 } },
    ],
  },
]

export const cmFinderCourses: FinderCourse[] = [
  { id: 'cm', title: 'Certificate in Creative Media', level: 'Level 4', mode: 'Online or campus', weeks: '19 weeks', why: 'The entry point. Broad enough to find your lane, short enough to do around a job, and it leads with credit into every diploma below.', href: '#facts' },
  { id: 'design', title: 'Diploma in Digital Design', level: 'Level 5', mode: 'Online or campus', weeks: '1 year', why: 'Branding, layout and digital product design for people who already know design is the thing.' },
  { id: 'anim', title: 'Diploma in Animation', level: 'Level 5', mode: 'Campus', weeks: '1 year', why: 'Characters, environments and motion, on campus with industry tutors.', href: '/yoobee/diploma-in-animation' },
  { id: 'film', title: 'Diploma in Film and Screen', level: 'Level 5', mode: 'Campus', weeks: '1 year', why: 'Directing, shooting and editing with real crews and real briefs.' },
  { id: 'web', title: 'Diploma in Web and UX', level: 'Level 5', mode: 'Online or campus', weeks: '1 year', why: 'Front-end and UX for people who like making things work as much as making them look good.' },
]

export const cmAdvisor: Advisor = {
  name: 'Sam',
  role: 'Student advisor, Yoobee',
  photo: '/images/advisors/yoobee-sam.png',
  line: 'I did the certificate at 28 after six years in retail. I will tell you honestly whether the course fits, and what the first month is like.',
}

export const cmNext: PathStep[] = [
  { label: 'You are here', title: 'Certificate in Creative Media', time: '19 weeks', detail: 'Find your lane, build a first portfolio, and earn credit towards a diploma.', current: true, href: '#facts' },
  { label: 'Next', title: 'A Level 5 diploma', time: '1 year', detail: 'Design, Animation, Film or Web and UX. The certificate takes a term off most of them.' },
  { label: 'Then', title: 'Degree or work', time: '2 years, or now', detail: 'Bachelor of Creative Technologies, or a junior role. Most Plan B graduates go to work first.' },
]

export const cmAdvisorRoutes: EnquiryRoute[] = [
  {
    id: 'working',
    label: 'Working or studying something else',
    hint: 'Weighing it up',
    confirmation: 'Sam will call or email at the time you picked, with the outcomes for the course you were looking at and the part-time option laid out.',
    next: ['At your chosen time: Sam, by phone or email, your call.', 'Afterwards: a one-page summary of what you discussed. No further calls unless you ask.', 'Two weeks before the intake: one reminder.'],
  },
  {
    id: 'school',
    label: 'Finishing school',
    hint: 'This year or last',
    confirmation: 'Sam will call at your chosen time, with campus visit dates and the holiday programme list ready.',
    next: ['At your chosen time: a call from Sam.', 'Afterwards: a message you can forward to a parent.', 'Before the intake: one reminder.'],
  },
  {
    id: 'parent',
    label: 'A parent',
    hint: 'Looking on behalf of someone',
    confirmation: 'Sam will email you the outcomes, cost and support summary first, then call at your chosen time if you still want to talk.',
    next: ['Today: the parent summary, as a PDF.', 'At your chosen time: a call, only if you want it.', 'Nothing else.'],
  },
]

/* Diploma in Animation, for Meta Kids */

export const ANIM = {
  title: 'Diploma in Animation (Level 5)',
  campuses: ['Auckland', 'Wellington', 'Christchurch'],
  intakes: ['15 February 2027', '19 July 2027'],
}

export const animFacts: Fact[] = [
  { label: 'Qualification', value: ANIM.title },
  { label: 'Length', value: '1 year, full-time' },
  { label: 'Where', value: 'On campus: Auckland, Wellington, Christchurch' },
  { label: 'Next starts', value: ANIM.intakes.join(' and ') },
  { label: 'Cost', value: 'Fees Free for eligible first-year students, or $8,990', placeholder: true },
  { label: 'Class size', value: 'Max 18 per studio', placeholder: true },
]

export const animWorks: Work[] = [
  { id: 'a1', title: 'Kaitiaki, character turnaround', student: 'Hemi W.', course: 'Animation', discipline: 'Characters', tone: 'bg-primary', tall: true },
  { id: 'a2', title: 'Flooded Queen St, environment', student: 'Ava C.', course: 'Animation', discipline: 'Environments', tone: 'bg-coral' },
  { id: 'a3', title: 'Walk cycle, 2D', student: 'Noah P.', course: 'Animation', discipline: '2D', tone: 'bg-primary-tint-foreground' },
  { id: 'a4', title: 'Mech rig, 3D', student: 'Isla M.', course: 'Animation', discipline: '3D', tone: 'bg-muted-foreground' },
  { id: 'a5', title: 'Shrine at dusk, environment', student: 'Kenji T.', course: 'Animation', discipline: 'Environments', tone: 'bg-primary-hover', tall: true },
  { id: 'a6', title: 'Two-headed taniwha, character', student: 'Ruby O.', course: 'Animation', discipline: 'Characters', tone: 'bg-coral-hover' },
  { id: 'a7', title: 'Fight scene, 2D', student: 'Leo S.', course: 'Animation', discipline: '2D', tone: 'bg-foreground' },
  { id: 'a8', title: 'Low-poly pā, 3D', student: 'Maia R.', course: 'Animation', discipline: '3D', tone: 'bg-primary' },
  { id: 'a9', title: 'Expression sheet', student: 'Zara H.', course: 'Animation', discipline: 'Characters', tone: 'bg-muted-foreground' },
  { id: 'a10', title: 'Rain on neon, environment', student: 'Finn D.', course: 'Animation', discipline: 'Environments', tone: 'bg-coral' },
  { id: 'a11', title: 'Lip sync test', student: 'Ella K.', course: 'Animation', discipline: '2D', tone: 'bg-primary-hover' },
  { id: 'a12', title: 'Hard-surface prop, 3D', student: 'Arjun V.', course: 'Animation', discipline: '3D', tone: 'bg-primary-tint-foreground' },
]
export const animDisciplines = ['Characters', 'Environments', '2D', '3D']

export const animSpecialisms: Specialism[] = [
  { id: 'chars', label: 'Characters', craft: 'Design, anatomy, expression and turnarounds. Making someone you can believe in from any angle.', tools: ['Procreate', 'Photoshop', 'Blender', 'ZBrush'], jobs: ['Character artist', 'Concept artist', 'Character modeller'], course: 'Diploma in Animation, character stream' },
  { id: 'env', label: 'Environments', craft: 'Worlds, light and mood. Composition, set dressing and the story a place tells before anyone walks in.', tools: ['Blender', 'Unreal Engine', 'Substance Painter', 'Photoshop'], jobs: ['Environment artist', 'Matte painter', 'Level artist'], course: 'Diploma in Animation, environment stream' },
  { id: '2d', label: '2D animation', craft: 'Timing, spacing, weight and acting. Frame by frame, from a bouncing ball to a fight scene.', tools: ['Toon Boom Harmony', 'TVPaint', 'After Effects'], jobs: ['2D animator', 'Storyboard artist', 'Motion designer'], course: 'Diploma in Animation, 2D stream' },
  { id: '3d', label: '3D animation', craft: 'Modelling, rigging, animating and lighting. Making things move in three dimensions and look real, or deliberately not.', tools: ['Maya', 'Blender', 'Unreal Engine', 'Houdini'], jobs: ['3D animator', 'Rigger', 'Generalist at a small studio'], course: 'Diploma in Animation, 3D stream' },
]

export const animTutors: Person[] = [
  { id: 'rangi', name: 'Rangi Parata', role: 'Lead tutor, 3D', background: 'Nine years at Weta FX on creature rigs. Still takes freelance rigging work between terms.', credits: ['Avatar: The Way of Water', 'The Lord of the Rings: The Rings of Power'], video: true },
  { id: 'yuki', name: 'Yuki Tanaka', role: 'Tutor, 2D and story', background: 'Storyboard artist on two seasons of a Netflix animated series. Draws every day, still.', credits: ['Netflix series (NDA)', 'Short film, NZIFF 2024'], video: true },
  { id: 'cass', name: 'Cass Mbeki', role: 'Tutor, environments', background: 'Environment artist at a Wellington games studio, part-time, so what she teaches on Monday she did on Friday.', credits: ['PikPok', 'Indie title, Steam 2025'], video: true },
]

export const animWhereWent: GradEmployer[] = [
  { employer: 'Weta FX', kind: 'Film VFX, Wellington', grads: [{ name: 'Hemi W.', role: 'Junior creature modeller', year: 2025 }, { name: 'Ava C.', role: 'Environment TD', year: 2024 }] },
  { employer: 'PikPok', kind: 'Games, Wellington', grads: [{ name: 'Isla M.', role: '3D artist', year: 2025 }] },
  { employer: 'Mukpuddy', kind: 'Animation studio, Auckland', grads: [{ name: 'Noah P.', role: '2D animator', year: 2025 }, { name: 'Ella K.', role: 'Clean-up artist', year: 2024 }] },
  { employer: 'Grinding Gear Games', kind: 'Games, Auckland', grads: [{ name: 'Arjun V.', role: 'Prop artist', year: 2024 }] },
  { employer: 'Freelance', kind: 'Twitch emotes, VTuber rigs, indie games', grads: [{ name: 'Ruby O.', role: 'Character artist', year: 2025 }, { name: 'Leo S.', role: 'Animator', year: 2025 }] },
  { employer: 'Further study', kind: 'Bachelor of Creative Technologies', grads: [{ name: 'Maia R.', role: 'Year 2', year: 2025 }] },
]

export const animVisitSlots = [
  { day: 'Wed 10 Feb', times: ['10:00', '14:00', '16:00'] },
  { day: 'Fri 12 Feb', times: ['10:00', '13:00'] },
  { day: 'Sat 13 Feb', times: ['10:00', '11:00', '12:00'] },
]

export const animHoliday: Session[] = [
  { id: 'h1', date: '18 to 20 Jan 2027', time: '10am to 3pm', where: 'Auckland, City Road campus', left: 6 },
  { id: 'h2', date: '18 to 20 Jan 2027', time: '10am to 3pm', where: 'Wellington, Bunny Street campus', left: 9 },
  { id: 'h3', date: '25 to 27 Jan 2027', time: '10am to 3pm', where: 'Christchurch, Colombo Street campus', left: 11 },
]

export const animParentSummary: SummaryLine[] = [
  { label: 'Course', value: 'Diploma in Animation, Level 5, NZQA' },
  { label: 'Length', value: '1 year, full-time, on campus' },
  { label: 'Cost', value: 'Fees Free if eligible, otherwise $8,990' },
  { label: 'Where graduates go', value: 'Weta FX, PikPok, Mukpuddy, freelance' },
  { label: 'Class size', value: 'Max 18, with industry tutors' },
  { label: 'Support', value: 'Learning support, counsellor on campus, pathway to degree' },
]
