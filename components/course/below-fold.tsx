'use client'

import { ArrowRight, Briefcase, FileText, GraduationCap, RotateCcw } from 'lucide-react'
import { formatNZD } from '@/lib/course'
import { useCourse } from './course-context'
import { Module } from './primitives'

export function WhereItTakesYou() {
  const { outcomes, pathways, entry } = useCourse()
  const paths = [
    { icon: Briefcase, title: 'Go to work', body: pathways.work, href: '#' },
    { icon: GraduationCap, title: 'Keep going', body: pathways.next, href: '#' },
    { icon: RotateCcw, title: 'Not ready yet', body: pathways.before, href: entry.fallback.href },
  ]

  return (
    <Module id="outcomes" eyebrow="Where this takes you" title={`Who hired our ${outcomes.employersYear} grads`}>
      <ul className="flex flex-wrap gap-2" aria-label="Employers">
        {outcomes.employers.map((e) => (
          <li key={e} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium">
            {e}
          </li>
        ))}
        <li className="rounded-full bg-primary-tint px-3.5 py-2 text-sm font-medium text-primary-tint-foreground">
          + {outcomes.employersMore} more hired our {outcomes.employersYear} grads
        </li>
      </ul>

      {outcomes.story?.consent && (
        <figure className="mt-6 flex gap-4 rounded-lg border border-border bg-card p-5">
          <div
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground"
          >
            {outcomes.story.initials}
          </div>
          <div className="flex flex-col gap-2">
            <blockquote className="text-[15px] leading-relaxed text-pretty">&ldquo;{outcomes.story.text}&rdquo;</blockquote>
            <figcaption className="text-xs text-muted-foreground">
              {outcomes.story.initials}, {outcomes.story.course}, {outcomes.story.campus}, {outcomes.story.year}
            </figcaption>
          </div>
        </figure>
      )}

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {paths.map((p) => (
          <li key={p.title} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
            <p.icon className="size-5 text-primary" aria-hidden />
            <h3 className="text-base font-medium">{p.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <a href={p.href} className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline hover:underline-offset-4">
              Show me <ArrowRight className="size-4" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </Module>
  )
}

export function Faqs() {
  const course = useCourse()
  return (
    <Module id="faqs" eyebrow="Things people ask" title="Straight answers">
      <dl className="flex flex-col gap-6">
        {course.faqs.map((f) => (
          <div key={f.q} className="flex flex-col gap-1.5">
            <dt className="text-base font-medium">{f.q}</dt>
            <dd className="text-[15px] leading-relaxed text-muted-foreground text-pretty">{f.a}</dd>
          </div>
        ))}
      </dl>
    </Module>
  )
}

export function FormalBit() {
  const course = useCourse()
  const { formal, fee, funding } = course
  const rows: [string, React.ReactNode][] = [
    ['Qualification', course.title],
    ['Level and credits', `Level ${formal.level}, ${formal.credits} credits (${funding.efts} EFTS)`],
    ['Length', `${funding.weeks} weeks, ${funding.fullTime ? 'full-time' : 'part-time'}`],
    [
      'Delivered by',
      course.deliveredBy === course.brand.legalName ? course.deliveredBy : `${course.deliveredBy}, a school of ${course.brand.name}`,
    ],
    ['Also includes', fee.includes.replace(' included', '')],
    [course.delivery === 'online' ? 'Where' : 'Campuses', formal.campuses.join(', ')],
    [`Intakes, ${formal.intakesYear}`, formal.intakesLabel],
    ['Entry, domestic', `${course.entry.minAge}+ at start, and ${course.entry.backgrounds.slice(0, -1).join(', or ')}`],
    [
      'Entry, international',
      <>
        {formal.intl.minAge}+, IELTS {formal.intl.ielts}.{' '}
        <a href={formal.intl.href} className="text-primary underline underline-offset-4">
          International requirements
        </a>
      </>,
    ],
    [
      `Domestic fee, ${fee.year}`,
      fee.freeNote ?? `${formatNZD(fee.amount)} incl. GST. Includes all compulsory course costs.`,
    ],
    ['Funding', funding.loanApproved ? 'Approved for StudyLink student loans and allowances' : 'Not currently approved for StudyLink loans'],
  ]

  const links = [
    ['Programme structure', formal.links.structure, 'structure'],
    ['Fees, refunds and withdrawal', formal.links.fees, 'fees'],
    ['Student support and wellbeing', formal.links.support, 'support'],
    ['How to enrol', formal.links.enrol, 'enrol'],
  ]

  return (
    <Module id="formal" muted>
      <header className="mb-6 flex items-center gap-2">
        <FileText className="size-5 text-muted-foreground" aria-hidden />
        <h2 id="formal-title" className="text-lg font-medium">
          The formal bit
        </h2>
      </header>
      <table className="w-full border-collapse text-sm">
        <tbody className="divide-y divide-border">
          {rows.map(([k, v]) => (
            <tr key={k} className="align-top">
              <th scope="row" className="w-[38%] py-3 pr-4 text-left font-medium text-muted-foreground">
                {k}
              </th>
              <td className="py-3 leading-relaxed">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </Module>
  )
}
