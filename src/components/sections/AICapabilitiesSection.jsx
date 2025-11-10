import { MessageCircle } from "lucide-react";

export default function AICapabilitiesSection() {
  const capabilities = [
    "Explicar conceptos complejos de manera simple.",
    "Generar ejemplos prácticos y ejercicios.",
    "Responder preguntas específicas del material.",
    "Proporcionar diferentes perspectivas del mismo tema.",
    "Crear resúmenes personalizados.",
    "Sugerir recursos adicionales de estudio."
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-purple-200 shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Lado izquierdo - Capacidades */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                ¿Qué puede hacer la IA?
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                Nuestro asistente IA está diseñado para ser tu compañero
                de estudio ideal, disponible las 24 horas para ayudarte con
                cualquier duda académica.
              </p>

              <ul className="space-y-3">
                {capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lado derecho - Ejemplo de conversación */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Ejemplo de Conversación
                </h3>
              </div>

              {/* Chat de ejemplo */}
              <div className="space-y-4">
                {/* Mensaje del estudiante */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">E</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm mb-1">Estudiante:</p>
                      <p className="text-gray-700 text-sm">
                        No entiendo cómo resolver ecuaciones cuadráticas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Respuesta de EduIA */}
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">IA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm mb-1">EduIA:</p>
                      <p className="text-gray-700 text-sm">
                        Te explico paso a paso usando el material de tu clase.
                        Una ecuación cuadrática tiene la forma ax² + bx + c...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Respuestas basadas únicamente en el material autorizado por los profesores
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}