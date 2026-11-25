'use client'

import { Download, MailCheck } from 'lucide-react'
import { useState } from 'react'
import { RoutingQuestion, type RouteOption } from './routing-question'
import { Button, Field, ResultCard } from './ui'

export type EnquiryRoute = RouteOption & {
  confirmation: string
  next: string[]
}

/**
 * One form per page, with a routing question that changes the confirmation
 * message and previews the first messages the person will receive.
 */
export function EnquiryForm({
  title,
  intro,
  routes,
  cta,
  emailOnly,
  id,
}: {
  title: string
  intro: string
  routes: EnquiryRoute[]
  cta: string
  emailOnly?: boolean
  id?: string
}) {
  const [route, setRoute] = useState(routes[0].id)
  const [done, setDone] = useState(false)
  const r = routes.find((x) => x.id === route) ?? routes[0]

  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl leading-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{intro}</p>
      </div>
      {done ? (
        <ResultCard tone="yes">
          <div className="flex items-start gap-3">
            <MailCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-pretty">{r.confirmation}</p>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide opacity-80">What happens next</p>
                <ol className="flex flex-col gap-1">
                  {r.next.map((n, i) => (
                    <li key={n} className="flex gap-2">
                      <span className="tabular-nums opacity-70">{i + 1}.</span>
                      {n}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </ResultCard>
      ) : (
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
        >
          {routes.length > 1 && <RoutingQuestion question="Which sounds most like you?" options={routes} value={route} onChange={setRoute} compact />}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Your name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            {!emailOnly && <Field label="Mobile (optional)" name="tel" type="tel" autoComplete="tel" />}
          </div>
          <Button type="submit" size="lg" className="self-start">
            {emailOnly && <Download className="size-4" aria-hidden />} {cta}
          </Button>
        </form>
      )}
    </div>
  )
}
