'use client'

import { useSyncExternalStore } from 'react'

/**
 * Tiny session-scoped store that lets the sticky StartBar and the floating
 * SeeItCard coordinate on mobile: only one shows at a time, and once the
 * visitor submits any form on the page the card is suppressed. Resets on
 * reload, which is the intended "for the session" behaviour.
 */
type State = { submitted: boolean; cardVisible: boolean }

let state: State = { submitted: false, cardVisible: false }
const listeners = new Set<() => void>()

function set(patch: Partial<State>) {
  const next = { ...state, ...patch }
  if (next.submitted === state.submitted && next.cardVisible === state.cardVisible) return
  state = next
  listeners.forEach((l) => l())
}

export const floating = {
  markSubmitted: () => set({ submitted: true }),
  setCardVisible: (visible: boolean) => set({ cardVisible: visible }),
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useFloating(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  )
}
