import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { business } from '../data/business'
import { useQuote } from '../hooks/useQuote'

/** Mobile-only bottom bar: appears after the hero, hides while the quote dialog is open. */
export function StickyBar() {
  const [show, setShow] = useState(false)
  const { open, isOpen } = useQuote()
  useEffect(() => {
    const on = () => setShow(window.scrollY > 640)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const visible = show && !isOpen
  return (
    <div aria-hidden={!visible} inert={!visible} className={`fixed inset-x-0 bottom-0 z-30 glass glass-thick rounded-t-[1.75rem] border-x-0 border-b-0 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-500 ease-[var(--ease-spring)] sm:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="mx-auto flex max-w-md gap-2">
        <a href={business.phoneHref} aria-label={`Call ${business.phone}`} className="grid h-12 w-14 shrink-0 place-items-center rounded-full border border-forest/30 text-forest"><Phone aria-hidden size={20} /></a>
        <button type="button" onClick={() => open()} className="h-12 flex-1 rounded-full bg-brand text-[0.95rem] font-semibold text-snow">Get My Cleaning Quote</button>
      </div>
    </div>
  )
}
