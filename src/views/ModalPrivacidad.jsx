import { X } from 'lucide-react';

export default function ModalPrivacidad({ abierto, onClose }) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200">

        {/* Cabecera del Modal */}
        <div className="p-6 md:px-10 md:pt-10 md:pb-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-['Montserrat'] font-bold text-[#2C3E50] dark:text-white">
            Aviso de Privacidad de VidaZen
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
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">1. Responsable del tratamiento de datos personales</h3>
              <p className="mb-2">VidaZen es un proyecto académico desarrollado por estudiantes del Instituto Politécnico Nacional. Para efectos del presente proyecto, el equipo desarrollador de VidaZen será responsable del tratamiento de los datos personales recabados a través de la aplicación móvil y la plataforma web.</p>
              <p>El tratamiento de los datos personales se realizará únicamente para las finalidades relacionadas con el funcionamiento académico, técnico y operativo de VidaZen.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">2. Datos Personales Recabados</h3>
              <p className="mb-2">VidaZen podrá recabar los siguientes datos personales del usuario:</p>
              <p className="font-semibold mb-1">Datos de identificación:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Nombre.</li>
                <li>Correo electrónico.</li>
                <li>Contraseña, almacenada mediante mecanismos de hashing.</li>
              </ul>
              <p className="font-semibold mb-1">Datos relacionados con el uso del sistema:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fecha y hora de registro.</li>
                <li>Fecha y hora de inicio de sesión.</li>
                <li>Interacciones con los módulos del sistema.</li>
                <li>Actividades realizadas dentro de la plataforma.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">3. Datos personales sensibles</h3>
              <p className="mb-2">Debido a la naturaleza de VidaZen, la plataforma podrá tratar datos personales sensibles relacionados con el estado emocional y psicológico del usuario, tales como:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Resultados del test de estrés percibido PSS-14.</li>
                <li>Registros de nivel de estrés capturados dentro de la aplicación.</li>
                <li>Historial de sesiones psicológicas registradas en la plataforma.</li>
                <li>Actividades realizadas dentro del proceso terapéutico.</li>
                <li>Información registrada por el usuario como parte de su seguimiento dentro de VidaZen.</li>
              </ul>
              <p>Estos datos serán tratados bajo medidas de seguridad, confidencialidad y acceso restringido por roles y permisos, permitiendo su consulta únicamente al usuario, al psicólogo asignado y al personal autorizado para la administración técnica del sistema, cuando sea estrictamente necesario.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">4. Finalidades del tratamiento de datos personales</h3>
              <p className="font-semibold mb-1">Finalidades principales:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Crear y administrar la cuenta del usuario.</li>
                <li>Permitir el acceso seguro a la aplicación móvil y plataforma web.</li>
                <li>Registrar y consultar resultados del test de estrés.</li>
                <li>Dar seguimiento al progreso del usuario dentro de VidaZen.</li>
                <li>Facilitar la comunicación y acompañamiento entre paciente y psicólogo.</li>
                <li>Mostrar al psicólogo asignado el historial de registros, resultados y actividades del paciente dentro de la plataforma.</li>
                <li>Administrar sesiones psicológicas registradas en el sistema.</li>
                <li>Mantener la operación técnica y funcional de la plataforma.</li>
              </ul>
              <p className="font-semibold mb-1">Finalidades secundarias:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mejorar la funcionalidad de la aplicación.</li>
                <li>Realizar análisis estadísticos con fines académicos, utilizando información agregada o anonimizada.</li>
                <li>Evaluar el funcionamiento general del sistema como parte del desarrollo del proyecto académico.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">5. Consentimiento expreso para datos personales sensibles</h3>
              <p className="mb-2">Al tratarse de datos personales sensibles relacionados con el estado emocional y psicológico del usuario, VidaZen solicitará el consentimiento expreso del titular antes de realizar el tratamiento de dicha información.</p>
              <p className="mb-2">El usuario deberá aceptar el Aviso de Privacidad y otorgar su consentimiento expreso mediante una casilla de aceptación dentro de la aplicación o plataforma. El sistema podrá registrar la fecha, hora y versión del aviso aceptado como evidencia de dicho consentimiento.</p>
              <p><strong>Texto sugerido para la casilla de aceptación:</strong> “He leído y acepto el Aviso de Privacidad de VidaZen y otorgo mi consentimiento expreso para el tratamiento de mis datos personales sensibles relacionados con mi estado emocional, resultados de pruebas, registros de estrés y actividades realizadas dentro de la plataforma.”</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">6. Protección y resguardo de la información</h3>
              <p className="font-semibold mb-1">Medidas técnicas:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Hashing seguro de contraseñas.</li>
                <li>Uso de consultas preparadas u ORM para reducir riesgos de SQL Injection.</li>
                <li>Validación de datos en backend.</li>
                <li>Control de acceso basado en roles.</li>
                <li>Restricción de acceso a información sensible.</li>
                <li>No almacenamiento de contraseñas en texto plano.</li>
              </ul>
              <p className="font-semibold mb-1">Medidas administrativas:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acceso limitado únicamente a usuarios autorizados.</li>
                <li>Uso de la información exclusivamente para fines académicos y operativos del sistema.</li>
                <li>Manejo responsable de datos personales y datos personales sensibles.</li>
                <li>Compromiso de confidencialidad por parte de usuarios con acceso a información sensible, como psicólogos o administradores.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">7. Principios considerados conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares</h3>
              <p className="mb-2">VidaZen considera los principios de consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad en el tratamiento de los datos personales.</p>
              <p>Asimismo, el sistema busca aplicar buenas prácticas de seguridad orientadas a preservar la confidencialidad, integridad y disponibilidad de la información.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">8. Transferencia, remisión o uso de proveedores tecnológicos</h3>
              <p className="mb-2">VidaZen no vende datos personales ni los comparte con terceros para fines comerciales.</p>
              <p className="mb-2">La información podrá ser almacenada o procesada mediante proveedores tecnológicos necesarios para la operación del sistema, tales como servicios de alojamiento, base de datos, correo electrónico o almacenamiento en la nube. Dichos proveedores serán utilizados únicamente para fines técnicos y operativos relacionados con el funcionamiento de VidaZen, procurando mantener medidas de seguridad y confidencialidad.</p>
              <p>El acceso funcional a la información del paciente será exclusivo del usuario, del psicólogo asignado y del personal autorizado para la administración técnica del sistema cuando sea necesario.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">9. Derechos ARCO</h3>
              <p className="mb-2">El usuario podrá ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición respecto al tratamiento de sus datos personales.</p>
              <p className="mb-2">Para ejercer estos derechos, el usuario podrá enviar una solicitud al correo electrónico: <strong>enriquetm@vidazenapp.com</strong>.</p>
              <p className="mb-2">La solicitud deberá incluir:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre completo.</li>
                <li>Correo electrónico registrado en VidaZen.</li>
                <li>Derecho que desea ejercer.</li>
                <li>Descripción clara de la solicitud.</li>
                <li>Medio de contacto para recibir respuesta.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">10. Revocación del consentimiento y eliminación de datos</h3>
              <p className="mb-2">El usuario podrá solicitar la revocación de su consentimiento o la eliminación de sus datos personales cuando así lo desee, enviando una solicitud al correo electrónico de contacto.</p>
              <p>La eliminación de datos estará sujeta a las necesidades operativas, académicas o técnicas del proyecto, así como a los plazos de conservación aplicables.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">11. Conservación de la información</h3>
              <p className="mb-2">Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades del proyecto académico y para permitir el funcionamiento adecuado de VidaZen.</p>
              <p>Cuando los datos ya no sean necesarios, podrán ser eliminados, bloqueados o anonimizados, según corresponda.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-white mb-2">12. Modificaciones al Aviso de Privacidad</h3>
              <p>VidaZen podrá realizar modificaciones o actualizaciones al presente Aviso de Privacidad. Cualquier cambio importante será informado a los usuarios dentro de la aplicación móvil, plataforma web o mediante el medio de contacto registrado.</p>
            </section>

          </div>
        </div>

        {/* Footer del Modal */}
        <div className="p-6 md:px-10 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-[#2C3E50] text-white font-['Montserrat'] font-bold rounded-xl hover:bg-[#2C3E50]/90 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-[#2C3E50]/20"
          >
            He leído y acepto el Aviso de Privacidad de VidaZen
          </button>
        </div>

      </div>
    </div>
  );
}