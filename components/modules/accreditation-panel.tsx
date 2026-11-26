import { ShieldCheck } from 'lucide-react'

export type Accreditation = { body: string; short: string; what: string; lets?: string }

export function AccreditationPanel({ items, id }: { items: Accreditation[]; id?: string }) {
  return (
    <ul id={id} className="grid scroll-mt-20 gap-4 md:grid-cols-3">
      {items.map((a) => (
        <li key={a.body} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
          <ShieldCheck className="size-6 text-primary" aria-hidden />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{a.body}</p>
            <p className="text-lg font-medium leading-snug">{a.short}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{a.what}</p>
          {a.lets && (
            <p className="text-sm leading-relaxed text-pretty">
              <span className="font-medium">What that lets you do: </span>
              {a.lets}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
