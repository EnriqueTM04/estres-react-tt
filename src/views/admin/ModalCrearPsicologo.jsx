import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Lock } from 'lucide-react';
import clienteAxios from '../../config/axios';

export default function ModalAgregarPsicologo({ isOpen, onClose, refreshData, psicologoEditar }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditing = !!psicologoEditar;

  useEffect(() => {
    if (psicologoEditar) {
      setFormData({
        name: psicologoEditar?.user?.name || '',
        email: psicologoEditar.user.email,
        password: '',
        password_confirmation: ''
      });
    } else {
      setFormData({ name: '', email: '', password: '', password_confirmation: '' });
    }
    setError('');
  }, [psicologoEditar, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Si estamos creando, o si estamos editando Y escribieron una contraseña, validamos
    if ((!isEditing || formData.password) && formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const dataToSend = { ...formData };
      if (isEditing && !dataToSend.password) {
        delete dataToSend.password;
        delete dataToSend.password_confirmation;
      }

      // Decidimos si hacemos POST (Crear) o PUT (Editar)
      if (isEditing) {
        await clienteAxios.put(`/api/psicologos/${psicologoEditar.id}`, dataToSend, config);
      } else {
        await clienteAxios.post('/api/psicologos', dataToSend, config);
      }

      refreshData();
      onClose();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response?.data?.errors ?
          <div className="whitespace-pre-wrap">{Object.values(err.response.data.errors).flat().join('\n')}</div>
          : 'Error al procesar la solicitud'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-[#d0e7e7] bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header del Modal Dinámico */}
        <div className="flex items-center justify-between border-b border-[#d0e7e7] bg-[#f8fcfc] p-4">
          <h3 className="text-lg font-bold text-[#0e1b1b]">
            {isEditing ? 'Editar Psicólogo' : 'Agregar Nuevo Psicólogo'}
          </h3>
          <button onClick={onClose} className="text-[#4e9797] hover:text-[#0e1b1b] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#0e1b1b]">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4e9797]" size={18} />
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] py-2 pl-10 pr-4 text-[#0e1b1b] focus:outline-none focus:ring-2 focus:ring-[#4e9797]/20 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-[#0e1b1b]">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4e9797]" size={18} />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="psicologo@ejemplo.com"
                className="w-full rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] py-2 pl-10 pr-4 text-[#0e1b1b] focus:outline-none focus:ring-2 focus:ring-[#4e9797]/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#0e1b1b]">
                {isEditing ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4e9797]" size={18} />
                <input
                  required={!isEditing}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] py-2 pl-10 pr-4 text-[#0e1b1b] focus:outline-none focus:ring-2 focus:ring-[#4e9797]/20 transition-all"
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#0e1b1b]">Confirmar</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4e9797]" size={18} />
                <input
                  required={!isEditing}
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] py-2 pl-10 pr-4 text-[#0e1b1b] focus:outline-none focus:ring-2 focus:ring-[#4e9797]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer del Formulario */}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl h-11 px-4 border border-[#d0e7e7] text-[#0e1b1b] font-bold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl h-11 px-4 bg-[#4e9797] text-white font-bold hover:bg-[#3d7a7a] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : <><Save size={18} /> {isEditing ? 'Actualizar' : 'Guardar'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}