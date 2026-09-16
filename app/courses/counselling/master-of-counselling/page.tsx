import type { Metadata, Viewport } from 'next'
import { PostgradCoursePage } from '@/components/course/course-page'
import { masterOfCounselling as course } from '@/lib/courses'
import { aipcFonts } from './fonts'

export const metadata: Metadata = {
  title: `Master of Counselling | Online, FEE-HELP approved | ${course.brand.name}`,
  description:
    'Become a registered counsellor with an ACA-accredited Master of Counselling from the Australian Institute of Professional Counsellors. Entry with any bachelor degree, online with 5 campus days, full-time or part-time, FEE-HELP approved, $44,850 total tuition. Four intakes a year.',
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
      <PostgradCoursePage course={course} />
    </div>
  )
}
