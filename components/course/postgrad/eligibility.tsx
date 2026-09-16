'use client'

import { ArrowRight, FileCheck } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { Btn, LinkBtn, Module } from '../primitives'
import { usePostgrad } from './context'
import { useStudyFrom } from './study-from'

const QUALS = [
  { v: 'any', l: 'A bachelor degree in any field' },
  { v: 'aipc-bach', l: 'AIPC Bachelor of Counselling' },
  { v: 'other-couns', l: 'A counselling degree, or a bachelor with a counselling major, from another provider' },
  { v: 'aipc-gd', l: 'An AIPC Graduate Diploma of Counselling or Relationship Counselling' },
  { v: 'diploma', l: 'A Diploma of Counselling or other VET qualification, no degree' },
  { v: 'none', l: 'No completed tertiary qualification' },
] as const

const EXPERIENCE = [
  { v: 'none', l: 'None, or unrelated work' },
  { v: 'some', l: 'Under three years in counselling or community services' },
  { v: 'three', l: 'Three years or more in a counselling environment' },
] as const

const RESIDENCY = [
  { v: 'citizen', l: 'Australian citizen' },
  { v: 'humanitarian', l: 'Permanent humanitarian visa' },
  { v: 'pr', l: 'Australian permanent resident' },
  { v: 'nz', l: 'New Zealand citizen living in Australia' },
  { v: 'other', l: 'Another visa, or living overseas' },
] as const

const ENGLISH = [
  { v: 'degree-en', l: 'My degree was taught and assessed in English, in the last five years' },
  { v: 'test', l: 'I have, or will sit, IELTS, TOEFL, PTE or Cambridge' },
  { v: 'work', l: 'Two or more years working in an English-speaking role' },
  { v: 'unsure', l: 'Not sure yet' },
] as const

type Qual = (typeof QUALS)[number]['v']
type Exp = (typeof EXPERIENCE)[number]['v']
type Res = (typeof RESIDENCY)[number]['v']
type Eng = (typeof ENGLISH)[number]['v']

type Assessment = {
  eligible: boolean
  credit: { units: number; kind: 'automatic' | 'apply' | 'none'; detail: string }
  rpl?: string
  feeHelp: 'yes' | 'maybe' | 'no'
  english?: Eng
}

