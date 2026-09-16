import { Check } from 'lucide-react'
import type { International } from '@/lib/course'

/** Shared detail blocks used by the on-page expanders and the full international guide. */

export function OtherCostsTable({ intl }: { intl: International }) {
  return (
    <table className="w-full text-sm">
      <thead className="sr-only">
        <tr>
          <th>Item</th>
          <th>Amount</th>
          <th>When</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {intl.otherCosts.map((c) => (
          <tr key={c.item} className="align-top">
            <td className="py-2.5 pr-3 font-medium">{c.item}</td>
            <td className="py-2.5 pr-3 text-muted-foreground">{c.amount}</td>
            <td className="py-2.5 text-muted-foreground">{c.when}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function PaymentOptionsList({ intl }: { intl: International }) {
  return (
    <ul className="flex flex-col gap-3">
      {intl.paymentOptions.map((o, i) => (
        <li key={o.title} className="flex gap-3">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
            {i === 0 ? <Check className="size-3.5" aria-hidden /> : <span className="text-xs font-medium">{i + 1}</span>}
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="font-medium">{o.title}</p>
            <p className="text-muted-foreground">{o.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function EnglishEvidence({ intl }: { intl: International }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="font-medium">Accepted tests</p>
        <ul className="flex flex-col gap-1.5 text-muted-foreground">
          {intl.english.tests.map((t) => (
            <li key={t.name} className="flex justify-between gap-3">
              <span>{t.name}</span>
              <span className="text-right text-foreground">{t.score}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">You may be exempt if you have</p>
        <ul className="flex flex-col gap-1.5 text-muted-foreground">
          {intl.english.exemptions.map((e) => (
            <li key={e} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function StudyModes({ intl }: { intl: International }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {intl.modes.map((m) => (
        <div key={m.id} className="flex flex-col gap-2">
          <p className="font-medium">{m.title}</p>
          <p className="text-muted-foreground">{m.body}</p>
          <p>
            <span className="font-medium">Visa:</span> {m.visa}
          </p>
        </div>
      ))}
    </div>
  )
}

export function FeeHelpNote() {
  return (
    <p className="text-muted-foreground">
      FEE-HELP, the Australian Government loan, is for citizens and permanent humanitarian visa holders only, so it does not apply to
      international students. If you later become a citizen, your remaining units become eligible.
    </p>
  )
}

export function MigrationPolicy({ intl }: { intl: International }) {
  return (
    <div className="flex flex-col gap-2">
      <p>{intl.migration.blurb}</p>
      <p className="text-xs text-muted-foreground">{intl.migration.partner}</p>
      <p className="text-xs text-muted-foreground">{intl.migration.disclaimer}</p>
    </div>
  )
}
