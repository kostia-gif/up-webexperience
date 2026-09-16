'use client'

import Image from 'next/image'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function AcademicLead() {
  const { pg } = usePostgrad()
  const a = pg.academicLead
  if (!a) return null

  return (
    <Module id="academic" eyebrow="Who leads it" title="You are learning from a practitioner" wide>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src={a.photo.src} alt={a.photo.alt} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
          </div>
          <div className="mt-4 flex flex-col gap-0.5">
            <p className="font-display text-xl leading-tight">{a.name}</p>
            <p className="text-sm font-medium text-primary">{a.role}</p>
            <p className="text-sm text-muted-foreground">{a.credentials}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:col-span-8">
          <blockquote className="border-l-2 border-coral pl-5">
            <p className="font-display text-2xl leading-snug text-balance md:text-3xl">&ldquo;{a.quote}&rdquo;</p>
          </blockquote>
          <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">{a.bio}</p>
          <p className="text-sm font-medium">
            {a.years}+ years in practice, supervision and teaching.
          </p>
        </div>
      </div>
    </Module>
  )
}