export function EligibilityAndRpl() {
  const { pg, money, course } = usePostgrad()
  const { isIntl, country } = useStudyFrom()
  const intl = pg.international
  const [qual, setQual] = useState<Qual | ''>('')
  const [exp, setExp] = useState<Exp | ''>('')
  const [res, setRes] = useState<Res | ''>('')
  const [eng, setEng] = useState<Eng | ''>('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Assessment | null>(null)

  const feeTotal = isIntl && intl ? intl.fees.total : pg.fees.total
  const perUnit = isIntl && intl ? intl.fees.perUnit : pg.fees.perUnit
  const talkHref = isIntl ? '#international' : '#specialist'

  function assess() {
    const third = isIntl ? eng : res
    if (!qual || !exp || !third) {
      setError('Answer all three questions for a formal indication.')
      setResult(null)
      return
    }
    setError('')
    const eligible = qual === 'any' || qual === 'aipc-bach' || qual === 'other-couns' || qual === 'aipc-gd'
    let credit: Assessment['credit'] = { units: 0, kind: 'none', detail: 'No credit from prior study. The full fourteen units apply.' }
    if (qual === 'aipc-bach') {
      const auto = pg.rpl.auto[0]
      credit = { units: auto.units.length, kind: 'automatic', detail: `Automatic credit for ${auto.units.join(', ')}. No application needed.` }
    } else if (qual === 'aipc-gd') {
      credit = { units: 3, kind: 'automatic', detail: 'Automatic credit for up to three units, matched to your Graduate Diploma stream.' }
    } else if (qual === 'other-couns') {
      credit = { units: pg.rpl.max, kind: 'apply', detail: `Apply for credit transfer of up to ${pg.rpl.max} units, assessed against your transcript and unit outlines.` }
    }
    let rpl: string | undefined
    if (eligible && exp === 'three' && credit.units < pg.rpl.max) {
      rpl = `Your experience may be recognised through RPL for up to ${pg.rpl.max - credit.units} further ${pg.rpl.max - credit.units === 1 ? 'unit' : 'units'}, with evidence.`
    }
    const feeHelp: Assessment['feeHelp'] = isIntl ? 'no' : res === 'citizen' || res === 'humanitarian' ? 'yes' : res === 'nz' ? 'maybe' : 'no'
    const r: Assessment = { eligible, credit, rpl, feeHelp, english: isIntl ? (eng as Eng) : undefined }
    setResult(r)
    track('eligibility_assess', { eligible, credit: credit.units, feeHelp, intl: isIntl, country: country?.code })
  }

  const creditUnits = result?.credit.units ?? 0
  const savings = creditUnits * perUnit

  return (
    <Module id="eligibility" eyebrow="Eligibility and credit" title="Three questions, then a formal indication" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Entry needs a bachelor degree in any field{isIntl ? ', from any country, at a level we can recognise as equivalent' : ''}. Credit for prior
        study or experience can remove up to {pg.rpl.max} of the fourteen units. This gives you an indication;{' '}
        {isIntl ? 'the international team confirms' : 'a course specialist confirms'} it against your documents before you accept a place.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <Question legend="1. Your highest completed qualification" name="qual" options={QUALS} value={qual} onChange={(v) => setQual(v as Qual)} />
        <Question legend="2. Counselling or community services experience" name="exp" options={EXPERIENCE} value={exp} onChange={(v) => setExp(v as Exp)} />
        {isIntl ? (
          <Question legend="3. English evidence" name="eng" options={ENGLISH} value={eng} onChange={(v) => setEng(v as Eng)} />
        ) : (
          <Question legend="3. Residency, for FEE-HELP" name="res" options={RESIDENCY} value={res} onChange={(v) => setRes(v as Res)} />
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Btn variant="blue" onClick={assess}>
          Assess my eligibility
        </Btn>
        {error && (
          <p className="text-[13px] text-warning-foreground" role="alert">
            {error}
          </p>
        )}
      </div>

      <div role="status" aria-live="polite" className="mt-6">
        {result && result.eligible && (
          <div className="overflow-hidden rounded-lg border border-success-border">
            <div className="flex items-center gap-3 bg-success px-5 py-4 text-success-foreground">
              <FileCheck className="size-6 shrink-0" aria-hidden />
              <div>
                <p className="font-display text-2xl leading-none">Eligible to apply</p>
                <p className="mt-1 text-sm">Indicative assessment based on your answers. Confirmed on certified documents.</p>
              </div>
            </div>
            <dl className="divide-y divide-border bg-card text-sm">
              <Row k="Entry">You meet the entry requirement: a completed bachelor degree.</Row>
              <Row k="Credit">
                {result.credit.detail}
                {result.rpl && <span className="mt-1 block">{result.rpl}</span>}
              </Row>
              <Row k="Time and cost">
                {creditUnits > 0 ? (
                  <>
                    {pg.structure.totalUnits - creditUnits} units instead of {pg.structure.totalUnits}. Tuition about {money(feeTotal - savings)} rather than{' '}
                    {money(feeTotal)}, and about one trimester shorter{result.credit.kind === 'apply' ? ', if the full credit is granted' : ''}.
                  </>
                ) : (
                  <>
                    All {pg.structure.totalUnits} units, {money(feeTotal)} in total{isIntl ? ' at the international rate' : ''}. Two years full-time or four part-time.
                  </>
                )}
              </Row>
              {isIntl ? (
                <Row k="English">
                  {result.english === 'degree-en' && 'A degree taught and assessed in English in the last five years usually exempts you from a test. We confirm against your transcript and a letter from the university.'}
                  {result.english === 'test' && `You need ${course.formal.intl.ielts} IELTS Academic, or the equivalent TOEFL, PTE or Cambridge score. Results must be under two years old at the start of your first trimester.`}
                  {result.english === 'work' && 'Two years in an English-speaking role can be accepted with an employer letter and position description. The international team will tell you whether yours qualifies before you apply.'}
                  {result.english === 'unsure' && `Bring this to the call. The team will tell you within a few minutes whether you need a test. If you do, ${course.formal.intl.ielts} IELTS Academic or equivalent.`}
                  {country?.englishNote && <span className="mt-1 block">{country.englishNote}</span>}
                </Row>
              ) : (
                <Row k="FEE-HELP">
                  {result.feeHelp === 'yes' && `You can defer 100% of tuition. Nothing to pay upfront; repay through tax above about ${money(pg.fees.feeHelpThreshold)} a year.`}
                  {result.feeHelp === 'maybe' &&
                    'New Zealand citizens on a Special Category Visa may be eligible if they meet long-term residency requirements. A specialist will check this with you.'}
                  {result.feeHelp === 'no' && 'Not eligible for FEE-HELP on this residency status. Tuition is paid per trimester, only for the units you are enrolled in.'}
                  {res === 'other' && ` International applicants also need IELTS ${course.formal.intl.ielts}.`}
                </Row>
              )}
              {isIntl && (
                <Row k="Payment">
                  No FEE-HELP for international students. Pay per trimester in Australian dollars, or hold a place with a {money(intl?.fees.deposit ?? 0)} deposit
                  that is refunded in full before census.
                </Row>
              )}
              {(result.credit.kind !== 'none' || result.rpl) && (
                <Row k="What we will ask for">
                  <ul className="flex flex-col gap-1">
                    {pg.rpl.evidence.map((e) => (
                      <li key={e} className="flex gap-2">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </Row>
              )}
            </dl>
            <div className="flex flex-wrap gap-3 border-t border-border bg-card px-5 py-4">
              <LinkBtn href="#apply" variant="coral" onClick={() => track('eligibility_cta', { cta: 'apply' })}>
                Apply and hold a place <ArrowRight className="size-4" aria-hidden />
              </LinkBtn>
              <LinkBtn href={talkHref} variant="outline" onClick={() => track('eligibility_cta', { cta: 'specialist' })}>
                {isIntl ? 'Check my documents with the international team' : creditUnits > 0 ? 'Discuss my credit with a specialist' : 'Talk to a specialist first'}
              </LinkBtn>
            </div>
          </div>
        )}

        {result && !result.eligible && (
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary-tint p-5 text-primary-tint-foreground">
            <p className="font-display text-2xl leading-none">Not eligible for the Master yet. There is a mapped route.</p>
            <p className="text-[15px] leading-relaxed">{course.entry.fallback.note}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <LinkBtn href={talkHref} variant="blue" onClick={() => track('eligibility_cta', { cta: 'pathway' })}>
                {isIntl ? 'Map my pathway with the international team' : 'Map my pathway with a specialist'}
              </LinkBtn>
            </div>
          </div>
        )}
      </div>
    </Module>
  )
}

function Question<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: readonly { v: T; l: string }[]
  value: string
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      {options.map((o) => {
        const id = `${name}-${o.v}`
        const on = value === o.v
        return (
          <label
            key={o.v}
            htmlFor={id}
            className={cn(
              'flex min-h-11 cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 text-sm leading-snug transition-colors',
              on ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-input bg-background hover:border-foreground',
            )}
          >
            <input id={id} type="radio" name={name} value={o.v} checked={on} onChange={() => onChange(o.v)} className="mt-0.5 size-4 shrink-0 accent-primary" />
            {o.l}
          </label>
        )
      })}
    </fieldset>
  )
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-5 py-3.5 sm:grid-cols-[160px_1fr] sm:gap-4">
      <dt className="font-medium text-muted-foreground">{k}</dt>
      <dd className="leading-relaxed">{children}</dd>
    </div>
  )
}
