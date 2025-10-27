import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderInvitado from '../components/header/HeaderInvitado.jsx'

export default function AuthLayout() {
  return (
    <div>
        <HeaderInvitado />
        <main className="max-w-5xl mx-auto mt-10 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-20 p-5">
            <img 
                src="../img/login_register.svg" 
                alt="imagen login" 
                className="max-w-xs"
            />

            <div className='p-0 w-full'>
                <Outlet/>
            </div>
        </main>
    </div>
    
  )
}
