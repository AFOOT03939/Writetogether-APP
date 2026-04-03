import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/globals/index.css'
import AppRoutes from './routes/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
