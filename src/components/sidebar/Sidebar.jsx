import React, { useState } from 'react'; // Importamos useState
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, // Importamos el icono de cerrar sesión
  ChevronUp, // Icono para indicar que se puede abrir
  Flower
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/Isotipo-Logo Final-03.svg";
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  // Estado para controlar la visibilidad del botón de cerrar sesión
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useNavigate();
  const { user, logout } = useAuth({ middleware: "auth" });

  return (
    <aside className="w-64 bg-[#2C3E50] dark:bg-black/20 flex-shrink-0 hidden md:flex flex-col fixed h-full z-10 transition-all duration-300">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/10 dark:border-white/5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
          <h1 className="text-2xl font-bold text-white tracking-wide font-['Nunito_Sans']">VidaZen</h1>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2 font-['Nunito_Sans']">
        {/* ... (Tus links de navegación siguen igual) ... */}
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors group">
          <LayoutDashboard className="w-5 h-5 group-hover:text-[#85C1E9] transition-colors" />
          <span className="font-medium">Dashboard</span>
        </a>
        
        <Link to="/psicologo/pacientes" className="flex items-center gap-3 px-4 py-3 bg-[#85C1E9]/20 text-white rounded-xl transition-colors relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A2D9CE] rounded-r-full"></div>
          <Users className="w-5 h-5 text-[#A2D9CE]" />
          <span className="font-medium">Pacientes</span>
        </Link>

        <Link to="/psicologo/citas" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors group">
          <Calendar className="w-5 h-5 group-hover:text-[#85C1E9] transition-colors" />
          <span className="font-medium">Citas</span>
        </Link>

        <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors group">
          <MessageSquare className="w-5 h-5 group-hover:text-[#85C1E9] transition-colors" />
          <span className="font-medium">Mensajes</span>
          <span className="ml-auto bg-[#A2D9CE] text-[#2C3E50] text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </a>

        <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors group">
          <FileText className="w-5 h-5 group-hover:text-[#85C1E9] transition-colors" />
          <span className="font-medium">Recursos</span>
        </a>
      </nav>

      {/* Footer del Sidebar (Perfil + Config + LogOut) */}
      <div className="p-4 border-t border-white/10 dark:border-white/5 font-['Nunito_Sans']">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors group mb-2">
          <Settings className="w-5 h-5 group-hover:text-[#85C1E9] transition-colors" />
          <span className="font-medium">Configuración</span>
        </a>

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
            <img 
              alt="Dr. Sarah Miller profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#A2D9CE]" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" 
            />
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