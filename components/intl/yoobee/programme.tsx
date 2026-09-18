import { ArrowDown, ChevronDown } from 'lucide-react'
import { creativeMediaLevel4 } from '@/lib/courses/creative-media-level-4'
import { PATHWAY } from './data'
import { SectionHead } from './place'

const STRUCTURE = creativeMediaLevel4.structure!
const TERMS = STRUCTURE.terms.map((t) => ({ ...t, weeks: t.weeks.replace(/^Weeks?\s*/i, '') }))
const TOTAL_CREDITS = TERMS.reduce((n, t) => n + t.modules.reduce((m, x) => m + x.credits, 0), 0)

export function Programme() {
  return (
    <section id="programme" aria-labelledby="programme-h" className="border-b border-border bg-muted/40">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <SectionHead
          id="programme-h"
          kicker="The programme"
          title="New Zealand Certificate in Digital Media and Design, Level 4"
          lede="Sixty credits over nineteen weeks, taught in person by tutors who work in Auckland studios. Students graduate with a portfolio across design, animation and film, and a guaranteed place in a Level 5 diploma."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl text-primary">Programme of study</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-primary text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Code
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Module
                  </th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">
                    Credits
                  </th>
                  <th scope="col" className="py-2 text-right font-medium">
                    Weeks
                  </th>
                </tr>
              </thead>
              <tbody>
                {TERMS.flatMap((t) =>
                  t.modules.map((m) => (
                    <tr key={m.code} className="border-b border-border align-top">
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{m.code}</td>
                      <td className="py-3 pr-4">
                        <details className="group">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-medium">
                            {m.title}
                            <ChevronDown className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                          </summary>
                          <div className="flex flex-col gap-3 pt-3 text-sm text-muted-foreground">
                            <p className="leading-relaxed">{m.summary}</p>
                            <ul className="flex flex-col gap-1">
                              {m.learn.map((l) => (
                                <li key={l} className="flex gap-2 leading-snug">
                                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                                  {l}
                                </li>
                              ))}
                            </ul>
                            <p className="leading-relaxed">
                              <span className="font-medium text-foreground">Assessment.</span> {m.assessment}
                            </p>
                          </div>
                        </details>
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums">{m.credits}</td>
                      <td className="whitespace-nowrap py-3 text-right tabular-nums text-muted-foreground">{t.weeks}</td>
                    </tr>
                  )),
                )}
              </tbody>
              <tfoot>
                <tr className="text-sm">
                  <td className="pt-3" />
                  <td className="pt-3 font-medium">Total</td>
                  <td className="pt-3 text-right font-medium tabular-nums">{TOTAL_CREDITS}</td>
                  <td className="pt-3 text-right text-muted-foreground">{creativeMediaLevel4.funding.weeks}</td>
                </tr>
              </tfoot>
            </table>
            <p className="text-xs leading-relaxed text-muted-foreground">Select a module title for the full outline. {STRUCTURE.note}</p>
            <ul className="grid gap-3 pt-4 text-sm sm:grid-cols-3">
              {[
                ['20 hours', 'in class each week, Monday to Thursday'],
                ['15 hours', 'guided studio time and portfolio work'],
                ['84%', 'of 2025 graduates in creative work or further study within six months'],
              ].map(([k, v]) => (
                <li key={k} className="flex flex-col gap-0.5 border-l-2 border-primary pl-3">
                  <span className="font-display text-2xl text-primary">{k}</span>
                  <span className="leading-snug text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl text-primary">Pathway to a degree</h3>
            <ol className="flex flex-col">
              {PATHWAY.map((p, i) => (
                <li key={p.level} className="flex flex-col">
                  <div
                    className={`flex flex-col gap-1 rounded-md border p-4 ${
                      i === 0 ? 'border-primary bg-primary-tint text-primary-tint-foreground' : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3 text-xs uppercase tracking-wide">
                      <span className={i === 0 ? 'font-medium' : 'text-muted-foreground'}>{p.level}</span>
                      <span className={i === 0 ? '' : 'text-muted-foreground'}>{p.length}</span>
                    </div>
                    <p className="font-medium leading-snug">{p.title}</p>
                    <p className={`text-sm ${i === 0 ? '' : 'text-muted-foreground'}`}>{p.note}</p>
                  </div>
                  {i < PATHWAY.length - 1 && (
                    <div className="flex justify-center py-1 text-muted-foreground" aria-hidden>
                      <ArrowDown className="size-4" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Progression from certificate to diploma is guaranteed with a pass. Entry to the Bachelor of Creative Innovation requires a
              diploma merit average. Post-Study Work Visa eligibility is set by Immigration New Zealand and applies to degree-level
              qualifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
