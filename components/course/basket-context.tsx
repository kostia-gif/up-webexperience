'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AiPerkOption, MicroCredential } from '@/lib/course'
import { track } from '@/lib/track'

export type BasketIntake = { date: string; mode: string }

type Basket = {
  intake: BasketIntake | null
  ai: AiPerkOption | null
  micro: MicroCredential[]
  open: boolean
  setIntake: (i: BasketIntake | null) => void
  setAi: (o: AiPerkOption | null) => void
  toggleMicro: (m: MicroCredential) => void
  hasMicro: (id: string) => boolean
  setOpen: (o: boolean) => void
  count: number
}

const BasketContext = createContext<Basket | null>(null)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [intake, setIntakeState] = useState<BasketIntake | null>(null)
  const [ai, setAiState] = useState<AiPerkOption | null>(null)
  const [micro, setMicro] = useState<MicroCredential[]>([])
  const [open, setOpen] = useState(false)

  const setIntake = useCallback((i: BasketIntake | null) => {
    setIntakeState(i)
    if (i) track('basket_add', { item: 'intake', date: i.date, mode: i.mode })
  }, [])

  const setAi = useCallback((o: AiPerkOption | null) => {
    setAiState(o)
    if (o) track('basket_add', { item: 'ai', id: o.id })
  }, [])

  const toggleMicro = useCallback((m: MicroCredential) => {
    setMicro((prev) => {
      const has = prev.some((x) => x.id === m.id)
      track(has ? 'basket_remove' : 'basket_add', { item: 'micro', id: m.id })
      return has ? prev.filter((x) => x.id !== m.id) : [...prev, m]
    })
  }, [])

  const hasMicro = useCallback((id: string) => micro.some((m) => m.id === id), [micro])

  const value = useMemo<Basket>(
    () => ({
      intake,
      ai,
      micro,
      open,
      setIntake,
      setAi,
      toggleMicro,
      hasMicro,
      setOpen,
      count: (intake ? 1 : 0) + (ai ? 1 : 0) + micro.length,
    }),
    [intake, ai, micro, open, setIntake, setAi, toggleMicro, hasMicro],
  )

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket() {
  const ctx = useContext(BasketContext)
  if (!ctx) throw new Error('useBasket must be used inside BasketProvider')
  return ctx
}
