import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import {
  X,
  Calendar,
  Video,
  Armchair,
  Trash2
} from 'lucide-react';

export default function EditarCitaModal({ isOpen, onClose, cita }) {

  // Hooks
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('09:00');
  const [modalidad, setModalidad] = useState('');
  const [notas, setNotas] = useState('');

  // Sincronizar cuando cambia la cita
  useEffect(() => {
    if (!cita) return;

    setFecha(cita.fecha);
    setHora(cita.hora.slice(0, 5)); // HH:mm
    setModalidad(cita.tipo_sesion);
    setNotas(cita.notas ?? '');
  }, [cita]);

  // Early return DESPUÉS de hooks
  if (!isOpen || !cita) return null;

  const HORAS_DISPONIBLES = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSave = async (id) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    try {
      await clienteAxios.put(
        `/api/sesiones/${id}`,
        {
          fecha,
          hora,
          modalidad,
          notas,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error('Error al guardar cambios', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    if (!confirm('¿Eliminar esta cita?')) return;

    try {
      await clienteAxios.delete(
        `/api/sesiones/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error('Error al eliminar cita', error);
    }
  };

  return (
    <div className="relative z-50" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#2C3E50]/60 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-[#2C3E50] shadow-xl border border-gray-200 dark:border-gray-700 font-['Nunito_Sans'] overflow-hidden">
          
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start bg-white dark:bg-[#2C3E50]">
            <div>
              <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white">
                Editar Cita
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cita.paciente?.user?.name || 'Sin nombre'}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="px-6 py-5 space-y-5 bg-[#FBFCFC] dark:bg-[#1A252F]">
            {/* Fecha */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                Fecha
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3E50] text-gray-900 dark:text-white pl-10 py-2.5 text-sm focus:ring-[#85C1E9] focus:border-[#85C1E9]"
                />
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Hora */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                Hora
              </label>
              <select
                value={hora}
                onChange={e => setHora(e.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3E50] text-gray-900 dark:text-white py-2.5 text-sm focus:ring-[#85C1E9] focus:border-[#85C1E9]"
              >
                {HORAS_DISPONIBLES.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Modalidad */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                Modalidad
              </label>
              <div className="flex rounded-lg bg-gray-100 dark:bg-[#2C3E50] p-1 border border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setModalidad('virtual')}
                  className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all
                    ${modalidad === 'virtual'
                      ? 'bg-white dark:bg-[#85C1E9] shadow font-bold text-teal-700 dark:text-[#2C3E50]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                  <Video className="w-4 h-4" />
                  En línea
                </button>
                <button
                  onClick={() => setModalidad('presencial')}
                  className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all
                    ${modalidad === 'presencial'
                      ? 'bg-white dark:bg-[#85C1E9] shadow font-bold text-teal-700 dark:text-[#2C3E50]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                  <Armchair className="w-4 h-4" />
                  Presencial
                </button>
              </div>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                Notas
              </label>
              <textarea
                value={notas}
                onChange={e => setNotas(e.target.value)}
                rows="3"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3E50] text-gray-900 dark:text-white p-3 text-sm resize-none focus:ring-[#85C1E9] focus:border-[#85C1E9]"
                placeholder="Notas privadas de la sesión"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2C3E50] flex justify-between items-center">
            <button
              onClick={() => handleDelete(cita.id)}
              className="text-red-600 dark:text-red-400 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSave(cita.id)}
                className="px-5 py-2 rounded-lg bg-[#A2D9CE] hover:bg-[#8ecbc0] dark:bg-[#85C1E9] dark:hover:bg-[#74b0d8] font-bold text-[#2C3E50] transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
