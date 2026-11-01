import { useEffect, useRef } from 'react'

/** Wires a native <dialog> to open/close state: modal focus trap + Escape come from the platform. */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!open && d.open) d.close()
    return () => { document.documentElement.style.overflow = '' }
  }, [open])
  useEffect(() => {
    const d = ref.current
    if (!d) return
    const handle = () => { document.documentElement.style.overflow = ''; onClose() }
    d.addEventListener('close', handle)
    return () => d.removeEventListener('close', handle)
  }, [onClose])
  return ref
}
