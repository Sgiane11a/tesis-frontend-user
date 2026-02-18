import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut } from 'lucide-react'

function TeacherDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Panel del Profesor</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.nombre} {user?.apellido}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex items-center justify-center p-6" style={{ minHeight: 'calc(100vh - 73px)' }}>
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full space-y-4">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Bienvenido, {user?.nombre}</h2>
          <p className="text-gray-500">Esta sección está en construcción.</p>
        </div>
      </div>
    </div>
  )
}

export function TeacherRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<TeacherDashboard />} />
    </Routes>
  )
}
