import Image from 'next/image'
import type { CountryProfile } from './data'

export function SectionHead({ id, kicker, title, lede }: { id: string; kicker: string; title: string; lede?: string }) {
  return (
    <div className="flex max-w-[64ch] flex-col gap-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-coral">{kicker}</p>
      <h2 id={id} className="font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {lede && <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">{lede}</p>}
    </div>
  )
}

export function Welcome() {
  return (
    <section aria-labelledby="welcome-h" className="border-b border-border">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 md:grid-cols-[220px_1fr] md:py-16">
        <div className="relative aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-md bg-muted">
          <Image src="/images/yoobee-intl/principal.png" alt="Portrait of Dr Sarah Ngata, Principal" fill sizes="220px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-coral">A welcome from the Principal</p>
          <h2 id="welcome-h" className="font-display text-2xl leading-snug text-balance md:text-3xl">
            &ldquo;Families are choosing more than a course. They are choosing a city, a community and the people who will look after their
            child. We take that seriously.&rdquo;
          </h2>
          <p className="max-w-[64ch] text-[15px] leading-relaxed text-pretty text-muted-foreground">
            Yoobee is not a university, and we do not pretend to be one. We are a specialist college with small classes, tutors who work in
            industry, and a degree pathway approved by the New Zealand Qualifications Authority. About a third of our students come from
            overseas. Our international office will know your name before you arrive, and your family will have a direct line to a real person
            in your own language for the whole time you are with us.
          </p>
          <div className="flex flex-col gap-0.5 text-sm">
            <p className="font-medium">Dr Sarah Ngata</p>
            <p className="text-muted-foreground">Principal, Yoobee College of Creative Innovation</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Place({ country }: { country: CountryProfile }) {
  const facts: [string, string][] = [
    ['Population', '1.7 million; 40% born overseas'],
    ['Safety', 'New Zealand ranks 4th on the Global Peace Index'],
    ['Climate', 'Mild: 8 to 24°C, no snow, four distinct seasons'],
    ['Liveability', 'Top 10 in the Economist Global Liveability Index every year since 2015'],
  ]
  return (
    <section id="place" aria-labelledby="place-h" className="border-b border-border">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <SectionHead
          id="place-h"
          kicker="Auckland, Tāmaki Makaurau"
          title="A harbour city that is safe, green and closer than you think"
          lede="The campus is in the centre of Auckland, a ten-minute walk from the university quarter, the Art Gallery and the harbour. It is a city students can navigate on foot and by bus, in daylight and in the evening."
        />

        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted md:aspect-auto md:min-h-[420px]">
            <Image
              src="/images/yoobee-intl/auckland-harbour.png"
              alt="Auckland skyline and Sky Tower across the Waitematā Harbour at golden hour"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
              <Image
                src="/images/yoobee-intl/students-community.png"
                alt="Students sitting together on the campus steps"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <dl className="grid gap-3 rounded-md border border-border p-5 text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {country.code !== 'NZ' && (
          <div className="grid gap-6 border-t border-border pt-8 md:grid-cols-3">
            {[
              ['Getting here', country.flight],
              ['Staying in touch', country.timezone],
              [`Feeling at home`, country.community],
            ].map(([h, body]) => (
              <div key={h} className="flex flex-col gap-2">
                <h3 className="font-display text-xl text-primary">{h}</h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
