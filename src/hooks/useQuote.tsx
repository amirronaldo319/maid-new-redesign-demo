import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ServiceId } from '../data/services'

interface QuoteCtx { open: (service?: ServiceId) => void; close: () => void; isOpen: boolean; preset?: ServiceId }
const Ctx = createContext<QuoteCtx | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [preset, setPreset] = useState<ServiceId | undefined>()
  const open = useCallback((s?: ServiceId) => { setPreset(s); setOpen(true) }, [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, close, isOpen, preset }), [open, close, isOpen, preset])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export function useQuote() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useQuote must be used inside QuoteProvider')
  return c
}
