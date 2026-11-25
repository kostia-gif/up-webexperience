'use client'

import { useState } from 'react'

/** "What we want to learn": one sentence, editable in the browser for the session. */
export function LearnNote({ slug, initial }: { slug: string; initial: string }) {
  const [value, setValue] = useState(initial)
  return (
    <section className="flex flex-col gap-2 rounded-xl border border-dashed border-border bg-card p-5">
      <label htmlFor={`learn-${slug}`} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        What we want to learn (editable)
      </label>
      <textarea
        id={`learn-${slug}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-md border border-transparent bg-transparent text-[15px] leading-relaxed hover:border-border focus:border-input focus:outline-none"
      />
      <p className="text-xs text-muted-foreground">Edits are not saved. Copy the final wording into the brief.</p>
    </section>
  )
}
