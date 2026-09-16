'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { Brand } from '@/lib/course'
import { cn } from '@/lib/utils'
import { BrandMark } from './brand-mark'

export function SiteHeader({ brand }: { brand: Brand }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-40">
      <div className="bg-coral text-coral-foreground">
        <p className="mx-auto max-w-[1200px] px-6 py-3 text-sm">
          {brand.banner.text}{' '}
          <a href={brand.banner.href} className="font-medium underline underline-offset-4 hover:no-underline">
            {brand.banner.linkLabel}
          </a>
        </p>
      </div>

      <div className="bg-background">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-6 py-5">
          <Link href="/" aria-label={`${brand.name} home`} className="min-w-0 shrink">
            {brand.logo ? (
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                priority
                unoptimized={brand.logo.src.endsWith('.svg')}
                className="h-8 w-auto max-w-full object-contain object-left md:h-10"
              />
            ) : (
              <BrandMark brand={brand} />
            )}
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={brand.enrolHref}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md bg-coral px-3 text-sm font-medium text-coral-foreground transition-colors hover:bg-coral-hover sm:px-5"
            >
              {brand.enrolLabel ?? 'Enrol now'}
              {brand.id === 'aipc' && <ArrowRight className="size-4" aria-hidden />}
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex size-11 items-center justify-center rounded-md border border-input md:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </div>

      <nav id="site-nav" aria-label="Primary" className={cn('bg-muted', open ? 'block' : 'hidden md:block')}>
        <ul className="mx-auto flex max-w-[1200px] flex-col px-6 md:flex-row md:gap-8">
          {brand.nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={cn(
                  'flex flex-col justify-center gap-0.5 border-b-2 py-3.5 md:py-4',
                  item.current ? 'border-primary' : 'border-transparent hover:border-foreground/30',
                )}
              >
                <span className="text-sm font-medium leading-none">{item.label}</span>
                {item.reo && <span className="text-xs leading-none text-muted-foreground">{item.reo}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
