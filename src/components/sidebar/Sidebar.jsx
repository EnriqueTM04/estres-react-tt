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

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useNavigate();
  const { user, logout } = useAuth({ middleware: "auth" });

  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  // Funcion para cerrar el menu en movil tras hacer clic en un enlace
  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <aside 
      className={`w-64 bg-[#2C3E50] dark:bg-[#1a252f] flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl md:shadow-none`}
    >
      <div className="h-20 flex items-center justify-center border-b border-white/10 dark:border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo VidaZen" className="w-14 h-14" />
          <h1 className="text-2xl font-bold text-white tracking-wide font-['Nunito_Sans']">VidaZen</h1>
        </div>
      </div>
-
      <nav className="flex-1 px-4 py-6 space-y-2 font-['Nunito_Sans'] overflow-y-auto">
        <Link 
          to="/psicologo/dashboard" 
          onClick={handleLinkClick}
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
          <span className="font-medium">Panel Principal</span>
        </Link>

        <Link 
          to="/psicologo/pacientes" 
          onClick={handleLinkClick}
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

        <Link 
          to="/psicologo/citas" 
          onClick={handleLinkClick}
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

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-white/10 dark:border-white/5 font-['Nunito_Sans'] shrink-0">
        <div className="relative">
          {/* Menú Flotante */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-[#1a252f] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-1 overflow-hidden animate-in fade-in duration-200 z-50">
              <button 
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}

          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isProfileOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-white">{user?.name || "Cargando..."}</span>
              <span className="text-xs text-white/50">Psicóloga</span>
            </div>
            <ChevronUp 
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-white' : 'text-white/30'}`} 
            />
          </button>
        </div>
      </div>
    </aside>
  );
}