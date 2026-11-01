import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { reviews } from '../data/reviews'
import { business } from '../data/business'

export function Testimonials() {
  const rail = useRef<HTMLUListElement>(null)
  const scroll = (d: number) => { const r = rail.current; if (r) r.scrollBy({ left: d * Math.min(r.clientWidth * 0.85, 420), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }
  return (
    <section id="reviews" aria-labelledby="reviews-h" className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What Red Deer says" title={<span id="reviews-h">{business.rating} stars across {business.reviewCount} Google reviews</span>}>
            Six published reviews from Maid New’s Google listing, shown as written.
          </SectionHeading>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="grid h-12 w-12 place-items-center rounded-full border border-forest/30 text-forest transition hover:bg-brand hover:text-snow"><ChevronLeft aria-hidden /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="grid h-12 w-12 place-items-center rounded-full border border-forest/30 text-forest transition hover:bg-brand hover:text-snow"><ChevronRight aria-hidden /></button>
          </div>
        </div>
      </div>
      <ul ref={rail} tabIndex={0} aria-label="Customer reviews, scrollable" className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {reviews.map((r) => (
          <li key={r.name} className="w-[min(86vw,26rem)] shrink-0 snap-start">
            <figure data-spotlight className="flex h-full flex-col rounded-[1.5rem] bg-paper p-7 shadow-[0_18px_40px_-28px_rgb(19_40_28/.35)]">
              <p className="flex gap-0.5 text-gold" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={17} className="fill-current" />)}</p>
              <blockquote className="mt-4 flex-1 font-serif text-[1.18rem] leading-[1.45] text-ink">“{r.text}”</blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-sm font-bold text-forest">{r.name}<span className="block text-xs font-medium text-ink-soft">Google review</span></figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
