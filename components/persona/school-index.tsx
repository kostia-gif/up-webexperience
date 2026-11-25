import { ArrowRight } from 'lucide-react'
import { BRAND_FONTS } from '@/lib/personas/fonts'
import { BRANDS, PERSONAS, SCHOOL_PAGES, type BrandKey } from '@/lib/personas/registry'
import { cn } from '@/lib/utils'
import { BrandLogo } from './shell'

/** The school's own page in the prototype: where the logo and "Courses" links land. */
export function SchoolIndex({ brand }: { brand: BrandKey }) {
  const b = BRANDS[brand]
  const pages = SCHOOL_PAGES.filter((p) => p.brand === brand)
  return (
    <div data-brand={brand} className={cn('min-h-svh bg-background text-foreground', BRAND_FONTS[brand])}>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <BrandLogo brand={brand} />
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
            Reviewer index
          </a>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Courses in the prototype</p>
          <h1 className="font-display text-4xl leading-tight text-balance">{b.legalName}</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground text-pretty">
            Only the pages built for the priority personas appear here. In a real site this would be the course listing.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {pages.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-foreground">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  For {p.personas.map((k) => PERSONAS[k].name).join(' and ')}
                </span>
                <span className="font-display text-2xl leading-tight">{p.course}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium">
                  Open the page <ArrowRight className="size-4" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">Illustrative prototype. Course listings beyond these pages are not built.</p>
      </main>
    </div>
  )
}
