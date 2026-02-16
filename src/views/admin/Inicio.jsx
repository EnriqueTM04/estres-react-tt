import React from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';

export default function Inicio() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPsicologos, setTotalPsicologos] = useState(0);

  useEffect(() => {
    const consultarPsicologos = async () => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');

        const { data } = await clienteAxios.get('/api/psicologos', {
          params: {
            role: 'admin'
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPsicologos(data.data); 
        setTotalPsicologos(data.data.length);
      } catch (error) {
        console.error('Error al cargar psicólogos', error);
      } finally {
        setLoading(false);
      }
    };

    consultarPsicologos();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f8fcfc] font-sans overflow-x-hidden">
      {/* Inyección de fuentes */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap');
          body { font-family: 'Inter', 'Noto Sans', sans-serif; }
        `}
      </style>

      <div className="flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            
            {/* Header de la Sección */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#0e1b1b] text-[32px] font-bold leading-tight tracking-tight">
                  Administración de Usuarios
                </p>
                <p className="text-[#4e9797] text-sm font-normal leading-normal">
                  Gestiona todos los usuarios del sistema, incluyendo psicólogos y pacientes.
                </p>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7f3f3] hover:bg-[#d0e7e7] text-[#0e1b1b] text-sm font-bold leading-normal transition-colors gap-2">
                <Plus size={18} />
                <span className="truncate">Agregar Psicólogo</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0e7e7] bg-white shadow-sm">
                <p className="text-[#0e1b1b] text-base font-medium leading-normal">Usuarios Registrados</p>
                <p className="text-[#0e1b1b] tracking-tight text-3xl font-bold leading-tight">{totalPsicologos}</p>
              </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-[#f8fcfc] border-b border-[#d0e7e7]">
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal w-[25%]">Nombre</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal w-[30%]">Correo Electrónico</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal w-[15%]">Rol</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal w-[15%]">Estado</th>
                        <th className="px-4 py-4 text-right text-[#4e9797] text-sm font-bold leading-normal w-[15%]">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psicologos.map((psicologo) => (
                        <tr key={psicologo.id} className="border-t border-[#d0e7e7] hover:bg-[#e7f3f3]/30 transition-colors">
                          <td className="px-4 py-4 text-[#0e1b1b] text-sm font-medium">
                            {psicologo.user.name}
                          </td>
                          <td className="px-4 py-4 text-[#4e9797] text-sm">
                            {psicologo.user.email}
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center justify-center rounded-xl h-8 px-4 bg-[#e7f3f3] text-[#0e1b1b] text-sm font-medium w-full max-w-[120px]">
                              {psicologo.user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center justify-center gap-2 rounded-xl h-8 px-4 text-sm font-medium w-full max-w-[140px] border ${
                              psicologo.user.verified 
                                ? 'bg-[#e7f3f3] border-transparent text-[#0e1b1b]' 
                                : 'bg-transparent border-[#d0e7e7] text-gray-500'
                            }`}>
                              {psicologo.user.verified ? (
                                <>
                                  <CheckCircle size={14} className="text-green-600"/> Verificado
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} className="text-gray-400"/> Pendiente
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-[#4e9797] hover:text-[#0e1b1b] hover:bg-[#e7f3f3] rounded-lg transition-colors" title="Editar">
                                <Edit2 size={18} />
                              </button>
                              <button className="p-2 text-[#4e9797] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}