import { useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { Info, Tag } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { priceTabs, planDiscounts } from '../data/pricing'
import { business } from '../data/business'
import { useQuote } from '../hooks/useQuote'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { cn, money } from '../lib/cn'

export function Pricing() {
  const [id, setId] = useState(priceTabs[0].id)
  const { open } = useQuote()
  const { spring, dur } = useMotionPrefs()
  const tab = priceTabs.find((t) => t.id === id)!
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? priceTabs.length - 1 : null
    if (n === null) return
    e.preventDefault()
    const next = priceTabs[(n + priceTabs.length) % priceTabs.length]
    setId(next.id); document.getElementById(`tab-${next.id}`)?.focus()
  }
  return (
    <section id="pricing" aria-labelledby="pricing-h" className="section-pad mx-auto max-w-7xl px-4 sm:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading eyebrow="Transparent pricing" title={<span id="pricing-h">Starting prices, stated plainly</span>}>
            Every price is flat and set by home size. These are <strong>starting prices before GST</strong>, not final offers: your quote gives one flat price, and you approve it before booking.
          </SectionHeading>
          <Reveal className="mt-8 space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="flex items-center gap-2 font-serif text-xl text-forest"><Tag aria-hidden size={18} />Plans cost less per visit</p>
              <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
                {planDiscounts.map((d) => (<li key={d.label} className="rounded-xl bg-sage-soft py-3"><span className="block font-serif text-2xl text-forest">{d.off} less</span><span className="text-xs font-semibold">{d.label}</span></li>))}
              </ul>
              <p className="mt-3 text-sm text-ink-soft">Compared with a one-time clean. Example: a one-time 1 bed / 1 bath clean starts at $149, and on a weekly plan $119.</p>
            </div>
            <p className="rounded-2xl bg-cream p-5 text-sm"><strong>New plan offer:</strong> book three follow-up cleans within 90 days, keep a card on file, and $30 comes off your first clean. House plans and a deep clean as visit one only.</p>
            <p className="flex gap-2 text-sm text-ink-soft"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-forest" />{business.gstNote} Travel fees outside Red Deer are added per visit.</p>
          </Reveal>
        </div>
        <Reveal className="min-w-0">
          <div role="tablist" aria-label="Service pricing" className="flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none]">
            {priceTabs.map((t, i) => (
              <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={t.id === id} aria-controls="price-panel" tabIndex={t.id === id ? 0 : -1} onKeyDown={(e) => onKey(e, i)} onClick={() => setId(t.id)}
                className={cn('relative min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors', t.id === id ? 'text-snow' : 'bg-cream text-ink-soft hover:bg-sage-soft')}>
                {t.id === id && <motion.span layoutId="price-tab" transition={spring('snap')} className="absolute inset-0 rounded-full bg-brand" />}
                <span className="relative">{t.tab}</span></button>
            ))}
          </div>
          <div id="price-panel" role="tabpanel" aria-labelledby={`tab-${id}`} data-spotlight className="mt-3 overflow-hidden rounded-[1.5rem] border border-line bg-surface">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: dur(0.2), ease: 'easeOut' }}>
                <div className="p-6 pb-3 sm:p-8 sm:pb-3">
                  <h3 className="text-[1.75rem]">{tab.title}</h3>
                  <p className="text-sm font-semibold text-gold-ink">{tab.basis}</p>
                </div>
                {tab.rows.length > 0 ? (
                  <table className="w-full text-left">
                    <caption className="sr-only">{tab.title} starting prices before GST</caption>
                    <thead className="sr-only"><tr><th scope="col">Size</th><th scope="col">Starting price before GST</th></tr></thead>
                    <tbody className="divide-y divide-line border-t border-line">
                      {tab.rows.map((r) => (
                        <tr key={r.size}>
                          <th scope="row" className="py-4 pl-6 pr-3 font-semibold sm:pl-8">{r.size}{r.detail && <span className="block text-xs font-normal text-ink-soft">{r.detail}</span>}</th>
                          <td className="py-4 pl-3 pr-6 text-right sm:pr-8"><span className="text-xs text-ink-soft">from </span><span className="font-serif text-2xl text-forest">{money(r.from)}</span><span className="text-xs font-semibold"> + GST</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <p className="border-t border-line p-6 font-serif text-2xl text-forest sm:p-8">Priced after a free walkthrough</p>}
                <ul className="space-y-2 border-t border-line bg-cream/60 p-6 text-sm text-ink-soft sm:p-8">{tab.notes.map((n) => <li key={n} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{n}</li>)}</ul>
                <div className="p-6 sm:p-8"><Button arrow onClick={() => open(tab.id)}>Get my {tab.title.toLowerCase()} price</Button></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
