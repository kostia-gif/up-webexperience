'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFloating } from '@/lib/floating-store'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from '../course-context'
import { LinkBtn } from '../primitives'

/** Mobile-first sticky bar that appears once the hero and date picker scroll away. */
export function StartBar({ coordinateCard = false }: { coordinateCard?: boolean } = {}) {
  const { quick } = useCourse()
  const { cardVisible } = useFloating()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const target = document.getElementById('start')
    if (!target) return
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [])

  if (!show) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
        // On mobile, yield to the SeeItCard while it is showing; on desktop both fit.
        coordinateCard && cardVisible && 'hidden md:block',
      )}
    >
      <div className="mx-auto flex max-w-[960px] items-center gap-3 px-4 py-3">
        <p className="hidden flex-1 text-sm sm:block">
          Next class <span className="font-medium">{quick.nextStart}</span> · {quick.length}
        </p>
        <LinkBtn href="#start" variant="coral" className="flex-1 sm:flex-none" onClick={() => track('sticky_cta_click', { cta: 'start' })}>
          Start {quick.nextStart}
        </LinkBtn>
        <LinkBtn href="#talk" variant="outline" className="flex-1 sm:flex-none" onClick={() => track('sticky_cta_click', { cta: 'talk' })}>
          <MessageCircle className="size-4" aria-hidden /> Talk
        </LinkBtn>
      </div>
    </div>
  )
}
