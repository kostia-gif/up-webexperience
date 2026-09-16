import type { Course } from '@/lib/course'
import { beautyTherapyLevel4 } from './beauty-therapy-level-4'
import { cookeryLevel4 } from './cookery-level-4'
import { creativeMediaLevel4 } from './creative-media-level-4'
import { masterOfCounselling } from './master-of-counselling'

export const courses: Course[] = [cookeryLevel4, beautyTherapyLevel4, creativeMediaLevel4, masterOfCounselling]

export function getCourseById(id: string | undefined): Course | undefined {
  return courses.find((c) => c.id === id)
}

export { beautyTherapyLevel4, cookeryLevel4, creativeMediaLevel4, masterOfCounselling }
