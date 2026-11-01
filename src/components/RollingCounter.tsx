import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useMotionPrefs } from '../hooks/useMotionPrefs'

/** Odometer-style number. Digits roll up from 0 when scrolled into view. */
export function RollingCounter({ value, suffix = '', label }: { value: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const { reduce } = useMotionPrefs()
  const on = seen || reduce
  return (
    <div ref={ref} className="text-center">
      <p className="flex items-baseline justify-center font-serif text-[clamp(3rem,7vw,5rem)] leading-none text-forest">
        <span className="sr-only">{value}{suffix}</span>
        {[...value].map((ch, i) => /\d/.test(ch) ? (
          <span key={i} aria-hidden className="inline-block h-[1em] overflow-hidden tabular-nums">
            <span className="flex flex-col" style={{ transform: `translateY(${on ? -Number(ch) * 10 : 0}%)`, transition: reduce ? 'none' : `transform 1.6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s` }}>
              {Array.from({ length: 10 }, (_, d) => <span key={d} className="block h-[1em] leading-none">{d}</span>)}
            </span>
          </span>
        ) : <span key={i} aria-hidden>{ch}</span>)}
        <span aria-hidden className="ml-0.5 text-gold-ink">{suffix}</span>
      </p>
      <p className="mt-3 text-sm font-semibold text-ink-soft">{label}</p>
    </div>
  )
}
