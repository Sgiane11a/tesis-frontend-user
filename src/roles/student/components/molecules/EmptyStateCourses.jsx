import React from 'react'
import { BookOpen } from 'lucide-react'

/**
 * Molecule: Estado vacío cuando no hay cursos.
 * Diseño limpio y educativo.
 */
const EmptyStateCourses = ({ message = 'No tienes cursos asignados aún.' }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-6">
      <BookOpen className="w-10 h-10 text-primary" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sin cursos disponibles</h3>
    <p className="text-sm text-gray-500 max-w-sm">{message}</p>
  </div>
)

export { EmptyStateCourses }
