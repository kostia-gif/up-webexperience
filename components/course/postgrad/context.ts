'use client'

import { formatMoney } from '@/lib/course'
import { useCourse } from '../course-context'

export function usePostgrad() {
  const course = useCourse()
  const pg = course.postgrad
  if (!pg) throw new Error('usePostgrad requires a course with postgrad data')
  const money = (n: number) => formatMoney(n, course.brand.currency)
  return { course, pg, money }
}
