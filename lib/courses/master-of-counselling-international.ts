import type { International } from '../course'

const anjaliStory = {
  slug: 'anjali-menon',
  name: 'Anjali Menon',
  age: 36,
  countryCode: 'IN',
  from: 'Kochi, Kerala',
  now: 'Melbourne, Victoria',
  employer: 'headspace Sunshine',
  graduated: 'Trimester 3, 2025',
  image: { src: '/images/aipc/story-anjali.png', alt: 'Anjali Menon standing in the corridor of a community health centre in Melbourne' },
  headline: 'From HR in Kochi to youth counselling in Melbourne, without quitting her job first',
  standfirst:
    'Anjali studied the first year of her Master online from Kerala, flew in for one residential school on a visitor visa, then moved to Australia for placement and stayed. Two years on she is a registered counsellor with headspace.',
  sections: [
    {
      h: 'Why AIPC, not a university',
      body: 'I had a Bachelor of Commerce and eight years in HR. Every Australian university I looked at wanted a related degree or an interview I would have to fly in for. AIPC took my degree as it was, and the fee difference was about the price of a year of rent in Melbourne. I could also start in May rather than wait until the following February.',
    },
    {
      h: 'Studying from India',
      body: 'Tutorials were 6pm Brisbane time, which was 1:30pm for me, so I did them on my lunch break with headphones on. Recorded lectures I watched at night. The one thing I underestimated was the role-play recordings: I had to find a friend willing to be a client in English on camera. My cousin did it, and she still teases me about it.',
    },
    {
      h: 'The residential school',
      body: 'I came to Brisbane for the first residential on a visitor visa, two and a half days on campus, and stayed a week to see the place. That week is when it became real. Six of the twelve in my group were from outside Australia, and three of us are still in a WhatsApp group.',
    },
    {
      h: 'Placement and the move',
      body: 'I wanted my placement in Australia because I wanted to work here. The international team connected me with a MARA-registered agent who walked through the options honestly, including the ones that did not suit me. I moved to Melbourne in my final trimester on a student visa, did 168 hours at a community health service in the west, and they introduced me to headspace.',
    },
    {
      h: 'Now',
      body: 'I am a youth counsellor at headspace Sunshine, ACA registered, and I supervise a student on placement myself this trimester. My advice to anyone reading this from India: your degree is enough to start, your English is enough if you can read this, and the census date means you can try one trimester with almost nothing at risk.',
    },
  ],
  quote: 'Your degree is enough to start, your English is enough if you can read this, and the census date means you can try one trimester with almost nothing at risk.',
  timeline: [
    { when: 'May 2023', what: 'Starts part-time from Kochi, two units a trimester, still working in HR' },
    { when: 'Sep 2023', what: 'First residential school in Brisbane, visitor visa, one week in Australia' },
    { when: 'Mar 2025', what: 'Moves to Melbourne on a student visa for the final trimester and placement' },
    { when: 'Nov 2025', what: 'Graduates, ACA registration granted' },
    { when: 'Feb 2026', what: 'Youth counsellor, headspace Sunshine' },
  ],
}

const miguelStory = {
  slug: 'miguel-santos',
  name: 'Miguel Santos',
  age: 42,
  countryCode: 'PH',
  from: 'Cebu City',
  now: 'Brisbane, Queensland',
  employer: 'Brisbane Catholic Education',
  graduated: 'Trimester 2, 2025',
  image: { src: '/images/aipc/story-miguel.png', alt: 'Miguel Santos seated in a school wellbeing office in Brisbane' },
  headline: 'A guidance teacher in Cebu becomes a school counsellor in Brisbane',
  standfirst:
    'Miguel taught for fifteen years in the Philippines. He completed the whole Master online from Cebu, joined both residential schools as online intensives, and used the qualification to move his family to Queensland.',
  sections: [
    {
      h: 'Starting point',
      body: 'I had a Bachelor of Secondary Education and I was already doing guidance work at my school, without the qualification. I wanted something recognised in Australia because my sister was in Brisbane and we were thinking about the move for the kids.',
    },
    {
      h: 'Studying fully online',
      body: 'Cebu is two hours behind Brisbane, so the evening tutorials were 4pm for me, right after school. I did the entire degree from home, including both skills units as online intensives. My placement was with a Cebu family services NGO that AIPC approved, with an Australian supervisor on video.',
    },
    {
      h: 'The move',
      body: 'Because I finished offshore, the move was a separate decision. The international team were clear that they could not give migration advice, and put me in touch with a registered agent. The Master plus my teaching background was what made the skilled pathway work. I am not going to pretend it was simple, but it was honest, and I knew the costs before I started.',
    },
    {
      h: 'Now',
      body: 'I am a school counsellor across two primary schools in Brisbane. The kids call me Mr Miguel. My daughter is in Year 9 here and says my accent is embarrassing, which I take as a sign we have settled.',
    },
  ],
  quote: 'I knew the costs before I started, and the people I spoke to never pretended the move would be simple. That honesty is why I trusted them.',
  timeline: [
    { when: 'Jul 2023', what: 'Starts part-time from Cebu City, still teaching full-time' },
    { when: 'Sep 2024', what: 'Both residential schools completed as online intensives' },
    { when: 'Mar 2025', what: 'Placement with an approved family services NGO in Cebu' },
    { when: 'Jul 2025', what: 'Graduates, ACA registration granted' },
    { when: 'Jan 2026', what: 'Family relocates to Brisbane; school counsellor, Brisbane Catholic Education' },
  ],
}

