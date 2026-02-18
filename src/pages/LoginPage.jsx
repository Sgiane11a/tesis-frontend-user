import React from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "../components/auth/organisms/LoginForm"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl" />
        </div>

        {/* Contenido del panel */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="space-y-8 max-w-md">
            <div>
              <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                Aprende sin
                <span className="block text-blue-200">límites</span>
              </h2>
              <p className="mt-4 text-lg text-blue-100 leading-relaxed">
                Accede a tu plataforma educativa inteligente y aprovecha la IA para potenciar tu aprendizaje.
              </p>
            </div>

            {/* Características destacadas */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">IA Especializada</p>
                  <p className="text-sm text-blue-200">Tutor inteligente para cada materia</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Material Interactivo</p>
                  <p className="text-sm text-blue-200">PDFs, presentaciones y más</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Disponible 24/7</p>
                  <p className="text-sm text-blue-200">Aprende cuando quieras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Botón volver */}
        <div className="p-4 sm:p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Volver al inicio
          </Link>
        </div>

        {/* Formulario centrado */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 pb-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
