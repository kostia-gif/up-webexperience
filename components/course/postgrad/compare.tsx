'use client'

import { Check } from 'lucide-react'
import { Module } from '../primitives'
import { usePostgrad } from './context'

export function HowWeCompare() {
  const { course, pg } = usePostgrad()

  return (
    <Module id="why" eyebrow="Why AIPC, not a university" title="Specialist, flexible, and around a third less" wide>
      <p className="-mt-2 mb-6 max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        The qualification is the same level and carries the same industry accreditation. What differs is who can get in, what it costs, and
        how it fits around a working life.
      </p>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">How the AIPC Master of Counselling compares with a typical university program</caption>
          <thead>
            <tr className="bg-muted text-left">
              <th scope="col" className="w-[28%] px-4 py-3 font-medium text-muted-foreground">
                &nbsp;
              </th>
              <th scope="col" className="bg-primary-tint px-4 py-3 font-medium text-primary-tint-foreground">
                {course.brand.name}
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">
                Typical university
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pg.comparison.map((row) => (
              <tr key={row.label} className="align-top">
                <th scope="row" className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {row.label}
                </th>
                <td className="bg-primary-tint/50 px-4 py-3 font-medium leading-relaxed">
                  <span className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {row.us}
                  </span>
                </td>
                <td className="px-4 py-3 leading-relaxed text-muted-foreground">{row.uni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{pg.comparisonNote}</p>

      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <h3 className="text-base font-medium">What we are not</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-muted-foreground">
          We are a specialist institute, not a university. There is no campus life, no sports centre and no other faculties to wander into.
          What you get instead is an institution that has taught nothing but counselling since {pg.provider.since}, lecturers who are practising
          counsellors, and a placement team whose only job is to find you a seat in a real agency.
        </p>
      </div>
    </Module>
  )
}
