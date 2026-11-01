import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { photo, type PhotoName } from '../data/images'
import { cn } from '../lib/cn'

interface Props { name: PhotoName; alt: string; className?: string; sizes?: string; priority?: boolean; initial?: number; maxHeight?: string }

/**
 * Draggable comparison. The slider is a single role="slider" element: pointer drag (mouse, touch, pen),
 * arrow keys, Home/End and PageUp/PageDown all work. "Before" is a simulated look on a licensed stock
 * photo, labelled as illustrative; swap in real photo pairs via data/gallery.ts when approved.
 */
export function BeforeAfter({ name, alt, className, sizes = '(min-width: 1024px) 60vw, 100vw', priority, initial = 50, maxHeight }: Props) {
  const [pos, setPos] = useState(initial)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const p = photo(name)

  const setFromX = useCallback((x: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }, [])

  const down = (e: PointerEvent) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setFromX(e.clientX) }
  const move = (e: PointerEvent) => { if (dragging.current) setFromX(e.clientX) }
  const up = () => { dragging.current = false }
  const key = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, PageDown: pos - 15, PageUp: pos + 15, Home: 0, End: 100 }
    if (e.key in map) { e.preventDefault(); setPos(Math.min(100, Math.max(0, map[e.key]))) }
  }
  const img = { src: p.src, srcSet: p.srcSet, sizes, width: p.width, height: p.height, draggable: false, decoding: 'async' as const, loading: priority ? ('eager' as const) : ('lazy' as const) }

  return (
    <div
      ref={box}
      className={cn('relative select-none overflow-hidden rounded-[1.25rem] bg-cream shadow-[0_30px_60px_-30px_rgb(19_40_28/.45)]', className)}
      style={{ aspectRatio: `${p.width} / ${p.height}`, touchAction: 'pan-y', ...(maxHeight ? { maxWidth: `calc(${maxHeight} * ${p.width / p.height})` } : {}) }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    >
      <img {...img} alt={alt} className="photo absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img {...img} alt="" className="before-look absolute inset-0 h-full w-full object-cover" />
        <div className="grime absolute inset-0" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#1d211e]/75 px-3 py-1 text-xs font-bold uppercase tracking-widest text-snow backdrop-blur">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-forest backdrop-blur">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper shadow-[0_0_0_1px_rgb(0_0_0/.12)]" style={{ left: `${pos}%` }} />
      <div
        role="slider" tabIndex={0} aria-label="Before and after comparison" aria-orientation="horizontal"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
        onKeyDown={key}
        className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-paper text-forest shadow-[0_8px_24px_-6px_rgb(0_0_0/.45)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal aria-hidden size={22} />
      </div>
    </div>
  )
}
