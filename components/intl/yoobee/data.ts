import type { VisitorCountry } from '@/lib/geo'

export type CountryProfile = {
  code: VisitorCountry
  name: string
  nativeName?: string
  greeting?: string
  lang: { code: string; label: string }
  flight: string
  timezone: string
  community: string
  messaging: string
  advisor: string
  currency: { code: string; symbol: string; perNzd: number }
  callWindow: string
}

export const COUNTRIES: Record<VisitorCountry, CountryProfile> = {
  CN: {
    code: 'CN',
    name: 'China',
    nativeName: '中国',
    greeting: '欢迎',
    lang: { code: 'zh', label: '中文' },
    flight: 'Shanghai to Auckland is about 11 hours direct with Air New Zealand or China Eastern. Guangzhou is 11 hours with China Southern.',
    timezone: 'Auckland is 4 hours ahead of Beijing, 5 hours in the New Zealand summer. A 7 pm call at home is 11 pm or midnight here, so we hold family calls in the morning your time.',
    community: 'Around 250,000 New Zealanders have Chinese heritage and most live in Auckland. Dominion Road, Northcote and Albany have Chinese supermarkets, bakeries and restaurants, and Lunar New Year is a citywide festival.',
    messaging: 'WeChat',
    advisor: 'Mandarin-speaking international advisor',
    currency: { code: 'CNY', symbol: '¥', perNzd: 4.3 },
    callWindow: '9 am to 1 pm Beijing time, Monday to Friday',
  },
  IN: {
    code: 'IN',
    name: 'India',
    lang: { code: 'hi', label: 'हिन्दी' },
    flight: 'Delhi or Mumbai to Auckland is about 16 hours with one stop in Singapore. Direct services from Delhi are planned from 2028.',
    timezone: 'Auckland is 6 hours 30 minutes ahead of India Standard Time, 7 hours 30 minutes in the New Zealand summer.',
    community: 'Indian New Zealanders are the third-largest ethnic group in Auckland. Sandringham and Papatoetoe are known for their South Asian food, temples and Diwali celebrations.',
    messaging: 'WhatsApp',
    advisor: 'Hindi and Punjabi-speaking international advisor',
    currency: { code: 'INR', symbol: '₹', perNzd: 50 },
    callWindow: '9 am to 1 pm IST, Monday to Friday',
  },
  VN: {
    code: 'VN',
    name: 'Vietnam',
    nativeName: 'Việt Nam',
    lang: { code: 'vi', label: 'Tiếng Việt' },
    flight: 'Ho Chi Minh City to Auckland is about 13 hours with one stop in Singapore or Sydney.',
    timezone: 'Auckland is 5 hours ahead of Vietnam, 6 hours in the New Zealand summer.',
    community: 'A growing Vietnamese community with phở and bánh mì on most Auckland high streets, and a Vietnamese Students Association on campus.',
    messaging: 'Zalo',
    advisor: 'Vietnamese-speaking international advisor',
    currency: { code: 'VND', symbol: '₫', perNzd: 15000 },
    callWindow: '9 am to 1 pm Hanoi time, Monday to Friday',
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    nativeName: '대한민국',
    lang: { code: 'ko', label: '한국어' },
    flight: 'Seoul to Auckland is about 11 hours 30 minutes direct with Korean Air or Air New Zealand.',
    timezone: 'Auckland is 3 hours ahead of Korea, 4 hours in the New Zealand summer.',
    community: 'Auckland has New Zealand\u2019s largest Korean community, centred on Northcote and the North Shore, with Korean churches, cafés and grocers.',
    messaging: 'KakaoTalk',
    advisor: 'Korean-speaking international advisor',
    currency: { code: 'KRW', symbol: '₩', perNzd: 820 },
    callWindow: '10 am to 2 pm KST, Monday to Friday',
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    nativeName: '日本',
    lang: { code: 'ja', label: '日本語' },
    flight: 'Tokyo to Auckland is about 11 hours direct with Air New Zealand.',
    timezone: 'Auckland is 3 hours ahead of Japan, 4 hours in the New Zealand summer.',
    community: 'A well-established Japanese community in Auckland with a Japanese Society, language schools and weekend markets.',
    messaging: 'LINE',
    advisor: 'Japanese-speaking international advisor',
    currency: { code: 'JPY', symbol: '¥', perNzd: 92 },
    callWindow: '10 am to 2 pm JST, Monday to Friday',
  },
  NZ: {
    code: 'NZ',
    name: 'New Zealand',
    lang: { code: 'en', label: 'English' },
    flight: '',
    timezone: '',
    community: '',
    messaging: 'WhatsApp',
    advisor: 'international advisor',
    currency: { code: 'NZD', symbol: '$', perNzd: 1 },
    callWindow: '9 am to 5 pm NZ time, Monday to Friday',
  },
  OTHER: {
    code: 'OTHER',
    name: 'your country',
    lang: { code: 'en', label: 'English' },
    flight: 'Auckland is served by direct flights from Asia, the Pacific and the Americas, and by one-stop services from Europe.',
    timezone: 'Auckland is 12 hours ahead of UTC, 13 hours in the New Zealand summer.',
    community: 'Auckland is one of the most multicultural cities in the world: two in five residents were born overseas.',
    messaging: 'WhatsApp',
    advisor: 'international advisor',
    currency: { code: 'USD', symbol: 'US$', perNzd: 0.6 },
    callWindow: 'in your time zone, Monday to Friday',
  },
}

