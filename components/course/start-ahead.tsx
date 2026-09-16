'use client'

import { ArrowRight, Check, Zap } from 'lucide-react'
import type { MicroCredential } from '@/lib/course'
import { cn } from '@/lib/utils'
import { useBasket } from './basket-context'
import { useCourse } from './course-context'
import { Btn } from './primitives'

export function MicroTick({ m, className }: { m: MicroCredential; className?: string }) {
  const basket = useBasket()
  const added = basket.hasMicro(m.id)
  return (
    <button
      type="button"
      aria-pressed={added}
      onClick={() => basket.toggleMicro(m)}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        added ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background text-foreground hover:border-foreground',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border',
          added ? 'border-primary-foreground bg-primary-foreground text-primary' : 'border-current',
        )}
        aria-hidden
      >
        {added && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      {added ? 'Added' : 'Add'}
    </button>
  )
}

// Consolidated readiness-kit chooser shown under the chosen intake date:
// (a) pick free pre-start courses for credit, and (b) unlock the free Pro AI.
export function PreStartInline() {
  const { microCredentials, aiPerk } = useCourse()
  const basket = useBasket()
  const hasMicro = !!microCredentials?.length
  if ((!hasMicro && !aiPerk) || !basket.intake) return null

  const credits = basket.micro.reduce((n, m) => n + m.credits, 0)
  const maxCredits = (microCredentials ?? []).reduce((n, m) => n + m.credits, 0)
  const somethingChosen = credits > 0 || !!basket.ai || basket.micro.length > 0

  return (
    <div className="mt-4 flex flex-col gap-5 rounded-lg border-2 border-primary bg-primary-tint p-4 text-primary-tint-foreground md:p-5">
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 font-display text-2xl font-bold leading-none text-balance">
          <Zap className="size-5 shrink-0 text-coral" aria-hidden />
          Set up your readiness kit for {basket.intake.date}
        </p>
        <p className="text-sm leading-relaxed">
          Both are free and switch on the minute you sign up. Change either any time before day one.
        </p>
      </div>

      {hasMicro && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">
            a) Choose up to {microCredentials!.length} free pre-start courses
            {credits > 0 && <span className="text-primary"> · {credits} of {maxCredits} credits</span>}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {microCredentials!.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 rounded-lg bg-background p-3">
                <div className="flex min-w-0 flex-col">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground">
                    About {m.hours} hours · {m.taster ? 'taster, no commitment' : `${m.credits} credits`}
                  </p>
                </div>
                <MicroTick m={m} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {aiPerk && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">b) Unlock your free Pro AI for the whole course</p>
          <fieldset className="grid gap-2 sm:grid-cols-3">
            <legend className="sr-only">Choose your AI Pro subscription</legend>
            {aiPerk.options.map((o) => {
              const selected = basket.ai?.id === o.id
              return (
                <label
                  key={o.id}
                  className={cn(
                    'flex cursor-pointer flex-col gap-1 rounded-lg border-2 bg-background p-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary',
                    selected ? 'border-primary' : 'border-transparent hover:border-input',
                  )}
                >
                  <input
                    type="radio"
                    name="ai-inline"
                    value={o.id}
                    checked={selected}
                    onChange={() => basket.setAi(selected ? null : o)}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-bold leading-none">{o.name}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full border',
                        selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
                      )}
                    >
                      {selected && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {o.vendor} · <s>${o.monthly}/mo</s> <span className="font-medium text-primary">free</span>
                  </span>
                </label>
              )
            })}
          </fieldset>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 pt-4">
        <p className="text-sm">
          {somethingChosen ? 'Nice. This is all set up for day one.' : 'Pick what you want, or skip it and decide later.'}
        </p>
        <Btn variant="blue" onClick={() => basket.setOpen(true)}>
          Sign up ({basket.count}) <ArrowRight className="size-4" aria-hidden />
        </Btn>
      </div>
    </div>
  )
}
