import { generateText, Output } from 'ai'
import { z } from 'zod'
import { courses, getCourseById } from '@/lib/courses'
import { buildCvPrompt, cvProfileSchema, cvSchema } from '@/lib/cv'

export const maxDuration = 30

const requestSchema = z.discriminatedUnion('intent', [
  z.object({ intent: z.literal('build'), courseId: z.string().optional(), profile: cvProfileSchema }),
  z.object({ intent: z.literal('email'), courseId: z.string().optional(), profile: cvProfileSchema, cv: cvSchema }),
])

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'Please check your details and try again.' }, { status: 400 })
  }

  const body = parsed.data
  const course = getCourseById(body.courseId) ?? courses[0]
  const p = body.profile

  // Lead capture: the CV builder is also an enquiry. Swap this log for a CRM/DB write when one is connected.
  console.log('[lead]', {
    source: body.intent === 'build' ? 'cv_builder' : 'cv_email_request',
    courseId: course.id,
    name: `${p.firstName} ${p.lastName}`,
    email: p.email,
    mobile: p.mobile,
    location: p.location,
    school: p.school.level,
    jobs: p.work.length,
    studyWorkPlan: p.studyWorkPlan,
  })

  if (body.intent === 'email') {
    // Prototype: acknowledges the request. Wire an email provider here to send the CV and course outline.
    return Response.json({ ok: true })
  }

  try {
    const { output } = await generateText({
      model: 'openai/gpt-4.1-mini',
      output: Output.object({ schema: cvSchema }),
      prompt: buildCvPrompt(course, p),
    })
    // Models occasionally emit stray control characters in place of macrons or dashes.
    const clean = JSON.parse(JSON.stringify(output).replace(/\\u00[01][0-9a-f]/gi, '')) as typeof output
    return Response.json({ cv: clean })
  } catch (error) {
    console.error('[cv] generation failed', error)
    const message = error instanceof Error ? error.message : String(error)
    const status = /rate.?limit|429/i.test(message) ? 429 : 502
    return Response.json(
      { error: status === 429 ? 'We are a bit busy. Give it a moment and try again.' : 'We could not build your CV just now. Please try again.' },
      { status },
    )
  }
}
