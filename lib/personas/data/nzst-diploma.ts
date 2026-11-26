import type { Breakdown, FormalRow } from '@/components/modules/compliance'
import type { Earnings } from '@/components/modules/earning-potential'
import type { EnquiryRoute } from '@/components/modules/enquiry-form'
import type { Outcome } from '@/components/modules/framing'
import type { Answers, CheckQuestion, CheckResult } from '@/components/modules/instant-check'
import type { Phase } from '@/components/modules/real-terms'
import type { Work } from '@/components/modules/student-work-wall'

/** Facts from nzschooloftourism.co.nz, Diploma in Tourism & Travel Management (Level 5). */
export const DIP = {
  title: 'New Zealand Diploma in Tourism & Travel Management (Level 5)',
  short: 'Diploma in Tourism & Travel Management',
  weeks: 32,
  fee: 14239.38,
  levy: 410,
  intakes: ['8 Feb 2027', '31 May 2027'],
  campuses: ['Auckland City', 'Auckland Airport', 'Hamilton', 'Wellington', 'Christchurch'],
  careers: ['Front desk agent', 'Tour guide', 'Travel agent', 'Customer service agent', 'Concierge', 'Airline sales', 'Shore excursion staff'],
}

export const dipFee = `$${DIP.fee.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}`

export const dipOutcomes: Outcome[] = [
  { lead: 'Run the operations of a tourism business.', text: 'Bookings, rosters, suppliers and budgets, using a Walt Disney World case study and New Zealand operators.' },
  { lead: 'Deliver customer service to industry standard.', text: 'Front desk, tour, airline and cruise service, practised on study tours and in a job fair setting.' },
  { lead: 'Market a destination or product.', text: 'Tourism marketing, digital channels and working with Tourism New Zealand and regional tourism organisations.' },
  { lead: 'Manage risk and sustainability.', text: 'Risk analysis, health and safety, and sustainable tourism practice for operators and destinations.' },
  { lead: 'Work with the industry before you graduate.', text: 'Multi-day New Zealand study tours, exclusive job fairs, and internship opportunities in New Zealand and overseas (placeholder).' },
]

export const dipLike =
  'Thirty-two weeks on campus, Monday to Thursday, with morning or afternoon classes so you can keep a part-time job. Classes mix tourism business theory with practical work: planning itineraries, running a service desk, pitching a destination. Multi-day study tours take you to places such as Rotorua or Queenstown to see the industry first-hand, and job fairs bring employers to campus. You need access to a computer or laptop, a microphone and reliable internet for coursework.'

export const dipPhases: Phase[] = [
  {
    when: 'Weeks 1 to 10',
    title: 'The tourism industry and customer service',
    detail: 'How the New Zealand and international tourism industry works, who the operators are, and service to the standard airlines, hotels and cruise lines expect.',
    can: ['Describe the tourism supply chain', 'Deliver front desk and tour service', 'Handle complaints and special requests'],
  },
  {
    when: 'Weeks 11 to 22',
    title: 'Operations, marketing and the Walt Disney World case study',
    detail: 'Tourism business operations, tourism marketing and digital channels, with Walt Disney World as the case study for how a large operator runs.',
    can: ['Plan and cost a tour or package', 'Build a marketing plan for a destination', 'Analyse how a major operator is run'],
  },
  {
    when: 'Weeks 23 to 32',
    title: 'Risk, sustainability and the study tour',
    detail: 'Risk analysis and management, sustainability in tourism, a multi-day New Zealand study tour, and the job fair where employers interview on campus.',
    can: ['Write a risk management plan', 'Apply sustainable tourism practice', 'Interview with employers at the job fair'],
  },
]

export const dipEarnings: Earnings = {
  currency: 'NZD',
  start: 50000,
  threeYear: 62000,
  source: 'Careers New Zealand pay ranges for travel and tourism roles',
  year: 2025,
  stat: { value: '8 in 10', label: 'In tourism, travel or hospitality work, or further study, within six months', cohort: 2025 },
  employers: ['Air New Zealand', 'Flight Centre', 'House of Travel', 'Auckland Airport', 'RealNZ', 'Skyline Queenstown'],
  employersMore: 30,
  employersYear: 2025,
}

