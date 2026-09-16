import type { Metadata, Viewport } from 'next'
import { Syne } from 'next/font/google'
import { ShopCoursePage } from '@/components/course/course-page'
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
    'Learn animation, film and design online. New Zealand Certificate in Digital Media and Design (Level 4) at Yoobee. 19 weeks, free for domestic students starting February 2027, with StudyLink living-costs support if you are eligible. Free pre-start courses you can begin tonight, cross-credited.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return (
    <div className={syne.variable}>
      <ShopCoursePage course={course} />
    </div>
  )
}
