import type { EnquiryRoute } from '@/components/modules/enquiry-form'
import type { Outcome, PayWay, Reason } from '@/components/modules/framing'
import type { Phase } from '@/components/modules/real-terms'
import type { PathStep } from '@/components/modules/pathway-picture'
import { AIPC_COURSE } from './aipc'
import { FLIGHT } from './nzst'

/* AIPC */

export const aipcOutcomes: Outcome[] = [
  { lead: 'Hold a real counselling session.', text: 'Build a relationship, clarify what someone needs, set goals and end well, across the major therapeutic approaches.' },
  { lead: 'Work safely with risk.', text: 'Recognise crisis, trauma and risk of harm, and know exactly what to do and who to involve.' },
  { lead: 'Choose and apply an approach.', text: 'Person-centred, cognitive-behavioural, solution-focused and more, matched to the person in front of you.' },
  { lead: 'Practise ethically and reflectively.', text: 'Confidentiality, boundaries, supervision and your own self-care, built in from week one.' },
  { lead: `Graduate with ${AIPC_COURSE.placementHours} supervised hours.`, text: 'Real clients in a real service, so your first paid role is not your first session.' },
  { lead: 'Register with the ACA.', text: 'Finish qualified for the Australian Counselling Association register and the roles that require it.' },
]

export const aipcReasons: Reason[] = [
  { title: 'Accredited by the ACA, registered with TEQSA', text: 'The course itself is accredited, not just the provider, and the degree sits at AQF Level 9, the same as a university master\u2019s.', href: '#accreditation', linkLabel: 'Recognition' },
  { title: 'Taught by practising counsellors', text: 'Every tutor still sees clients. What they teach on Tuesday they did on Monday.', href: '#tutors', linkLabel: 'Who teaches you' },
  { title: 'Counselling only, since 1990', text: 'One discipline, done for thirty-five years, with four intakes a year and a placement team that finds your agency for you.', href: '#compare', linkLabel: 'Compared with a university' },
  { title: 'Built around a working life', text: 'Online with five in-person days in total. Switch between part-time and full-time between trimesters. Pause if you need to.', href: '#like', linkLabel: 'What it\u2019s like' },
]

export const aipcWays: PayWay[] = [
  { title: 'FEE-HELP: nothing up front', body: 'Defer all tuition and repay through tax once you earn above the threshold. Most students use this.', highlight: true },
  { title: 'Pay per trimester', body: 'Pay for the subjects you take each trimester, as you go. Withdraw before census and that trimester costs nothing.' },
  { title: 'Pay up front', body: 'Pay the course in full, or subject by subject. No lock-in; change your mind between trimesters.' },
  { title: 'Mix and match', body: 'Pay some subjects up front and defer the rest with FEE-HELP. Change the mix each trimester.' },
]

export const aipcGuideRoute: EnquiryRoute[] = [
  {
    id: 'all',
    label: 'Course guide',
    confirmation: 'The course guide is on its way: subjects, placement, fees, credit for prior learning and the pathway, in one PDF.',
    next: ['Today: the guide, from a course specialist. No phone call.', 'In two weeks: one reminder of the next information session. Then nothing more unless you ask.'],
  },
]

/* Yoobee Creative Media */

export const cmOutcomes: Outcome[] = [
  { lead: 'Make finished work in three disciplines.', text: 'A short animation, a poster set and a one-shot film, each taken from brief to final file.' },
  { lead: 'Work the way a studio works.', text: 'Take a brief, meet a deadline, present in a crit and act on feedback.' },
  { lead: 'Use the tools properly.', text: 'Adobe Photoshop, Illustrator, Premiere and After Effects, and the habits that make them fast.' },
  { lead: 'Build a portfolio you can show.', text: 'Six pieces and a portfolio site, ready for a diploma application or a junior role.' },
  { lead: 'Know which lane is yours.', text: 'Design, motion or film, decided by what you could not put down, not by a quiz.' },
]

export const cmReasons: Reason[] = [
  { title: 'Graduates go on to work and study', text: '84% of last year\u2019s class were in creative work or further study within six months. One figure, one meaning, one source.', href: '#outcomes', linkLabel: 'Where graduates work' },
  { title: 'A part-time option for people with a job', text: 'Part-time over 38 weeks is half the weekly load, with recordings to catch up on a missed class.', href: '#journey', linkLabel: 'What your weeks look like' },
  { title: 'Credit into every Level 5 diploma', text: 'The certificate takes a term off Design, Animation, Film and Web and UX.', href: '#next', linkLabel: 'Where this leads' },
  { title: 'Try a real lesson first', text: 'A week-two lesson for an email address. Do it on a Sunday before you decide anything.', href: '#taster', linkLabel: 'Free taster lesson' },
]

export const cmWays: PayWay[] = [
  { title: 'Fees Free', body: 'New Zealand citizens and residents in their first year of tertiary study pay nothing. We help with the RealMe and NSN steps.', highlight: true },
  { title: 'Split payments', body: 'Spread the fee over the course in weekly or monthly instalments, interest free.' },
  { title: 'Student loan', body: 'StudyLink covers the fee if Fees Free is used up, and living costs for full-time study.' },
  { title: 'Pay up front', body: 'Pay in full before the start date. Full refund if you withdraw in the first two weeks.' },
]

export const cmAdvisorRoute: EnquiryRoute[] = [
  {
    id: 'all',
    label: 'Talk to an advisor',
    confirmation: 'Sam will call or email at the time you picked, with the outcomes for this course and the part-time option laid out.',
    next: ['At your chosen time: Sam, by phone or email, your call.', 'Afterwards: a one-page summary of what you discussed. No further calls unless you ask.', 'Two weeks before the intake: one reminder.'],
  },
]

