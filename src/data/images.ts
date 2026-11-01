const urls = import.meta.glob('../assets/photos/*.webp', { eager: true, import: 'default', query: '?url' }) as Record<string, string>

export type PhotoName = 'living' | 'kitchen' | 'empty' | 'bedroom' | 'modern' | 'hall' | 'bath' | 'tub' | 'room'

// Intrinsic size of the 1600w files, used for width/height attributes (prevents layout shift).
const dims: Record<PhotoName, [number, number]> = {
  living: [1600, 1068], kitchen: [1600, 1200], empty: [1600, 1200], bedroom: [1600, 1200],
  modern: [1600, 1068], hall: [1600, 1068], bath: [1600, 1067], tub: [1600, 1067], room: [1600, 1200],
}

export function photo(name: PhotoName) {
  const small = urls[`../assets/photos/${name}-800.webp`]
  const large = urls[`../assets/photos/${name}-1600.webp`]
  const [width, height] = dims[name]
  return { src: large, srcSet: `${small} 800w, ${large} 1600w`, width, height }
}

// Licensed stock (Wikimedia Commons). NONE of these show Maid New's work.
export const credits: { name: PhotoName; title: string; author: string; license: string; url: string }[] = [
  { name: 'kitchen', title: 'White Kitchen', author: 'Mastercraftkitchenandbath', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:White_Kitchen.jpg' },
  { name: 'modern', title: 'Modern kitchen and dining area', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Modern_kitchen_and_dining_area_with_stylish_furnishings_and_natural_light_in_a_contemporary_home_setting.jpg' },
  { name: 'living', title: 'Modern living room', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg' },
  { name: 'hall', title: 'Bright hallway', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Bright_hallway_in_a_modern_building_showcasing_wood_and_marble_design_elements.jpg' },
  { name: 'bedroom', title: 'Canopy bed, Amantaka Suite', author: 'Basile Morin', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Canopy_bed_of_Amantaka_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg' },
  { name: 'bath', title: 'Bathroom, Khan Pool Suite', author: 'Basile Morin', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Bathroom_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg' },
  { name: 'tub', title: 'Bathtub, Khan Pool Suite', author: 'Basile Morin', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Bathtub_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg' },
  { name: 'empty', title: 'Apartment Room (2025-10-06)', author: 'Yelderberry', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Apartment_Room_2025-10-06_1.jpg' },
  { name: 'room', title: 'Apartment Room (2025-10-12)', author: 'Yelderberry', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Apartment_Room_2025-10-12_2.jpg' },
]
