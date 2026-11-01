import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { ThemeToggle } from '../components/ThemeToggle'
import { business, nav } from '../data/business'
import { useQuote } from '../hooks/useQuote'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { cn } from '../lib/cn'

/** Floating glass bar: hides while scrolling down, returns on any upward scroll, tracks the current section. */
export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { open: openQuote } = useQuote()
  const { spring, reduce } = useMotionPrefs()
  const lastY = useRef(0)

  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      if (y < 120) setHidden(false)
      else if (Math.abs(y - lastY.current) > 6) setHidden(y > lastY.current)
      lastY.current = y
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const els = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) })
    }, { rootMargin: '-35% 0px -60% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [open])

  const show = !hidden || open
  return (
    <header className="pointer-events-none sticky top-0 z-40 px-2.5 pt-2.5">
      <motion.div
        animate={{ y: show ? 0 : reduce ? 0 : '-130%', opacity: show ? 1 : reduce ? 0 : 1 }} transition={spring('snap')}
        className="pointer-events-auto relative mx-auto max-w-6xl"
      >
        <nav aria-label="Main" className="glass flex h-14 items-center justify-between gap-3 rounded-full pl-4 pr-2">
          <a href="#top" aria-label="Maid New, back to top" className="rounded-full"><Logo /></a>
          <ul className="hidden items-center lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={active === n.href ? 'true' : undefined} className="relative block rounded-full px-3.5 py-2 text-[0.88rem] font-semibold text-ink-soft transition-colors hover:text-forest aria-[current=true]:text-forest">
                  {active === n.href && <motion.span layoutId="nav-pill" transition={spring('snap')} className="absolute inset-0 rounded-full bg-forest/10" />}
                  <span className="relative">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <a href={business.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.88rem] font-semibold text-forest xl:inline-flex"><Phone aria-hidden size={16} />{business.phone}</a>
            <ThemeToggle />
            <Button magnetic className="max-sm:hidden min-h-10 px-5 text-[0.88rem]" onClick={() => openQuote()}>Get My Cleaning Quote</Button>
            <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:bg-forest/10 active:scale-95 lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? 'x' : 'm'} initial={{ opacity: 0, rotate: reduce ? 0 : -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: reduce ? 0 : 45 }} transition={spring('snap')}>
                  {open ? <X aria-hidden /> : <Menu aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <>
              <motion.button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="pointer-events-auto fixed inset-0 -z-10 bg-black/25 backdrop-blur-[3px]" />
              <motion.div id="mobile-menu" style={{ transformOrigin: 'top right' }}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : -8 }} transition={spring('snap')}
                className={cn('glass glass-thick absolute left-0 right-0 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.75rem] p-3 lg:hidden')}>
                <ul>
                  {nav.map((n, i) => (
                    <motion.li key={n.href} initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring('snap'), delay: reduce ? 0 : 0.04 * i }}>
                      <a href={n.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center rounded-2xl px-4 font-serif text-[1.65rem] tracking-tight transition-colors hover:bg-forest/10">{n.label}</a>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 grid gap-2 p-1">
                  <Button arrow onClick={() => { setOpen(false); openQuote() }}>Get My Cleaning Quote</Button>
                  <a href={business.phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest/30 font-semibold text-forest"><Phone aria-hidden size={16} />{business.phone}</a>
                  <p className="pt-1 text-center text-sm text-ink-soft">Mon – Sat, 9 a.m. – 5 p.m.</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
