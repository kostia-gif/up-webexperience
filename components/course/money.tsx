'use client'

import { Check, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { courseHref, formatNZD, isFree } from '@/lib/course'
import { track } from '@/lib/track'
import { useCourse } from './course-context'
import { Btn, inputClass } from './primitives'

export function MoneyContent({ standalone = false }: { standalone?: boolean }) {
  const course = useCourse()
  const { fee, funding, brand } = course
  const free = isFree(course)
  const [weekly, setWeekly] = useState(250)
  const total = fee.amount + funding.courseRelatedCosts + weekly * funding.weeks
  const pct = (weekly / funding.livingCostsMax) * 100
  const title = free ? 'Free to study, with help to live on' : 'Paying with a student loan'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        {standalone ? (
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">{title}</h1>
        ) : (
          <h2 id="money-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
            {title}
          </h2>
        )}
        <p className="text-sm text-muted-foreground">
          {free ? fee.freeNote ?? 'This course is free for domestic students.' : 'Fees Free ended in 2026.'}
        </p>
      </div>

      {funding.loanApproved && (
        <p className="flex items-center gap-2 text-sm text-success-foreground">
          <Check className="size-4 shrink-0" aria-hidden />
          {free
            ? 'The course is free. If you are eligible, StudyLink living costs and course-related costs are paid to you, not to us.'
            : 'This course is approved for StudyLink loans.'}
        </p>
      )}

      <dl className="hairline divide-y divide-border rounded-lg border border-border text-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="text-muted-foreground">Course fee, {fee.year}</dt>
          <dd className="font-medium">
            {free && fee.standardAmount ? (
              <>
                <s className="mr-2 text-muted-foreground">{formatNZD(fee.standardAmount)}</s>$0
              </>
            ) : (
              formatNZD(fee.amount)
            )}
          </dd>
        </div>
        {free ? (
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="text-muted-foreground">Course-related costs, paid to you once</dt>
            <dd className="font-medium">up to {formatNZD(funding.courseRelatedCosts)}</dd>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="text-muted-foreground">Paid direct to {brand.name} by StudyLink</dt>
            <dd className="font-medium">{formatNZD(fee.amount)}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 bg-success px-4 py-3 text-success-foreground">
          <dt>To pay before day one</dt>
          <dd className="font-medium">$0</dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="living" className="text-sm font-medium">
            Living costs you borrow each week
          </label>
          <output htmlFor="living" className="text-sm font-medium tabular-nums">
            ${weekly}
          </output>
        </div>
        <input
          id="living"
          type="range"
          min={0}
          max={funding.livingCostsMax}
          step={1}
          value={weekly}
          onChange={(e) => setWeekly(Number(e.target.value))}
          onPointerUp={() => track('money_slider_change', { weekly })}
          className="range-blue"
          style={{ ['--pct' as string]: `${pct}%` }}
          aria-valuetext={`${weekly} dollars a week`}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>Up to ${funding.livingCostsMax}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">Into your account weekly</p>
          <p className="mt-1 font-display text-3xl font-bold leading-none tabular-nums">{formatNZD(weekly)}</p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">Total you&apos;d owe</p>
          <p className="mt-1 font-display text-3xl font-bold leading-none tabular-nums">{formatNZD(Math.round(total / 10) * 10)}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {free
          ? `Total is up to ${formatNZD(funding.courseRelatedCosts)} course-related costs plus living costs over ${funding.weeks} weeks, paid into your account if you are eligible. The course itself adds nothing. If you qualify for the Student Allowance, the weekly amount is not a loan. StudyLink decides what you get. This is information, not financial advice.`
          : `Total is the fee plus up to ${formatNZD(funding.courseRelatedCosts)} course-related costs plus living costs over ${funding.weeks} weeks. If you qualify for the Student Allowance instead, the weekly amount is not a loan. StudyLink decides what you get. This is information, not financial advice.`}
      </p>

      <ol className="flex flex-col gap-3 text-sm">
        {[
          ['Get a RealMe login', 'Ten minutes online.'],
          [`Apply by ${funding.applyByLabel}`, `At studylink.govt.nz. Pick this course${free ? ' and tick living costs and course-related costs' : ' and campus'}.`],
          ['Finish enrolling with us', 'We send StudyLink your confirmation.'],
          ['We confirm', 'About 6 weeks before start, then about 2 weeks for fees to land.'],
        ].map(([t, s], i) => (
          <li key={t} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{t}</p>
              <p className="text-muted-foreground">{s}</p>
            </div>
          </li>
        ))}
      </ol>

      <EmailMe />
    </div>
  )
}

function EmailMe() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  if (sent) {
    return (
      <p role="status" className="rounded-lg bg-success px-4 py-3 text-sm text-success-foreground">
        Sent. Check your inbox for the breakdown and the StudyLink link.
      </p>
    )
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault()
        track('money_email_request')
        setSent(true)
      }}
    >
      <label htmlFor="money-email" className="sr-only">
        Email address
      </label>
      <input
        id="money-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={inputClass}
      />
      <Btn type="submit" variant="blue" className="shrink-0">
        Email me this
      </Btn>
      <a
        href="https://www.studylink.govt.nz"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md px-3 text-[15px] font-medium text-primary hover:bg-primary-tint"
      >
        See if I qualify
      </a>
    </form>
  )
}

export function MoneyPanel({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean
  onClose: () => void
  returnFocusTo: HTMLElement | null
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const course = useCourse()

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      track('money_panel_open')
    } else if (!open && d.open) {
      d.close()
      returnFocusTo?.focus()
    }
  }, [open, returnFocusTo])

  function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdrop}
      aria-labelledby="money-title"
      className="m-auto w-[calc(100%-32px)] max-w-[460px] rounded-xl bg-background p-0 text-foreground backdrop:bg-foreground/55"
    >
      <div className="relative max-h-[85vh] overflow-y-auto p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">Close</span>
        </button>
        <MoneyContent />
        <p className="mt-6 text-xs text-muted-foreground">
          Also at{' '}
          <a href={`${courseHref(course)}/money`} className="text-primary underline underline-offset-4">
            /money
          </a>
        </p>
      </div>
    </dialog>
  )
}
