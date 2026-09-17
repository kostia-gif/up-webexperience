import Image from 'next/image'
import { COHORT, STORIES, type CountryProfile } from './data'
import { SectionHead } from './place'

export function Community({ country }: { country: CountryProfile }) {
  const story = STORIES[0]
  return (
    <section id="community" aria-labelledby="community-h" className="border-b border-border">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <SectionHead
          id="community-h"
          kicker="Student life"
          title="Who you will study with"
          lede="Classes are capped at 20. Roughly a third of each cohort is international, so you will be among people who have made the same move, without being in a class made up only of students from home."
        />

        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl text-primary">Where the 2026 cohort is from</h3>
            <ul className="flex flex-col gap-3">
              {COHORT.map((c) => (
                <li key={c.label} className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-baseline justify-between">
                    <span className={c.label === country.name ? 'font-medium text-primary' : ''}>{c.label}</span>
                    <span className="tabular-nums text-muted-foreground">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
                    <div className={`h-full ${c.label === country.name ? 'bg-coral' : 'bg-primary'}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <ul className="grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
              {[
                ['Buddy programme', 'Every new international student is paired with a second-year student from their home country or region.'],
                ['Student associations', `Chinese, Indian, Vietnamese and Korean student associations, plus a ${country.messaging} group for every intake.`],
                ['Weekly life', 'Friday industry talks, a weekend hiking club, and Lunar New Year and Diwali celebrated on campus.'],
                ['Faith and culture', 'A quiet reflection room and halal and vegetarian options in the student kitchen.'],
              ].map(([h, d]) => (
                <li key={h} className="flex flex-col gap-0.5">
                  <span className="font-medium">{h}</span>
                  <span className="leading-relaxed text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="grid gap-5 rounded-md border border-border bg-card p-6 sm:grid-cols-[180px_1fr]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
              <Image src={story.img} alt={`${story.name}, student from ${story.from}`} fill sizes="180px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <blockquote className="font-display text-xl leading-snug text-pretty">&ldquo;{story.quote}&rdquo;</blockquote>
              <figcaption className="flex flex-col gap-0.5 text-sm">
                <span className="font-medium">
                  {story.name} <span className="text-muted-foreground" lang="zh">{story.native}</span>
                </span>
                <span className="text-muted-foreground">
                  {story.from} · {story.course}
                </span>
              </figcaption>
              <a href="#enquire" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                Ask to speak with a current student from {country.code === 'OTHER' ? 'your region' : country.name}
              </a>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
