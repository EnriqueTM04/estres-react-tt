import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  MoreVertical, 
  CalendarDays,
  AlertTriangle,
  TrendingUp,
  X 
} from 'lucide-react';
import useSWR from 'swr';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

export default function Pacientes() {
  const navigate = useNavigate();
  const token = localStorage.getItem('AUTH_TOKEN');

  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asignandoId, setAsignandoId] = useState(null);

  const fetcher = () => clienteAxios.get('/api/pacientes', {
    params: {
      role: 'psicologo',
      consulta: 'ultimos',
    },
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

  const { data, isLoading, mutate } = useSWR('/api/pacientes', fetcher);

  // --- 2. Fetcher para pacientes SIN asignar (Solo se ejecuta si el modal está abierto) ---
  const fetcherSinAsignar = () => clienteAxios.get('/api/pacientes', {
    params: {
      role: 'psicologo',
    },
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

  const { data: pacientes_sin_asignar, isLoading: cargandoSinAsignar, mutate: mutateSinAsignar } = useSWR(
    isModalOpen ? '/api/pacientes' : null, 
    fetcherSinAsignar
  );

  const pacientesSinAsignar = pacientes_sin_asignar?.pacientes_sin_asignar || [];

  // --- 3. Función para asignar paciente ---
  const handleAsignarPaciente = async (pacienteId) => {
    try {
      setAsignandoId(pacienteId);
      await clienteAxios.put(`/api/pacientes/${pacienteId}`, {}, {
        params: { role: 'psicologo' },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      mutate(); 
      mutateSinAsignar(); 
      
    } catch (error) {
      console.error("Error al asignar paciente:", error);
    } finally {
      setAsignandoId(null);
    }
  };

  if(isLoading) {
    return <div className="p-10 text-[#2C3E50] dark:text-white">Cargando...</div>
  }

  let estresAlto = 0;

  data?.data.forEach(paciente => {
    paciente.porcentaje = (paciente.nivel_estres_actual / 56) * 100;
    if(paciente.nivel_estres_actual < 20) {
      paciente.estres = 'Bajo';
    }
    if(paciente.nivel_estres_actual >= 20 && paciente.nivel_estres_actual <= 25) {
      paciente.estres = 'Moderado'
    }
    if(paciente.nivel_estres_actual > 25) {
      paciente.estres = 'Elevado'
      estresAlto++;
    }
  });

  // Para prevenir errores si la API devuelve directamente un array o un objeto paginado
  const listaSinAsignar = pacientesSinAsignar?.data || pacientesSinAsignar || [];

  return (
    <main className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans'] relative">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-white">Panel de Pacientes</h2>
          <p className="text-[#5D6D7E] dark:text-[#BDC3C7] mt-1">Gestione sus pacientes y monitoree su bienestar.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)} // <- Abre el modal
            className="bg-[#2C3E50] hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Nuevo Paciente
          </button>
        </div>
      </header>

      {/* Stats Cards (Mismo código tuyo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#A2D9CE]/20 flex items-center justify-center text-[#A2D9CE]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] font-medium">Total de Pacientes</p>
            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{data?.data.length}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#85C1E9]/20 flex items-center justify-center text-[#85C1E9]">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] font-medium">Próximas Sesiones</p>
            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{data?.sesiones_proximas}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] font-medium">Alertas de Estrés Alto</p>
            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{estresAlto}</h3>
          </div>
        </div>
      </div>

      {/* Table (Mismo código tuyo) */}
      <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-700">
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Paciente</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Progreso</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Nivel de Estrés</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Última Sesión</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data?.data.map((paciente) => (
                <tr key={paciente.id}
                onClick={() => navigate(`/psicologo/pacientes/${paciente.id}`)}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-[#2C3E50] dark:text-white group-hover:text-[#85C1E9] transition-colors">{paciente.user.name}</h4>
                        <p className="text-xs text-[#5D6D7E] dark:text-[#BDC3C7]">Semestre: {paciente.semestre}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1 w-32">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#5D6D7E] dark:text-[#BDC3C7]">Avance</span>
                        <span className={`font-bold text-[#85C1E9]`}>
                          {paciente.progreso_actividad?.progreso_porcentaje > 0 ? `${paciente.progreso_actividad.progreso_porcentaje}%` : '--'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-[#85C1E9]`} 
                          style={{ width: `${paciente.progreso_actividad?.progreso_porcentaje || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1 w-32">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#5D6D7E] dark:text-[#BDC3C7]">{paciente.estres}</span>
                        <span className={`font-bold ${
                          paciente.nivel_estres_actual > 25 ? 'text-red-500' : 
                          paciente.nivel_estres_actual > 19 ? 'text-[#85C1E9]' : 
                          paciente.nivel_estres_actual === 0 ? 'text-gray-400' : 'text-[#A2D9CE]'
                        }`}>
                          {paciente.nivel_estres_actual > 0 ? `${Math.round(paciente.nivel_estres_actual)}%` : '--'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            paciente.nivel_estres_actual > 25 ? 'bg-red-500' : 
                            paciente.nivel_estres_actual > 19 ? 'bg-[#85C1E9]' : 
                            paciente.nivel_estres_actual === 0 ? 'bg-transparent' : 'bg-[#A2D9CE]'
                          }`} 
                          style={{ width: `${paciente.porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className={`flex items-center gap-2 text-sm ${paciente.isUrgent ? 'text-red-600 dark:text-red-400 font-medium' : 'text-[#5D6D7E] dark:text-[#BDC3C7]'}`}>
                      {paciente.isUrgent ? <AlertTriangle className="w-4 h-4"/> : <CalendarDays className="w-4 h-4"/>}
                      {paciente.ultima_sesion?.fecha ? new Date(paciente.ultima_sesion.fecha).toLocaleDateString() : 'Sin sesiones'}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-gray-400 hover:text-[#85C1E9] dark:hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE PACIENTES SIN ASIGNAR --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C3E50]/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white dark:bg-[#1a252f] rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white">Agregar Paciente</h3>
                <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] mt-1">Seleccione un paciente que requiera asignación.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-[#5D6D7E] hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FBFCFC] dark:bg-[#2C3E50]/50">
              {cargandoSinAsignar ? (
                <div className="text-center text-[#5D6D7E] py-10 flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-[#85C1E9] border-t-transparent rounded-full animate-spin mb-4"></div>
                  Buscando pacientes disponibles...
                </div>
              ) : listaSinAsignar.length === 0 ? (
                <div className="text-center text-[#5D6D7E] py-10 bg-white dark:bg-[#2C3E50] rounded-xl border border-gray-100 dark:border-gray-700">
                  <Users className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  No hay pacientes sin asignar en este momento.
                </div>
              ) : (
                <div className="grid gap-3">
                  {listaSinAsignar.map(paciente => (
                    <div key={paciente.id} className="bg-white dark:bg-[#2C3E50] p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#85C1E9]/20 flex items-center justify-center text-[#85C1E9] font-bold text-lg">
                          {paciente.user?.name?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2C3E50] dark:text-white">{paciente.user?.name}</h4>
                          <p className="text-xs text-[#5D6D7E] dark:text-[#BDC3C7]">Semestre: {paciente.semestre}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleAsignarPaciente(paciente.id)}
                        disabled={asignandoId === paciente.id}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                          asignandoId === paciente.id 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                            : 'bg-[#A2D9CE] hover:bg-[#85C1E9] text-[#2C3E50] hover:text-white'
                        }`}
                      >
                        {asignandoId === paciente.id ? (
                          'Asignando...'
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Asignar
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
};