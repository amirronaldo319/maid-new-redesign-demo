import { useEffect, useRef } from 'react'

interface Props { count?: number; rgb?: string; className?: string }

/** Soft drifting motes that part around the cursor. Pauses off-screen, skipped for reduced motion. */
export function DustMotes({ count = 70, rgb = '236,217,174', className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const host = canvas.parentElement ?? canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, last = 0, visible = false
    const mouse = { x: -999, y: -999 }
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: 0.7 + Math.random() * 2.4, vy: 0.008 + Math.random() * 0.022,
      vx: (Math.random() - 0.5) * 0.006, a: 0.18 + Math.random() * 0.5, p: Math.random() * 6.28, ox: 0, oy: 0,
    }))
    const size = () => { w = host.clientWidth; h = host.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const frame = (t: number) => {
      if (!visible) return
      const dt = Math.min(t - last, 48); last = t
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.y -= p.vy * dt * 0.06; p.x += p.vx * dt * 0.06 + Math.sin(t / 2400 + p.p) * 0.00018 * dt
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02) p.x = -0.02
        const bx = p.x * w, by = p.y * h
        const dx = bx + p.ox - mouse.x, dy = by + p.oy - mouse.y, d2 = dx * dx + dy * dy
        if (d2 < 14400) { const d = Math.sqrt(d2) || 1, f = (120 - d) / 120; p.ox += (dx / d) * f * 2.2; p.oy += (dy / d) * f * 2.2 }
        p.ox *= 0.94; p.oy *= 0.94
        const x = bx + p.ox, y = by + p.oy
        const tw = 0.6 + 0.4 * Math.sin(t / 900 + p.p)
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5)
        g.addColorStop(0, `rgba(${rgb},${p.a * tw})`); g.addColorStop(1, `rgba(${rgb},0)`)
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, p.r * 5, 0, 6.283); ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) { last = performance.now(); raf = requestAnimationFrame(frame) }
    })
    const ro = new ResizeObserver(size)
    const move = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const leave = () => { mouse.x = mouse.y = -999 }
    size(); io.observe(host); ro.observe(host)
    host.addEventListener('pointermove', move, { passive: true }); host.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave) }
  }, [count, rgb])
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`} />
}
