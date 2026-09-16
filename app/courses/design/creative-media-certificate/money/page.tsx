import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { CourseMoneyPage } from '@/components/course/course-page'
import { creativeMediaLevel4 as course } from '@/lib/courses'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-yoobee',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Free to study, with help to live on | Creative Media | ${course.brand.name}`,
  description:
    'The course is free. If you are eligible, StudyLink can provide a Student Allowance or living-costs loan of up to $333 a week plus $1,000 for course-related costs. How it works, step by step.',
}

export default function Page() {
  return (
    <div className={syne.variable}>
      <CourseMoneyPage course={course} />
    </div>
  )
}
