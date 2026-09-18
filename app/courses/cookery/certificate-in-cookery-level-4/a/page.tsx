import type { Metadata, Viewport } from 'next'
import { VocationalCoursePageA } from '@/components/course/a/pages'
import { cookeryLevel4 as course } from '@/lib/courses'

export const metadata: Metadata = {
  title: `Become a chef. Start ${course.quick.nextStart} | ${course.brand.name}`,
  description:
    'Want to be a chef? Pick a start date, leave your number, and we hold your seat. 35 weeks at NZMA, four campuses, nothing to pay upfront. Or ask a real person to call you back.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return <VocationalCoursePageA course={course} />
}
