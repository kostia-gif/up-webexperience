import type { Breakdown, FormalRow } from '@/components/modules/compliance'
import { creativeMediaLevel4, masterOfCounselling } from '@/lib/courses'
import { AIPC_COURSE } from './aipc'
import { FLIGHT } from './nzst'
import { ANIM } from './yoobee'

/* AIPC: subject list grouped by trimester, from the course handbook data. */

const mc = masterOfCounselling.postgrad!
const byTrimester = [1, 2, 3, 4].map((t) => ({
  label: t === 3 ? 'Trimester 3, specialisation (choose from electives)' : `Trimester ${t}`,
  when: t === 1 ? 'Months 1 to 4' : t === 2 ? 'Months 5 to 9' : t === 3 ? 'Months 10 to 14' : 'Months 15 to 18, placement',
  units: mc.units
    .filter((u) => u.trimester === t)
    .map((u) => ({ code: u.code, title: u.title, credits: 10, summary: u.summary + (u.elective ? ' Elective.' : '') })),
}))

export const aipcBreakdown: Breakdown = {
  intro: `The Master of Counselling is ${AIPC_COURSE.standard.subjects} subjects at AQF Level 9, 10 credit points each, over four trimesters part-time. The Advanced adds four subjects and a research project. Two subjects (${mc.units.filter((u) => u.residential === 'campus').map((u) => u.code).join(' and ')}) include the in-person practical workshop. Electives are chosen in trimester three.`,
  unit: 'subject',
  creditLabel: 'credit points',
  terms: byTrimester,
  note: 'Subject list is from the current handbook and is shown for structure. The 2027 handbook confirms which subjects form the 10-subject Master and the 14-subject Advanced.',
}

export const aipcFormal: FormalRow[] = [
  ['Qualification', 'Master of Counselling (AQF Level 9)'],
  ['Provider', `${mc.provider.legalName}, TEQSA ${mc.provider.teqsa}`],
  ['Accreditation', 'Australian Counselling Association (course accreditation)'],
  ['Length', `${AIPC_COURSE.standard.months} months part-time (${AIPC_COURSE.standard.subjects} subjects) or ${AIPC_COURSE.advanced.months} months Advanced (${AIPC_COURSE.advanced.subjects} subjects)`],
  ['Delivery', `Online, with ${AIPC_COURSE.workshopDays} in-person workshop days in ${AIPC_COURSE.workshopCities.join(', ')}`],
  ['Placement', `${AIPC_COURSE.placementHours} hours, at least ${AIPC_COURSE.directClientHours} hours direct client contact, supervised`],
  ['Intakes, 2027', AIPC_COURSE.intakes.join(', ')],
  ['Entry', 'A bachelor degree in any discipline from a recognised institution, or equivalent'],
  ['Credit', 'Up to four subjects by recognition of prior learning or credit transfer, assessed after enrolment'],
  ['Tuition, 2027', `$${AIPC_COURSE.standard.tuition.toLocaleString('en-AU')} (Master) or $${AIPC_COURSE.advanced.tuition.toLocaleString('en-AU')} (Advanced), per-subject billing, no GST`],
  ['FEE-HELP', AIPC_COURSE.feeHelpWho],
  ['Census', 'End of week two each trimester. Withdraw before census and no fee or FEE-HELP debt is incurred for that trimester.'],
]

export const aipcLinks: [string, string][] = [
  ['Course handbook', '#structure'],
  ['Fees, refunds and census dates', '#formal'],
  ['Student support', '#formal'],
  ['Recognition of prior learning policy', '#formal'],
]

/* Yoobee Creative Media: from the course data. */

const cm = creativeMediaLevel4

export const cmBreakdown: Breakdown = {
  intro: cm.structure!.intro,
  unit: 'module',
  creditLabel: 'credits',
  terms: cm.structure!.terms.map((t) => ({
    label: t.label,
    when: t.weeks,
    units: t.modules.map((m) => ({ code: m.code, title: m.title, credits: m.credits, summary: m.summary, learn: m.learn, assessment: m.assessment })),
  })),
  note: cm.structure!.note,
}

export const cmFormal: FormalRow[] = [
  ['Qualification', cm.title],
  ['Level and credits', `Level ${cm.formal.level}, ${cm.formal.credits} credits (${cm.funding.efts} EFTS)`],
  ['Length', `${cm.funding.weeks} weeks full-time, or 38 weeks part-time`],
  ['Delivered by', cm.brand.legalName],
  ['Where', cm.formal.campuses.join(', ')],
  [`Intakes, ${cm.formal.intakesYear}`, cm.formal.intakesLabel],
  ['Entry, domestic', `${cm.entry.minAge}+ at start, and ${cm.entry.backgrounds.slice(0, -1).join(', or ')}`],
  ['Entry, international', `${cm.formal.intl.minAge}+, IELTS ${cm.formal.intl.ielts}`],
  ['Domestic fee, 2027', cm.fee.freeNote ?? ''],
  ['Funding', cm.funding.loanApproved ? 'Approved for StudyLink student loans and allowances' : 'Not approved for StudyLink'],
]

export const cmLinks: [string, string][] = [
  ['Programme structure', '#structure'],
  ['Fees, refunds and withdrawal', '#formal'],
  ['Student support and wellbeing', '#formal'],
  ['How to enrol', '#advisor'],
]

/* Yoobee Diploma in Animation: placeholder structure pending the programme document. */

