import { createAgentUIStreamResponse } from 'ai'
import { getCoachAgent, type CoachUIMessage } from '@/lib/coach-agent'
import { courses, getCourseById } from '@/lib/courses'

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages, courseId } = (await request.json()) as { messages: CoachUIMessage[]; courseId?: string }
  const course = getCourseById(courseId) ?? courses[0]

  return createAgentUIStreamResponse({
    agent: getCoachAgent(course),
    uiMessages: messages.slice(-20),
    onError: (error) => {
      console.error('[coach] stream error', error)
      const message = error instanceof Error ? error.message : String(error)
      if (/rate.?limit|429/i.test(message)) return 'busy'
      return 'unavailable'
    },
  })
}
