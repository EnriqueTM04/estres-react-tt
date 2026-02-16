import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { useAuth } from '../hooks/useAuth'
import logo from "../assets/Isotipo-Logo Final-04.svg";
import { 
  Moon, 
  Sun, 
  Flower, 
  Activity, 
  AtSign, 
  Lock, 
  ArrowRight 
} from 'lucide-react';

export default function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()

  const [errores, setErrores] = useState([])
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    login(datos, setErrores)
    
  }

  return (
    // Contenedor Principal
    <div className={`mt-5 flex items-center justify-center transition-colors duration-300 font-sans 'bg-gradient-to-br from-[#FBFCFC] to-[#F0F4F8]'}`}
    >
      {/* Inyección de fuentes de Google (Estilo inline para que funcione todo en uno) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        `}
      </style>

      {/* Fondo decorativo global */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#A2D9CE]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#85C1E9]/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Tarjeta Central */}
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* --- PANEL IZQUIERDO (Branding) --- */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#A2D9CE] via-[#85C1E9] to-[#B6E3F2] relative overflow-hidden">
          {/* Decoración CSS pura */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2C3E50]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
              <h1 className="font-['Montserrat'] font-bold text-3xl text-[#2C3E50] tracking-tight">Vidazen</h1>
            </div>
            
            <h2 className="font-['Montserrat'] text-4xl font-light text-[#2C3E50] leading-tight mb-4">
              Cuidando <br/><span className="font-semibold">bienestar mental</span>
            </h2>
            
            <p className="text-[#2C3E50]/70 font-medium max-w-xs">
              Plataforma profesional para la gestión del progreso terapéutico y niveles de estrés.
            </p>
          </div>

          <div className="relative z-10 bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <Activity className="text-[#2C3E50] w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#2C3E50]">Seguimiento en tiempo real</p>
            </div>
            <p className="text-xs text-[#2C3E50]/80 leading-relaxed">
              Monitorea los niveles de estrés de tus pacientes con módulos terapéuticos dinámicos y reportes detallados.
            </p>
          </div>
        </div>

        {/* --- PANEL DERECHO (Formulario) --- */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900 h-full">
          {/* Header Móvil */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <Flower className="text-[#A2D9CE] w-8 h-8" />
            <h1 className="font-['Montserrat'] font-bold text-2xl text-[#2C3E50] dark:text-[#85C1E9]">Vidazen</h1>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-2">Iniciar sesión</h3>
            <p className="text-gray-500 dark:text-gray-400 font-sans">Bienvenido de nuevo</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
            <div>
              <label className="block text-sm font-semibold text-[#2C3E50] dark:text-gray-300 mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  ref={emailRef}
                  required 
                  placeholder="ejemplo@vidazen.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#FBFCFC] dark:bg-gray-800 border-transparent focus:border-[#85C1E9] focus:ring-4 focus:ring-[#85C1E9]/10 rounded-xl transition-all outline-none dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-[#2C3E50] dark:text-gray-300" htmlFor="password">
                  Contraseña
                </label>
                <a href="#" className="text-xs font-semibold text-[#85C1E9] hover:text-[#2C3E50] dark:hover:text-[#A2D9CE] transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  ref={passwordRef}
                  required 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#FBFCFC] dark:bg-gray-800 border-transparent focus:border-[#85C1E9] focus:ring-4 focus:ring-[#85C1E9]/10 rounded-xl transition-all outline-none dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#85C1E9] focus:ring-[#85C1E9] bg-gray-100 dark:bg-gray-800"
              />
              <label className="text-sm text-gray-500 dark:text-gray-400" htmlFor="remember">
                Mantener sesión iniciada
              </label>
            </div> */}

            <button 
              type="submit"
              className="cursor-pointer w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20 flex items-center justify-center gap-2"
            >
              Iniciar sesión
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ¿No tienes una cuenta institucional?{' '}
              <a href="#" className="text-[#2C3E50] dark:text-[#85C1E9] font-bold hover:underline">
                Contactar a soporte
              </a>
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <a href="#" className="hover:text-[#2C3E50] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#2C3E50] transition-colors">Privacidad</a>
            {/* <a href="#" className="hover:text-[#2C3E50] transition-colors">Ayuda</a> */}
          </div>
        </div>
      </div>
    </div>
  )
}
