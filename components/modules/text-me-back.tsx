'use client'

import { MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import { Avatar, Button, Field, Placeholder, ResultCard } from './ui'

/** Leave a mobile number and get a text from a named person within minutes. */
export function TextMeBack({ person, role, photo, minutes = 10, id }: { person: string; role: string; photo?: string; minutes?: number; id?: string }) {
  const [done, setDone] = useState(false)
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
        <Avatar name={person} photo={photo} className="size-14" />
        <div className="flex flex-col">
          <p className="font-medium">
            {person} <Placeholder className="ml-1 align-middle" />
          </p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex-1">
        {done ? (
          <ResultCard tone="yes">
            <div className="flex items-start gap-3 text-sm">
              <MessageSquareText className="mt-0.5 size-5 shrink-0" aria-hidden />
              <p className="text-pretty">
                <span className="font-medium">{person.split(' ')[0]} will text you within {minutes} minutes.</span> One text from a real person, not a
                call. Reply whenever suits you.
              </p>
            </div>
          </ResultCard>
        ) : (
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <div className="flex-1">
              <Field label={`Text me back, ${person.split(' ')[0]}`} name="mobile" type="tel" required autoComplete="tel" placeholder="Your mobile" />
            </div>
            <Button type="submit">Text me</Button>
          </form>
        )}
      </div>
    </div>
  )
}
