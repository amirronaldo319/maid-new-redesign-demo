import { MapPin, Users, Receipt, Star } from 'lucide-react'
import { trust } from '../data/business'
import { Reveal } from '../components/Reveal'

const icons = { mapPin: MapPin, users: Users, receipt: Receipt, star: Star }

export function TrustBar() {
  return (
    <section aria-label="Why customers trust Maid New" className="border-y border-line bg-paper">
      <Reveal>
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => {
            const I = icons[t.icon]
            return (
              <li key={t.title} className={`flex items-start gap-3 px-5 py-6 sm:px-8 ${i > 0 ? 'lg:border-l lg:border-line' : ''} ${i % 2 === 1 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}>
                <I aria-hidden size={22} className="mt-0.5 shrink-0 text-gold-ink" strokeWidth={1.6} />
                <div><p className="font-serif text-lg leading-tight text-forest">{t.title}</p><p className="mt-0.5 text-[0.85rem] text-ink-soft">{t.text}</p></div>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
