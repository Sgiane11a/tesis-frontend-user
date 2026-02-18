import React, { createContext, useState, useEffect, useCallback } from 'react'
import { AuthService } from '../api/services/auth.service'

const AuthContext = createContext(null)

export { AuthContext }

/** Rutas de destino según el rol */
const ROLE_REDIRECT = {
  alumno: '/student/dashboard',
  profesor: '/teacher/dashboard',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /** Persistir usuario en sessionStorage */
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user))
    } else {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
  }, [user])

  /** Iniciar sesión */
  const login = useCallback(async (credencial, contrasena) => {
    setLoading(true)
    setError(null)
    try {
      const { usuario } = await AuthService.login(credencial, contrasena)
      setUser(usuario)
      return usuario
    } catch (err) {
      const message = err.message || 'Error al iniciar sesión'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  /** Cerrar sesión */
  const logout = useCallback(async () => {
    await AuthService.logout()
    setUser(null)
  }, [])

  /** Obtener la ruta de redirección según el rol */
  const getRedirectPath = useCallback((rol) => {
    return ROLE_REDIRECT[rol] || '/'
  }, [])

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    getRedirectPath,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
