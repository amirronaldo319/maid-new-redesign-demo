import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from './Modal'
import { BeforeAfter } from './BeforeAfter'
import type { GalleryItem } from '../data/gallery'

interface Props { items: GalleryItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }

export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const item = index === null ? null : items[index]
  const go = (d: number) => index !== null && onIndex((index + d + items.length) % items.length)
  return (
    <Modal open={!!item} onClose={onClose} label="Full-screen before and after preview" className="sm:w-[min(94vw,1100px)]">
      {item && index !== null && (
        <div className="flex h-full flex-col justify-center bg-[#101a14] p-3 pt-16 text-snow sm:rounded-3xl sm:p-6 sm:pt-6" onKeyDown={(e) => { if (e.key === 'ArrowLeft' && e.altKey) go(-1); if (e.key === 'ArrowRight' && e.altKey) go(1) }}>
          <BeforeAfter name={item.photo} alt={item.alt} sizes="94vw" className="mx-auto w-full" maxHeight="68dvh" initial={50} priority />
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xl">{item.title}</p>
              <p className="text-sm text-snow/70">{item.note} Illustrative demo image, not Maid New’s work.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-snow/30 transition hover:bg-snow/10"><ChevronLeft aria-hidden /></button>
              <span className="min-w-12 text-center text-sm tabular-nums" aria-live="polite">{index + 1} / {items.length}</span>
              <button type="button" aria-label="Next image" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-snow/30 transition hover:bg-snow/10"><ChevronRight aria-hidden /></button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
