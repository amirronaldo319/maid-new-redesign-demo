import type { ServiceId } from './services'
import { areas } from './areas'

export type StepId = 'service' | 'property' | 'frequency' | 'extras' | 'where' | 'contact' | 'review'

export const HOME_SERVICES: ServiceId[] = ['house', 'scheduled', 'deep', 'senior', 'move']

export function stepsFor(service: ServiceId | ''): StepId[] {
  if (!service) return ['service', 'property', 'where', 'contact', 'review']
  const s: StepId[] = ['service', 'property']
  if (['house', 'scheduled', 'senior', 'airbnb', 'commercial'].includes(service)) s.push('frequency')
  if (service !== 'commercial') s.push('extras')
  s.push('where', 'contact', 'review')
  return s
}

export const stepMeta: Record<StepId, { label: string; title: string }> = {
  service: { label: 'Service', title: 'What would you like cleaned?' },
  property: { label: 'Space', title: 'Tell us about the space' },
  frequency: { label: 'Schedule', title: 'How often?' },
  extras: { label: 'Extras', title: 'Anything extra?' },
  where: { label: 'When & where', title: 'Where and when?' },
  contact: { label: 'Contact', title: 'How can Maid New reach you?' },
  review: { label: 'Review', title: 'Review your request' },
}

export const bedroomOptions = ['1', '2', '3', '4', '5', '6 or more']
export const bathroomOptions = ['1', '1.5', '2', '2.5', '3', '3 or more']
export const airbnbSizes = ['1 bed / 1 bath', '2 bed / 2 bath', '3 bed / 2.5 bath', '4 bed / 3 bath', 'Larger or not sure']
export const postSizes = ['Single room or kitchen (under 800 sq ft)', 'Partial home or basement (800 – 1,500 sq ft)', 'Full new build (1,500 – 2,800 sq ft)', 'Commercial build (2,800 – 5,000 sq ft)']
export const postPhases = ['Rough clean', 'Final clean', 'Full clean (both)', 'Not sure']
export const moveConditions = ['Standard: normal wear, already tidied', 'Heavy: grease, scale or grime', 'Extreme: hoarding, smoke or damage', 'Not sure']
export const officeTypes = ['Office', 'Retail or showroom', 'Clinic or studio', 'Other workplace']
export const officeSizes = ['Under 1,500 sq ft', '1,500 – 3,000 sq ft', '3,000 – 6,000 sq ft', 'Over 6,000 sq ft']
export const lastClean = ['Within the last 3 months', '3 months or more ago', 'Never professionally cleaned']

export const frequencyOptions: Record<string, string[]> = {
  house: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'],
  senior: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'],
  scheduled: ['Weekly', 'Bi-weekly', 'Monthly'],
  airbnb: ['One turnover', 'Regular turnovers'],
  commercial: ['1 visit a week', '2 – 3 visits a week', '4 – 5 visits a week', 'Not sure yet'],
}

// Extras are the ones listed on maidnew.ca/pricing/. Each is priced separately on the real quote.
export const extrasByService: Record<string, string[]> = {
  house: ['Inside oven', 'Inside fridge', 'Inside cabinets', 'Appliance pack', 'Interior windows', 'Blinds', 'Linen change and bed making', 'Laundry', 'Baseboard hand-wipe', 'Wall washing'],
  scheduled: ['Inside oven', 'Inside fridge', 'Inside cabinets', 'Appliance pack', 'Interior windows', 'Blinds', 'Linen change and bed making', 'Laundry', 'Baseboard hand-wipe'],
  senior: ['Inside oven', 'Inside fridge', 'Inside cabinets', 'Interior windows', 'Linen change and bed making', 'Laundry'],
  deep: ['Inside oven', 'Inside fridge', 'Inside cabinets', 'Appliance pack', 'Inside dishwasher', 'Interior window glass', 'Blinds', 'Wall washing', 'Pick-up and declutter'],
  move: ['Interior window glass', 'Blinds', 'Wall washing', 'Garage sweep-out', 'Pick-up and declutter'],
  airbnb: ['Laundry included', 'Extra bathroom', 'Extra bed made', 'Restock supplies', 'Mid-stay refresh', 'Same-day rush'],
  post: ['Window sticker and mortar scrape', 'Debris removal', 'Garage sweep-out', 'Wall washing'],
}

export const townOptions = [...areas.map((a) => a.name), 'Somewhere else']
export const timeOptions = ['Morning', 'Afternoon', 'No preference']
