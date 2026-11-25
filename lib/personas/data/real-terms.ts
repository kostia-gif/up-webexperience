import type { CostLine } from '@/components/modules/real-terms'
import type { Phase } from '@/components/modules/real-terms'
import { AIPC_COURSE } from './aipc'
import { CM, ANIM } from './yoobee'
import { FLIGHT } from './nzst'

/* AIPC */

export const aipcLike = {
  text: `Most students take two subjects at a time around a job. That is roughly 12 to 15 hours a week: recorded lectures you watch when it suits, one live online tutorial in the evening (recorded if you miss it), readings, and recorded role-plays you submit for feedback from your lecturer within a week. Five days across the whole degree are in person, at practical workshops in ${AIPC_COURSE.workshopCities.join(', ')}. Placement in your final stretch is ${AIPC_COURSE.placementHours} hours, usually a day or two a week, arranged with you by our placement team near where you live.`,
  schedule: `about 12 to 15 hours a week part-time or 25 to 30 full-time, mostly on your own time with one live evening tutorial, five in-person workshop days across the degree, and a ${AIPC_COURSE.placementHours}-hour placement at the end`,
  poster: '/images/aipc/video-poster.png',
  caption: 'Priya, 41, on a practical workshop in Brisbane and what her study week looks like. 1:48, captioned.',
}

export const aipcPhases: Phase[] = [
  {
    when: 'First six months',
    title: 'Hold a room',
    detail: 'The foundations: how to listen, how to structure a session, ethics and the law, and your own reflective practice. Your first recorded role-plays go to your lecturer in week four.',
    can: ['Run a 50-minute first session', 'Write clinical notes a supervisor can use', 'Spot risk and know what to do with it', 'Explain what counselling is and is not'],
  },
  {
    when: 'Middle six months',
    title: 'Choose your approach',
    detail: 'The major therapeutic approaches, then the one that suits you. Your first practical workshop is in this stretch: two and a half days with your cohort and tutors.',
    can: ['Work in person-centred, CBT and solution-focused ways', 'Adapt to grief, trauma and relationship work', 'Hold a group', 'Assess your own practice honestly'],
  },
  {
    when: 'Final six months',
    title: 'Practise for real',
    detail: `${AIPC_COURSE.placementHours} supervised hours in a real service, at least ${AIPC_COURSE.directClientHours} with clients, with fortnightly supervision from a practising counsellor. You finish qualified for ACA registration.`,
    can: ['Carry a small caseload', 'Use supervision well', 'Work inside an agency', 'Register with the ACA on graduation'],
  },
]

export const aipcCostLines: CostLine[] = [
  { label: 'Master of Counselling, 18 months, 10 subjects', value: '$34,650', note: 'Tuition only. $3,465 a subject.' },
  { label: 'Master of Counselling Advanced, 24 months, 14 subjects', value: '$47,250', note: 'Adds a specialisation stream and a research project.' },
  { label: 'Workshop travel and stay', value: 'about $1,500', note: `${AIPC_COURSE.workshopDays} days total. Less if one city is yours.` },
  { label: 'Placement costs', value: 'about $450', note: 'Police check, working with children check, insurance, travel.' },
  { label: 'Books and software', value: 'about $600', note: 'Most readings are supplied.' },
]

export const aipcPay = [
  { title: 'FEE-HELP', body: `Defer all tuition and repay through tax once you earn above the threshold. ${AIPC_COURSE.feeHelpWho}` },
  { title: 'Per trimester', body: 'Pay for the subjects you take each trimester as you go. Withdraw before census and there is nothing to pay for that trimester.' },
  { title: 'A mix', body: 'Pay some subjects up front and defer the rest. Change between trimesters.' },
]

export const aipcDanLike = {
  text: 'You study around your roster, not the other way round. About 12 to 15 hours a week: recorded lectures when you want them, one live evening tutorial that is recorded if a late shift gets in the way, and role-plays you record and submit. Five in-person workshop days in total, booked months ahead so you can swap shifts. Placement is where your current job helps most: up to 40 of the 200 hours can be logged in your role, with supervision.',
  schedule: 'about 12 to 15 hours a week that move with your roster, one recorded live tutorial, five workshop days booked well ahead, and placement that can partly count your current role',
}

/* Yoobee Creative Media */

