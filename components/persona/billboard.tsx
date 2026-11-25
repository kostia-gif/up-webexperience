import type { ReactNode } from 'react'
import type { Fact } from '@/components/modules/facts-strip'
import { Placeholder } from '@/components/modules/ui'
import { cn } from '@/lib/utils'

/**
 * The dark NZMA-style billboard from the original round: full-bleed image,
 * condensed uppercase headline, one fact strip, then the actions. Used for NZST.
 */
export function Billboard({
  eyebrow,
  title,
  sub,
  image,
  imageAlt,
  facts,
  actions,
  footnote,
  videoLabel,
}: {
  eyebrow: string
  title: ReactNode
  sub: string
  image?: string
  imageAlt?: string
  facts: Fact[]
  actions: ReactNode
  footnote?: string
  videoLabel?: string
}) {
  return (
    <section aria-labelledby="hero-title" className="relative bg-foreground text-background">
      <div className="absolute inset-0">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt ?? ''} className="absolute inset-0 size-full object-cover opacity-60" />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
      </div>
      {videoLabel && (
        <span className="absolute left-6 top-6">
          <Placeholder>{videoLabel}</Placeholder>
        </span>
      )}
      <div className="relative mx-auto flex min-h-[560px] max-w-[960px] flex-col justify-end gap-6 px-6 pb-10 pt-24 md:min-h-[640px] md:pb-14">
        <p className="text-xs font-medium uppercase tracking-wide text-background/80">{eyebrow}</p>
        <h1 id="hero-title" className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-background/90 text-pretty md:text-xl">{sub}</p>
        <dl id="facts" className="grid scroll-mt-20 grid-cols-2 gap-x-6 gap-y-4 border-y border-background/20 py-5 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-background/70">{f.label}</dt>
              <dd className="text-[15px] font-semibold leading-snug text-background">
                {f.value}
                {f.placeholder && <Placeholder className="ml-1.5 align-middle" />}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
        {footnote && <p className="text-sm text-background/75 text-pretty">{footnote}</p>}
      </div>
    </section>
  )
}

const HERO_BTN = 'inline-flex min-h-14 items-center justify-center gap-2 rounded-md px-6 text-base font-medium leading-none transition-colors'

export function HeroButton({ href, primary, children }: { href: string; primary?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        HERO_BTN,
        primary
          ? 'bg-coral text-coral-foreground hover:bg-coral-hover'
          : 'border border-background/50 bg-transparent text-background hover:border-background hover:bg-background/10',
      )}
    >
      {children}
    </a>
  )
}

export type HeroCard = { label: string; value: string; sub: ReactNode; tone?: 'card' | 'coral' | 'success'; icon?: ReactNode; placeholder?: boolean }

const CARD_TONE = {
  card: 'border border-border bg-card',
  coral: 'bg-coral text-coral-foreground',
  success: 'border border-success-border bg-success text-success-foreground',
}

/**
 * The lighter Yoobee and AIPC hero from the original round: a brand panel
 * overlapping a photo on a light page, with three fact cards beneath. The
 * cards are the one place these facts appear above the fold.
 */
export function SplitHero({
  eyebrow,
  title,
  titleLine,
  sub,
  image,
  imageAlt,
  pills,
  actions,
  note,
  cards,
}: {
  eyebrow: string
  title: ReactNode
  titleLine: string
  sub: string
  image: string
  imageAlt: string
  pills?: { icon: ReactNode; label: string }[]
  actions: ReactNode
  note?: ReactNode
  cards: HeroCard[]
}) {
  return (
    <section aria-labelledby="hero-title" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-0 md:px-6 md:pt-8">
        <div className="flex flex-col md:grid md:grid-cols-12 md:items-stretch">
          <div className="relative aspect-[4/3] md:col-span-7 md:col-start-6 md:row-start-1 md:aspect-auto md:min-h-[540px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="relative bg-primary px-6 py-8 text-primary-foreground md:col-span-6 md:col-start-1 md:row-start-1 md:my-10 md:px-10 md:py-12">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">{eyebrow}</p>
            <h1 id="hero-title" className="mt-4 font-display text-(length:--display-xl) font-bold uppercase leading-[0.92] tracking-(--display-tracking) text-balance">
              {title}
            </h1>
            <p className="mt-3 text-base font-medium leading-snug text-primary-foreground/95 text-pretty">{titleLine}</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-primary-foreground/90 text-pretty">{sub}</p>
            {pills && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {pills.map((p) => (
                  <li key={p.label} className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-3 py-1.5 text-sm">
                    <span className="text-coral">{p.icon}</span>
                    {p.label}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            {note && <p className="mt-4 text-sm text-primary-foreground/80">{note}</p>}
          </div>
        </div>
        <div id="facts" className="mx-auto mt-6 grid max-w-[960px] scroll-mt-20 gap-3 px-6 pb-8 sm:grid-cols-3 md:mt-8 md:px-0">
          {cards.map((c) => (
            <div key={c.label} className={cn('flex flex-col gap-1 rounded-lg p-4', CARD_TONE[c.tone ?? 'card'])}>
              <p className={cn('flex items-center gap-1.5 text-xs font-medium', (c.tone ?? 'card') === 'card' && 'text-muted-foreground')}>
                {c.icon}
                {c.label}
              </p>
              <p className="font-display text-4xl font-bold leading-none">
                {c.value}
                {c.placeholder && <Placeholder className="ml-2 align-middle" />}
              </p>
              <p className={cn('mt-1 text-sm leading-snug text-pretty', (c.tone ?? 'card') === 'card' && 'text-muted-foreground')}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PANEL_BTN = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-[15px] font-medium leading-none transition-colors'

export function PanelButton({ href, primary, children }: { href: string; primary?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        PANEL_BTN,
        primary
          ? 'bg-coral text-coral-foreground hover:bg-coral-hover'
          : 'border border-primary-foreground/60 bg-transparent text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10',
      )}
    >
      {children}
    </a>
  )
}
