import { Button } from "../ui/button";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-200 bg-white/95 backdrop-blur-sm shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM10.5 17L7 13.5l1.5-1.5L10.5 14l5.5-5.5L17.5 10 10.5 17z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EduIA</h1>
              <p className="text-xs text-gray-600">Plataforma Educativa</p>
            </div>
          </div>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-900 border-b-2 border-blue-600 pb-1 font-medium">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Como Funciona</a>
            <a href="#caracteristicas" className="text-gray-600 hover:text-gray-900 transition-colors">Características</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">IA educativa</a>
          </nav>

          {/* Botón hamburguesa (móvil) y botón sesión (escritorio) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Abrir menú"
              className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {open ? (
                /* icono cerrar */
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* icono hamburguesa */
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <div className="hidden md:block">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Iniciar Sesión</Button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {open && (
          <div className="md:hidden absolute inset-x-0 top-full bg-white shadow z-40">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#" className="block text-gray-900 font-medium py-2">Inicio</a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Como Funciona</a>
              <a href="#caracteristicas" className="block text-gray-600 hover:text-gray-900 py-2">Características</a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">IA educativa</a>
              <div className="pt-2">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">Iniciar Sesión</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}