export const masterOfCounsellingInternational: International = {
  totalCountries: 41,
  totalStudents: 312,
  countries: [
    {
      code: 'IN',
      name: 'India',
      students: 34,
      utcOffset: -4.5,
      englishNote: 'Degrees taught and assessed in English at a recognised Indian university are usually accepted in place of an IELTS score.',
      caseStudy: 'anjali-menon',
      testimonials: [
        { name: 'Rohan D.', city: 'Pune', cohort: 'Started Trimester 1, 2025', quote: 'The 6pm Brisbane tutorial is my lunch break. I have not missed one. Lecturers reply to the role-play uploads within days, with time-stamped notes.' },
        { name: 'Deepa K.', city: 'Bengaluru', cohort: 'Graduated 2025', now: 'Telehealth counsellor, Sydney', quote: 'I paid trimester by trimester, which meant I never owed more than about $6,000 at once. That made it possible.' },
        { name: 'Farhan S.', city: 'Hyderabad', cohort: 'Started Trimester 3, 2025', quote: 'The international team told me straight what they could and could not help with on visas, then introduced a registered agent. No sales talk.' },
      ],
    },
    {
      code: 'PH',
      name: 'Philippines',
      students: 27,
      utcOffset: -2,
      englishNote: 'Most Philippine bachelor degrees are taught in English and accepted in place of a test score.',
      caseStudy: 'miguel-santos',
      testimonials: [
        { name: 'Maria Theresa L.', city: 'Manila', cohort: 'Started Trimester 2, 2025', quote: 'I am a nurse. The counselling units are already changing how I talk to patients. That was worth it before I even finish.' },
        { name: 'Joel A.', city: 'Davao', cohort: 'Graduated 2025', now: 'EAP counsellor, Perth', quote: 'Two of us from Davao started together. We did every role-play as a pair over video.' },
      ],
    },
    {
      code: 'NP',
      name: 'Nepal',
      students: 19,
      utcOffset: -4.25,
      testimonials: [
        { name: 'Sujata G.', city: 'Kathmandu', cohort: 'Started Trimester 1, 2025', quote: 'The census date guarantee let me try one trimester while I was still deciding about moving. I stayed.' },
        { name: 'Bikash T.', city: 'Pokhara', cohort: 'Graduated 2025', now: 'Community counsellor, Adelaide', quote: 'My placement supervisor in Australia was on video every fortnight. It did not feel like distance learning.' },
      ],
    },
    {
      code: 'KE',
      name: 'Kenya',
      students: 12,
      utcOffset: -7,
      testimonials: [
        { name: 'Wanjiru M.', city: 'Nairobi', cohort: 'Started Trimester 3, 2025', quote: 'Tutorials are 11am my time on a weekday. I negotiated it with my employer as professional development, which it is.' },
      ],
    },
    {
      code: 'SG',
      name: 'Singapore',
      students: 16,
      utcOffset: -2,
      testimonials: [
        { name: 'Wei Lin T.', city: 'Singapore', cohort: 'Graduated 2025', now: 'Private practice, Singapore', quote: 'I never intended to move. I wanted an Australian Master recognised by SAC here, at a price that made sense. It was a third of the local options.' },
      ],
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      students: 14,
      utcOffset: -9,
      testimonials: [
        { name: 'Hannah W.', city: 'Manchester', cohort: 'Started Trimester 2, 2025', quote: 'Evening tutorials in Brisbane are 9am for me. I do them before work. Moving to Australia at the end is the plan, and the team have been realistic about what that involves.' },
      ],
    },
    { code: 'ZA', name: 'South Africa', students: 11, utcOffset: -8, testimonials: [{ name: 'Thabo N.', city: 'Johannesburg', cohort: 'Started Trimester 1, 2025', quote: 'The fee is in Australian dollars and fixed per unit, so I could plan around the exchange rate a trimester at a time.' }] },
    { code: 'MY', name: 'Malaysia', students: 9, utcOffset: -2, testimonials: [] },
    { code: 'LK', name: 'Sri Lanka', students: 8, utcOffset: -4.5, testimonials: [] },
    { code: 'NG', name: 'Nigeria', students: 7, utcOffset: -9, testimonials: [] },
    { code: 'AE', name: 'United Arab Emirates', students: 6, utcOffset: -6, testimonials: [] },
    { code: 'CA', name: 'Canada', students: 5, utcOffset: -15, testimonials: [] },
    { code: 'US', name: 'United States', students: 5, utcOffset: -15, testimonials: [] },
    { code: 'HK', name: 'Hong Kong', students: 4, utcOffset: -2, testimonials: [] },
    { code: 'NZ', name: 'New Zealand', students: 21, utcOffset: 2, testimonials: [{ name: 'Aroha P.', city: 'Wellington', cohort: 'Graduated 2025', now: 'School counsellor, Wellington', quote: 'ACA registration is recognised by NZAC for the pathway I needed. I did the residential in Sydney, a three-hour flight.' }] },
  ],
  fees: {
    perUnit: 3490,
    total: 52350,
    majorUnits: [
      { code: 'MC09', fee: 5235 },
      { code: 'MC10', fee: 5235 },
    ],
    deposit: 3490,
  },
  otherCosts: [
    { item: 'Textbooks and readings', amount: 'About A$150 a unit', when: 'Each trimester' },
    { item: 'Residential school travel', amount: 'Your airfare and about A$300 a day, or A$0 online', when: 'Twice in the degree' },
    { item: 'Visitor visa for residential school', amount: 'From A$195', when: 'If you attend on campus' },
    { item: 'Student visa, if you study onshore', amount: 'A$1,600 application, plus OSHC health cover about A$700 a year', when: 'If you move for placement' },
    { item: 'Certified document translation', amount: 'Varies', when: 'If your transcript is not in English' },
  ],
  paymentOptions: [
    { title: 'Pay per trimester', body: 'Pay for the units you take that trimester, two weeks before it starts. About A$6,980 part-time or A$13,960 full-time. Card, bank transfer or Flywire in your currency.' },
    { title: 'Deposit to hold a place', body: 'One unit fee, A$3,490, holds your place and comes off the first trimester. Refunded in full if you withdraw before the census date.' },
    { title: 'Employer sponsorship', body: 'We invoice employers directly and can provide unit outlines for professional development approval. About one in five international students is part-funded this way.' },
  ],
  english: {
    tests: [
      { name: 'IELTS Academic', score: '6.5 overall, no band below 6.0' },
      { name: 'TOEFL iBT', score: '79, with writing 21' },
      { name: 'PTE Academic', score: '58, no skill below 50' },
      { name: 'Cambridge C1 Advanced', score: '176' },
    ],
    exemptions: ['A bachelor degree taught and assessed entirely in English, completed in the last five years', 'Citizenship of the UK, Ireland, USA, Canada, New Zealand or South Africa', 'Two years of professional work in an English-speaking role, with evidence'],
  },
  modes: [
    {
      id: 'offshore',
      title: 'Study from home, online',
      body: 'The whole degree can be completed from your country. Tutorials are live but recorded. Both skills units can be taken as online intensives. Placement is arranged with an approved agency near you, with an Australian supervisor on video.',
      visa: 'No visa needed. If you choose to attend a residential school in person, a visitor visa covers a short trip.',
    },
    {
      id: 'onshore',
      title: 'Move to Australia for part of it',
      body: 'Many students study the first trimesters from home, then move for the final trimester and placement, or for the whole degree. Placement in Australia is the most common route into Australian employment.',
      visa: 'Needs a student visa. AIPC is CRICOS registered for this program (placeholder). We are not migration agents and connect you with one who is.',
    },
  ],
  team: {
    blurb:
      'The international team are four AIPC staff who work only with students outside Australia. They know the time zones, the document rules for your country, how offshore placement works and what the honest costs are. They are not agents and are not paid on enrolments.',
    covers: ['Whether your degree is recognised and what credit it may attract', 'English evidence, and whether your degree exempts you', 'Studying from home versus moving, and what each costs', 'Placement options in your country', 'A referral to a MARA-registered migration agent if you are considering the move'],
    slots: [
      { when: 'Tue 15 Sep, 4:00pm AEST', left: 3 },
      { when: 'Tue 15 Sep, 9:00pm AEST', left: 2 },
      { when: 'Wed 16 Sep, 7:00am AEST', left: 4 },
      { when: 'Thu 17 Sep, 10:00pm AEST', left: 1 },
      { when: 'Sat 19 Sep, 3:00pm AEST', left: 5 },
    ],
    whatsapp: '+61 400 000 000',
    email: 'international@aipc.net.au',
  },
  migration: {
    blurb:
      'Under Australian law only a registered migration agent or a lawyer can give immigration advice. Our team will not. What they will do is tell you plainly which study option you are describing, then, if you want it, introduce you to a registered agent who knows this program.',
    partner: 'Placeholder: partner agency, MARA registration number to be confirmed. First 30-minute consultation free for AIPC applicants.',
    disclaimer: 'AIPC receives no payment from any migration agent. Studying a course does not guarantee a visa outcome.',
  },
  caseStudies: [anjaliStory, miguelStory],
}
