import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

/**
 * Envuelve rutas que requieren autenticación.
 * @param {{ children: React.ReactNode, allowedRoles?: string[] }} props
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Si está autenticado pero no tiene el rol, enviarlo a su dashboard
    const path = user.rol === 'alumno' ? '/student/dashboard' : '/teacher/dashboard'
    return <Navigate to={path} replace />
  }

  return children
}
