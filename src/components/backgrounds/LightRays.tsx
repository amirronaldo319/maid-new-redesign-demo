/** Sunbeams falling through a window: layered conic gradients that sway slowly. */
export function LightRays({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`rays pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <span className="ray-layer ray-1" /><span className="ray-layer ray-2" />
    </div>
  )
}
