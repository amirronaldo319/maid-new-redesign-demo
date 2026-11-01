import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { areas, zones, outsideRoute } from '../data/areas'

// Schematic plot of approximate town positions. No boundaries or distances are implied.
const lons = areas.map((a) => a.lon), lats = areas.map((a) => a.lat)
const k = Math.cos((52.2 * Math.PI) / 180)
const minX = Math.min(...lons), maxX = Math.max(...lons), minY = Math.min(...lats), maxY = Math.max(...lats)
const W = 560, H = 520, pad = 40
const scale = Math.min((W - pad * 2 - 80) / ((maxX - minX) * k), (H - pad * 2) / (maxY - minY))
const px = (lon: number) => pad + (lon - minX) * k * scale
const py = (lat: number) => H - pad - (lat - minY) * scale
const fill = ['var(--color-forest)', '#6f8f74', '#c9ad7f', '#a88a52']

export function ServiceAreas() {
  return (
    <section id="areas" aria-labelledby="areas-h" className="section-pad mx-auto max-w-7xl px-4 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="Service area" title={<span id="areas-h">Red Deer, and ten towns around it</span>}>
            No travel fee inside Red Deer. Beyond the city limits, one flat fee per visit is set by zone and shown on your quote before you approve it.
          </SectionHeading>
          <Reveal>
            <table className="mt-8 w-full text-left">
              <caption className="sr-only">Travel fee per visit by zone, before GST</caption>
              <thead className="sr-only"><tr><th scope="col">Zone</th><th scope="col">Towns</th><th scope="col">Fee per visit</th></tr></thead>
              <tbody className="divide-y divide-line border-y border-line">
                {zones.map((z) => (
                  <tr key={z.zone}>
                    <th scope="row" className="py-4 pr-3 align-top"><span className="flex items-center gap-2 font-semibold"><span aria-hidden className="h-3 w-3 rounded-full" style={{ background: fill[z.zone] }} />{z.label}</span></th>
                    <td className="py-4 pr-3 text-sm text-ink-soft">{z.note}</td>
                    <td className="py-4 text-right font-serif text-2xl text-forest">{z.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-ink-soft">Fees are per visit, before GST. {outsideRoute.slice(0, 5).join(', ')} and {outsideRoute[5]} are outside Maid New’s route.</p>
          </Reveal>
        </div>
        <Reveal>
          <figure className="rounded-[1.5rem] border border-line bg-cream p-3">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Schematic map of Red Deer and the ten towns Maid New serves, colored by travel zone" className="h-auto w-full">
              <defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" style={{ fill: 'var(--color-line-strong)' }} /></pattern></defs>
              <rect width={W} height={H} rx="18" fill="url(#dots)" />
              {areas.map((a) => (
                <g key={a.name}>
                  {a.zone === 0 && <circle cx={px(a.lon)} cy={py(a.lat)} r="22" style={{ fill: 'var(--color-forest)' }} opacity=".14" />}
                  <circle cx={px(a.lon)} cy={py(a.lat)} r={a.zone === 0 ? 9 : 6.5} style={{ fill: fill[a.zone], stroke: 'var(--color-cream)' }} strokeWidth="2" />
                  <text x={px(a.lon) + (a.zone === 0 ? 16 : 12)} y={py(a.lat) + 4.5} fontSize={a.zone === 0 ? 17 : 14} fontWeight={a.zone === 0 ? 700 : 600} style={{ fill: 'var(--color-ink)', paintOrder: 'stroke', stroke: 'var(--color-cream)', strokeWidth: 4 }}>{a.name}</text>
                </g>
              ))}
            </svg>
            <figcaption className="px-3 pb-2 pt-1 text-xs text-ink-soft">Approximate positions for orientation only. Not to scale; no boundaries implied.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
