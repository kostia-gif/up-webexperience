import { ArrowRight } from 'lucide-react'
import { courseHref, isFree } from '@/lib/course'
import { courses } from '@/lib/courses'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[720px] flex-col justify-center gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Course page prototypes</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">
          Same principles, four schools
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
          One page structure: the promise, quick answers, what it is like, a journey through the course, am I in, start dates, a way to
          try or talk, a career coach, then the formal bit. Each school brings its own brand and data. Yoobee swaps the kit for an AI
          subscription and micro-credentials you can start tonight. AIPC, a postgraduate degree in Australia, drops the gimmicks for
          accreditation, a university comparison, a levelling-up progression, FEE-HELP, structured eligibility with credit, and a course
          specialist you can book.
        </p>
      </header>
      <ul className="flex flex-col gap-3">
        {courses.map((c) => (
          <li key={c.id}>
            <a
              href={courseHref(c)}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 hover:border-foreground"
            >
              <span className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {c.brand.legalName} · {c.discipline}
                </span>
                <span className="text-lg font-medium leading-snug">{c.title}</span>
                <span className="text-sm text-muted-foreground">
                  {c.postgrad ? c.quick.length : `${c.funding.weeks} weeks`} · {c.delivery === 'online' ? 'Online' : `${c.formal.campuses.length} campuses`} ·{' '}
                  {isFree(c) ? 'Free' : c.hero.h1}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden />
            </a>
          </li>
        ))}
      </ul>

      <section aria-labelledby="intl" className="flex flex-col gap-3 border-t border-border pt-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Audience variant</p>
          <h2 id="intl" className="text-lg font-medium leading-snug">
            Yoobee, international edition
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Picks up the visitor&apos;s country from the Vercel geo header and leads with place, facilities and people in a more
            conservative, institutional register. In preview, simulate a country with the links below.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {(
            [
              ['CN', 'China'],
              ['IN', 'India'],
              ['VN', 'Vietnam'],
              ['KR', 'Korea'],
              ['OTHER', 'Elsewhere'],
            ] as const
          ).map(([code, name]) => (
            <li key={code}>
              <a
                href={`/international/yoobee?from=${code}`}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm hover:border-foreground"
              >
                {name} <ArrowRight className="size-4" aria-hidden />
              </a>
            </li>
          ))}
          <li>
            <a
              href="/courses/design/creative-media-certificate?from=CN"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-dashed border-border px-4 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              Domestic page as seen from China (geo banner)
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="opportunity" className="flex flex-col gap-5 border-t border-border pt-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">The opportunity</p>
          <h2 id="opportunity" className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-balance">
            One web experience that lifts every school
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
            Today each brand runs its own site, its own patterns and its own tooling, so quality is uneven and hard-won research
            rarely travels between schools. These prototypes test a shared, best-practice structure that any brand can adopt, then
            tailor. The goal is to raise the standard once and let all four schools benefit.
          </p>
        </div>

        <ol className="flex flex-col gap-3">
          {[
            {
              t: 'Set the standard for the group',
              d: 'Establish a best-practice web experience that raises the tide for every school, not just one.',
            },
            {
              t: 'Structure content and tooling for GEO',
              d: 'Optimise for generative engine discovery with clearer decisioning, social proof and outcomes.',
            },
            {
              t: 'Drive more qualified leads',
              d: 'Ground the journey in better research so the enquiries we generate are the right ones.',
            },
            {
              t: 'Apply e-commerce best practice',
              d: 'Use proven commerce patterns to lift engagement and move more people from interest to enrolment.',
            },
            {
              t: 'Personalise to each audience',
              d: 'Adapt the experience for international students, parents, career-changers and talk-to-a-student moments.',
            },
            {
              t: 'Open new early engagement pathways',
              d: 'Introduce course events, video calls and other low-commitment ways to connect before applying.',
            },
          ].map((o, i) => (
            <li key={o.t} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground tabular-nums">
                {i + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[15px] font-medium leading-snug">{o.t}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{o.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          <span className="font-medium text-foreground">Beyond the screen:</span> the same thinking should extend to the physical product,
          from a considered unboxing when a welcome kit arrives to the first days on campus, so the experience feels joined up end to end.
        </p>
      </section>
    </main>
  )
}
