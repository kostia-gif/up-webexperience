'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { track } from '@/lib/track'
import { useCourse } from './course-context'
import { Btn, Field, inputClass, LinkBtn, Module } from './primitives'

type Result = 'yes' | 'no' | null

function ageOptions(minAge: number) {
  const tooYoung = `${minAge - 1} or under`
  const bands = minAge >= 18 ? [`${minAge} to 20`] : [`${minAge}`, `${minAge + 1} to 20`]
  return { tooYoung, options: [tooYoung, ...bands, '21 to 24', '25 or over'] }
}

export function Eligibility() {
  const [age, setAge] = useState('')
  const [background, setBackground] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result>(null)
  const course = useCourse()
  const { entry } = course
  const ages = ageOptions(entry.minAge)

  function check() {
    if (!age || !background) {
      setError('Answer both first')
      setResult(null)
      return
    }
    setError('')
    const oldEnough = age !== ages.tooYoung
    const hasBackground = background !== 'None of these yet'
    const r: Result = oldEnough && hasBackground ? 'yes' : 'no'
    setResult(r)
    track('eligibility_check', { result: r })
  }

  return (
    <Module id="eligibility" eyebrow="Am I in?" title="Two questions">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={`How old will you be on ${course.quick.nextStart}?`} id="age">
          <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass}>
            <option value="">Choose one</option>
            {ages.options.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <Field label="Which of these is true for you?" id="background">
          <select id="background" value={background} onChange={(e) => setBackground(e.target.value)} className={inputClass}>
            <option value="">Choose one</option>
            {entry.backgrounds.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Btn variant="blue" onClick={check}>
          Check
        </Btn>
        {error && (
          <p className="text-[13px] text-warning-foreground" role="alert">
            {error}
          </p>
        )}
      </div>

      <div role="status" aria-live="polite" className="mt-4">
        {result === 'yes' && (
          <div className="flex flex-col gap-3 rounded-lg border border-success-border bg-success p-5 text-success-foreground">
            <p className="font-display text-3xl font-bold uppercase leading-none">You&apos;re in.</p>
            <p className="text-[15px]">You meet the entry criteria for this course. Entry is confirmed when you enrol.</p>
            <LinkBtn href="#intakes" variant="blue" className="self-start">
              Choose a start date <ArrowRight className="size-4" aria-hidden />
            </LinkBtn>
          </div>
        )}
        {result === 'no' && (
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary-tint p-5 text-primary-tint-foreground">
            <p className="font-display text-3xl font-bold uppercase leading-none">Not this one yet. There&apos;s a way in.</p>
            <p className="text-[15px]">
              {entry.fallback.note ??
                `${entry.fallback.label} is the way in, ${entry.fallback.weeks} weeks. Finish it and you step straight into Level 4.`}
            </p>
            <a href={entry.fallback.href} className="self-start text-[15px] font-medium text-primary underline underline-offset-4">
              See {entry.fallback.label}
            </a>
          </div>
        )}
      </div>
    </Module>
  )
}
