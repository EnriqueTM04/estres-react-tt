import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderAuth from '../components/header/HeaderAuth.jsx'

export default function AdminLayout() {
    const {user, error} = useAuth({middleware: 'auth'})

  return (
    <div>
        <HeaderAuth />

        <div className="max-w-4xl mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Administracion de usuarios</h1>
        </div>

        <Outlet/>
    </div>
  )
}
