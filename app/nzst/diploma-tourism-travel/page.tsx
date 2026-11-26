import type { Metadata, Viewport } from 'next'
import { NzstDiplomaPage } from '@/components/persona/nzst-diploma-page'

export const metadata: Metadata = {
  title: 'Diploma in Tourism & Travel Management (Level 5) | Turn a love of travel into a career | NZST',
  description:
    'A 32-week Level 5 diploma in how tourism businesses run: operations, marketing, sustainability and customer service, with study tours, job fairs and a Walt Disney World case study. Intakes 8 February and 31 May 2027 at five campuses.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#0b6e8a', width: 'device-width', initialScale: 1 }

export default function Page() {
  return <NzstDiplomaPage />
}
