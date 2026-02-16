import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Isotipo-Logo Final-03.svg";

export default function HeaderInvitado() {
  const location = useLocation();

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 border-b-blue-400 bg-white shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo VidaZen"
          className="w-14 h-14 object-contain"
        />
        <span className="font-semibold text-gray-800 text-lg">VidaZen</span>
      </Link>

      {location.pathname === "/auth/login" ? (
        <Link
          to="/auth/register"
          className="px-4 py-2 text-sm font-medium rounded-md bg-cyan-400 text-white hover:bg-cyan-500 transition-colors"
        >
          Registrarse
        </Link>
      ) : (
        <Link
          to="/auth/login"
          className="px-4 py-2 text-sm font-medium rounded-md bg-cyan-400 text-white hover:bg-cyan-500 transition-colors"
        >
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}
