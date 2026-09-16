'use client'

import { Check, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { formatNZD } from '@/lib/course'
import { track } from '@/lib/track'
import { useBasket } from './basket-context'
import { useCourse } from './course-context'
import { Btn, Field, inputClass } from './primitives'

export function BasketBar() {
  const basket = useBasket()
  const { funding } = useCourse()
  if (basket.count === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:px-6 md:pb-4">
      <div className="pointer-events-auto mx-auto flex max-w-[960px] items-center justify-between gap-3 rounded-lg bg-foreground px-4 py-3 text-background shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-background/10">
            <ShoppingBag className="size-5" aria-hidden />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-coral font-display text-xs font-bold text-coral-foreground">
              {basket.count}
            </span>
          </span>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-medium">
              {basket.count} {basket.count === 1 ? 'item' : 'items'} · <span className="text-coral">$0 to pay</span>
            </p>
            <p className="truncate text-xs text-background/70">Living-costs support up to ${funding.livingCostsMax}/wk if eligible</p>
          </div>
        </div>
        <Btn variant="coral" onClick={() => basket.setOpen(true)} className="shrink-0">
          Sign up
        </Btn>
      </div>
    </div>
  )
}

export function CheckoutDrawer() {
  const basket = useBasket()
  const course = useCourse()
  const ref = useRef<HTMLDialogElement>(null)
  const [done, setDone] = useState(false)
  const [first, setFirst] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [domestic, setDomestic] = useState(true)
  const [studylink, setStudylink] = useState(true)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (basket.open && !d.open) {
      d.showModal()
      track('checkout_open', { count: basket.count })
    } else if (!basket.open && d.open) {
      d.close()
    }
  }, [basket.open, basket.count])

  function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) basket.setOpen(false)
  }

  const aiWorth = basket.ai && course.aiPerk ? basket.ai.monthly * course.aiPerk.months : 0
  const microHours = basket.micro.reduce((n, m) => n + m.hours, 0)
  const microCredits = basket.micro.reduce((n, m) => n + m.credits, 0)
  const startsNow = basket.micro.filter((m) => m.startsNow)
  const feeIfNotFree = course.fee.standardAmount ?? course.fee.amount
  const toPay = domestic ? 0 : feeIfNotFree

  return (
    <dialog
      ref={ref}
      onClose={() => basket.setOpen(false)}
      onClick={onBackdrop}
      aria-labelledby="checkout-title"
      className="m-auto w-[calc(100%-24px)] max-w-[520px] rounded-xl bg-background p-0 text-foreground backdrop:bg-foreground/55"
    >
      <div className="relative max-h-[88vh] overflow-y-auto p-6">
        <button
          type="button"
          onClick={() => basket.setOpen(false)}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">Close</span>
        </button>

        {done ? (
          <div className="flex flex-col gap-5">
            <span className="flex size-12 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-6" aria-hidden />
            </span>
            <h2 id="checkout-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
              You&apos;re in, {first || 'friend'}.
            </h2>
            <ul className="flex flex-col gap-3 text-[15px] leading-relaxed">
              {startsNow.length > 0 && (
                <li className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="font-medium">{startsNow.map((m) => m.title).join(', ')}</span> {startsNow.length === 1 ? 'is' : 'are'} open now.
                    Login link is in your inbox.
                  </span>
                </li>
              )}
              {basket.intake && (
                <li className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    Your place for <span className="font-medium">{basket.intake.date}, {basket.intake.mode}</span> is held for 7 days. We text you
                    to finish enrolment. Nothing to pay.
                  </span>
                </li>
              )}
              {basket.ai && (
                <li className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="font-medium">{basket.ai.name}</span> activates on day one.
                  </span>
                </li>
              )}
              {studylink && (
                <li className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    We&apos;ve emailed the StudyLink steps: RealMe, then apply by {course.funding.applyByLabel} for living costs and the $1,000
                    course-related costs.
                  </span>
                </li>
              )}
            </ul>
            <Btn variant="blue" onClick={() => basket.setOpen(false)} className="self-start">
              Back to the course
            </Btn>
          </div>
        ) : (
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              track('checkout_submit', { count: basket.count, domestic, studylink })
              setDone(true)
            }}
          >
            <header className="flex flex-col gap-1">
              <h2 id="checkout-title" className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
                Your basket
              </h2>
              <p className="text-sm text-muted-foreground">Free for domestic students. No card needed.</p>
            </header>

            {basket.count === 0 ? (
              <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                Nothing here yet. Choose a start date, pick your AI, or tick a free pre-start course.
              </p>
            ) : (
              <ul className="hairline divide-y divide-border rounded-lg border border-border text-sm">
                {basket.intake && (
                  <Row
                    title={`${course.discipline} certificate · ${basket.intake.date}`}
                    sub={basket.intake.mode}
                    price={domestic ? 'Free' : formatNZD(feeIfNotFree)}
                    was={domestic ? formatNZD(feeIfNotFree) : undefined}
                    onRemove={() => basket.setIntake(null)}
                  />
                )}
                {basket.ai && (
                  <Row
                    title={`${basket.ai.name}, ${course.aiPerk?.months} months`}
                    sub={`${basket.ai.vendor} · activates day one`}
                    price="Included"
                    was={formatNZD(aiWorth)}
                    onRemove={() => basket.setAi(null)}
                  />
                )}
                {basket.micro.map((m) => (
                  <Row
                    key={m.id}
                    title={m.title}
                    sub={m.taster ? `About ${m.hours} hours · starts now` : `About ${m.hours} hours · ${m.credits} credits cross-credited · starts now`}
                    price="Free"
                    onRemove={() => basket.toggleMicro(m)}
                  />
                ))}
                <li className="flex items-center justify-between gap-4 bg-success px-4 py-3 font-medium text-success-foreground">
                  <span>To pay today</span>
                  <span>{formatNZD(toPay)}</span>
                </li>
              </ul>
            )}

            {microCredits > 0 && (
              <p className="rounded-lg bg-primary-tint px-4 py-3 text-sm text-primary-tint-foreground">
                {microCredits} credits and about {microHours} hours done before day one. That is roughly {Math.round(microHours / 15)}{' '}
                {Math.round(microHours / 15) === 1 ? 'week' : 'weeks'} ahead of your class.
              </p>
            )}

            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">About you</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="First name" id="co-first">
                  <input id="co-first" required autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} className={inputClass} />
                </Field>
                <Field label="Email" id="co-email">
                  <input id="co-email" required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                </Field>
                <Field label="Mobile" id="co-mobile">
                  <input id="co-mobile" required type="tel" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} />
                </Field>
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={domestic} onChange={(e) => setDomestic(e.target.checked)} className="mt-1 size-4 accent-primary" />
                <span>
                  I&apos;m a NZ citizen or resident.{' '}
                  <span className="text-muted-foreground">Needed for the free place. Otherwise the standard fee applies and we&apos;ll talk you through it.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={studylink} onChange={(e) => setStudylink(e.target.checked)} className="mt-1 size-4 accent-primary" />
                <span>
                  Send me the StudyLink steps.{' '}
                  <span className="text-muted-foreground">
                    You may be eligible for a Student Allowance or living-costs loan up to ${course.funding.livingCostsMax} a week, plus $
                    {course.funding.courseRelatedCosts.toLocaleString()} for gear.
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <Btn type="submit" variant="blue" disabled={basket.count === 0} className="w-full">
                Sign up · {formatNZD(toPay)} today
              </Btn>
              <p className="text-xs leading-relaxed text-muted-foreground">
                No card, no contract. Signing up creates your Yoobee login and holds your place for 7 days. We use these details only to talk to you
                about this course.
              </p>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}

function Row({ title, sub, price, was, onRemove }: { title: string; sub: string; price: string; was?: string; onRemove: () => void }) {
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="font-medium leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <p className="font-medium">{price}</p>
        {was && <s className="text-xs text-muted-foreground">{was}</s>}
      </div>
      <button type="button" onClick={onRemove} className="-mr-2 inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
        <Trash2 className="size-4" aria-hidden />
        <span className="sr-only">Remove {title}</span>
      </button>
    </li>
  )
}
