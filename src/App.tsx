import { lazy, Suspense, useEffect, useState } from 'react'
import { QuoteProvider } from './hooks/useQuote'
import { PreviewStrip } from './layouts/PreviewStrip'
import { Navbar } from './layouts/Navbar'
import { Footer } from './layouts/Footer'
import { Hero } from './sections/Hero'
import { TrustBar } from './sections/TrustBar'
import { Statement } from './sections/Statement'
import { Services } from './sections/Services'
import { Results } from './sections/Results'
import { HowItWorks } from './sections/HowItWorks'
import { Pricing } from './sections/Pricing'
import { Why } from './sections/Why'
import { Testimonials } from './sections/Testimonials'
import { ServiceAreas } from './sections/ServiceAreas'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { FinalCta } from './sections/FinalCta'
import { ImprovedPanel } from './components/ImprovedPanel'
import { StickyBar } from './components/StickyBar'
import { ToastProvider } from './components/Toast'
import { FloatingControls } from './components/FloatingControls'
import { useQuote } from './hooks/useQuote'

const QuoteFlow = lazy(() => import('./components/QuoteFlow').then((m) => ({ default: m.QuoteFlow })))

/** Loads the quote flow (forms + validation libraries) only once someone asks for a quote. */
function QuoteHost() {
  const { isOpen } = useQuote()
  const [wanted, setWanted] = useState(false)
  if (isOpen && !wanted) setWanted(true)
  return wanted ? <Suspense fallback={null}><QuoteFlow /></Suspense> : null
}

export default function App() {
  const [panel, setPanel] = useState(false)
  // Scroll/animation layer loads after first paint so it never blocks the initial render.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const go = () => import('./lib/motion').then((m) => m.initMotion())
    // After load, in an idle moment: scroll effects are enhancement, never on the critical path.
    let t = 0
    const arm = () => { t = window.setTimeout(() => ('requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 1500 }) : go()), 600) }
    document.readyState === 'complete' ? arm() : window.addEventListener('load', arm, { once: true })
    return () => { window.clearTimeout(t); window.removeEventListener('load', arm) }
  }, [])
  return (
    <QuoteProvider>
      <ToastProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-snow">Skip to content</a>
      <div aria-hidden data-progress className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gold" />
      <PreviewStrip onOpenPanel={() => setPanel(true)} />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Statement />
        <Services />
        <Results />
        <HowItWorks />
        <Pricing />
        <Why />
        <Testimonials />
        <ServiceAreas />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
      <FloatingControls />
      <QuoteHost />
      <ImprovedPanel open={panel} onOpen={() => setPanel(true)} onClose={() => setPanel(false)} />
      </ToastProvider>
    </QuoteProvider>
  )
}
