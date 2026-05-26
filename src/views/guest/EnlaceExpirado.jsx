import { Link } from 'react-router-dom';
import logo from '../../assets/Isotipo-Logo Final-04.svg';
import { AlertTriangle, Mail, ArrowLeft } from 'lucide-react';

const ADMIN_EMAIL = 'admin@correo.com';

export default function EnlaceExpirado() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 font-sans">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        `}
            </style>

            <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none overflow-hidden opacity-40">
                <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-[#F5B7B1]/30 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] bg-[#85C1E9]/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-lg w-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#2C3E50]/10 border border-white/50 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F5B7B1] via-[#F1948A] to-[#85C1E9]"></div>

                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-md"></div>
                        <img src={logo} alt="Logo VidaZen" className="w-20 h-20 relative z-10 drop-shadow-sm" />
                    </div>
                </div>

                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#F5B7B1]/30 to-[#F1948A]/20 rounded-full flex items-center justify-center mb-6 border border-[#F5B7B1]/40">
                    <AlertTriangle className="w-12 h-12 text-[#C0392B]" strokeWidth={2.5} />
                </div>

                <h2 className="font-['Montserrat'] text-3xl font-bold text-[#2C3E50] dark:text-white mb-4 tracking-tight">
                    Enlace Expirado
                </h2>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    El enlace de confirmación ya no es válido porque superó el tiempo de 48 horas.
                    Para continuar con tu acceso, por favor contacta al administrador.
                </p>

                <div className="bg-[#FBFCFC] dark:bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-gray-700">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-3">
                        Correo del administrador
                    </p>
                    <a
                        href={`mailto:${ADMIN_EMAIL}`}
                        className="inline-flex items-center gap-2 text-[#2C3E50] dark:text-white font-semibold hover:text-[#85C1E9] transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        {ADMIN_EMAIL}
                    </a>
                </div>

                <Link
                    to="/auth/login"
                    className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20 gap-3"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    );
}
