import type { Metadata, Viewport } from 'next'
import { Syne } from 'next/font/google'
import { OnlineCoursePageB } from '@/components/course/b/pages'
import { GeoBanner } from '@/components/intl/geo-banner'
import { creativeMediaLevel4 as course } from '@/lib/courses'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-yoobee',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Certificate in Creative Media (Level 4) | ${course.brand.name}`,
  description:
    'Learn animation, film and design online. New Zealand Certificate in Digital Media and Design (Level 4) at Yoobee. 19 weeks, free for domestic students starting February 2027. Pick your intake or talk to an advisor first.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams
  return (
    <div className={syne.variable}>
      <div data-brand="yoobee">
        <GeoBanner from={from} href="/international/yoobee" />
      </div>
      <OnlineCoursePageB course={course} />
    </div>
  )
}
