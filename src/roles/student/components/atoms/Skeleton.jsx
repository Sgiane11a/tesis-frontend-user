import React from 'react'

/**
 * Atom: Esqueleto de carga con animación pulse.
 * Sigue la paleta del proyecto (gray-200/gray-300).
 */
const Skeleton = ({ className = '', rounded = 'rounded-md' }) => (
  <div
    className={`animate-pulse bg-gray-200 ${rounded} ${className}`}
    aria-hidden="true"
  />
)

export { Skeleton }
