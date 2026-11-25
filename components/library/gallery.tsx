'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Pill } from '@/components/modules/ui'
import {
  BRANDS,
  JOBS,
  MODULES,
  PERSONAS,
  STATUSES,
  moduleBrands,
  modulePersonas,
  type BrandKey,
  type Job,
  type PersonaKey,
  type Status,
} from '@/lib/personas/registry'
import { cn } from '@/lib/utils'
import { DemoThumb } from './demo-frame'

const STATUS_CLASS: Record<Status, string> = {
  'In POC': 'bg-success text-success-foreground',
  Adapted: 'bg-primary-tint text-primary-tint-foreground',
  New: 'bg-foreground text-background',
  Idea: 'bg-warning text-warning-foreground',
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={cn('rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide', STATUS_CLASS[status])}>{status}</span>
}

function FilterRow<T extends string>({ label, options, value, onChange, render }: { label: string; options: T[]; value: T | null; onChange: (v: T | null) => void; render?: (v: T) => string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        <Pill active={value === null} onClick={() => onChange(null)}>
          All
        </Pill>
        {options.map((o) => (
          <Pill key={o} active={value === o} onClick={() => onChange(value === o ? null : o)}>
            {render ? render(o) : o}
          </Pill>
        ))}
      </div>
    </div>
  )
}

export function Gallery() {
  const [brand, setBrand] = useState<BrandKey | null>(null)
  const [persona, setPersona] = useState<PersonaKey | null>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [status, setStatus] = useState<Status | null>(null)

  const shown = MODULES.filter(
    (m) =>
      (!brand || moduleBrands(m).includes(brand)) &&
      (!persona || modulePersonas(m).includes(persona)) &&
      (!job || m.job === job) &&
      (!status || m.status === status),
  )

  const personaOptions = (Object.keys(PERSONAS) as PersonaKey[]).filter((k) => !brand || PERSONAS[k].brand === brand)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 md:grid-cols-2">
        <FilterRow label="Brand" options={Object.keys(BRANDS) as BrandKey[]} value={brand} onChange={(v) => { setBrand(v); setPersona(null) }} render={(b) => BRANDS[b].name} />
        <FilterRow label="Persona" options={personaOptions} value={persona} onChange={setPersona} render={(p) => PERSONAS[p].name.split(',')[0]} />
        <FilterRow label="Job" options={JOBS} value={job} onChange={setJob} />
        <FilterRow label="Status" options={STATUSES} value={status} onChange={setStatus} />
      </div>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {shown.length} of {MODULES.length} modules
      </p>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <li key={m.slug} className="relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-4 hover:border-foreground">
            <DemoThumb module={m} />
            <a href={`/modules/${m.slug}`} className="flex flex-1 flex-col gap-4 after:absolute after:inset-0 after:rounded-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-medium leading-snug text-balance">{m.name}</h2>
                  <StatusBadge status={m.status} />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{m.blurb}</p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <ul className="flex flex-wrap gap-1.5 text-[11px]">
                  <li className="rounded-sm bg-muted px-1.5 py-0.5 font-medium">{m.job}</li>
                  {(m.brands === 'all' ? ['All brands'] : m.brands.map((b) => BRANDS[b].name)).map((b) => (
                    <li key={b} className="rounded-sm bg-muted px-1.5 py-0.5">
                      {b}
                    </li>
                  ))}
                  {(m.personas === 'all' ? ['All personas'] : m.personas.map((p) => PERSONAS[p].name.split(',')[0])).map((p) => (
                    <li key={p} className="rounded-sm border border-border px-1.5 py-0.5 text-muted-foreground">
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  Open module <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
