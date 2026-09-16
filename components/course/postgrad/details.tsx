'use client'

import { FileText, MapPin, Monitor } from 'lucide-react'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function AccreditedDetails() {
  const { course, pg, money } = usePostgrad()
  const { formal, fee } = course
  const core = pg.units.filter((u) => !u.elective)
  const electives = pg.units.filter((u) => u.elective)
  const byTri = [1, 2, 3, 4].map((t) => ({ t, units: core.filter((u) => u.trimester === t) }))

  const rows: [string, React.ReactNode][] = [
    ['Qualification', `${course.title}, AQF Level ${pg.provider.aqf}`],
    ['Provider', `${pg.provider.legalName}. TEQSA registered higher education provider, ${pg.provider.teqsa}.`],
    ['Accreditation', pg.accreditations.map((a) => `${a.body}: ${a.what}`).join(' ')],
    [
      'Structure',
      `${pg.structure.totalUnits} units, ${course.funding.efts.toFixed(1)} EFTSL. Eight core units, ${pg.structure.electivesRequired} specialisation units chosen from ${electives.length}, and two double units (${pg.fees.majorUnits.map((m) => m.code).join(', ')}).`,
    ],
    ['Duration', '2 years full-time (4 units a trimester, two trimesters a year) or 4 years part-time. Maximum 6 years.'],
    ['Delivery', `Online with residential schools: ${pg.residential.campusDays} days on campus and ${pg.residential.onlineDays} days online across the degree.`],
    ['Residential schools', `${pg.residential.cities.join(', ')}. Travel and accommodation at your cost; allow about ${money(pg.residential.allowancePerDay)} a day if travelling.`],
    ['Placement', '168 hours in an approved agency in the final trimester, including 12 hours of agency supervision. Arranged with our placement team.'],
    [`Intakes, ${formal.intakesYear}`, formal.intakesLabel],
    ['Entry, domestic', 'A completed bachelor degree in any field from a recognised provider.'],
    ['Entry, international', `${formal.intl.minAge}+, a recognised bachelor degree, IELTS ${formal.intl.ielts}. FEE-HELP is not available to international students.`],
    [
      `Tuition, ${fee.year}`,
      `${money(fee.amount)} for ${pg.structure.totalUnits} units. ${money(pg.fees.perUnit)} per single unit, ${money(pg.fees.majorUnits[0].fee)} per double unit. GST-free. Fees are reviewed annually and apply to the units you are enrolled in.`,
    ],
    ['FEE-HELP', 'Approved. Eligible students may defer all tuition. No loan fee on postgraduate study. Census dates are published for every unit.'],
    ['Credit and RPL', `Up to ${pg.rpl.max} units in total by credit transfer, RPL, or automatic articulation. ${pg.rpl.transfer}`],
    ['Withdrawal', pg.censusGuarantee],
  ]

  return (
    <Module id="details" muted>
      <header className="mb-6 flex items-center gap-2">
        <FileText className="size-5 text-muted-foreground" aria-hidden />
        <h2 id="details-title" className="text-lg font-medium">
          Course details and accreditation
        </h2>
      </header>

      <table className="w-full border-collapse text-sm">
        <tbody className="divide-y divide-border">
          {rows.map(([k, v]) => (
            <tr key={k} className="align-top">
              <th scope="row" className="w-[32%] py-3 pr-4 text-left font-medium text-muted-foreground">
                {k}
              </th>
              <td className="py-3 leading-relaxed">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-10 text-base font-medium">Units by trimester</h3>
      <p className="mt-1 text-sm text-muted-foreground">Full-time sequence shown. Part-time students take two units from each trimester block.</p>
      <div className="mt-4 flex flex-col gap-2">
        {byTri.map(({ t, units }) => {
          const electivesHere = t >= 3 ? pg.structure.electivesRequired / 2 : 0
          return (
            <details key={t} className="group rounded-lg border border-border bg-card open:bg-card" open={t === 1}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium">
                <span>
                  Trimester {t}
                  {electivesHere > 0 && ` · ${units.map((u) => u.code).join(', ')} plus ${electivesHere} specialisations`}
                </span>
                <span className="text-xs text-muted-foreground">{units.length + electivesHere} units</span>
              </summary>
              <ul className="divide-y divide-border border-t border-border">
                {units.map((u) => (
                  <UnitRow key={u.code} code={u.code} title={u.title} summary={u.summary} residential={u.residential} eftsl={u.eftsl} />
                ))}
                {electivesHere > 0 && (
                  <li className="px-4 py-3">
                    <p className="text-sm font-medium">
                      {electivesHere} specialisations from the {electives.length} below
                      {t === 4 && ', the two you did not take in Trimester 3'}
                    </p>
                    <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                      {electives.map((e) => (
                        <li key={e.code}>
                          <span className="font-medium text-foreground">{e.code}</span> {e.title}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </details>
          )
        })}
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {[
          ['Course structure and unit outlines', '#details'],
          ['Fees, FEE-HELP and refunds', '#fees'],
          ['RPL and credit transfer policy', '#eligibility'],
          ['Academic complaints and appeals', '#details'],
          ['Student support', '#specialist'],
        ].map(([label, href]) => (
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

function UnitRow({ code, title, summary, residential, eftsl }: { code: string; title: string; summary: string; residential?: 'campus' | 'online'; eftsl: number }) {
  return (
    <li className="flex flex-col gap-1.5 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-sm font-medium">
          <span className="text-muted-foreground">{code}</span> {title}
        </p>
        <span className="text-xs text-muted-foreground">{eftsl} EFTSL</span>
        {residential === 'campus' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-tint px-2 py-0.5 text-xs font-medium text-primary-tint-foreground">
            <MapPin className="size-3" aria-hidden /> 2.5 days on campus
          </span>
        )}
        {residential === 'online' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <Monitor className="size-3" aria-hidden /> 5-day online intensive
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
    </li>
  )
}
