'use client'

import { Eye, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'
import { useCourse } from '../course-context'
import { Btn } from '../primitives'
import { TryIt } from '../try-it'

/**
 * "See it before you decide" as a small floating card instead of a page section.
 * Appears once the reader is past the journey, can be closed, and opens the
 * full TryIt booking flow in a dialog so nothing is lost, only moved.
 */
export function SeeItCard({ afterId = 'journey' }: { afterId?: string }) {
  const course = useCourse()
  const tryIt = (course.tryIt ?? []).filter((m) => m.mode !== 'Talk to someone')
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const target = document.getElementById(afterId)
    if (!target) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) setVisible(true)
      },
      { threshold: 0 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [afterId])

  if (tryIt.length === 0) return null

  const first = tryIt[0]
  const nextSlot = first.slots[0]

  const open = () => {
    track('tryit_open', { from: 'card' })
    dialogRef.current?.showModal()
  }

  return (
    <>
      {visible && !dismissed && (
        <aside
          aria-label="See it before you decide"
          className="fixed bottom-20 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg sm:bottom-24 md:right-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                <Eye className="size-4" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">See it before you decide</p>
                <p className="text-sm font-medium leading-snug">{first.mode}. Free, bring a mate or a parent.</p>
                {nextSlot && (
                  <p className="text-xs text-muted-foreground">
                    Next: {nextSlot.when}
                    {nextSlot.left !== undefined ? ` · ${nextSlot.left} left` : ''}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setDismissed(true)
                track('tryit_dismiss')
              }}
              aria-label="Close"
              className="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <Btn variant="blue" onClick={open} className="flex-1">
              Book a free session
            </Btn>
            <Btn variant="outline" onClick={() => setDismissed(true)}>
              Not now
            </Btn>
          </div>
        </aside>
      )}

      <dialog
        ref={dialogRef}
        aria-label="See it before you decide"
        className="m-auto w-[calc(100%-2rem)] max-w-[760px] rounded-lg border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-foreground/50"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
          <TryIt />
        </div>
      </dialog>
    </>
  )
}
