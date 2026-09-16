'use client'

import Image from 'next/image'
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react'
import { formatNZD } from '@/lib/course'
import { useCourse } from './course-context'

export function ReadinessKit() {
  const { microCredentials, aiPerk, copy } = useCourse()
  if (!microCredentials?.length && !aiPerk) return null

  const maxCredits = (microCredentials ?? []).reduce((n, m) => n + m.credits, 0)
  const aiWorth = aiPerk ? Math.max(...aiPerk.options.map((o) => o.monthly)) * aiPerk.months : 0

  return (
    <div id="readiness" className="mx-auto mt-6 max-w-[1200px] scroll-mt-20 bg-foreground text-background md:mt-8 md:px-6">
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-center">
        <div className="relative aspect-[4/3] md:col-span-7 md:col-start-1 md:row-start-1 md:aspect-auto md:min-h-[480px]">
          <Image
            src="/images/yoobee/mc-taster.png"
            alt="A student starting a pre-start course from their couch on a laptop"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
          <span className="absolute left-6 top-6 inline-flex items-center rounded-full bg-coral px-3 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-coral-foreground">
            Yours from day one
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-5 px-6 py-10 md:col-span-6 md:col-start-7 md:row-start-1 md:-ml-16 md:bg-foreground md:px-10 md:py-12">
          <p className="text-xs font-medium uppercase tracking-wide text-background/70">{copy.kitStep}</p>
          <h3 className="font-display text-(length:--display-xl) font-bold uppercase leading-[0.9] tracking-(--display-tracking) text-balance">
            {copy.kitTitle}
          </h3>
          <p className="max-w-md text-lg leading-relaxed text-pretty text-background/85">
            Sign up and your kit switches on straight away, months before class. No gear to buy, nothing to wait for.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-coral text-coral-foreground">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-xl font-bold leading-none">Start studying tonight</p>
                <p className="text-sm leading-relaxed text-background/80">
                  Up to {maxCredits} credits from free pre-start courses, cross-credited so you walk in ahead of your class.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-coral text-coral-foreground">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-xl font-bold leading-none">Pro AI licence, live from day one</p>
                <p className="text-sm leading-relaxed text-background/80">
                  Your pick of Claude, ChatGPT or Gemini Pro, free for the whole course.
                </p>
              </div>
            </li>
          </ul>
          <div className="flex flex-col gap-3 border-t border-background/20 pt-4">
            <p className="text-sm text-background/70">
              A Pro subscription alone is worth about {formatNZD(aiWorth)}. Both included, set them up when you pick a date.
            </p>
            <a
              href="#intakes"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
            >
              Set up your kit <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
