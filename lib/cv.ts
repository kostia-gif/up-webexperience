import { z } from 'zod'
import type { Course } from './course'

export const cvProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(120),
  mobile: z.string().trim().min(6).max(30),
  location: z.string().trim().max(80).default(''),
  school: z
    .object({
      name: z.string().max(120).default(''),
      level: z.string().max(80).default('').describe('e.g. "NCEA Level 2", "Year 13, working towards Level 3", "Left in Year 11"'),
      highlights: z.string().max(400).default('').describe('Subjects, roles or achievements they mentioned'),
    })
    .default({ name: '', level: '', highlights: '' }),
  work: z
    .array(
      z.object({
        role: z.string().max(80),
        org: z.string().max(120).default(''),
        dates: z.string().max(60).default(''),
        notes: z.string().max(400).default(''),
      }),
    )
    .max(6)
    .default([]),
  other: z.string().max(800).default('').describe('Sport, volunteering, church, family responsibilities, hobbies that show character'),
  studyWorkPlan: z.string().max(400).default('').describe('Work they plan to do while studying, for experience or income'),
  extraCertifications: z.array(z.string().max(80)).max(5).default([]).describe('Tickets they already hold, e.g. drivers licence, First Aid'),
})

export type CvProfile = z.infer<typeof cvProfileSchema>

export function emptyProfile(): CvProfile {
  return {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: '',
    school: { name: '', level: '', highlights: '' },
    work: [],
    other: '',
    studyWorkPlan: '',
    extraCertifications: [],
  }
}

/** True once the person has told us more than their contact details. */
export function isEnriched(p: CvProfile) {
  return Boolean(p.school.name || p.school.level || p.work.length || p.other || p.studyWorkPlan || p.extraCertifications.length)
}

/** Same shape without defaults or optionals: OpenAI strict tool calling needs every property required. Use empty strings and arrays for unknowns. */
export const cvProfileToolSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().describe('Empty string if not given'),
  mobile: z.string().describe('Empty string if not given'),
  location: z.string().describe('Suburb or town, empty string if not given'),
  school: z.object({
    name: z.string(),
    level: z.string().describe('e.g. "NCEA Level 2", "Year 13, working towards Level 3", "Left in Year 11"'),
    highlights: z.string().describe('Subjects, roles or achievements they mentioned'),
  }),
  work: z.array(
    z.object({
      role: z.string(),
      org: z.string(),
      dates: z.string(),
      notes: z.string(),
    }),
  ),
  other: z.string().describe('Sport, volunteering, church, family responsibilities, hobbies that show character'),
  studyWorkPlan: z.string().describe('Work they plan to do while studying'),
  extraCertifications: z.array(z.string()).describe('Tickets they already hold, e.g. drivers licence, First Aid'),
})

export const cvSchema = z.object({
  headline: z.string().describe('One line under the name, e.g. "Commis chef, NZ Certificate in Cookery (Level 4), completed Oct 2027". Comma separated, no dashes.'),
  whyHireMe: z
    .array(z.string())
    .min(3)
    .max(4)
    .describe('Punchy first-person statements a head chef would underline. Each under 14 words. Specific, confident, no hype words.'),
  summary: z.string().describe('Three sentences in first person, past tense for the course (I have completed). Plain NZ English.'),
  dayOne: z.array(z.string()).min(3).max(4).describe('What I can do unsupervised on my first shift. From the course dayOne list, may be reworded.'),
  skills: z.array(z.string()).min(6).max(10).describe('Short kitchen skills a head chef scans for, drawn from the course capabilities.'),
  certifications: z.array(z.object({ name: z.string(), issuer: z.string() })).describe('Course certifications plus any the person already holds.'),
  education: z
    .array(
      z.object({
        title: z.string(),
        provider: z.string(),
        dates: z.string(),
        bullets: z.array(z.string()).max(4),
      }),
    )
    .min(1),
  experience: z.array(
    z.object({
      title: z.string(),
      org: z.string(),
      dates: z.string(),
      bullets: z.array(z.string()).max(3),
    }),
  ),
  extras: z.array(z.string()).max(4).describe('Availability, licences, languages, referees-on-request. Only what is known or safe to assume.'),
})

export type CvDocument = z.infer<typeof cvSchema>

function completionLabel(course: Course) {
  const intake = course.intakes.find((i) => i.date)
  if (!intake?.date) return `${course.formal.intakesYear}`
  const finish = new Date(intake.date)
  finish.setDate(finish.getDate() + course.funding.weeks * 7)
  return finish.toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' })
}

