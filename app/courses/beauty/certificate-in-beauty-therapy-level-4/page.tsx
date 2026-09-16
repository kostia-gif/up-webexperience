import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { CoursePage } from '@/components/course/course-page'
import { beautyTherapyLevel4 as course } from '@/lib/courses'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-elite',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Certificate in Beauty Therapy (Level 4) | ${course.brand.name}`,
  description:
    'Become a beauty therapist. New Zealand Certificate in Beauty Therapy (Level 4) at Elite School of Beauty and Spa. 32 weeks, three campuses, approved for StudyLink loans. Try a treatment free before you decide.',
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
      <CoursePage course={course} />
    </div>
  )
}
