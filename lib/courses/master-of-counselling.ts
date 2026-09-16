import type { Brand, Course, PostgradLevel, PostgradUnit } from '@/lib/course'
import { masterOfCounsellingInternational } from './master-of-counselling-international'

export const aipc: Brand = {
  id: 'aipc',
  name: 'AIPC',
  legalName: 'Australian Institute of Professional Counsellors',
  country: 'AU',
  currency: 'AUD',
  logo: { src: '/images/aipc/logo.svg', alt: 'AIPC', width: 157, height: 64 },
  banner: {
    text: 'Trimester 1, 2027 applications are open. Places are limited by placement capacity.',
    linkLabel: 'Book a 15-minute call with a course specialist.',
    href: '#specialist',
  },
  nav: [
    { label: 'Courses', href: '/courses', current: true },
    { label: 'Counselling', href: '#' },
    { label: 'Community Services', href: '#' },
    { label: 'Why AIPC', href: '#why' },
    { label: 'Contact', href: '#specialist' },
  ],
  enrolHref: '#apply',
  enrolLabel: 'Apply now',
  phone: '1800 570 511',
  footerBlurb:
    'Australian Institute of Professional Counsellors. Specialists in counselling education since 1990. A registered higher education provider, online across Australia with residential schools in Brisbane, Sydney, Melbourne and Perth.',
  footerCols: [
    { h: 'Courses', links: ['Diploma of Counselling', 'Bachelor of Counselling', 'Graduate Diploma of Counselling', 'Master of Counselling', 'Short courses'] },
    { h: 'Study with us', links: ['FEE-HELP', 'Recognition of prior learning', 'Residential schools', 'Student support', 'Policies'] },
    { h: 'About', links: ['Why AIPC', 'Accreditation', 'Academic Board', 'Careers', 'Contact'] },
  ],
  themeColor: '#2d388e',
}

const units: PostgradUnit[] = [
  {
    code: 'MC01',
    title: 'Introduction to Counselling',
    trimester: 1,
    eftsl: 0.125,
    summary:
      'Counselling as a profession, a trans-theoretical framework, the therapeutic relationship, culturally diverse practice and the ethics that hold it all together.',
  },
  {
    code: 'MC02',
    title: 'Counselling Process and Skills I',
    trimester: 1,
    eftsl: 0.125,
    residential: 'campus',
    summary:
      'The stages every approach shares: building the relationship, clarifying concerns, setting goals, intervening, ending well. Practised in supervised role-plays.',
  },
  {
    code: 'MC03',
    title: 'Counselling Process and Skills II',
    trimester: 1,
    eftsl: 0.125,
    residential: 'campus',
    summary: 'The foundational practical skills, demonstrated and integrated into a full counselling session under supervision.',
  },
  {
    code: 'MC04',
    title: 'Ethics and Reflective Practice',
    trimester: 1,
    eftsl: 0.125,
    summary:
      'Ethical principles and dilemmas: confidentiality, client rights, dual relationships, values conflicts. Reflective practice and the role of supervision.',
  },
  {
    code: 'MC05',
    title: 'Counselling and Human Development',
    trimester: 2,
    eftsl: 0.125,
    summary: 'Development across the lifespan, what typically occurs and what happens when it is impaired or delayed, applied to cases.',
  },
  {
    code: 'MC06',
    title: 'Cognitive Behavioural Approaches',
    trimester: 2,
    eftsl: 0.125,
    residential: 'online',
    summary: 'Theory, process and technique of the CBT family, used in sessions and compared for strengths, weaknesses and fit.',
  },
  {
    code: 'MC07',
    title: 'Collaborative and Contemporary Approaches',
    trimester: 2,
    eftsl: 0.125,
    residential: 'online',
    summary: 'Solution-focused, narrative and other competency-based approaches, used in sessions and critically compared.',
  },
  {
    code: 'MC08',
    title: 'Therapeutic Planning and Process',
    trimester: 2,
    eftsl: 0.125,
    summary:
      'Assessment and case conceptualisation. Knowing what belongs in counselling and what needs referral, and planning treatment from multiple theoretical lenses.',
  },
  {
    code: 'MC09',
    title: 'Research Methods in Counselling',
    trimester: 3,
    eftsl: 0.25,
    summary:
      'A double unit. Quantitative and qualitative methods for practice, basic statistics, and the narrative and single-case designs you may use in your capstone.',
  },
  {
    code: 'MC10',
    title: 'Counselling Placement and Capstone Project',
    trimester: 4,
    eftsl: 0.25,
    summary:
      'A double unit. 168 hours of supervised placement including 12 hours of agency supervision, and a capstone project that integrates the whole degree.',
  },
  { code: 'MC11', title: 'Counselling Interventions for Crisis and Trauma', trimester: 3, eftsl: 0.125, elective: true, summary: 'Immediate and long-term trauma interventions, diverse populations, and vicarious traumatisation.' },
  { code: 'MC12', title: 'Family Therapy', trimester: 3, eftsl: 0.125, elective: true, summary: 'Family dynamics and diversity, and the specific skills of contemporary family therapy practice.' },
  { code: 'MC13', title: 'Counselling Children and Adolescents', trimester: 3, eftsl: 0.125, elective: true, summary: 'Behaviour, family conflict, self-harm, identity, abuse and school issues, with the ethical and legal responses each demands.' },
  { code: 'MC14', title: 'Counselling for Alcohol and Other Drugs', trimester: 3, eftsl: 0.125, elective: true, summary: 'Theories of addiction, motivational interviewing and relapse prevention across social, biological and psychological factors.' },
  { code: 'MC15', title: 'Counselling for Loss and Grief', trimester: 3, eftsl: 0.125, elective: true, summary: 'Models of grieving, and assessing and responding to complicated and traumatic grief.' },
  { code: 'MC16', title: 'Counselling for Couples', trimester: 3, eftsl: 0.125, elective: true, summary: 'Relationship dynamics including conflict, violence and abuse, and the practical skills of couples work.' },
  { code: 'MC17', title: 'Counselling Skills for the Digital World', trimester: 3, eftsl: 0.125, elective: true, summary: 'Delivering effective, ethical counselling online: boundaries, privacy, security and platform practice.' },
  { code: 'MC18', title: 'Mental Health Counselling', trimester: 3, eftsl: 0.125, elective: true, summary: 'Mental health presentations, support options and referral pathways, through a recovery and lived-experience lens.' },
]

