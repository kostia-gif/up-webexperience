import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { VocationalCoursePageB } from '@/components/course/b/pages'
import { beautyTherapyLevel4 as course } from '@/lib/courses'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-elite',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Become a beauty therapist. Start ${course.quick.nextStart} | ${course.brand.name}`,
  description:
    'Want to be a beauty therapist? Pick a start date, leave your number, and we hold your seat. 32 weeks at Elite, three campuses, approved for StudyLink loans. Or ask a real person to call you back.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return (
    <div className={cormorant.variable}>
      <VocationalCoursePageB course={course} />
    </div>
  )
}
