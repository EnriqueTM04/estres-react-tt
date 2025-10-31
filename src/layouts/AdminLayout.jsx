import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderAuth from '../components/header/HeaderAuth.jsx'

export default function AdminLayout() {
    const {user, error} = useAuth({middleware: 'auth'})

    console.log(user)
    console.log(error)

  return (
    <div>
        <HeaderAuth />

        <p>Bienvenido admin</p>
        
        <Outlet/>
    </div>
  )
}
