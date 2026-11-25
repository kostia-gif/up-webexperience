import { Check } from 'lucide-react'
import { Placeholder } from './ui'

export type WantRow = { want: string; covered: string }

/** Each recruiter requirement matched to how the course covers it. */
export function WhatEmployersLookFor({ rows, who, id }: { rows: WantRow[]; who: string; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-3">
      <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
        {rows.map((r) => (
          <li key={r.want} className="grid gap-2 p-4 sm:grid-cols-2 sm:gap-6">
            <p className="flex items-start gap-3 text-[15px] font-medium leading-snug">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" aria-hidden />
              </span>
              {r.want}
            </p>
            <p className="pl-8 text-sm leading-relaxed text-muted-foreground text-pretty sm:pl-0">
              <span className="font-medium text-foreground">How we cover it: </span>
              {r.covered}
            </p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        <Placeholder /> What {who} ask for is a placeholder summary. Replace with sourced recruiter criteria.
      </p>
    </div>
  )
}
