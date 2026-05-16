import { resolveAssetUrl } from '../utils/assetUrl.js'

/**
 * Transforma un curso del backend al formato usado en el frontend.
 * @param {object} raw - Objeto crudo del backend
 * @returns {object} Curso normalizado
 */
export function backendToCourse(raw) {
  if (!raw) return null
  const teacher = raw.profesor ?? raw.docente ?? raw.teacher ?? raw.profesores?.[0] ?? raw.Profesores?.[0] ?? null
  const teacherName = teacher
    ? `${teacher.nombre ?? ''} ${teacher.apellido ?? ''}`.trim()
    : (raw.profesor_nombre ?? raw.docente_nombre ?? raw.nombre_profesor ?? raw.teacher_name ?? '')

  return {
    id: raw.id_curso ?? raw.id ?? null,
    title: raw.nombre ?? '',
    description: raw.descripcion ?? '',
    imageUrl: raw.url_imagen || null,
    idAula: raw.id_aula ?? null,
    grado: raw.grado ?? null,
    seccion: raw.seccion ?? null,
    studentCount: raw.total_estudiantes ?? 0,
    teacher: teacher || teacherName ? {
      id: raw.id_profesor ?? raw.profesor_id ?? raw.id_docente ?? teacher?.id_usuario ?? teacher?.id ?? null,
      name: teacherName || teacher?.nombre_completo || teacher?.name || 'Profesor',
      email: teacher?.correo ?? teacher?.email ?? raw.profesor_correo ?? raw.docente_correo ?? '',
      code: teacher?.codigo ?? raw.profesor_codigo ?? raw.docente_codigo ?? '',
      avatarUrl: resolveAssetUrl(teacher?.url_foto ?? teacher?.avatar_url),
    } : null,
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
