import { createRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import logo from "../assets/Isotipo-Logo Final-04.svg";
import clienteAxios from '../config/axios';
import { 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Flower
} from 'lucide-react';

export default function ResetPassword() {
  // extraer datos de url
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errores, setErrores] = useState([]);
  const [modificado, setModificado] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const password = passwordRef.current.value;
    const password_confirmation = passwordConfirmationRef.current.value;

    // Validación básica en el frontend
    if (password !== password_confirmation) {
      setErrores(["Las contraseñas no coinciden"]);
      return;
    }

    if (password.length < 8) {
      setErrores(["La contraseña debe tener al menos 8 caracteres"]);
      return;
    }

    const datos = {
      token,
      email,
      password,
      password_confirmation
    }

    // resetPassword(datos, setErrores, setModificado);
    try {
      await clienteAxios.post('/api/reset-password', datos);
    } catch (error) {
      setErrores(error.response?.data?.errors || ["Ocurrió un error al restablecer la contraseña"]);
      return;
    }
    
    // Simulación de éxito
    setModificado(true);
    setErrores([]);
  }

  // Si alguien entra a la ruta sin token o email, mostrar un error o redirigir
  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] font-['Montserrat'] text-[#2C3E50]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Enlace no válido</h2>
          <p className="mb-4">Faltan datos en la URL para restablecer la contraseña.</p>
          <Link to="/auth/login" className="text-[#85C1E9] font-bold hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
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
        
        {/* --- PANEL IZQUIERDO (Branding) --- */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#A2D9CE] via-[#85C1E9] to-[#B6E3F2] relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
              <h1 className="font-['Montserrat'] font-bold text-3xl text-[#2C3E50] tracking-tight">Vidazen</h1>
            </div>
            
            <h2 className="font-['Montserrat'] text-4xl font-light text-[#2C3E50] leading-tight mb-4">
              Protegiendo <br/><span className="font-semibold">tu acceso</span>
            </h2>
            
            <p className="text-[#2C3E50]/70 font-medium max-w-xs">
              Crea una contraseña fuerte que no hayas usado antes para mantener segura la información de tus pacientes.
            </p>
          </div>

          <div className="relative z-10 bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <ShieldCheck className="text-[#2C3E50] w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#2C3E50]">Cifrado de extremo a extremo</p>
            </div>
            <p className="text-xs text-[#2C3E50]/80 leading-relaxed">
              Tus credenciales y los datos de la plataforma están protegidos con los más altos estándares de seguridad.
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

          {!modificado ? (
            <>
              <div className="mb-10">
                <h3 className="text-3xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-2">Nueva contraseña</h3>
                <p className="text-gray-500 dark:text-gray-400 font-sans break-all">
                  Restableciendo acceso para:<br/>
                  <span className="font-semibold text-[#85C1E9]">{email}</span>
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {errores.length > 0 && errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)}
                
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] dark:text-gray-300 mb-2" htmlFor="password">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      id="password" 
                      type="password" 
                      ref={passwordRef}
                      required 
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FBFCFC] dark:bg-gray-800 border-transparent focus:border-[#85C1E9] focus:ring-4 focus:ring-[#85C1E9]/10 rounded-xl transition-all outline-none dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] dark:text-gray-300 mb-2" htmlFor="password_confirmation">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      id="password_confirmation" 
                      type="password" 
                      ref={passwordConfirmationRef}
                      required 
                      placeholder="Repite tu nueva contraseña"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FBFCFC] dark:bg-gray-800 border-transparent focus:border-[#85C1E9] focus:ring-4 focus:ring-[#85C1E9]/10 rounded-xl transition-all outline-none dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="cursor-pointer w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20 flex items-center justify-center gap-2 mt-4"
                >
                  Guardar y entrar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A2D9CE]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-[#A2D9CE] w-10 h-10" />
              </div>
              <h3 className="text-2xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white mb-4">¡Contraseña actualizada!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Tu contraseña se ha guardado correctamente. Ya puedes acceder a tu cuenta de Vidazen.
              </p>
              <Link 
                to="/auth/login"
                className="inline-block w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 transition-all text-center shadow-lg shadow-[#2C3E50]/20"
              >
                Ir a Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}