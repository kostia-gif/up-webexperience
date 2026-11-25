'use client'

import { Send, UserRound } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, Placeholder } from './ui'

export type CannedAnswer = { q: string; a: string }
type Msg = { from: 'you' | 'bot' | 'person'; text: string }

/** Instant scripted answers with a visible handover to a named person. No real integration. */
export function ChatNow({ canned, person, id }: { canned: CannedAnswer[]; person: string; id?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: 'Ask anything about fees, credit, hours or dates. Pick a question or type your own.' }])
  const [input, setInput] = useState('')
  const [handed, setHanded] = useState(false)

  function ask(q: string) {
    const match = canned.find((c) => c.q === q) ?? canned.find((c) => q.toLowerCase().includes(c.q.split(' ')[0].toLowerCase()))
    setMsgs((m) => [
      ...m,
      { from: 'you', text: q },
      match
        ? { from: 'bot', text: match.a }
        : { from: 'bot', text: `I am not sure about that one. ${person} can answer it properly. Want me to hand over?` },
    ])
    setInput('')
  }

  return (
    <div id={id} className="flex scroll-mt-20 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm">
        <span className="font-medium">Chat now</span>
        <span className="text-xs text-muted-foreground">Answers in seconds. {person} is online for anything else.</span>
      </div>
      <ul className="flex h-64 flex-col gap-2 overflow-y-auto p-4 text-sm" aria-live="polite">
        {msgs.map((m, i) => (
          <li
            key={i}
            className={cn(
              'max-w-[85%] rounded-lg px-3 py-2 leading-relaxed text-pretty',
              m.from === 'you' ? 'self-end bg-primary text-primary-foreground' : m.from === 'person' ? 'self-start bg-success text-success-foreground' : 'self-start bg-muted',
            )}
          >
            {m.from === 'person' && <span className="mb-0.5 block text-xs font-medium">{person}</span>}
            {m.text}
          </li>
        ))}
        {handed && (
          <li className="self-start rounded-lg bg-success px-3 py-2 text-success-foreground">
            <span className="mb-0.5 block text-xs font-medium">{person}</span>
            Hi, I have your chat so far. I am a counsellor and I teach on this course. What would you like to know?
          </li>
        )}
      </ul>
      <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
        {canned.map((c) => (
          <button key={c.q} type="button" onClick={() => ask(c.q)} className="rounded-full border border-border px-3 py-1 text-xs hover:border-foreground">
            {c.q}
          </button>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) ask(input.trim())
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Type a question"
          placeholder="Type a question"
          className="min-h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
        />
        <Button type="submit" ariaLabel="Send">
          <Send className="size-4" aria-hidden />
        </Button>
        <Button variant="secondary" onClick={() => setHanded(true)} disabled={handed}>
          <UserRound className="size-4" aria-hidden /> <span className="hidden sm:inline">Talk to {person.split(' ')[0]}</span>
        </Button>
      </form>
      <p className="px-4 pb-3 text-xs text-muted-foreground">
        <Placeholder /> Scripted answers. No real chat integration.
      </p>
    </div>
  )
}
