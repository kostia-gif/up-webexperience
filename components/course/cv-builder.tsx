'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowRight, ArrowUp, Check, Mail, RefreshCw, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { emptyProfile, type CvDocument, type CvProfile } from '@/lib/cv'
import type { CvUIMessage } from '@/lib/cv-agent'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from './course-context'
import { Btn } from './primitives'
import { CvPaper, CvPlaceholder, CvSkeleton } from './cv-paper'

type BuildState = 'idle' | 'building' | 'ready' | 'error'
type EmailState = 'idle' | 'sending' | 'sent' | 'error'

export function CvBuilder({ open, onClose, returnFocusTo }: { open: boolean; onClose: () => void; returnFocusTo: HTMLElement | null }) {
  const ref = useRef<HTMLDialogElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const course = useCourse()
  const [profile, setProfile] = useState<CvProfile | null>(null)
  const [cv, setCv] = useState<CvDocument | null>(null)
  const [buildState, setBuildState] = useState<BuildState>('idle')
  const [emailState, setEmailState] = useState<EmailState>('idle')
  const [refining, setRefining] = useState(false)
  const [input, setInput] = useState('')
  const builtFor = useRef<string | null>(null)

  const { messages, sendMessage, status, error } = useChat<CvUIMessage>({
    id: `cv-${course.id}`,
    transport: new DefaultChatTransport({ api: '/api/cv-chat' }),
  })
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      track('cv_builder_open', { courseId: course.id })
    } else if (!open && d.open) {
      d.close()
      returnFocusTo?.focus()
    }
  }, [open, returnFocusTo, course.id])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, buildState])

  useEffect(() => {
    if (refining) chatInputRef.current?.focus()
  }, [refining])

  // The coach calls saveProfile once it has the extra detail; that drives a rebuild.
  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role !== 'assistant') continue
      for (const part of m.parts) {
        if (part.type === 'tool-saveProfile' && part.state === 'output-available') {
          if (builtFor.current !== m.id) {
            builtFor.current = m.id
            setProfile(part.input)
            void build(part.input, 'refine')
          }
          return
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  async function build(p: CvProfile, mode: 'first' | 'refine') {
    setBuildState('building')
    setEmailState('idle')
    track('cv_build', { courseId: course.id, mode, jobs: p.work.length })
    try {
      const res = await fetch('/api/cv', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ intent: 'build', courseId: course.id, profile: p }),
      })
      const data = (await res.json()) as { cv?: CvDocument; error?: string }
      if (!res.ok || !data.cv) throw new Error(data.error)
      setCv(data.cv)
      setBuildState('ready')
    } catch {
      setBuildState('error')
    }
  }

  function onDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const p: CvProfile = {
      ...emptyProfile(),
      firstName: String(fd.get('firstName') ?? '').trim(),
      lastName: String(fd.get('lastName') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      mobile: String(fd.get('mobile') ?? '').trim(),
    }
    setProfile(p)
    void build(p, 'first')
  }

  async function emailMe() {
    if (!cv || !profile) return
    setEmailState('sending')
    track('cv_email_request', { courseId: course.id })
    try {
      const res = await fetch('/api/cv', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ intent: 'email', courseId: course.id, profile, cv }),
      })
      if (!res.ok) throw new Error()
      setEmailState('sent')
    } catch {
      setEmailState('error')
    }
  }

  function startRefining() {
    setRefining(true)
    track('cv_refine_start', { courseId: course.id })
  }

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy || !profile) return
    track('cv_chat_message', { courseId: course.id })
    sendMessage({ text: trimmed }, { body: { courseId: course.id, profile } })
    setInput('')
  }

  function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) onClose()
  }

  const hasCv = Boolean(cv && profile)
  const opener = profile
    ? `Nice to meet you, ${profile.firstName}. Let's make this yours. Which school did you go to, and what level did you finish or are you working towards?`
    : ''

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdrop}
      aria-labelledby="cv-title"
      className="m-auto w-[calc(100%-32px)] max-w-[1180px] rounded-xl bg-background p-0 text-foreground backdrop:bg-foreground/55"
    >
      <div className="relative max-h-[90vh] overflow-y-auto md:grid md:h-[90vh] md:grid-cols-12 md:grid-rows-[minmax(0,1fr)] md:overflow-y-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-md bg-background/80 hover:bg-muted"
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col border-b border-border md:col-span-5 md:min-h-0 md:border-b-0 md:border-r">
          <header className="flex flex-col gap-1 border-b border-border p-6 pr-14">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Step 5 · First job</p>
            <h2 id="cv-title" className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-balance sm:text-3xl">
              {hasCv ? `Here you go, ${profile?.firstName}` : 'See the CV you will walk out with'}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
              {hasCv
                ? 'This is the CV a head chef would see the week you finish. Add your own story below to make it yours, or have it emailed with the course outline.'
                : 'Three details for the top of the page and we will draft the rest from what this course teaches.'}
            </p>
          </header>

          {!hasCv && buildState !== 'building' && (
            <form className="flex flex-col gap-4 p-6" onSubmit={onDetails}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="cv-first" name="firstName" label="First name" autoComplete="given-name" />
                <Field id="cv-last" name="lastName" label="Last name" autoComplete="family-name" />
              </div>
              <Field id="cv-email" name="email" label="Email" type="email" autoComplete="email" />
              <Field id="cv-mobile" name="mobile" label="Mobile" type="tel" autoComplete="tel" />
              {buildState === 'error' && (
                <p role="alert" className="rounded-md border border-warning-border bg-warning px-3 py-2 text-sm text-warning-foreground">
                  We could not build the CV just now. Try again in a moment.
                </p>
              )}
              <Btn type="submit" variant="coral" className="w-full">
                <Sparkles className="size-4" aria-hidden /> Build my CV
              </Btn>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We use your details to build the CV and so an advisor can follow up about this course. You can ask us to delete them any time.
              </p>
            </form>
          )}

          {buildState === 'building' && !hasCv && (
            <div className="flex flex-col gap-2 p-6" aria-live="polite">
              <p className="text-[15px] font-medium">Drafting your CV</p>
              <p className="text-sm text-muted-foreground">About twenty seconds. We are turning {course.funding.weeks} weeks of training into one page.</p>
            </div>
          )}

          {hasCv && profile && (
            <>
              <div className="flex flex-col gap-2 border-b border-border p-4">
                <Btn type="button" variant="coral" onClick={emailMe} disabled={emailState === 'sending' || emailState === 'sent'} className="w-full">
                  {emailState === 'sent' ? (
                    <>
                      <Check className="size-4" aria-hidden /> Sent to {profile.email}
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" aria-hidden /> {emailState === 'sending' ? 'Sending' : 'Email me this CV and the course outline'}
                    </>
                  )}
                </Btn>
                {emailState === 'sent' && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    A course advisor will also be in touch in the next day or two in case you have questions.
                  </p>
                )}
                {emailState === 'error' && (
                  <p role="alert" className="text-xs text-warning-foreground">
                    That did not send. Try again in a moment.
                  </p>
                )}
              </div>

              {!refining ? (
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex flex-col gap-1">
                    <p className="font-display text-lg font-bold uppercase leading-none tracking-tight">Make it yours</p>
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      The grey bits on the CV are waiting for you. A two-minute chat about school, any jobs you have had and what you do outside work,
                      and we redraft it with your story in it.
                    </p>
                  </div>
                  <Btn type="button" variant="outline" onClick={startRefining} className="w-full">
                    Add my school and experience <ArrowRight className="size-4" aria-hidden />
                  </Btn>
                </div>
              ) : (
                <>
                  <div
                    ref={listRef}
                    role="log"
                    aria-live="polite"
                    aria-label="CV coach conversation"
                    className="flex min-h-[220px] flex-1 flex-col gap-3 overflow-y-auto px-5 py-4 md:min-h-0"
                  >
                    <Bubble role="assistant">{opener}</Bubble>
                    {messages.map((m) => <Message key={m.id} message={m} />)}
                    {status === 'submitted' && (
                      <Bubble role="assistant">
                        <span className="text-muted-foreground">Thinking…</span>
                      </Bubble>
                    )}
                    {buildState === 'building' && (
                      <p className="ml-10 text-xs font-medium text-primary">Redrafting your CV…</p>
                    )}
                    {buildState === 'error' && (
                      <div className="ml-10 flex flex-col gap-2 rounded-lg border border-warning-border bg-warning px-4 py-3 text-sm text-warning-foreground">
                        <p>I could not redraft the CV just now.</p>
                        <Btn type="button" variant="ghost" onClick={() => void build(profile, 'refine')}>
                          <RefreshCw className="size-4" aria-hidden /> Try again
                        </Btn>
                      </div>
                    )}
                    {!busy && !error && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                      <p role="alert" className="ml-10 text-sm text-coral">
                        The coach did not reply. Send your answer again.
                      </p>
                    )}
                    {error && (
                      <p role="alert" className="ml-10 text-sm text-coral">
                        {error.message === 'busy' ? 'The coach is busy right now. Give it a few seconds and try again.' : 'The coach is unavailable right now. Try again shortly.'}
                      </p>
                    )}
                  </div>

                  <form
                    className="flex items-end gap-2 border-t border-border p-3"
                    onSubmit={(e) => {
                      e.preventDefault()
                      send(input)
                    }}
                  >
                    <label htmlFor="cv-input" className="sr-only">
                      Your answer
                    </label>
                    <textarea
                      ref={chatInputRef}
                      id="cv-input"
                      rows={1}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                          e.preventDefault()
                          send(input)
                        }
                      }}
                      placeholder="Type your answer"
                      className="min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3 py-3 text-[15px] leading-snug focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || busy}
                      aria-label="Send"
                      className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
                    >
                      <ArrowUp className="size-5" aria-hidden />
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>

        <div className="bg-muted p-4 md:col-span-7 md:min-h-0 md:overflow-y-auto md:p-6" aria-live="polite">
          {cv && profile && buildState !== 'building' ? (
            <CvPaper cv={cv} profile={profile} onRefine={refining ? undefined : startRefining} />
          ) : buildState === 'building' ? (
            <CvSkeleton />
          ) : (
            <CvPlaceholder />
          )}
        </div>
      </div>
    </dialog>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="min-h-11 rounded-md border border-input bg-background px-3 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
      />
    </div>
  )
}

function Message({ message }: { message: CvUIMessage }) {
  const isUser = message.role === 'user'
  return (
    <>
      {message.parts.map((part, i) => {
        if (part.type === 'text') {
          if (!part.text.trim()) return null
          return (
            <Bubble key={`${message.id}-${i}`} role={isUser ? 'user' : 'assistant'}>
              {part.text}
            </Bubble>
          )
        }
        if (part.type === 'tool-saveProfile' && part.state === 'output-available') {
          return (
            <p key={`${message.id}-${i}`} className="ml-10 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <Check className="size-3.5" aria-hidden /> Details saved
            </p>
          )
        }
        return null
      })}
    </>
  )
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex items-end gap-2', isUser && 'flex-row-reverse')}>
      {!isUser && (
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground"
        >
          CV
        </span>
      )}
      <p
        className={cn(
          'max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[15px] leading-relaxed text-pretty',
          isUser ? 'rounded-br-sm bg-foreground text-background' : 'rounded-bl-sm bg-muted text-foreground',
        )}
      >
        {children}
      </p>
    </div>
  )
}
