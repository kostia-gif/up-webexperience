import { InferAgentUIMessage, ToolLoopAgent, tool } from 'ai'
import { z } from 'zod'
import { courseHref, coursePromise, formatMoney, formatNZD, isFree, type Course } from './course'

const ACTION_KEYS = ['eligibility', 'tryit', 'intakes', 'money', 'level3', 'level5', 'advisor'] as const
export type CoachActionKey = (typeof ACTION_KEYS)[number]

export function coachActions(course: Course): Record<CoachActionKey, { label: string; href: string }> {
  if (course.postgrad) {
    return {
      eligibility: { label: 'Check my eligibility and credit', href: '#eligibility' },
      tryit: { label: course.copy.coach.tryLabel, href: course.copy.coach.tryHref ?? '#specialist' },
      intakes: { label: 'See intakes and apply', href: '#apply' },
      money: { label: 'See fees and FEE-HELP', href: '#fees' },
      level3: { label: `Look at ${course.entry.fallback.label}`, href: course.entry.fallback.href },
      level5: { label: 'See where graduates work', href: '#outcomes' },
      advisor: { label: 'Book a call with a course specialist', href: '#specialist' },
    }
  }
  return {
    eligibility: { label: 'Check if I meet entry', href: '#eligibility' },
    tryit: { label: course.copy.coach.tryLabel, href: course.copy.coach.tryHref ?? '#tryit' },
    intakes: { label: 'See start dates and seats', href: '#intakes' },
    money: { label: isFree(course) ? 'See how the money works' : 'Work out what it costs me', href: `${courseHref(course)}/money` },
    level3: { label: `Look at ${course.entry.fallback.label}`, href: course.entry.fallback.href },
    level5: { label: 'Look at the Level 5 Diploma', href: '#outcomes' },
    advisor: { label: 'Talk to a human advisor', href: course.copy.coach.tryHref ?? '#tryit' },
  }
}

