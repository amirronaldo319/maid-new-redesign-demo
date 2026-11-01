import { Star, MapPin, Users } from 'lucide-react'
import { Aurora } from '../components/backgrounds/Aurora'
import { Photo } from '../components/Photo'
import { Button, ButtonLink } from '../components/Button'
import { business } from '../data/business'
import { useQuote } from '../hooks/useQuote'

export function Hero() {
  const { open } = useQuote()
  const rise = (i: number) => ({ style: { '--i': i } as React.CSSProperties })
  return (
    <section id="top" aria-labelledby="hero-h" className="relative -mt-[4.125rem] overflow-hidden bg-cream pt-[4.125rem]">
      <Aurora />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div>
          <p {...rise(0)} className="eyebrow hero-rise">Red Deer, Alberta · Home, office &amp; Airbnb cleaning</p>
          <h1 id="hero-h" {...rise(1)} className="hero-rise display-xl mt-4">
            A Cleaner Home. A Little More <em className="font-normal italic text-forest">Peace of Mind.</em>
          </h1>
          <p {...rise(2)} className="hero-rise lede mt-6 max-w-xl text-ink-soft">
            Professional cleaning for homes and businesses in Red Deer, with transparent pricing and a familiar crew you can count on.
          </p>
          <div {...rise(3)} className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button arrow magnetic onClick={() => open()} className="min-h-14 px-7 text-base">Get My Cleaning Quote</Button>
            <ButtonLink variant="secondary" href="#services" className="min-h-14 px-7 text-base">Explore Our Services</ButtonLink>
          </div>
          <ul {...rise(4)} className="hero-rise mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.92rem] font-semibold text-forest">
            <li className="flex items-center gap-2"><Star aria-hidden size={18} className="fill-gold text-gold" />{business.rating} stars · {business.reviewCount} Google reviews</li>
            <li className="flex items-center gap-2"><Users aria-hidden size={18} />Same crew every visit</li>
            <li className="flex items-center gap-2"><MapPin aria-hidden size={18} />Locally owned since {business.since}</li>
          </ul>
        </div>
        <div {...rise(2)} className="hero-rise relative mx-auto w-full max-w-xl lg:max-w-none">
          <Photo name="living" alt="Bright, tidy living room with a sofa and balcony doors" priority parallax={0.07} sizes="(min-width: 1024px) 46vw, 92vw"
            className="aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgb(19_40_28/.55)] sm:aspect-[5/5.2]" />
          <div className="float-y absolute -left-2 bottom-8 max-w-[15rem] glass glass-thick rounded-3xl p-4 sm:-left-8">
            <p className="flex items-center gap-1 text-gold" aria-hidden>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} className="fill-current" />)}</p>
            <p className="mt-1 font-serif text-lg leading-snug text-forest">“Trustworthy, detailed, and efficient.”</p>
            <p className="mt-1 text-xs text-ink-soft">Nicole Hamel, Google review</p>
          </div>
          <p className="mt-3 text-xs text-ink-soft">Concept imagery is licensed stock, not Maid New’s work.</p>
        </div>
      </div>
    </section>
  )
}
