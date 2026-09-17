import Image from 'next/image'
import { FEES, TRUST, type CountryProfile } from './data'

export function IntlHero({ country }: { country: CountryProfile }) {
  const facts: [string, string][] = [
    ['Qualification', 'NZ Certificate in Digital Media and Design, Level 4'],
    ['Awarding body', 'New Zealand Qualifications Authority'],
    ['Campus', 'City Road, central Auckland'],
    ['Next intake', FEES.intake],
    ['Duration', `${FEES.weeks} weeks, full time`],
    ['Pathway', 'Diploma, then Bachelor degree'],
  ]
  return (
    <section aria-labelledby="hero-h" className="border-b border-border">
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
        <Image
          src="/images/yoobee-intl/campus-exterior.png"
          alt="Yoobee College campus building on City Road in central Auckland, with students arriving in the morning"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-12 md:grid-cols-[1.3fr_1fr] md:py-16">
        <div className="flex flex-col gap-6">
          {country.greeting && (
            <p className="font-display text-xl text-coral" lang={country.lang.code}>
              {country.greeting}
            </p>
          )}
          <h1 id="hero-h" className="font-display text-4xl leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-[3.5rem]">
            A creative education in Auckland, New Zealand, with a clear path to a degree
          </h1>
          <p className="max-w-[58ch] text-lg leading-relaxed text-pretty text-muted-foreground">
            Yoobee has taught design, animation and film in Auckland since 1988. Our certificate is the first step on a guaranteed pathway to
            a Bachelor of Creative Innovation, in one of the safest and most liveable cities in the world.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Request a family video call
            </a>
            <a
              href="#campus"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary px-6 text-sm font-medium text-primary hover:bg-primary-tint"
            >
              Take the campus tour
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-y-0 self-start border-t border-border text-sm">
          {facts.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[120px_1fr] gap-4 border-b border-border py-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-secondary">
        <ul className="mx-auto grid max-w-[1180px] gap-x-10 gap-y-4 px-6 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t.k} className="flex flex-col gap-1">
              <span className="font-display text-xl text-primary">{t.k}</span>
              <span className="leading-snug text-secondary-foreground">{t.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
