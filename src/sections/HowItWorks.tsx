import { m as motion } from 'motion/react'
import { ClipboardList, BadgeDollarSign, CalendarCheck, Sparkles } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { business } from '../data/business'
import { ease, useMotionPrefs } from '../hooks/useMotionPrefs'

const steps = [
  { icon: ClipboardList, t: 'Tell us what needs cleaning', d: 'Pick a service and share your home’s size, town and a preferred date. Add photos for move-out or construction cleans.' },
  { icon: BadgeDollarSign, t: 'Receive a personalized flat quote', d: `One price for your space, with any travel fee and GST shown up front. Maid New’s current site advertises replies in ${business.quoteReplyClaim}.` },
  { icon: CalendarCheck, t: 'Approve the quote and arrange your visit', d: 'Your card goes on file when you approve. You’re charged only after each completed clean.' },
  { icon: Sparkles, t: 'Enjoy your cleaned space', d: 'The same crew arrives in your window and works from one room-by-room checklist, every visit.' },
]

export function HowItWorks() {
  const { reduce } = useMotionPrefs()
  return (
    <section id="how" aria-labelledby="how-h" className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="How it works" title={<span id="how-h">From “hello” to a clean home in four steps</span>}>
          No surprises: you see the price before anything is booked.
        </SectionHeading>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <motion.span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left bg-gold lg:block"
            initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
          {steps.map(({ icon: I, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 0.1} className="relative lg:text-center">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-gold bg-paper text-forest lg:mx-auto"><I aria-hidden size={24} strokeWidth={1.6} /></span>
              <p className="mt-5 font-serif text-5xl leading-none text-sage" aria-hidden>0{i + 1}</p>
              <h3 className="mt-2 text-[1.35rem]">{t}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
