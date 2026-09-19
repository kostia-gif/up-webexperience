export type Advisor = {
  name: string
  role: string
  photo: string
  /** One line in their own voice, shown under the photo. */
  line: string
}

export type CallWindow = {
  id: 'morning' | 'afternoon' | 'evening'
  label: string
  hours: string
}

export const CALL_WINDOWS: CallWindow[] = [
  { id: 'morning', label: 'Morning', hours: '9am to 12pm' },
  { id: 'afternoon', label: 'Afternoon', hours: '12pm to 5pm' },
  { id: 'evening', label: 'Early evening', hours: '5pm to 7pm' },
]

export const ADVISORS: Record<string, Advisor> = {
  nzma: {
    name: 'Aroha',
    role: 'Course advisor, NZMA',
    photo: '/images/advisors/nzma-aroha.png',
    line: 'I did this course in 2016. I will help you find the right pathway and tell you what it is really like to study here.',
  },
  elite: {
    name: 'Priya',
    role: 'Admissions advisor, Elite',
    photo: '/images/advisors/elite-priya.png',
    line: 'I will help you pick the right course for your goals and tell you what a first week and the career ahead really look like.',
  },
  yoobee: {
    name: 'Sam',
    role: 'Student advisor, Yoobee',
    photo: '/images/advisors/yoobee-sam.png',
    line: 'I will help you choose the right course for the career you are after, and talk you through what it is like to study with us.',
  },
  aipc: {
    name: 'Megan',
    role: 'Course specialist, AIPC',
    photo: '/images/advisors/aipc-megan.png',
    line: 'I will help you find the right course and career pathway, and tell you what it is like to study with us.',
  },
}

export function advisorFor(brandId: string): Advisor {
  return ADVISORS[brandId] ?? ADVISORS.nzma
}

/** The faces shown on the AIPC "let's talk" section — the people you actually meet. */
export const AIPC_TEAM: Advisor[] = [
  { name: 'Megan', role: 'Course specialist', photo: ADVISORS.aipc.photo, line: ADVISORS.aipc.line },
  {
    name: 'Daniel',
    role: 'Placement & credit',
    photo: '/images/advisors/aipc-daniel.png',
    line: 'I sort out credit for your prior study and find a placement near where you live.',
  },
  {
    name: 'Sophie',
    role: 'Student support',
    photo: '/images/advisors/aipc-sophie.png',
    line: 'I help you fit study around work, family and everything else going on.',
  },
]
