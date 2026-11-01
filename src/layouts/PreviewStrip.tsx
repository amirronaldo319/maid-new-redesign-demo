import { Sparkles } from 'lucide-react'
import { business } from '../data/business'

export function PreviewStrip({ onOpenPanel }: { onOpenPanel: () => void }) {
  return (
    <div className="on-dark bg-deeper text-snow">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-[0.8rem] sm:justify-between sm:px-8">
        <p className="text-center">
          <span className="font-semibold">Maid New — Website Redesign Concept</span> by{' '}
          <a href={business.sitepilot.url} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/60 underline-offset-4 hover:decoration-gold">SitePilot</a>
          <span className="hidden text-snow/60 sm:inline"> · Unofficial demo, not Maid New’s live site</span>
        </p>
        <button type="button" onClick={onOpenPanel} className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-gold/50 px-3 font-semibold text-[#ecd9ae] transition hover:bg-snow/10">
          <Sparkles aria-hidden size={14} /> What’s improved
        </button>
      </div>
    </div>
  )
}
