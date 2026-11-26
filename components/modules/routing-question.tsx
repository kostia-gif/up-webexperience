'use client'

import { cn } from '@/lib/utils'

export type RouteOption<T extends string = string> = { id: T; label: string; hint?: string }

export function RoutingQuestion<T extends string>({
  question,
  options,
  value,
  onChange,
  compact,
}: {
  question: string
  options: RouteOption<T>[]
  value: T
  onChange: (v: T) => void
  compact?: boolean
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className={cn('font-medium', compact ? 'text-sm' : 'text-base')}>{question}</legend>
      <div className={cn('grid gap-2', options.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
        {options.map((o) => {
          const active = o.id === value
          return (
            <label
              key={o.id}
              className={cn(
                'flex cursor-pointer flex-col gap-0.5 rounded-lg border px-4 py-3 text-left transition-colors',
                active ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border bg-card hover:border-foreground',
              )}
            >
              <input type="radio" name={question} value={o.id} checked={active} onChange={() => onChange(o.id)} className="sr-only" />
              <span className="text-sm font-medium">{o.label}</span>
              {o.hint && !compact && <span className="text-xs text-muted-foreground">{o.hint}</span>}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
