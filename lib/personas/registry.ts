export type BrandKey = 'aipc' | 'yoobee' | 'nzst'
export type PersonaKey = 'sarah' | 'dan' | 'plan-b' | 'meta-kids' | 'tailwinds' | 'confidence'
export type Job = 'Check' | 'Prove' | 'Fit' | 'Act' | 'Talk and share'
export type Status = 'In POC' | 'Adapted' | 'New' | 'Idea'

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
    mainAction: 'Talk to a tutor',
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
    testing: 'Whether a calm, proof-led page with "Talk to a tutor" as the main action earns a conversation from Sarah, and whether one routing question gives Dan a fast credit answer and a way to enrol without a call.',
  },
  {
    brand: 'yoobee',
    course: 'Certificate in Creative Media',
    personas: ['plan-b'],
    href: '/yoobee/creative-media',
    testing: 'Whether outcomes evidence, switcher stories and a course finder speed up the decision for an adult with commitments.',
  },
  {
    brand: 'yoobee',
    course: 'Diploma in Animation (Level 5)',
    personas: ['meta-kids'],
    href: '/yoobee/diploma-in-animation',
    testing: 'Whether leading with student work and a maker\u2019s voice makes an 18 to 19 year old recognise their tribe and book a campus visit.',
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

export type ModuleDef = {
  slug: string
  name: string
  blurb: string
  job: Job
  brands: BrandKey[] | 'all'
  personas: PersonaKey[] | 'all'
  status: Status
  whoFor: string
  whatItDoes: string
  learn: string
  sits: string
  usedOn: string[]
  phoneFirst?: boolean
}

export const MODULES: ModuleDef[] = [
  {
    slug: 'instant-check',
    name: 'Instant check ("Can I get in?")',
    blurb: 'Three or four questions and an immediate, positive answer with a next step. Never a rejection.',
    job: 'Check',
    brands: ['nzst', 'yoobee'],
    personas: ['tailwinds', 'confidence'],
    status: 'Adapted',
    whoFor: 'People who decide in the moment and will leave if the process slows down, and people who assume the answer is no.',
    whatItDoes: 'Asks age, school qualifications and customer experience, then returns "You\u2019re in" with a start date, or "Start here" with the first course on the same journey.',
    learn: 'Does an instant yes lift enquiry to application, and does "Start here" keep people who would otherwise bounce?',
    sits: 'Directly under the hero, as the main action. Also reachable from the sticky bar.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'credit-checker',
    name: 'Credit checker',
    blurb: 'Role, prior study and experience in; subjects credited, time and cost saved out.',
    job: 'Check',
    brands: ['aipc'],
    personas: ['dan'],
    status: 'Adapted',
    whoFor: 'Someone already in the field who wants credit for what they have done before they commit.',
    whatItDoes: 'Three questions return subjects credited, months saved and dollars saved, with the rules behind the answer one tap away.',
    learn: 'Does a plain credit answer move frontliners straight to enrolment?',
    sits: 'Main action on the Dan version of the AIPC page.',
    usedOn: ['/aipc/master-of-counselling?for=dan'],
  },
  {
    slug: 'cost-and-funding-checker',
    name: 'Cost and funding checker',
    blurb: '"Is it free for me?" or "What help can I get?" in three questions, with the conditions shown.',
    job: 'Check',
    brands: ['yoobee', 'nzst'],
    personas: ['plan-b', 'confidence'],
    status: 'Adapted',
    whoFor: 'People for whom cost can end the idea before it starts.',
    whatItDoes: 'Asks residency, prior study and age or situation, then states what is free, what is likely funded and what conditions apply.',
    learn: 'Does showing conditions up front reduce confusion from "Zero fees*" style claims?',
    sits: 'Mid-page, after the proof sections.',
    usedOn: ['/yoobee/creative-media', '/nzst/flight-attending'],
  },
  {
    slug: 'full-cost-calculator',
    name: 'Full cost calculator',
    blurb: 'Tuition plus the extras (travel, placement, kit), with payment options side by side.',
    job: 'Check',
    brands: ['aipc'],
    personas: ['sarah'],
    status: 'Adapted',
    whoFor: 'A careful adult who hates costs she discovers later.',
    whatItDoes: 'Pick the course version and your extras, see the full figure, then compare FEE-HELP, per trimester and a mix.',
    learn: 'Does total honesty on cost increase trust and conversations rather than scaring people off?',
    sits: 'After placement, before the pathway.',
    usedOn: ['/aipc/master-of-counselling'],
  },
  {
    slug: 'course-finder',
    name: 'Course finder',
    blurb: 'Four or five questions ending in a recommended course and an advisor conversation.',
    job: 'Check',
    brands: ['yoobee'],
    personas: ['plan-b'],
    status: 'New',
    whoFor: 'People who know they are creative but not which course.',
    whatItDoes: 'Interests, experience, time available and goal lead to one recommended course, an alternative, and a named advisor to talk it through.',
    learn: 'Does a finder lift advisor conversations from people who would otherwise leave undecided?',
    sits: 'Main action, directly under the hero.',
    usedOn: ['/yoobee/creative-media'],
  },
  {
    slug: 'routing-question',
    name: 'Routing question',
    blurb: '"Which sounds most like you?" switches the page version and the follow-up.',
    job: 'Check',
    brands: 'all',
    personas: 'all',
    status: 'New',
    whoFor: 'Every page with more than one persona.',
    whatItDoes: 'One question near the top switches the hero, main action and section order. In enquiry forms it changes the confirmation message.',
    learn: 'Do people self-select honestly, and does the switched version convert better than the default?',
    sits: 'Under the hero, and inside every enquiry form.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/creative-media', '/nzst/flight-attending'],
  },
  {
    slug: 'people-cards',
    name: 'People cards',
    blurb: 'Tutors or advisors with photo, background, short video and a way to book them.',
    job: 'Prove',
    brands: ['aipc', 'yoobee'],
    personas: ['sarah', 'meta-kids', 'plan-b'],
    status: 'New',
    whoFor: 'Anyone checking who will teach them, or who wants to talk to a person who knows the subject rather than a salesperson.',
    whatItDoes: 'Cards with practice or industry background, a short video placeholder and bookable 20-minute slots.',
    learn: 'Does "Talk to a tutor" earn more conversations than "Apply now"?',
    sits: 'Main action on AIPC. Proof section on Yoobee Animation.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/diploma-in-animation'],
  },
  {
    slug: 'stories-matched',
    name: 'Stories matched to the reader',
    blurb: 'Pick a background and see graduates like you: "Graduates like me", switcher stories, "People like me".',
    job: 'Prove',
    brands: 'all',
    personas: ['sarah', 'plan-b', 'confidence'],
    status: 'New',
    whoFor: 'People asking "would someone like me do this?"',
    whatItDoes: 'A filter by former career, old job or starting situation shows matching graduates with age, previous role and how long it took.',
    learn: 'Does matching the story to the reader increase time on page and enquiries?',
    sits: 'Proof section, after the facts.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/creative-media', '/nzst/flight-attending'],
  },
  {
    slug: 'outcomes-panel',
    name: 'Outcomes panel',
    blurb: 'Share of graduates in work, example employers and starting pay, each with a source.',
    job: 'Prove',
    brands: ['yoobee', 'aipc'],
    personas: ['plan-b', 'dan'],
    status: 'New',
    whoFor: 'People who need evidence that this pays before they give up a job.',
    whatItDoes: 'One number, one meaning, one source. Example employers and pay bands by role.',
    learn: 'Do sourced outcomes speed up the Plan B decision?',
    sits: 'First proof section under the hero.',
    usedOn: ['/yoobee/creative-media', '/aipc/master-of-counselling?for=dan'],
  },
  {
    slug: 'where-graduates-went',
    name: 'Where graduates went',
    blurb: 'Graduates listed by employer and role.',
    job: 'Prove',
    brands: ['yoobee', 'nzst'],
    personas: ['meta-kids', 'tailwinds'],
    status: 'New',
    whoFor: 'People who want to see the studios and airlines, not a statistic.',
    whatItDoes: 'A list grouped by employer, with the role and the year.',
    learn: 'Do named employers carry more weight than a percentage for passion-led readers?',
    sits: 'Proof section, after the people.',
    usedOn: ['/yoobee/diploma-in-animation', '/nzst/flight-attending'],
  },
  {
    slug: 'accreditation-panel',
    name: 'Accreditation panel',
    blurb: 'Who accredits the course and what that lets graduates do.',
    job: 'Prove',
    brands: ['aipc'],
    personas: ['sarah'],
    status: 'In POC',
    whoFor: 'Careful readers checking the qualification is not lightweight.',
    whatItDoes: 'Each body, what the accreditation means and what register graduates join.',
    learn: 'Does accreditation up front reduce the drop-off to competitor comparison?',
    sits: 'First section under the hero facts.',
    usedOn: ['/aipc/master-of-counselling'],
  },
  {
    slug: 'compare-with-university',
    name: 'Compare with university',
    blurb: 'Side-by-side table on cost, duration, recognition and flexibility.',
    job: 'Prove',
    brands: ['aipc', 'yoobee'],
    personas: ['sarah', 'plan-b'],
    status: 'In POC',
    whoFor: 'People who are already comparing providers side by side.',
    whatItDoes: 'An honest table with a note on where the figures come from.',
    learn: 'Does the comparison keep people on the site instead of opening another tab?',
    sits: 'Late in the page, before the questions.',
    usedOn: ['/aipc/master-of-counselling'],
  },
  {
    slug: 'what-employers-look-for',
    name: 'What employers look for',
    blurb: 'A checklist of what recruiters want, each matched to how the course covers it.',
    job: 'Prove',
    brands: ['nzst'],
    personas: ['tailwinds'],
    status: 'New',
    whoFor: '"Tell me what the airline recruiters are looking for, and I\u2019ll handle the rest."',
    whatItDoes: 'Each recruiter requirement paired with the module or activity that covers it.',
    learn: 'Does matching course to recruiter needs replace the need for a long course description?',
    sits: 'First section after the main action.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'student-work-wall',
    name: 'Student work wall',
    blurb: 'Edge-to-edge gallery of credited student work, filterable by discipline.',
    job: 'Prove',
    brands: ['yoobee'],
    personas: ['meta-kids', 'plan-b'],
    status: 'New',
    whoFor: 'Tribe for Meta Kids, standard for Plan B.',
    whatItDoes: 'A filterable wall where every piece is credited to a student and a course.',
    learn: 'Does leading with the work beat leading with a promise?',
    sits: 'The hero on the Animation page. A proof section on Creative Media.',
    usedOn: ['/yoobee/diploma-in-animation', '/yoobee/creative-media'],
  },
  {
    slug: 'graduate-video-reel',
    name: 'Graduate video reel',
    blurb: 'Vertical, swipeable clips of graduates with names and employers.',
    job: 'Prove',
    brands: ['nzst', 'yoobee'],
    personas: ['tailwinds', 'meta-kids'],
    status: 'Adapted',
    whoFor: 'People arriving from TikTok or Instagram who want faces and stories.',
    whatItDoes: 'A horizontal reel of 9:16 clips with name, employer and a one-line caption.',
    learn: 'Does social-style video hold people who arrive from social?',
    sits: 'Proof section, after the airlines.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'facts-strip',
    name: 'Facts strip',
    blurb: 'Fees, dates, duration, mode and accreditation in one plain-text line that AI assistants can read.',
    job: 'Prove',
    brands: 'all',
    personas: 'all',
    status: 'Adapted',
    whoFor: 'Every reader, and every AI assistant quoting the page.',
    whatItDoes: 'States each fact once, as plain text, under the hero. Detail lower down links back to it.',
    learn: 'Does one facts strip reduce repeated and conflicting figures across the page?',
    sits: 'Directly under the hero headline.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/creative-media', '/yoobee/diploma-in-animation', '/nzst/flight-attending'],
  },
  {
    slug: 'week-planner',
    name: 'Week planner',
    blurb: 'Study hours laid over a working week, with full-time, part-time and shift-work settings.',
    job: 'Fit',
    brands: ['aipc', 'yoobee', 'nzst'],
    personas: ['sarah', 'dan', 'plan-b', 'confidence'],
    status: 'Adapted',
    whoFor: 'Adults fitting study around a job, shifts or family.',
    whatItDoes: 'Choose a mode and see study blocks laid over a real week, with the hours total.',
    learn: 'Does seeing the week reduce "how many hours really?" enquiries?',
    sits: 'Fit section, after the proof.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/creative-media', '/nzst/flight-attending'],
  },
  {
    slug: 'pathway-picture',
    name: 'Pathway picture',
    blurb: 'The steps from first course to final goal on one screen, with time for each.',
    job: 'Fit',
    brands: ['nzst', 'aipc'],
    personas: ['confidence', 'sarah'],
    status: 'Adapted',
    whoFor: 'People who need the commitment to feel like steps, or who need Level 3 to look like the start of Flight.',
    whatItDoes: 'Three steps on one screen, each with its time, and the current step marked.',
    learn: 'Does a visible pathway turn Level 3 from a remedial course into a first step?',
    sits: 'Fit section.',
    usedOn: ['/nzst/flight-attending', '/aipc/master-of-counselling'],
  },
  {
    slug: 'specialism-explorer',
    name: 'Specialism explorer',
    blurb: 'Pick a passion and see the course, the craft and the jobs.',
    job: 'Fit',
    brands: ['yoobee'],
    personas: ['meta-kids'],
    status: 'New',
    whoFor: 'People with a specific ambition who want to see their exact specialism.',
    whatItDoes: 'Pick characters, environments, 2D or 3D and see the craft, the tools and the jobs it leads to.',
    learn: 'Does naming the specialism beat a general "creative" pitch?',
    sits: 'First section after the work wall.',
    usedOn: ['/yoobee/diploma-in-animation'],
  },
  {
    slug: 'getting-to-campus',
    name: 'Getting to campus',
    blurb: 'Enter a suburb and see the route, time and cost by train or bus.',
    job: 'Fit',
    brands: ['nzst'],
    personas: ['tailwinds', 'confidence'],
    status: 'New',
    whoFor: 'Students who judge the commute by cost and time, not distance.',
    whatItDoes: 'Pick a suburb, see the nearest campus, the route, the minutes and the weekly cost.',
    learn: 'Does an honest commute answer remove a hidden barrier for lower-income students?',
    sits: 'Fit section, near the cost strip.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'is-this-right-for-me',
    name: '"Is this right for me?" conversation',
    blurb: 'A short guided reflection that ends with a suggested pathway and an optional tutor conversation.',
    job: 'Fit',
    brands: ['aipc'],
    personas: ['sarah'],
    status: 'Idea',
    whoFor: 'Someone who has been thinking about it for a year and wants help deciding, not selling.',
    whatItDoes: 'A few reflective prompts, then a suggested entry point and the option to talk to a tutor.',
    learn: 'Is a reflective tool welcome, or does it feel like a quiz?',
    sits: 'Late in the page, before questions.',
    usedOn: [],
  },
  {
    slug: 'booking-slots',
    name: 'Booking slots',
    blurb: 'Pick a time for a tutor conversation, information session, campus visit or drop-in day.',
    job: 'Act',
    brands: 'all',
    personas: ['sarah', 'meta-kids', 'confidence'],
    status: 'Adapted',
    whoFor: 'Anyone whose next step is a conversation or a visit, not an application.',
    whatItDoes: 'A day and time picker with confirmation on the page. Used by people cards, sessions and visits.',
    learn: 'Which booking type gets picked, and how far ahead?',
    sits: 'Inside the main action.',
    usedOn: ['/aipc/master-of-counselling', '/yoobee/diploma-in-animation', '/nzst/flight-attending'],
  },
  {
    slug: 'free-taster-lesson',
    name: 'Free taster lesson',
    blurb: 'A real lesson from the course for an email address only.',
    job: 'Act',
    brands: ['yoobee'],
    personas: ['plan-b', 'meta-kids'],
    status: 'Adapted',
    whoFor: 'People who will not leave a job without testing the water.',
    whatItDoes: 'Shows what the lesson covers and sends it for an email only.',
    learn: 'Does a taster convert to enrolment at a higher rate than a brochure?',
    sits: 'The second action.',
    usedOn: ['/yoobee/creative-media'],
  },
  {
    slug: 'start-date-and-enrol',
    name: 'Start date and enrol',
    blurb: 'Pick an intake and campus, then enrol online without a call.',
    job: 'Act',
    brands: ['aipc', 'nzst'],
    personas: ['dan', 'tailwinds'],
    status: 'In POC',
    whoFor: 'People who are ready and do not want to be routed through a call.',
    whatItDoes: 'Intake and campus picker, then a short form that confirms on the page.',
    learn: 'How many choose to enrol directly when offered?',
    sits: 'End of the page, or straight after a "You\u2019re in" result.',
    usedOn: ['/aipc/master-of-counselling?for=dan', '/nzst/flight-attending'],
  },
  {
    slug: 'send-a-summary',
    name: 'Send a summary',
    blurb: 'One tap to send a short summary to a parent, family member or employer.',
    job: 'Talk and share',
    brands: 'all',
    personas: ['meta-kids', 'dan', 'tailwinds'],
    status: 'New',
    whoFor: 'People whose decision involves someone else: a parent, a partner or a manager.',
    whatItDoes: 'Builds a one-page summary of course, cost, time and recognition, to download or send.',
    learn: 'Does equipping the influencer shorten the decision?',
    sits: 'Late in the page, near the actions.',
    usedOn: ['/aipc/master-of-counselling?for=dan', '/yoobee/diploma-in-animation', '/nzst/flight-attending'],
  },
  {
    slug: 'message-us',
    name: 'Message us',
    blurb: 'WhatsApp or Instagram with a reply in minutes.',
    job: 'Talk and share',
    brands: ['nzst'],
    personas: ['tailwinds'],
    status: 'New',
    whoFor: 'People who live on messaging apps and will not fill in a callback form.',
    whatItDoes: 'Two buttons, a stated reply time and the hours someone is there.',
    learn: 'Do messaging channels replace the callback form for this age group?',
    sits: 'The second action, repeated in the sticky bar on phones.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'chat-now',
    name: 'Chat now',
    blurb: 'Instant answers with a handover to a person.',
    job: 'Talk and share',
    brands: ['aipc', 'yoobee'],
    personas: ['dan', 'plan-b'],
    status: 'Adapted',
    whoFor: 'People who want answers on the page, not in a call.',
    whatItDoes: 'A small chat with suggested questions, scripted answers and a visible handover to a named person.',
    learn: 'Which questions get asked, and how often is handover requested?',
    sits: 'Second action on the Dan version.',
    usedOn: ['/aipc/master-of-counselling?for=dan'],
  },
  {
    slug: 'text-me-back',
    name: 'Text me back',
    blurb: 'Leave a mobile number and get a text from a named person within minutes.',
    job: 'Talk and share',
    brands: ['nzst'],
    personas: ['confidence'],
    status: 'New',
    whoFor: 'People who fear silence after they enquire, and would not pick up an unknown call.',
    whatItDoes: 'Mobile number in, a named person and a reply time out, confirmed on the page.',
    learn: 'Does a text from a named person beat a callback for under-20s?',
    sits: 'Late in the page.',
    usedOn: ['/nzst/flight-attending'],
    phoneFirst: true,
  },
  {
    slug: 'what-happens-next',
    name: 'What happens next',
    blurb: 'After enquiry, shows the persona-matched confirmation and the first three messages they will receive.',
    job: 'Talk and share',
    brands: 'all',
    personas: 'all',
    status: 'Idea',
    whoFor: 'Everyone who enquires and wants to know what to expect.',
    whatItDoes: 'The confirmation changes with the routing answer and previews the next three messages.',
    learn: 'Does a visible follow-up plan reduce anxiety and no-shows?',
    sits: 'Immediately after any form.',
    usedOn: [],
  },
]

export const JOBS: Job[] = ['Check', 'Prove', 'Fit', 'Act', 'Talk and share']
export const STATUSES: Status[] = ['In POC', 'Adapted', 'New', 'Idea']

export function moduleBrands(m: ModuleDef): BrandKey[] {
  return m.brands === 'all' ? ['aipc', 'yoobee', 'nzst'] : m.brands
}

export function modulePersonas(m: ModuleDef): PersonaKey[] {
  return m.personas === 'all' ? (Object.keys(PERSONAS) as PersonaKey[]) : m.personas
}

export function findModule(slug: string) {
  return MODULES.find((m) => m.slug === slug)
}
