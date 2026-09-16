'use client'

import { Award, Check, ChefHat, Mail, MapPin, Phone, Plus } from 'lucide-react'
import { isEnriched, type CvDocument, type CvProfile } from '@/lib/cv'
import { useCourse } from './course-context'

export function CvPaper({ cv, profile, onRefine }: { cv: CvDocument; profile: CvProfile; onRefine?: () => void }) {
  const initials = `${profile.firstName[0] ?? ''}${profile.lastName[0] ?? ''}`.toUpperCase()
  const enriched = isEnriched(profile)
  const hasSchool = cv.education.length > 1
  const hasWork = cv.experience.length > 0
  return (
    <article className="overflow-hidden rounded-md bg-background shadow-md" aria-label="Your draft CV">
      <header className="flex flex-col gap-5 bg-foreground px-7 py-7 text-background md:px-9">
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-coral font-display text-2xl font-bold text-coral-foreground"
          >
            {initials}
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-balance md:text-4xl">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm font-medium leading-snug text-coral">{cv.headline}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-background/80">
          <li className="inline-flex items-center gap-1.5">
            <Mail className="size-3.5" aria-hidden /> {profile.email}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" aria-hidden /> {profile.mobile}
          </li>
          {profile.location && (
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden /> {profile.location}
            </li>
          )}
        </ul>
      </header>

      <div className="flex flex-col gap-7 px-7 py-7 md:grid md:grid-cols-12 md:gap-x-8 md:px-9">
        <div className="flex flex-col gap-7 md:col-span-7">
          <section className="flex flex-col gap-3">
            <SectionTitle>Why hire me</SectionTitle>
            <ul className="flex flex-col gap-2">
              {cv.whyHireMe.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug">
                  <Check className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <SectionTitle>Profile</SectionTitle>
            <p className="text-sm leading-relaxed text-pretty">{cv.summary}</p>
          </section>

          <section className="flex flex-col gap-3">
            <SectionTitle>Training and education</SectionTitle>
            {cv.education.map((e) => (
              <Entry key={e.title} title={e.title} sub={e.provider} dates={e.dates} bullets={e.bullets} />
            ))}
            {!hasSchool && !enriched && (
              <Ghost onClick={onRefine} title="Your high school" sub="School name, NCEA level, anything you were known for" />
            )}
          </section>

          <section className="flex flex-col gap-3">
            <SectionTitle>Experience</SectionTitle>
            {cv.experience.map((x) => (
              <Entry key={`${x.title}-${x.org}`} title={x.title} sub={x.org} dates={x.dates} bullets={x.bullets} />
            ))}
            {!hasWork && (
              <>
                <Ghost
                  onClick={onRefine}
                  title="Your first job"
                  sub="Part-time, casual or holiday work all counts"
                  lines={['What you did, who for, roughly when', 'What it taught you about pace, people or turning up']}
                />
                {!enriched && <Ghost onClick={onRefine} title="Outside work" sub="Sport, volunteering, whānau, cooking at home" />}
              </>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-7 border-t border-border pt-7 md:col-span-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <section className="flex flex-col gap-3">
            <SectionTitle icon={<ChefHat className="size-3.5" aria-hidden />}>Ready on day one</SectionTitle>
            <ul className="flex flex-col gap-1.5 text-sm leading-snug">
              {cv.dayOne.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <SectionTitle>Kitchen skills</SectionTitle>
            <ul className="flex flex-wrap gap-1.5">
              {cv.skills.map((s) => (
                <li key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {cv.certifications.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionTitle icon={<Award className="size-3.5" aria-hidden />}>Certifications</SectionTitle>
              <ul className="flex flex-col gap-2">
                {cv.certifications.map((c) => (
                  <li key={c.name} className="flex flex-col text-sm leading-snug">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cv.extras.length > 0 && (
            <section className="flex flex-col gap-2">
              <SectionTitle>Availability and more</SectionTitle>
              <ul className="flex flex-col gap-1 text-sm leading-snug">
                {cv.extras.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <p className="border-t border-border px-7 py-3 text-xs text-muted-foreground md:px-9">
        Draft built by AI from what this course teaches. Check every line before you send it to an employer.
      </p>
    </article>
  )
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-1.5 border-b-2 border-foreground pb-1 font-display text-xs font-bold uppercase tracking-wide">
      {icon}
      {children}
    </h4>
  )
}

function Ghost({ title, sub, lines = [], onClick }: { title: string; sub: string; lines?: string[]; onClick?: () => void }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[15px] font-medium leading-snug text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground/80">{sub}</p>
        </div>
        {onClick && (
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground group-hover:border-primary group-hover:text-primary">
            <Plus className="size-4" aria-hidden />
          </span>
        )}
      </div>
      {lines.length > 0 && (
        <ul className="flex flex-col gap-1 pl-4 text-sm leading-relaxed text-muted-foreground/70">
          {lines.map((l) => (
            <li key={l} className="list-disc">
              {l}
            </li>
          ))}
        </ul>
      )}
    </>
  )
  const cls = 'flex w-full flex-col gap-1.5 rounded-md border border-dashed border-border bg-muted/50 px-3 py-2.5 text-left'
  if (!onClick) return <div className={cls}>{body}</div>
  return (
    <button type="button" onClick={onClick} className={`group ${cls} hover:border-primary hover:bg-primary-tint`} aria-label={`Add ${title.toLowerCase()}`}>
      {body}
    </button>
  )
}

function Entry({ title, sub, dates, bullets }: { title: string; sub: string; dates: string; bullets: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-0.5">
        <p className="text-[15px] font-medium leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground">
          {sub}
          {dates ? ` · ${dates}` : ''}
        </p>
      </div>
      {bullets.length > 0 && (
        <ul className="flex flex-col gap-1 pl-4 text-sm leading-relaxed">
          {bullets.map((b) => (
            <li key={b} className="list-disc">
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CvSkeleton() {
  return (
    <div className="overflow-hidden rounded-md bg-background shadow-md" aria-label="Building your CV">
      <p className="sr-only">Building your CV</p>
      <div className="flex items-start gap-5 bg-foreground px-7 py-7">
        <div className="size-16 shrink-0 animate-pulse rounded-full bg-background/20" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-8 w-2/3 animate-pulse rounded bg-background/20" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-background/20" />
        </div>
      </div>
      <div className="grid gap-x-8 gap-y-6 px-7 py-7 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          {[3, 4, 3].map((n, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              {Array.from({ length: n }).map((_, j) => (
                <div key={j} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${90 - j * 8}%` }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 md:col-span-5">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CvPlaceholder() {
  const { stages, cv } = useCourse()
  const sample = stages.flatMap((s) => s.items.map((i) => i.can)).slice(0, 6)
  return (
    <div className="overflow-hidden rounded-md border border-dashed border-border bg-background/70">
      <div className="flex items-start gap-5 border-b border-dashed border-border px-7 py-7">
        <span aria-hidden className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted font-display text-2xl font-bold text-muted-foreground/50">
          ?
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-muted-foreground/50">Your name here</p>
          <p className="text-sm font-medium text-muted-foreground">{cv?.targetRole}, ready for a real kitchen</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-7 py-7">
        <div className="flex flex-col gap-2">
          <h4 className="border-b-2 border-border pb-1 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">Ready on day one</h4>
          <ul className="flex flex-col gap-1.5 text-sm leading-snug text-muted-foreground">
            {cv?.dayOne.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="border-b-2 border-border pb-1 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">Already on it</h4>
          <ul className="flex flex-wrap gap-1.5">
            {sample.map((s) => (
              <li key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </div>
        {cv?.certifications.length ? (
          <div className="flex flex-col gap-2">
            <h4 className="border-b-2 border-border pb-1 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">Certifications included</h4>
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {cv.certifications.map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="text-sm leading-relaxed text-muted-foreground">
          Add your name and contact details on the left and we draft the rest: why a head chef should hire you, what you can do on day one, and every
          certificate you leave with.
        </p>
      </div>
    </div>
  )
}
