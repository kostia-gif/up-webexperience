import type { Metadata, Viewport } from 'next'
import { NzstFlightPage } from '@/components/persona/nzst-flight-page'

export const metadata: Metadata = {
  title: 'Level 4 Flight Attending | Wake up in a different city. Start in 16 weeks | NZST',
  description:
    'Sixteen weeks to cabin crew. $5,373.06 plus $205 levy, starting 25 January and 19 July 2027 at Auckland City, Auckland Airport, Wellington, Hamilton and Christchurch. Find out in thirty seconds if you can get in.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#0b6e8a', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <NzstFlightPage />
}
