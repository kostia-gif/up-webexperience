'use client'

import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

export function Expander({
  title,
  summary,
  children,
  id,
  className,
}: {
  title: string
  summary?: string
  children: ReactNode
  id: string
  className?: string
}) {
  return (
    <details
      id={id}
      className={cn('group rounded-lg border border-border bg-card open:bg-card', className)}
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open) track('expander_open', { id })
      }}
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm font-medium">{title}</span>
          {summary && <span className="truncate text-xs text-muted-foreground group-open:hidden">{summary}</span>}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="border-t border-border px-4 py-4 text-sm leading-relaxed">{children}</div>
    </details>
  )
}
