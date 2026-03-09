import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import logo from "../assets/Isotipo-Logo Final-04.svg";
import { 
  AtSign, 
  ArrowRight,
  ArrowLeft,
  MailCheck,
  Flower
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clienteAxios from '../config/axios';

export default function ForgotPassword() {

  useAuth('guest');

  const emailRef = createRef()
  const [errores, setErrores] = useState([])
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    
    if (!email) {
      setErrores(['El correo es obligatorio']);
      return;
    }
  
    try {
      await clienteAxios.post('/api/forgot-password', { email });
    } catch (error) {
      setErrores(['Error al enviar el correo de recuperación']);
    }
    
    setEnviado(true);
  }

  return (
    <div className="mt-5 flex items-center justify-center transition-colors duration-300 font-sans">
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

      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* --- PANEL IZQUIERDO --- */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#85C1E9] via-[#A2D9CE] to-[#D1F2EB] relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
              <h1 className="font-['Montserrat'] font-bold text-3xl text-[#2C3E50] tracking-tight">Vidazen</h1>
            </div>
            
            <h2 className="font-['Montserrat'] text-4xl font-light text-[#2C3E50] leading-tight mb-4">
              Recupera tu <br/><span className="font-semibold">tranquilidad</span>
            </h2>
            
            <p className="text-[#2C3E50]/70 font-medium max-w-xs">
              No te preocupes, a todos nos pasa. Te ayudaremos a volver a tu espacio de bienestar en un par de pasos.
            </p>
          </div>

          <div className="relative z-10 bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <MailCheck className="text-[#2C3E50] w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#2C3E50]">Acceso seguro</p>
            </div>
            <p className="text-xs text-[#2C3E50]/80 leading-relaxed">
              Recibirás un enlace de un solo uso para restablecer tu contraseña de forma segura.
            </p>
          </div>
        </div>

        {/* --- PANEL DERECHO (Formulario) --- */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
          
          {/* Header Móvil */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <Flower className="text-[#A2D9CE] w-8 h-8" />
            <h1 className="font-['Montserrat'] font-bold text-2xl text-[#2C3E50] dark:text-[#85C1E9]">Vidazen</h1>
          </div>

          {!enviado ? (
            <>
              <div className="mb-10">
                <Link to="/auth/login" className="text-[#85C1E9] flex items-center gap-2 text-sm font-bold mb-4 hover:translate-x-1 transition-transform">
                  <ArrowLeft className="w-4 h-4" /> Volver al inicio
                </Link>
                <h3 className="text-3xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-2">¿Olvidaste tu contraseña?</h3>
                <p className="text-gray-500 dark:text-gray-400 font-sans">Ingresa tu correo para recibir instrucciones.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {errores.length > 0 && errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)}
                
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] dark:text-gray-300 mb-2" htmlFor="email">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      id="email" 
                      type="email" 
                      ref={emailRef}
                      required 
                      placeholder="ejemplo@vidazen.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FBFCFC] dark:bg-gray-800 border-transparent focus:border-[#85C1E9] focus:ring-4 focus:ring-[#85C1E9]/10 rounded-xl transition-all outline-none dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="cursor-pointer w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20 flex items-center justify-center gap-2"
                >
                  Enviar instrucciones
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A2D9CE]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MailCheck className="text-[#A2D9CE] w-10 h-10" />
              </div>
              <h3 className="text-2xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-4">¡Correo enviado!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Si el correo está registrado en nuestro sistema, se ha enviado un enlace de recuperación a su correo electrónico con los pasos a seguir.
              </p>
              <Link 
                to="/auth/login"
                className="inline-block w-full py-4 border-2 border-[#2C3E50] text-[#2C3E50] dark:text-[#85C1E9] dark:border-[#85C1E9] font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50] hover:text-white dark:hover:bg-[#85C1E9] dark:hover:text-white transition-all text-center"
              >
                Regresar al Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}