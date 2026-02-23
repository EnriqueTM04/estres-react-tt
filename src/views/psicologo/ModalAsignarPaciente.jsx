import React, { useState } from 'react';
import { X, Users, Plus } from 'lucide-react';
import useSWR from 'swr';
import clienteAxios from '../../config/axios';

export default function ModalAsignarPaciente({ isOpen, onClose, onAsignado }) {
  const [asignandoId, setAsignandoId] = useState(null);
  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcherSinAsignar = () => clienteAxios.get('/api/pacientes', {
    params: {
      role: 'psicologo'
    },
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

  const { data: pacientesSinAsignar, isLoading, mutate } = useSWR(
    isOpen ? '/api/pacientes' : null, 
    fetcherSinAsignar
  );

  const handleAsignarPaciente = async (pacienteId) => {
    try {
      setAsignandoId(pacienteId);
      await clienteAxios.put(`/api/pacientes/${pacienteId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      mutate(); 
      onAsignado(); 
      
    } catch (error) {
      console.error("Error al asignar paciente:", error);
    } finally {
      setAsignandoId(null);
    }
  };

  if (!isOpen) return null;

  const listaSinAsignar = pacientesSinAsignar?.data || pacientesSinAsignar || [];

  return (
    <div className="fixed inset-0 z-50 bg-[#2C3E50]/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
      <div className="bg-white dark:bg-[#1a252f] rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white">Agregar Paciente</h3>
            <p className="text-sm text-[#5D6D7E] dark:text-[#BDC3C7] mt-1">Seleccione un paciente que requiera asignación.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#5D6D7E] hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FBFCFC] dark:bg-[#2C3E50]/50">
          {isLoading ? (
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
  );
}