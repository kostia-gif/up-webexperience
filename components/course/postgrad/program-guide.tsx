'use client'

import { Check, Download, FileText } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { LeadForm } from '../lead-form'
import { Btn, Module } from '../primitives'
import { usePostgrad } from './context'

export function ProgramGuide() {
  const { pg } = usePostgrad()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const g = pg.programGuide
  if (!g) return null

  return (
    <Module id="guide" eyebrow={g.eyebrow} title={g.title} muted wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-6">
          <p className="text-[15px] leading-relaxed text-pretty">{g.blurb}</p>
          <div>
            <p className="mb-3 text-sm font-medium">What&apos;s inside</p>
            <ul className="flex flex-col gap-2.5">
              {g.contents.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[15px] leading-snug">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                <FileText className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col">
                <p className="font-medium leading-tight">Master of Counselling program guide</p>
                <p className="text-sm text-muted-foreground">{g.fileLabel}</p>
              </div>
            </div>

            {sent ? (
              <div role="status" aria-live="polite" className="flex gap-3 rounded-lg border border-success-border bg-success p-4 text-success-foreground">
                <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                <div className="flex flex-col gap-1 text-[15px] leading-relaxed">
                  <p className="font-medium">On its way to your inbox.</p>
                  <p className="text-sm">Check your email in a minute or two. Can&apos;t wait? Download it now.</p>
                  <a href="#" className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-medium underline underline-offset-4 hover:no-underline" onClick={() => track('guide_download')}>
                    <Download className="size-4" aria-hidden /> Download the PDF
                  </a>
                </div>
              </div>
            ) : open ? (
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
            ) : (
              <Btn variant="blue" onClick={() => setOpen(true)} className="w-full sm:w-auto">
                <Download className="size-4" aria-hidden /> Get the guide
              </Btn>
            )}
          </div>
        </div>
      </div>
    </Module>
  )
}
