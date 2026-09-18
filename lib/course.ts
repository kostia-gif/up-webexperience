export type EmployerQuote = {
  text: string
  role: string
  venue: string
  city: string
  approvedOn?: string
  approvedBy?: string
}

export type Capability = {
  can: string
  means: string
  quote?: EmployerQuote
}

export type StudentVoice = {
  text: string
  name: string
  campus: string
  surveyed: string
  consent: boolean
}

export type Stage = {
  label: string
  items: Capability[]
  voice?: StudentVoice
}

export type CourseModule = {
  code: string
  title: string
  credits: number
  hours?: number
  summary: string
  learn: string[]
  assessment: string
  compulsory?: boolean
}

export type CourseTerm = {
  label: string
  weeks: string
  modules: CourseModule[]
}

export type CourseStructure = {
  intro: string
  terms: CourseTerm[]
  note?: string
}

export type Campus = {
  name: string
  left: number
}

export type Intake = {
  date?: string
  label: string
  unconfirmed?: boolean
  campuses?: Campus[]
}

export type TryItSlot = {
  when: string
  what: string
  left?: number
}

export type TryItMode = {
  mode: string
  blurb: string
  slots: TryItSlot[]
}

export type MicroCredential = {
  id: string
  title: string
  strand: string
  image: string
  imageAlt: string
  make: string
  hours: number
  credits: number
  startsNow: boolean
  taster?: boolean
}

export type AiPerkOption = {
  id: string
  name: string
  vendor: string
  blurb: string
  monthly: number
}

export type AiPerk = {
  lede: string
  months: number
  options: AiPerkOption[]
}

export type BrandId = 'nzma' | 'elite' | 'yoobee' | 'aipc'

export type Currency = 'NZD' | 'AUD'

export type Brand = {
  id: BrandId
  name: string
  legalName: string
  country?: 'NZ' | 'AU'
  currency?: Currency
  mark?: 'clover' | 'speech'
  logo?: { src: string; alt: string; width: number; height: number }
  wordmark?: { title: string; sub: string }
  banner: { text: string; linkLabel: string; href: string }
  nav: { label: string; reo?: string; href: string; current?: boolean }[]
  enrolHref: string
  enrolLabel?: string
  phone: string
  footerBlurb: string
  footerCols: { h: string; links: string[] }[]
  themeColor: string
}

export type PostgradUnit = {
  code: string
  title: string
  trimester: number
  eftsl: number
  residential?: 'campus' | 'online'
  elective?: boolean
  summary: string
}

export type PostgradLevel = {
  n: number
  label: string
  when: string
  units: string[]
  title: string
  skills: string[]
  unlocks?: string
  image?: { src: string; alt: string }
  electivePick?: number
  note?: string
}

export type PostgradIntake = {
  id: string
  label: string
  start: string
  census: string
  residential: string
  applyBy: string
  left: number
  capacity: number
  /** Days until an early-bird scholarship offer for this intake expires. Omit if none. */
  earlybirdDays?: number
}

export type IntlCountry = {
  code: string
  name: string
  /** Enrolled from this country in the last two years. */
  students: number
  /** Hours offset from AEST, for the specialist slot hint. */
  utcOffset: number
  englishNote?: string
  testimonials: { name: string; city: string; cohort: string; quote: string; now?: string }[]
  caseStudy?: string
}

export type CaseStudy = {
  slug: string
  name: string
  age: number
  countryCode: string
  from: string
  now: string
  employer: string
  graduated: string
  image: { src: string; alt: string }
  headline: string
  standfirst: string
  sections: { h: string; body: string }[]
  quote: string
  timeline: { when: string; what: string }[]
}

export type International = {
  totalCountries: number
  totalStudents: number
  countries: IntlCountry[]
  fees: { perUnit: number; total: number; majorUnits: { code: string; fee: number }[]; deposit: number }
  otherCosts: { item: string; amount: string; when: string }[]
  paymentOptions: { title: string; body: string }[]
  english: { tests: { name: string; score: string }[]; exemptions: string[] }
  modes: { id: 'offshore' | 'onshore'; title: string; body: string; visa: string }[]
  team: { blurb: string; covers: string[]; slots: { when: string; left: number }[]; whatsapp: string; email: string }
  migration: { blurb: string; partner: string; disclaimer: string }
  caseStudies: CaseStudy[]
}

export type MarketStat = { value: string; label: string; source: string }
export type MarketDemand = { eyebrow: string; title: string; intro: string; stats: MarketStat[] }

export type PathwayRung = {
  award: string
  unitCount: number
  duration: string
  gets: string
  roles: string[]
  isTarget?: boolean
}
export type PathwayLadder = { eyebrow: string; title: string; intro: string; safetyNote: string; rungs: PathwayRung[] }

export type CareerTier = { when: string; role: string; settings: string; band: string }
export type CareerLadder = { eyebrow: string; title: string; intro: string; tiers: CareerTier[]; note: string }

export type AcademicLead = {
  name: string
  role: string
  credentials: string
  years: number
  photo: { src: string; alt: string }
  bio: string
  quote: string
}

export type StudyPhase = { span: string; label: string; detail: string }
export type StudyRhythm = { eyebrow: string; title: string; intro: string; weeks: number; perBlock: string; phases: StudyPhase[] }

export type ProgramGuide = { eyebrow: string; title: string; blurb: string; contents: string[]; fileLabel: string }