export function cvDates(course: Course) {
  const intake = course.intakes.find((i) => i.date)
  return { start: intake?.label ?? `${course.formal.intakesYear}`, finish: completionLabel(course) }
}

export function buildCvPrompt(course: Course, p: CvProfile) {
  const { start, finish } = cvDates(course)
  const cv = course.cv
  const capabilities = course.stages.map((s) => `${s.label}: ${s.items.map((i) => `${i.can} (${i.means})`).join('; ')}`).join('\n')
  const kit = course.kit ? `Kit supplied and kept: ${course.kit.items.join(', ')}.` : ''
  const work = p.work.length
    ? p.work.map((w) => `- ${w.role}${w.org ? ` at ${w.org}` : ''}${w.dates ? `, ${w.dates}` : ''}${w.notes ? `. ${w.notes}` : ''}`).join('\n')
    : '(none)'

  return `Write a one-page CV for a graduate of this course, as it would read the week they finish. The course is COMPLETED. Use past tense for it ("I have completed", "trained in"), never "about to" or "will".

PERSON
Name: ${p.firstName} ${p.lastName}
Location: ${p.location || 'New Zealand'}
Target role: ${cv?.targetRole ?? 'entry-level role'}
School: ${p.school.name || 'not given'}; level: ${p.school.level || 'not given'}; highlights: ${p.school.highlights || 'none'}
Work so far:
${work}
Other things they do or have done: ${p.other || 'none given'}
Work they plan to do while studying: ${p.studyWorkPlan || 'not given'}
Tickets they already hold: ${p.extraCertifications.join(', ') || 'none'}

COURSE COMPLETED
${course.title}, delivered by ${course.deliveredBy}${course.deliveredBy === course.brand.legalName ? '' : ` (a school of ${course.brand.name})`}.
Level ${course.formal.level}, ${course.formal.credits} credits, ${course.funding.weeks} weeks full-time, ${course.like.schedule}.
Started ${start}, completed ${finish}. Campuses: ${course.formal.campuses.join(', ')}.
What the course was like: ${course.like.text}
${kit}
Capabilities gained, stage by stage:
${capabilities}
Certifications earned in the course: ${cv?.certifications.map((c) => `${c.name} (${c.issuer})`).join('; ') ?? 'none'}
Ready on day one (from the school): ${cv?.dayOne.join('; ') ?? ''}
Employers who hire from this course include ${course.outcomes.employers.join(', ')}.

RULES
- Use ONLY the facts above. Never invent employers, dates, grades, referees or qualifications.
${
  isEnriched(p)
    ? ''
    : '- This is a FIRST DRAFT from the course alone: the person has not told us about school or work yet. Write everything from the training. Do not mention that background is missing, and do not write placeholder text; the page shows its own placeholders for school and experience.\n'
}- whyHireMe: 3 or 4 statements with real character, e.g. "I can run a line on day one, not week six", "I turn up early and I don't waste product". Draw on their actual background if given (sport captaincy = leads under pressure, retail = pace and customers, family cooking = cares about food), otherwise on the training. No cliches like "passionate" or "hard-working".
- dayOne: rewrite the school's day-one list in first person, 3 or 4 items.
- certifications: include every course certification, then add any tickets they already hold with issuer "Held".
- education: ONE entry for the course, dated "${start} to ${finish}", provider "${course.deliveredBy}", 3 or 4 bullets from the capabilities rewritten as achievements. If school name or level was given, add a SECOND entry for school with the level as the title, no bullets unless highlights were given.
- experience: one entry per paid job given, dates as given or "Dates to confirm", 1 to 3 bullets on transferable value (reliability, pace, customers, teamwork). Coaching, volunteering or a real caring responsibility can be an entry too. Home cooking, hobbies and playing sport are NOT entries; use them in whyHireMe and the summary instead. If nothing qualifies, return an empty array.
- skills: 6 to 10 short kitchen-specific phrases from the capabilities, 2 to 5 words each.
- extras: 2 to 4 short items. First: "Available evenings and weekends, and full-time from ${finish}". If they named work they plan to do while studying, add one item like "Weekend cafe and dish pit shifts through the course" as experience gained. Do not repeat anything already in certifications, including licences and tickets they hold. Last: "Referees available on request". Do not invent licences or languages.
- Voice: first person, plain New Zealand English, confident and specific. No emojis, no exclamation marks, no buzzwords.
- Copy te reo Māori words and macrons (ā, ē, ī, ō, ū) exactly as given. Use plain ASCII punctuation, commas instead of dashes.`
}
