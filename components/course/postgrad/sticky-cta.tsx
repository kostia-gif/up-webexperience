'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { LinkBtn } from '../primitives'
import { usePostgrad } from './context'
import { useStudyFrom } from './study-from'

export function StickyCta() {
  const { course, pg } = usePostgrad()
  const { isIntl } = useStudyFrom()
  const [visible, setVisible] = useState(false)
  const nextIntake = pg.intakes.find((i) => i.left > 0) ?? pg.intakes[0]

  useEffect(() => {
    const hero = document.getElementById('hero-title')?.closest('section')
    const apply = document.getElementById('apply')
    const talk = document.getElementById(isIntl ? 'international' : 'specialist')
    if (!hero) return

    const state = { pastHero: false, onCta: false }
    const update = () => setVisible(state.pastHero && !state.onCta)

    const heroObs = new IntersectionObserver(
      ([e]) => {
        state.pastHero = !e.isIntersecting && e.boundingClientRect.bottom < 0
        update()
      },
      { threshold: 0 },
    )
    heroObs.observe(hero)

    const ctaObs = new IntersectionObserver(
      (entries) => {
        state.onCta = entries.some((e) => e.isIntersecting)
        update()
      },
      { threshold: 0.2 },
    )
    if (apply) ctaObs.observe(apply)
    if (talk) ctaObs.observe(talk)

    return () => {
      heroObs.disconnect()
      ctaObs.disconnect()
    }
  }, [isIntl])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 supports-[backdrop-filter]:bg-background/85',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="hidden min-w-0 flex-col md:flex">
          <p className="truncate text-sm font-medium">{course.title}</p>
          <p className="text-xs text-muted-foreground">
            Next intake {nextIntake.label} · {nextIntake.left} of {nextIntake.capacity} places left · nothing charged before census
          </p>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 md:flex-none">
          <a
            href="#guide"
            onClick={() => track('sticky_cta_click', { cta: 'guide' })}
            className="hidden min-h-11 items-center px-2 text-sm font-medium text-primary underline-offset-4 hover:underline sm:inline-flex"
          >
            Get the guide
          </a>
          <LinkBtn
            href={isIntl ? '#international' : '#specialist'}
            variant="outline"
            size="sm"
            onClick={() => track('sticky_cta_click', { cta: 'talk' })}
          >
            {isIntl ? 'Talk to us' : 'Book a call'}
          </LinkBtn>
          <LinkBtn href="#apply" variant="coral" size="sm" className="flex-1 sm:flex-none" onClick={() => track('sticky_cta_click', { cta: 'apply' })}>
            Apply for {nextIntake.label}
          </LinkBtn>
        </div>
      </div>
    </div>
  )
}
