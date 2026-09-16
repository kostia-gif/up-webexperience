import Image from 'next/image'
import type { Brand } from '@/lib/course'
import { BrandMark } from './brand-mark'

export function SiteFooter({ brand }: { brand: Brand }) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          {brand.logo ? (
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              className="h-9 w-auto brightness-0 invert"
            />
          ) : (
            <BrandMark brand={brand} className="text-primary-foreground" />
          )}
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/80">{brand.footerBlurb}</p>
          <p className="text-sm">{brand.phone}</p>
        </div>
        {brand.footerCols.map((c) => (
          <div key={c.h} className="flex flex-col gap-3">
            <p className="font-display text-lg font-bold uppercase tracking-wide">{c.h}</p>
            <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline hover:underline-offset-4">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/20">
        <p className="mx-auto max-w-[1200px] px-6 py-4 text-xs text-primary-foreground/70">
          Illustrative prototype. All numbers, dates, employers, quotes and stories are placeholders pending sourced, approved data.
        </p>
      </div>
    </footer>
  )
}
