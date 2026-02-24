import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import Inicio from './views/admin/Inicio.jsx'
import Login from './views/Login.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Landing from './views/guest/Landing.jsx'
import Pacientes from './views/psicologo/Pacientes.jsx'
import Citas from './views/psicologo/Citas.jsx'
import Paciente from './views/psicologo/Paciente.jsx'
import Actividad from './views/psicologo/Actividad.jsx'
import { CitasProvider } from './context/CitasProvider.jsx'
import Dashboard from './views/psicologo/Dashboard.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'inicio',
                element: <Inicio />
            }
        ]
    },
    {
        path: '/psicologo',
        element: <Layout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'pacientes',
                element: <Pacientes />,
            },
            {
                path: 'pacientes/:id',
                element: <Paciente />,
            },
            {
                path: 'pacientes/:id/nueva-actividad',
                element: <Actividad />,
            },
            {
                // Ruta para EDITAR una actividad existente
                path: 'pacientes/:id/editar-actividad/:idActividad',
                element: <Actividad />,
            },
            {
                path: 'citas',
                element: <CitasProvider><Citas /></CitasProvider>,
            },
        ]
    }
])

export default router