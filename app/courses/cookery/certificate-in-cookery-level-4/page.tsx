import type { Metadata, Viewport } from 'next'
import { CoursePage } from '@/components/course/course-page'
import { cookeryLevel4 as course } from '@/lib/courses'

export const metadata: Metadata = {
  title: `Certificate in Cookery (Level 4) | ${course.brand.name}`,
  description:
    'Become a chef in a year. New Zealand Certificate in Cookery (Level 4) at NZMA. 35 weeks, four campuses, approved for StudyLink loans. Try it free before you decide.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return <CoursePage course={course} />
}
