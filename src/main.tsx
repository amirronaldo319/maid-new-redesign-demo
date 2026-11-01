import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'motion/react'
import App from './App'
import './styles/index.css'

// Headings are hidden only while the motion chunk loads; skip entirely for reduced motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion')
  setTimeout(() => document.documentElement.classList.add('motion-failed'), 4000)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={() => import('./lib/motionFeatures').then((m) => m.default)}>
      <App />
    </LazyMotion>
  </StrictMode>,
)
