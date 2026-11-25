import type { Metadata, Viewport } from 'next'
import { AipcCounsellingPage } from '@/components/persona/aipc-counselling-page'

export const metadata: Metadata = {
  title: 'Master of Counselling | ACA accredited, online with practical workshops | AIPC',
  description:
    'An ACA-accredited Master of Counselling taught by practising counsellors, online around a working life. 18 months (10 subjects) or 24 months Advanced. FEE-HELP available. Talk to a tutor first.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#2d388e', width: 'device-width', initialScale: 1 }

export default async function Page({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: who } = await searchParams
  return <AipcCounsellingPage initial={who === 'dan' ? 'dan' : 'sarah'} />
}
