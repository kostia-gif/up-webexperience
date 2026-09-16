import { createAgentUIStreamResponse } from 'ai'
import { courses, getCourseById } from '@/lib/courses'
import { cvProfileSchema, emptyProfile } from '@/lib/cv'
import { createCvAgent, type CvUIMessage } from '@/lib/cv-agent'

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages, courseId, profile } = (await request.json()) as { messages: CvUIMessage[]; courseId?: string; profile?: unknown }
  const course = getCourseById(courseId) ?? courses[0]
  const known = cvProfileSchema.safeParse(profile)
  if (!known.success) {
    return Response.json({ error: 'Missing contact details' }, { status: 400 })
  }

  return createAgentUIStreamResponse({
    agent: createCvAgent(course, { ...emptyProfile(), ...known.data }),
    uiMessages: messages.slice(-30),
    onError: (error) => {
      console.error('[cv-chat] stream error', error)
      const message = error instanceof Error ? error.message : String(error)
      if (/rate.?limit|429/i.test(message)) return 'busy'
      return 'unavailable'
    },
  })
}
