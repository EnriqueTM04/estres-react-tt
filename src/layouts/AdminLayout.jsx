import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderAuth from '../components/header/HeaderAuth.jsx'

export default function AdminLayout() {
  useAuth({middleware: 'auth'})

  return (
    <div>
        <HeaderAuth />

        <Outlet/>
    </div>
  )
}
