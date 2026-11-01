import { cn } from '../lib/cn'

/** Typographic stand-in. Swap for the supplied Maid New logo file once the client approves its use. */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap', className)}>
      <svg aria-hidden viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
        <rect width="40" height="40" rx="11" fill={light ? '#E7D3A6' : '#134B2D'} />
        <path d="M20 8c6 5.2 9.2 9.3 9.2 14.4a9.2 9.2 0 0 1-18.4 0C10.8 17.300 14 13.200 20 8Z" fill="none" stroke={light ? '#134B2D' : '#E7D3A6'} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M16.400 24.200c.9 2.400 2.500 3.700 4.400 3.700" fill="none" stroke={light ? '#134B2D' : '#E7D3A6'} strokeWidth="2.200" strokeLinecap="round" />
      </svg>
      <span className={cn('font-serif text-[1.45rem] leading-none tracking-tight', light ? 'text-snow' : 'text-forest')}>
        Maid <span className="italic">New</span>
      </span>
    </span>
  )
}
