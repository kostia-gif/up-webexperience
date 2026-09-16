import { Instrument_Serif, Outfit } from 'next/font/google'

// Stand-ins for AIPC's licensed faces: Neulis Sans (geometric sans, 600 headings) and IvyPresto Display italic (accent words).
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-aipc',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-aipc-serif',
  display: 'swap',
})

export const aipcFonts = `${outfit.variable} ${instrumentSerif.variable}`
