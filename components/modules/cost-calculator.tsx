'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Pill, Placeholder } from './ui'

export type CostVersion = { id: string; label: string; tuition: number; months: number; subjects: number; trimesters: number }
export type CostExtra = { id: string; label: string; amount: number; hint: string; on?: boolean }

function money(n: number, currency: 'AUD' | 'NZD') {
  return n.toLocaleString(currency === 'AUD' ? 'en-AU' : 'en-NZ', { style: 'currency', currency, maximumFractionDigits: 0 })
}

/** Tuition plus the extras people discover later, with payment options side by side. */
export function CostCalculator({
  versions,
  extras,
  currency,
  feeHelpNote,
  id,
}: {
  versions: CostVersion[]
  extras: CostExtra[]
  currency: 'AUD' | 'NZD'
  feeHelpNote: string
  id?: string
}) {
  const [vId, setVId] = useState(versions[0].id)
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(extras.map((e) => [e.id, e.on ?? true])))
  const v = versions.find((x) => x.id === vId) ?? versions[0]
  const extrasTotal = extras.filter((e) => on[e.id]).reduce((s, e) => s + e.amount, 0)
  const total = v.tuition + extrasTotal
  const perTrimester = Math.round(v.tuition / v.trimesters)

  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Which version?</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Course version">
          {versions.map((x) => (
            <Pill key={x.id} active={x.id === vId} onClick={() => setVId(x.id)}>
              {x.label}
            </Pill>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {v.months} months part-time, {v.subjects} subjects, tuition {money(v.tuition, currency)}.
        </p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">The extras most people forget</legend>
        {extras.map((e) => (
          <label key={e.id} className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border px-4 py-3 text-sm has-[:checked]:border-primary/40 has-[:checked]:bg-primary-tint/40">
            <span className="flex items-start gap-3">
              <input type="checkbox" checked={!!on[e.id]} onChange={() => setOn((o) => ({ ...o, [e.id]: !o[e.id] }))} className="mt-1 size-4 accent-primary" />
              <span className="flex flex-col">
                <span className="font-medium">{e.label}</span>
                <span className="text-xs text-muted-foreground">{e.hint}</span>
              </span>
            </span>
            <span className="shrink-0 tabular-nums">{money(e.amount, currency)}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-1 border-t border-border pt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Full cost, nothing hidden</p>
        <p className="font-display text-4xl tabular-nums">
          {money(total, currency)} <Placeholder className="ml-2 align-middle" />
        </p>
        <p className="text-sm text-muted-foreground">
          {money(v.tuition, currency)} tuition plus {money(extrasTotal, currency)} in extras over the whole course.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { h: 'FEE-HELP', big: money(0, currency) + ' up front', sub: `Defer all ${money(v.tuition, currency)} of tuition. ${feeHelpNote}` },
          { h: 'Per trimester', big: money(perTrimester, currency), sub: `Pay as you go across ${v.trimesters} trimesters. Extras paid as they come up.` },
          { h: 'A mix', big: 'You choose', sub: 'Pay some subjects up front and defer the rest. Change between trimesters.' },
        ].map((o, i) => (
          <div key={o.h} className={cn('flex flex-col gap-1 rounded-lg border p-4', i === 0 ? 'border-primary/40 bg-primary-tint/40' : 'border-border')}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{o.h}</p>
            <p className="text-lg font-medium tabular-nums">{o.big}</p>
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty">{o.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
