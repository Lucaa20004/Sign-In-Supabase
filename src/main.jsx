import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router.jsx'
import { Router, RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <h1 className="text-center text-amber-300">React Supabase Auth & Context</h1>
      <RouterProvider router={router} />
    </>
    
  </StrictMode>,
)
