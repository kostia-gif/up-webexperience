import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { PostgradStoryPage } from '@/components/course/course-page'
import { courseHref } from '@/lib/course'
import { masterOfCounselling as course } from '@/lib/courses'
import { aipcFonts } from '../../fonts'

const stories = course.postgrad?.international?.caseStudies ?? []

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const story = stories.find((s) => s.slug === slug)
  if (!story) return {}
  return {
    title: `${story.name}: ${story.headline} | ${course.brand.name}`,
    description: story.standfirst,
  }
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ from?: string }> }) {
  const { slug } = await params
  const { from } = await searchParams
  const story = stories.find((s) => s.slug === slug)
  if (!story) notFound()

  const country = course.postgrad?.international?.countries.find((c) => c.code === story.countryCode)
  const backHref = `${courseHref(course)}${from ? `?from=${encodeURIComponent(from)}` : ''}`
  const others = stories.filter((s) => s.slug !== story.slug)

  return (
    <div className={aipcFonts}>
      <PostgradStoryPage course={course}>
        <main className="bg-background">
          <article className="mx-auto max-w-[1200px] px-6 py-8 md:py-12">
            <Link href={backHref} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:underline-offset-4">
              <ArrowLeft className="size-4" aria-hidden /> Back to the Master of Counselling
            </Link>

            <header className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="flex flex-col gap-4 md:col-span-7">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Graduate story · From {country?.name ?? story.from} to Australia
                </p>
                <h1 className="font-display text-4xl leading-[1.05] tracking-(--display-tracking) text-balance md:text-5xl">{story.headline}</h1>
                <p className="max-w-[640px] text-lg leading-relaxed text-pretty text-muted-foreground">{story.standfirst}</p>
                <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm sm:grid-cols-4">
                  <Fact k="From" v={story.from} />
                  <Fact k="Now" v={story.now} />
                  <Fact k="Works at" v={story.employer} />
                  <Fact k="Graduated" v={story.graduated} />
                </dl>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg md:col-span-5">
                <Image src={story.image.src} alt={story.image.alt} fill priority sizes="(max-width: 768px) 100vw, 480px" className="object-cover" />
              </div>
            </header>

            <div className="mt-12 grid gap-10 md:grid-cols-12">
              <div className="flex flex-col gap-8 md:col-span-7">
                {story.sections.map((s) => (
                  <section key={s.h} className="flex flex-col gap-2">
                    <h2 className="font-display text-2xl leading-tight">{s.h}</h2>
                    <p className="text-[17px] leading-relaxed text-pretty">{s.body}</p>
                  </section>
                ))}
                <blockquote className="flex gap-4 rounded-lg bg-primary-tint p-6 text-primary-tint-foreground">
                  <Quote className="size-6 shrink-0 text-coral" aria-hidden />
                  <p className="font-display text-2xl leading-snug text-balance">{story.quote}</p>
                </blockquote>
              </div>

              <aside className="flex flex-col gap-6 md:col-span-5">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h2 className="text-sm font-medium">How it unfolded</h2>
                  <ol className="mt-4 flex flex-col gap-4">
                    {story.timeline.map((t, i) => (
                      <li key={t.when} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{i + 1}</span>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t.when}</p>
                          <p className="text-sm leading-snug">{t.what}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col gap-3 rounded-lg bg-primary p-5 text-primary-foreground">
                  <p className="font-display text-2xl leading-tight text-balance">
                    {country ? `${country.students} students from ${country.name}` : 'Students from 41 countries'} have studied this degree in the last two years.
                  </p>
                  <p className="text-sm text-primary-foreground/85">Same course, same lecturers, same qualification. Fees and support shown for your country.</p>
                  <Link
                    href={`${backHref.split('?')[0]}?from=${story.countryCode}#intl-fees`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-medium text-coral-foreground hover:opacity-90"
                  >
                    See fees for {country?.name ?? 'my country'} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link href={`${backHref.split('?')[0]}?from=${story.countryCode}#international`} className="text-sm font-medium underline underline-offset-4 hover:no-underline">
                    Talk to the international team
                  </Link>
                </div>

                {others.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-medium">Another story</h2>
                    {others.map((o) => (
                      <Link
                        key={o.slug}
                        href={`${backHref.split('?')[0]}/stories/${o.slug}${from ? `?from=${encodeURIComponent(from)}` : ''}`}
                        className="group flex gap-4 rounded-lg border border-border bg-card p-3 hover:border-foreground/40"
                      >
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-md">
                          <Image src={o.image.src} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium leading-snug text-balance group-hover:underline group-hover:underline-offset-4">{o.headline}</p>
                          <p className="text-xs text-muted-foreground">
                            {o.name}, from {o.from}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </aside>
            </div>

            <p className="mt-12 border-t border-border pt-4 text-xs text-muted-foreground">
              Published with {story.name.split(' ')[0]}&apos;s written consent. Details are placeholder for this prototype. Individual outcomes vary; studying a
              course does not guarantee employment or a visa outcome.
            </p>
          </article>
        </main>
      </PostgradStoryPage>
    </div>
  )
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-muted-foreground">{k}</dt>
      <dd className="font-medium leading-snug">{v}</dd>
    </div>
  )
}
