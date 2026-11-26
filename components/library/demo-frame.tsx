'use client'

import { Monitor, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { Pill } from '@/components/modules/ui'
import { BRAND_FONTS } from '@/lib/personas/fonts'
import { BRANDS, type BrandKey, type ModuleDef, moduleBrands } from '@/lib/personas/registry'
import { cn } from '@/lib/utils'
import { ModuleDemo } from './module-demo'

/** Brand switcher plus phone/desktop toggle around a live module demo. */
export function DemoFrame({ module }: { module: ModuleDef }) {
  const brands = moduleBrands(module)
  const [brand, setBrand] = useState<BrandKey>(brands[0])
  const [phone, setPhone] = useState(!!module.phoneFirst)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Brand">
          {brands.map((b) => (
            <Pill key={b} active={b === brand} onClick={() => setBrand(b)}>
              {BRANDS[b].name}
            </Pill>
          ))}
        </div>
        <div className="flex gap-1 rounded-full border border-border p-1" role="group" aria-label="Viewport">
          <button
            type="button"
            onClick={() => setPhone(true)}
            aria-pressed={phone}
            className={cn('inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs', phone ? 'bg-foreground text-background' : 'hover:bg-muted')}
          >
            <Smartphone className="size-3.5" aria-hidden /> Phone
          </button>
          <button
            type="button"
            onClick={() => setPhone(false)}
            aria-pressed={!phone}
            className={cn('inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs', !phone ? 'bg-foreground text-background' : 'hover:bg-muted')}
          >
            <Monitor className="size-3.5" aria-hidden /> Desktop
          </button>
        </div>
      </div>
      <div className={cn('flex justify-center rounded-2xl border border-border bg-muted p-3 sm:p-6', phone && 'py-8')}>
        <div
          key={brand}
          data-brand={brand}
          className={cn(
            'w-full bg-background text-foreground',
            BRAND_FONTS[brand],
            phone ? 'max-w-[390px] rounded-[2rem] border-[6px] border-foreground/90 p-3 shadow-xl' : 'rounded-xl p-4 sm:p-6',
          )}
        >
          <ModuleDemo slug={module.slug} brand={brand} />
        </div>
      </div>
    </div>
  )
}

/** Small, non-interactive preview for gallery cards. */
export function DemoThumb({ module }: { module: ModuleDef }) {
  const brand = moduleBrands(module)[0]
  return (
    <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-muted" aria-hidden>
      <div
        data-brand={brand}
        inert
        className={cn('pointer-events-none absolute left-0 top-0 w-[200%] origin-top-left scale-50 bg-background p-4 text-foreground', BRAND_FONTS[brand])}
      >
        <ModuleDemo slug={module.slug} brand={brand} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-muted to-transparent" />
    </div>
  )
}
