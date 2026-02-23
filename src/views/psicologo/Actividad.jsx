import React from 'react';
import { 
  ChevronRight, 
  Save, 
  Info, 
  ChevronDown, 
  Clock, 
  Delete
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';

export default function Actividad() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id: pacienteId, idActividad } = useParams(); 
    
  const isEditing = (!!idActividad && idActividad !== undefined);
  console.log(isEditing)

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    duracion: ''
  });

  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem('AUTH_TOKEN');
      try {
        clienteAxios.get(`/api/actividades/${idActividad}`, {
          params: { role: 'psicologo' },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            const { nombre, descripcion, tipo, tiempo_estimado_min } = res.data;
            console.log(tiempo_estimado_min);
            setFormData({ nombre, descripcion, categoria: tipo, duracion: tiempo_estimado_min });
            setLoading(false);
          })
          .catch(error => {
            console.error("Error al obtener datos de la actividad:", error);
          });
      } catch (error) {
        console.error("Error al obtener datos de la actividad:", error);
      }
    }
  }, [idActividad, isEditing]);

  const handleSave = () => {
    if (isEditing) {
    //   PUT
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        clienteAxios.put(`/api/actividades/${idActividad}`, { ...formData, role: 'psicologo' }, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            console.log("Actividad actualizada:", res.data);
            navigate(`/psicologo/pacientes/${pacienteId}`);
          })
          .catch(error => {
            console.error("Error al actualizar actividad:", error);
          });
      } catch (error) {
        
      }
    } else {
    //   POST
        try {
          const token = localStorage.getItem('AUTH_TOKEN');
          clienteAxios.post(`/api/actividades`, { ...formData, role: 'psicologo' }, {
            params: { role: 'psicologo', paciente_id: pacienteId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => {
              console.log("Actividad creada:", res.data);
              navigate(`/psicologo/pacientes/${pacienteId}`);
            })
            .catch(error => {
              console.error("Error al crear actividad:", error);
            });
        } catch (error) {
            
        }
    }
  };

  const handleDelete = () => {
      if (!confirm('¿Eliminar esta actividad?')) return;
        try {
            const token = localStorage.getItem('AUTH_TOKEN');
            clienteAxios.delete(`/api/actividades/${idActividad}`, {
              params: { role: 'psicologo', paciente_id: pacienteId },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(res => {
              console.log("Actividad eliminada:", res.data);
              navigate(`/psicologo/pacientes/${pacienteId}`);
            })
            .catch(error => {
              console.error("Error al eliminar actividad:", error);
            });
        } catch (error) {
              console.error("Error al eliminar actividad:", error);
        }
    }

  if(loading && isEditing) {
    return (
        <div className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
            <p className="text-center text-gray-500 dark:text-gray-400">Cargando datos de la actividad...</p>
        </div>
    );
  }

  return (
    <div className="flex-1 md:ml-64 p-6 lg:p-10 transition-all duration-300 font-['Nunito_Sans']">
      
      {/* Inyección de fuente */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');`}
      </style>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-2 text-sm text-[#5D6D7E] dark:text-[#BDC3C7]">
            <span className="text-[#85C1E9]">
              {isEditing ? 'Editar Actividad' : 'Nueva Actividad'}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-white">Editor de Actividad</h2>
          <p className="text-[#5D6D7E] dark:text-[#BDC3C7] mt-1">Configure los detalles básicos de la nueva actividad terapéutica.</p>
        </div>
        
        {/* Acciones del Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl text-[#5D6D7E] dark:text-[#BDC3C7] bg-gray-200 dark:bg-[#2C3E50] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
            Cancelar
          </button>
          {isEditing && (
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-bold text-sm">
                <Delete className="w-5 h-5" />
                Eliminar
            </button>
          )}
          <button onClick={handleSave} className="bg-[#A2D9CE] hover:bg-[#8ecfc3] text-[#2C3E50] px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-bold text-sm">
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </header>

      {/* --- FORMULARIO PRINCIPAL --- */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#2C3E50] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          
          {/* Título de la sección */}
          <h3 className="text-xl font-bold text-[#2C3E50] dark:text-white mb-8 flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
            <Info className="text-[#85C1E9] w-6 h-6" />
            Información General
          </h3>

          <div className="space-y-8">
            
            {/* Campo: Nombre */}
            <div>
              <label htmlFor="activity-name" className="block text-sm font-semibold text-[#2C3E50] dark:text-white mb-2">
                Nombre de la Actividad
              </label>
              <input 
                id="activity-name" 
                defaultValue={isEditing ? formData.nombre : ''}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                type="text"
                placeholder="Ej. Meditación Matutina de 5 Minutos" 
                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-[#FBFCFC] dark:bg-black/20 focus:border-[#85C1E9] focus:ring-1 focus:ring-[#85C1E9] text-base p-3.5 outline-none transition-colors dark:text-white dark:placeholder-gray-400" 
              />
            </div>

            {/* Campo: Descripción */}
            <div>
              <label htmlFor="activity-desc" className="block text-sm font-semibold text-[#2C3E50] dark:text-white mb-2">
                Descripción Detallada
              </label>
              <textarea 
                id="activity-desc" 
                rows="6"
                defaultValue={isEditing ? formData.descripcion : ''}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                placeholder="Describa el propósito y los pasos de esta actividad..." 
                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-[#FBFCFC] dark:bg-black/20 focus:border-[#85C1E9] focus:ring-1 focus:ring-[#85C1E9] text-base p-3.5 outline-none transition-colors resize-y min-h-[120px] dark:text-white dark:placeholder-gray-400" 
              />
              <p className="text-xs text-[#5D6D7E] dark:text-[#BDC3C7] mt-2 text-right">0/500 caracteres</p>
            </div>

            {/* Fila: Categoría y Duración */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Select: Categoría */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-[#2C3E50] dark:text-white mb-2">
                  Categoría
                </label>
                <div className="relative">
                  <input 
                    id="categoria"                    
                    defaultValue={isEditing ? formData.categoria : ''}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    type="text"
                    placeholder="Ej. Respiración, Mindfulness, Ejercicio Físico..." 
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-[#FBFCFC] dark:bg-black/20 focus:border-[#85C1E9] focus:ring-1 focus:ring-[#85C1E9] text-base p-3.5 outline-none transition-colors dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Input: Duración */}
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-[#2C3E50] dark:text-white mb-2">
                  Duración Estimada (min)
                </label>
                <div className="relative">
                  <input 
                    id="duration" 
                    defaultValue={isEditing ? formData.duracion : ''}
                    onChange={(e) => setFormData({...formData, duracion: e.target.value})}
                    type="number"
                    min="1"
                    placeholder="15" 
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-[#FBFCFC] dark:bg-black/20 focus:border-[#85C1E9] focus:ring-1 focus:ring-[#85C1E9] text-base p-3.5 pl-10 outline-none transition-colors dark:text-white dark:placeholder-gray-400" 
                  />
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}