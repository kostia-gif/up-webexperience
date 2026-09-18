'use client'

import { useCourse } from '../course-context'
import { PathwayBuilder, type PBChoice, type PBCovered } from './pathway-builder'

const SETTINGS: PBChoice[] = [
  { id: 'home', label: 'Home studio', note: 'Treat clients from a room at home.' },
  { id: 'rent', label: 'Rent a chair or room', note: 'A space inside an existing salon.' },
  { id: 'salon', label: 'Your own salon', note: 'A fitted-out space with your name on it.' },
  { id: 'mobile', label: 'Mobile or pop-up', note: 'You travel to clients and events.' },
]

const SPECIALTIES: PBChoice[] = [
  { id: 'facials', label: 'Facials & skin' },
  { id: 'waxing', label: 'Waxing & brows' },
  { id: 'nails', label: 'Nails' },
  { id: 'massage', label: 'Massage & spa' },
]

const NEEDS: Record<string, string[]> = {
  home: [
    'Council consent for a home business, and landlord or body-corporate sign-off',
    'Public liability and treatment (malpractice) insurance',
    'A registered business and IRD / GST set-up',
    'A hygienic treatment room, bed and basic equipment',
    'Online booking, payments and client records',
  ],
  rent: [
    'A chair- or room-rental agreement with the salon',
    'Your own public liability and treatment insurance',
    'A registered business for your rental income',
    'Your own kit and product stock',
    'Your own bookings and social presence (reception may help)',
  ],
  salon: [
    'A lease and a compliant, fitted-out premises',
    'Council and health / hygiene approvals for the site',
    'Business and public liability insurance, plus staff cover if you hire',
    'Fit-out, stock and equipment finance',
    'A brand, website and local marketing to fill the book',
  ],
  mobile: [
    'A registered business and mobile-appropriate insurance',
    'Portable, sanitisable equipment and a reliable vehicle',
    'Clear travel areas, pricing and a booking system',
    'Event or venue permissions where you work',
    'Social media and a referral network to stay booked',
  ],
}

/**
 * Elite "map your clinic" planner. Same shared PathwayBuilder as AIPC's
 * practice planner, themed for a beauty therapist opening their own place.
 */
export function ClinicBuilder() {
  const course = useCourse()
  const level = course.formal.level
  const credits = course.formal.credits

  const baseCovered: PBCovered[] = [
    {
      t: `A recognised NZ Certificate (Level ${level}, ${credits} credits)`,
      s: 'The qualification salons and spas hire against, and direct entry to Level 5.',
    },
    {
      t: 'Real client hours in the training clinic',
      s: 'You have consulted, treated and rebooked paying clients before you ever open your own doors.',
    },
    {
      t: 'Hygiene and consultation to industry standard',
      s: 'Sterilisation, contraindications and consent (BT401) — the safety base any premises needs.',
    },
    {
      t: 'Salon operations and employability (BT407)',
      s: 'Bookings, retail, stock and client records — how a treatment day actually runs.',
    },
  ]

  return (
    <PathwayBuilder
      id="clinic"
      eyebrow="Thinking of running your own place?"
      title="Map your training to the clinic you want"
      intro="Lots of therapists end up working for themselves. Tell us the kind of place you have in mind and we'll show what the certificate already gives you, and the business pieces you line up yourself."
      settingLegend="What do you want to run?"
      settings={SETTINGS}
      specialtyLegend="What will you be known for?"
      specialtyHint="Pick your signature services"
      specialties={SPECIALTIES}
      cap={3}
      baseCovered={baseCovered}
      specialtyCoveredNote="A signature service you have already delivered on real clinic clients."
      needsBySetting={NEEDS}
      givesTitle="The certificate gives you"
      needsTitle="You line up yourself"
      footnote="Your BT407 tutor and Elite's salon network are a good first port of call for the business side. The certificate makes you a therapist; these turn it into a business."
      ctaHref="#talk"
      ctaLabel="Talk it through with an advisor"
      ctaNote="They can help you plan the first steps and where to start."
      revealLabel="Show how my training maps to it"
      trackPrefix="clinic"
    />
  )
}
