import { Clock, Mail, MapPin, MessageSquare, Phone, TimerReset } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { business } from '../data/business'
import { useQuote } from '../hooks/useQuote'
import { Button } from '../components/Button'

export function Contact() {
  const { open } = useQuote()
  const opts = [
    { icon: Phone, k: 'Call', v: business.phone, href: business.phoneHref },
    { icon: MessageSquare, k: 'Text', v: business.phone, href: business.smsHref },
    { icon: Mail, k: 'Email', v: business.email, href: `mailto:${business.email}` },
  ]
  return (
    <section id="contact" aria-labelledby="contact-h" className="section-pad mx-auto max-w-7xl px-4 sm:px-8">
      <SectionHeading eyebrow="Talk to a person" title={<span id="contact-h">Prefer to ask first? Easy.</span>}>
        Maid New comes to you: every clean happens at your address.
      </SectionHeading>
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Reveal className="min-w-0 rounded-[1.5rem] border border-line bg-surface p-7">
          <h3 className="flex items-center gap-2 text-[1.5rem]"><Clock aria-hidden size={22} className="text-gold-ink" />Business hours</h3>
          <dl className="mt-4 divide-y divide-line">
            {business.hours.map((h) => (<div key={h.days} className="flex justify-between gap-4 py-3"><dt className="font-semibold">{h.days}</dt><dd className="text-ink-soft">{h.time}</dd></div>))}
          </dl>
          <p className="mt-3 text-sm text-ink-soft">{business.sundayNote}</p>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0 rounded-[1.5rem] border border-line bg-surface p-7">
          <h3 className="flex items-center gap-2 text-[1.5rem]"><TimerReset aria-hidden size={22} className="text-gold-ink" />Quote timing</h3>
          <p className="mt-4 text-ink-soft">Hours and quote speed are separate. Maid New’s current site advertises quote replies in <strong className="text-ink">{business.quoteReplyClaim}</strong>. Commercial quotes follow within 24 hours of a free walkthrough.</p>
          <p className="mt-3 rounded-xl bg-cream p-3 text-sm" data-client-review>
            <strong>For client review:</strong> consider saying “within 30 minutes during business hours” so the promise matches the schedule.
          </p>
          <p className="mt-3 text-sm text-ink-soft">Same-day cleans are available only when the schedule has an opening. Call or text to ask.</p>
        </Reveal>
        <Reveal delay={0.16} className="on-dark min-w-0 rounded-[1.5rem] bg-deep p-7 text-snow">
          <h3 className="text-[1.5rem]">Reach Maid New</h3>
          <ul className="mt-4 space-y-2">
            {opts.map(({ icon: I, k, v, href }) => (
              <li key={k}><a href={href} className="flex min-h-12 items-center gap-3 rounded-xl bg-snow/10 px-4 transition hover:bg-snow/20"><I aria-hidden size={18} className="text-gold" /><span className="text-sm text-snow/70">{k}</span><span className="ml-auto min-w-0 break-words text-right text-[0.92rem] font-semibold">{v}</span></a></li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm text-snow/80"><MapPin aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />{business.address}</p>
          <Button variant="gold" arrow className="mt-5 w-full" onClick={() => open()}>Get My Cleaning Quote</Button>
        </Reveal>
      </div>
    </section>
  )
}
