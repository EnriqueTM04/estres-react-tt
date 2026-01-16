import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderInvitado from '../components/header/HeaderInvitado.jsx'
import Sidebar from '../components/sidebar/Sidebar.jsx'

export default function Layout() {

  const {user, error} = useAuth({middleware: 'auth'})

  console.log(user)
  console.log(error)

  return (
    <div>
        <div className="bg-[#FBFCFC] dark:bg-[#1a252f] min-h-screen flex text-[#2C3E50] dark:text-[#FBFCFC] antialiased">
          {/* Inyección de fuentes */}
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');
              body { font-family: 'Nunito Sans', sans-serif; }
            `}
          </style>

          <Sidebar />
          <Outlet />
          
          {/* Overlay para móvil (opcional si se agrega funcionalidad de menú hamburguesa) */}
          <div aria-hidden="true" className="fixed inset-0 bg-black/50 z-0 hidden md:hidden"></div>
        </div>
        
    </div>
  )
}
