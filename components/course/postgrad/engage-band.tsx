'use client'

import { ArrowRight, Download, MessageCircle, PhoneCall } from 'lucide-react'
import { track } from '@/lib/track'
import { usePostgrad } from './context'
import { useStudyFrom } from './study-from'

export function EngageBand() {
  const { pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const nextIntake = pg.intakes.find((i) => i.left > 0) ?? pg.intakes[0]

  const actions = [
    {
      icon: PhoneCall,
      title: isIntl ? 'Talk to the international team' : 'Book a 15-minute call',
      body: isIntl ? 'Video call in your time zone. Your questions, no script.' : 'A course specialist, not a sales desk. Ask anything, decide nothing.',
      href: isIntl ? '#international' : '#specialist',
      cta: 'talk',
    },
    {
      icon: MessageCircle,
      title: 'Ask the AI career coach',
      body: 'Instant, private, and honest about whether this is the right fit for you.',
      href: '#coach',
      cta: 'coach',
    },
    {
      icon: Download,
      title: 'Take the guide away',
      body: 'The whole degree in one PDF, to read properly or share at home.',
      href: '#guide',
      cta: 'guide',
    },
  ]

  return (
    <section aria-labelledby="engage-title" className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-10 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">Where to from here</p>
            <h2 id="engage-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
              You do not have to decide today. Just take one step.
            </h2>
          </div>
          <a
            href="#apply"
            onClick={() => track('engage_cta_click', { cta: 'apply' })}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-coral px-4 text-[15px] font-medium leading-none text-coral-foreground transition-colors hover:bg-coral-hover"
          >
            Hold a place for {nextIntake.label} <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="grid gap-3 md:grid-cols-3">
          {actions.map((a) => (
            <li key={a.cta}>
              <a
                href={a.href}
                onClick={() => track('engage_cta_click', { cta: a.cta })}
                className="group flex h-full flex-col gap-2 rounded-lg border border-primary-foreground/25 p-4 transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10"
              >
                <a.icon className="size-5 text-coral" aria-hidden />
                <p className="font-medium leading-snug">{a.title}</p>
                <p className="flex-1 text-sm leading-relaxed text-primary-foreground/80">{a.body}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 group-hover:underline">
                  Go <ArrowRight className="size-4" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
