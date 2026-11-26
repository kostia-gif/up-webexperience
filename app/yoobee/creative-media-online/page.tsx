import type { Metadata, Viewport } from 'next'
import { YoobeeOnlinePage } from '@/components/persona/yoobee-online-page'

export const metadata: Metadata = {
  title: 'Certificate in Creative Media, online | Start this month | Yoobee Online',
  description: 'Animation, film and design in one certificate, taught live online around the job you have now. Starts every month. Enrol in about three minutes.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#141414', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <YoobeeOnlinePage />
}
