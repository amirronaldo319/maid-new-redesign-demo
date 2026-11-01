import { m as motion } from 'motion/react'
import type { ReactNode } from 'react'
import { springs, useMotionPrefs } from '../hooks/useMotionPrefs'

interface Props { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'article' }

/** Scroll-triggered fade/rise. Opacity+transform only; renders instantly for reduced motion. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: Props) {
  const { reduce } = useMotionPrefs()
  const M = motion[as]
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ ...springs.soft, delay }}
    >
      {children}
    </M>
  )
}
