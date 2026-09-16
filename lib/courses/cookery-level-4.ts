import type { Brand, Course } from '@/lib/course'

export const nzma: Brand = {
  id: 'nzma',
  name: 'NZMA',
  legalName: 'New Zealand Management Academies',
  logo: { src: '/images/nzma-logo.png', alt: 'NZMA', width: 176, height: 38 },
  banner: { text: 'Join us for our open day on October 21st!', linkLabel: 'Register here.', href: '#tryit' },
  nav: [
    { label: 'Courses', reo: 'Ngā pou akoako', href: '/courses', current: true },
    { label: 'Campuses', reo: 'Ngā pou wānanga', href: '/our-campuses' },
    { label: 'Student Life', reo: 'Ngā akonga', href: '/student-life' },
    { label: 'Why Choose NZMA', reo: 'Kowhiria a NZMA', href: '/why-choose-nzma/overview' },
    { label: 'Schools', reo: 'Ngā kura', href: '#' },
    { label: 'Contact Us', reo: 'Whakapā mai', href: '/contact' },
  ],
  enrolHref: '/enrol',
  phone: '0800 222 833',
  footerBlurb: 'New Zealand Management Academies. Part of UP Education. Cookery is delivered by The Culinary Collective.',
  footerCols: [
    { h: 'Courses', links: ['All courses', 'Cookery', 'Hospitality', 'Health', 'Trades', 'Fees Free options'] },
    { h: 'Campuses', links: ['Sylvia Park', 'Manukau', 'Hamilton', 'Porirua', 'Wellington', 'Christchurch'] },
    { h: 'Support', links: ['Student support and wellbeing', 'Fees, refunds and withdrawal', 'How to enrol', 'International students'] },
  ],
  themeColor: '#0407f2',
}

