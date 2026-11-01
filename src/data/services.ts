import type { PhotoName } from './images'

export type ServiceId = 'house' | 'scheduled' | 'deep' | 'senior' | 'move' | 'airbnb' | 'commercial' | 'post'

export interface Service {
  id: ServiceId
  name: string
  blurb: string
  from?: number // verified starting price, before GST
  fromNote?: string
  photo: PhotoName
  alt: string
  quoteLabel: string
}

export const services: Service[] = [
  { id: 'house', name: 'Regular house cleaning', blurb: 'Floors, bathrooms, kitchen and dusting throughout, for houses, condos and apartments.', from: 119, fromNote: 'per visit, 1 bed / 1 bath, weekly plan', photo: 'living', alt: 'Bright living room with sofa and balcony doors', quoteLabel: 'Home Cleaning' },
  { id: 'scheduled', name: 'Weekly, bi-weekly & monthly', blurb: 'A recurring plan with the same crew. Plan visits cost 20% less weekly, 15% bi-weekly, 5% monthly than a one-time clean.', from: 119, fromNote: 'per visit, 1 bed / 1 bath, weekly plan', photo: 'room', alt: 'Bright empty apartment room with hardwood floor', quoteLabel: 'Scheduled Cleaning' },
  { id: 'deep', name: 'Deep cleaning', blurb: 'Baseboards, blinds, vents and trim. The first visit for any home that has gone three months without a professional clean.', from: 215, fromNote: 'flat, 1 bed / 1 bath', photo: 'kitchen', alt: 'White kitchen with granite counters and stainless appliances', quoteLabel: 'Deep Cleaning' },
  { id: 'move', name: 'Move-in / move-out', blurb: 'An empty home cleaned top to bottom. Oven, fridge and cabinet interiors are included, not extras.', from: 325, fromNote: '1 bed / 1 bath, standard condition', photo: 'empty', alt: 'Empty apartment room with windows and wood flooring', quoteLabel: 'Move-In/Move-Out Cleaning' },
  { id: 'airbnb', name: 'Airbnb & vacation rental', blurb: 'Fast, dependable turnovers between guests, ending with photos so you can see how the unit was left.', from: 99, fromNote: 'per turnover, 1 bed / 1 bath', photo: 'bedroom', alt: 'Made canopy bed in a bright hotel suite', quoteLabel: 'Airbnb/Vacation Rental Cleaning' },
  { id: 'commercial', name: 'Office & commercial', blurb: 'One flat per-visit rate after a free walkthrough. Evening visits arranged ahead so your team never works around us.', fromNote: 'quoted after a free walkthrough', photo: 'modern', alt: 'Open-plan modern space with dining table and large windows', quoteLabel: 'Office And Commercial Cleaning' },
  { id: 'post', name: 'Post-construction', blurb: 'Rough, final or full cleans after a renovation or new build, photographed before and after.', from: 109, fromNote: 'rough clean, one room up to 800 sq ft', photo: 'hall', alt: 'Bright finished hallway with wood and marble details', quoteLabel: 'Post Construction Cleaning' },
  { id: 'senior', name: 'Senior home cleaning', blurb: 'Lighter, regular help at a parent’s home. Does not include personal care, medication help, meals or errands.', from: 119, fromNote: 'per visit, weekly plan', photo: 'bath', alt: 'Calm bathroom with twin vanities and a bright hallway', quoteLabel: 'Senior Home Cleaning' },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, Service>
