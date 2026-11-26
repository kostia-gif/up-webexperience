import { cn } from '@/lib/utils'

export type PathStep = { label: string; title: string; time: string; detail: string; current?: boolean; href?: string }

/** The steps from first course to final goal on one screen, with time for each. */
export function PathwayPicture({ steps, id, compact }: { steps: PathStep[]; id?: string; compact?: boolean }) {
  return (
    <ol id={id} className={cn('grid scroll-mt-20 md:grid-cols-3', compact ? 'gap-2 md:gap-3' : 'gap-3')}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={cn(
            'relative flex flex-col rounded-xl border',
            compact ? 'gap-1 p-3 md:gap-2 md:p-5' : 'gap-2 p-5',
            s.current ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border bg-card',
          )}
        >
          <p className="flex items-center justify-between text-xs font-medium uppercase tracking-wide opacity-80">
            <span>{s.label}</span>
            <span className="tabular-nums">{s.time}</span>
          </p>
          <p className="font-display text-xl leading-tight">{s.title}</p>
          <p className={cn('text-sm leading-relaxed text-pretty', s.current ? '' : 'text-muted-foreground', compact && 'hidden md:block')}>{s.detail}</p>
          {s.href && (
            <a href={s.href} className="mt-1 text-sm font-medium underline underline-offset-4">
              {s.current ? 'You are here' : 'See this step'}
            </a>
          )}
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-xs md:flex">
              &rarr;
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
