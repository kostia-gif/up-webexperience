import { Placeholder } from './ui'

export type CompareRow = { label: string; us: string; them: string }

export function CompareTable({
  rows,
  usLabel,
  themLabel,
  note,
  id,
}: {
  rows: CompareRow[]
  usLabel: string
  themLabel: string
  note: string
  id?: string
}) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">
                &nbsp;
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {usLabel}
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">
                {themLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-border">
                <th scope="row" className="px-4 py-3 text-left font-medium">
                  {r.label}
                </th>
                <td className="px-4 py-3">{r.us}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.them}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground text-pretty">
        <Placeholder className="mt-0.5 shrink-0" /> {note}
      </p>
    </div>
  )
}
