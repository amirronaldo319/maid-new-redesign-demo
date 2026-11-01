import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

/**
 * Scroll-driven motion layer. Loaded lazily after first paint and driven entirely by data attributes,
 * so components stay declarative and everything still renders if this chunk never arrives.
 *
 *  data-split="lines|load"   masked line reveal on headings (SplitText)
 *  data-scrub-words          words light up as you scroll (React Bits "scroll reveal" style)
 *  data-parallax="0.12"      vertical drift, as a fraction of the element height
 *  data-img-reveal           clip-path unveil on enter
 *  data-magnetic             button gently follows the cursor (fine pointers only)
 *  data-spotlight            soft light that tracks the cursor (CSS vars --mx / --my)
 *  data-progress             page scroll progress bar
 */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches

  // --- Lenis smooth scroll, one shared frame loop with GSAP ---------------------------------
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, prevent: (n) => !!(n as HTMLElement).closest?.('dialog, [data-lenis-prevent]') })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)

  const syncLock = () => {
    const locked = !!document.querySelector('dialog[open]') || document.documentElement.style.overflow === 'hidden'
    locked ? lenis.stop() : lenis.start()
  }
  const mo = new MutationObserver(syncLock)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
  mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
    const id = a?.getAttribute('href')
    if (!a || !id || id === '#') return
    const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id)
    if (target === null) return
    e.preventDefault()
    lenis.start()
    lenis.scrollTo(target, { offset: id === '#top' ? 0 : -72, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
    if (id !== '#top') history.replaceState(null, '', id)
  })

  // --- Headings: masked line reveals --------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const onLoad = el.dataset.split === 'load'
    SplitText.create(el, {
      type: 'lines', mask: 'lines', aria: 'none', autoSplit: true, linesClass: 'split-line',
      onSplit: (self) => {
        el.classList.add('is-split')
        return gsap.from(self.lines, {
          yPercent: 112, duration: 1.15, ease: 'expo.out', stagger: 0.1, delay: onLoad ? 0.1 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
        })
      },
    })
  })

  // --- Scroll-scrubbed word reveal ----------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    let tween: gsap.core.Tween | undefined
    let gate: ScrollTrigger | undefined
    SplitText.create(el, {
      type: 'words', aria: 'none', autoSplit: true,
      onSplit: (self) => {
        el.classList.add('is-split')
        tween?.scrollTrigger?.kill(); tween?.kill(); gate?.kill()
        // Words only dim once the paragraph is about to scroll into view, so text is never low-contrast at rest.
        const arm = () => {
          gsap.set(self.words, { opacity: 0.16 })
          tween = gsap.to(self.words, { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 } })
        }
        gate = ScrollTrigger.create({ trigger: el, start: 'top 160%', once: true, onEnter: arm })
        if (gate.progress > 0) arm()
      },
    })
  })

  // --- Parallax -----------------------------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const v = parseFloat(el.dataset.parallax || '0.1') * 100
    gsap.fromTo(el, { yPercent: -v }, { yPercent: v, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  // --- Image unveil -------------------------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(14% 8% 14% 8% round 28px)', scale: 1.06 }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }, clearProps: 'clipPath,scale',
    })
  })

  // --- Page progress ------------------------------------------------------------------------
  const bar = document.querySelector<HTMLElement>('[data-progress]')
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } })

  // --- Pointer effects (mouse only) ---------------------------------------------------------
  if (finePointer) {
    document.addEventListener('pointermove', (e) => {
      const s = (e.target as HTMLElement).closest?.('[data-spotlight]') as HTMLElement | null
      if (!s) return
      const r = s.getBoundingClientRect()
      s.style.setProperty('--mx', `${e.clientX - r.left}px`)
      s.style.setProperty('--my', `${e.clientY - r.top}px`)
    }, { passive: true })

    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - (r.left + r.width / 2)) * 0.22); y((e.clientY - (r.top + r.height / 2)) * 0.3)
      })
      el.addEventListener('pointerleave', () => { x(0); y(0) })
    })
  }

  // Layout shifts from lazy images and web fonts change trigger positions.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  document.fonts?.ready.then(refresh)
}
