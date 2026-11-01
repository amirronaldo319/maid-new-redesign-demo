import { useId, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useMotionPrefs } from '../hooks/useMotionPrefs'

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()
  const { spring } = useMotionPrefs()
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q}>
            <h3 className="font-sans text-base font-semibold tracking-normal">
              <button
                type="button" id={`${id}-b${i}`} aria-expanded={isOpen} aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[1.05rem] transition-colors hover:text-forest"
              >
                <span>{it.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${isOpen ? 'rotate-45 bg-brand text-snow' : 'text-forest'}`}>
                  <Plus aria-hidden size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={spring('snap')} className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-ink-soft">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
