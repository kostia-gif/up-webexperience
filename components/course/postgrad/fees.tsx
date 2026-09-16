'use client'

import { Check, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { Module, Segmented } from '../primitives'
import { usePostgrad } from './context'

const PACES = ['Full-time', 'Part-time'] as const
const CREDITS = ['None', '1 unit', '2 units', '3 units', '4 units'] as const
type Pace = (typeof PACES)[number]
type Credit = (typeof CREDITS)[number]

export function FeesAndHelp() {
  const { pg, course, money } = usePostgrad()
  const [pace, setPace] = useState<Pace>('Part-time')
  const [credit, setCredit] = useState<Credit>('None')

  const creditUnits = CREDITS.indexOf(credit)
  const totalUnits = pg.structure.totalUnits
  const unitsLeft = totalUnits - creditUnits
  const perTri = pace === 'Full-time' ? pg.fees.unitsPerTrimester.fullTime : pg.fees.unitsPerTrimester.partTime
  const trimesters = Math.ceil(unitsLeft / perTri)
  const years = trimesters / 2
  const total = pg.fees.total - creditUnits * pg.fees.perUnit
  const perTriCost = Math.round(total / trimesters / 10) * 10
  const saved = creditUnits * pg.fees.perUnit

  return (
    <Module id="fees" eyebrow="Fees and FEE-HELP" title="Know the whole cost before you apply" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground">Total tuition, {course.fee.year}, no credit</p>
            <p className="font-display text-5xl leading-none">{money(pg.fees.total)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {money(pg.fees.perUnit)} a unit for twelve units, and {money(pg.fees.majorUnits[0].fee)} each for{' '}
              {pg.fees.majorUnits.map((m) => m.code).join(' and ')}, the double units. GST-free. Textbooks and travel to residential schools are extra.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-medium">Estimate your own path</p>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">Pace</p>
              <Segmented
                items={[...PACES]}
                value={pace}
                label="Study pace"
                idPrefix="pace"
                onChange={(v) => {
                  setPace(v)
                  track('fees_pace', { pace: v })
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">Credit you might receive (max {pg.rpl.max} units)</p>
              <Segmented
                items={[...CREDITS]}
                value={credit}
                label="Units of credit"
                idPrefix="credit"
                onChange={(v) => {
                  setCredit(v)
                  track('fees_credit', { units: CREDITS.indexOf(v) })
                }}
              />
            </div>

            <dl id="pace-panel" role="tabpanel" className="grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Units to complete</dt>
                <dd className="font-display text-2xl leading-none tabular-nums">{unitsLeft}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Trimesters</dt>
                <dd className="font-display text-2xl leading-none tabular-nums">{trimesters}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Finish in about</dt>
                <dd className="font-display text-2xl leading-none tabular-nums">
                  {years} {years === 1 ? 'year' : 'years'}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Per trimester</dt>
                <dd className="font-display text-2xl leading-none tabular-nums">{money(perTriCost)}</dd>
              </div>
            </dl>
            <p className="flex flex-wrap items-baseline justify-between gap-2 rounded-md bg-primary-tint px-4 py-3 text-primary-tint-foreground">
              <span className="text-sm">Your total tuition</span>
              <span className="font-display text-2xl leading-none tabular-nums">{money(total)}</span>
              {saved > 0 && <span className="w-full text-xs">Credit for {creditUnits} {creditUnits === 1 ? 'unit' : 'units'} saves {money(saved)} and shortens the degree.</span>}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Two trimesters a year. Full-time is {pg.fees.unitsPerTrimester.fullTime} units a trimester, part-time {pg.fees.unitsPerTrimester.partTime}. You can change
              pace each trimester. Credit is assessed on application, see{' '}
              <a href="#eligibility" className="text-primary underline underline-offset-4">
                eligibility and credit
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:col-span-5">
          <p className="text-sm font-medium">Three ways to pay</p>
          <ul className="flex flex-col gap-3">
            {pg.paymentOptions.map((o, i) => (
              <li key={o.title} className={i === 0 ? 'rounded-lg border border-success-border bg-success p-4 text-success-foreground' : 'rounded-lg border border-border bg-card p-4'}>
                <p className="flex items-center gap-2 text-base font-medium">
                  {i === 0 && <Check className="size-4" aria-hidden />}
                  {o.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{o.body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">FEE-HELP in three steps</p>
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                'Check you are eligible: an Australian citizen, or a permanent humanitarian visa holder, with a Unique Student Identifier and a tax file number.',
                'Return your Request for FEE-HELP Assistance form before the census date each trimester.',
                `Repay through your tax return once your income is above about ${money(pg.fees.feeHelpThreshold)} a year, as a percentage of income.`,
              ].map((s, i) => (
                <li key={s} className="flex gap-2.5">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">{i + 1}</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium">Census Date Guarantee</p>
          <p className="text-[15px] leading-relaxed text-pretty">{pg.censusGuarantee}</p>
        </div>
      </div>
    </Module>
  )
}
