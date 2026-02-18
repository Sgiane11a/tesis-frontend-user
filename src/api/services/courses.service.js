import apiClient from '../client/index.js'
import { endpoints } from '../endpoints/endpoints.js'
import { backendToCourseList } from '../mappers/courses.mapper.js'

export const CoursesService = {
  /**
   * Obtiene todos los cursos disponibles (requiere autenticación).
   * GET /api/cursos
   * @returns {Promise<Array>} Lista de cursos normalizados
   */
  async getAll() {
    const data = await apiClient(endpoints.courses.list)
    // El backend retorna directamente un array de cursos
    return backendToCourseList(data)
  },

  /**
   * Obtiene los cursos matriculados de un alumno.
   * GET /api/usuarios/:id/cursos
   * @param {number|string} alumnoId
   * @returns {Promise<{ alumno: object, cursos: Array }>}
   */
  async getByStudent(alumnoId) {
    const data = await apiClient(endpoints.users.cursosDeAlumno(alumnoId))
    return {
      alumno: data.alumno ?? null,
      cursos: backendToCourseList(data.cursos),
    }
  },

  /**
   * Obtiene los cursos impartidos por un profesor.
   * GET /api/cursos/profesores/:id/cursos
   * @param {number|string} profesorId
   * @returns {Promise<{ profesor: object, cursos: Array }>}
   */
  async getByTeacher(profesorId) {
    const data = await apiClient(endpoints.courses.byTeacher(profesorId))
    return {
      profesor: data.profesor ?? null,
      cursos: backendToCourseList(data.cursos_impartidos),
    }
  },
}
