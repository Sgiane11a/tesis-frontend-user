import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

/**
 * Molecule: Mensaje de error con botón de reintentar.
 */
const ErrorState = ({ message = 'Ocurrió un error al cargar los datos.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Error de carga</h3>
    <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Reintentar
      </button>
    )}
  </div>
)

export { ErrorState }
