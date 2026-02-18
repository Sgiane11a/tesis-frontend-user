import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../molecules/FormField"
import { Button } from "../../ui/button"
import { FaRobot } from "react-icons/fa"
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error, setError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const usuario = await login(email, password)
      const path = usuario.rol === 'alumno'
        ? '/student/dashboard'
        : '/teacher/dashboard'
      navigate(path, { replace: true })
    } catch {
      // el error ya se guarda en el contexto
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo y título */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <FaRobot className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bienvenido a EDUI IA</h2>
          <p className="text-sm text-gray-500 mt-1">Inicia sesión para continuar aprendiendo</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Campos */}
      <div className="space-y-4">
        <div className="relative">
          <FormField
            label="Correo electrónico"
            id="email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail className="absolute right-3 top-[38px] h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <FormField
            label="Contraseña"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Opciones */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-600">Recordarme</span>
        </label>
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Botón submit */}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Iniciar Sesión'
        )}
      </Button>


    </form>
  )
}
