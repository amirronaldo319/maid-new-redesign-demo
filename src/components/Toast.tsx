import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { CheckCircle2, X } from 'lucide-react'
import { useMotionPrefs } from '../hooks/useMotionPrefs'

interface Toast { id: number; title: string; body?: string }
const Ctx = createContext<(t: Omit<Toast, 'id'>) => void>(() => {})
export const useToast = () => useContext(Ctx)

/** Non-blocking status feedback: glass card, polite live region, auto-dismisses, always dismissible. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([])
  const n = useRef(0)
  const { spring, reduce } = useMotionPrefs()
  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), [])
  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = ++n.current
    setItems((l) => [...l.slice(-2), { ...t, id }])
    setTimeout(() => dismiss(id), 5200)
  }, [dismiss])
  const value = useMemo(() => push, [push])
  return (
    <Ctx.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-3 bottom-24 z-[80] flex flex-col items-center gap-2 sm:bottom-6 sm:items-end sm:pr-3">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div key={t.id} layout initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }} transition={spring('snap')}
              className="glass glass-thick pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl p-4">
              <CheckCircle2 aria-hidden size={20} className="mt-0.5 shrink-0 text-forest" />
              <div className="min-w-0 flex-1"><p className="font-semibold leading-snug">{t.title}</p>{t.body && <p className="mt-0.5 text-sm text-ink-soft">{t.body}</p>}</div>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="-m-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-soft hover:text-ink"><X aria-hidden size={16} /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}
