/**
 * Transforma un curso del backend al formato usado en el frontend.
 * @param {object} raw - Objeto crudo del backend
 * @returns {object} Curso normalizado
 */
export function backendToCourse(raw) {
  if (!raw) return null
  return {
    id: raw.id_curso ?? raw.id ?? null,
    title: raw.nombre ?? '',
    description: raw.descripcion ?? '',
    imageUrl: raw.url_imagen || null,
  }
}

/**
 * Transforma un arreglo de cursos del backend.
 * @param {Array} list
 * @returns {Array}
 */
export function backendToCourseList(list) {
  if (!Array.isArray(list)) return []
  return list.map(backendToCourse).filter(Boolean)
}
