import React, { useState } from 'react'; 
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  LogOut,
  ChevronUp,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/Isotipo-Logo Final-03.svg";
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  // Estado para controlar la visibilidad del botón de cerrar sesión
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useNavigate();
  const { user, logout } = useAuth({ middleware: "auth" });

  // estilos para resaltar la sección activa en el sidebar
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside className="w-64 bg-[#2C3E50] dark:bg-black/20 hidden md:flex flex-col fixed h-full z-10 transition-all duration-300">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/10 dark:border-white/5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
          <h1 className="text-2xl font-bold text-white tracking-wide font-['Nunito_Sans']">VidaZen</h1>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2 font-['Nunito_Sans']">
        {/* --- Dashboard --- */}
        <Link 
          to="/psicologo/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            isActive('/psicologo/dashboard') 
              ? 'bg-[#85C1E9]/20 text-white relative' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {isActive('/psicologo/dashboard') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A2D9CE] rounded-r-full" />
          )}
          <LayoutDashboard className={`w-5 h-5 transition-colors ${
            isActive('/psicologo/dashboard') ? 'text-[#A2D9CE]' : 'group-hover:text-[#85C1E9]'
          }`} />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* --- Pacientes --- */}
        <Link 
          to="/psicologo/pacientes" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            isActive('/psicologo/pacientes') 
              ? 'bg-[#85C1E9]/20 text-white relative' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {isActive('/psicologo/pacientes') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A2D9CE] rounded-r-full" />
          )}
          <Users className={`w-5 h-5 transition-colors ${
            isActive('/psicologo/pacientes') ? 'text-[#A2D9CE]' : 'group-hover:text-[#85C1E9]'
          }`} />
          <span className="font-medium">Pacientes</span>
        </Link>

        {/* --- Citas --- */}
        <Link 
          to="/psicologo/citas" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
            isActive('/psicologo/citas') 
              ? 'bg-[#85C1E9]/20 text-white relative' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {isActive('/psicologo/citas') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A2D9CE] rounded-r-full" />
          )}
          <Calendar className={`w-5 h-5 transition-colors ${
            isActive('/psicologo/citas') ? 'text-[#A2D9CE]' : 'group-hover:text-[#85C1E9]'
          }`} />
          <span className="font-medium">Citas</span>
        </Link>
      </nav>

      {/* Footer del Sidebar (Perfil + Config + LogOut) */}
      <div className="p-4 border-t border-white/10 dark:border-white/5 font-['Nunito_Sans']">

        {/* --- SECCIÓN PERFIL INTERACTIVA --- */}
        <div className="relative">
          
          {/* Menú Flotante (Pop-up) */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-[#1a252f] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-1 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}

          {/* Botón del Perfil */}
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isProfileOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-white">{user?.name}</span>
              <span className="text-xs text-white/50">Psicóloga</span>
            </div>
            {/* Flechita indicadora */}
            <ChevronUp 
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-white' : 'text-white/30'}`} 
            />
          </button>
        </div>
      </div>
    </aside>
  );
};