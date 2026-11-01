import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m as motion } from 'motion/react'
import { useForm, Controller, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, ExternalLink, Info, Phone } from 'lucide-react'
import { Modal } from './Modal'
import { services, serviceById, type ServiceId } from '../data/services'
import { business } from '../data/business'
import { zones, areas, outsideRoute } from '../data/areas'
import * as q from '../data/quote'
import { quoteSchema, quoteDefaults, stepFields, type QuoteValues } from '../lib/quoteSchema'
import { useQuote } from '../hooks/useQuote'
import { useMotionPrefs } from '../hooks/useMotionPrefs'
import { useToast } from './Toast'
import { cn, money } from '../lib/cn'

type Form = UseFormReturn<QuoteValues>

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-danger">{msg}</p> : null
}

function Choice({ label, selected, onSelect, hint, type = 'radio' }: { label: string; selected: boolean; onSelect: () => void; hint?: string; type?: 'radio' | 'checkbox' }) {
  return (
    <button type="button" role={type} aria-checked={selected} onClick={onSelect}
      className={cn('flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.95rem] transition-[border-color,background-color,box-shadow] duration-200',
        selected ? 'border-forest bg-sage-soft shadow-[0_0_0_1px_var(--color-forest)]' : 'border-line bg-surface hover:border-line-strong')}>
      <span aria-hidden className={cn('grid h-5 w-5 shrink-0 place-items-center border transition', type === 'radio' ? 'rounded-full' : 'rounded-md', selected ? 'border-forest bg-brand text-snow' : 'border-line-strong')}>
        {selected && <Check size={13} strokeWidth={3} />}
      </span>
      <span><span className="font-semibold">{label}</span>{hint && <span className="block text-sm font-normal text-ink-soft">{hint}</span>}</span>
    </button>
  )
}

function Group({ legend, error, errId, children, cols = 'sm:grid-cols-2' }: { legend: string; error?: string; errId: string; children: React.ReactNode; cols?: string }) {
  return (
    <fieldset className="mt-5 first:mt-0" aria-describedby={error ? errId : undefined}>
      <legend className="mb-2 text-sm font-bold">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className={cn('grid gap-2', cols)}>{children}</div>
      <Err id={errId} msg={error} />
    </fieldset>
  )
}

function Pick({ f, name, legend, options, cols }: { f: Form; name: keyof QuoteValues; legend: string; options: string[]; cols?: string }) {
  const err = f.formState.errors[name]?.message as string | undefined
  return (
    <Controller control={f.control} name={name} render={({ field }) => (
      <Group legend={legend} error={err} errId={`e-${name}`} cols={cols}>
        {options.map((o) => <Choice key={o} label={o} selected={field.value === o} onSelect={() => field.onChange(o)} />)}
      </Group>
    )} />
  )
}

function ServiceStep({ f }: { f: Form }) {
  const err = f.formState.errors.service?.message
  return (
    <Controller control={f.control} name="service" render={({ field }) => (
      <div>
        <div role="radiogroup" aria-label="Cleaning service" className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <Choice key={s.id} label={s.name} selected={field.value === s.id}
              hint={s.from ? `From ${money(s.from)} + GST` : 'Walkthrough quote'}
              onSelect={() => { field.onChange(s.id); f.setValue('extras', []); f.setValue('frequency', '') }} />
          ))}
        </div>
        <Err id="e-service" msg={err} />
      </div>
    )} />
  )
}

