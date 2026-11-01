import { RollingCounter } from '../components/RollingCounter'
import { Reveal } from '../components/Reveal'
import { business } from '../data/business'

export function Statement() {
  return (
    <section aria-label="Our approach" className="relative bg-paper py-24 lg:py-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <p className="eyebrow text-center">The idea</p>
        <p data-scrub-words className="mt-6 text-center font-serif text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[1.2] tracking-tight text-forest">
          A clean home isn’t about perfection. It’s about walking in at the end of a long week and feeling the weight lift. Maid New sends the same familiar crew, follows the same careful checklist and gives you one flat price to approve first, so all you have to do is come home.
        </p>
        <Reveal className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-14 lg:grid-cols-4">
          <RollingCounter value={business.rating} label="stars on Google" />
          <RollingCounter value={String(business.reviewCount)} label="published Google reviews" />
          <RollingCounter value="10" label="nearby towns served" />
          <RollingCounter value="20" suffix="+" label="years of hands-on experience" />
        </Reveal>
      </div>
    </section>
  )
}
