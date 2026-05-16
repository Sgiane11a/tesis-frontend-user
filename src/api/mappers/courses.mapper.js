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
    objectives: raw.objetivos ?? '',
    methodology: raw.metodologia ?? '',
    evaluationCriteria: raw.criterios_evaluacion ?? '',
    requirements: raw.requisitos ?? '',
    officeHours: raw.horario_atencion ?? '',
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
      phone: teacher?.telefono ?? teacher?.phone ?? raw.profesor_telefono ?? raw.docente_telefono ?? '',
      birthDate: teacher?.fecha_nacimiento ?? teacher?.birthDate ?? raw.profesor_fecha_nacimiento ?? '',
      bio: teacher?.biografia ?? teacher?.bio ?? raw.profesor_biografia ?? '',
      avatarUrl: resolveAssetUrl(teacher?.url_foto ?? teacher?.avatar_url),
    } : null,
  }
}

export function backendToCourseInfo(raw) {
  if (!raw) return null
  const course = backendToCourse(raw.curso ?? raw.course ?? raw)
  const teachers = Array.isArray(raw.profesores) ? raw.profesores : []

  return {
    course,
    classroom: raw.aula ?? null,
    teachers: teachers.map((teacher) => ({
      id: teacher.id_usuario ?? teacher.id ?? null,
      name: `${teacher.nombre ?? ''} ${teacher.apellido ?? ''}`.trim() || teacher.nombre_completo || 'Profesor',
      email: teacher.correo ?? '',
      code: teacher.codigo ?? '',
      phone: teacher.telefono ?? '',
      birthDate: teacher.fecha_nacimiento ?? '',
      bio: teacher.biografia ?? '',
      avatarUrl: resolveAssetUrl(teacher.url_foto ?? teacher.avatar_url),
    })),
    permissions: {
      canEdit: Boolean(raw.permisos?.puede_editar ?? raw.permissions?.canEdit),
    },
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
