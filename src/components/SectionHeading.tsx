import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, children, align = 'left', className }: { eyebrow: string; title: ReactNode; children?: ReactNode; align?: 'left' | 'center'; className?: string }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
      <h2 data-split className="display-lg mt-3">{title}</h2>
      {children && <Reveal delay={0.15}><p className="mt-4 text-[1.05rem] text-ink-soft">{children}</p></Reveal>}
    </div>
  )
}
