import { Accordion } from '../components/Accordion'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { faqs } from '../data/faqs'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-pad bg-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow="Good to know" title={<span id="faq-h">Questions, answered</span>}>Policies below come from Maid New’s current site and terms.</SectionHeading>
        <Reveal><Accordion items={faqs} /></Reveal>
      </div>
    </section>
  )
}
