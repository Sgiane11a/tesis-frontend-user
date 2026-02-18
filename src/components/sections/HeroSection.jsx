import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
  <section id="inicio" style={{scrollMarginTop: '4rem'}} className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20 min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-white/50">
              Potenciado por Inteligencia Artificial
            </Badge>

            {/* Título principal */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Aprende Con{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Inteligencia Artificial
                </span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Plataforma educativa inteligente donde estudiantes y profesores
              interactúan con IA especializada en cada materia. Pregunta,
              aprende y enseña de manera revolucionaria
            </p>

            {/* Botón de acción */}
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg group"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 mb-1">500+</h3>
                <p className="text-sm text-gray-600">Estudiantes activos</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-1">50+</h3>
                <p className="text-sm text-gray-600">Profesores</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600 mb-1">24/7</h3>
                <p className="text-sm text-gray-600">IA Disponible</p>
              </div>
            </div>
          </div>

          {/* Imagen y elementos visuales */}
          <div className="relative">
            {/* Imagen principal - usando una imagen de muestra */}
            <div className="relative z-10 rounded-3xl overflow-visible shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="w-full h-96 bg-gradient-to-br rounded-3xl from-blue-50 to-indigo-100 flex items-center justify-center">
                {/* imagen recortada dentro de un wrapper para mantener bordes redondeados sin recortar los flotantes */}
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <img src="https://storageuss.blob.core.windows.net/observatorio-multimedia/1748874389097_educando_imagen_16.png.png?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2099-04-22T23:56:42Z&st=2024-04-22T15:56:42Z&spr=https&sig=J46fKydGvCa8aOnHlvo5%2BXrTUf%2BVr6e6zvz8EWHvYE8%3D" alt="Estudiantes aprendiendo con IA" className="w-full h-full object-cover" />
                </div>
              </div>
              
              {/* Overlay de elementos de IA */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">IA Activa</span>
                </div>
              </div>

              {/* Chat de IA flotante */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Chat IA Educativa</p>
                    <p className="text-xs text-gray-600">¿Puedes explicarme las ecuaciones cuadráticas?</p>
                  </div>
                </div>
              </div>

              {/* Documento flotante */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-3 hidden lg:block">
                <div className="flex items-center space-x-2 text-xs">
                  <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">PDFs & PPT</span>
                </div>
              </div>
            </div>

            {/* Elementos decorativos (ocultos en móvil para evitar overflow) */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
}