import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { DemoFrame } from '@/components/library/demo-frame'
import { StatusBadge } from '@/components/library/gallery'
import { LearnNote } from '@/components/library/learn-note'
import { ALL_BRAND_FONTS } from '@/lib/personas/fonts'
import { BRANDS, MODULES, PERSONAS, SCHOOL_PAGES, findModule, moduleBrands, modulePersonas, pageLabel } from '@/lib/personas/registry'

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = findModule(slug)
  return { title: m ? `${m.name} | Module library` : 'Module library' }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = findModule(slug)
  if (!m) notFound()

  const usedOn = m.usedOn.map((href) => {
    const base = href.split('?')[0]
    const page = SCHOOL_PAGES.find((p) => p.href === base)
    const label = page ? pageLabel(page) : href
    return { href, label: href.includes('for=dan') ? `${label} (Dan version)` : label }
  })

  return (
    <div className={ALL_BRAND_FONTS}>
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8">
        <header className="flex flex-col gap-3">
          <a href="/modules" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
            &larr; Module library
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{m.job}</p>
            <StatusBadge status={m.status} />
          </div>
          <h1 className="font-display text-4xl font-bold leading-none tracking-tight text-balance">{m.name}</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground text-pretty">{m.blurb}</p>
          <ul className="flex flex-wrap gap-1.5 text-xs">
            {moduleBrands(m).map((b) => (
              <li key={b} className="rounded-sm bg-muted px-2 py-0.5 font-medium">
                {BRANDS[b].name}
              </li>
            ))}
            {modulePersonas(m).map((p) => (
              <li key={p} className="rounded-sm border border-border px-2 py-0.5 text-muted-foreground">
                {PERSONAS[p].name}
              </li>
            ))}
          </ul>
        </header>

        <DemoFrame module={m} />

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { h: 'Who it is for', b: m.whoFor },
            { h: 'What it does', b: m.whatItDoes },
            { h: 'Where it sits on a page', b: m.sits },
          ].map((x) => (
            <section key={x.h} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{x.h}</h2>
              <p className="text-[15px] leading-relaxed text-pretty">{x.b}</p>
            </section>
          ))}
          <LearnNote slug={m.slug} initial={m.learn} />
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Used on these school pages</h2>
          {usedOn.length ? (
            <ul className="flex flex-col gap-2">
              {usedOn.map((u) => (
                <li key={u.href}>
                  <a href={u.href} className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-primary">
                    {u.label} <ArrowRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Not on a school page yet.</p>
          )}
        </section>

        <p className="text-xs text-muted-foreground">All sample content is placeholder. Chat, messaging, booking and maps are working-looking prototypes only.</p>
      </main>
    </div>
  )
}