/* Yoobee Animation */

export const animOutcomes: Outcome[] = [
  { lead: 'Animate with weight, timing and appeal.', text: 'The principles of animation, in 2D and 3D, from a bouncing ball to a fight scene.' },
  { lead: 'Design characters and worlds people believe.', text: 'Turnarounds, expression sheets, environments and lighting that tell a story before anyone speaks.' },
  { lead: 'Model, rig and light in 3D.', text: 'Maya, Blender and Unreal Engine, to a standard a studio can put into a pipeline.' },
  { lead: 'Work in a production.', text: 'Roles, pipelines, deadlines and dailies, on a short made by the whole studio.' },
  { lead: 'Leave with a showreel.', text: 'Ninety seconds of your best work, cut for the studios that visit on open night.' },
]

export const animPhases: Phase[] = [
  { when: 'Term 1', title: 'Draw, then move', detail: 'Observation, gesture, form and light, then the principles of animation in 2D and 3D. By week ten you have a walk cycle and a turnaround you are not embarrassed by.', can: ['Draw from life and from imagination', 'Animate a believable walk', 'Block a simple scene in 3D'] },
  { when: 'Term 2', title: 'Pick your stream', detail: 'Characters, environments, 2D or 3D. Your first stream project runs alongside pre-production for the studio short: script, boards, animatic and design.', can: ['Take a character or environment from sketch to final', 'Board and time a sequence', 'Give and take notes in dailies'] },
  { when: 'Term 3', title: 'Make the short', detail: 'The whole studio makes one film. You hold a role, hit deadlines, and see your work in someone else\u2019s shot.', can: ['Work inside a pipeline', 'Deliver shots to a deadline', 'Solve problems other people made'] },
  { when: 'Term 4', title: 'Cut the reel', detail: 'An independent piece that is entirely yours, with a tutor as producer, then the showreel and the studio open night.', can: ['Finish a personal piece', 'Cut a ninety-second reel', 'Talk about your work to a recruiter'] },
]

export const animReasons: Reason[] = [
  { title: 'Tutors who still work in the industry', text: 'Weta FX, PikPok, a Netflix series. What they teach on Monday they did on Friday.', href: '#tutors', linkLabel: 'Who teaches you' },
  { title: 'Eighteen to a studio', text: 'Small enough that a tutor knows your work by week two, with Wacoms, a render farm and a mocap corner, open till 9pm.', href: '#like', linkLabel: 'What it\u2019s like' },
  { title: 'Graduates in the studios you know', text: 'Weta FX, PikPok, Mukpuddy, Grinding Gear Games, and freelance work that pays rent.', href: '#graduates', linkLabel: 'Where graduates went' },
  { title: 'A direct line to the degree', text: 'The diploma counts as year one of the Bachelor of Creative Technologies if you want to keep going.', href: '#next', linkLabel: 'Where this leads' },
]

export const animNext: PathStep[] = [
  { label: 'You are here', title: 'Diploma in Animation', time: '1 year', detail: 'Characters, environments, 2D or 3D, on campus with industry tutors.', current: true, href: '#facts' },
  { label: 'Next', title: 'Bachelor of Creative Technologies', time: '2 more years', detail: 'The diploma counts as year one. Go deeper into your stream, or widen into games and VFX.' },
  { label: 'Or', title: 'Junior work', time: 'Now', detail: 'Junior animator, modeller, clean-up or generalist. Most of last year\u2019s class went to work first.' },
]

/* NZST */

export const flightOutcomes: Outcome[] = [
  { lead: 'Stay calm when the cabin is not.', text: 'Turbulence, a sick passenger, a delayed boarding, until composure is automatic.' },
  { lead: 'Run safety and emergency procedures.', text: 'Evacuation, fire, first aid and ditching, drilled in the simulator and the pool.' },
  { lead: 'Deliver service to airline standard.', text: 'Service flows, special needs passengers, difficult people, and the grooming and presentation that go with it.' },
  { lead: 'Pass an airline recruitment day.', text: 'Three mock assessment days run the way airlines run them, with feedback from people who used to recruit.' },
  { lead: `Finish ready to apply.`, text: 'A Level 4 certificate, a service placement on your CV, a first aid certificate, and the swim test, passport and security check done.' },
]

export const flightReasons: Reason[] = [
  { title: 'New Zealand\u2019s largest airline-crew school', text: 'Five campuses and graduates at Air New Zealand, Jetstar, Qantas, Emirates and Fiji Airways.', href: '#hired', linkLabel: 'Who hires our graduates' },
  { title: 'Half the course in the simulator', text: 'Not a classroom course about flying. A cabin, a galley, and drills until they are second nature.', href: '#like', linkLabel: 'What it\u2019s like' },
  { title: 'Built around recruiters', text: 'Every module maps to something airline recruiters ask for, and recruiters visit campus in the final fortnight.', href: '#airlines', linkLabel: 'What airlines look for' },
  { title: 'No Level 3? Still a way in', text: 'Level 3 Tourism is step one of the same journey, at the same campus, with your Flight place held.', href: '#pathway', linkLabel: 'The pathway' },
]

export const flightWays: PayWay[] = [
  { title: 'Fees Free', body: 'First year of tertiary study, New Zealand citizen or resident. A tutor does the forms with you in week one.', highlight: true },
  { title: 'StudyLink loan and living costs', body: 'If Fees Free is used up, a loan covers the fee and StudyLink can cover living costs while you study full-time.' },
  { title: 'Split payments', body: 'Spread the fee and levy over the sixteen weeks, interest free.' },
  { title: 'Pay up front', body: `Pay the $${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} and levy in full before the start date.` },
]
