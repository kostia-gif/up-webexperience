import type { Metadata, Viewport } from 'next'
import { EB_Garamond } from 'next/font/google'
import { Admissions, Families } from '@/components/intl/yoobee/admissions'
import { Campus } from '@/components/intl/yoobee/campus'
import { IntlFooter, IntlHeader } from '@/components/intl/yoobee/chrome'
import { Community } from '@/components/intl/yoobee/community'
import { COUNTRIES } from '@/components/intl/yoobee/data'
import { Enquire } from '@/components/intl/yoobee/enquire'
import { IntlHero } from '@/components/intl/yoobee/hero'
import { Place, Welcome } from '@/components/intl/yoobee/place'
import { Programme } from '@/components/intl/yoobee/programme'
import { getVisitorCountry } from '@/lib/geo'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-yoobee-intl-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'International students | Yoobee College of Creative Innovation, Auckland',
  description:
    'Study design, animation and film in Auckland, New Zealand. NZQA Category 1 college with a guaranteed pathway to a Bachelor degree. Campus tour, student life, accommodation, fees and a family video call in your language.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b2545',
  width: 'device-width',
  initialScale: 1,
}

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams
  const code = await getVisitorCountry(from)
  const country = COUNTRIES[code]

  return (
    <div data-brand="yoobee-intl" className={`${garamond.variable} bg-background text-foreground`}>
      <IntlHeader country={country} />
      <main>
        <IntlHero country={country} />
        <Welcome />
        <Place country={country} />
        <Campus />
        <Community country={country} />
        <Programme />
        <Families country={country} />
        <Admissions country={country} />
        <Enquire country={country} />
      </main>
      <IntlFooter />
    </div>
  )
}
