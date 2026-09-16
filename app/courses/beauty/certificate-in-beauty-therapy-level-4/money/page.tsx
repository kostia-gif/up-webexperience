import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { CourseMoneyPage } from '@/components/course/course-page'
import { beautyTherapyLevel4 as course } from '@/lib/courses'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-elite',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Paying with a student loan | ${course.title} | ${course.brand.name}`,
  description: `How StudyLink loans work for the ${course.title} at ${course.brand.legalName}: fee, living costs, timeline and what you pay before day one.`,
}

export default function MoneyPage() {
  return (
    <div className={cormorant.variable}>
      <CourseMoneyPage course={course} />
    </div>
  )
}