export const cmPhases: Phase[] = [
  {
    when: 'By week 5',
    title: 'You have made three things',
    detail: 'A short frame-by-frame animation, a poster set and a one-shot film. Small, finished and yours. The point is to find out which one you could not put down.',
    can: ['Animate a character frame by frame', 'Set type and build a layout from a brief', 'Shoot and cut a 60-second film on a phone'],
  },
  {
    when: 'By week 12',
    title: 'You have picked a lane',
    detail: 'Design, motion or film. A bigger brief with real constraints, weekly crits with your tutor and your class, and work that starts to look like a portfolio.',
    can: ['Take a brief from a client to a finished piece', 'Give and take feedback in a crit', 'Use the Adobe tools your lane runs on'],
  },
  {
    when: 'By week 19',
    title: 'You have a portfolio and a next step',
    detail: 'A finished project, a portfolio site, and credit into a Level 5 diploma, or a start on junior work. Most people who were in a job keep it until here.',
    can: ['Show six pieces to an employer or a diploma tutor', 'Explain your process in an interview', 'Price a small freelance job'],
  },
]

export const cmCostLines: CostLine[] = [
  { label: 'Eligible domestic students, 2027', value: 'Free', note: 'Fees Free covers your first year of tertiary study. The certificate uses less than half of it.' },
  { label: 'Otherwise', value: '$4,753', note: 'Tuition $4,464.72, levy $102.50, software $186. Nothing else.' },
  { label: 'Laptop', value: 'Your own', note: 'Anything that runs Adobe apps and has a webcam. We can lend one for the course if you need it.' },
]

export const cmPay = [
  { title: 'Fees Free', body: 'New Zealand citizens and residents in their first year of tertiary study. You need a RealMe login and your NSN. We help with both.' },
  { title: 'Student loan', body: 'If Fees Free is used up, StudyLink covers the fee and can cover living costs for full-time study.' },
]

/* Yoobee Animation */

export const animLike = {
  text: `A year on campus, four days a week, eighteen to a studio. Mornings are taught: drawing, timing, modelling, rigging, depending on your stream. Afternoons are studio time with a tutor in the room. Two big projects, a film festival screening, and a studio open night where employers come to you. Campuses in ${ANIM.campuses.join(', ')}, open till 9pm.`,
  schedule: 'four days a week on campus, taught mornings and studio afternoons, two major projects and a showreel at the end',
}

export const animCostLines: CostLine[] = [
  { label: 'Eligible first-year students', value: 'Free', note: 'Fees Free covers the year.' },
  { label: 'Otherwise', value: '$8,990', note: 'Tuition and levy. Software is on the studio machines.' },
  { label: 'Drawing tablet', value: 'Optional', note: 'Wacoms are on every desk. Your own is handy for home.' },
]

/* NZST Flight */

export const flightLike = {
  text: `Sixteen weeks, Monday to Thursday, mornings or afternoons so you can keep a job. Half the time is in the cabin simulator: boarding, service, turbulence, a sick passenger, an evacuation, until it is calm and automatic. The rest is grooming and presentation, first aid, the swim test, and three mock recruitment days run the way airlines run them, with feedback from people who used to recruit. You finish with a Level 4 certificate, a service placement on your CV and a photoshoot you can use for applications.`,
  schedule: `${FLIGHT.weeks} weeks, four half-days a week, half of it in the simulator, with three mock recruitment days and a service placement`,
}

export const flightPhases: Phase[] = [
  { when: 'Weeks 1 to 4', title: 'Look and sound like crew', detail: 'Grooming, uniform standards, announcements, and your first simulator sessions. Swim test booked in week two, passport and security check started.' },
  { when: 'Weeks 5 to 12', title: 'Handle anything', detail: 'Safety and emergency procedures, first aid, service under pressure, difficult passengers. Your service placement runs through this stretch.' },
  { when: 'Weeks 13 to 16', title: 'Get recruited', detail: 'Three mock recruitment days, group assessments, one-on-one interview practice, and your graduation photoshoot. Airline recruiters visit campus in the final fortnight.' },
]

export const flightCostLines: CostLine[] = [
  { label: 'Course fee', value: `$${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}`, note: 'Fees Free covers it for most first-time students.' },
  { label: 'Student levy', value: `$${FLIGHT.levy}`, note: 'Covers student services and the graduation.' },
  { label: 'Uniform and grooming kit', value: 'about $350', note: 'Yours to keep. Needed from week two.' },
  { label: 'Swim test, passport, security check', value: 'about $280', note: 'Passport is the big one if you do not have one. We book the swim test.' },
]

export const flightPay = [
  { title: 'Fees Free', body: 'First year of tertiary study, New Zealand citizen or resident. A tutor does the forms with you in week one.' },
  { title: 'StudyLink', body: 'Living costs for full-time study, and a loan if Fees Free is used up. We answer Work and Income questions before you enrol.' },
]

export const CM_TITLE = CM.short
