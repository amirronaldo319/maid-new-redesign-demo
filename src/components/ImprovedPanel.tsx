import { useEffect, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { Eye, FileCheck2, MousePointerClick, Smartphone, Zap, X } from 'lucide-react'
import { Modal } from './Modal'
import { business } from '../data/business'
import { useMotionPrefs } from '../hooks/useMotionPrefs'

const points = [
  { icon: Zap, t: 'Faster access to quote requests', d: 'One guided flow, opened from anywhere on the page, adapts its questions to the service you pick.' },
  { icon: Eye, t: 'More engaging visual proof', d: 'A draggable before-and-after slider and filterable gallery replace static pages. Concept images are placeholders until real, approved job photos are added.' },
  { icon: FileCheck2, t: 'Clearer service information and trust', d: 'Starting prices with GST labelled, travel zones, hours, cancellation terms and what happens next, all in plain sight.' },
  { icon: Smartphone, t: 'Better mobile usability', d: 'Large tap targets, a thumb-friendly quote sheet and a sticky call/quote bar.' },
  { icon: MousePointerClick, t: 'More prominent calls to action', d: 'The quote button is always one tap away: in the header, hero, pricing, each service and the footer.' },
]
const verify = [
  'The “under 30 minutes” quote promise: should it say “during business hours”?',
  'Whether to use real job photos, Maid New’s logo and the published Google reviews here.',
  'Cancellation, travel-zone and GST wording shown on this page.',
]

/** Optional presentation panel: a Modal for the full story, plus a dismissible desktop nudge. */
export function ImprovedPanel({ open, onClose, onOpen }: { open: boolean; onClose: () => void; onOpen: () => void }) {
  const [nudge, setNudge] = useState(false)
  const { spring } = useMotionPrefs()
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('sp-nudge') === '1' } catch { /* storage unavailable */ }
    if (seen || window.innerWidth < 1024) return
    const t = setTimeout(() => setNudge(true), 3500)
    return () => clearTimeout(t)
  }, [])
  const dismiss = () => { setNudge(false); try { sessionStorage.setItem('sp-nudge', '1') } catch { /* ignore */ } }
  return (
    <>
      <AnimatePresence>
        {nudge && !open && (
          <motion.aside aria-label="Redesign concept note" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={spring('sheet')}
            className="fixed bottom-5 left-5 z-30 w-80 glass glass-thick rounded-3xl p-5 shadow-[0_24px_60px_-20px_rgb(20_40_30/.35)]">
            <button type="button" onClick={dismiss} aria-label="Dismiss note" className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-cream"><X aria-hidden size={16} /></button>
            <p className="eyebrow">A concept for Maid New</p>
            <p className="mt-2 font-serif text-lg leading-snug">Explore the site, then see what we changed and why.</p>
            <button type="button" onClick={() => { dismiss(); onOpen() }} className="mt-3 text-sm font-bold text-forest underline underline-offset-4">What’s improved</button>
          </motion.aside>
        )}
      </AnimatePresence>
      <Modal open={open} onClose={onClose} label="What’s improved in this redesign" className="sm:w-[min(94vw,720px)]">
        <div className="h-dvh overflow-y-auto bg-paper p-6 pt-16 sm:h-auto sm:max-h-[88dvh] sm:rounded-3xl sm:p-10">
          <p className="eyebrow">Redesign concept by SitePilot</p>
          <h2 className="display-md mt-2">What’s improved</h2>
          <p className="mt-2 text-ink-soft">The goal: make it easier to ask for a quote, easier to trust what you see, and easier to use on a phone. No conversion promises, just a better experience.</p>
          <ol className="mt-6 space-y-5">
            {points.map(({ icon: I, t, d }, i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-soft text-forest"><I aria-hidden size={20} /></span>
                <div><h3 className="font-sans text-base font-bold tracking-normal">{i + 1}. {t}</h3><p className="text-[0.95rem] text-ink-soft">{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl bg-cream p-5">
            <h3 className="font-sans text-base font-bold tracking-normal">For Maid New to confirm</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.92rem] text-ink-soft">{verify.map((v) => <li key={v}>{v}</li>)}</ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={onClose} className="min-h-12 rounded-full bg-brand px-6 font-semibold text-snow">Explore the site</button>
            <a href={business.sitepilot.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-forest/30 px-6 font-semibold text-forest">About SitePilot</a>
          </div>
        </div>
      </Modal>
    </>
  )
}
