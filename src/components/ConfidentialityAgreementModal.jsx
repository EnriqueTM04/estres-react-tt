import { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

const AGREEMENT_VERSION = 'v1.0';

export default function ConfidentialityAgreementModal({ open, onAccept }) {
    const [accepted, setAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!open) return null;

    const handleAccept = async () => {
        if (!accepted || submitting) return;

        try {
            setSubmitting(true);
            setError('');
            await onAccept({ accepted: true, version: AGREEMENT_VERSION });
        } catch (e) {
            const message = e?.response?.data?.message ||
                'No fue posible guardar tu aceptación. Inténtalo nuevamente.';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-[#85C1E9]/30">
                <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-200 bg-gradient-to-r from-[#2C3E50] to-[#1f3244] text-white">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-7 h-7 text-[#A2D9CE]" />
                        <h2 className="text-xl md:text-2xl font-['Montserrat'] font-bold leading-tight">
                            Acuerdo de Confidencialidad de VidaZen
                        </h2>
                    </div>
                    <p className="text-sm text-white/80 mt-2">
                        Este acuerdo es obligatorio para psicólogos y personal autorizado.
                    </p>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-gray-700 space-y-5">
                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">1. Identificación del sistema</h3>
                        <p>
                            VidaZen es un proyecto académico desarrollado por estudiantes del Instituto Politécnico Nacional,
                            orientado al seguimiento del estrés percibido y al acompañamiento psicológico mediante una aplicación
                            móvil para pacientes y una plataforma web para psicólogos.
                        </p>
                        <p className="mt-2">
                            Debido a la naturaleza del sistema, la plataforma puede contener datos personales y datos personales
                            sensibles relacionados con el estado emocional, psicológico y conductual de los usuarios.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">2. Objeto del acuerdo</h3>
                        <p>
                            El presente acuerdo tiene como finalidad establecer las obligaciones de confidencialidad, uso responsable
                            y protección de la información por parte de los psicólogos, administradores o cualquier persona
                            autorizada que tenga acceso a datos de usuarios dentro de VidaZen.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">3. Información confidencial</h3>
                        <p className="mb-2">
                            Se considera información confidencial toda aquella información a la que el psicólogo o personal
                            autorizado pueda acceder dentro de la plataforma, incluyendo, de manera enunciativa mas no limitativa:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Nombre y correo electrónico del usuario.</li>
                            <li>Resultados del test de estrés percibido PSS-14.</li>
                            <li>Registros de niveles de estrés.</li>
                            <li>Historial de sesiones psicológicas registradas en la plataforma.</li>
                            <li>Actividades realizadas por el usuario.</li>
                            <li>Respuestas de journaling o escritura reflexiva.</li>
                            <li>Información registrada durante el proceso de seguimiento psicológico.</li>
                            <li>Cualquier dato relacionado con el estado emocional, psicológico o terapéutico del usuario.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">4. Obligaciones del psicólogo o personal autorizado</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Utilizar la información únicamente para finalidades relacionadas con el seguimiento psicológico dentro de VidaZen.</li>
                            <li>No divulgar, compartir, vender, publicar, copiar, descargar o distribuir información de los usuarios sin autorización.</li>
                            <li>No utilizar los datos personales o sensibles para fines ajenos al funcionamiento de la plataforma.</li>
                            <li>Mantener bajo resguardo sus credenciales de acceso.</li>
                            <li>No permitir que terceros utilicen su cuenta.</li>
                            <li>Acceder únicamente a la información de los pacientes asignados.</li>
                            <li>Reportar cualquier acceso no autorizado, pérdida de información, incidente de seguridad o uso indebido de la plataforma.</li>
                            <li>Respetar la confidencialidad de la información incluso después de dejar de utilizar VidaZen.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">5. Uso permitido de la información</h3>
                        <p className="mb-2">La información de los usuarios solo podrá ser utilizada para:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                            <li>Consultar el progreso del paciente dentro de la plataforma.</li>
                            <li>Dar seguimiento a resultados de pruebas, registros de estrés, sesiones y actividades.</li>
                            <li>Facilitar el acompañamiento psicológico.</li>
                            <li>Registrar información necesaria para el seguimiento del usuario.</li>
                            <li>Cumplir con las finalidades académicas, técnicas y operativas del proyecto VidaZen.</li>
                        </ul>
                        <p>
                            Queda prohibido utilizar la información para fines comerciales, personales, discriminatorios,
                            publicitarios o cualquier otro fin no autorizado.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">6. Medidas de seguridad</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Acceso mediante usuario y contraseña.</li>
                            <li>Control de acceso basado en roles.</li>
                            <li>Consulta restringida de información según el perfil del usuario.</li>
                            <li>Protección de credenciales personales.</li>
                            <li>Uso adecuado de los módulos disponibles en la plataforma.</li>
                            <li>Acceso exclusivo a la información de pacientes asignados.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">7. Incumplimiento</h3>
                        <p>
                            El incumplimiento de este acuerdo podrá derivar en la suspensión o cancelación del acceso a la
                            plataforma, así como en la notificación correspondiente a los responsables del proyecto académico.
                        </p>
                        <p className="mt-2">
                            En caso de uso indebido de datos personales o datos personales sensibles, podrán aplicarse las
                            responsabilidades que correspondan conforme a la normativa aplicable.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-base md:text-lg font-bold text-[#2C3E50] mb-2">8. Aceptación</h3>
                        <p>
                            Al aceptar este acuerdo, el psicólogo o personal autorizado reconoce que comprende la naturaleza sensible
                            de la información contenida en VidaZen y se compromete a tratarla con confidencialidad, responsabilidad
                            y únicamente para las finalidades autorizadas.
                        </p>
                    </section>
                </div>

                <div className="px-6 py-5 md:px-8 border-t border-gray-200 bg-[#F8FAFC]">
                    <label className="flex items-start gap-3 text-sm text-[#2C3E50] leading-relaxed">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#2C3E50] focus:ring-[#85C1E9]"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <span>
                            He leído y acepto el Acuerdo de Confidencialidad de VidaZen. Me comprometo a utilizar la información
                            de los pacientes únicamente para fines de seguimiento dentro de la plataforma, respetando la
                            confidencialidad, seguridad y uso responsable de los datos personales y datos personales sensibles.
                        </span>
                    </label>

                    {error ? (
                        <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>
                    ) : null}

                    <button
                        type="button"
                        onClick={handleAccept}
                        disabled={!accepted || submitting}
                        className={`mt-5 w-full py-3 rounded-xl font-['Montserrat'] font-bold transition-all flex items-center justify-center gap-2 ${!accepted || submitting
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#2C3E50] text-white hover:bg-[#233240]'
                            }`}
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Aceptar acuerdo y continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
