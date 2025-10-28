import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { VidaZenProvider } from './context/VidaZenProvider'
import router from './router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VidaZenProvider>
      <RouterProvider router={router} />
    </VidaZenProvider>
  </StrictMode>,
)
