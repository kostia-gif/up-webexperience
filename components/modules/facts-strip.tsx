import { Placeholder } from './ui'

export type Fact = { label: string; value: string; placeholder?: boolean }

/**
 * Every fact stated once, as plain text an AI assistant can read. Lower sections
 * link back to #facts rather than repeating figures.
 */
export function FactsStrip({ facts, id = 'facts' }: { facts: Fact[]; id?: string }) {
  return (
    <dl id={id} className="grid scroll-mt-20 grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 sm:grid-cols-3 lg:grid-cols-6">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{f.label}</dt>
          <dd className="text-sm font-medium leading-snug text-pretty">
            {f.value} {f.placeholder && <Placeholder className="ml-1 align-middle" />}
          </dd>
        </div>
      ))}
    </dl>
  )
}
