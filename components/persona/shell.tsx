'use client'

import { ArrowLeft, Info, Plane } from 'lucide-react'
import type { ReactNode } from 'react'
import { BRAND_FONTS } from '@/lib/personas/fonts'
import { BRANDS, type BrandKey } from '@/lib/personas/registry'
import { cn } from '@/lib/utils'

export function BrandLogo({ brand, className }: { brand: BrandKey; className?: string }) {
  if (brand === 'aipc') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/images/aipc/logo.svg" alt="AIPC" width={118} height={48} className={cn('h-10 w-auto', className)} />
  }
  if (brand === 'yoobee') {
    return (
      <span className={cn('flex flex-col leading-none', className)}>
        <span className="font-display text-2xl font-bold tracking-tight">Yoobee</span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] opacity-80">College of Creative Innovation</span>
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Plane className="size-6 text-coral" aria-hidden />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-bold uppercase tracking-tight">NZST</span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] opacity-80">New Zealand School of Tourism</span>
      </span>
    </span>
  )
}

export function ReviewerPanel({ forWho, testing, note }: { forWho: string; testing: string; note?: string }) {
  return (
    <details className="group border-b border-border bg-muted text-sm">
      <summary className="mx-auto flex max-w-5xl cursor-pointer list-none items-center gap-2 px-5 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:px-8 [&::-webkit-details-marker]:hidden">
        <Info className="size-3.5" aria-hidden />
        For reviewers
        <span className="ml-auto hidden normal-case tracking-normal group-open:hidden sm:inline">Who this page is for and what it tests</span>
        <a
          href="/"
          onClick={(e) => e.stopPropagation()}
          className="ml-auto inline-flex items-center gap-1 normal-case tracking-normal text-foreground underline underline-offset-4 hover:text-primary sm:ml-4"
        >
          <ArrowLeft className="size-3.5" aria-hidden /> Back to index
        </a>
      </summary>
      <div className="mx-auto grid max-w-5xl gap-4 px-5 pb-4 sm:grid-cols-2 sm:px-8">
        <p className="leading-relaxed text-pretty">
          <span className="font-medium">Who it is for. </span>
          {forWho}
        </p>
        <p className="leading-relaxed text-pretty">
          <span className="font-medium">What it tests. </span>
          {testing}
        </p>
        {note && <p className="leading-relaxed text-muted-foreground text-pretty sm:col-span-2">{note}</p>}
      </div>
    </details>
  )
}

export function PersonaShell({
  brand,
  children,
  applyHref = '#apply',
  applyLabel = 'Apply',
  reviewer,
  mainAction,
}: {
  brand: BrandKey
  children: ReactNode
  applyHref?: string
  applyLabel?: string
  reviewer: { forWho: string; testing: string; note?: string }
  /** Carried alone in the sticky bar on small screens. */
  mainAction: { label: string; href: string }
}) {
  const b = BRANDS[brand]
  return (
    <div data-brand={brand} className={cn('bg-background text-foreground', BRAND_FONTS[brand])}>
      <ReviewerPanel {...reviewer} />
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href={b.href} aria-label={`${b.name} home`} className="shrink-0">
            <BrandLogo brand={brand} />
          </a>
          <nav aria-label="Primary" className="flex items-center gap-4 text-sm sm:gap-6">
            <a href={b.href} className="hover:underline underline-offset-4">
              Courses
            </a>
            <a href={applyHref} className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
              {applyLabel}
            </a>
            <a
              href={mainAction.href}
              className="hidden min-h-10 items-center rounded-md bg-coral px-4 text-sm font-medium text-coral-foreground hover:bg-coral-hover sm:inline-flex"
            >
              {mainAction.label}
            </a>
          </nav>
        </div>
      </header>
      <div className="[&_section]:scroll-mt-24">{children}</div>
      <footer className="border-t border-border bg-muted pb-20 sm:pb-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:px-8">
          <BrandLogo brand={brand} className="text-foreground" />
          <p className="max-w-2xl leading-relaxed text-pretty">{b.footer}</p>
          <p>Call {b.phone}</p>
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-pretty">
            Illustrative prototype. Names, figures, stories, tutors and employers are placeholders until UP supplies real ones. Chat,
            messaging, booking and enrolment are working-looking prototypes only and send nothing.
          </p>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <a
          href={mainAction.href}
          className="flex min-h-12 items-center justify-center rounded-md bg-coral text-base font-medium text-coral-foreground hover:bg-coral-hover"
        >
          {mainAction.label}
        </a>
      </div>
    </div>
  )
}
