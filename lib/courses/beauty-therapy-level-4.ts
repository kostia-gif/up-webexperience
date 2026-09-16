import type { Brand, Course } from '@/lib/course'

export const elite: Brand = {
  id: 'elite',
  name: 'Elite',
  legalName: 'Elite School of Beauty and Spa',
  wordmark: { title: 'Elite', sub: 'School of Beauty & Spa' },
  banner: {
    text: 'Join us at our September Auckland and Hamilton Open Day.',
    linkLabel: 'Register your interest.',
    href: '#tryit',
  },
  nav: [
    { label: 'Courses', href: '/makeup-beauty-courses', current: true },
    { label: 'Campuses', href: '/campuses' },
    { label: 'About Us', href: '/about' },
    { label: 'News and Events', href: '/news' },
    { label: 'Schools', href: '#' },
    { label: 'Contact Us', href: '/contact' },
  ],
  enrolHref: '/enrol',
  phone: '0800 463 5483',
  footerBlurb:
    'Elite School of Beauty and Spa. Part of UP Education. Campuses in Auckland, Hamilton and Wellington.',
  footerCols: [
    { h: 'Courses', links: ['All courses', 'Beauty therapy', 'Makeup artistry', 'Spa therapies', 'Nail technology', 'Short courses'] },
    { h: 'Campuses', links: ['Queen Street (Auckland)', 'Hamilton', 'Wellington'] },
    { h: 'Support', links: ['Student support and wellbeing', 'Fees, refunds and withdrawal', 'How to enrol', 'International students'] },
  ],
  themeColor: '#161616',
}

