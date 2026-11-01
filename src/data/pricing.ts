import type { ServiceId } from './services'

export interface PriceTab {
  id: ServiceId | 'house'
  tab: string
  title: string
  basis: string // what the starting price means
  rows: { size: string; detail?: string; from: number }[]
  notes: string[]
  walkthrough?: boolean
}

// All figures verified against maidnew.ca/pricing/ on 2026-11-01. Before GST.
export const priceTabs: PriceTab[] = [
  {
    id: 'house', tab: 'House', title: 'House cleaning', basis: 'Per visit on a weekly plan',
    rows: [
      { size: '1 bed / 1 bath', detail: 'up to 1,000 sq ft', from: 119 },
      { size: '2 bed / 1.5 bath', detail: 'up to 1,500 sq ft', from: 175 },
      { size: '3 bed / 2 bath', detail: 'up to 2,200 sq ft', from: 212 },
      { size: '4 bed / 2.5 bath', detail: 'up to 3,000 sq ft', from: 260 },
      { size: '5 bed / 3 bath', detail: 'up to 3,800 sq ft', from: 332 },
    ],
    notes: [
      'Bi-weekly, monthly and one-time visits cost more per visit. A one-time 1 bed / 1 bath clean starts at $149.',
      'Homes with 6+ bedrooms or 5,000 sq ft and up get a walkthrough quote.',
      'A home without a professional clean in three months or more starts with a deep clean.',
    ],
  },
  {
    id: 'deep', tab: 'Deep', title: 'Deep cleaning', basis: 'One flat price, full checklist',
    rows: [
      { size: '1 bed / 1 bath', detail: 'up to 1,000 sq ft', from: 215 },
      { size: '2 bed / 1.5 bath', detail: 'up to 1,500 sq ft', from: 305 },
      { size: '3 bed / 2 bath', detail: 'up to 2,200 sq ft', from: 399 },
      { size: '4 bed / 2.5 bath', detail: 'up to 3,000 sq ft', from: 519 },
      { size: '5 bed / 3 bath', detail: 'up to 3,800 sq ft', from: 619 },
    ],
    notes: ['Your quote also counts extra bathrooms, a second kitchen, shedding pets, add-ons and your town.'],
  },
  {
    id: 'move', tab: 'Move', title: 'Move-in / move-out', basis: 'Standard condition, interiors included',
    rows: [
      { size: '1 bed / 1 bath', detail: 'up to 1,000 sq ft', from: 325 },
      { size: '2 bed / 1.5 bath', detail: 'up to 1,500 sq ft', from: 419 },
      { size: '3 bed / 2 bath', detail: 'up to 2,200 sq ft', from: 515 },
      { size: '4 bed / 2.5 bath', detail: 'up to 3,000 sq ft', from: 635 },
      { size: '5 bed / 3 bath', detail: 'up to 3,800 sq ft', from: 735 },
    ],
    notes: ['Condition is set from photos of every room. Heavy condition is priced above standard; extreme is quoted per job.'],
  },
  {
    id: 'airbnb', tab: 'Airbnb', title: 'Airbnb & vacation rental', basis: 'Per turnover',
    rows: [
      { size: '1 bed / 1 bath', from: 99 },
      { size: '2 bed / 2 bath', from: 145 },
      { size: '3 bed / 2.5 bath', from: 199 },
      { size: '4 bed / 3 bath', from: 279 },
    ],
    notes: ['Laundry can be included. Same-day rush turnovers are priced as a rush and taken only when a cleaner is free.'],
  },
  {
    id: 'post', tab: 'Post-construction', title: 'Post-construction', basis: 'Rough clean, by project size',
    rows: [
      { size: 'Single room or kitchen reno', detail: 'under 800 sq ft', from: 109 },
      { size: 'Partial home or basement', detail: '800 – 1,500 sq ft', from: 189 },
      { size: 'Full residential new build', detail: '1,500 – 2,800 sq ft', from: 309 },
      { size: 'Commercial build', detail: '2,800 – 5,000 sq ft', from: 519 },
    ],
    notes: ['Final and full cleans cost more than a rough clean. Every job is confirmed at a walkthrough.'],
  },
  {
    id: 'commercial', tab: 'Office', title: 'Office & commercial', basis: 'Quoted after a free walkthrough',
    rows: [], walkthrough: true,
    notes: ['Commercial spaces vary too much for a starting price. A flat per-visit quote follows within 24 hours of the walkthrough.'],
  },
]

export const planDiscounts = [
  { label: 'Weekly', off: '20%' },
  { label: 'Bi-weekly', off: '15%' },
  { label: 'Monthly', off: '5%' },
]
