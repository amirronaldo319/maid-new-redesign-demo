import { useEffect, useRef } from 'react'

/** Slow, soft colour fields that lean toward the cursor. CSS transforms only (GPU, no layout). */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        ref.current?.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)))
        ref.current?.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)))
      })
    }
    el.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move) }
  }, [])
  return (
    <div ref={ref} aria-hidden className={`aurora pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <span className="aurora-blob aurora-a" /><span className="aurora-blob aurora-b" /><span className="aurora-blob aurora-c" />
    </div>
  )
}
