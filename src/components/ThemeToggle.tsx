import { AnimatePresence, m as motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { cn } from '../lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { spring, reduce } = useMotionPrefs()
  const dark = theme === 'dark'
  return (
    <button type="button" onClick={toggle} aria-pressed={dark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn('grid h-11 w-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest/10 active:scale-95', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ opacity: 0, rotate: reduce ? 0 : -60, scale: reduce ? 1 : 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: reduce ? 0 : 60, scale: reduce ? 1 : 0.6 }} transition={spring('snap')} className="grid place-items-center">
          {dark ? <Sun aria-hidden size={19} /> : <Moon aria-hidden size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