/** Graduates at work around New Zealand and the world. Four photos, the rest placeholder tiles. */
export const dipGraduates: Work[] = [
  { id: 'g1', title: 'Lake tours guide, Queenstown', student: 'Mele, class of 2025', course: 'RealNZ', discipline: 'New Zealand', tone: 'bg-primary', image: '/images/nzst/grad-queenstown.png', imageAlt: 'A graduate guiding visitors on the Queenstown lakefront', tall: true },
  { id: 'g2', title: 'Guest services, cruise ship', student: 'Sione, class of 2024', course: 'P&O Cruises, Pacific', discipline: 'Overseas', tone: 'bg-coral', image: '/images/nzst/grad-cruise.png', imageAlt: 'A graduate in cruise crew uniform on deck' },
  { id: 'g3', title: 'Geothermal park guide, Rotorua', student: 'Aroha, class of 2025', course: 'Te Puia', discipline: 'New Zealand', tone: 'bg-primary-hover', image: '/images/nzst/grad-rotorua.png', imageAlt: 'A graduate leading a tour through geothermal terraces' },
  { id: 'g4', title: 'Airline ground crew, Auckland', student: 'Arjun, class of 2024', course: 'Air New Zealand', discipline: 'New Zealand', tone: 'bg-foreground', image: '/images/nzst/grad-airport.png', imageAlt: 'A graduate at an airline check-in desk' },
  { id: 'g5', title: 'Resort front desk, Fiji', student: 'Lose, class of 2024', course: 'Sheraton Denarau', discipline: 'Overseas', tone: 'bg-primary' },
  { id: 'g6', title: 'Travel consultant, Hamilton', student: 'Jess, class of 2025', course: 'House of Travel', discipline: 'New Zealand', tone: 'bg-coral-hover' },
  { id: 'g7', title: 'Shore excursions, Sydney', student: 'Tama, class of 2023', course: 'Royal Caribbean', discipline: 'Overseas', tone: 'bg-primary-tint-foreground', tall: true },
  { id: 'g8', title: 'Concierge, Wellington', student: 'Priya, class of 2025', course: 'InterContinental', discipline: 'New Zealand', tone: 'bg-muted-foreground' },
  { id: 'g9', title: 'Theme park internship, Florida', student: 'Kahu, class of 2024', course: 'International internship', discipline: 'Overseas', tone: 'bg-primary-hover' },
  { id: 'g10', title: 'i-SITE visitor centre, Christchurch', student: 'Emma, class of 2025', course: 'ChristchurchNZ', discipline: 'New Zealand', tone: 'bg-coral' },
]
export const dipRegions = ['New Zealand', 'Overseas']

export const dipFundingQuestions: CheckQuestion[] = [
  { id: 'res', label: 'Are you a New Zealand citizen or resident?', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] },
  { id: 'prior', label: 'Have you done more than half a year of tertiary study before?', options: [{ id: 'none', label: 'No' }, { id: 'some', label: 'Yes, some' }, { id: 'degree', label: 'Yes, a full year or more' }] },
  { id: 'work', label: 'Will you be working while you study?', options: [{ id: 'yes', label: 'Yes, part-time' }, { id: 'no', label: 'No' }] },
]

export function resolveDipFunding(a: Answers): CheckResult {
  if (a.res === 'no') {
    return {
      tone: 'info',
      headline: `Not eligible for Fees Free. The domestic fee is ${dipFee} plus a $${DIP.levy} levy.`,
      body: 'Fees Free is for New Zealand citizens and residents in their first year of tertiary study. International fees are listed on the international page.',
      action: { label: 'Choose a start date', href: '#start' },
    }
  }
  if (a.prior === 'none') {
    return {
      tone: 'yes',
      headline: 'You are eligible for Fees Free.',
      body: 'Fees Free covers the first year of tertiary study for New Zealand citizens and residents. As this is your first year, the course fee and levy are covered.',
      bullets: [a.work === 'yes' ? 'Morning or afternoon classes leave the rest of the day for work.' : 'You can also apply to StudyLink for living costs.', 'You will need a RealMe login and your NSN. We can help with both.'],
      action: { label: 'Choose a start date', href: '#start' },
    }
  }
  return {
    tone: 'start',
    headline: 'You may be eligible. One thing to check.',
    body: 'Fees Free covers the first year of tertiary study only. If you have studied before, any remaining entitlement can be applied to this course. We can check your entitlement within a day.',
    bullets: [`If no entitlement remains, the fee is ${dipFee} plus the $${DIP.levy} levy, with a StudyLink loan or split payments available.`, 'No fee is charged without your agreement.'],
    action: { label: 'Ask us to check your entitlement', href: '#advisor' },
  }
}

export const dipAdvisor = { name: 'Aroha', role: 'Course advisor, NZST', photo: '/images/advisors/nzma-aroha.png', line: 'I studied tourism here and worked two seasons in Queenstown before this role. I can talk you through the course, the study tours and where graduates end up.' }

export const dipAdvisorRoutes: EnquiryRoute[] = [
  {
    id: 'school',
    label: 'Finishing school this year',
    hint: 'Year 12 or 13',
    confirmation: 'Aroha will call at your chosen time with the entry requirements, the Fees Free check and the drop-in day dates for your nearest campus.',
    next: ['At your chosen time: a call from Aroha.', 'Afterwards: a summary you can forward to a parent or caregiver.', 'Before the intake: one reminder.'],
  },
  {
    id: 'working',
    label: 'Working, and thinking about a change',
    hint: 'Retail, hospitality or another job',
    confirmation: 'Aroha will call or email at the time you chose, with the morning and afternoon class options and where recent graduates are working.',
    next: ['At your chosen time: Aroha, by phone or email as you prefer.', 'Afterwards: a one-page summary of what you discussed.', 'Two weeks before the intake: one reminder.'],
  },
  {
    id: 'family',
    label: 'A parent or family member',
    hint: 'Looking on behalf of someone',
    confirmation: 'Aroha will email a summary of fees, student support and graduate outcomes first, then call at your chosen time if you would like to talk.',
    next: ['Today: the summary for families, as a PDF.', 'At your chosen time: a call, if you would like one.'],
  },
]

