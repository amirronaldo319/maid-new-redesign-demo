import { useMemo, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { Expand, Info } from 'lucide-react'
import { DustMotes } from '../components/backgrounds/DustMotes'
import { SectionHeading } from '../components/SectionHeading'
import { BeforeAfter } from '../components/BeforeAfter'
import { Lightbox } from '../components/Lightbox'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { galleryItems, galleryCategories, type GalleryCategory } from '../data/gallery'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { cn } from '../lib/cn'

export function Results() {
  const [cat, setCat] = useState<GalleryCategory>('All')
  const [lb, setLb] = useState<number | null>(null)
  const { spring } = useMotionPrefs()
  const items = useMemo(() => galleryItems.filter((g) => cat === 'All' || g.category === cat), [cat])
  return (
    <section id="results" aria-labelledby="results-h" className="on-dark relative overflow-hidden section-pad bg-deep text-snow">
      <DustMotes count={80} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="Visual proof" title={<span id="results-h">See the difference a clean makes</span>}>
          <span className="text-snow/75">Drag the handle, or use the arrow keys, to compare. Photos of Maid New’s own jobs will replace these.</span>
        </SectionHeading>
        <Reveal className="mt-10">
          <BeforeAfter name="kitchen" alt="White kitchen with granite counters, shown cleaned (after) and simulated untidy (before)" sizes="(min-width: 1280px) 1200px, 94vw" initial={55} className="mx-auto max-w-5xl" />
          <p className="mx-auto mt-4 flex max-w-5xl items-start gap-2 text-sm text-snow/70"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />Illustrative demo: licensed stock photo with a simulated “before” effect. It is not a Maid New job.</p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <h3 className="display-md">Browse by room</h3>
          <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={cn('relative min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors', cat === c ? 'border-gold text-[#1d2a22]' : 'border-snow/30 text-snow hover:bg-snow/10')}>
                {cat === c && <motion.span layoutId="gallery-chip" transition={spring('snap')} className="absolute -inset-px rounded-full bg-gold" />}
                <span className="relative">{c}</span></button>
            ))}
          </div>
        </div>
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((g, i) => (
              <motion.li key={g.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={spring('snap')}>
                <button type="button" onClick={() => setLb(i)} className="group relative block w-full overflow-hidden rounded-2xl text-left">
                  <Photo name={g.photo} alt={g.alt} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw" className="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
                    <span><span className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#ecd9ae]">{g.category} </span><span className="block font-serif text-base leading-tight">{g.title}</span><span className="sr-only">, open full-screen preview</span></span>
                    <Expand aria-hidden size={18} className="shrink-0" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      <Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  )
}
