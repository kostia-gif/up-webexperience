'use client'

import { Camera as Instagram, MessageCircle } from 'lucide-react'
import { Placeholder } from './ui'

/** WhatsApp and Instagram, with a stated reply time. Working-looking only. */
export function MessageUs({ who, hours, id }: { who: string; hours: string; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl leading-tight">Message us. Reply in minutes.</h3>
        <p className="text-sm text-muted-foreground">
          {who} answers {hours}. <Placeholder className="ml-1 align-middle" />
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href="#message"
          onClick={(e) => e.preventDefault()}
          className="flex min-h-14 items-center gap-3 rounded-lg bg-success px-4 text-success-foreground hover:opacity-90"
        >
          <MessageCircle className="size-6" aria-hidden />
          <span className="flex flex-col leading-tight">
            <span className="font-medium">WhatsApp</span>
            <span className="text-xs opacity-80">Opens a chat (not in prototype)</span>
          </span>
        </a>
        <a
          href="#message"
          onClick={(e) => e.preventDefault()}
          className="flex min-h-14 items-center gap-3 rounded-lg bg-primary-tint px-4 text-primary-tint-foreground hover:opacity-90"
        >
          <Instagram className="size-6" aria-hidden />
          <span className="flex flex-col leading-tight">
            <span className="font-medium">Instagram DM</span>
            <span className="text-xs opacity-80">Opens a chat (not in prototype)</span>
          </span>
        </a>
      </div>
    </div>
  )
}
