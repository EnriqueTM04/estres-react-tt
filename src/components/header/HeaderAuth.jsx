import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";

export default function HeaderAuth() {
  const navigate = useNavigate();
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 border-b-blue-400 bg-white shadow-sm">
      {/* Logo e identidad */}
      <Link to="/" className="flex items-center gap-2">
        <img
            src={logo}
            alt="Logo VidaZen"
            className="w-14 h-14 object-contain"
        />
        <span className="font-semibold text-gray-800 text-lg">VidaZen</span>
      </Link>

      {/* Navegación y botón */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm text-gray-700 hover:text-cyan-500 font-medium"
        >
          Inicio
        </Link>

        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium rounded-md bg-cyan-400 text-white hover:bg-cyan-500 transition-colors cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}
