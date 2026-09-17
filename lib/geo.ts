import { headers } from 'next/headers'

export type VisitorCountry = 'CN' | 'IN' | 'VN' | 'KR' | 'JP' | 'NZ' | 'OTHER'

const KNOWN: VisitorCountry[] = ['CN', 'IN', 'VN', 'KR', 'JP', 'NZ']

/**
 * Vercel sets x-vercel-ip-country on every deployed request. In local
 * preview it is absent, so ?from=CN lets the demo simulate a visitor.
 */
export async function getVisitorCountry(from?: string): Promise<VisitorCountry> {
  const override = from?.toUpperCase()
  if (override && KNOWN.includes(override as VisitorCountry)) return override as VisitorCountry
  if (override === 'OTHER') return 'OTHER'

  const h = await headers()
  const ip = h.get('x-vercel-ip-country')?.toUpperCase()
  if (ip && KNOWN.includes(ip as VisitorCountry)) return ip as VisitorCountry
  if (ip) return 'OTHER'
  return 'NZ'
}

export function isInternational(c: VisitorCountry) {
  return c !== 'NZ'
}
