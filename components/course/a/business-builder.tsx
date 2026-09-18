'use client'

import { usePostgrad } from '../postgrad/context'
import { PathwayBuilder, type PBChoice, type PBCovered } from './pathway-builder'

const SETTINGS: PBChoice[] = [
  { id: 'solo', label: 'Solo private practice', note: 'Your own clients, your own room.' },
  { id: 'group', label: 'Group or shared clinic', note: 'Practising alongside others.' },
  { id: 'online', label: 'Online / telehealth', note: 'See clients from anywhere.' },
  { id: 'community', label: 'Community or NGO role', note: 'Employed or contracted in a service.' },
]

const BASE_COVERED: PBCovered[] = [
  {
    t: 'A recognised, ACA-accredited Master',
    s: 'You graduate straight into Australian Counselling Association membership and registration, the credential clients and insurers look for.',
  },
  {
    t: '168 hours of supervised placement',
    s: 'Real client hours with agency supervision (MC10), the practice base every association and insurer expects before you go out on your own.',
  },
  {
    t: 'Ethics, confidentiality and client rights',
    s: 'MC04 covers the professional and legal boundaries your own practice runs on day to day.',
  },
  {
    t: 'Assessment, planning and referral',
    s: 'MC08 is how you decide what belongs in your room and what to refer on, so you practise within your scope.',
  },
]

const NEEDS: Record<string, string[]> = {
  solo: [
    'An ABN and a sole-trader or company structure',
    'Professional indemnity and public liability insurance',
    'Consulting rooms, or a room-hire arrangement',
    'Bookkeeping, invoicing, GST and tax',
    'Practice-management software and secure client notes',
    'A website and a referral network to bring clients in',
  ],
  group: [
    'An associate or room-hire agreement with the clinic',
    'Your own professional indemnity cover',
    'An ABN for your contractor income',
    'A share of reception, bookings and billing (often handled by the clinic)',
    'A profile on the clinic’s site and the main directories',
  ],
  online: [
    'A secure, compliant telehealth and online-booking platform',
    'An ABN and a business structure',
    'Professional indemnity cover that includes telehealth',
    'Clear online intake, consent and privacy processes',
    'A website and digital marketing to reach clients',
  ],
  community: [
    'Usually little — you are employed or contracted, so the org carries insurance and premises',
    'Current ACA registration and any police or working-with-children checks',
    'Your own supervision arrangement (often provided by the service)',
  ],
}

/**
 * AIPC "start your own practice" planner, built on the shared PathwayBuilder.
 * Specialisations come from the course's elective units so the mapping is real.
 */
export function BusinessBuilder() {
  const { pg } = usePostgrad()
  const electives = pg.units.filter((u) => u.elective)
  const specialties: PBChoice[] = electives.map((u) => ({
    id: u.code,
    label: u.title.replace(/^Counselling (for |Skills for )?/, '').replace(/^the /, ''),
  }))

  return (
    <PathwayBuilder
      id="practice"
      eyebrow="Studying to start your own practice?"
      title="Map the degree to the practice you want"
      intro="Plenty of graduates want to work for themselves. Tell us the kind of counselling practice you have in mind and we'll show what the Master of Counselling already builds for you, and the few business pieces you line up yourself."
      settingLegend="What do you want to build?"
      settings={SETTINGS}
      specialtyLegend="Who do you want to work with?"
      specialtyHint={`Pick up to ${pg.structure.electivesRequired}`}
      specialties={specialties}
      cap={pg.structure.electivesRequired}
      baseCovered={BASE_COVERED}
      specialtyCoveredNote="One of your four specialisations, practised at depth on real clients."
      needsBySetting={NEEDS}
      givesTitle="The Master gives you"
      needsTitle="You line up yourself"
      footnote="Your placement supervisor and AIPC's alumni network are good first ports of call for the business side. The degree makes you a counsellor; these turn it into a practice."
      ctaHref="#specialist"
      ctaLabel="Talk this through with a specialist"
      ctaNote="They can sanity-check your plan and point you to the right specialisations."
      revealLabel="Show how the degree maps to it"
      trackPrefix="practice"
    />
  )
}
