'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowRight, ArrowUp, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CoachUIMessage } from '@/lib/coach-agent'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useCourse } from './course-context'
import { Module } from './primitives'

export function CareerCoach() {
  const course = useCourse()
  const coach = course.copy.coach
  const STARTERS = coach.starters
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, status, stop, error } = useChat<CoachUIMessage>({
    id: `coach-${course.id}`,
    transport: new DefaultChatTransport({ api: '/api/coach', body: { courseId: course.id } }),
  })

  const busy = status === 'submitted' || status === 'streaming'
  const started = messages.length > 0

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  function ask(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    track('coach_message', { starter: STARTERS.includes(trimmed) })
    sendMessage({ text: trimmed })
    setInput('')
  }

  return (
    <Module id="coach" eyebrow="Not sure yet?" title="Talk it through with a career coach" wide>
      <p className="-mt-2 mb-6 max-w-[620px] text-[15px] leading-relaxed text-muted-foreground text-pretty">
        An AI advisor trained on this course and where it leads. Ask about the course, your first job, what you could earn, or
        whether a different route suits you better. Nothing you say here is saved.
      </p>

      <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span
            aria-hidden
            className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground"
          >
            {coach.initials}
          </span>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-tight">{coach.name}</p>
            <p className="text-xs text-muted-foreground">Answers in seconds. A human advisor is one click away.</p>
          </div>
        </div>

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="flex max-h-[520px] min-h-[280px] flex-col gap-4 overflow-y-auto px-4 py-5"
        >
          {!started ? (
            <div className="flex flex-col gap-4">
              <Bubble role="assistant" initials={coach.initials}>
                {coach.greeting ??
                  "Kia ora. I'm here to help you work out if this is the right move, and what comes after. Where are you at right now: still at school, working, or looking for a change?"}
              </Bubble>
              <ul className="flex flex-wrap gap-2 pl-11" aria-label="Suggested questions">
                {STARTERS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => ask(s)}
                      className="min-h-11 rounded-full border border-input bg-background px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            messages.map((m) => <Message key={m.id} message={m} initials={coach.initials} />)
          )}

          {status === 'submitted' && (
            <Bubble role="assistant" initials={coach.initials}>
              <span className="text-muted-foreground">Thinking…</span>
            </Bubble>
          )}
          {error && (
            <p role="alert" className="pl-11 text-sm text-coral">
              {error.message === 'busy'
                ? 'The coach is busy right now. Give it a few seconds and try again.'
                : 'The coach is unavailable right now. Book a chat with a human advisor above instead.'}
            </p>
          )}
        </div>

        <form
          className="flex items-end gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
        >
          <label htmlFor="coach-input" className="sr-only">
            Your message
          </label>
          <textarea
            id="coach-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                ask(input)
              }
            }}
            placeholder={coach.placeholder}
            className="min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3 py-3 text-[15px] leading-snug focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop"
              className="flex size-11 shrink-0 items-center justify-center rounded-md border border-input bg-background hover:border-foreground"
            >
              <Square className="size-4 fill-current" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
            >
              <ArrowUp className="size-5" aria-hidden />
            </button>
          )}
        </form>
      </div>
    </Module>
  )
}

function Message({ message, initials }: { message: CoachUIMessage; initials: string }) {
  const isUser = message.role === 'user'
  return (
    <>
      {message.parts.map((part, i) => {
        if (part.type === 'text') {
          if (!part.text.trim()) return null
          return (
            <Bubble key={`${message.id}-${i}`} role={isUser ? 'user' : 'assistant'} initials={initials}>
              {part.text}
            </Bubble>
          )
        }
        if (part.type === 'tool-recommendAction' && part.state === 'output-available') {
          const { label, href, reason, action } = part.output
          return (
            <a
              key={`${message.id}-${i}`}
              href={href}
              onClick={() => track('coach_action_click', { action })}
              className="ml-11 flex max-w-[520px] items-center justify-between gap-4 rounded-lg border border-primary bg-primary-tint px-4 py-3 text-primary-tint-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wide opacity-80">Next step</span>
                <span className="text-[15px] font-medium leading-snug">{label}</span>
                <span className="text-sm leading-snug opacity-90">{reason}</span>
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden />
            </a>
          )
        }
        return null
      })}
    </>
  )
}

function Bubble({ role, initials, children }: { role: 'user' | 'assistant'; initials: string; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex items-end gap-2.5', isUser && 'flex-row-reverse')}>
      {!isUser && (
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground"
        >
          {initials}
        </span>
      )}
      <p
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed text-pretty sm:max-w-[70%]',
          isUser ? 'rounded-br-sm bg-foreground text-background' : 'rounded-bl-sm bg-muted text-foreground',
        )}
      >
        {children}
      </p>
    </div>
  )
}
