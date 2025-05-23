import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css' //reset css
import App from './App.tsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpeedInsights />
    <Analytics />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
