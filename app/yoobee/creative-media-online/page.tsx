import type { Metadata, Viewport } from 'next'
import { YoobeeOnlinePage } from '@/components/persona/yoobee-online-page'

export const metadata: Metadata = {
  title: 'Certificate in Creative Media, online | Make a living off creative media | Yoobee Online',
  description: 'Animation, film and design in one online certificate, taught live from anywhere in New Zealand. Full-time over 19 weeks or part-time over 38. Intakes in February and July. Enrol in about three minutes.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#141414', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <YoobeeOnlinePage />
}
