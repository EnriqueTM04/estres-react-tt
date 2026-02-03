import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  Search, 
  Plus, 
  MoreVertical, 
  CalendarDays,
  AlertTriangle,
  TrendingUp,
  Flower
} from 'lucide-react';
import useSWR from 'swr';
import clienteAxios from '../../config/axios';

// ----------------------------------------------------------------------
// 2. COMPONENTE MAIN (Contenido Restante)
// ----------------------------------------------------------------------
export default function Pacientes() {

  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcher = () =>
  clienteAxios.get('/api/sesiones', {
    params: {
      role: 'psicologo',
      consulta: 'ultimos'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);

  const {
    data: sesionesData, error: sesionesError, isLoading: sesionesLoading
  } = useSWR('/api/sesiones', fetcher);

  const fetcher2 = () =>
  clienteAxios.get('/api/pacientes', {
    params: {
      role: 'psicologo'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);

  const {data, error, isLoading} = useSWR('/api/pacientes', fetcher2);

  if(isLoading) {
    return <div>Cargando...</div>
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

  return (
    <main className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-white">Panel de Pacientes</h2>
          <p className="text-[#5D6D7E] dark:text-[#BDC3C7] mt-1">Gestione sus pacientes y monitoree su bienestar.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2C3E50] focus:ring-2 focus:ring-[#85C1E9] focus:border-transparent outline-none text-sm w-64 transition-shadow" 
              placeholder="Buscar pacientes..." 
              type="text"
            />
          </div>
          <button className="bg-[#2C3E50] hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Nuevo Paciente
          </button>
        </div>
      </header>

      {/* Stats Cards */}
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
            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">12</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] font-medium">Alertas de Estrés Alto</p>
            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{estresAlto}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-[#2C3E50] text-white text-sm font-medium shadow-sm transition-colors">Todos los Pacientes</button>
          <button className="px-4 py-2 rounded-full bg-white dark:bg-[#2C3E50] text-[#5D6D7E] dark:text-[#BDC3C7] hover:text-[#2C3E50] dark:hover:text-white text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-[#85C1E9] transition-colors">Recientes</button>
          <button className="px-4 py-2 rounded-full bg-white dark:bg-[#2C3E50] text-[#5D6D7E] dark:text-[#BDC3C7] hover:text-[#2C3E50] dark:hover:text-white text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-[#85C1E9] transition-colors">Críticos</button>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5D6D7E] dark:text-[#BDC3C7]">
          <span>Ordenar por:</span>
          <select className="bg-transparent border-none font-semibold text-[#2C3E50] dark:text-white focus:ring-0 cursor-pointer pr-8 outline-none">
            <option>Última Sesión</option>
            <option>Nivel de Estrés</option>
            <option>Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-700">
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Paciente</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Estado</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Nivel de Estrés</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7]">Última Sesión</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#5D6D7E] dark:text-[#BDC3C7] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data?.data.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img 
                        alt="User avatar" 
                        className="w-10 h-10 rounded-full object-cover" 
                        src={`https://images.unsplash.com/photo-${paciente.img === "2" ? "1438761681033-6461ffad8d80" : paciente.img === "3" ? "1500648767791-00dcc994a43e" : "1544005313-94ddf0286df2"}?auto=format&fit=crop&q=80&w=100&h=100`} 
                      />
                      <div>
                        <h4 className="font-semibold text-[#2C3E50] dark:text-white group-hover:text-[#85C1E9] transition-colors">{paciente.user.name}</h4>
                        <p className="text-xs text-[#5D6D7E] dark:text-[#BDC3C7]">Semestre: {paciente.semestre}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${paciente.status === 'Activo' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                        paciente.status === 'Monitoreo' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {paciente.status}
                    </span>
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
                          {paciente.nivel_estres_actual > 0 ? `${paciente.nivel_estres_actual}%` : '--'}
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
                      {paciente.date}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-gray-400 hover:text-[#85C1E9] dark:hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {/* <div className="flex items-center justify-between p-5 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#2C3E50]">
          <span className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7]">Mostrando <span className="font-semibold text-[#2C3E50] dark:text-white">1-5</span> de <span className="font-semibold text-[#2C3E50] dark:text-white">48</span> pacientes</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded text-[#5D6D7E] dark:text-[#BDC3C7] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded text-[#5D6D7E] dark:text-[#BDC3C7] hover:bg-gray-50 dark:hover:bg-white/5">Siguiente</button>
          </div>
        </div> */}
      </div>
    </main>
  );
};