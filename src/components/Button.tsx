import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'onDark'
const styles: Record<Variant, string> = {
  primary: 'bg-brand text-snow hover:bg-brand-hover shadow-[0_1px_0_rgb(255_255_255/.12)_inset,0_6px_16px_-8px_rgb(19_75_45/.7)]',
  secondary: 'bg-transparent text-forest border border-forest/30 hover:border-forest hover:bg-brand/5',
  ghost: 'bg-transparent text-forest hover:bg-brand/5',
  gold: 'bg-gold text-[#1d2a22] hover:bg-gold-hover',
  onDark: 'bg-snow/10 text-snow border border-snow/30 hover:bg-snow/20',
}
const base =
  'btn-sheen group whitespace-nowrap inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold tracking-tight transition-[background-color,border-color,transform,box-shadow] duration-200 active:scale-[0.98] select-none'

interface Common { loading?: boolean; magnetic?: boolean; variant?: Variant; arrow?: boolean; className?: string; children: ReactNode }

export function Button({ variant = 'primary', arrow, magnetic, loading, className, children, disabled, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" data-magnetic={magnetic ? '' : undefined} disabled={disabled || loading} aria-busy={loading || undefined}
      className={cn(base, styles[variant], 'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100', className)} {...rest}>
      {loading && <span aria-hidden className="spinner" />}
      {children}
      {arrow && !loading && <ArrowRight aria-hidden size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </button>
  )
}

export function ButtonLink({ variant = 'primary', arrow, magnetic, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a data-magnetic={magnetic ? '' : undefined} className={cn(base, styles[variant], className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </a>
  )
}
