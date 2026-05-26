import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import clienteAxios from '../../config/axios';
import ModalAgregarPsicologo from './ModalCrearPsicologo';
import BrandDialog from '../../components/BrandDialog';

export default function Inicio() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPsicologos, setTotalPsicologos] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [psicologoEditar, setPsicologoEditar] = useState(null);
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    type: 'info',
    message: ''
  });
  const [confirmEliminarDialog, setConfirmEliminarDialog] = useState({
    open: false,
    psicologo: null
  });

  const consultarPsicologos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('AUTH_TOKEN');

      const { data } = await clienteAxios.get('/api/psicologos', {
        params: { role: 'admin' },
        headers: { Authorization: `Bearer ${token}` },
      });

      setPsicologos(data.data);
      setTotalPsicologos(data.data.length);
    } catch (error) {
      console.error('Error al cargar psicólogos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consultarPsicologos();
  }, []);

  // Función para abrir el modal en modo CREAR
  const handleCrear = () => {
    setPsicologoEditar(null);
    setIsModalOpen(true);
  };

  // Función para abrir el modal en modo EDITAR
  const handleEditar = (psicologo) => {
    setPsicologoEditar(psicologo);
    setIsModalOpen(true);
  };

  const handleEliminar = async () => {
    const psicologo = confirmEliminarDialog.psicologo;
    if (!psicologo) return;

    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      await clienteAxios.delete(`/api/psicologos/${psicologo.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await consultarPsicologos();
      setConfirmEliminarDialog({ open: false, psicologo: null });
      setFeedbackDialog({
        open: true,
        type: 'success',
        message: `${psicologo.user?.name || 'El psicologo'} fue eliminado correctamente.`
      });
    } catch (error) {
      console.error('Error al eliminar psicólogo', error);
      setConfirmEliminarDialog({ open: false, psicologo: null });
      setFeedbackDialog({
        open: true,
        type: 'error',
        message: 'No se pudo eliminar el psicologo. Intente nuevamente.'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0e1b1b]"></div>
      </div>
    );
  }

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
        {/* Cambié los márgenes laterales para que sean progresivos (sm, lg, xl) en lugar de saltar directo a md:px-40 */}
        <div className="px-4 sm:px-6 lg:px-12 xl:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-[960px] flex-1">

            {/* Header de la Sección */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4 p-4">
              <div className="flex w-full sm:w-auto sm:min-w-72 flex-col gap-2 sm:gap-3">
                <p className="text-[#0e1b1b] text-2xl sm:text-[32px] font-bold leading-tight tracking-tight">
                  Administración de Usuarios
                </p>
                <p className="text-[#4e9797] text-sm font-normal leading-normal">
                  Gestiona todos los usuarios del sistema, incluyendo psicólogos y pacientes.
                </p>
              </div>
              <button
                onClick={handleCrear}
                className="flex w-full sm:w-auto min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7f3f3] hover:bg-[#d0e7e7] text-[#0e1b1b] text-sm font-bold leading-normal transition-colors gap-2">
                <Plus size={18} />
                <span>Agregar Psicólogo</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex w-full sm:w-auto min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0e7e7] bg-white shadow-sm">
                <p className="text-[#0e1b1b] text-base font-medium leading-normal">Usuarios Registrados</p>
                <p className="text-[#0e1b1b] tracking-tight text-3xl font-bold leading-tight">{totalPsicologos}</p>
              </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="px-2 sm:px-4 py-3">
              <div className="overflow-hidden rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] shadow-sm w-full">
                {/* Contenedor con scroll horizontal */}
                <div className="overflow-x-auto w-full">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-[#f8fcfc] border-b border-[#d0e7e7]">
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal whitespace-nowrap">Nombre</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal whitespace-nowrap">Correo Electrónico</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal whitespace-nowrap">Rol</th>
                        <th className="px-4 py-4 text-left text-[#0e1b1b] text-sm font-bold leading-normal whitespace-nowrap">Correo confirmado</th>
                        <th className="px-4 py-4 text-right text-[#4e9797] text-sm font-bold leading-normal whitespace-nowrap">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psicologos.map((psicologo) => (
                        <tr key={psicologo.id} className="border-t border-[#d0e7e7] hover:bg-[#e7f3f3]/30 transition-colors">
                          <td className="px-4 py-4 text-[#0e1b1b] text-sm font-medium whitespace-nowrap">
                            {psicologo.user?.name || 'Sin nombre'}
                          </td>
                          <td className="px-4 py-4 text-[#4e9797] text-sm whitespace-nowrap">
                            {psicologo.user.email}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center rounded-xl h-8 px-4 bg-[#e7f3f3] text-[#0e1b1b] text-sm font-medium w-full max-w-[120px]">
                              {psicologo.user?.role || 'N/A'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center gap-2 rounded-xl h-8 px-4 text-sm font-medium w-full max-w-[140px] border ${psicologo.user.verified
                              ? 'bg-[#e7f3f3] border-transparent text-[#0e1b1b]'
                              : 'bg-transparent border-[#d0e7e7] text-gray-500'
                              }`}>
                              {psicologo.user.email_verified_at ? (
                                <>
                                  <CheckCircle size={14} className="text-green-600" /> Verificado
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} className="text-gray-400" /> Pendiente
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditar(psicologo)}
                                className="p-2 text-[#4e9797] hover:text-[#0e1b1b] hover:bg-[#e7f3f3] rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => setConfirmEliminarDialog({ open: true, psicologo })}
                                className="p-2 text-[#4e9797] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
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

      <ModalAgregarPsicologo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshData={consultarPsicologos}
        psicologoEditar={psicologoEditar}
        onSuccess={({ type, message }) => {
          setFeedbackDialog({
            open: true,
            type: type || 'success',
            message,
          });
        }}
      />

      <BrandDialog
        isOpen={confirmEliminarDialog.open}
        title="VidaZen"
        message={`¿Estás seguro de eliminar a ${confirmEliminarDialog.psicologo?.user?.name || 'este psicologo'}?`}
        confirmText="Aceptar"
        cancelText="Cancelar"
        showCancel
        onConfirm={handleEliminar}
        onClose={() => setConfirmEliminarDialog({ open: false, psicologo: null })}
      />

      <BrandDialog
        isOpen={feedbackDialog.open}
        title="VidaZen"
        message={feedbackDialog.message}
        variant={feedbackDialog.type}
        onClose={() => setFeedbackDialog({ open: false, type: 'info', message: '' })}
      />
    </div>
  );
}