'use client'

import { usePostgrad } from '../postgrad/context'
import { Module } from '../primitives'

/**
 * Deliberately small replacement for the full fees module on Option A: the
 * three facts that matter, the ways to pay, and the census guarantee. It keeps
 * the id="fees" anchor (linked from the hero and details) honest without the
 * comparison tables and calculators.
 */
export function FeesLite() {
  const { pg, money } = usePostgrad()
  const f = pg.fees

  return (
    <Module id="fees" eyebrow="Fees and FEE-HELP" title="The short version" wide>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat k="Total tuition" v={money(f.total)} sub={`${money(f.perUnit)} per unit, 14 units`} />
        <Stat k="To start" v="$0 upfront" sub="Defer 100% with FEE-HELP if eligible" />
        <Stat k="Repay from" v={`~${money(f.feeHelpThreshold)}/yr`} sub="Through the tax system, once you earn above the threshold" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {pg.paymentOptions.map((o) => (
          <div key={o.title} className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
            <p className="text-[15px] font-medium leading-snug">{o.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{o.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
        Census Date Guarantee: withdraw from a unit before its census date and you pay nothing for it. A course specialist can walk
        through FEE-HELP for your exact situation on a{' '}
        <a href="#specialist" className="font-medium text-primary underline underline-offset-4 hover:no-underline">
          15-minute call
        </a>
        .
      </p>
    </Module>
  )
}

function Stat({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{k}</p>
      <p className="font-display text-3xl leading-none">{v}</p>
      <p className="mt-1 text-sm text-muted-foreground text-pretty">{sub}</p>
    </div>
  )
}
