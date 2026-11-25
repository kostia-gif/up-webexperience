'use client'

import { Download, Send } from 'lucide-react'
import { useState } from 'react'
import { Button, Field, Placeholder, ResultCard } from './ui'

export type SummaryLine = { label: string; value: string }

/** A one-page summary of course, cost, time and recognition to send to a parent, partner or manager. */
export function SendSummary({
  to,
  title,
  lines,
  intro,
  id,
}: {
  to: 'a parent' | 'your family' | 'your employer' | 'someone'
  title: string
  lines: SummaryLine[]
  intro: string
  id?: string
}) {
  const [sent, setSent] = useState(false)
  return (
    <div id={id} className="grid scroll-mt-20 gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 md:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">One-page summary</p>
        <p className="font-display text-xl leading-tight">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{intro}</p>
        <dl className="flex flex-col divide-y divide-border text-sm">
          {lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-3 py-2">
              <dt className="text-muted-foreground">{l.label}</dt>
              <dd className="text-right font-medium">{l.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-muted-foreground">
          <Placeholder /> Figures are placeholders.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-4">
        {sent ? (
          <ResultCard tone="yes">
            <p className="text-sm text-pretty">
              <span className="font-medium">Sent.</span> {to.charAt(0).toUpperCase() + to.slice(1)} will get the summary as a PDF, and nothing else.
            </p>
          </ResultCard>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <p className="text-sm leading-relaxed text-pretty">Send this to {to} so they can see the facts without the sales pitch.</p>
            <Field label={`Email for ${to}`} name="to" type="email" required />
            <div className="flex flex-wrap gap-2">
              <Button type="submit">
                <Send className="size-4" aria-hidden /> Send
              </Button>
              <Button variant="secondary" onClick={() => setSent(true)}>
                <Download className="size-4" aria-hidden /> Download PDF
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
