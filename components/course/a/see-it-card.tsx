'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'
import { useCourse } from '../course-context'
import { Btn } from '../primitives'
import { TryIt } from '../try-it'

/**
 * "See it before you decide" as a small, inviting floating card, not a page
 * section. A photo, a warm line and the next session, sliding in once the
 * reader is past the journey. It opens the full TryIt booking flow in a
 * dialog, and the same module also lives inline further down the page.
 */
export function SeeItCard({ afterId = 'journey' }: { afterId?: string }) {
  const course = useCourse()
  const tryIt = (course.tryIt ?? []).filter((m) => m.mode !== 'Talk to someone')
  const [visible, setVisible] = useState(false)
  const [shown, setShown] = useState(false)
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

  useEffect(() => {
    if (!visible || dismissed) return
    const t = setTimeout(() => setShown(true), 20)
    return () => clearTimeout(t)
  }, [visible, dismissed])

  if (tryIt.length === 0) return null

  const first = tryIt[0]
  const nextSlot = first.slots[0]

  const open = () => {
    track('tryit_open', { from: 'card' })
    dialogRef.current?.showModal()
  }

  const dismiss = () => {
    setDismissed(true)
    track('tryit_dismiss')
  }

  return (
    <>
      {visible && !dismissed && (
        <aside
          aria-label="See it before you decide"
          className={`fixed bottom-20 right-4 z-40 w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-xl transition-all duration-300 ease-out sm:bottom-24 md:right-6 ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <div className="relative">
            <Image
              src={course.hero.image}
              alt=""
              width={400}
              height={160}
              className="h-28 w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <p className="absolute bottom-2 left-3 text-xs font-medium uppercase tracking-wide text-background">
              Free visit · no obligation
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-foreground/50 text-background backdrop-blur hover:bg-foreground/70"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium leading-snug text-pretty">{first.mode}</p>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground text-pretty">{first.blurb}</p>
            </div>
            {nextSlot && (
              <p className="text-sm">
                <span className="font-medium">Next:</span> {nextSlot.when}
                {nextSlot.left !== undefined ? <span className="text-muted-foreground"> · {nextSlot.left} spots left</span> : ''}
              </p>
            )}
            <div className="mt-1 flex gap-2">
              <Btn variant="blue" onClick={open} className="flex-1">
                Book a free visit
              </Btn>
              <Btn variant="outline" onClick={dismiss}>
                Not now
              </Btn>
            </div>
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
          <TryIt idBase="tryit-visit" />
        </div>
      </dialog>
    </>
  )
}
