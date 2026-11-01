import { BadgeCheck, ClipboardCheck, CreditCard, Heart, PackageCheck, Users } from 'lucide-react'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { business } from '../data/business'

const points = [
  { icon: BadgeCheck, t: 'An experienced hand', d: `Maid New’s cleaning is led by someone with ${business.ownerExperience} of hands-on experience. The business began in ${business.since} with one Kijiji ad and grew by referral.` },
  { icon: Users, t: 'The same crew every visit', d: 'Standing policy. After a visit or two, the people at your door know your layout, your pets and how to get in.' },
  { icon: ClipboardCheck, t: 'One room-by-room checklist', d: 'Every visit follows the same checklist, so this month’s clean matches last month’s.' },
  { icon: PackageCheck, t: 'Supplies and equipment included', d: 'Nothing to buy, stock or set out.' },
  { icon: CreditCard, t: 'Flat quotes, approved in advance', d: 'Pay by card after the clean, with a receipt every time.' },
  { icon: Heart, t: 'Flexible, pet-friendly service', d: 'Weekly, bi-weekly, monthly or one-time. Pets welcome. Same-day cleans when the schedule has room.' },
]

export function Why() {
  return (
    <section id="why" aria-labelledby="why-h" className="section-pad mx-auto max-w-7xl px-4 sm:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading eyebrow="Why Maid New" title={<span id="why-h">Small crew. Careful work. <em className="italic text-forest">No guesswork.</em></span>}>
            A local company that would rather you know the price, and the people, before they arrive.
          </SectionHeading>
          <Reveal className="mt-8">
            <Photo name="hall" alt="Bright finished hallway with wood slats and marble floor" sizes="(min-width: 1024px) 40vw, 92vw" parallax={0.08} className="aspect-[4/3] rounded-[1.5rem]" />
          </Reveal>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {points.map(({ icon: I, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 0.04} className="flex gap-5 py-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft text-forest"><I aria-hidden size={22} strokeWidth={1.6} /></span>
              <div><h3 className="text-[1.4rem]">{t}</h3><p className="mt-1 text-ink-soft">{d}</p></div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
