import type { ReactNode } from 'react'
import type { Fact } from '@/components/modules/facts-strip'
import { Placeholder } from '@/components/modules/ui'
import { cn } from '@/lib/utils'

/**
 * The dark billboard hero from the original round: full-bleed image, condensed
 * uppercase headline, one fact strip, then the actions. Same shape for every brand.
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

/** The muted quick-answers bar from the original: five short facts in display type. */
export function QuickAnswers({ pairs }: { pairs: [string, string][] }) {
  return (
    <div className="bg-muted">
      <dl className="mx-auto grid max-w-[960px] grid-cols-2 gap-x-6 gap-y-4 px-6 py-6 sm:grid-cols-5">
        {pairs.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
            <dd className="font-display text-2xl font-bold leading-none">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
