import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { photo, type PhotoName } from '../data/images'
import { cn } from '../lib/cn'

interface Props { name: PhotoName; alt: string; sizes: string; priority?: boolean; parallax?: number; reveal?: boolean; className?: string; imgClassName?: string; style?: React.CSSProperties }

/** Responsive, dimensioned image with a graceful fallback so a missing file never breaks the layout. */
export function Photo({ name, alt, sizes, priority, parallax, reveal, className, imgClassName, style }: Props) {
  const [failed, setFailed] = useState(false)
  const p = photo(name)
  return (
    <div className={cn('relative overflow-hidden bg-cream', className)} style={style}>
      {failed || !p.src ? (
        <div role="img" aria-label={alt} className="grid h-full w-full place-items-center bg-sage-soft text-forest/50">
          <ImageOff aria-hidden />
        </div>
      ) : (
        <img
          src={p.src} srcSet={p.srcSet} sizes={sizes} width={p.width} height={p.height} alt={alt}
          loading={priority ? 'eager' : 'lazy'} decoding="async" {...(priority ? { fetchPriority: 'high' as const } : {})}
          onError={() => setFailed(true)}
          data-parallax={parallax} data-img-reveal={reveal ? '' : undefined}
          className={cn('photo h-full w-full object-cover', parallax ? 'scale-[1.18]' : '', imgClassName)}
        />
      )}
    </div>
  )
}
