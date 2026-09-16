'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { IntlCountry } from '@/lib/course'
import { track } from '@/lib/track'
import { usePostgrad } from './context'

export const AU = 'AU'
export const OTHER = '__other'

const otherCountry: IntlCountry = { code: OTHER, name: 'your country', students: 0, utcOffset: 0, testimonials: [] }

type StudyFrom = {
  /** 'AU' for domestic, or an ISO country code from the international list. */
  code: string
  country: IntlCountry | null
  isIntl: boolean
  set: (code: string) => void
}

const Ctx = createContext<StudyFrom | null>(null)

export function StudyFromProvider({ children }: { children: ReactNode }) {
  const { pg } = usePostgrad()
  const [code, setCode] = useState(AU)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('from')
    if (fromUrl && (fromUrl === OTHER || pg.international?.countries.some((c) => c.code === fromUrl))) setCode(fromUrl)
  }, [pg.international])

  const set = useCallback((next: string) => {
    setCode(next)
    const url = new URL(window.location.href)
    if (next === AU) url.searchParams.delete('from')
    else url.searchParams.set('from', next)
    window.history.replaceState(null, '', url)
    track('study_from', { country: next })
  }, [])

  const value = useMemo<StudyFrom>(() => {
    const country = code === AU ? null : code === OTHER ? otherCountry : (pg.international?.countries.find((c) => c.code === code) ?? null)
    return { code, country, isIntl: country !== null, set }
  }, [code, pg.international, set])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStudyFrom() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStudyFrom must be used inside StudyFromProvider')
  return v
}

export function useIntl() {
  const { pg, course, money } = usePostgrad()
  const intl = pg.international
  if (!intl) throw new Error('useIntl requires postgrad.international')
  return { intl, pg, course, money }
}
