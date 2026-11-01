import type { PhotoName } from './images'

export type GalleryCategory = 'All' | 'Kitchens' | 'Bathrooms' | 'Living areas' | 'Bedrooms' | 'Move-out'
export interface GalleryItem { id: string; photo: PhotoName; category: Exclude<GalleryCategory, 'All'>; title: string; alt: string; note: string }

// Illustrative only: licensed stock photo, with a simulated "before" look. Replace with real, approved job photos.
export const galleryItems: GalleryItem[] = [
  { id: 'kitchen', photo: 'kitchen', category: 'Kitchens', title: 'Kitchen counters and appliances', alt: 'White kitchen with granite counters', note: 'Counters wiped, appliances polished, floors mopped.' },
  { id: 'modern', photo: 'modern', category: 'Kitchens', title: 'Open kitchen and dining', alt: 'Modern open-plan kitchen and dining area', note: 'Surfaces, glass and floors reset.' },
  { id: 'bath', photo: 'bath', category: 'Bathrooms', title: 'Vanity and tile', alt: 'Bathroom with two vanities and mirrors', note: 'Basins, taps and mirrors scrubbed until they shine.' },
  { id: 'tub', photo: 'tub', category: 'Bathrooms', title: 'Tub and floors', alt: 'Freestanding bathtub in a bright bathroom', note: 'Tub, tile and glass cleaned.' },
  { id: 'living', photo: 'living', category: 'Living areas', title: 'Living room', alt: 'Modern living room with sofa and balcony doors', note: 'Dusting, vacuuming and floors throughout.' },
  { id: 'bedroom', photo: 'bedroom', category: 'Bedrooms', title: 'Guest suite turnover', alt: 'Bedroom with a canopy bed', note: 'Turnover-ready for the next guest.' },
  { id: 'empty', photo: 'empty', category: 'Move-out', title: 'Empty unit', alt: 'Empty apartment room with wood flooring', note: 'Ready for inspection or a new tenant.' },
  { id: 'room', photo: 'room', category: 'Move-out', title: 'Bright empty room', alt: 'Empty apartment room with large windows', note: 'Baseboards, windows and floors finished.' },
]
export const galleryCategories: GalleryCategory[] = ['All', 'Kitchens', 'Bathrooms', 'Living areas', 'Bedrooms', 'Move-out']
