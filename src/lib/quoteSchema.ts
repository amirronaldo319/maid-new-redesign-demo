import { z } from 'zod'
import { HOME_SERVICES } from '../data/quote'
import type { ServiceId } from '../data/services'

const serviceIds = ['house', 'scheduled', 'deep', 'senior', 'move', 'airbnb', 'commercial', 'post'] as const

export const quoteSchema = z
  .object({
    service: z.union([z.enum(serviceIds), z.literal('')]),
    bedrooms: z.string(),
    bathrooms: z.string(),
    size: z.string(),
    detail: z.string(), // phase / condition / business type
    lastClean: z.string(),
    frequency: z.string(),
    extras: z.array(z.string()),
    pets: z.boolean(),
    town: z.string(),
    date: z.string(),
    flexible: z.boolean(),
    time: z.string(),
    name: z.string().trim(),
    phone: z.string().trim(),
    email: z.string().trim(),
    notes: z.string().max(600, 'Please keep notes under 600 characters.'),
  })
  .superRefine((v, ctx) => {
    const need = (path: keyof typeof v, msg: string) => {
      if (!String(v[path] ?? '').trim()) ctx.addIssue({ code: 'custom', path: [path], message: msg })
    }
    if (!v.service) ctx.addIssue({ code: 'custom', path: ['service'], message: 'Please choose a service.' })
    const s = v.service as ServiceId | ''
    if (s && HOME_SERVICES.includes(s)) {
      need('bedrooms', 'Choose the number of bedrooms.')
      need('bathrooms', 'Choose the number of bathrooms.')
    }
    if (s === 'airbnb' || s === 'post' || s === 'commercial') need('size', 'Choose a size.')
    if (s === 'move' || s === 'post' || s === 'commercial') need('detail', 'Please choose an option.')
    if (s === 'house' || s === 'scheduled' || s === 'senior') need('lastClean', 'Tell us when the home was last professionally cleaned.')
    if (['house', 'scheduled', 'senior', 'airbnb', 'commercial'].includes(s)) need('frequency', 'Choose how often.')
    need('town', 'Choose your town.')
    if (!v.flexible && !v.date) ctx.addIssue({ code: 'custom', path: ['date'], message: 'Pick a preferred date, or tick “I’m flexible”.' })
    if (v.date && !v.flexible) {
      const d = new Date(v.date + 'T00:00:00')
      const today = new Date(); today.setHours(0, 0, 0, 0)
      if (Number.isNaN(d.getTime()) || d < today) ctx.addIssue({ code: 'custom', path: ['date'], message: 'Choose today or a future date.' })
    }
    need('name', 'Please enter your name.')
    if (!v.phone && !v.email) {
      ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Add a phone number or an email so Maid New can reply.' })
    }
    if (v.email && !z.string().email().safeParse(v.email).success) ctx.addIssue({ code: 'custom', path: ['email'], message: 'Enter a valid email address.' })
    if (v.phone && v.phone.replace(/\D/g, '').length < 10) ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Enter a 10-digit phone number.' })
  })

export type QuoteValues = z.infer<typeof quoteSchema>

export const quoteDefaults: QuoteValues = {
  service: '', bedrooms: '', bathrooms: '', size: '', detail: '', lastClean: '', frequency: '', extras: [], pets: false,
  town: '', date: '', flexible: false, time: 'No preference', name: '', phone: '', email: '', notes: '',
}

// Fields validated on each step, used with react-hook-form's trigger().
export const stepFields: Record<string, (keyof QuoteValues)[]> = {
  service: ['service'],
  property: ['bedrooms', 'bathrooms', 'size', 'detail', 'lastClean'],
  frequency: ['frequency'],
  extras: ['extras'],
  where: ['town', 'date', 'flexible'],
  contact: ['name', 'phone', 'email', 'notes'],
  review: [],
}
