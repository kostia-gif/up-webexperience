'use client'

import { ChevronDown, ClipboardCheck } from 'lucide-react'
import type { CourseModule } from '@/lib/course'
import { useCourse } from './course-context'
import { Module } from './primitives'

export function CourseStructure() {
  const { structure, formal, funding } = useCourse()
  if (!structure) return null

  const moduleCount = structure.terms.reduce((n, t) => n + t.modules.length, 0)

  return (
    <Module
      id="structure"
      eyebrow="Course structure"
      title={`${moduleCount} modules, ${formal.credits} credits, ${funding.weeks} weeks`}
    >
      <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground text-pretty">{structure.intro}</p>
      <div className="flex flex-col gap-3">
        {structure.terms.map((term, i) => {
          const credits = term.modules.reduce((n, m) => n + m.credits, 0)
          return (
            <details key={term.label} className="group rounded-lg border border-border bg-card" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3">
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-medium">{term.label}</span>
                  <span className="text-xs text-muted-foreground">{term.weeks}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {term.modules.length} {term.modules.length === 1 ? 'module' : 'modules'} · {credits} credits
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                </span>
              </summary>
              <ul className="flex flex-col divide-y divide-border border-t border-border">
                {term.modules.map((m) => (
                  <ModuleOutline key={m.code} m={m} />
                ))}
              </ul>
            </details>
          )
        })}
      </div>
      {structure.note && <p className="mt-5 text-xs leading-relaxed text-muted-foreground text-pretty">{structure.note}</p>}
    </Module>
  )
}

function ModuleOutline({ m }: { m: CourseModule }) {
  return (
    <li>
      <details className="group/mod">
        <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-4 py-3">
          <span className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              <span className="text-muted-foreground">{m.code}</span> {m.title}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">{m.summary}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3 pt-0.5">
            <span className="text-xs text-muted-foreground">
              {m.credits} cr{m.hours ? ` · ${m.hours} h` : ''}
            </span>
            <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/mod:rotate-180" aria-hidden />
          </span>
        </summary>
        <div className="grid gap-5 px-4 pb-5 pt-1 sm:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">You will learn</h4>
            <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
              {m.learn.map((l) => (
                <li key={l} className="flex gap-2">
                  <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <ClipboardCheck className="size-3.5" aria-hidden /> How it is assessed
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{m.assessment}</p>
            {m.compulsory && <p className="text-xs text-muted-foreground">Compulsory module</p>}
          </div>
        </div>
      </details>
    </li>
  )
}
