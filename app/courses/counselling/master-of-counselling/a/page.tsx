import type { Metadata, Viewport } from 'next'
import { PostgradCoursePageA } from '@/components/course/a/pages'
import { masterOfCounselling as course } from '@/lib/courses'
import { aipcFonts } from '../fonts'

export const metadata: Metadata = {
  title: `Master of Counselling | Online, FEE-HELP approved | ${course.brand.name}`,
  description:
    'Become a registered counsellor with an ACA-accredited Master of Counselling from the Australian Institute of Professional Counsellors. Hold a place in the next trimester or book a course specialist first. Entry with any bachelor degree, online with 5 campus days, FEE-HELP approved.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: course.brand.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return (
    <div className={aipcFonts}>
      <PostgradCoursePageA course={course} />
    </div>
  )
}
