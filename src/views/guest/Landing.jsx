import React from 'react';
import { 
  Presentation, 
  ClipboardList, 
  Medal, 
  FileText, 
  ArrowRight 
} from 'lucide-react';

export default function Landing() {
  
  // Datos para las tarjetas de herramientas
  const features = [
    {
      title: "Seguimiento del Progreso",
      description: "Visualiza el progreso de tus pacientes a través de gráficos interactivos y datos clave, permitiéndote ajustar los tratamientos de manera precisa.",
      icon: <Presentation className="w-6 h-6 text-[#0e1b1b]" />
    },
    {
      title: "Cuestionarios de Estrés",
      description: "Accede a cuestionarios validados para evaluar los niveles de estrés de tus pacientes y personalizar las intervenciones según sus necesidades.",
      icon: <ClipboardList className="w-6 h-6 text-[#0e1b1b]" />
    },
    {
      title: "Módulos de Meditación",
      description: "Ofrece a tus pacientes acceso a una biblioteca de módulos de meditación guiada, promoviendo la relajación y la reducción del estrés entre sesiones.",
      icon: <Medal className="w-6 h-6 text-[#0e1b1b]" />
    },
    {
      title: "Generación de Reportes",
      description: "Genera reportes detallados del progreso de tus pacientes para compartir con ellos o con otros profesionales, facilitando la colaboración.",
      icon: <FileText className="w-6 h-6 text-[#0e1b1b]" />
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f8fcfc] font-sans text-[#0e1b1b]">
      {/* Inyección de fuentes */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap');
          body { font-family: 'Inter', 'Noto Sans', sans-serif; }
        `}
      </style>

      <div className="flex flex-col h-full grow">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-1 justify-center py-5 px-4 md:px-40">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="p-4">
              <div 
                className="flex min-h-[480px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center md:gap-8"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop")'
                }}
              >
                <div className="flex flex-col gap-2 max-w-2xl">
                  <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    Transformando el Estrés en Serenidad
                  </h1>
                  <h2 className="text-white text-sm md:text-base font-medium leading-relaxed opacity-90">
                    SereneMind es la plataforma integral para terapeutas que buscan optimizar el seguimiento del progreso de sus pacientes y ofrecer recursos efectivos para la reducción del estrés.
                  </h2>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  <button className="flex items-center justify-center rounded-xl h-10 px-6 bg-[#19e6e6] hover:bg-[#15cfcf] text-[#0e1b1b] text-sm font-bold transition-transform active:scale-95 md:h-12 md:text-base">
                    Registrarse
                  </button>
                  <button className="flex items-center justify-center rounded-xl h-10 px-6 bg-[#e7f3f3] hover:bg-[#d5eaea] text-[#0e1b1b] text-sm font-bold transition-transform active:scale-95 md:h-12 md:text-base">
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* --- FEATURES SECTION --- */}
            <div className="flex flex-col gap-10 px-4 py-12">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#0e1b1b] text-3xl md:text-4xl font-black leading-tight max-w-[720px]">
                  Herramientas Clave para el Éxito Terapéutico
                </h1>
                <p className="text-[#0e1b1b] text-base font-normal max-w-[720px]">
                  SereneMind ofrece un conjunto de herramientas diseñadas para mejorar la eficacia de tus sesiones y el bienestar de tus pacientes.
                </p>
              </div>

              {/* Grid de Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col gap-4 rounded-lg border border-[#d0e7e7] bg-[#f8fcfc] p-5 hover:shadow-lg transition-shadow">
                    <div className="p-2 bg-white w-fit rounded-lg shadow-sm border border-[#e7f3f3]">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-[#0e1b1b] text-base font-bold leading-tight">
                        {feature.title}
                      </h2>
                      <p className="text-[#4e9797] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="flex justify-center border-t border-[#e7f3f3] mt-auto">
          <div className="flex max-w-[960px] flex-1 flex-col py-10 px-5">
            <div className="flex flex-col gap-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 md:justify-center">
                <a className="text-[#4e9797] hover:text-[#0e1b1b] transition-colors text-base font-medium" href="#">Política de Privacidad</a>
                <a className="text-[#4e9797] hover:text-[#0e1b1b] transition-colors text-base font-medium" href="#">Términos de Servicio</a>
                <a className="text-[#4e9797] hover:text-[#0e1b1b] transition-colors text-base font-medium" href="#">Contacto</a>
              </div>
              <p className="text-[#4e9797] text-sm">© 2024 SereneMind. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}