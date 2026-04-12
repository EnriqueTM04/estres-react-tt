import { X } from 'lucide-react';

export default function ModalPrivacidad({ abierto, onClose }) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Modal */}
        <div className="p-6 md:px-10 md:pt-10 md:pb-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white">
            Aviso de Privacidad Integral
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors outline-none"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        {/* Cuerpo del Modal */}
        <div className="p-6 md:px-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            
            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">1. Identidad y Domicilio del Responsable</h3>
              <p>El responsable del tratamiento de sus datos personales es <strong>Vidazen</strong>, CDMX.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">2. Datos Personales Recabados</h3>
              <p className="mb-2">Para cumplir con las finalidades del servicio, recabaremos los siguientes datos:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><strong>De los Pacientes:</strong> Nombre completo, correo electrónico, edad, sexo, semestre académico, nivel de estrés percibido y resultados de cuestionarios de salud emocional.</li>
                <li><strong>De los Psicólogos:</strong> Nombre completo, correo electrónico.</li>
              </ul>
              <div className="p-4 bg-[#85C1E9]/10 border border-[#85C1E9]/30 rounded-xl text-[#2C3E50] dark:text-gray-300">
                <strong>Nota sobre Datos Sensibles:</strong> Los datos relacionados con su estado de salud mental (niveles de estrés y respuestas a cuestionarios) son considerados <strong>datos personales sensibles</strong>. Estos serán tratados con las más estrictas medidas de seguridad y confidencialidad.
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">3. Finalidades del Tratamiento</h3>
              <p className="mb-2">Sus datos serán utilizados para las siguientes finalidades necesarias:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Gestionar su registro y acceso a la plataforma móvil.</li>
                <li>Realizar el seguimiento de actividades de reducción de estrés.</li>
                <li>Evaluar y mostrar la evolución de los niveles de estrés mediante el Cuestionario de Estrés Percibido.</li>
                <li>Facilitar la interacción y canalización entre pacientes y psicólogos dentro de la aplicación.</li>
                <li>(Para psicólogos) Validar la acreditación profesional para la prestación de servicios.</li>
              </ul>
              <p>De manera secundaria, podremos utilizar sus datos de forma <strong>anónima</strong> para generar estadísticas académicas y mejorar las funciones de la aplicación.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">4. Transferencia de Datos</h3>
              <p>Se le informa que sus datos personales no serán compartidos con terceros, empresas o autoridades distintas al responsable, salvo que sea necesario para cumplir con una obligación legal o bajo el consentimiento explícito del usuario para su atención clínica directa.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">5. Derechos ARCO</h3>
              <p className="mb-2">Usted tiene derecho a conocer qué datos tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación), que la eliminemos de nuestros registros (Cancelación) o ponerse al uso de sus datos para fines específicos (Oposición).</p>
              <p>Para ejercer sus derechos ARCO, puede enviar una solicitud al correo electrónico: <strong>enriquetm@vidazenapp.com</strong>.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">6. Medidas de Seguridad</h3>
              <p>Contamos con medidas de seguridad administrativas, técnicas y físicas para proteger sus datos contra daño, pérdida, alteración o uso no autorizado.</p>
            </section>

          </div>
        </div>

        {/* Footer del Modal */}
        <div className="p-6 md:px-10 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20"
          >
            He leído y acepto el Aviso de Privacidad
          </button>
        </div>

      </div>
    </div>
  );
}