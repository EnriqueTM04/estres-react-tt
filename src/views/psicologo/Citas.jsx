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
    citas,
    getCita,
    daysOfWeek,
    setIsEditModalOpen,
    setSelectedCita,
    isEditModalOpen,
    selectedCita
  } = usevidaZen();
    console.log('Citas en Citas.jsx:', citas);
  
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
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-2">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              className="bg-transparent border-none outline-none text-sm text-[#2C3E50] dark:text-white placeholder-gray-400 focus:ring-0 w-32 sm:w-auto" 
              placeholder="Buscar paciente..." 
              type="text"
            />
          </div>
          <button className="bg-[#85C1E9] hover:bg-[#6eb2e0] text-white dark:text-[#2C3E50] font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Programar Cita</span>
          </button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Próximas Sesiones</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">8</h3>
            <p className="text-green-500 text-xs mt-2 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2 hoy
            </p>
          </div>
          <div className="p-3 bg-[#A2D9CE]/20 rounded-full">
            <Calendar className="text-[#A2D9CE] w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pendientes</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">3</h3>
            <p className="text-[#85C1E9] text-xs mt-2 font-medium">Requiere acción</p>
          </div>
          <div className="p-3 bg-[#85C1E9]/20 rounded-full">
            <Clock className="text-[#85C1E9] w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#2C3E50] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">En línea hoy</p>
            <h3 className="text-3xl font-bold text-[#2C3E50] dark:text-white mt-1">5</h3>
            <p className="text-gray-400 text-xs mt-2">Sesiones remotas</p>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Video className="text-indigo-500 dark:text-indigo-300 w-6 h-6" />
          </div>
        </div>
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

        {/* SIDE PANELS (Right Side) */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          
          {/* Next Appointment Card */}
          <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-[#2C3E50] dark:text-white mb-4">Siguiente Cita</h3>
            <div className="flex items-center gap-4 mb-4">
              <img alt="Patient" className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" />
              <div>
                <h4 className="font-bold text-[#2C3E50] dark:text-white">Sophia Williams</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manejo de Ansiedad</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="text-[#A2D9CE] w-5 h-5" />
                <span>Hoy, 18 Oct</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="text-[#A2D9CE] w-5 h-5" />
                <span>10:00 AM - 11:00 AM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="text-[#A2D9CE] w-5 h-5" />
                <span className="bg-[#A2D9CE]/20 text-teal-800 dark:text-teal-200 text-xs px-2 py-0.5 rounded font-medium">Presencial</span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-[#2C3E50] hover:bg-[#34495E] text-white text-sm font-semibold py-2 rounded-xl transition-colors">Detalles</button>
              <button className="flex-1 border border-[#2C3E50] text-[#2C3E50] dark:border-white dark:text-white hover:bg-gray-50 dark:hover:bg-[#34495E] text-sm font-semibold py-2 rounded-xl transition-colors">Reagendar</button>
            </div>
          </div>

          {/* Requests Card */}
          <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2C3E50] dark:text-white">Solicitudes</h3>
              <span className="bg-[#85C1E9] text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="space-y-4">
              
              {/* Request Item 1 */}
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-[#FBFCFC] dark:bg-[#1A252F]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="text-sm font-bold text-[#2C3E50] dark:text-white">Alex Johnson</h5>
                    <p className="text-xs text-gray-500">Primera Consulta</p>
                  </div>
                  <span className="bg-[#85C1E9]/20 text-blue-800 dark:text-blue-200 text-[10px] px-1.5 py-0.5 rounded font-medium">En línea</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Sol: 20 Oct, 02:00 PM</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#A2D9CE] hover:bg-teal-300 text-[#2C3E50] text-xs font-bold py-1.5 rounded transition-colors flex justify-center"><Check className="w-4 h-4"/></button>
                  <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-600 dark:text-gray-300 text-xs font-bold py-1.5 rounded transition-colors flex justify-center"><X className="w-4 h-4"/></button>
                </div>
              </div>

              {/* Request Item 2 */}
              <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-[#FBFCFC] dark:bg-[#1A252F]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="text-sm font-bold text-[#2C3E50] dark:text-white">Maria G.</h5>
                    <p className="text-xs text-gray-500">Sesión Regular</p>
                  </div>
                  <span className="bg-[#A2D9CE]/20 text-teal-800 dark:text-teal-200 text-[10px] px-1.5 py-0.5 rounded font-medium">Presencial</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Sol: 21 Oct, 10:00 AM</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#A2D9CE] hover:bg-teal-300 text-[#2C3E50] text-xs font-bold py-1.5 rounded transition-colors flex justify-center"><Check className="w-4 h-4"/></button>
                  <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-600 dark:text-gray-300 text-xs font-bold py-1.5 rounded transition-colors flex justify-center"><X className="w-4 h-4"/></button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <EditarCitaModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCita(null);
        }}
        cita={selectedCita}
      />

    </div>
  );
}