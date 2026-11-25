import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Marks sample content that UP must replace before launch. */
export function Placeholder({ className, children = 'Placeholder' }: { className?: string; children?: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-dashed border-warning-border bg-warning px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-warning-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = 'default',
  dense = false,
}: {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  children?: ReactNode
  className?: string
  tone?: 'default' | 'muted'
  /** Tighter rhythm for phone-first pages. */
  dense?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn('scroll-mt-20', tone === 'muted' ? 'bg-muted' : 'bg-background', className)}
    >
      <div className={cn('mx-auto flex max-w-5xl flex-col px-5 sm:px-8', dense ? 'gap-4 py-8 sm:py-10' : 'gap-6 py-12 sm:py-16')}>
        <div className="flex max-w-2xl flex-col gap-2">
          {eyebrow && <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</p>}
          <h2 id={id ? `${id}-title` : undefined} className={cn('font-display leading-tight text-balance', dense ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl')}>
            {title}
          </h2>
          {intro && <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty sm:text-base">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

type BtnProps = {
  variant?: 'primary' | 'secondary' | 'quiet' | 'link'
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50'
const BTN_VARIANT = {
  primary: 'bg-coral text-coral-foreground hover:bg-coral-hover',
  secondary: 'border border-foreground/20 bg-background text-foreground hover:border-foreground',
  quiet: 'bg-muted text-foreground hover:bg-border',
  link: 'text-foreground underline underline-offset-4 hover:text-primary px-0',
}
const BTN_SIZE = { md: 'min-h-11 px-4 text-sm', lg: 'min-h-12 px-5 text-base' }

export function btnClass({ variant = 'primary', size = 'md', className }: Omit<BtnProps, 'children'>) {
  return cn(BTN_BASE, BTN_VARIANT[variant], variant === 'link' ? '' : BTN_SIZE[size], className)
}

export function ButtonLink({ href, variant, size, className, children }: BtnProps & { href: string }) {
  return (
    <a href={href} className={btnClass({ variant, size, className })}>
      {children}
    </a>
  )
}

export function Button({
  type = 'button',
  onClick,
  variant,
  size,
  className,
  children,
  disabled,
  ariaLabel,
}: BtnProps & { type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean; ariaLabel?: string }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={btnClass({ variant, size, className })}>
      {children}
    </button>
  )
}

export function Pill({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-colors',
        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-foreground',
      )}
    >
      {children}
    </button>
  )
}

export function Expander({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group rounded-lg border border-border bg-card" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </details>
  )
}

export function ResultCard({ tone = 'yes', children }: { tone?: 'yes' | 'start' | 'info'; children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col gap-3 rounded-lg border p-5',
        tone === 'yes' && 'border-success-border bg-success text-success-foreground',
        tone === 'start' && 'border-primary/30 bg-primary-tint text-primary-tint-foreground',
        tone === 'info' && 'border-border bg-muted text-foreground',
      )}
    >
      {children}
    </div>
  )
}

export function Field({
  label,
  type = 'text',
  name,
  required,
  placeholder,
  autoComplete,
}: {
  label: string
  type?: string
  name: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="min-h-11 rounded-md border border-input bg-background px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
    </label>
  )
}

/** Simple avatar tile when no photo exists, so people cards never show stock imagery. */
export function Avatar({ name, photo, className }: { name: string; photo?: string; className?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo} alt="" className={cn('size-16 rounded-full object-cover', className)} />
  }
  return (
    <span
      aria-hidden
      className={cn('flex size-16 shrink-0 items-center justify-center rounded-full bg-primary-tint font-display text-xl text-primary-tint-foreground', className)}
    >
      {initials}
    </span>
  )
}
