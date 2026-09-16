'use client'

import Link from 'next/link'
import { ArrowRight, Home, Plane, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { courseHref } from '@/lib/course'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { Module, Segmented } from '../primitives'
import { Expander } from './expander'
import { EnglishEvidence, FeeHelpNote, OtherCostsTable, PaymentOptionsList } from './intl-detail'
import { useIntl, useStudyFrom } from './study-from'

const PACES = ['Full-time', 'Part-time'] as const
type Pace = (typeof PACES)[number]

export function IntlFees() {
  const { intl, pg, money, course } = useIntl()
  const { country } = useStudyFrom()
  const [pace, setPace] = useState<Pace>('Part-time')
  const [mode, setMode] = useState<'offshore' | 'onshore'>('offshore')

  const perTri = pace === 'Full-time' ? pg.fees.unitsPerTrimester.fullTime : pg.fees.unitsPerTrimester.partTime
  const trimesters = Math.ceil(pg.structure.totalUnits / perTri)
  const years = trimesters / 2
  const perTriCost = Math.round(intl.fees.total / trimesters / 10) * 10
  const selectedMode = intl.modes.find((m) => m.id === mode) ?? intl.modes[0]
  const guideHref = `${courseHref(course)}/international?from=${country?.code ?? ''}`

  return (
    <Module id="intl-fees" eyebrow={`Fees for students in ${country?.name ?? 'other countries'}`} title="One number, fixed for the whole degree" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground">Total tuition, international, no credit</p>
            <p className="font-display text-5xl leading-none">{money(intl.fees.total)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Australian dollars, {money(intl.fees.perUnit)} a unit, fixed once you enrol. Paid a trimester at a time, only for the units you take.
              Credit for prior study reduces it.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">Pace</p>
                <Segmented
                  items={[...PACES]}
                  value={pace}
                  label="Study pace"
                  idPrefix="intl-pace"
                  onChange={(v) => {
                    setPace(v)
                    track('intl_fees_pace', { pace: v })
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">Where you study</p>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Study mode">
                  {intl.modes.map((m) => {
                    const on = m.id === mode
                    const Icon = m.id === 'offshore' ? Home : Plane
                    return (
                      <button
                        key={m.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setMode(m.id)
                          track('intl_mode', { mode: m.id })
                        }}
                        className={cn(
                          'flex min-h-11 items-center gap-2 rounded-md border px-3 text-left text-sm leading-snug transition-colors',
                          on ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-input bg-background hover:border-foreground',
                        )}
                      >
                        <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                        <span className="font-medium">{m.id === 'offshore' ? 'From home' : 'In Australia'}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
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
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Deposit to hold</dt>
                <dd className="font-display text-2xl leading-none tabular-nums">{money(intl.fees.deposit)}</dd>
              </div>
            </dl>

            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Visa:</span> {selectedMode.visa}
            </p>
          </div>

          <div className="flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p className="text-sm leading-relaxed text-pretty">
              <span className="font-medium">Census Date Guarantee.</span> Withdraw before census and you owe nothing; the deposit is refunded in full.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:col-span-5">
          <p className="text-sm font-medium">The detail, when you want it</p>
          <Expander id="intl-other-costs" title="Other costs to plan for" summary="Textbooks, travel, visas, health cover">
            <OtherCostsTable intl={intl} />
          </Expander>
          <Expander id="intl-payment" title="Ways to pay" summary="Per trimester, deposit, employer">
            <PaymentOptionsList intl={intl} />
          </Expander>
          <Expander id="intl-english" title="English evidence" summary="Test scores and exemptions">
            <EnglishEvidence intl={intl} />
          </Expander>
          <Expander id="intl-feehelp" title="Why FEE-HELP does not apply" summary="Citizens and humanitarian visa holders only">
            <FeeHelpNote />
          </Expander>
          <Link
            href={guideHref}
            onClick={() => track('intl_guide_click', { from: 'fees', country: country?.code })}
            className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Read the full international guide <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Module>
  )
}
