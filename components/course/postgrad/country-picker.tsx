'use client'

import { Globe, X } from 'lucide-react'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { AU, OTHER, useIntl, useStudyFrom } from './study-from'

export function CountryPicker({ className, compact }: { className?: string; compact?: boolean }) {
  const { intl } = useIntl()
  const { code, set, country } = useStudyFrom()
  const id = useId()
  const sorted = [...intl.countries].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <label htmlFor={id} className="inline-flex items-center gap-1.5 text-sm font-medium">
        <Globe className="size-4 text-primary" aria-hidden />
        {compact ? 'Studying from' : 'I will be studying from'}
      </label>
      <select
        id={id}
        value={code}
        onChange={(e) => set(e.target.value)}
        className="min-h-10 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
      >
        <option value={AU}>Australia</option>
        <optgroup label="Outside Australia">
          {sorted.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </optgroup>
        <option value={OTHER}>Another country</option>
      </select>
      {country && (
        <button
          type="button"
          onClick={() => set(AU)}
          className="inline-flex min-h-10 items-center gap-1 rounded-md px-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden /> Reset to Australia
        </button>
      )}
    </div>
  )
}
