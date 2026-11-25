import type { Metadata, Viewport } from 'next'
import { YoobeeCreativeMediaPage } from '@/components/persona/yoobee-creative-media-page'

export const metadata: Metadata = {
  title: 'Certificate in Creative Media | Turn your passion into a new path | Yoobee',
  description:
    'Nineteen weeks, online or on campus, around the job you have now. Where graduates work and what they earn, stories of people who switched, and a free taster lesson.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#141414', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <YoobeeCreativeMediaPage />
}
