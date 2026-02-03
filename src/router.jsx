import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import Inicio from './views/Inicio.jsx'
import Login from './views/Login.jsx'
import Registro from './views/Registro.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Landing from './views/guest/landing.jsx'
import Pacientes from './views/psicologo/pacientes.jsx'
import Citas from './views/psicologo/Citas.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />
    },
    {
        path: '/psicologo',
        element: <Layout />,
        children: [
            {
                path: 'pacientes',
                element: <Pacientes />
            },
            {
                path: 'citas',
                element: <Citas />
            }
        ]
    }
])

export default router