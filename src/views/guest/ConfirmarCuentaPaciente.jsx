import logo from "../../assets/Isotipo-Logo Final-04.svg";
import { CheckCircle2, ArrowRight, Shield, User } from 'lucide-react';

export default function ConfirmarCuentaPaciente() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        `}
      </style>

      {/* Fondo decorativo global  */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-[#A2D9CE]/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] bg-[#85C1E9]/30 rounded-full blur-[120px]"></div>
      </div>

      {/* Tarjeta Central Única */}
      <div className="max-w-lg w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#85C1E9]/10 border border-white/50 relative overflow-hidden text-center">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#A2D9CE] via-[#85C1E9] to-[#B6E3F2]"></div>

        {/* Logo y Encabezado */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full blur-md"></div>
            <img src={logo} alt="Logo VidaZen" className="w-20 h-20 relative z-10 drop-shadow-sm" />
          </div>
        </div>

        {/* Icono de Éxito Flotante */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#A2D9CE]/20 to-[#85C1E9]/20 rounded-full flex items-center justify-center mb-6 border border-[#A2D9CE]/30">
          <CheckCircle2 className="w-12 h-12 text-[#A2D9CE]" strokeWidth={2.5} />
        </div>

        <h2 className="font-['Montserrat'] text-3xl font-bold text-[#2C3E50] dark:text-white mb-4 tracking-tight">
          ¡Cuenta Verificada!
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Hola Colega, tu registro esta completo en <span className="font-semibold text-[#85C1E9]">Vidazen</span> ha sido confirmado. Ya puedes acceder a la aplicación para iniciar sesión.
        </p>

        {/* Info Card pequeña */}
        <div className="bg-[#FBFCFC] dark:bg-gray-800 rounded-2xl p-4 mb-8 flex items-center justify-center gap-6 border border-gray-100 dark:border-gray-700">
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center gap-2 text-sm text-[#2C3E50] dark:text-gray-300 font-medium">
            <Shield className="w-4 h-4 text-[#A2D9CE]" />
            Acceso Seguro
          </div>
        </div>
      </div>
    </div>
  )
}