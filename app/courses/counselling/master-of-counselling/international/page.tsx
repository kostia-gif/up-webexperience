import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PostgradStoryPage } from '@/components/course/course-page'
import { EnglishEvidence, FeeHelpNote, MigrationPolicy, OtherCostsTable, PaymentOptionsList, StudyModes } from '@/components/course/postgrad/intl-detail'
import { courseHref, formatMoney } from '@/lib/course'
import { masterOfCounselling as course } from '@/lib/courses'
import { aipcFonts } from '../fonts'

export const metadata: Metadata = {
  title: 'International students guide | Master of Counselling | AIPC',
  description: 'Fees, other costs, English evidence, study modes, payment options and migration policy for students studying the Master of Counselling from outside Australia.',
}

export default async function InternationalGuidePage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const intl = course.postgrad?.international
  if (!intl) notFound()

  const { from } = await searchParams
  const country = intl.countries.find((c) => c.code === from)
  const money = (n: number) => formatMoney(n, course.brand.currency)
  const back = `${courseHref(course)}${from ? `?from=${from}` : ''}`

  const sections: { id: string; h: string; lede?: string; body: React.ReactNode }[] = [
    {
      id: 'tuition',
      h: 'Tuition',
      lede: `${money(intl.fees.total)} for all fourteen units at the international rate. ${money(intl.fees.perUnit)} a unit; ${intl.fees.majorUnits.map((m) => `${m.code} ${money(m.fee)}`).join(' and ')}. Fixed per unit once you enrol, GST-free, paid a trimester at a time for the units you take. Credit for prior study reduces the total in the same way as for Australian students.`,
      body: <FeeHelpNote />,
    },
    { id: 'costs', h: 'Other costs to plan for', body: <OtherCostsTable intl={intl} /> },
    { id: 'pay', h: 'Ways to pay', body: <PaymentOptionsList intl={intl} /> },
    { id: 'english', h: 'English evidence', lede: country?.englishNote, body: <EnglishEvidence intl={intl} /> },
    { id: 'modes', h: 'Study from home, or move to Australia', body: <StudyModes intl={intl} /> },
    { id: 'migration', h: 'Visa and migration advice', body: <MigrationPolicy intl={intl} /> },
  ]

  return (
    <div className={aipcFonts}>
      <PostgradStoryPage course={course}>
      <main className="mx-auto flex max-w-[860px] flex-col gap-10 px-6 py-10 md:py-14">
        <header className="flex flex-col gap-4">
          <Link href={back} className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary underline-offset-4 hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> Back to the course
          </Link>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">International students guide{country ? ` · ${country.name}` : ''}</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-(--display-tracking) text-balance md:text-5xl">
            Everything about studying the {course.title} from outside Australia
          </h1>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
            {intl.totalStudents} students from {intl.totalCountries} countries have studied this degree with us in the last two years. This page is the
            long version; the course page has the essentials.
          </p>
          <nav aria-label="On this page" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                {s.h}
              </a>
            ))}
          </nav>
        </header>

        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex flex-col gap-4 border-t border-border pt-8">
            <h2 id={`${s.id}-h`} className="font-display text-2xl leading-tight">
              {s.h}
            </h2>
            {s.lede && <p className="text-[15px] leading-relaxed text-pretty">{s.lede}</p>}
            <div className="text-[15px] leading-relaxed">{s.body}</div>
          </section>
        ))}

        <div className="flex flex-col gap-3 rounded-lg border border-border bg-primary-tint p-6 text-primary-tint-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-display text-xl leading-tight">Still have questions?</p>
            <p className="text-sm text-pretty">The international team will go through your documents on a 20-minute call in your time zone.</p>
          </div>
          <Link
            href={`${back}#international`}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Book a call <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </main>
      </PostgradStoryPage>
    </div>
  )
}
