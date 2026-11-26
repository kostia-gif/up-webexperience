import { ChevronDown, FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { Placeholder } from './ui'

export type BreakdownUnit = { code: string; title: string; credits: number; summary: string; learn?: string[]; assessment?: string }
export type BreakdownTerm = { label: string; when: string; units: BreakdownUnit[] }
export type Breakdown = { intro: string; unit: string; creditLabel: string; terms: BreakdownTerm[]; note?: string }

/** Course structure by unit and credit, as in the original round. Collapsed by default except the first term. */
export function CourseBreakdown({ breakdown }: { breakdown: Breakdown }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-[720px] text-[15px] leading-relaxed text-muted-foreground text-pretty">{breakdown.intro}</p>
      <div className="flex flex-col gap-3">
        {breakdown.terms.map((term, i) => {
          const credits = term.units.reduce((n, u) => n + u.credits, 0)
          return (
            <details key={term.label} className="group rounded-lg border border-border bg-card" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-medium">{term.label}</span>
                  <span className="text-xs text-muted-foreground">{term.when}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {term.units.length} {term.units.length === 1 ? breakdown.unit : `${breakdown.unit}s`} &middot; {credits} {breakdown.creditLabel}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                </span>
              </summary>
              <ul className="flex flex-col divide-y divide-border border-t border-border">
                {term.units.map((u) => (
                  <li key={u.code}>
                    <details className="group/u">
                      <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
                        <span className="flex flex-col gap-1">
                          <span className="text-sm font-medium">
                            <span className="text-muted-foreground">{u.code}</span> {u.title}
                          </span>
                          <span className="text-sm leading-relaxed text-muted-foreground">{u.summary}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3 pt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {u.credits} {breakdown.creditLabel}
                          </span>
                          <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/u:rotate-180" aria-hidden />
                        </span>
                      </summary>
                      {(u.learn || u.assessment) && (
                        <div className="grid gap-5 px-4 pb-5 pt-1 sm:grid-cols-2">
                          {u.learn && (
                            <div className="flex flex-col gap-2">
                              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">You will learn</h4>
                              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
                                {u.learn.map((l) => (
                                  <li key={l} className="flex gap-2">
                                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                                    {l}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {u.assessment && (
                            <div className="flex flex-col gap-2">
                              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Assessment</h4>
                              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{u.assessment}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          )
        })}
      </div>
      {breakdown.note && (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground text-pretty">
          <Placeholder className="mt-0.5 shrink-0" /> {breakdown.note}
        </p>
      )}
    </div>
  )
}

export type FormalRow = [string, ReactNode]

/** "The formal bit": the regulated facts in one table, with policy links. */
export function FormalDetails({ rows, links }: { rows: FormalRow[]; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-6">
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
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FormalHeading() {
  return (
    <header className="flex items-center gap-2">
      <FileText className="size-5 text-muted-foreground" aria-hidden />
      <h2 id="formal-title" className="text-lg font-medium">
        Formal details
      </h2>
    </header>
  )
}
