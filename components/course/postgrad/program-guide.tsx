'use client'

import { Check, Download, FileText } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { LeadForm } from '../lead-form'
import { Btn, Module } from '../primitives'
import { usePostgrad } from './context'

export function ProgramGuideCard({ compact = false }: { compact?: boolean }) {
  const { pg } = usePostgrad()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const g = pg.programGuide
  if (!g) return null

  return (
    <div id="guide" className="flex scroll-mt-24 flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
            <FileText className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col">
            <p className="font-medium leading-tight">{compact ? 'Not ready to apply? Take the guide instead.' : g.title}</p>
            <p className="text-sm text-muted-foreground">{g.fileLabel} · emailed to you</p>
          </div>
        </div>
        {!open && !sent && (
          <Btn
            variant="blue"
            onClick={() => {
              setOpen(true)
              track('guide_open')
            }}
          >
            <Download className="size-4" aria-hidden /> Get the guide
          </Btn>
        )}
      </div>

      {!compact && <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">{g.blurb}</p>}

      <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
        {g.contents.map((c) => (
          <li key={c} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
            {c}
          </li>
        ))}
      </ul>

      {sent && (
        <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
          <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="flex flex-col gap-1 text-[15px] leading-relaxed">
            <p className="font-medium">On its way to your inbox.</p>
            <a href="#" className="inline-flex items-center gap-1.5 self-start text-sm font-medium underline underline-offset-4 hover:no-underline" onClick={() => track('guide_download')}>
              <Download className="size-4" aria-hidden /> Or download the PDF now
            </a>
          </div>
        </div>
      )}

      {open && !sent && (
        <LeadForm
          title="Where should we send it?"
          note="We email you the guide and use these details only to talk to you about this course. No spam, unsubscribe any time."
          submitLabel="Email me the guide"
          onSubmit={() => {
            track('guide_request')
            setSent(true)
            setOpen(false)
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export function ProgramGuide() {
  const { pg } = usePostgrad()
  const g = pg.programGuide
  if (!g) return null
  return (
    <Module id="guide-section" eyebrow={g.eyebrow} title={g.title} muted wide>
      <ProgramGuideCard />
    </Module>
  )
}
