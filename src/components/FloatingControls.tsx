import { useEffect, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useMotionPrefs } from '../hooks/useMotionPrefs'

/** Back-to-top: appears after the first screen, desktop/tablet only (phones have the sticky bar). */
export function FloatingControls() {
  const [show, setShow] = useState(false)
  const { spring, reduce } = useMotionPrefs()
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#top" aria-label="Back to top" initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.7 }} transition={spring('snap')}
          className="glass glass-thick fixed bottom-6 right-6 z-30 hidden h-12 w-12 place-items-center rounded-full text-forest transition-transform hover:-translate-y-0.5 active:scale-95 sm:grid">
          <ArrowUp aria-hidden size={20} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
