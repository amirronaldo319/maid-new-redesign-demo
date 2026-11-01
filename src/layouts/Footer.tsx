import { useState } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { business } from '../data/business'
import { services } from '../data/services'
import { areas } from '../data/areas'
import { credits } from '../data/images'
import { useQuote } from '../hooks/useQuote'

export function Footer() {
  const { open } = useQuote()
  const [showCredits, setShowCredits] = useState(false)
  return (
    <footer className="on-dark bg-deeper pb-28 text-snow sm:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-snow/70">{business.tagline}. Serving Red Deer since {business.since}.</p>
          <Button variant="gold" arrow className="mt-6" onClick={() => open()}>Get My Cleaning Quote</Button>
        </div>
        <nav aria-label="Services">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold">Services</h2>
          <ul className="mt-4 space-y-1">{services.map((s) => (<li key={s.id}><button type="button" onClick={() => open(s.id)} className="min-h-9 text-left text-sm text-snow/80 hover:text-snow hover:underline">{s.name}</button></li>))}</ul>
        </nav>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold">Visit &amp; hours</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-snow/80">
            <p>{business.address}</p>
            <p><a className="hover:underline" href={business.phoneHref}>{business.phone}</a></p>
            <p><a className="hover:underline" href={`mailto:${business.email}`}>{business.email}</a></p>
            {business.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}
          </address>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold">Where we clean</h2>
          <p className="mt-4 text-sm text-snow/80">{areas.map((a) => a.name).join(' · ')}</p>
          <p className="mt-3 text-sm text-snow/60">Flat travel fee outside Red Deer.</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li><a className="text-snow/80 hover:underline" href={`${business.siteUrl}/terms-of-service/`} target="_blank" rel="noopener noreferrer">Terms of service</a></li>
            <li><a className="text-snow/80 hover:underline" href={`${business.siteUrl}/policy-privacy/`} target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-snow/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-snow/65 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Maid New. Unofficial redesign concept by <a className="underline underline-offset-4 hover:text-snow" href={business.sitepilot.url} target="_blank" rel="noopener noreferrer">SitePilot</a>. Not affiliated with or published by Maid New.</p>
            <button type="button" aria-expanded={showCredits} onClick={() => setShowCredits((s) => !s)} className="min-h-9 underline underline-offset-4 hover:text-snow">Photo credits</button>
          </div>
          {showCredits && (
            <ul className="grid gap-1 sm:grid-cols-2">
              {credits.map((c) => <li key={c.name}><a className="underline underline-offset-2" href={c.url} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.author}, {c.license}, via Wikimedia Commons</li>)}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
