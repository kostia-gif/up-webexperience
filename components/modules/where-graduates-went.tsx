import { Placeholder } from './ui'

export type GradEmployer = { employer: string; kind?: string; grads: { name: string; role: string; year: number }[] }

/** Graduates listed by employer and role, for readers who want names not percentages. */
export function WhereGraduatesWent({ employers, id }: { employers: GradEmployer[]; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-3">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {employers.map((e) => (
          <li key={e.employer} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted font-display text-sm uppercase">
                {e.employer.slice(0, 2)}
              </span>
              <div className="flex flex-col">
                <p className="font-medium leading-snug">{e.employer}</p>
                {e.kind && <p className="text-xs text-muted-foreground">{e.kind}</p>}
              </div>
            </div>
            <ul className="flex flex-col gap-1.5 text-sm">
              {e.grads.map((g) => (
                <li key={g.name} className="flex items-baseline justify-between gap-2">
                  <span>
                    {g.name} <span className="text-muted-foreground">&middot; {g.role}</span>
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">{g.year}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        <Placeholder /> Employer names and graduates are placeholders until UP supplies real, consented ones.
      </p>
    </div>
  )
}
