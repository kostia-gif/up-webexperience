import Image from 'next/image'
import { FEES, STEPS, type CountryProfile } from './data'
import { SectionHead } from './place'

function money(nzd: number, c: CountryProfile) {
  const nz = `NZ$${nzd.toLocaleString('en-NZ')}`
  if (c.code === 'NZ') return nz
  const local = Math.round((nzd * c.currency.perNzd) / 100) * 100
  return `${nz} (about ${c.currency.symbol}${local.toLocaleString('en')})`
}

export function Families({ country }: { country: CountryProfile }) {
  const items = [
    {
      h: 'Where students live',
      d: 'Approved homestays with New Zealand families (meals included), or the college-partnered student apartments on Symonds Street, an eight-minute walk from campus, with a resident manager and 24-hour security. Students under 18 must live in a homestay we have inspected.',
    },
    {
      h: 'Pastoral care',
      d: 'We are legally bound by the New Zealand Code of Practice for the Pastoral Care of International Learners. Every student has a named international advisor, attendance is monitored weekly, and families are contacted if we have any concern.',
    },
    {
      h: 'Health and insurance',
      d: 'Medical and travel insurance is compulsory and arranged through the college. A doctor visits campus twice a week; counsellors are available daily and speak Mandarin and Hindi.',
    },
    {
      h: 'Keeping families informed',
      d: `A ${country.messaging} channel for parents with monthly updates from the international office, an end-of-module progress report, and a family call ${country.callWindow}.`,
    },
  ]
  return (
    <section id="families" aria-labelledby="families-h" className="border-b border-border">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <SectionHead
          id="families-h"
          kicker="For parents and families"
          title="Where they will live, who will look after them, and how you will know"
        />
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted md:aspect-auto">
            <Image
              src="/images/yoobee-intl/accommodation.png"
              alt="A bright student apartment bedroom with a desk and a view over Auckland rooftops"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="grid gap-6 sm:grid-cols-2">
            {items.map((it) => (
              <div key={it.h} className="flex flex-col gap-2">
                <dt className="font-display text-xl text-primary">{it.h}</dt>
                <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">{it.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Admissions({ country }: { country: CountryProfile }) {
  const rows: [string, string, string?][] = [
    ['Tuition, full certificate', money(FEES.tuition, country), 'Fixed at your Offer of Place. Two instalments available.'],
    ['Materials and software', money(FEES.materials, country), 'Adobe and Autodesk licences, drawing tablet loan.'],
    ['Medical and travel insurance', money(FEES.insurance, country), 'Compulsory. Arranged through the college.'],
    ['Living costs, indicative', money(FEES.livingPerYear, country) + ' per year', 'Immigration New Zealand minimum for a student visa.'],
  ]
  const reqs: [string, string][] = [
    ['Age', '17 or older on the first day of class (16 with a guardian)'],
    ['Academic', 'Completed senior secondary school, for example Gaokao, Class 12, or equivalent'],
    ['English', 'IELTS 5.5 overall with no band below 5.0, or equivalent. Our English pathway can bring you to this level.'],
    ['Portfolio', 'Not required. We ask for a short written statement of interest.'],
  ]
  return (
    <section id="admissions" aria-labelledby="admissions-h" className="border-b border-border bg-muted/40">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-14 md:py-16">
        <SectionHead
          id="admissions-h"
          kicker="Admissions and fees"
          title={`Entry requirements, fees, and the steps from enquiry to arrival for ${FEES.intake}`}
          lede={`Applications close ${FEES.applyBy}. Fees are shown in New Zealand dollars${country.code !== 'NZ' ? ` with an indicative ${country.currency.code} equivalent` : ''}.`}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl text-primary">Fees for 2027</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {rows.map(([k, v, note]) => (
                  <tr key={k} className="border-b border-border align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-medium">
                      {k}
                      {note && <span className="block text-xs font-normal leading-snug text-muted-foreground">{note}</span>}
                    </th>
                    <td className="py-3 text-right tabular-nums">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Currency conversions are indicative only. Tuition refunds follow the NZQA-mandated schedule: full refund before the course
              starts, less an administration fee; pro-rata refund in the first ten working days.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl text-primary">Entry requirements</h3>
            <dl className="flex flex-col divide-y divide-border border-y border-border text-sm">
              {reqs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[100px_1fr] gap-4 py-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-display text-xl text-primary">From enquiry to arrival</h3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-4 rounded-md border border-border bg-card p-4">
                <span className="font-display text-2xl leading-none text-coral tabular-nums">{i + 1}</span>
                <span className="flex flex-col gap-1 text-sm">
                  <span className="font-medium">{s.t}</span>
                  <span className="leading-relaxed text-muted-foreground">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
