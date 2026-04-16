import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { useAuth } from '../hooks/useAuth'
import logo from "../assets/Isotipo-Logo Final-04.svg";
import ModalPrivacidad from './ModalPrivacidad'
import { 
  Flower, 
  Activity, 
  AtSign, 
  Lock, 
  ArrowRight,
  Loader,
  X,
  Eye
} from 'lucide-react';

export default function Login() {

  const [cargando, setCargando] = useState(false)
  const emailRef = createRef()
  const passwordRef = createRef()

  const [modal, setModal] = useState({ abierto: false, contenido: '' });
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(false);

  const [errores, setErrores] = useState([])
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    try {
      await login(datos, setErrores)
    }
    catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Error de conexión. Por favor, inténtalo de nuevo.'
      setErrores([errorMessage])
    }
    finally {
      setCargando(false);
    }
  }

  // Componente interno para la Ventana Modal
  const ModalPortal = () => {
    if (!modal.abierto) return null;

    const contenido = {
      terminos: {
        titulo: "Términos y Condiciones",
        cuerpo: (
          <div className="space-y-4 text-sm text-gray-600">
            <p><strong>1. Uso de la Plataforma:</strong> VidaZen es una herramienta de apoyo para la gestión del estrés. No sustituye el diagnóstico médico profesional.</p>
            <p><strong>2. Registro:</strong> El usuario se compromete a proporcionar información veraz y mantener la confidencialidad de sus credenciales.</p>
            <p><strong>3. Responsabilidad:</strong> Los psicólogos registrados deben contar con cédula profesional vigente para ejercer dentro de la plataforma.</p>
            <p><strong>4. Propiedad Intelectual:</strong> Todos los contenidos, logotipos y algoritmos son propiedad de VidaZen.</p>
          </div>
        )
      },
    };

    const info = contenido[modal.contenido];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
          <button 
            onClick={() => setModal({ abierto: false, contenido: '' })}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-6 pr-8">
              {info.titulo}
            </h2>
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar font-sans">
              {info.cuerpo}
            </div>
            <button 
              onClick={() => setModal({ abierto: false, contenido: '' })}
              className="mt-8 w-full py-3 bg-[#85C1E9] text-white font-bold rounded-xl hover:bg-[#2C3E50] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`mt-5 flex items-center justify-center transition-colors duration-300 font-sans 'bg-gradient-to-br from-[#FBFCFC] to-[#F0F4F8]'}`}>
      
      {/* Modal Render */}
      <ModalPortal />

      <ModalPrivacidad 
        abierto={mostrarPrivacidad} 
        onClose={() => setMostrarPrivacidad(false)} 
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
        `}
      </style>

      {/* Fondo decorativo global */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#A2D9CE]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#85C1E9]/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* PANEL IZQUIERDO (Branding) */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#A2D9CE] via-[#85C1E9] to-[#B6E3F2] relative overflow-hidden">
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

        {/* PANEL DERECHO (Formulario) */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900 h-full">
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
                <Link to="/auth/olvide-password" className="text-xs font-semibold text-[#85C1E9] hover:text-[#2C3E50] dark:hover:text-[#A2D9CE] transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
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
                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
                  onClick={() => {
                    const input = passwordRef.current;
                    if (input.type === 'password') {
                      input.type = 'text';
                    } else {
                      input.type = 'password';
                    }
                  }}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={cargando} 
              className={`cursor-pointer w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20 flex items-center justify-center gap-2 ${cargando ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {cargando ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
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
            <button 
              onClick={() => setModal({ abierto: true, contenido: 'terminos' })}
              className="hover:text-[#2C3E50] transition-colors cursor-pointer outline-none uppercase"
            >
              Términos
            </button>
            <button 
              type="button"
              onClick={() => setMostrarPrivacidad(true)}
              className="hover:text-[#2C3E50] transition-colors cursor-pointer outline-none uppercase tracking-widest"
            >
              Privacidad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}