export const animBreakdown: Breakdown = {
  intro: 'Eight modules over one year, 120 credits at Level 5. Two streams run side by side: a craft stream in your specialism and a production stream where the whole studio makes work together. Every module ends in a piece for your showreel.',
  unit: 'module',
  creditLabel: 'credits',
  terms: [
    {
      label: 'Term 1',
      when: 'Weeks 1 to 10',
      units: [
        { code: 'AN501', title: 'Drawing and visual language', credits: 15, summary: 'Observation, gesture, form and light. The foundation under every stream.' },
        { code: 'AN502', title: 'Principles of animation', credits: 15, summary: 'Timing, spacing, weight and appeal, in 2D and 3D.' },
      ],
    },
    {
      label: 'Term 2',
      when: 'Weeks 11 to 20',
      units: [
        { code: 'AN511', title: 'Specialism studio I', credits: 15, summary: 'Characters, environments, 2D or 3D. Your first stream project.' },
        { code: 'AN512', title: 'Story and pre-production', credits: 15, summary: 'Script, boards, animatic and design for the studio project.' },
      ],
    },
    {
      label: 'Term 3',
      when: 'Weeks 21 to 30',
      units: [
        { code: 'AN521', title: 'Specialism studio II', credits: 15, summary: 'Deeper into your stream, to a professional standard.' },
        { code: 'AN522', title: 'Studio production', credits: 15, summary: 'The whole studio makes one short. Roles, pipeline and deadlines.' },
      ],
    },
    {
      label: 'Term 4',
      when: 'Weeks 31 to 40',
      units: [
        { code: 'AN531', title: 'Showreel and industry', credits: 15, summary: 'Cut the reel, build the portfolio, meet the studios at open night.' },
        { code: 'AN532', title: 'Independent project', credits: 15, summary: 'One piece that is entirely yours, with a tutor as producer.' },
      ],
    },
  ],
  note: 'Module names, codes and credits are placeholders until Yoobee supplies the programme document.',
}

export const animFormal: FormalRow[] = [
  ['Qualification', 'New Zealand Diploma in Animation (Level 5)'],
  ['Level and credits', 'Level 5, 120 credits (1.0 EFTS)'],
  ['Length', '1 year, full-time, 40 teaching weeks'],
  ['Delivered by', 'Yoobee College of Creative Innovation'],
  ['Campuses', ANIM.campuses.join(', ')],
  ['Intakes, 2027', ANIM.intakes.join(' and ')],
  ['Entry, domestic', '17+ at start, NCEA Level 2 or equivalent, or a portfolio and interview'],
  ['Entry, international', '18+, IELTS 5.5 (no band under 5)'],
  ['Domestic fee, 2027', 'Fees Free for eligible first-year students, otherwise $8,990 incl. GST (placeholder)'],
  ['Funding', 'Approved for StudyLink student loans and allowances'],
]

export const animLinks: [string, string][] = [
  ['Programme structure', '#structure'],
  ['Fees, refunds and withdrawal', '#formal'],
  ['Student support and wellbeing', '#formal'],
  ['How to enrol', '#visit'],
]

/* NZST Flight Attending: placeholder structure pending the programme document. */

export const flightBreakdown: Breakdown = {
  intro: `Six modules over ${FLIGHT.weeks} weeks, 60 credits at Level 4. Half the course hours are in the cabin simulator. All modules must be passed, and the swim test, first aid certificate and security clearance are course requirements.`,
  unit: 'module',
  creditLabel: 'credits',
  terms: [
    {
      label: 'Block 1',
      when: 'Weeks 1 to 4',
      units: [
        { code: 'FA401', title: 'The aviation industry and the cabin crew role', credits: 10, summary: 'Airlines, regulators, aircraft types and what the job is actually like.' },
        { code: 'FA402', title: 'Presentation, grooming and communication', credits: 10, summary: 'Airline grooming standards, announcements and speaking to a cabin.' },
      ],
    },
    {
      label: 'Block 2',
      when: 'Weeks 5 to 12',
      units: [
        { code: 'FA403', title: 'Safety and emergency procedures', credits: 15, summary: 'Evacuation, fire, decompression, ditching and first aid, in the simulator and the pool.' },
        { code: 'FA404', title: 'Customer service in the cabin', credits: 10, summary: 'Service flows, special needs passengers, conflict and complaints.' },
      ],
    },
    {
      label: 'Block 3',
      when: 'Weeks 13 to 16',
      units: [
        { code: 'FA405', title: 'Airline recruitment and assessment', credits: 10, summary: 'Applications, group assessments and interviews, run as airlines run them.' },
        { code: 'FA406', title: 'Service placement', credits: 5, summary: 'Supervised hours with an airline, airport or hospitality partner.' },
      ],
    },
  ],
  note: 'Module names, codes and credits are placeholders until NZST supplies the programme document.',
}

export const flightFormal: FormalRow[] = [
  ['Qualification', FLIGHT.title],
  ['Level and credits', 'Level 4, 60 credits (0.5 EFTS)'],
  ['Length', `${FLIGHT.weeks} weeks, full-time`],
  ['Delivered by', 'New Zealand School of Tourism, part of UP Education'],
  ['Campuses', FLIGHT.campuses.join(', ')],
  ['Intakes, 2027', FLIGHT.intakes.join(' and ')],
  ['Classes', 'Morning or afternoon, Monday to Thursday'],
  ['Entry, domestic', '16+ at start, NCEA Level 2 or equivalent, or special admission. No Level 3? Level 3 Tourism leads directly into this course.'],
  ['Course requirements', 'Swim test (50 m and tread water), valid passport, Aviation Security clearance, first aid certificate (gained in course)'],
  ['Domestic fee, 2027', `$${FLIGHT.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} incl. GST, plus $${FLIGHT.levy} student services levy`],
  ['Funding', 'Approved for StudyLink student loans and allowances. Fees Free for eligible students.'],
]

export const flightLinks: [string, string][] = [
  ['Programme structure', '#structure'],
  ['Fees, refunds and withdrawal', '#formal'],
  ['Learner support', '#formal'],
  ['How to enrol', '#start'],
]
