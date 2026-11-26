import { ArrowRight, Archive, Blocks, BookMarked } from 'lucide-react'
import { BRANDS, MODULES, PERSONAS, SCHOOL_PAGES, pageLabel } from '@/lib/personas/registry'

const OPTION_A_REFERENCE = [
  { label: 'AIPC, Master of Counselling, Option A (previous round)', href: '/courses/counselling/master-of-counselling/a' },
  { label: 'Yoobee, Creative Media, Option A (previous round)', href: '/courses/design/creative-media-certificate/a' },
]

const PARKED = [
  { label: 'NZMA, Certificate in Cookery (Level 4), Options A, B and C', hrefs: ['/courses/cookery/certificate-in-cookery-level-4/a', '/courses/cookery/certificate-in-cookery-level-4/b', '/courses/cookery/certificate-in-cookery-level-4'] },
  { label: 'NZMA, Cookery, emotional-buyer "start" sketch', hrefs: ['/courses/cookery/certificate-in-cookery-level-4/start'] },
  { label: 'Elite, Certificate in Beauty Therapy (Level 4), Options A, B and C', hrefs: ['/courses/beauty/certificate-in-beauty-therapy-level-4/a', '/courses/beauty/certificate-in-beauty-therapy-level-4/b', '/courses/beauty/certificate-in-beauty-therapy-level-4'] },
  { label: 'AIPC, Master of Counselling, Options B and C, and the international edition', hrefs: ['/courses/counselling/master-of-counselling/b', '/courses/counselling/master-of-counselling', '/courses/counselling/master-of-counselling/international'] },
  { label: 'Yoobee, Creative Media, Options B and C', hrefs: ['/courses/design/creative-media-certificate/b', '/courses/design/creative-media-certificate'] },
  { label: 'Yoobee, Diploma in Animation, for Meta Kids (parked while we focus on Plan B)', hrefs: ['/yoobee/diploma-in-animation'] },
  { label: 'NZST, Level 4 Flight Attending, for Riding the Tailwinds (parked; replaced by the Level 5 Diploma on the Yoobee template)', hrefs: ['/nzst/flight-attending-parked'] },
  { label: 'Yoobee, international edition (simulated country)', hrefs: ['/international/yoobee?from=CN', '/international/yoobee?from=IN', '/international/yoobee?from=OTHER'] },
]

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">UP web experience prototype, reviewer index</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">Three brands, six personas, one module set</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
          Updated 26 November 2026 to match the personas brief. Each school page is designed for one lead persona and one second persona, with a
          single main action and a single second action. Every module is built once and reused across the pages and the library. The previous
          Option A pages are kept for reference only; everything else from the earlier round is parked, not deleted.
        </p>
      </header>

      <section aria-labelledby="schools" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <BookMarked className="size-4 text-muted-foreground" aria-hidden />
          <h2 id="schools" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            School pages
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {SCHOOL_PAGES.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-foreground">
                <span className="flex items-start justify-between gap-4">
                  <span className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{BRANDS[p.brand].legalName}</span>
                    <span className="text-lg font-medium leading-snug text-balance">{pageLabel(p)}</span>
                  </span>
                  <ArrowRight className="mt-1 size-5 shrink-0" aria-hidden />
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {p.personas.map((k) => (
                    <span key={k} className="rounded-sm bg-muted px-2 py-0.5 text-xs">
                      {PERSONAS[k].role === 'lead' ? 'Lead' : 'Second'}: {PERSONAS[k].name} ({PERSONAS[k].evidence.toLowerCase()})
                    </span>
                  ))}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground text-pretty">Testing: {p.testing}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="library" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Blocks className="size-4 text-muted-foreground" aria-hidden />
          <h2 id="library" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Module library
          </h2>
        </div>
        <a href="/modules" className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:border-foreground">
          <span className="flex flex-col gap-1">
            <span className="text-lg font-medium leading-snug">{MODULES.length} modules, tagged by brand, persona, job and status</span>
            <span className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Live demos with a brand switcher and a phone or desktop toggle. Same components as the school pages.
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0" aria-hidden />
        </a>
      </section>

      <section aria-labelledby="reference" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Archive className="size-4 text-muted-foreground" aria-hidden />
          <h2 id="reference" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Option A, for reference only
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          The action-first pages from the previous round, kept so the new persona-led pages can be compared against them. Not being developed further.
        </p>
        <ul className="flex flex-col gap-2">
          {OPTION_A_REFERENCE.map((r) => (
            <li key={r.href}>
              <a href={r.href} className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-border px-5 py-3 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
                {r.label} <ArrowRight className="size-4 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="parked" className="flex flex-col gap-4 border-t border-border pt-8">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
            <Archive className="size-4 text-muted-foreground" aria-hidden />
            <h2 id="parked" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Parked
            </h2>
            <span className="ml-auto text-xs text-muted-foreground group-open:hidden">Show</span>
            <span className="ml-auto hidden text-xs text-muted-foreground group-open:inline">Hide</span>
          </summary>
          <p className="pt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            Pages from the earlier round that are not being developed. Nothing has been deleted.
          </p>
          <ul className="flex flex-col gap-2 pt-3 text-sm">
            {PARKED.map((p) => (
              <li key={p.label} className="flex flex-col gap-1 rounded-lg bg-muted px-4 py-3">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="flex flex-wrap gap-x-3 gap-y-1">
                  {p.hrefs.map((h, i) => (
                    <a key={h} href={h} className="underline underline-offset-4 hover:text-primary">
                      {p.hrefs.length > 1 ? `Link ${i + 1}` : 'Open'}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
        Illustrative prototype. Every outcome figure, salary, graduate story, tutor profile and employer or airline name is a placeholder until UP
        supplies real ones. No unsourced claims. Chat, WhatsApp, booking and enrolment are working-looking prototypes only.
      </p>
    </main>
  )
}