function postgradFacts(course: Course) {
  const pg = course.postgrad!
  const money = (n: number) => formatMoney(n, course.brand.currency)
  return `
COURSE: ${course.title}, AQF Level ${pg.provider.aqf}, delivered by ${pg.provider.legalName}, a TEQSA-registered higher education provider specialising in counselling since ${pg.provider.since}.
ACCREDITATION: ${pg.accreditations.map((a) => `${a.body}: ${a.what}`).join(' ')}
STRUCTURE: ${pg.structure.totalUnits} units (${course.funding.efts} EFTSL): ${pg.units
    .filter((u) => !u.elective)
    .map((u) => `${u.code} ${u.title} (T${u.trimester}${u.residential ? `, ${u.residential === 'campus' ? '2.5 days on campus' : '5-day online intensive'}` : ''})`)
    .join('; ')}. Plus ${pg.structure.electivesRequired} specialisation electives (two in T3, two in T4) chosen from: ${pg.units.filter((u) => u.elective).map((u) => `${u.code} ${u.title}`).join('; ')}.
PROGRESSION: ${pg.levels.map((l) => `${l.label} (${l.when}) "${l.title}": ${l.skills.join('; ')}. Unlocks: ${l.unlocks ?? ''}`).join(' | ')}
DELIVERY: ${course.like.schedule}.
RESIDENTIAL: ${pg.residential.campusDays} days on campus (${pg.residential.cities.join(', ')}) and ${pg.residential.onlineDays} online days across the degree. Travel and accommodation at the student's cost, allow about ${money(pg.residential.allowancePerDay)} a day interstate.
PLACEMENT: 168 hours in an approved agency in the final trimester, 12 hours agency supervision, arranged by AIPC's placement team near where the student lives.
FEES ${course.fee.year}: ${money(pg.fees.total)} total, GST-free. ${money(pg.fees.perUnit)} per single unit; ${pg.fees.majorUnits.map((m) => `${m.code} ${money(m.fee)}`).join(', ')}. Textbooks and residential travel extra. Every unit credited is a unit not paid for.
FEE-HELP: Approved. Australian citizens and permanent humanitarian visa holders can defer 100% of tuition; permanent residents and international students cannot; NZ citizens on an SCV may if they meet long-term residency rules. No loan fee on postgraduate FEE-HELP. Repay via tax above about ${money(pg.fees.feeHelpThreshold)} a year (placeholder threshold). Payment options: ${pg.paymentOptions.map((p) => `${p.title}: ${p.body}`).join(' ')}
CENSUS GUARANTEE: ${pg.censusGuarantee}
COMPARISON WITH UNIVERSITIES (indicative, placeholder): ${pg.comparison.map((c) => `${c.label}: AIPC ${c.us} vs university ${c.uni}`).join('; ')}. Be honest that AIPC is a specialist institute, not a university: no campus life or other faculties.
ENTRY: A completed bachelor degree in ANY field. Without one, the pathway is ${course.entry.fallback.label}: ${course.entry.fallback.note}
CREDIT / RPL: Maximum ${pg.rpl.max} units. Automatic: ${pg.rpl.auto.map((a) => `${a.from} gets ${a.units.join(', ')}`).join('; ')}. Credit transfer: ${pg.rpl.transfer} RPL: ${pg.rpl.experience} Evidence: ${pg.rpl.evidence.join('; ')}.
INTERNATIONAL: ${course.formal.intl.minAge}+, IELTS ${course.formal.intl.ielts} or equivalent (exempt if degree taught in English in last five years), no FEE-HELP.${
      pg.international
        ? ` International tuition ${money(pg.international.fees.total)} total, ${money(pg.international.fees.perUnit)} a unit, paid per trimester in AUD; ${money(pg.international.fees.deposit)} deposit holds a place and is refunded before census. Can be studied entirely from home (offshore, online, placement with an approved agency in the student's country) or partly onshore on a student visa. ${pg.international.totalStudents} students from ${pg.international.totalCountries} countries in the last two years. A dedicated international team handles overseas students (WhatsApp ${pg.international.team.whatsapp}, ${pg.international.team.email}). MIGRATION: AIPC staff cannot give visa or immigration advice by law; they refer to a MARA-registered agent and receive no payment. Never give visa advice yourself; point to the international team on the page (#international).`
        : ''
    }
INTAKES: ${pg.intakes.map((i) => `${i.label}: starts ${i.start}, census ${i.census}, residential ${i.residential}, apply by ${i.applyBy}, ${i.left} of ${i.capacity} places left`).join('; ')}. Applications are non-binding and hold a place.
SPECIALISTS: Book a 15-minute call on the page, or phone ${pg.specialist.phone}, ${pg.specialist.hours}. They cover: ${pg.specialist.covers.join('; ')}.
OUTCOMES: ${course.outcomes.stat?.value} of ${course.outcomes.stat?.cohort} graduates in ${course.copy.jobNoun} within 12 months. Employers include ${course.outcomes.employers.join(', ')} and ${course.outcomes.employersMore} more. Indicative pay: about ${money(course.outcomes.salary?.start ?? 0)} starting, ${money(course.outcomes.salary?.threeYear ?? 0)} after three years (${course.outcomes.salary?.source}, ${course.outcomes.salary?.year}).
PATHWAYS: Work: ${course.pathways.work} Next: ${course.pathways.next} Before: ${course.pathways.before}
FAQ: ${course.faqs.map((f) => `${f.q} ${f.a}`).join(' ')}
`
}

function courseFacts(course: Course) {
  const { brand, copy } = course
  const free = isFree(course)
  const feeLine = free
    ? `FEE ${course.fee.year}: FREE for domestic students (${course.fee.freeNote ?? ''}). ${course.fee.includes}.`
    : `FEE ${course.fee.year}: ${formatNZD(course.fee.amount)} incl GST. ${course.fee.includes}.${course.kit ? ` Kit worth ~${formatNZD(course.kit.value)} included and kept.` : ''}`
  const fundingLine = course.funding.loanApproved
    ? free
      ? `FUNDING: The course costs nothing. Separately the student MAY be eligible through StudyLink for a Student Allowance (not a loan) or a living-costs loan of up to $${course.funding.livingCostsMax}/week, plus a one-off up to ${formatNZD(course.funding.courseRelatedCosts)} course-related costs (for a laptop, software). Both go to the student, not the school. Never say "get paid to study"; say they may be eligible for living-costs support, and be honest that eligibility is StudyLink's call.`
      : 'FUNDING: Approved for StudyLink student loans and allowances, so $0 upfront is possible.'
    : 'FUNDING: Not StudyLink approved.'
  const perks = [
    course.aiPerk
      ? `AI SUBSCRIPTION: Included for ${course.aiPerk.months} months, student picks one of ${course.aiPerk.options.map((o) => o.name).join(', ')}.`
      : '',
    course.microCredentials?.length
      ? `START AHEAD pre-start courses (free, online, start immediately, cross-credited into the certificate so the student skips that module): ${course.microCredentials
          .map((m) => `${m.title} (${m.hours}h${m.credits ? `, ${m.credits} credits` : ', taster, no credits'})`)
          .join('; ')}. Sign up via the basket on the page.`
      : '',
  ]
    .filter(Boolean)
    .join('\n')
  return `
COURSE: ${course.title}, delivered by ${course.deliveredBy}${course.deliveredBy === brand.legalName ? '' : `, a school of ${brand.name}`}.
DELIVERY: ${course.delivery === 'online' ? 'Online first, with campus intakes available.' : 'On campus.'}
LENGTH: ${course.funding.weeks} weeks, ${course.funding.fullTime ? 'full-time' : 'part-time'}, ${course.like.schedule}.
WHERE (${course.formal.campuses.length} options): ${course.formal.campuses.join('; ')}.
NEXT INTAKES: ${course.intakes.map((i) => i.label + (i.unconfirmed ? ' (unconfirmed)' : '') + (i.campuses ? ` at ${i.campuses.map((c) => c.name).join(', ')}` : '')).join('; ')}.
${feeLine}
${fundingLine}
${perks}
PROMISE: ${coursePromise(course)}
ENTRY: ${course.entry.minAge}+ at start AND one of: ${course.entry.backgrounds.slice(0, -1).join(' / ')}. If none, ${course.entry.fallback.label} (${course.entry.fallback.weeks} weeks) is the way in.
INTERNATIONAL: ${course.formal.intl.minAge}+, IELTS ${course.formal.intl.ielts}.
WHAT YOU LEARN: ${course.stages.map((s) => `${s.label}: ${s.items.map((i) => i.can).join(', ')}`).join(' | ')}.
${
  course.structure
    ? `MODULES (${course.formal.credits} credits, all compulsory unless noted): ${course.structure.terms
        .map((t) => `${t.label} (${t.weeks}): ${t.modules.map((m) => `${m.code} ${m.title}, ${m.credits} cr, assessed by ${m.assessment}`).join('; ')}`)
        .join(' | ')}. Full outline is in the "Course structure" section of the page (#structure).`
    : ''
}
OUTCOMES: ${course.outcomes.stat?.value} of ${course.outcomes.stat?.cohort} grads in ${copy.jobNoun} within 6 months. Employers include ${course.outcomes.employers.join(', ')} and ${course.outcomes.employersMore} more.
PAY: industry starting salary about ${formatNZD(course.outcomes.salary?.start ?? 0)}; realistic 3-year goal about ${formatNZD(course.outcomes.salary?.threeYear ?? 0)} (${course.outcomes.salary?.source}, ${course.outcomes.salary?.year}).
PATHWAYS: Work: ${course.pathways.work} Next: ${course.pathways.next} Before: ${course.pathways.before}
FAQ: ${course.faqs.map((f) => `${f.q} ${f.a}`).join(' ')}
`
}

export function createCoachAgent(course: Course) {
  const actions = coachActions(course)
  const { brand, copy } = course
  const au = brand.country === 'AU'
  const postgrad = Boolean(course.postgrad)
  const qualification = postgrad ? course.title : `${course.discipline} Level ${course.formal.level} certificate`

  const instructions = postgrad
    ? `You are the ${copy.coach.name}, a calm, well-informed postgraduate course advisor for ${brand.legalName} (Australia). You help prospective students, most of them working adults with a degree in another field, work out whether the ${qualification} fits their background and their life, how credit and FEE-HELP would work for them, and where it leads in ${copy.coach.industry}.

How to behave:
- Talk like an experienced advisor in a 15-minute call, not a brochure. Short paragraphs, plain Australian English, measured tone, no hype, no emojis. This is a postgraduate decision; respect the person's intelligence.
- Ask one question at a time: their degree and field, any counselling or community work, whether they will keep working, residency for FEE-HELP, where they live for residential schools. Two or three questions is usually enough before you give a view.
- Be honest and specific. If they do not hold a bachelor degree, say clearly that the Master is not open to them yet and explain the pathway. If someone would be better served by a university program (for example they need PACFA registration or want campus life), say so.
- Comparisons with universities: state the indicative fee difference and the flexibility points from the facts, flag that university figures are indicative, and never disparage other providers.
- Use only the facts below for numbers, dates, fees and policy. Never invent figures. If unsure, say so and offer a course specialist.
- Whenever you point the person to a step (checking eligibility and credit, fees and FEE-HELP, intakes and applying, the pathway course, where graduates work, or booking a course specialist), you MUST call the recommendAction tool with the matching action and a one-line reason, then write your reply. At most once per reply, and not when you are only asking a question.
- Keep answers under 130 words unless asked for detail.

Facts about the course (placeholder data for this prototype):
${postgradFacts(course)}`
    : `You are the ${copy.coach.name}, a warm, straight-talking course advisor for ${brand.legalName} (${au ? 'Australia' : 'New Zealand'}). You help people work out whether the ${qualification} is right for them and what their future in ${copy.coach.industry} could look like: first job, pay, progression, and other routes (${course.entry.fallback.label} first, Level 5 after, or a different discipline entirely).

How to behave:
- Talk like a good advisor in a 15-minute chat, not a brochure. Short paragraphs, plain ${au ? 'Australian' : 'NZ'} English, no hype, no emojis.
- Ask one question at a time to understand the person: age, what they've done so far, what they want their days to look like, money pressures, where they live. Don't interrogate; two or three questions is usually enough before you give a view.
- Give an honest view. If ${course.discipline.toLowerCase()} is not a fit, say so kindly and suggest what might be. If they don't meet entry, point to ${course.entry.fallback.label}.
- Use only the facts below for numbers, dates and fees. Never invent figures. If asked something you don't know, say so and offer to connect them with a human advisor.
- Whenever you point the person to a route or step (${course.entry.fallback.label}, checking entry, ${course.microCredentials?.length ? 'starting a free pre-start course now' : 'a free try-it session'}, start dates, costs or funding, Level 5, or a human advisor), you MUST call the recommendAction tool with the matching action and a one-line reason, then write your reply. Call it at most once per reply, and not when you are only asking a question.
- Keep answers under 120 words unless the person asks for detail.

Facts about the course (placeholder data for this prototype):
${courseFacts(course)}`

  return new ToolLoopAgent({
    model: 'openai/gpt-4.1-mini',
    instructions,
    tools: {
      recommendAction: tool({
        description:
          'Suggest one concrete next step the person can take on this page. Call at most once per reply, only when a step is genuinely relevant.',
        inputSchema: z.object({
          action: z.enum(ACTION_KEYS),
          reason: z.string().describe('One short sentence, spoken to the person, on why this is the right next step.'),
        }),
        execute: async ({ action, reason }) => ({ action, reason, ...actions[action] }),
      }),
    },
  })
}

const agents = new Map<string, ReturnType<typeof createCoachAgent>>()

export function getCoachAgent(course: Course) {
  let agent = agents.get(course.id)
  if (!agent) {
    agent = createCoachAgent(course)
    agents.set(course.id, agent)
  }
  return agent
}

export type CoachUIMessage = InferAgentUIMessage<ReturnType<typeof createCoachAgent>>
