import { Instrument_Serif, Outfit, Syne } from 'next/font/google'
import type { BrandKey } from './registry'

// Stand-ins for AIPC's licensed faces: Neulis Sans (geometric sans) and IvyPresto Display italic.
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-aipc', display: 'swap' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-aipc-serif',
  display: 'swap',
})
const syne = Syne({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-yoobee', display: 'swap' })

export const BRAND_FONTS: Record<BrandKey, string> = {
  aipc: `${outfit.variable} ${instrumentSerif.variable}`,
  yoobee: syne.variable,
  // NZST uses the root Barlow Condensed display face loaded in the root layout.
  nzst: '',
}

export const ALL_BRAND_FONTS = `${BRAND_FONTS.aipc} ${BRAND_FONTS.yoobee}`
