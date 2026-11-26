import type { Metadata } from 'next'
import { Gallery } from '@/components/library/gallery'
import { ALL_BRAND_FONTS } from '@/lib/personas/fonts'

export const metadata: Metadata = {
  title: 'Module library | UP web experience prototype',
  description: 'Content modules to test on UP school websites, tagged by brand, persona, job and status.',
}

export default function Page() {
  return (
    <div className={ALL_BRAND_FONTS}>
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8">
        <header className="flex flex-col gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
            &larr; Reviewer index
          </a>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Module library</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">Modules we want to test</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground text-pretty">
            Grouped into new modules and enhanced existing ones, with the modules parked after review kept for reference. Each one carries the
            research or exemplars behind it, the pages it is used on, and a live demo with a brand switcher. School pages and this library
            use the same components.
          </p>
        </header>
        <Gallery />
      </main>
    </div>
  )
}