export const FEES = {
  tuition: 23900,
  materials: 700,
  insurance: 650,
  livingPerYear: 20000,
  intake: '8 February 2027',
  applyBy: '30 November 2026',
  weeks: 19,
}

export const NAV: [string, string][] = [
  ['#place', 'Auckland'],
  ['#campus', 'Campus & facilities'],
  ['#community', 'Student life'],
  ['#programme', 'Programme'],
  ['#families', 'For families'],
  ['#admissions', 'Admissions & fees'],
  ['#enquire', 'Contact'],
]

export const TRUST = [
  { k: 'NZQA', v: 'Category 1 provider, the highest quality rating' },
  { k: '1988', v: 'Founded in Auckland; New Zealand\u2019s largest specialist creative college' },
  { k: 'Code', v: 'Signatory to the Pastoral Care of Tertiary and International Learners Code' },
  { k: 'UP Education', v: 'Part of a group teaching 14,000 students across New Zealand and Australia' },
]

export const FACILITIES = [
  {
    id: 'studios',
    label: 'Design and animation studios',
    body: 'Twelve teaching studios with 27-inch colour-calibrated monitors, Wacom Cintiq tablets and the full Adobe and Autodesk suites. Every seat is a professional workstation, not a shared lab.',
    img: '/images/yoobee-intl/studio-lab.png',
    alt: 'Students at large monitors in a bright animation studio with a tutor helping',
  },
  {
    id: 'mocap',
    label: 'Motion capture and sound stage',
    body: 'A 120 square metre motion capture volume with Vicon cameras, a green-screen sound stage and two foley and voice booths, used by second-year film and game students and open to certificate students on project weeks.',
    img: '/images/yoobee-intl/studio-lab.png',
    alt: 'A motion capture and film studio space',
  },
  {
    id: 'library',
    label: 'Library and quiet study',
    body: 'A creative library with 9,000 titles, a print and materials collection and 60 quiet study desks, open until 9 pm on weekdays. Librarians offer one-to-one research help in English and Mandarin.',
    img: '/images/yoobee-intl/campus-exterior.png',
    alt: 'Exterior of the Auckland campus building',
  },
  {
    id: 'wellbeing',
    label: 'Student services and wellbeing',
    body: 'A dedicated international office, on-site counsellors, a prayer and reflection room, and a student kitchen and lounge. A 24-hour support line is staffed by college staff, not an outsourced service.',
    img: '/images/yoobee-intl/students-community.png',
    alt: 'Students sitting together on campus steps',
  },
]

export const COHORT = [
  { label: 'New Zealand', pct: 62 },
  { label: 'China', pct: 14 },
  { label: 'India', pct: 8 },
  { label: 'Vietnam, Korea, Japan', pct: 9 },
  { label: 'Other', pct: 7 },
]

export const PATHWAY = [
  { level: 'Level 4', title: 'NZ Certificate in Digital Media and Design', length: '19 weeks', note: 'You are here' },
  { level: 'Level 5', title: 'NZ Diploma in Animation, Film or Design', length: '1 year', note: 'Guaranteed progression with a pass' },
  { level: 'Level 7', title: 'Bachelor of Creative Innovation', length: '3 years (2 with credit)', note: 'NZQA-approved degree' },
  { level: 'Post-study', title: 'Post-Study Work Visa', length: 'Up to 3 years', note: 'For degree graduates' },
]

export const STORIES = [
  {
    name: 'Li Wei',
    native: '李伟',
    from: 'Hangzhou, China',
    course: 'Certificate 2025, now Diploma in Animation',
    quote:
      'My parents worried it was not a real university. When they saw the studios on the video tour, and met my tutor on WeChat, they relaxed. Auckland is quiet and safe. I share a flat with two Kiwi students and one from Chengdu, ten minutes\u2019 walk from campus.',
    img: '/images/yoobee-intl/student-liwei.png',
  },
]

export const STEPS = [
  { t: 'Enquire', d: 'Tell us about yourself. An advisor who speaks your language replies within one working day.' },
  { t: 'Family video call', d: 'A 30-minute call for you and your parents with the international office and a current student. Weekend slots available.' },
  { t: 'Apply', d: 'Online application with school transcripts, passport and English evidence. Decision within 5 working days.' },
  { t: 'Offer and payment plan', d: 'A formal Offer of Place. Tuition can be paid in two instalments.' },
  { t: 'Visa', d: 'We prepare your Fee Receipt and accommodation confirmation for Immigration New Zealand. Most student visas take 4 to 8 weeks.' },
  { t: 'Arrive', d: 'Airport pickup, a week of orientation and a buddy from your home country before classes begin.' },
]