export const dipBreakdown: Breakdown = {
  intro: `Eight modules over ${DIP.weeks} weeks, 120 credits at Level 5. Modules cover tourism operations, marketing, sustainability, risk and customer service, with a Walt Disney World case study, a multi-day New Zealand study tour and a job fair. All modules must be passed.`,
  unit: 'module',
  creditLabel: 'credits',
  terms: [
    {
      label: 'Block 1',
      when: 'Weeks 1 to 10',
      units: [
        { code: 'TT501', title: 'The tourism and travel industry', credits: 15, summary: 'Operators, distribution, regulators and the visitor economy in New Zealand and internationally.' },
        { code: 'TT502', title: 'Customer service in tourism', credits: 15, summary: 'Service standards for airlines, hotels, cruise and attractions, including complaints and special needs.' },
        { code: 'TT503', title: 'Engaging with the industry', credits: 15, summary: 'Industry visits, guest speakers and the first job fair preparation.' },
      ],
    },
    {
      label: 'Block 2',
      when: 'Weeks 11 to 22',
      units: [
        { code: 'TT504', title: 'Tourism business operations', credits: 15, summary: 'Bookings, rostering, suppliers, budgets and the Walt Disney World case study.' },
        { code: 'TT505', title: 'Tourism marketing', credits: 15, summary: 'Destination and product marketing, digital channels and regional tourism organisations.' },
        { code: 'TT506', title: 'Itinerary and product design', credits: 15, summary: 'Planning, costing and selling tours and packages.' },
      ],
    },
    {
      label: 'Block 3',
      when: 'Weeks 23 to 32',
      units: [
        { code: 'TT507', title: 'Risk analysis and management', credits: 15, summary: 'Health and safety, incident planning and risk management for operators.' },
        { code: 'TT508', title: 'Sustainability in tourism', credits: 15, summary: 'Environmental and cultural sustainability, Tiaki and the study tour project.' },
      ],
    },
  ],
  note: 'Module names, codes and credits are placeholders until NZST supplies the programme document. Special features (study tours, job fairs, Walt Disney World case study) are from the live NZST page.',
}

export const dipFormal: FormalRow[] = [
  ['Qualification', DIP.title],
  ['Level and credits', 'Level 5, 120 credits (placeholder)'],
  ['Length', `${DIP.weeks} weeks, full-time`],
  ['Delivered by', 'New Zealand School of Tourism. Qualifications are issued by Yoobee Colleges Ltd, an NZQA registered provider.'],
  ['Campuses', DIP.campuses.join(', ')],
  ['Intakes, 2027', DIP.intakes.join(' and ')],
  ['Classes', 'Morning or afternoon, Monday to Thursday'],
  ['Entry, domestic', 'NCEA Level 3, or a Level 4 qualification in tourism or travel. Special admission may be granted to applicants aged 20 and over with relevant prior learning or work and life experience.'],
  ['Entry, international', '18+ on day one, completed secondary school or equivalent work experience, and English language proficiency as set out on the international page.'],
  ['Equipment', 'Access to a computer or laptop, a microphone and reliable internet. Mobile phones are not suitable for coursework.'],
  ['Domestic fee, 2027', `${dipFee} course fee plus a $${DIP.levy} student services levy. Fees are subject to change.`],
  ['Funding', 'Fees Free for eligible first-year students. Approved for StudyLink student loans and allowances; apply to StudyLink for course-related or living costs.'],
  ['Pathway', 'Diploma in Tourism and Travel (Level 6), 32 weeks, with internships available.'],
]

export const dipLinks: [string, string][] = [
  ['Programme structure', '#structure'],
  ['Fees, refunds and withdrawal', '#formal'],
  ['International students', '#formal'],
  ['How to enrol', '#start'],
]

export const dipFaqs = [
  { q: 'What is tourism management?', a: 'Tourism management involves overseeing the operations and development of tourist destinations, attractions and services so that visitors have a positive experience. This diploma introduces what a tourism manager does and gives you the chance to learn first-hand on study tours and at job fairs.' },
  { q: 'Is tourism management a good career?', a: 'Tourism is a diverse career path that can take you around New Zealand and overseas, with roles from front desk and tour guiding to airline sales and cruise work, and room to move into management.' },
  { q: 'Do I need NCEA Level 3?', a: 'NCEA Level 3 or a Level 4 tourism or travel qualification meets the entry requirement. If you are 20 or over without formal qualifications, special admission may be granted on the basis of relevant work or life experience. Ask an advisor.' },
  { q: 'Can I keep working while I study?', a: 'Classes run Monday to Thursday in a morning or afternoon block, which leaves the rest of the day and Fridays for a part-time job.' },
]