export const cookeryLevel4: Course = {
  id: 'cookery-l4',
  brand: nzma,
  deliveredBy: 'The Culinary Collective',
  discipline: 'Cookery',
  disciplineSlug: 'cookery',
  title: 'New Zealand Certificate in Cookery (Level 4)',
  slug: 'certificate-in-cookery-level-4',
  copy: {
    heroTry: 'Come and cook, free',
    feeSub: 'Knives, whites and GST included.',
    likeTitle: 'A Thursday at Sylvia Park',
    likeVideoLabel: 'Play video: a student-shot Thursday lunch service, captioned',
    kitTitle: 'Open your kit',
    kitStep: 'Step 1 · Day one, 8:30am',
    skillsTitle: "What you'll be able to do, and what it means to a head chef",
    jobNoun: 'a kitchen job',
    coach: {
      name: 'NZMA Career Coach',
      initials: 'CC',
      industry: 'hospitality',
      placeholder: 'Ask anything about the course or your future in kitchens',
      starters: [
        'Is cookery actually right for me?',
        'What job could I get after this, and what does it pay?',
        'I left school early. Can I still get in?',
        'Should I do Level 3 first?',
      ],
      tryLabel: 'Book a free cooking session',
    },
  },
  hero: {
    h1: 'Become a chef in a year',
    sub: 'Real kitchens, real service, knives in your hands from week one.',
    image: '/images/hero-kitchen.png',
    imageAlt: 'A cookery student in chef whites plating a dish in the NZMA training kitchen',
  },
  fee: {
    year: 2027,
    amount: 8940,
    includes: 'Knives and whites included',
    gstInclusive: true,
  },
  funding: {
    loanApproved: true,
    efts: 0.9,
    weeks: 35,
    fullTime: true,
    applyBy: '2026-12-16',
    applyByLabel: '16 Dec 2026',
    courseRelatedCosts: 1000,
    livingCostsMax: 333,
  },
  outcomes: {
    stat: { label: 'In a kitchen job within 6 months', value: '84%', cohort: 2025 },
    salary: { start: 56000, threeYear: 72000, source: 'Restaurant Association NZ industry survey', year: 2025 },
    employers: ['Cordis', 'Hotel Britomart', 'SkyCity', 'Park Hyatt', 'Amano'],
    employersMore: 40,
    employersYear: 2025,
    story: {
      initials: 'HS',
      text: 'I came in not knowing how to hold a knife properly. Eight months later I was running the larder section on a Saturday night.',
      course: 'Cookery L4',
      campus: 'Sylvia Park',
      year: 2025,
      consent: true,
    },
  },
  quick: {
    nextStart: '16 Feb 2027',
    length: '35 weeks',
    where: '4 campuses',
    need: '17+, NCEA L1',
    get: 'NZ Cert L4',
  },
  kit: {
    image: '/images/day-one-kit.png',
    imageAlt: 'The NZMA cookery kit laid out: knife roll with six knives, chef jacket, apron, skull cap, probe thermometer and notebook',
    lede: 'Open your kit, ready to start your journey. Every enrolment gets the gear needed for the job, yours to keep.',
    items: [
      'Professional knife roll with 6 knives',
      'Two chef jackets and trousers',
      'Bib apron and skull cap',
      'Non-slip kitchen shoes',
      'Digital probe thermometer',
      'Recipe and prep notebook',
    ],
    value: 650,
  },
  cv: {
    targetRole: 'Commis chef',
    blurb:
      'Have a two-minute chat with our CV coach about school, any work you have done and what you want, and we will draft the CV you could hand a head chef the week you finish. Built from what this course teaches.',
    certifications: [
      { name: 'Food Safety, Unit Standard 167', issuer: 'NZQA' },
      { name: 'Workplace First Aid', issuer: 'NZQA Units 6400, 6401, 6402' },
      { name: 'Licence Controller Qualification (LCQ)', issuer: 'ServiceIQ' },
      { name: 'Barista Foundations', issuer: 'The Culinary Collective' },
    ],
    dayOne: [
      'Run a section on the line at service pace',
      'Prep to a list and a time, with nothing wasted',
      'Hold food safety and allergen standards without being reminded',
      'Cost a dish and hit a target margin',
    ],
  },
  like: {
    video: null,
    videoPoster: '/images/video-poster.png',
    videoCaption: 'Sione, 19, films a Thursday lunch service at Sylvia Park. 74 seconds, captioned.',
    text: 'Four days a week, 8:30 to 3:30. Mornings are knife work, stocks and prep in a 16-person kitchen. Twice a week you cook a real lunch service for paying guests in the training restaurant. You touch everything: fish, pastry, the pass. Fridays are yours.',
    schedule: 'four days a week 8:30 to 3:30, Fridays free',
  },
  stages: [
    {
      label: 'By week 6',
      voice: {
        text: 'I now love cooking for my family. Sunday dinner used to be a chore, now everyone waits to see what I bring home from class.',
        name: 'Aroha',
        campus: 'Sylvia Park',
        surveyed: 'Week 6 NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Hold a knife like a cook',
          means: 'Brunoise, julienne and chiffonade at a speed a head chef would let onto the line.',
        },
        {
          can: 'Run a clean, safe section',
          means: 'Food safety, allergen control and mise en place without being told.',
        },
        {
          can: 'Make the five mother sauces',
          means: 'From stock to sauce, seasoned and held at service temperature.',
          quote: {
            text: 'If they can turn out a clean velouté in week six, I know the rest will come.',
            role: 'Head Chef',
            venue: 'Wharf Kitchen',
            city: 'Auckland',
            approvedOn: '2026-08-12',
            approvedBy: 'J. Tan, Employer Partnerships',
          },
        },
      ],
    },
    {
      label: 'By week 20',
      voice: {
        text: 'So much fun working in a team during service. When the pass is flying and everyone is calling out, it feels like a real kitchen.',
        name: 'Deepak',
        campus: 'Manukau',
        surveyed: 'Week 20 NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Work a section during service',
          means: 'Cook 40 covers on larder or entremets without the pass slowing down.',
        },
        {
          can: 'Cook proteins to order',
          means: 'Fish, poultry, red meat: temperatures, resting and plating for a real menu.',
        },
        {
          can: 'Cost and write a dish',
          means: 'Portion, price and put up a dish that makes money on the menu.',
          quote: {
            text: 'The students who come to us from NZMA already understand food cost. That is rare.',
            role: 'Owner',
            venue: 'Little Sparrow',
            city: 'Hamilton',
            approvedOn: '2026-07-30',
            approvedBy: 'J. Tan, Employer Partnerships',
          },
        },
      ],
    },
    {
      label: 'When you finish',
      voice: {
        text: 'My CV looks great and I got a job before graduation. Started as a commis at a hotel kitchen two weeks after my last class.',
        name: 'Sione',
        campus: 'Christchurch',
        surveyed: 'Graduate NPS survey, 2025',
        consent: true,
      },
      items: [
        {
          can: 'Take a commis chef job',
          means: '84% of 2025 graduates were in a kitchen job within six months.',
        },
        {
          can: 'Run a full three-course service',
          means: 'Plan, prep, cook and plate for 60 guests with a small brigade.',
        },
        {
          can: 'Step up to Level 5',
          means: 'Direct entry into advanced cookery and kitchen management.',
        },
      ],
    },
  ],
  entry: {
    minAge: 17,
    backgrounds: ['NCEA Level 1 or above', 'Cookery Level 3', 'Worked in a kitchen', 'None of these yet'],
    fallback: { label: 'Cookery Level 3', weeks: 20, href: '/courses/cookery/certificate-in-cookery-level-3' },
  },
  intakes: [
    {
      date: '2027-02-16',
      label: '16 Feb 2027',
      campuses: [
        { name: 'Sylvia Park', left: 4 },
        { name: 'Manukau', left: 11 },
        { name: 'Hamilton', left: 0 },
        { name: 'Porirua', left: 7 },
      ],
    },
    {
      date: '2027-07-19',
      label: '19 Jul 2027',
      campuses: [
        { name: 'Sylvia Park', left: 16 },
        { name: 'Manukau', left: 16 },
        { name: 'Hamilton', left: 3 },
        { name: 'Porirua', left: 16 },
      ],
    },
    { label: 'Feb 2028', unconfirmed: true },
  ],
  tryIt: [
    {
      mode: 'Cook with us',
      blurb: 'Two hours in the kitchen with a tutor. You cook, you eat what you made.',
      slots: [
        { when: 'Sat 19 Sep, 10am · Sylvia Park', what: 'Knife skills and a hot lunch', left: 3 },
        { when: 'Wed 23 Sep, 4pm · Manukau', what: 'Pasta from scratch', left: 9 },
        { when: 'Sat 26 Sep, 10am · Hamilton', what: 'Knife skills and a hot lunch', left: 12 },
        { when: 'Thu 1 Oct, 4pm · Porirua', what: 'Pan sauces and steak', left: 6 },
      ],
    },
    {
      mode: 'Open day',
      blurb: 'Walk the kitchens, meet tutors and current students, ask anything.',
      slots: [
        { when: 'Wed 21 Oct, 4–7pm · All campuses', what: 'Drop in any time, tours every 30 minutes' },
        { when: 'Sat 14 Nov, 10am–1pm · Sylvia Park', what: 'Family open morning' },
      ],
    },
    {
      mode: 'Talk to someone',
      blurb: 'Fifteen minutes with a course advisor. No script, no pressure.',
      slots: [
        { when: 'Today, 3:30pm · phone or video', what: 'Aroha, course advisor' },
        { when: 'Tomorrow, 10:15am · phone or video', what: 'Dev, course advisor' },
        { when: 'Thu, 6pm · phone or video', what: 'Evening slot for after work or school' },
      ],
    },
  ],
  pathways: {
    work: 'Commis chef in a restaurant, hotel or catering kitchen. Most 2025 grads started between $27 and $30 an hour.',
    next: 'NZ Diploma in Cookery (Advanced) Level 5. Direct entry from this course, 35 weeks.',
    before: 'Cookery Level 3 is the way in if you are 16 or have no NCEA yet. 20 weeks.',
  },
  faqs: [
    {
      q: 'What if I start and hate it?',
      a: 'You have two weeks. Withdraw in that time and you get every cent back, including StudyLink fees. After that the published refund policy applies.',
    },
    {
      q: 'Do I need my own knives?',
      a: 'No. A knife kit and two sets of whites are included in the fee. You keep them.',
    },
    {
      q: 'Can I work while I study?',
      a: 'Yes. Classes run four days a week and finish by 3:30pm. Most students work evenings or weekends, often in kitchens we helped them find.',
    },
    {
      q: 'I did not finish school. Can I still get in?',
      a: 'Often, yes. If you are 17 or over with any NCEA Level 1, or kitchen experience, you meet the entry criteria. If not, Cookery Level 3 is a 20-week way in.',
    },
  ],
  formal: {
    level: 4,
    credits: 120,
    campuses: ['Sylvia Park', 'Manukau', 'Hamilton', 'Porirua'],
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