export type Postgrad = {
  provider: { legalName: string; teqsa: string; aqf: number; since: number }
  marketDemand?: MarketDemand
  pathwayLadder?: PathwayLadder
  careerLadder?: CareerLadder
  academicLead?: AcademicLead
  studyRhythm?: StudyRhythm
  programGuide?: ProgramGuide
  structure: { totalUnits: number; electivesRequired: number }
  international?: International
  accreditations: { body: string; short: string; what: string }[]
  fees: {
    perUnit: number
    total: number
    majorUnits: { code: string; fee: number }[]
    feeHelpThreshold: number
    unitsPerTrimester: { fullTime: number; partTime: number }
  }
  comparison: { label: string; us: string; uni: string }[]
  comparisonNote: string
  units: PostgradUnit[]
  levels: PostgradLevel[]
  residential: { totalDays: number; campusDays: number; onlineDays: number; cities: string[]; allowancePerDay: number }
  rpl: {
    max: number
    auto: { from: string; units: string[] }[]
    transfer: string
    experience: string
    evidence: string[]
  }
  intakes: PostgradIntake[]
  specialist: {
    blurb: string
    covers: string[]
    slots: { when: string; left: number }[]
    phone: string
    hours: string
  }
  paymentOptions: { title: string; body: string }[]
  censusGuarantee: string
}

export type Copy = {
  heroTry: string
  heroTryHref?: string
  feeSub: string
  promise?: string
  likeTitle: string
  likeVideoLabel: string
  kitTitle: string
  kitStep: string
  skillsTitle: string
  jobNoun: string
  coach: {
    name: string
    initials: string
    industry: string
    placeholder: string
    greeting?: string
    starters: string[]
    tryLabel: string
    tryHref?: string
  }
}

export type Course = {
  id: string
  brand: Brand
  deliveredBy: string
  discipline: string
  disciplineSlug: string
  title: string
  slug: string
  copy: Copy
  delivery?: 'campus' | 'online'
  hero: { h1: string; h1Accent?: string; sub: string; image: string; imageAlt: string }
  fee: { year: number; amount: number; includes: string; gstInclusive: boolean; freeNote?: string; standardAmount?: number }
  funding: {
    loanApproved: boolean
    efts: number
    weeks: number
    fullTime: boolean
    applyBy: string
    applyByLabel: string
    courseRelatedCosts: number
    livingCostsMax: number
  }
  outcomes: {
    stat?: { label: string; value: string; cohort: number }
    salary?: { start: number; threeYear: number; source: string; year: number }
    employers: string[]
    employersMore: number
    employersYear: number
    story?: {
      initials: string
      text: string
      course: string
      campus: string
      year: number
      consent: boolean
    }
  }
  quick: { nextStart: string; length: string; where: string; need: string; get: string }
  like: { video: string | null; videoPoster: string; videoCaption: string; text: string; schedule: string }
  kit?: { image: string; imageAlt: string; lede: string; items: string[]; value: number }
  aiPerk?: AiPerk
  microCredentials?: MicroCredential[]
  cv?: {
    targetRole: string
    blurb: string
    /** Certificates and tickets earned inside the course, shown on the CV. */
    certifications: { name: string; issuer: string }[]
    /** Things a graduate can do unsupervised on their first shift. */
    dayOne: string[]
  }
  postgrad?: Postgrad
  stages: Stage[]
  entry: {
    minAge: number
    backgrounds: string[]
    fallback: { label: string; weeks: number; href: string; note?: string }
  }
  intakes: Intake[]
  tryIt?: TryItMode[]
  pathways: { work: string; next: string; before: string }
  faqs: { q: string; a: string }[]
  structure?: CourseStructure
  formal: {
    level: number
    credits: number
    campuses: string[]
    intakesYear: number
    intakesLabel: string
    intl: { minAge: number; ielts: string; href: string }
    links: { structure: string; fees: string; support: string; enrol: string; refund: string }
  }
}

export const REFUND_PROMISE = "Try it for two weeks. If it's not for you, you get every cent back."

export function courseHref(course: Pick<Course, 'disciplineSlug' | 'slug'>) {
  return `/courses/${course.disciplineSlug}/${course.slug}`
}

export function isFree(course: Pick<Course, 'fee'>) {
  return course.fee.amount === 0
}

export function coursePromise(course: Pick<Course, 'copy'>) {
  return course.copy.promise ?? REFUND_PROMISE
}

export function formatNZD(n: number) {
  return n.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 0 })
}

export function formatAUD(n: number) {
  return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
}

export function formatMoney(n: number, currency: Currency = 'NZD') {
  return currency === 'AUD' ? formatAUD(n) : formatNZD(n)
}

export type PlaceStatus = 'spaces' | 'filling' | 'waitlist' | 'interest'

export function placeStatus(left: number | undefined, unconfirmed?: boolean): PlaceStatus {
  if (unconfirmed || left === undefined) return 'interest'
  if (left <= 0) return 'waitlist'
  if (left < 5) return 'filling'
  return 'spaces'
}

/** Capacity-aware variant for capped intakes: "filling" once 60% of places are taken. */
export function intakeStatus(left: number, capacity: number): PlaceStatus {
  if (left <= 0) return 'waitlist'
  if (left < 5 || left / capacity <= 0.4) return 'filling'
  return 'spaces'
}

export const STATUS_LABEL: Record<PlaceStatus, string> = {
  spaces: 'Spaces available',
  filling: 'Filling fast',
  waitlist: 'Waitlist',
  interest: 'Register interest',
}
