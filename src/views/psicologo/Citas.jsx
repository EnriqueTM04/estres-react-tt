import React from 'react';
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
              <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white">Junio 2025</h3>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex bg-gray-100 dark:bg-[#1A252F] p-1 rounded-lg">
              <button className="px-3 py-1 text-sm font-medium rounded-md shadow-sm bg-white dark:bg-[#2C3E50] text-[#2C3E50] dark:text-white">Semana</button>
              <button className="px-3 py-1 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-[#2C3E50] dark:hover:text-white transition-colors">Mes</button>
              <button className="px-3 py-1 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-[#2C3E50] dark:hover:text-white transition-colors">Día</button>
            </div>
          </div>

          {/* Calendar Header Row */}
          <div className="grid grid-cols-8 gap-4 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
            {['Hora', 'Lun 16', 'Mar 17', 'Mié 18', 'Jue 19', 'Vie 20', 'Sáb 21', 'Dom 22'].map((day, i) => (
              <div key={i} className={`col-span-1 text-xs font-semibold uppercase tracking-wider text-center ${day === 'Mié 18' ? 'text-[#85C1E9]' : 'text-gray-400'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body (Scrollable) */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] hide-scrollbar pr-2 relative">
            
            {/* 09:00 AM Row */}
            <div className="grid grid-cols-8 gap-4 min-h-[80px]">
              <div className="col-span-1 text-xs text-gray-400 font-medium text-center pt-2">09:00 AM</div>
              <div className="col-span-1"></div>
              {/* Event Card */}
              <div className="col-span-1">
                <div className="bg-[#A2D9CE]/20 dark:bg-[#A2D9CE]/10 border-l-4 border-[#A2D9CE] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Elena R.</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-teal-700 dark:text-teal-300">Presencial</span>
                </div>
              </div>
              <div className="col-span-1 bg-[#FBFCFC] dark:bg-[#34495E]/30 rounded-lg"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1">
                <div className="bg-[#85C1E9]/20 dark:bg-[#85C1E9]/10 border-l-4 border-[#85C1E9] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">John D.</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-blue-700 dark:text-blue-300">En línea</span>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>

            {/* 10:00 AM Row */}
            <div className="grid grid-cols-8 gap-4 min-h-[80px]">
              <div className="col-span-1 text-xs text-gray-400 font-medium text-center pt-2">10:00 AM</div>
              <div className="col-span-1">
                <div className="bg-[#85C1E9]/20 dark:bg-[#85C1E9]/10 border-l-4 border-[#85C1E9] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Marcus L.</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-blue-700 dark:text-blue-300">En línea</span>
                </div>
              </div>
              <div className="col-span-1"></div>
              {/* Event with Current Time Indicator */}
              <div className="col-span-1 bg-[#FBFCFC] dark:bg-[#34495E]/30 rounded-lg relative">
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-red-400 z-10">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
                <div className="bg-[#A2D9CE]/20 dark:bg-[#A2D9CE]/10 border-l-4 border-[#A2D9CE] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow relative z-0">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Sophia W.</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-teal-700 dark:text-teal-300">Presencial</span>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>

            {/* 11:00 AM Row */}
            <div className="grid grid-cols-8 gap-4 min-h-[80px]">
              <div className="col-span-1 text-xs text-gray-400 font-medium text-center pt-2">11:00 AM</div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1 bg-[#FBFCFC] dark:bg-[#34495E]/30 rounded-lg"></div>
              <div className="col-span-1">
                <div className="bg-[#85C1E9]/20 dark:bg-[#85C1E9]/10 border-l-4 border-[#85C1E9] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Consulta</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-blue-700 dark:text-blue-300">En línea</span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-[#A2D9CE]/20 dark:bg-[#A2D9CE]/10 border-l-4 border-[#A2D9CE] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Grupal</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-teal-700 dark:text-teal-300">Presencial</span>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>

            {/* 12:00 PM Break */}
            <div className="grid grid-cols-8 gap-4 min-h-[80px]">
              <div className="col-span-1 text-xs text-gray-400 font-medium text-center pt-2">12:00 PM</div>
              <div className="col-span-7 border-t border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-400 uppercase tracking-widest bg-white dark:bg-[#2C3E50] px-2">Almuerzo</span>
              </div>
            </div>

            {/* 01:00 PM Row */}
            <div className="grid grid-cols-8 gap-4 min-h-[80px]">
              <div className="col-span-1 text-xs text-gray-400 font-medium text-center pt-2">01:00 PM</div>
              <div className="col-span-1">
                <div className="bg-[#85C1E9]/20 dark:bg-[#85C1E9]/10 border-l-4 border-[#85C1E9] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Seguimiento</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/50 dark:bg-[#2C3E50]/50 rounded text-[10px] font-semibold text-blue-700 dark:text-blue-300">En línea</span>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1 bg-[#FBFCFC] dark:bg-[#34495E]/30 rounded-lg">
                <div className="bg-[#85C1E9]/20 dark:bg-[#85C1E9]/10 border-l-4 border-[#85C1E9] p-2 rounded-r-md rounded-bl-sm h-full cursor-pointer hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-white truncate">Nuevo Paciente</p>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>
            
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
    </div>
  );
}