const levels: PostgradLevel[] = [
  {
    n: 1,
    label: 'Level 1',
    when: 'Trimester 1',
    units: ['MC01', 'MC02', 'MC03', 'MC04'],
    title: 'Hold a room',
    skills: [
      'Build a therapeutic relationship and run a full initial session under supervision',
      'Clarify a client’s concerns, set goals and close a session well',
      'Reason through an ethical dilemma using a recognised framework, and know when to seek supervision',
    ],
    unlocks: 'First residential school, 2.5 days on campus in Brisbane, Sydney, Melbourne or Perth',
  },
  {
    n: 2,
    label: 'Level 2',
    when: 'Trimester 2',
    units: ['MC05', 'MC06', 'MC07', 'MC08'],
    title: 'Choose your approach',
    skills: [
      'Deliver cognitive behavioural and solution-focused interventions, and explain why you chose each',
      'Assess a case, decide what belongs in counselling and what needs referral, and plan treatment',
      'Read a presenting issue against normal lifespan development',
    ],
    unlocks: 'Midpoint of the degree: 8 of 14 units, all core practice skills in place',
  },
  {
    n: 3,
    label: 'Level 3',
    when: 'Trimester 3',
    units: ['MC09'],
    electivePick: 4,
    note: 'Four specialisations you choose, two here and two in Trimester 4',
    title: 'Specialise',
    skills: [
      'Pick four specialisations from eight and practise at depth in each',
      'Read, critique and design counselling research, and use it in your own practice',
      'Prepare a capstone plan that ties your specialisations to the placement ahead',
    ],
    unlocks: 'Your placement agency is confirmed with our placement team',
  },
  {
    n: 4,
    label: 'Level 4',
    when: 'Trimester 4',
    units: ['MC10'],
    note: 'Plus your final two specialisations',
    title: 'Practise for real',
    skills: [
      'Carry a caseload for 168 supervised hours in a real agency, with 12 hours of agency supervision',
      'Deliver a capstone project: a case study, service evaluation or piece of industry research',
      'Reflect on your own practice to the standard a registering body expects',
    ],
    unlocks: 'Master of Counselling conferred. You qualify for Australian Counselling Association membership.',
    image: { src: '/images/aipc/placement.png', alt: 'A trainee counsellor listens to a client in a community health counselling room' },
  },
]

