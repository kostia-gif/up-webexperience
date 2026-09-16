'use client'

import { useState } from 'react'
import { Btn, Field, inputClass } from './primitives'

export function LeadForm({
  title,
  note,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  title: string
  note: string
  submitLabel: string
  onSubmit: (lead: { name: string; mobile: string; email: string }) => void
  onCancel: () => void
}) {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const id = title.replace(/\s+/g, '-').toLowerCase()

  return (
    <form
      className="mt-3 flex flex-col gap-4 rounded-lg border border-border bg-muted p-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, mobile, email })
      }}
    >
      <p className="text-sm font-medium">{title}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="First name" id={`${id}-name`}>
          <input id={`${id}-name`} required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Mobile" id={`${id}-mobile`}>
          <input id={`${id}-mobile`} required type="tel" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Email" id={`${id}-email`}>
          <input id={`${id}-email`} required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{note}</p>
      <div className="flex flex-wrap gap-2">
        <Btn type="submit" variant="blue">
          {submitLabel}
        </Btn>
        <Btn variant="ghost" onClick={onCancel}>
          Cancel
        </Btn>
      </div>
    </form>
  )
}
