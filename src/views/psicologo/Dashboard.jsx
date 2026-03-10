import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          navigate('/login');
          return;
        }

        const { data } = await clienteAxios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setMetricas(data);
      } catch (error) {
        console.error("Error cargando el dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricas();
  }, [navigate]);

  if (loading) return (
    <div className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
      <p className="text-center text-gray-500 dark:text-gray-400">Cargando información...</p>
    </div>
  );
  if (!metricas) return <div className="p-10 text-center text-red-500">Error al cargar datos.</div>;

  // Cálculos para porcentajes de estrés
  const pctEstresAlto = Math.round((metricas.estres.alto / metricas.estres.total) * 100);
  const pctEstresMedio = Math.round((metricas.estres.medio / metricas.estres.total) * 100);
  const pctEstresBajo = Math.round((metricas.estres.bajo / metricas.estres.total) * 100);

  return (
    <div className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="bg-[#FBFCFC] dark:bg-[#1a252f] font-['Nunito_Sans'] transition-colors duration-200 min-h-screen flex text-[#2C3E50] dark:text-[#FBFCFC] antialiased">
        <main className="flex-1 p-6 lg:p-10 transition-all duration-300">
          
          {/* Header (Mismo código de antes) */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
             {/* ... (código del header) ... */}
          </header>

          {/* Tarjetas de Métricas DINÁMICAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {/* Total de Pacientes */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#85C1E9]/10 flex items-center justify-center text-[#85C1E9]">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <div>
                <p className="text-sm text-[#5D6D7E] font-medium mb-1">Total de Pacientes</p>
                <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{metricas.pacientes.total}</h3>
                <span className="text-xs text-green-500 font-semibold flex items-center mt-1">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> 
                  +{metricas.pacientes.nuevos_mes} este mes
                </span>
              </div>
            </div>

            {/* Sesiones del Mes */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#A2D9CE]/20 flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined text-3xl">event_note</span>
              </div>
              <div>
                <p className="text-sm text-[#5D6D7E] font-medium mb-1">Sesiones del Mes</p>
                <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{metricas.sesiones.actual}</h3>
                <span className="text-xs text-[#5D6D7E] mt-1">vs. {metricas.sesiones.mes_pasado} mes pasado</span>
              </div>
            </div>

            {/* % Actividades Completadas */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <div>
                <p className="text-sm text-[#5D6D7E] font-medium mb-1">% Actividades Completadas</p>
                <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{metricas.actividades.porcentaje}%</h3>
                <span className="text-xs text-green-500 font-semibold flex items-center mt-1">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +{metricas.actividades.tendencia}%
                </span>
              </div>
            </div>

            {/* Alertas Críticas */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div>
                <p className="text-sm text-[#5D6D7E] font-medium mb-1">Alertas Críticas</p>
                <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">{metricas.alertas_criticas}</h3>
                <span className="text-xs text-red-500 font-semibold mt-1">Requieren atención</span>
              </div>
            </div>
          </div>

          {/* Gráficas Circulares DINÁMICAS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            
            {/* Nivel de Estrés */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] dark:text-white">Nivel de Estrés</h3>
                <button className="text-[#5D6D7E] hover:text-[#2C3E50]">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                {/* Aquí inyectamos los porcentajes reales en el conic-gradient */}
                <div 
                  className="w-full h-full rounded-full transition-all duration-1000" 
                  style={{ 
                    background: `conic-gradient(#EF4444 0% ${pctEstresAlto}%, #F59E0B ${pctEstresAlto}% ${pctEstresAlto + pctEstresMedio}%, #A2D9CE ${pctEstresAlto + pctEstresMedio}% 100%)` 
                  }}
                ></div>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-[#2C3E50] rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-xs text-[#5D6D7E]">Total</span>
                  <span className="text-2xl font-bold text-[#2C3E50] dark:text-white">{metricas.pacientes.total}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-[#5D6D7E]">Alto (Crítico)</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2C3E50] dark:text-white">{pctEstresAlto}% ({metricas.estres.alto})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="text-sm text-[#5D6D7E]">Medio</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2C3E50] dark:text-white">{pctEstresMedio}% ({metricas.estres.medio})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#A2D9CE]"></span>
                    <span className="text-sm text-[#5D6D7E]">Bajo</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2C3E50] dark:text-white">{pctEstresBajo}% ({metricas.estres.bajo})</span>
                </div>
              </div>
            </div>

            {/* Progreso de Actividades */}
            <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
               <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] dark:text-white">Progreso de Actividades</h3>
              </div>
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div 
                  className="w-full h-full rounded-full transition-all duration-1000" 
                  style={{ background: `conic-gradient(#85C1E9 0% ${metricas.actividades.porcentaje}%, #F3F4F6 ${metricas.actividades.porcentaje}% 100%)` }}
                ></div>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-[#2C3E50] rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-3xl font-bold text-[#2C3E50] dark:text-white">{metricas.actividades.porcentaje}%</span>
                  <span className="text-xs text-[#5D6D7E]">Global</span>
                </div>
              </div>
              <div className="mt-6 flex justify-around text-center">
                <div>
                  <span className="block text-2xl font-bold text-[#85C1E9]">{metricas.actividades.completadas}</span>
                  <span className="text-xs text-[#5D6D7E] uppercase tracking-wide">Completadas</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-gray-300">{metricas.actividades.pendientes}</span>
                  <span className="text-xs text-[#5D6D7E] uppercase tracking-wide">Pendientes</span>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;