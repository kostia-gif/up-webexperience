'use client'

import Image from 'next/image'
import { Play, ShieldCheck } from 'lucide-react'
import { coursePromise } from '@/lib/course'
import { useCourse } from './course-context'
import { Module } from './primitives'

export function PromiseLine() {
  const course = useCourse()
  return (
    <div className="bg-success text-success-foreground">
      <p className="mx-auto flex max-w-[960px] flex-wrap items-center gap-x-3 gap-y-1 px-6 py-4 text-[15px]">
        <ShieldCheck className="size-5 shrink-0" aria-hidden />
        <span className="font-medium">{coursePromise(course)}</span>
        <a href={course.formal.links.refund} className="underline underline-offset-4 hover:no-underline">
          Refund policy
        </a>
      </p>
    </div>
  )
}

export function QuickAnswers() {
  const q = useCourse().quick
  const pairs: [string, string][] = [
    ['Next start', q.nextStart],
    ['How long', q.length],
    ['Where', q.where],
    ['You need', q.need],
    ['You get', q.get],
  ]
  return (
    <div className="bg-muted">
      <dl className="mx-auto grid max-w-[960px] grid-cols-2 gap-x-6 gap-y-4 px-6 py-6 sm:grid-cols-5">
        {pairs.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
            <dd className="font-display text-2xl font-bold leading-none">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const NAV: [string, string][] = [
  ['#like', "What it's like"],
  ['#journey', 'Your journey'],
  ['#eligibility', 'Am I in'],
  ['#intakes', 'Start dates'],
  ['#tryit', 'Try it'],
  ['#coach', 'Ask a coach'],
  ['#formal', 'Details'],
]

export function InPageNav({ items = NAV }: { items?: [string, string][] }) {
  return (
    <nav aria-label="On this page" className="hairline-t hairline-b border-border bg-background md:sticky md:top-0 md:z-30">
      <ul className="scrollbar-none mx-auto flex max-w-[960px] gap-1 overflow-x-auto px-4 py-2">
        {items.map(([href, label]) => (
          <li key={href} className="shrink-0">
            <a
              href={href}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function WhatItsLike() {
  const { like, copy } = useCourse()
  return (
    <Module id="like" eyebrow="What it's actually like" title={copy.likeTitle}>
      <figure className="flex flex-col gap-3">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-foreground">
          <Image src={like.videoPoster} alt="" fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover opacity-90" />
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-foreground"
            aria-label={copy.likeVideoLabel}
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-coral text-coral-foreground">
              <Play className="size-7 fill-current" aria-hidden />
            </span>
          </button>
          <span className="absolute bottom-3 left-3 rounded-sm bg-background/90 px-2 py-1 text-xs font-medium">CC · 1:14</span>
        </div>
        <figcaption className="text-sm text-muted-foreground">{like.videoCaption}</figcaption>
      </figure>
      <p className="mt-6 text-[15px] leading-relaxed text-pretty">{like.text}</p>
    </Module>
  )
}
