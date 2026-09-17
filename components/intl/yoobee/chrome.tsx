import Link from 'next/link'
import { Globe, Phone } from 'lucide-react'
import { NAV, type CountryProfile } from './data'

export function IntlHeader({ country }: { country: CountryProfile }) {
  const isIntl = country.code !== 'NZ'
  return (
    <header className="border-b border-border bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2 text-xs">
          <p className="flex items-center gap-2">
            <Globe className="size-3.5" aria-hidden />
            <span>
              International edition{isIntl ? ` · Viewing from ${country.name}` : ''}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a href="tel:+6493730888" className="hidden items-center gap-1.5 sm:flex">
              <Phone className="size-3.5" aria-hidden /> +64 9 373 0888
            </a>
            <div className="flex items-center gap-1" role="group" aria-label="Language">
              <span className="rounded-sm bg-primary-foreground/15 px-2 py-0.5 font-medium" aria-current="true">
                English
              </span>
              {country.lang.code !== 'en' && (
                <button type="button" className="rounded-sm px-2 py-0.5 hover:bg-primary-foreground/15" lang={country.lang.code}>
                  {country.lang.label}
                </button>
              )}
            </div>
            <Link href="/courses/design/creative-media-certificate" className="underline-offset-4 hover:underline">
              New Zealand site
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-6 px-6 py-5">
        <Link href="/international/yoobee" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center border-2 border-primary font-display text-xl text-primary" aria-hidden>
            Y
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl text-primary">Yoobee College</span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              of Creative Innovation · Auckland · Est. 1988
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="border-b-2 border-transparent pb-1 text-foreground hover:border-coral">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#enquire"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Request a family call
        </a>
      </div>
      <div className="h-[3px] bg-coral" aria-hidden />
    </header>
  )
}

export function IntlFooter() {
  const cols = [
    { h: 'Study', links: ['Certificates', 'Diplomas', 'Bachelor of Creative Innovation', 'English language pathway'] },
    { h: 'International', links: ['Admissions', 'Fees and scholarships', 'Visas and insurance', 'Accommodation', 'Agents and partners'] },
    { h: 'About', links: ['Governance', 'NZQA and quality', 'Pastoral care code', 'Annual report', 'Contact'] },
  ]
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <p className="font-display text-2xl">Yoobee College of Creative Innovation</p>
          <p className="max-w-[36ch] text-sm leading-relaxed text-primary-foreground/80">
            3 City Road, Grafton, Auckland 1010, New Zealand. Part of UP Education. An NZQA Category 1 provider and signatory to the Code of
            Practice for the Pastoral Care of Tertiary and International Learners.
          </p>
          <p className="text-xs text-primary-foreground/60">Provider code 7146 · MoE number 8462</p>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="flex flex-col gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">{c.h}</p>
            <ul className="flex flex-col gap-2 text-sm">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-primary-foreground/90 underline-offset-4 hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
