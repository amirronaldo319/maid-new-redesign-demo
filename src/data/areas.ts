// Zone fees are published on maidnew.ca/terms-of-service/. Coordinates are approximate and only place dots on a schematic.
export type Area = { name: string; zone: 0 | 1 | 2 | 3; lat: number; lon: number }
export const areas: Area[] = [
  { name: 'Red Deer', zone: 0, lat: 52.268, lon: -113.811 },
  { name: 'Springbrook', zone: 1, lat: 52.18, lon: -113.9 },
  { name: 'Penhold', zone: 1, lat: 52.13, lon: -113.867 },
  { name: 'Blackfalds', zone: 1, lat: 52.383, lon: -113.787 },
  { name: 'Joffre', zone: 2, lat: 52.3, lon: -113.575 },
  { name: 'Lacombe', zone: 2, lat: 52.468, lon: -113.737 },
  { name: 'Sylvan Lake', zone: 2, lat: 52.309, lon: -114.097 },
  { name: 'Gull Lake', zone: 3, lat: 52.575, lon: -114.0 },
  { name: 'Eckville', zone: 3, lat: 52.36, lon: -114.36 },
  { name: 'Innisfail', zone: 3, lat: 52.036, lon: -113.95 },
  { name: 'Bowden', zone: 3, lat: 51.93, lon: -114.03 },
]
export const zones = [
  { zone: 0, label: 'Red Deer', fee: '$0', note: 'No travel fee inside city limits' },
  { zone: 1, label: 'Zone 1', fee: '$20', note: 'Springbrook, Penhold, Blackfalds' },
  { zone: 2, label: 'Zone 2', fee: '$30', note: 'Joffre, Lacombe, Sylvan Lake' },
  { zone: 3, label: 'Zone 3', fee: '$55', note: 'Gull Lake, Eckville, Innisfail, Bowden' },
] as const
export const outsideRoute = ['Alix', 'Clive', 'Delburne', 'Elnora', 'Ponoka', 'Rimbey']
