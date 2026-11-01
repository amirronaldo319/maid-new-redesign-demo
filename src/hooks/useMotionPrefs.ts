import { useReducedMotion } from 'motion/react'

/**
 * Motion language. Springs, not durations, for anything the visitor touches:
 *  - `snap`   critically damped (no overshoot): menus, tabs, toggles, layout shifts.
 *  - `sheet`  slightly under-damped: sheets and dialogs arriving with intent.
 *  - `soft`   slow and calm: content entering the page.
 * Reduced motion swaps movement for short cross-fades.
 */
export const ease = [0.22, 1, 0.36, 1] as const
export const springs = {
  snap: { type: 'spring', duration: 0.42, bounce: 0 },
  sheet: { type: 'spring', duration: 0.5, bounce: 0.14 },
  soft: { type: 'spring', duration: 0.9, bounce: 0 },
} as const
export const fade = { duration: 0.18, ease: 'easeOut' } as const

export function useMotionPrefs() {
  const reduce = !!useReducedMotion()
  return { reduce, dur: (s: number) => (reduce ? 0 : s), spring: (k: keyof typeof springs) => (reduce ? fade : springs[k]) }
}
