import type { Metadata, Viewport } from 'next'
import { YoobeeAnimationPage } from '@/components/persona/yoobee-animation-page'

export const metadata: Metadata = {
  title: 'Diploma in Animation (Level 5) | This is what last year\u2019s class made | Yoobee',
  description:
    'Characters, environments, 2D and 3D on campus in Auckland, Wellington and Christchurch. Real student work, tutors who still work in the industry, and a campus visit you can book.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#141414', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <YoobeeAnimationPage />
}
