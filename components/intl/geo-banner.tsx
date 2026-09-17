import Link from 'next/link'
import { ArrowRight, Globe } from 'lucide-react'
import { COUNTRIES } from '@/components/intl/yoobee/data'
import { getVisitorCountry, isInternational } from '@/lib/geo'

/**
 * Server component. Reads the visitor's country from the Vercel geo header
 * (or ?from= in preview) and offers the international edition when the
 * visitor is outside New Zealand.
 */
export async function GeoBanner({ from, href }: { from?: string; href: string }) {
  const code = await getVisitorCountry(from)
  if (!isInternational(code)) return null
  const c = COUNTRIES[code]
  const target = `${href}${code !== 'OTHER' ? `?from=${code}` : ''}`

  return (
    <div className="border-b border-border bg-primary-tint text-primary-tint-foreground">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-2.5 text-sm">
        <p className="flex items-center gap-2">
          <Globe className="size-4 shrink-0" aria-hidden />
          <span>
            {code === 'OTHER' ? 'Visiting from outside New Zealand?' : `Visiting from ${c.name}?`} There is a page for international
            students and families, with fees in {c.currency.code} and a campus tour.
          </span>
        </p>
        <Link href={target} className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline">
          Open the international edition <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
