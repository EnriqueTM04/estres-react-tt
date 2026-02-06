import React from 'react';
import { 
  X, 
  Calendar, 
  Video, 
  Armchair, 
  Trash2 
} from 'lucide-react';

export default function EditAppointmentModal({ isOpen, onClose, cita }) {
  if (!isOpen || !cita) return null;

  const HORAS_DISPONIBLES = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];


  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      
      {/* Overlay (Fondo oscuro con desenfoque) */}
      <div 
        className="fixed inset-0 bg-[#2C3E50]/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose} 
      />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          
          {/* Modal Panel */}
          <div className="relative transform overflow-hidden rounded-xl bg-white dark:bg-[#2C3E50] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-200 font-['Nunito_Sans']">
            
            {/* Header */}
            <div className="bg-white dark:bg-[#2C3E50] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold leading-6 text-[#2C3E50] dark:text-white" id="modal-title">
                    Editar Cita
                  </h3>
                  <div className="mt-2 flex items-center gap-3">
                    <img 
                      alt="Patient" 
                      className="h-8 w-8 rounded-full border border-gray-200 object-cover" 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                    />
                    <div>
                        <p className="text-sm font-semibold">
                            {cita.paciente.user.name}
                        </p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="rounded-md bg-transparent text-gray-400 hover:text-[#2C3E50] dark:hover:text-white focus:outline-none transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body (Formulario) */}
            <div className="px-4 py-5 sm:p-6 space-y-5 bg-[#FBFCFC] dark:bg-[#1A252F]">
              
              {/* Fecha y Hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Fecha</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      defaultValue="2023-10-18"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1A252F] text-[#2C3E50] dark:text-white shadow-sm focus:border-[#85C1E9] focus:ring-[#85C1E9] sm:text-sm pl-10 py-2.5" 
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar className="text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Hora</label>
                  <select
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-[#1A252F] text-[#2C3E50] dark:text-white
                            shadow-sm focus:border-[#85C1E9] focus:ring-[#85C1E9]
                            sm:text-sm py-2.5"
                >
                {HORAS_DISPONIBLES.map(h => (
                    <option key={h} value={h}>
                    {h}
                    </option>
                ))}
                </select>

                </div>
              </div>

              {/* Modalidad Toggle */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Modalidad</label>
                <div className="flex rounded-lg bg-gray-100 dark:bg-[#1A252F] border border-gray-200 dark:border-gray-700 p-1">
                  
                  {/* Opción Inactiva */}
                  <button className="flex-1 rounded-md py-2 text-sm font-medium text-gray-500 hover:text-[#2C3E50] dark:hover:text-white transition-colors focus:outline-none flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    En línea
                  </button>
                  
                  {/* Opción Activa */}
                  <button className="flex-1 rounded-md bg-white dark:bg-[#2C3E50] shadow-sm py-2 text-sm font-bold text-teal-700 dark:text-teal-300 transition-all focus:outline-none flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600">
                    <Armchair className="w-4 h-4" />
                    Presencial
                  </button>
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Notas Privadas</label>
                <textarea 
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1A252F] text-[#2C3E50] dark:text-white shadow-sm focus:border-[#85C1E9] focus:ring-[#85C1E9] sm:text-sm p-3 resize-none" 
                  placeholder="Agregar detalles sobre la sesión..." 
                  rows="3"
                ></textarea>
              </div>
            </div>

            {/* Footer (Actions) */}
            <div className="bg-gray-50 dark:bg-[#1A252F]/50 px-4 py-4 sm:flex sm:flex-row-reverse sm:justify-between sm:px-6 gap-3">
              <div className="flex gap-3 sm:flex-row-reverse w-full sm:w-auto">
                <button 
                  type="button" 
                  className="inline-flex w-full justify-center rounded-lg bg-[#A2D9CE] px-5 py-2.5 text-sm font-bold text-[#2C3E50] shadow-sm hover:bg-teal-300 transition-colors sm:w-auto"
                >
                  Guardar Cambios
                </button>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-transparent px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-[#34495E] sm:mt-0 sm:w-auto transition-colors"
                >
                  Cancelar
                </button>
              </div>
              <button 
                type="button"
                className="mt-3 sm:mt-0 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}