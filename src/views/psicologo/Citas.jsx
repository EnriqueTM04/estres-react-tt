import React from 'react';
import usevidaZen from '../../hooks/useVidaZen';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import EditarCitaModal from './EditarCitaModal';
import 'dayjs/locale/es';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.locale('es');

import { 
  Search, 
  Plus, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Video, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Check, 
  X,
  MoreHorizontal
} from 'lucide-react';

export default function Citas() {
  const {
    currentWeek,
    setCurrentWeek,
    getCita,
    daysOfWeek,
    setIsEditModalOpen,
    setSelectedCita,
    isEditModalOpen,
    selectedCita,
    obtenerCitasPorSemana
  } = usevidaZen();
  
  const horas = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00'
  ];


  return (
    <div className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
       {/* Inyección de fuente específica para esta vista */}
       <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* --- HEADER DE LA VISTA --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-white">Calendario de Citas</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona tus sesiones e interacciones con pacientes.</p>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Próximas Sesiones</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">0</h3>
            <p className="text-green-500 text-xs mt-2 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +0 hoy
            </p>
          </div>
          <div className="p-3 bg-[#A2D9CE]/20 rounded-full">
            <Calendar className="text-[#A2D9CE] w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        {/* <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pendientes</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">3</h3>
            <p className="text-[#85C1E9] text-xs mt-2 font-medium">Requiere acción</p>
          </div>
          <div className="p-3 bg-[#85C1E9]/20 rounded-full">
            <Clock className="text-[#85C1E9] w-6 h-6" />
          </div>
        </div> */}

        {/* Card 3 */}
        {/* <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">En línea hoy</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">{}</h3>
            <p className="text-gray-400 text-xs mt-2">Sesiones remotas</p>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Video className="text-indigo-500 dark:text-indigo-300 w-6 h-6" />
          </div>
        </div> */}
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* CALENDAR GRID (Left Side) */}
        <div className="flex-1 bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          
          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white">
                {currentWeek.format('MMMM YYYY')}
              </h3>
              <div className="flex gap-1">
                <button onClick={() => setCurrentWeek(w => w.subtract(1, 'week'))}>
                  <ChevronLeft />
                </button>

                <button onClick={() => setCurrentWeek(w => w.add(1, 'week'))}>
                  <ChevronRight />
                </button>

              </div>
            </div>
          </div>

          {/* Calendar Header Row */}
          <div className="grid grid-cols-6 gap-4 mb-4 border-b pb-2">
            <div className="text-xs font-semibold text-center text-gray-400">Hora</div>
            {daysOfWeek.map(day => (
              <div
                key={day.format('YYYY-MM-DD')}
                className="text-xs font-semibold text-center uppercase text-gray-400"
              >
                {day.format('ddd DD')}
              </div>
            ))}
          </div>

          {/* Calendar Body (Scrollable) */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] hide-scrollbar pr-2 relative">
            {horas.map(hora => (
              <div key={hora} className="grid grid-cols-6 gap-4 min-h-[80px]">
                
                {/* Hora */}
                <div className="text-xs text-gray-400 text-center pt-2">
                  {dayjs(`2026-01-01 ${hora}`).format('hh:mm A')}
                </div>

                {/* Lunes a Viernes */}
                {daysOfWeek.map(day => {
                const cita = getCita(day, hora);

                // Celda vacía
                if (!cita) {
                  return (
                    <div
                      key={day.format('YYYY-MM-DD')}
                      className="rounded-lg bg-transparent"
                    />
                  );
                }

                // Celda con cita
                return (
                  <div
                    key={cita.id ?? `${day.format('YYYY-MM-DD')}-${hora}`}
                    onClick={() => {
                      setSelectedCita(cita);
                      setIsEditModalOpen(true);
                    }}
                    className={`p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow
                      ${cita.tipo_sesion === 'seguimiento'
                        ? 'bg-[#85C1E9]/20 border-l-4 border-[#85C1E9]'
                        : 'bg-[#A2D9CE]/20 border-l-4 border-[#A2D9CE]'
                      }`}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="text-xs font-bold truncate">
                      {cita.paciente?.user?.name ?? 'Paciente'}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold">
                      {cita.tipo_sesion}
                    </span>
                  </div>
                );
              })}

              </div>
            ))}
          </div>
        </div>
      </div>

      <EditarCitaModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCita(null);
          obtenerCitasPorSemana(currentWeek.format('YYYY-MM-DD'));
        }}
        cita={selectedCita}
      />

    </div>
  );
}