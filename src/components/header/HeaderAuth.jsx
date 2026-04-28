import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Isotipo-Logo Final-03.svg";
import { useAuth } from "../../hooks/useAuth";

export default function HeaderAuth() {
  const { logout } = useAuth({ middleware: "auth" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo e identidad */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="Logo VidaZen"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="font-bold text-gray-800 text-lg tracking-tight">VidaZen</span>
          </Link>

          {/* Botón Hamburguesa (Solo móvil) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-cyan-500 focus:outline-none"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/admin/inicio" className="text-sm text-gray-600 hover:text-cyan-500 font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/admin/estadisticas" className="text-sm text-gray-600 hover:text-cyan-500 font-medium transition-colors">
              Estadísticas
            </Link>
            <button
              onClick={logout}
              className="ml-4 px-5 py-2 text-sm font-semibold rounded-full bg-cyan-400 text-white hover:bg-cyan-500 transition-all shadow-md active:scale-95"
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </div>

      {/* Menú Móvil (Desplegable) */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-100 animate-fadeIn`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/admin/inicio"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md"
          >
            Inicio
          </Link>
          <Link
            to="/admin/estadisticas"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md"
          >
            Estadísticas
          </Link>
          <div className="pt-4">
            <button
              onClick={logout}
              className="w-full text-center px-4 py-3 text-base font-bold rounded-xl bg-cyan-400 text-white shadow-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}