export const beautyTherapyLevel4: Course = {
  id: 'beauty-l4',
  brand: elite,
  deliveredBy: 'Elite School of Beauty and Spa',
  discipline: 'Beauty therapy',
  disciplineSlug: 'beauty',
  title: 'New Zealand Certificate in Beauty Therapy (Level 4)',
  slug: 'certificate-in-beauty-therapy-level-4',
  copy: {
    heroTry: 'Try a treatment, free',
    feeSub: 'Products, kit and GST included.',
    likeTitle: 'A Tuesday at Queen Street',
    likeVideoLabel: 'Play video: a student-shot afternoon in the training spa, captioned',
    kitTitle: 'Open your kit',
    kitStep: 'Step 1 · Day one, 9:00am',
    skillsTitle: "What you'll be able to do, and what it means to a spa manager",
    jobNoun: 'a beauty job',
    coach: {
      name: 'Elite Career Coach',
      initials: 'EC',
      industry: 'the beauty industry',
      placeholder: 'Ask anything about the course or your future in beauty',
      starters: [
        'Is beauty therapy actually right for me?',
        'What job could I get after this, and what does it pay?',
        'I only have NCEA Level 1. Can I still get in?',
        'Should I do Level 3 first?',
      ],
      tryLabel: 'Book a free treatment session',
    },
  },
  hero: {
    h1: 'Become a beauty therapist',
    sub: 'Real clients, real spa rooms, hands on skin from week one. 32 weeks.',
    image: '/images/beauty/hero-spa.png',
    imageAlt: 'A beauty therapy student in a black tunic performing a facial on a client in the Elite training spa',
  },
  fee: {
    year: 2027,
    amount: 14068,
    includes: 'Products and professional kit included',
    gstInclusive: true,
  },
  funding: {
    loanApproved: true,
    efts: 0.8,
    weeks: 32,
    fullTime: true,
    applyBy: '2026-12-15',
    applyByLabel: '15 Dec 2026',
    courseRelatedCosts: 1000,
    livingCostsMax: 333,
  },
  outcomes: {
    stat: { label: 'In a beauty job within 6 months', value: '81%', cohort: 2025 },
    salary: { start: 50000, threeYear: 62000, source: 'NZ Association of Registered Beauty Professionals survey', year: 2025 },
    employers: ['Chuan Spa at Cordis', 'East Day Spa', 'Caci Clinic', 'Spring Spa', 'Forme Spa'],
    employersMore: 30,
    employersYear: 2025,
    story: {
      initials: 'SM',
      text: 'I was nervous touching a real client in week three. By week twenty I had my own regulars booking in for facials on our student clinic days.',
      course: 'Beauty Therapy L4',
      campus: 'Queen Street',
      year: 2025,
      consent: true,
    },
  },
  quick: {
    nextStart: '15 Feb 2027',
    length: '32 weeks',
    where: '3 campuses',
    need: '16+, NCEA L2',
    get: 'NZ Cert L4',
  },
  kit: {
    image: '/images/beauty/day-one-kit.png',
    imageAlt:
      'The Elite beauty therapy kit laid out: black tunic, facial brush and spatula roll, tweezers and nail tools, wax heater, gel polish, professional skincare and a notebook',
    lede: 'Everything you need to work on a real client is on your trolley from day one. Professional products and tools, yours to keep.',
    items: [
      'Professional skincare range for facials',
      'Facial brush, sponge and spatula set',
      'Strip and hot wax starter kit',
      'Manicure and pedicure tool set',
      'Gel polish and nail art starter',
      'Client consultation and skin analysis notebook',
    ],
    value: 2114,
  },
  like: {
    video: null,
    videoPoster: '/images/beauty/video-poster.png',
    videoCaption: 'Priya, 20, films a student clinic afternoon at Queen Street. 68 seconds, captioned.',
    text: 'About 22 hours a week on campus across three or four days. Mornings are theory: skin science, anatomy, contraindications. Afternoons you are in the spa rooms in your tunic, working on classmates first, then real paying clients on student clinic days. You touch everything: waxing, facials, electrical machines, nails, massage. Around 15 hours a week of your own study on top.',
    schedule: 'about 22 contact hours a week across three or four days, plus roughly 15 hours of self-directed study',
  },
  stages: [
    {
      label: 'By week 6',
      voice: {
        text: 'My friends now book me in for brows and a hand massage on the weekend. It stopped feeling like homework really fast.',
        name: 'Mia',
        campus: 'Queen Street',
        surveyed: 'Week 6 NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Run a proper client consultation',
          means: 'Take a history, spot contraindications and write a treatment plan the client actually understands.',
        },
        {
          can: 'Wax cleanly, strip and hot',
          means: 'Brows, lip, underarm and leg with the right product, temperature and aftercare.',
        },
        {
          can: 'Read skin',
          means: 'Analyse skin type and condition under the mag lamp and pick the right products for it.',
          quote: {
            text: 'If a student can tell me why they chose that cleanser for that client, I know they will be fine on my floor.',
            role: 'Spa Manager',
            venue: 'East Day Spa',
            city: 'Auckland',
            approvedOn: '2026-08-05',
            approvedBy: 'L. Reid, Industry Partnerships',
          },
        },
      ],
    },
    {
      label: 'By week 18',
      voice: {
        text: 'Student clinic days are the best. Real clients, real bookings, and you can see people relax under your hands.',
        name: 'Tayla',
        campus: 'Hamilton',
        surveyed: 'Week 18 NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Deliver a full electrical facial',
          means: 'High frequency, galvanic and vacuum suction, safely, on a real client, to time.',
        },
        {
          can: 'Do a full manicure and pedicure',
          means: 'Massage, gel polish application and removal, nail art, and specialised hand and foot treatments.',
        },
        {
          can: 'Give a body massage clients rebook for',
          means: 'Swedish techniques, draping and pressure that hold up on a paying client.',
          quote: {
            text: 'Elite graduates arrive knowing how to hold a room. Timing, draping, product use, all there.',
            role: 'Owner',
            venue: 'Spring Spa',
            city: 'Wellington',
            approvedOn: '2026-07-22',
            approvedBy: 'L. Reid, Industry Partnerships',
          },
        },
      ],
    },
    {
      label: 'When you finish',
      voice: {
        text: 'I was offered a job at the spa I did my work experience in. Started two weeks after graduation.',
        name: 'Priya',
        campus: 'Queen Street',
        surveyed: 'Graduate NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Take an entry-level beauty therapist job',
          means: '81% of 2025 graduates were in a beauty job within six months.',
        },
        {
          can: 'Run a full treatment menu',
          means: 'Consult, treat, retail and rebook a client across waxing, facials, nails and massage.',
        },
        {
          can: 'Step up to Level 5',
          means: 'Direct entry into advanced skin, body and spa therapies.',
        },
      ],
    },
  ],
  entry: {
    minAge: 16,
    backgrounds: ['NCEA Level 2 or above', 'Beauty Level 3', 'Worked in a salon or spa', 'None of these yet'],
    fallback: { label: 'Beauty Level 3', weeks: 20, href: '/courses/beauty/certificate-in-beauty-level-3' },
  },
  intakes: [
    {
      date: '2027-02-15',
      label: '15 Feb 2027',
      campuses: [
        { name: 'Queen Street', left: 3 },
        { name: 'Hamilton', left: 9 },
        { name: 'Wellington', left: 0 },
      ],
    },
    {
      date: '2027-07-19',
      label: '19 Jul 2027',
      campuses: [
        { name: 'Queen Street', left: 14 },
        { name: 'Hamilton', left: 14 },
        { name: 'Wellington', left: 6 },
      ],
    },
    { label: 'Feb 2028', unconfirmed: true },
  ],
  tryIt: [
    {
      mode: 'Try a treatment',
      blurb: 'Ninety minutes in the spa with a tutor. You give a hand massage and get a mini facial back.',
      slots: [
        { when: 'Sat 19 Sep, 10am · Queen Street', what: 'Mini facial and brow shaping', left: 2 },
        { when: 'Wed 23 Sep, 4pm · Hamilton', what: 'Hand massage and gel polish', left: 8 },
        { when: 'Sat 26 Sep, 10am · Wellington', what: 'Mini facial and brow shaping', left: 10 },
        { when: 'Thu 1 Oct, 4pm · Queen Street', what: 'Skin analysis under the lamp', left: 6 },
      ],
    },
    {
      mode: 'Open day',
      blurb: 'Walk the spa rooms, meet tutors and current students, ask anything.',
      slots: [
        { when: 'Sat 26 Sep, 10am–1pm · Queen Street and Hamilton', what: 'Drop in any time, tours every 30 minutes' },
        { when: 'Sat 14 Nov, 10am–1pm · Wellington', what: 'Family open morning' },
      ],
    },
    {
      mode: 'Talk to someone',
      blurb: 'Fifteen minutes with a course advisor. No script, no pressure.',
      slots: [
        { when: 'Today, 3:30pm · phone or video', what: 'Jess, course advisor' },
        { when: 'Tomorrow, 10:15am · phone or video', what: 'Hana, course advisor' },
        { when: 'Thu, 6pm · phone or video', what: 'Evening slot for after work or school' },
      ],
    },
  ],
  pathways: {
    work: 'Beauty therapist in a day spa, salon or skin clinic, or a cosmetic brand rep. Most 2025 grads started between $25 and $28 an hour.',
    next: 'NZ Diploma in Beauty Therapy Level 5. Direct entry from this course, advanced skin and body therapies.',
    before: 'Beauty Level 3 is the way in if you do not have NCEA Level 2 yet. 20 weeks.',
  },
  faqs: [
    {
      q: 'What if I start and hate it?',
      a: 'You have two weeks. Withdraw in that time and you get every cent back, including StudyLink fees. After that the published refund policy applies.',
    },
    {
      q: 'Do I need to buy products or a kit?',
      a: 'No. Professional products and your tool kit are included in the fee and you keep them. The tunic uniform is extra, between $140 and $380 depending on what you pick, and you can add it to a StudyLink course-related costs loan.',
    },
    {
      q: 'Do I need a laptop?',
      a: 'Yes. A laptop or computer, microphone and reliable internet. A phone is not enough for the theory side.',
    },
    {
      q: 'Can I work while I study?',
      a: 'Yes. You are on campus about 22 hours a week across three or four days. Most students work part-time, often in salons or retail we helped them find.',
    },
    {
      q: 'I am 16. Can I get in?',
      a: 'Yes, if you are 16 or over at the start and have NCEA Level 2 or a Level 3 beauty certificate. An interview may be part of it. If not, Beauty Level 3 is a 20-week way in.',
    },
  ],
  formal: {
    level: 4,
    credits: 120,
    campuses: ['Queen Street (Auckland)', 'Hamilton', 'Wellington'],
    intakesYear: 2027,
    intakesLabel: 'February and July',
    intl: { minAge: 18, ielts: '5.5 (no band under 5)', href: '/international' },
    links: {
      structure: '#formal',
      fees: '#formal',
      support: '#formal',
      enrol: '/enrol',
      refund: '#formal',
    },
  },
}
