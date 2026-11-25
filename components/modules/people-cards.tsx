'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { BookingSlots, type SlotDay } from './booking-slots'
import { Avatar, Button, Placeholder } from './ui'

export type Person = {
  id: string
  name: string
  role: string
  background: string
  photo?: string
  credits?: string[]
  video?: boolean
  slots?: SlotDay[]
}

/** Tutors or advisors with background, video placeholder and bookable slots. */
export function PeopleCards({
  people,
  bookLabel = 'Book 20 minutes',
  what = 'a 20-minute conversation',
  id,
}: {
  people: Person[]
  bookLabel?: string
  what?: string
  id?: string
}) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div id={id} className="grid scroll-mt-20 gap-4 md:grid-cols-3">
      {people.map((p) => {
        const isOpen = open === p.id
        return (
          <article
            key={p.id}
            className={cn('flex flex-col gap-4 rounded-xl border border-border bg-card p-5', isOpen && 'md:col-span-3 md:flex-row md:gap-8')}
          >
            <div className="flex flex-col gap-4 md:w-72 md:shrink-0">
              <div className="flex items-start gap-4">
                <Avatar name={p.name} photo={p.photo} />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg font-medium leading-snug">
                    {p.name} <Placeholder className="ml-1 align-middle" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-pretty">{p.background}</p>
              {p.credits && (
                <ul className="flex flex-wrap gap-1.5">
                  {p.credits.map((c) => (
                    <li key={c} className="rounded-sm bg-muted px-2 py-0.5 text-xs">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              {p.video && (
                <button
                  type="button"
                  className="flex aspect-video items-center justify-center gap-2 rounded-md bg-muted text-sm text-muted-foreground hover:bg-border"
                  aria-label={`Play a short video from ${p.name} (placeholder)`}
                >
                  <Play className="size-4" aria-hidden /> 60-second intro <Placeholder />
                </button>
              )}
              {p.slots && (
                <Button variant={isOpen ? 'secondary' : 'primary'} onClick={() => setOpen(isOpen ? null : p.id)} className="self-start">
                  {isOpen ? 'Close' : bookLabel}
                </Button>
              )}
            </div>
            {isOpen && p.slots && (
              <div className="flex flex-1 flex-col gap-3 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <p className="text-sm font-medium">Pick a time with {p.name.split(' ')[0]}</p>
                <BookingSlots days={p.slots} what={what} withWho={p.name} />
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
