import { useCallback, useState, type ReactNode } from 'react'
import { m as motion } from 'motion/react'
import { X } from 'lucide-react'
import { useDialog } from '../hooks/useDialog'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { cn } from '../lib/cn'

interface Props { open: boolean; onClose: () => void; label: string; children: ReactNode; className?: string; hideClose?: boolean }

/**
 * Native <dialog> (focus trap, Escape, inert background for free) with a spring arrival and a matching exit.
 * Spatial consistency: it leaves the way it came (rises in, settles back down).
 */
export function Modal({ open, onClose, label, children, className, hideClose }: Props) {
  const [leaving, setLeaving] = useState(false)
  const { reduce, spring } = useMotionPrefs()
  const stable = useCallback(onClose, [onClose])
  const ref = useDialog(open, stable)
  const request = () => (reduce ? onClose() : setLeaving(true))
  const hidden = { opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.985 }
  return (
    <dialog
      ref={ref} aria-label={label} data-leaving={leaving ? '' : undefined}
      onCancel={(e) => { e.preventDefault(); request() }}
      onClick={(e) => { if (e.target === ref.current) request() }}
      className={cn('m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent sm:m-auto sm:h-fit', className)}
    >
      {open && (
        <motion.div
          className="relative h-full" initial={hidden} animate={leaving ? hidden : { opacity: 1, y: 0, scale: 1 }}
          transition={leaving ? spring('snap') : spring('sheet')}
          onAnimationComplete={() => { if (leaving) { setLeaving(false); onClose() } }}
        >
          {!hideClose && (
            <button type="button" onClick={request} aria-label="Close"
              className="glass absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full text-forest transition active:scale-95">
              <X aria-hidden size={20} />
            </button>
          )}
          {children}
        </motion.div>
      )}
    </dialog>
  )
}
