'use client'

import Image from 'next/image'
import type { AcademicLead as AcademicLeadData } from '@/lib/course'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function AcademicLeadContent({ a }: { a: AcademicLeadData }) {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="flex gap-4 md:col-span-4 md:flex-col">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-lg md:aspect-[4/5] md:size-auto md:w-full">
          <Image src={a.photo.src} alt={a.photo.alt} fill sizes="(max-width: 768px) 96px, 280px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-display text-xl leading-tight">{a.name}</p>
          <p className="text-sm font-medium text-primary">{a.role}</p>
          <p className="text-sm text-muted-foreground">{a.credentials}</p>
          <p className="mt-1 text-xs text-muted-foreground">{a.years}+ years in practice, supervision and teaching</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:col-span-8">
        <blockquote className="border-l-2 border-coral pl-4">
          <p className="font-display text-xl leading-snug text-balance md:text-2xl">&ldquo;{a.quote}&rdquo;</p>
        </blockquote>
        <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">{a.bio}</p>
      </div>
    </div>
  )
}

export function AcademicLead() {
  const { pg } = usePostgrad()
  const a = pg.academicLead
  if (!a) return null
  return (
    <Module id="academic" eyebrow="Who leads it" title="You are learning from a practitioner" wide>
      <AcademicLeadContent a={a} />
    </Module>
  )
}
