import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileText, Activity } from 'lucide-react';
import clienteAxios from '../../config/axios';

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [mesActual, setMesActual] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    clienteAxios.get('/api/admin/estadisticas', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setMesActual(response.data.mes_actual);
        setEstadisticas(response.data.data);
      })
      .catch((error) => console.error('Error cargando estadísticas:', error))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 font-sans">
          Resumen de Psicólogos
        </h2>
        <p className="text-slate-500 capitalize">
          Actividad registrada en el mes de {mesActual}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estadisticas.map((psicologo) => (
          <div 
            key={psicologo.id} 
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6"
          >
            {/* Cabecera de la tarjeta */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">
                  {psicologo.nombre_psicologo}
                </h3>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Psicólogo
                </span>
              </div>
            </div>

            {/* Metricas */}
            <div className="space-y-4">
              {/* Metrica 1: Pacientes Activos */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm text-teal-500">
                    <Activity size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Pacientes con actividades<br /> realizadas
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-800">
                  {psicologo.pacientes_activos_mes}
                </span>
              </div>

              {/* Metrica 2: Cuestionarios Contestados */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm text-indigo-500">
                    <FileText size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Test contestados
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-800">
                  {psicologo.cuestionarios_mes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {estadisticas.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No hay datos de psicólogos registrados.
        </div>
      )}
    </div>
  );
};

export default Estadisticas;