const electiveUnits = units.filter((u) => u.elective)

export const masterOfCounselling: Course = {
  id: 'aipc-master-counselling',
  brand: aipc,
  deliveredBy: 'Australian Institute of Professional Counsellors',
  discipline: 'Counselling',
  disciplineSlug: 'counselling',
  title: 'Master of Counselling',
  slug: 'master-of-counselling',
  delivery: 'online',
  copy: {
    heroTry: 'Apply for a place',
    heroTryHref: '#apply',
    feeSub: '14 units. FEE-HELP approved, nothing to pay upfront if eligible.',
    promise: 'Census Date Guarantee: withdraw from a unit before its census date and you pay nothing for it.',
    likeTitle: 'A Tuesday evening, after the kids are down',
    likeVideoLabel: 'Play video: a current student describes a study week, captioned',
    kitTitle: '',
    kitStep: '',
    skillsTitle: 'What you can do at each level, and what it means to an employer',
    jobNoun: 'counselling practice or a related role',
    coach: {
      name: 'AIPC Course Advisor',
      initials: 'CA',
      industry: 'counselling, mental health and community services in Australia',
      placeholder: 'Ask about entry, credit, FEE-HELP, placement or how this compares',
      greeting:
        "Hello. I can help you work out whether the Master of Counselling fits your background and your life, and what it leads to. Where are you starting from: a degree in another field, already in a helping role, or coming back to study after a break?",
      starters: [
        'How does this compare to a university masters?',
        'I have a nursing degree. Am I eligible, and would I get credit?',
        'Can I keep working full-time and study part-time?',
        'What does FEE-HELP actually mean for me?',
      ],
      tryLabel: 'Book a call with a course specialist',
      tryHref: '#specialist',
    },
  },
  hero: {
    h1: 'Become a registered counsellor,',
    h1Accent: 'on your terms',
    sub: 'An industry-accredited Master of Counselling from Australia’s counselling specialists. Online, full-time or part-time, with any bachelor degree, for around a third less than a university.',
    image: '/images/aipc/hero-evening-study.png',
    imageAlt: 'A woman in her late thirties studies a live online counselling seminar at her dining table in the evening',
  },
  fee: {
    year: 2027,
    amount: 44850,
    includes: 'Online library, learning portal and residential school tuition included',
    gstInclusive: false,
  },
  funding: {
    loanApproved: true,
    efts: 2.0,
    weeks: 104,
    fullTime: true,
    applyBy: '2027-02-19',
    applyByLabel: '19 Feb 2027',
    courseRelatedCosts: 0,
    livingCostsMax: 0,
  },
  outcomes: {
    stat: { label: 'In counselling practice or a related role within 12 months', value: '81%', cohort: 2025 },
    salary: { start: 74000, threeYear: 96000, source: 'Jobs and Skills Australia occupation profile, Counsellors', year: 2025 },
    employers: ['Relationships Australia', 'Lifeline', 'headspace', 'Anglicare', 'Uniting', 'Private practice'],
    employersMore: 60,
    employersYear: 2025,
    story: {
      initials: 'DM',
      text: 'I was a primary teacher for twelve years. I did the Master part-time over four years while I kept teaching, got credit for nothing but did not need to, and my placement at a school wellbeing service turned into my job.',
      course: 'Master of Counselling',
      campus: 'Online, residentials in Melbourne',
      year: 2025,
      consent: true,
    },
  },
  quick: {
    nextStart: '1 Mar 2027',
    length: '2 years full-time',
    where: 'Online, 5 campus days',
    need: 'Any bachelor degree',
    get: 'Master of Counselling',
  },
  like: {
    video: null,
    videoPoster: '/images/aipc/video-poster.png',
    videoCaption: 'Priya, 41, on a residential school in Brisbane and what her study week looks like. 1:48, captioned.',
    text: 'Most students study two units a trimester around a job. That is roughly 20 hours a week: recorded lectures you watch when it suits, one live online tutorial a week in the evening, readings, and recorded role-plays you submit for feedback from your lecturer within a week. Full-time is four units and about 40 hours. Twice in the degree you attend a residential school, 2.5 days on campus each for the skills units, plus two 5-day online intensives for the approaches units. Placement in your final trimester is 168 hours, usually two days a week, arranged with our placement team near where you live.',
    schedule:
      'about 20 hours a week part-time (two units a trimester) or 40 hours full-time (four units), mostly asynchronous with one live evening tutorial a week, plus 5 on-campus and 10 online residential days across the degree, and a 168-hour placement in the final trimester',
  },
  postgrad: {
    provider: { legalName: 'Australian Institute of Professional Counsellors Pty Ltd', teqsa: 'PRV12140 (placeholder)', aqf: 9, since: 1990 },
    structure: { totalUnits: 14, electivesRequired: 4 },
    international: masterOfCounsellingInternational,
    accreditations: [
      { body: 'Australian Counselling Association', short: 'ACA accredited', what: 'Industry accredited. Graduates automatically qualify for ACA membership and registration.' },
      { body: 'TEQSA', short: 'Registered HE provider', what: 'Registered with the Tertiary Education Quality and Standards Agency, the national regulator.' },
      { body: 'FEE-HELP', short: 'FEE-HELP approved', what: 'Eligible students can defer 100% of tuition through the Australian Government loan scheme.' },
    ],
    fees: {
      perUnit: 2990,
      total: 44850,
      majorUnits: [
        { code: 'MC09', fee: 4485 },
        { code: 'MC10', fee: 4485 },
      ],
      feeHelpThreshold: 67000,
      unitsPerTrimester: { fullTime: 4, partTime: 2 },
    },
    comparison: [
      { label: 'Total tuition', us: '$44,850', uni: '$62,000 to $78,000' },
      { label: 'Entry', us: 'Any bachelor degree', uni: 'Related degree, often an interview' },
      { label: 'Intakes a year', us: 'Four: March, May, July, November', uni: 'One or two' },
      { label: 'Pace', us: 'Full-time or part-time, change between them', uni: 'Fixed at enrolment' },
      { label: 'Where', us: 'Online, 5 days on campus in total', uni: 'On campus or blended, weekly' },
      { label: 'Accreditation', us: 'ACA', uni: 'ACA or PACFA' },
      { label: 'Focus', us: 'Counselling only, since 1990', uni: 'One faculty of many' },
    ],
    comparisonNote:
      'University figures are indicative 2026 domestic fee ranges for two-year Master of Counselling programs at Australian universities, placeholder pending sourced data. Check each provider.',
    units,
    levels,
    residential: { totalDays: 15, campusDays: 5, onlineDays: 10, cities: ['Brisbane', 'Sydney', 'Melbourne', 'Perth'], allowancePerDay: 300 },
    rpl: {
      max: 4,
      auto: [
        { from: 'AIPC Bachelor of Counselling', units: ['MC01', 'MC02', 'MC03', 'MC05'] },
        { from: 'AIPC Graduate Diploma of Relationship Counselling', units: ['MC02', 'MC03', 'MC16'] },
        { from: 'AIPC Graduate Diploma of Counselling', units: ['One elective, matched to your specialty stream'] },
      ],
      transfer:
        'A counselling degree from another provider, or a bachelor degree with a counselling major of eight or more subjects, can be assessed for credit transfer of up to four units. Study more than ten years old needs evidence of continued relevance.',
      experience:
        'Several years working in a counselling environment can be recognised through RPL for one or more units, up to the same cap of four. We assess authenticity, currency, quality, relevance and transferability.',
      evidence: ['Certified copy of your qualification and academic transcript', 'Unit outlines for any subjects you want assessed', 'For RPL: a CV, position descriptions and a supervisor or employer reference'],
    },
    intakes: [
      { id: 't1-2027', label: 'Trimester 1, 2027', start: '1 Mar 2027', census: '17 Mar 2027', residential: '11 to 23 May 2027', applyBy: '19 Feb 2027', left: 14, capacity: 40 },
      { id: 'may-2027', label: 'May intake, 2027', start: '3 May 2027', census: '19 May 2027', residential: 'Joins Trimester 2 residential', applyBy: '23 Apr 2027', left: 22, capacity: 30, earlybirdDays: 9 },
      { id: 't2-2027', label: 'Trimester 2, 2027', start: '5 Jul 2027', census: '21 Jul 2027', residential: '13 to 26 Sep 2027', applyBy: '25 Jun 2027', left: 40, capacity: 40 },
      { id: 't3-2027', label: 'Trimester 3, 2027', start: '1 Nov 2027', census: '19 Nov 2027', residential: '17 to 30 Jan 2028', applyBy: '22 Oct 2027', left: 40, capacity: 40 },
    ],
    specialist: {
      blurb:
        'Course specialists are AIPC staff, not a call centre. Most have studied with us. They will look at your transcript for credit, walk through FEE-HELP for your situation, and help you pick a pace and an intake. No pressure, no script.',
      covers: ['Whether your degree and experience qualify, and for how much credit', 'FEE-HELP eligibility, repayments and the census guarantee', 'Full-time versus part-time around your work and family', 'How placement is arranged near you'],
      slots: [
        { when: 'Tue 15 Sep, 12:30pm AEST', left: 2 },
        { when: 'Tue 15 Sep, 6:00pm AEST', left: 1 },
        { when: 'Wed 16 Sep, 10:00am AEST', left: 4 },
        { when: 'Thu 17 Sep, 7:30pm AEST', left: 3 },
        { when: 'Sat 19 Sep, 9:00am AEST', left: 5 },
      ],
      phone: '1800 570 511',
      hours: 'Weekdays 8am to 6pm, Saturdays 9am to 1pm AEST',
    },
    paymentOptions: [
      { title: 'FEE-HELP', body: 'Defer 100% of tuition. Nothing upfront. Repay through the tax system once you earn above the threshold. No loan fee on postgraduate study.' },
      { title: 'Pay per trimester', body: 'Pay only for the units you are enrolled in that trimester, by card or direct debit, usually within two weeks of the start.' },
      { title: 'Split', body: 'Pay part of each trimester yourself and defer the rest through FEE-HELP. Change the split each trimester.' },
    ],
    marketDemand: {
      eyebrow: 'Why now',
      title: 'A profession the country is short of',
      intro:
        'Demand for mental health support in Australia has outrun the workforce that provides it. Qualifying as a registered counsellor puts you into a field that is growing, undersupplied and paid accordingly.',
      stats: [
        { value: '1 in 5', label: 'Australian adults experienced a mental disorder in the past 12 months', source: 'ABS National Study of Mental Health and Wellbeing, 2020–22' },
        { value: '+19%', label: 'Projected growth in counsellor and psychotherapist roles over the next decade', source: 'Jobs and Skills Australia employment projections (placeholder pending sourced data)' },
        { value: '47%', label: 'Of Australians with a mental health condition access professional support in a year', source: 'ABS, 2022 (placeholder pending sourced data)' },
        { value: '$96K', label: 'Typical salary for an experienced counsellor, around three years in', source: 'Jobs and Skills Australia occupation profile, 2025' },
      ],
    },
    pathwayLadder: {
      eyebrow: 'A stackable qualification',
      title: 'Start small, or go all the way',
      intro:
        'The Master is built from three nested awards. Enrol in the one that fits now. Every unit you complete counts toward the next, so you can upskill quickly and decide later how far to take it.',
      safetyNote:
        'Each qualification is a full, recognised award in its own right. If life changes, you can step off with a credential in hand rather than nothing, and pick up where you left off when you are ready.',
      rungs: [
        {
          award: 'Graduate Certificate in Counselling',
          unitCount: 4,
          duration: 'About 8 months part-time',
          gets: 'The foundations: the therapeutic relationship, core counselling skills, and the ethics that hold practice together. A recognised credential you can stop at.',
          roles: ['Peer support worker', 'Wellbeing officer', 'Community services assistant'],
        },
        {
          award: 'Graduate Diploma in Counselling',
          unitCount: 8,
          duration: 'About 1 year more, part-time',
          gets: 'Adds cognitive behavioural and contemporary approaches, human development and case planning. Exit here with a practitioner-level qualification.',
          roles: ['Counselling support worker', 'Case worker', 'Youth or family support worker'],
        },
        {
          award: 'Master of Counselling',
          unitCount: 14,
          duration: 'About 2 years full-time',
          gets: 'Four specialisations you choose, a 168-hour supervised placement and a capstone. Qualifies you for ACA registration and independent practice.',
          roles: ['Registered counsellor', 'Private practice counsellor', 'Clinical team lead'],
          isTarget: true,
        },
      ],
    },
    careerLadder: {
      eyebrow: 'Where it takes you',
      title: 'The years after you graduate',
      intro:
        'Registration is the start line, not the finish. Here is the trajectory our graduates typically follow, and what the pay looks like along the way.',
      note: 'Salary bands are indicative, drawn from Jobs and Skills Australia and AIPC graduate reporting. Private practice earnings vary with caseload. Placeholder pending fully sourced data.',
      tiers: [
        { when: 'On graduation', role: 'Provisional or registered counsellor', settings: 'Relationships Australia, headspace, Anglicare, Lifeline', band: '$70K–$78K' },
        { when: '2 to 4 years', role: 'Registered counsellor with a growing caseload', settings: 'Community health, EAP providers, school wellbeing services', band: '$85K–$96K' },
        { when: '5 years and beyond', role: 'Senior counsellor or private practice', settings: 'Your own practice, clinical supervision of others', band: '$100K–$130K+' },
        { when: 'Later career', role: 'Team lead or service manager', settings: 'Program and service leadership in the sector', band: '$130K+' },
      ],
    },
    academicLead: {
      name: 'Dr Helen Whitmore',
      role: 'Program Director, Master of Counselling',
      credentials: 'PhD, MAppSc (Counselling), Clinical Member ACA',
      years: 30,
      photo: { src: '/images/aipc/program-director.png', alt: 'Dr Helen Whitmore, Program Director of the Master of Counselling, in her office' },
      bio: 'Helen has practised, supervised and taught counselling for three decades, from community mental health to private practice. She led the redesign of AIPC’s postgraduate curriculum around real client work and supervised placement.',
      quote:
        'You don’t learn to counsel by reading about it. Every unit we teach has to land in a room with a real person in front of you. That’s why placement and supervision sit at the centre of this degree, not tacked on at the end.',
    },
    studyRhythm: {
      eyebrow: 'Your study rhythm',
      title: 'What a trimester actually looks like',
      intro:
        'The degree runs in 12-week trimesters, two a year. Most students take two units a trimester around a job, with one live evening tutorial a week and the rest on your own time.',
      weeks: 12,
      perBlock: 'Two units part-time, four full-time',
      phases: [
        { span: 'Weeks 1–2', label: 'Settle in', detail: 'Meet your cohort and lecturer and get your first readings. Census date falls at the end of week 2, so there is nothing to pay if you step away before it.' },
        { span: 'Weeks 3–8', label: 'Core teaching', detail: 'One live evening tutorial a week, recorded lectures when it suits you, and role-plays you submit for lecturer feedback within a week.' },
        { span: 'Weeks 9–10', label: 'Residential or intensive', detail: 'A 2.5-day campus school or a 5-day online intensive for your skills and approaches units. Twice across the whole degree on campus.' },
        { span: 'Weeks 11–12', label: 'Assessment', detail: 'Pull it together in your assignments, then a short break before the next block begins.' },
      ],
    },
    programGuide: {
      eyebrow: 'Program guide',
      title: 'Get the full Master of Counselling guide',
      blurb: 'We will email you the complete guide as a PDF. It is the whole picture in one place, so you can read it properly and share it with whoever you talk decisions over with.',
      contents: [
        'The full unit-by-unit curriculum and all eight specialisations',
        'A trimester-by-trimester study plan for full-time and part-time',
        'Fees, FEE-HELP and the Census Date Guarantee explained plainly',
        'How credit and RPL are assessed for your background',
        'Residential schools, placement and the support around you',
      ],
      fileLabel: 'PDF, 24 pages',
    },
    censusGuarantee:
      'Every unit has a census date about two weeks after the trimester starts. Withdraw before it, through the formal process, and you are not charged for that unit and incur no FEE-HELP debt. Zero risk to try a trimester.',
  },
  stages: levels.map((l) => ({
    label: `${l.label} · ${l.when}`,
    items: l.skills.map((s) => ({ can: s, means: l.title })),
  })),
  entry: {
    minAge: 18,
    backgrounds: ['A bachelor degree in any field', 'AIPC Bachelor of Counselling', 'A counselling degree or major from another provider', 'An AIPC Graduate Diploma', 'No degree yet'],
    fallback: {
      label: 'the Bachelor of Counselling',
      weeks: 156,
      href: '#specialist',
      note: 'Without a bachelor degree, the Bachelor of Counselling is the pathway, and a Diploma of Counselling gives credit into it. Graduates of our Bachelor then receive automatic credit for four Master units. A course specialist can map the route for you.',
    },
  },
  intakes: [
    { date: '2027-03-01', label: 'Trimester 1, 2027', campuses: [{ name: 'Online, Australia-wide', left: 14 }] },
    { date: '2027-05-03', label: 'May 2027', campuses: [{ name: 'Online, Australia-wide', left: 22 }] },
    { date: '2027-07-05', label: 'Trimester 2, 2027', campuses: [{ name: 'Online, Australia-wide', left: 40 }] },
    { date: '2027-11-01', label: 'Trimester 3, 2027', campuses: [{ name: 'Online, Australia-wide', left: 40 }] },
  ],
  pathways: {
    work: 'Registered counsellor in private practice, community health, schools, employee assistance, relationship services or telehealth. Also a recognised adjunct qualification for teachers, nurses, ministers and corrections staff.',
    next: 'ACA membership on graduation, with supervised hours toward higher ACA levels. Graduates progress to clinical supervision, service leadership or research.',
    before: 'No bachelor degree yet? The Bachelor of Counselling is the route, and it credits four units into this Master.',
  },
  faqs: [
    {
      q: 'How does this compare to a Master of Counselling at a university?',
      a: 'Same AQF level 9 qualification, same ACA industry accreditation, the same 168-hour placement requirement. The differences are the price (indicatively a third less), that any bachelor degree qualifies you, four intakes a year instead of one or two, and that you can move between full-time and part-time. The trade-off is that we are a specialist institute, not a multi-faculty university with a campus life.',
    },
    {
      q: 'What does FEE-HELP actually mean for me?',
      a: 'If you are an Australian citizen, or hold a permanent humanitarian visa, you can defer all of your tuition to a Commonwealth loan. You pay nothing upfront. Repayments start through your tax return only once your income is above the threshold, about $67,000 in 2026-27, at a percentage of income. There is no loan fee on postgraduate FEE-HELP. Withdraw before a census date and no debt is incurred for that unit.',
    },
    {
      q: 'Can I keep working?',
      a: 'Most of our students do. Part-time is two units a trimester, about 20 hours a week, with one live evening tutorial. You can go full-time for a trimester when life allows and back again. Placement in the final trimester needs about two days a week for a trimester, which most students negotiate as leave or a temporary change in hours.',
    },
    {
      q: 'How much time do I spend on campus?',
      a: 'Five days across the whole degree: two residential schools of 2.5 days each for the skills units, at our rooms in Brisbane, Sydney, Melbourne or Perth. The two approaches units run 5-day online intensives. Travel and accommodation for on-campus days are at your cost; allow about $300 a day if you travel interstate.',
    },
    {
      q: 'What credit can I get?',
      a: 'Up to four of the fourteen units. Graduates of the AIPC Bachelor of Counselling receive four automatically. A counselling degree or major from elsewhere can be assessed for credit transfer. Several years of counselling work can be recognised through RPL. Every unit credited is a unit you do not pay for, so four units is $11,960 off and one trimester shorter.',
    },
    {
      q: 'Is ACA the right accreditation?',
      a: 'The Australian Counselling Association is the largest registration body for counsellors in Australia. Graduates qualify for membership, which most employers and private health funds recognise. If you specifically need PACFA registration for a role, talk to a course specialist before you apply.',
    },
  ],
  formal: {
    level: 9,
    credits: 96,
    campuses: ['Online', 'Residential schools in Brisbane, Sydney, Melbourne and Perth'],
    intakesYear: 2027,
    intakesLabel: 'Trimester 1 (1 Mar), May (3 May), Trimester 2 (5 Jul), Trimester 3 (1 Nov)',
    intl: { minAge: 18, ielts: '6.5 overall, no band under 6.0', href: '#details' },
    links: {
      structure: '#details',
      fees: '#fees',
      support: '#details',
      enrol: '#apply',
      refund: '#details',
    },
  },
}

export { electiveUnits }
