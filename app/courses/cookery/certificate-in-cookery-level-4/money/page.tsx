import type { Metadata } from 'next'
import { CourseMoneyPage } from '@/components/course/course-page'
import { cookeryLevel4 as course } from '@/lib/courses'

export const metadata: Metadata = {
  title: `Paying with a student loan | ${course.title} | ${course.brand.name}`,
  description: `How StudyLink loans work for the ${course.title} at ${course.brand.name}: fee, living costs, timeline and what you pay before day one.`,
}

export default function MoneyPage() {
  return <CourseMoneyPage course={course} />
}
