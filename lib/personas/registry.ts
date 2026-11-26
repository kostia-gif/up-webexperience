export type BrandKey = 'aipc' | 'yoobee' | 'nzst'
export type PersonaKey = 'sarah' | 'dan' | 'plan-b' | 'meta-kids' | 'tailwinds' | 'confidence'
export type Job = 'Check' | 'Prove' | 'Fit' | 'Act' | 'Talk and share'
export type Status = 'In POC' | 'Adapted' | 'New' | 'Idea' | 'Parked'

export type BrandInfo = {
  key: BrandKey
  name: string
  legalName: string
  /** The school's own page in the prototype. Logo and "Courses" link here. */
  href: string
  country: 'AU' | 'NZ'
  currency: 'AUD' | 'NZD'
  phone: string
  footer: string
}

export const BRANDS: Record<BrandKey, BrandInfo> = {
  aipc: {
    key: 'aipc',
    name: 'AIPC',
    legalName: 'Australian Institute of Professional Counsellors',
    href: '/aipc',
    country: 'AU',
    currency: 'AUD',
    phone: '1800 570 511',
    footer:
      'Australian Institute of Professional Counsellors. Specialists in counselling education since 1990. A registered higher education provider, online across Australia with practical workshops in Brisbane, Sydney, Melbourne and Perth.',
  },
  yoobee: {
    key: 'yoobee',
    name: 'Yoobee',
    legalName: 'Yoobee College of Creative Innovation',
    href: '/yoobee',
    country: 'NZ',
    currency: 'NZD',
    phone: '0800 66 55 44',
    footer: 'Yoobee College of Creative Innovation. Part of UP Education. Online, and on campus in Auckland, Wellington and Christchurch.',
  },
  nzst: {
    key: 'nzst',
    name: 'NZST',
    legalName: 'New Zealand School of Tourism',
    href: '/nzst',
    country: 'NZ',
    currency: 'NZD',
    phone: '0800 87 88 89',
    footer:
      'New Zealand School of Tourism. Part of UP Education. Campuses at Auckland City, Auckland Airport, Hamilton, Wellington and Christchurch.',
  },
}

export type PersonaInfo = {
  key: PersonaKey
  name: string
  brand: BrandKey
  role: 'lead' | 'second'
  oneLine: string
  evidence: 'Validated' | 'Assumed'
  mainAction: string
  secondAction: string
  question: string
}

export const PERSONAS: Record<PersonaKey, PersonaInfo> = {
  sarah: {
    key: 'sarah',
    name: 'Sarah, the career changer',
    brand: 'aipc',
    role: 'lead',
    oneLine: 'Around 43. HR manager, nurse or teacher, fifteen years into a career that pays but no longer means much.',
    evidence: 'Assumed',
    mainAction: 'Talk to a course specialist',
    secondAction: 'Download the course guide',
    question: 'Is this credible, and is it right for me at this stage of life?',
  },
  dan: {
    key: 'dan',
    name: 'Dan, the frontliner',
    brand: 'aipc',
    role: 'second',
    oneLine: 'Around 29. Youth or support worker who already does helping work every day without the title or the pay.',
    evidence: 'Assumed',
    mainAction: 'Check my credit',
    secondAction: 'Chat now',
    question: 'Does this move my current career forward?',
  },
  'plan-b': {
    key: 'plan-b',
    name: 'Plan B',
    brand: 'yoobee',
    role: 'lead',
    oneLine: 'Aged 20 to 35. Steered into something sensible, now weighing up a return to the creative thing that always came easily.',
    evidence: 'Validated',
    mainAction: 'Find the right course for me',
    secondAction: 'Try a free taster lesson',
    question: 'Can creativity actually pay, and can I test it before I leave my job?',
  },
  'meta-kids': {
    key: 'meta-kids',
    name: 'Meta Kids',
    brand: 'yoobee',
    role: 'second',
    oneLine: 'Aged 18 to 19. Lifelong artists and gamers with a specific ambition, checking whether this is their tribe.',
    evidence: 'Validated',
    mainAction: 'Come and see the campus',
    secondAction: 'Join a holiday programme',
    question: 'Is this my thing and my people?',
  },
  tailwinds: {
    key: 'tailwinds',
    name: 'Riding the Tailwinds',
    brand: 'nzst',
    role: 'lead',
    oneLine: 'Median age 19. Determined to be cabin crew, decides fast and arrives from TikTok or Instagram.',
    evidence: 'Validated',
    mainAction: 'Can I get in?',
    secondAction: 'Message us',
    question: 'Can this get me the life I picture?',
  },
  confidence: {
    key: 'confidence',
    name: 'Confidence Booster',
    brand: 'nzst',
    role: 'second',
    oneLine: 'Median age 19. Wants to be cabin crew but lacks Level 3 or the confidence. Needs a yes early and a small first step.',
    evidence: 'Validated',
    mainAction: 'Can I get in? (Start here)',
    secondAction: 'Visit the campus',
    question: 'Would they take someone like me? Could I actually do it?',
  },
}

export type SchoolPage = {
  brand: BrandKey
  course: string
  personas: PersonaKey[]
  href: string
  testing: string
}

export const SCHOOL_PAGES: SchoolPage[] = [
  {
    brand: 'aipc',
    course: 'Master of Counselling',
    personas: ['sarah', 'dan'],
    href: '/aipc/master-of-counselling',
    testing: 'Whether a calm, readable page framed around outcomes and "why this course", with a course specialist as the main action, earns a conversation from Sarah, and whether a credit check on the same page serves Dan without a separate version.',
  },
  {
    brand: 'yoobee',
    course: 'Certificate in Creative Media',
    personas: ['plan-b'],
    href: '/yoobee/creative-media',
    testing: 'Whether a billboard that leads straight to cost and a start date, then outcomes and what you will make, is enough for an adult with commitments to enrol.',
  },
  {
    brand: 'yoobee',
    course: 'Certificate in Creative Media, online only',
    personas: ['plan-b'],
    href: '/yoobee/creative-media-online',
    testing: 'A comparison view: the same course sold as an online-only product, where the page is about signing up. Does a shorter, buy-first page convert online students better than the blended page?',
  },
  {
    brand: 'nzst',
    course: 'Level 4 Flight Attending',
    personas: ['tailwinds', 'confidence'],
    href: '/nzst/flight-attending',
    testing: 'Whether an instant "Can I get in?" check lifts enquiry to application on a phone, and whether the "Start here" result turns Level 3 into a step rather than a rejection.',
  },
]

export function pageLabel(p: SchoolPage) {
  const who = p.personas
    .map((k) => {
      const persona = PERSONAS[k]
      return persona.name
    })
    .join(' and ')
  return `${BRANDS[p.brand].name}, ${p.course}, for ${who}`
}

import { MODULES, type ModuleDef } from './modules'

export * from './modules'

export const JOBS: Job[] = ['Check', 'Prove', 'Fit', 'Act', 'Talk and share']
export const STATUSES: Status[] = ['In POC', 'Adapted', 'New', 'Idea', 'Parked']

export function moduleBrands(m: ModuleDef): BrandKey[] {
  return m.brands === 'all' ? ['aipc', 'yoobee', 'nzst'] : m.brands
}

export function modulePersonas(m: ModuleDef): PersonaKey[] {
  return m.personas === 'all' ? (Object.keys(PERSONAS) as PersonaKey[]) : m.personas
}

export function findModule(slug: string) {
  return MODULES.find((m) => m.slug === slug)
}
