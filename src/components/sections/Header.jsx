import React from "react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { FaRobot } from 'react-icons/fa';
import { Text } from '../../roles/student/components/atoms/Text';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const ids = ["inicio", "como-funciona", "caracteristicas", "ia-educativa"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-200 bg-white/95 backdrop-blur-sm shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                      <FaRobot className="w-6 h-6 text-white" aria-hidden="true" />

            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EDUI IA</h1>
              <p className="text-xs text-blue-600">APRENDE SIN LÍMITES</p>
            </div>
          </div>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#inicio"
              onClick={() => {
                setOpen(false);
                setActive("inicio");
              }}
              className={
                "text-sm font-medium hover:text-gray-900 " +
                (active === "inicio" ? "text-gray-900 border-b-2 border-blue-600" : "text-gray-600")
              }
              aria-current={active === "inicio" ? "page" : undefined}
            >
              Inicio
            </a>

            <a
              href="#como-funciona"
              onClick={() => {
                setOpen(false);
                setActive("como-funciona");
              }}
              className={
                "text-sm font-medium hover:text-gray-900 " +
                (active === "como-funciona" ? "text-gray-900 border-b-2 border-blue-600" : "text-gray-600")
              }
              aria-current={active === "como-funciona" ? "page" : undefined}
            >
              Como Funciona
            </a>

            <a
              href="#caracteristicas"
              onClick={() => {
                setOpen(false);
                setActive("caracteristicas");
              }}
              className={
                "text-sm font-medium hover:text-gray-900 " +
                (active === "caracteristicas" ? "text-gray-900 border-b-2 border-blue-600" : "text-gray-600")
              }
              aria-current={active === "caracteristicas" ? "page" : undefined}
            >
              Características
            </a>

            <a
              href="#ia-educativa"
              onClick={() => {
                setOpen(false);
                setActive("ia-educativa");
              }}
              className={
                "text-sm font-medium hover:text-gray-900 " +
                (active === "ia-educativa" ? "text-gray-900 border-b-2 border-blue-600" : "text-gray-600")
              }
              aria-current={active === "ia-educativa" ? "page" : undefined}
            >
              IA educativa
            </a>
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
              <a
                href="#inicio"
                onClick={() => {
                  setOpen(false);
                  setActive("inicio");
                }}
                className="block text-gray-900 font-medium py-2"
              >
                Inicio
              </a>
              <a
                href="#como-funciona"
                onClick={() => {
                  setOpen(false);
                  setActive("como-funciona");
                }}
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                Como Funciona
              </a>
              <a
                href="#caracteristicas"
                onClick={() => {
                  setOpen(false);
                  setActive("caracteristicas");
                }}
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                Características
              </a>
              <a
                href="#ia-educativa"
                onClick={() => {
                  setOpen(false);
                  setActive("ia-educativa");
                }}
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                IA educativa
              </a>
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
