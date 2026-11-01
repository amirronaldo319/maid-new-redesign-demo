import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="section-pad mx-auto max-w-7xl px-4 sm:px-8">
      <SectionHeading eyebrow="Our services" title={<span id="services-h">Eight ways to get your time back</span>}>
        From a weekly reset to a move-out deep clean, every service starts with a flat price you approve before the first visit.
      </SectionHeading>
      <ul className="mt-14 grid grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} size={s.id === 'house' ? 'xl' : s.id === 'commercial' ? 'wide' : 'sm'} />)}
      </ul>
    </section>
  )
}