function PropertyStep({ f, s }: { f: Form; s: ServiceId | '' }) {
  if (!s) return null
  return (
    <div>
      {q.HOME_SERVICES.includes(s) && (
        <>
          <Pick f={f} name="bedrooms" legend="Bedrooms" options={q.bedroomOptions} cols="grid-cols-3" />
          <Pick f={f} name="bathrooms" legend="Bathrooms" options={q.bathroomOptions} cols="grid-cols-3" />
          {(f.watch('bedrooms') === '6 or more') && <p className="mt-3 flex gap-2 rounded-xl bg-cream p-3 text-sm"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-forest" />Homes with 6 or more bedrooms get a walkthrough quote.</p>}
        </>
      )}
      {s === 'airbnb' && <Pick f={f} name="size" legend="Unit size" options={q.airbnbSizes} />}
      {s === 'post' && (<><Pick f={f} name="size" legend="Project size" options={q.postSizes} cols="grid-cols-1" /><Pick f={f} name="detail" legend="Which phase?" options={q.postPhases} /></>)}
      {s === 'commercial' && (<><Pick f={f} name="detail" legend="Type of space" options={q.officeTypes} /><Pick f={f} name="size" legend="Approximate size" options={q.officeSizes} /></>)}
      {s === 'move' && <Pick f={f} name="detail" legend="Condition of the home" options={q.moveConditions} cols="grid-cols-1" />}
      {['house', 'scheduled', 'senior'].includes(s) && <Pick f={f} name="lastClean" legend="When was it last professionally cleaned?" options={q.lastClean} cols="grid-cols-1" />}
      {s === 'move' || s === 'post' ? <p className="mt-4 text-sm text-ink-soft">Maid New sets condition and scope from photos of your space, so expect to be asked for them on the real quote.</p> : null}
      <label className="mt-5 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem]">
        <input type="checkbox" className="h-5 w-5 accent-brand" {...f.register('pets')} />
        <span><span className="font-semibold">Shedding pets at home</span><span className="block text-sm text-ink-soft">Counted in your flat price.</span></span>
      </label>
    </div>
  )
}

function ExtrasStep({ f, s }: { f: Form; s: ServiceId | '' }) {
  const list = (s && q.extrasByService[s]) || []
  return (
    <Controller control={f.control} name="extras" render={({ field }) => (
      <div>
        <p className="mb-3 text-sm text-ink-soft">Optional. Each extra is priced separately and shown on your quote before you approve it.</p>
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Extras">
          {list.map((x) => {
            const on = field.value.includes(x)
            return <Choice key={x} type="checkbox" label={x} selected={on} onSelect={() => field.onChange(on ? field.value.filter((v) => v !== x) : [...field.value, x])} />
          })}
        </div>
      </div>
    )} />
  )
}

function WhereStep({ f }: { f: Form }) {
  const { register, formState: { errors }, watch } = f
  const town = watch('town')
  const area = areas.find((a) => a.name === town)
  const zone = area ? zones.find((z) => z.zone === area.zone) : undefined
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div className="grid gap-5">
      <div>
        <label htmlFor="town" className="mb-2 block text-sm font-bold">Town</label>
        <select id="town" className="field" aria-invalid={!!errors.town} aria-describedby="e-town" autoComplete="address-level2" {...register('town')}>
          <option value="">Choose your town</option>
          {q.townOptions.map((t) => <option key={t}>{t}</option>)}
        </select>
        <Err id="e-town" msg={errors.town?.message} />
        {zone && <p className="mt-2 flex gap-2 text-sm text-ink-soft"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-forest" />{zone.zone === 0 ? 'Inside Red Deer: no travel fee.' : `${zone.label}: a flat ${zone.fee} per-visit travel fee is added to your quote, plus GST.`}</p>}
        {town === 'Somewhere else' && <p className="mt-2 flex gap-2 text-sm text-ink-soft"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-forest" />Maid New doesn’t travel beyond its ten nearby towns ({outsideRoute.join(', ')} are outside the route). Call to check first.</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-bold">Preferred date</label>
          <input id="date" type="date" min={today} className="field" aria-invalid={!!errors.date} aria-describedby="e-date" {...register('date')} />
          <Err id="e-date" msg={errors.date?.message} />
        </div>
        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-bold">Time of day</label>
          <select id="time" className="field" {...register('time')}>{q.timeOptions.map((t) => <option key={t}>{t}</option>)}</select>
        </div>
      </div>
      <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem]">
        <input type="checkbox" className="h-5 w-5 accent-brand" {...register('flexible')} />
        <span className="font-semibold">I’m flexible on the date</span>
      </label>
      <p className="text-sm text-ink-soft">Availability isn’t checked in this concept. Maid New confirms a real date when it replies. Same-day cleans are possible only when the schedule has an opening.</p>
    </div>
  )
}

function ContactStep({ f }: { f: Form }) {
  const { register, formState: { errors } } = f
  return (
    <div className="grid gap-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold">Your name</label>
        <input id="name" className="field" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" {...register('name')} />
        <Err id="e-name" msg={errors.name?.message} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-bold">Phone</label>
          <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby="e-phone" {...register('phone')} />
          <Err id="e-phone" msg={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold">Email</label>
          <input id="email" type="email" inputMode="email" className="field" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" {...register('email')} />
          <Err id="e-email" msg={errors.email?.message} />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-bold">Anything we should know? <span className="font-normal text-ink-soft">(optional)</span></label>
        <textarea id="notes" rows={3} className="field resize-y" aria-describedby="e-notes" {...register('notes')} />
        <Err id="e-notes" msg={errors.notes?.message} />
      </div>
      <p className="flex gap-2 rounded-xl bg-cream p-3 text-sm"><Info aria-hidden size={18} className="mt-0.5 shrink-0 text-forest" />Demo only: nothing you type here is sent, stored or emailed. Please don’t enter real personal details.</p>
    </div>
  )
}

const prettyDate = (d: string) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '')

function ReviewStep({ v, steps, goTo }: { v: QuoteValues; steps: q.StepId[]; goTo: (s: q.StepId) => void }) {
  const svc = v.service ? serviceById[v.service] : undefined
  const rows: { step: q.StepId; k: string; val: string }[] = [
    { step: 'service', k: 'Service', val: svc?.name ?? '' },
    { step: 'property', k: 'Space', val: [v.bedrooms && `${v.bedrooms} bed`, v.bathrooms && `${v.bathrooms} bath`, v.size, v.detail, v.lastClean && `Last clean: ${v.lastClean}`, v.pets && 'Shedding pets'].filter(Boolean).join(' · ') },
    ...(steps.includes('frequency') ? [{ step: 'frequency' as const, k: 'Frequency', val: v.frequency }] : []),
    ...(steps.includes('extras') ? [{ step: 'extras' as const, k: 'Extras', val: v.extras.join(', ') || 'None' }] : []),
    { step: 'where', k: 'Where & when', val: [v.town, v.flexible ? 'Flexible date' : prettyDate(v.date), v.time].filter(Boolean).join(' · ') },
    { step: 'contact', k: 'Contact', val: [v.name, v.phone, v.email].filter(Boolean).join(' · ') },
  ]
  return (
    <div>
      <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {rows.map((r) => (
          <div key={r.k} className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0"><dt className="text-xs font-bold uppercase tracking-widest text-gold-ink">{r.k}</dt><dd className="mt-1 break-words text-[0.95rem]">{r.val || '—'}</dd></div>
            <button type="button" onClick={() => goTo(r.step)} className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-forest underline-offset-4 hover:underline">Edit</button>
          </div>
        ))}
      </dl>
      {svc && <p className="mt-4 rounded-xl bg-sage-soft p-4 text-sm">
        <strong>Reference only, not a quote.</strong> {svc.from ? `${svc.name} starts from ${money(svc.from)} + GST (${svc.fromNote}).` : `${svc.name} is priced after a free walkthrough.`} Your flat price is set by Maid New from the details above, and you approve it before anything is booked.
      </p>}
    </div>
  )
}

function Done({ onReset, onClose }: { onReset: () => void; onClose: () => void }) {
  return (
    <div className="px-6 py-10 text-center sm:px-12">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-snow"><Check aria-hidden /></span>
      <h2 className="display-md mt-5" tabIndex={-1} id="quote-done">That’s the whole flow. Nothing was sent.</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">This is a design concept by SitePilot, so your request didn’t go anywhere. To get a real flat price, use Maid New’s own quote page or call.</p>
      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-cream p-5 text-left text-sm">
        <p className="font-bold">What happens on the real site</p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5">
          <li>Maid New replies with one flat price. The current site advertises “{business.quoteReplyClaim}”.</li>
          <li>You approve the quote and your card goes on file. You’re charged only after each completed clean.</li>
          <li>Your first clean is scheduled, and the same crew comes each time.</li>
        </ol>
      </div>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={business.quoteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-snow">Open Maid New’s real quote page <ExternalLink aria-hidden size={16} /></a>
        <a href={business.phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest/30 px-6 font-semibold text-forest"><Phone aria-hidden size={16} />{business.phone}</a>
      </div>
      <div className="mt-4 flex justify-center gap-2 text-sm">
        <button type="button" className="rounded-full px-4 py-2 font-semibold text-forest hover:underline" onClick={onReset}>Start over</button>
        <button type="button" className="rounded-full px-4 py-2 font-semibold text-forest hover:underline" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export function QuoteFlow() {
  const { isOpen, close, preset } = useQuote()
  const { reduce, spring } = useMotionPrefs()
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const f = useForm<QuoteValues>({ resolver: zodResolver(quoteSchema), defaultValues: quoteDefaults, mode: 'onTouched' })
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const body = useRef<HTMLDivElement>(null)
  const service = f.watch('service') as ServiceId | ''
  const steps = useMemo(() => q.stepsFor(service), [service])
  const step = steps[Math.min(idx, steps.length - 1)]

  useEffect(() => {
    if (!isOpen) return
    setBusy(false)
    f.reset({ ...quoteDefaults, service: preset ?? '' })
    setDone(false); setDir(1)
    setIdx(preset ? 1 : 0)
  }, [isOpen, preset]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { body.current?.scrollTo({ top: 0 }); body.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true }) }, [step, done])

  const next = async () => {
    const ok = await f.trigger(stepFields[step])
    if (!ok) { document.querySelector<HTMLElement>('[aria-invalid="true"], [role=alert]')?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); return }
    if (step === 'review') {
      setBusy(true)
      await new Promise((r) => setTimeout(r, reduce ? 0 : 700)) // demo only: shows the loading state, nothing is sent
      setBusy(false); setDone(true)
      toast({ title: 'Demo complete', body: 'Nothing was sent or saved. Use Maid New’s real quote page for a genuine request.' })
      return
    }
    setDir(1); setIdx((i) => i + 1)
  }
  const back = () => { setDir(-1); setIdx((i) => Math.max(0, i - 1)) }
  const goTo = (s: q.StepId) => { setDir(-1); setIdx(steps.indexOf(s)) }
  const reset = () => { f.reset(quoteDefaults); setDone(false); setIdx(0); setDir(1) }
  const progress = done ? 100 : (idx / (steps.length - 1)) * 100
  const meta = q.stepMeta[step]

  return (
    <Modal open={isOpen} onClose={close} label="Cleaning quote request (demo)" className="sm:w-[min(94vw,680px)]">
      <form noValidate onSubmit={(e) => { e.preventDefault(); next() }} className="flex h-dvh flex-col bg-paper sm:h-auto sm:max-h-[90dvh] sm:overflow-hidden sm:rounded-3xl sm:shadow-2xl">
        <header className="shrink-0 border-b border-line px-5 pb-4 pt-5 sm:px-8">
          <p className="eyebrow pr-12">Demo quote request · nothing is sent</p>
          {!done && (
            <>
              <div className="mt-3 flex items-center justify-between text-sm font-semibold">
                <span aria-live="polite">Step {idx + 1} of {steps.length}: {meta.label}</span>
              </div>
              <div role="progressbar" aria-label="Quote progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
                <motion.div className="h-full origin-left rounded-full bg-brand" initial={false} animate={{ width: `${progress}%` }} transition={spring('snap')} />
              </div>
            </>
          )}
        </header>
        <div ref={body} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:min-h-[26rem] sm:px-8">
          {done ? <Done onReset={reset} onClose={close} /> : (
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div key={step} custom={dir}
                initial={{ opacity: 0, x: reduce ? 0 : dir * 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : dir * -28 }}
                transition={spring('snap')}>
                <h2 tabIndex={-1} className="display-md mb-5 outline-none">{meta.title}</h2>
                {step === 'service' && <ServiceStep f={f} />}
                {step === 'property' && <PropertyStep f={f} s={service} />}
                {step === 'frequency' && <Pick f={f} name="frequency" legend="Visit frequency" options={q.frequencyOptions[service] ?? []} />}
                {step === 'extras' && <ExtrasStep f={f} s={service} />}
                {step === 'where' && <WhereStep f={f} />}
                {step === 'contact' && <ContactStep f={f} />}
                {step === 'review' && <ReviewStep v={f.getValues()} steps={steps} goTo={goTo} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {!done && (
          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-paper px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
            <button type="button" onClick={back} disabled={idx === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-semibold text-forest transition hover:bg-brand/5 disabled:invisible"><ArrowLeft aria-hidden size={18} />Back</button>
            <button type="submit" disabled={busy} aria-busy={busy || undefined} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-snow transition hover:bg-brand-hover active:scale-[0.98] disabled:cursor-wait disabled:opacity-70">
              {busy ? <><span aria-hidden className="spinner" />Finishing…</> : <>{step === 'review' ? 'Finish demo' : 'Continue'}<ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" /></>}
            </button>
          </footer>
        )}
      </form>
    </Modal>
  )
}
