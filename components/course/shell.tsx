import type { ReactNode } from 'react'
import type { Course } from '@/lib/course'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { CourseProvider } from './course-context'

export function Shell({ course, children }: { course: Course; children: ReactNode }) {
  return (
    <CourseProvider course={course}>
      <div data-brand={course.brand.id} className="bg-background text-foreground">
        <SiteHeader brand={course.brand} />
        {children}
        <SiteFooter brand={course.brand} />
      </div>
    </CourseProvider>
  )
}
