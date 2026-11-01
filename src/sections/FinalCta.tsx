import { Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { business } from '../data/business'
import { useQuote } from '../hooks/useQuote'
import { LightRays } from '../components/backgrounds/LightRays'
import { DustMotes } from '../components/backgrounds/DustMotes'
import { Photo } from '../components/Photo'

export function FinalCta() {
  const { open } = useQuote()
  return (
    <section aria-labelledby="final-h" className="on-dark relative isolate overflow-hidden bg-deep text-snow">
      <Photo name="modern" alt="" sizes="100vw" parallax={0.08} className="absolute inset-0 -z-10 opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/90 to-deep/60" />
      <LightRays />
      <DustMotes count={55} />
      <Reveal className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-8 lg:py-32">
        <p className="eyebrow">Ready when you are</p>
        <h2 id="final-h" data-split className="display-xl mt-4">Come Home to <em className="italic text-[#ecd9ae]">Clean.</em></h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-snow/80">Tell Maid New what your space needs, and their team can help you find the right cleaning service.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="gold" arrow magnetic className="min-h-14 px-8 text-base" onClick={() => open()}>Get My Cleaning Quote</Button>
          <a href={business.phoneHref} className="inline-flex min-h-14 items-center gap-2 rounded-full border border-snow/35 px-8 font-semibold transition hover:bg-snow/10"><Phone aria-hidden size={18} />{business.phone}</a>
        </div>
        <p className="mt-6 text-sm text-snow/65">Mon – Sat, 9 a.m. – 5 p.m.</p>
      </Reveal>
    </section>
  )
}
