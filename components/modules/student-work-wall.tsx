'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Pill, Placeholder } from './ui'

export type Work = {
  id: string
  title: string
  student: string
  course: string
  discipline: string
  /** Tailwind background class for the placeholder tile. */
  tone: string
  tall?: boolean
  /** Optional photo; falls back to the tone tile. */
  image?: string
  imageAlt?: string
}

/** Edge-to-edge wall of credited student work, filterable by discipline. Tiles are placeholders until UP supplies work. */
export function StudentWorkWall({
  disciplines,
  works,
  id,
  hero,
  countNoun = 'pieces',
}: {
  disciplines: string[]
  works: Work[]
  id?: string
  hero?: boolean
  countNoun?: string
}) {
  const [d, setD] = useState('All')
  const shown = d === 'All' ? works : works.filter((w) => w.discipline === d)
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-4">
      {disciplines.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-5 sm:px-8" role="group" aria-label="Filter student work by discipline">
          {['All', ...disciplines].map((x) => (
            <Pill key={x} active={x === d} onClick={() => setD(x)}>
              {x}
            </Pill>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {shown.length} {countNoun} <Placeholder className="ml-1" />
          </span>
        </div>
      )}
      <ul className={cn('grid grid-flow-dense gap-1', hero ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4')}>
        {shown.map((w) => (
          <li key={w.id} className={cn('group relative aspect-square overflow-hidden', w.tall && 'row-span-2 aspect-auto')}>
            {w.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={w.image} alt={w.imageAlt ?? ''} className="absolute inset-0 size-full object-cover" />
            ) : (
              <div className={cn('absolute inset-0', w.tone)} aria-hidden />
            )}
            <figure className="absolute inset-0 flex flex-col justify-end p-3 text-primary-foreground">
              <figcaption className="flex flex-col gap-0.5 rounded-md bg-foreground/70 p-2 text-xs backdrop-blur-sm">
                <span className="font-medium leading-snug">{w.title}</span>
                <span className="opacity-80">
                  {w.student} &middot; {w.course}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}
