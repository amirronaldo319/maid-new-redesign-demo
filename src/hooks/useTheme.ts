import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'mn-theme'
const systemDark = () => matchMedia('(prefers-color-scheme: dark)').matches
const current = (): Theme => {
  const set = document.documentElement.dataset.theme
  return set === 'light' || set === 'dark' ? set : systemDark() ? 'dark' : 'light'
}

/** Light/dark with system default; an explicit pick is remembered when storage is available. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'light' : current()))
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => { if (!document.documentElement.dataset.theme) setTheme(mq.matches ? 'dark' : 'light') }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const toggle = useCallback(() => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem(KEY, next) } catch { /* storage unavailable */ }
    setTheme(next)
  }, [])
  return { theme, toggle }
}
