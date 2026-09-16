'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Course } from '@/lib/course'

const CourseContext = createContext<Course | null>(null)

export function CourseProvider({ course, children }: { course: Course; children: ReactNode }) {
  return <CourseContext.Provider value={course}>{children}</CourseContext.Provider>
}

export function useCourse(): Course {
  const course = useContext(CourseContext)
  if (!course) throw new Error('useCourse must be used inside a CourseProvider')
  return course
}
