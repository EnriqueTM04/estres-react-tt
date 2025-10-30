import React from 'react'
import { createRef, useState } from 'react'
import clienteAxios from '../config/axios'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

export default function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()

  const [errores, setErrores] = useState([])

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    try {
      const { data } = await clienteAxios.post('/api/login', datos);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  }

  return (
    <div className="w-full mx-auto p-8 border border-gray-50 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Inicia sesión
      </h2>

      <form className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
        {/* Correo */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 "
            ref={emailRef}
          />
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            ref={passwordRef}
          />
        </div>

         {/* Enlaces */}
        <div className="text-right text-sm">
          <Link to="#" className="text-cyan-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón principal */}
        <button
          type="submit"
          className="w-full bg-cyan-400 text-white py-2 rounded-md text-sm font-medium hover:bg-cyan-500 transition-colors hover:shadow-lg  cursor-pointer"
        >
          Iniciar sesión
        </button>

        {/* Enlace de registro */}
        <p className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="auth/register"
            className="text-cyan-500 font-medium hover:underline"
          >
            Regístrate
          </Link>
        </p>
        
      </form>
    </div>
  )
}
