'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { FACILITIES } from './data'
import { SectionHead } from './place'

export function Campus() {
  const [active, setActive] = useState(FACILITIES[0].id)
  const current = FACILITIES.find((f) => f.id === active) ?? FACILITIES[0]

  return (
    <section id="campus" aria-labelledby="campus-h" className="border-b border-border bg-muted/40">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            id="campus-h"
            kicker="Campus and facilities"
            title="Professional studios, a proper library, and people whose job is to look after you"
            lede="Everything on this page is on one campus, three floors, in a converted 1920s warehouse on City Road. Choose a space to see it."
          />
          <a
            href="#enquire"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-primary px-5 text-sm font-medium text-primary hover:bg-primary-tint"
          >
            <Play className="size-4" aria-hidden /> Book a live video tour
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div role="tablist" aria-label="Facilities" className="flex flex-col divide-y divide-border border-y border-border">
            {FACILITIES.map((f) => {
              const on = f.id === active
              return (
                <button
                  key={f.id}
                  role="tab"
                  id={`facility-tab-${f.id}`}
                  aria-selected={on}
                  aria-controls="facility-panel"
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={`flex min-h-14 items-center justify-between gap-3 px-1 py-3 text-left text-[15px] transition-colors ${
                    on ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`h-5 w-0.5 ${on ? 'bg-coral' : 'bg-transparent'}`} aria-hidden />
                </button>
              )
            })}
          </div>

          <div id="facility-panel" role="tabpanel" aria-labelledby={`facility-tab-${current.id}`} className="flex flex-col gap-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted">
              <Image key={current.img + current.id} src={current.img} alt={current.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl text-primary">{current.label}</h3>
              <p className="max-w-[64ch] text-[15px] leading-relaxed text-pretty text-muted-foreground">{current.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
