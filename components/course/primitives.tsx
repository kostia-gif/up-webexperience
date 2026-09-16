'use client'

import { cn } from '@/lib/utils'
import type { PlaceStatus } from '@/lib/course'
import { STATUS_LABEL } from '@/lib/course'
import { useId, useRef, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react'

type Variant = 'coral' | 'blue' | 'outline' | 'ghost'
type Size = 'md' | 'sm'

const variantClass: Record<Variant, string> = {
  coral: 'bg-coral text-coral-foreground hover:bg-coral-hover',
  blue: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  outline: 'bg-background text-foreground border border-input hover:border-foreground',
  ghost: 'bg-transparent text-primary hover:bg-primary-tint',
}

const sizeClass: Record<Size, string> = {
  md: 'min-h-11 px-4 text-[15px]',
  sm: 'min-h-11 px-3 text-sm',
}

export function Btn({
  variant = 'outline',
  size = 'md',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  )
}

export function LinkBtn({
  href,
  variant = 'outline',
  size = 'md',
  className,
  children,
  onClick,
}: {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </a>
  )
}

const pillClass: Record<PlaceStatus, string> = {
  spaces: 'bg-success text-success-foreground border-success-border',
  filling: 'bg-warning text-warning-foreground border-warning-border',
  waitlist: 'bg-muted text-muted-foreground border-border',
  interest: 'bg-muted text-muted-foreground border-border',
}

export function StatusPill({ status, className }: { status: PlaceStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium leading-none',
        pillClass[status],
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}

export function Segmented<T extends string>({
  items,
  value,
  onChange,
  label,
  idPrefix,
}: {
  items: T[]
  value: T
  onChange: (v: T, index: number) => void
  label: string
  idPrefix: string
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const uid = useId()

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % items.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = items.length - 1
    else return
    e.preventDefault()
    onChange(items[next], next)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item, i) => {
        const selected = item === value
        return (
          <button
            key={item}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            type="button"
            id={`${idPrefix}-tab-${i}-${uid}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item, i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              'min-h-11 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background text-foreground hover:border-foreground',
            )}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export function Module({
  id,
  eyebrow,
  title,
  children,
  className,
  wide,
  muted,
}: {
  id?: string
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
  wide?: boolean
  muted?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn('hairline-t border-border scroll-mt-20', muted && 'bg-muted', className)}
    >
      <div className={cn('mx-auto px-6 py-8 md:py-12', wide ? 'max-w-[960px]' : 'max-w-[720px]')}>
        {(eyebrow || title) && (
          <header className="mb-6 flex flex-col gap-1">
            {eyebrow && <p className="text-xs font-medium uppercase tracking-wide text-primary">{eyebrow}</p>}
            {title && (
              <h2 id={`${id}-title`} className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance md:text-4xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

export const inputClass =
  'min-h-11 w-full rounded-md border border-input bg-background px-3 text-[15px] text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary'
