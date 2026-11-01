# Maid New — Website Redesign Concept (by SitePilot)

An unofficial, unsolicited redesign **demo** for [Maid New](https://maidnew.ca), a Red Deer, Alberta cleaning company. It is not Maid New's website, sends no data anywhere, and is marked `noindex, nofollow`.

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide, React Hook Form + Zod. No backend, API keys or paid services. Fonts (Fraunces, Manrope) are self-hosted via Fontsource.

## Motion

Smooth scrolling (Lenis) and scroll effects (GSAP ScrollTrigger + SplitText) load lazily from `src/lib/motion/` and are driven by `data-*` attributes (`data-split`, `data-scrub-words`, `data-parallax`, `data-magnetic`, `data-spotlight`). Backgrounds live in `src/components/backgrounds/` (Aurora, DustMotes, LightRays). All of it is skipped for `prefers-reduced-motion`.

## Design system

- **Tokens** live in `src/styles/index.css`: semantic colors (`paper`, `cream`, `surface`, `ink`, `brand`, `forest`, `deep`…), light and dark palettes, a fluid section-spacing scale, and a type scale with size-specific tracking/leading (`.display-xl/lg/md`, `.lede`, `.caption`).
- **Dark mode** follows the system and can be overridden with the toggle in the nav (saved in `localStorage` when available).
- **Liquid glass** (`.glass`, `.glass-thick`) is used only on floating chrome: nav, mobile menu, toasts, back-to-top, sticky mobile bar and the hero review card. It falls back to a solid surface when `backdrop-filter` is unsupported or `prefers-reduced-transparency` / `prefers-contrast: more` is set.
- **Motion language** (`src/hooks/useMotionPrefs.ts`): critically damped springs for UI (`snap`), a slightly bouncy spring for sheets (`sheet`), calm springs for content (`soft`). Dialogs leave the way they arrived. Reduced motion replaces movement with short fades.
- Reusable pieces: `Button` (loading/disabled states), `Modal`, `Toast`, `Accordion`, tabs with sliding indicators, `ThemeToggle`, `FloatingControls`, `RollingCounter`, backgrounds.

## Measured quality (Lighthouse 12, simulated mobile, local production build)

Performance 68, Accessibility 100, Best Practices 100, SEO 66. The SEO deduction is only `is-crawlable`, which fails on purpose because the demo is `noindex`. LCP 2.9 s, CLS 0, TBT about 1.0 s on the throttled run. Performance is below the 95 target; remaining cost is main-thread style/layout work on a heavy single page.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the build at http://localhost:4173
```

## What's inside

| Area | Where |
|---|---|
| Business facts, nav, hours, contact | `src/data/business.ts` |
| Services, starting prices | `src/data/services.ts`, `src/data/pricing.ts` |
| Reviews, FAQs, towns and zone fees | `src/data/reviews.ts`, `faqs.ts`, `areas.ts` |
| Gallery items (before/after) | `src/data/gallery.ts` |
| Quote-flow questions and validation | `src/data/quote.ts`, `src/lib/quoteSchema.ts`, `src/components/QuoteFlow.tsx` |
| Photos and credits | `src/assets/photos/`, `src/data/images.ts` |
| Page sections | `src/sections/` |

**Replacing photos:** drop `name-800.webp` and `name-1600.webp` into `src/assets/photos/` (same names), or add a new name to `PhotoName`/`dims` in `images.ts`. For real before/after pairs, extend `BeforeAfter` to take two image URLs instead of the simulated "before" filter.

## Deploy (not done for you)

- **Vercel:** import the repo, framework preset *Vite*, build `npm run build`, output `dist`. `vercel.json` adds a no-index header.
- **GitHub Pages:** push to a repo's `main` branch and enable Pages → *GitHub Actions*. `.github/workflows/deploy.yml` is included. The build uses relative asset paths, so sub-path hosting works.
- Keep it unlisted/private-link only; it should not be presented as Maid New's official site.

## Content that needs client approval

- **Logo:** a typographic stand-in is used (`Logo.tsx`). The real logo is not reused without permission.
- **Reviews:** six reviews copied verbatim from the Google reviews published on maidnew.ca (names as shown there).
- **Facts and wording** taken from maidnew.ca on 2026-11-01: starting prices, plan discounts (20/15/5%), $30 new-plan offer, travel-zone fees ($20/$30/$55), 5% GST, 48-hour cancellation = 50%, hours, address, phone, email, "5.0 stars across 27 Google reviews", "same crew every visit", "20+ years" experience, "since 2023".
- **Photography:** all licensed stock from Wikimedia Commons (CC BY / CC BY-SA, credited in the footer). None show Maid New's work. The "before" side of every slider is a *simulated* effect, labelled as illustrative. Replace with real approved job photos.
- Service-area map is a schematic with approximate positions; no boundaries implied.

## Proposed policy/wording changes (need confirmation)

1. **"Quotes in under 30 minutes"** is advertised alongside Mon–Sat 9–5 hours. This demo keeps the claim but separates it from business hours and suggests "within 30 minutes during business hours."
2. The live site says commercial quotes arrive within 24 hours of a walkthrough; kept as-is.
3. The live site names some staff; this demo does not, to avoid publishing names without approval.

## Honesty guardrails

No fake reviews, awards, statistics, guarantees, or conversion claims. The demo quote form shows no computed price, stores nothing, and links to Maid New's real quote page. Do not submit test requests to maidnew.ca.

## Not yet verified

Lighthouse scores were not run, and Safari/Firefox were not tested. Layout was checked at 320, 390, 768, 1024 and 1440 px in Chromium; no horizontal overflow at those widths.
