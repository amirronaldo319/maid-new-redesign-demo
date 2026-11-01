import { ArrowUpRight } from 'lucide-react'
import { Photo } from './Photo'
import { Reveal } from './Reveal'
import type { Service } from '../data/services'
import { useQuote } from '../hooks/useQuote'
import { money } from '../lib/cn'

export function ServiceCard({ s, i, size = 'sm' }: { s: Service; i: number; size?: 'sm' | 'xl' | 'wide' }) {
  const { open } = useQuote()
  return (
    <Reveal as="li" delay={(i % 4) * 0.06} className={size === 'xl' ? 'h-full sm:col-span-2 lg:row-span-2' : size === 'wide' ? 'h-full sm:col-span-2' : 'h-full'}>
      <article data-spotlight className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-surface transition-[box-shadow,border-color] duration-300 hover:border-sage hover:shadow-[0_24px_50px_-28px_rgb(19_40_28/.4)]">
        <Photo name={s.photo} alt={s.alt} sizes={size === 'sm' ? '(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw' : '(min-width: 1024px) 48vw, 92vw'} className={size === 'xl' ? 'aspect-[4/3] lg:aspect-auto lg:min-h-0 lg:flex-1' : 'aspect-[4/3]'} imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <div className="flex flex-1 flex-col p-5">
          <h3 className={size === 'xl' ? 'display-md' : 'text-[1.4rem]'}>{s.name}</h3>
          <p className="mt-2 flex-1 text-[0.93rem] text-ink-soft">{s.blurb}</p>
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-sm text-ink-soft">
              {s.from ? <><span className="font-serif text-2xl text-forest">From {money(s.from)}</span> <span className="font-semibold">+ GST</span></> : <span className="font-serif text-xl text-forest">Walkthrough quote</span>}
              <span className="block text-[0.8rem]">{s.fromNote}</span>
            </p>
            <button type="button" onClick={() => open(s.id)} aria-label={`Get a quote for ${s.name}`}
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sage-soft px-4 text-sm font-bold text-forest transition-colors hover:bg-brand hover:text-snow">
              Get a quote <ArrowUpRight aria-hidden size={16} />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
