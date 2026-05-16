import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CoursesService } from '../api'
import { useAuth } from './useAuth'

/** Keys de cache para React Query */
export const courseKeys = {
  all: ['courses'],
  byStudent: (id) => ['courses', 'student', id],
  byTeacher: (id) => ['courses', 'teacher', id],
  info: (courseId, aulaId) => ['courses', 'info', courseId, aulaId ?? null],
}

/**
 * Hook para obtener los cursos matriculados del alumno autenticado.
 * Usa React Query para cache, revalidación automática y estados de carga/error.
 */
export function useStudentCourses() {
  const { user } = useAuth()
  const alumnoId = user?.id

  return useQuery({
    queryKey: courseKeys.byStudent(alumnoId),
    queryFn: () => CoursesService.getByStudent(alumnoId),
    enabled: !!alumnoId,
    staleTime: 5 * 60 * 1000,     // 5 min antes de refetch
    retry: 2,
    select: (data) => data.cursos, // Solo exponemos la lista de cursos
  })
}

/**
 * Hook para obtener los cursos impartidos por el profesor autenticado.
 */
export function useTeacherCourses() {
  const { user } = useAuth()
  const profesorId = user?.id

  return useQuery({
    queryKey: courseKeys.byTeacher(profesorId),
    queryFn: () => CoursesService.getByTeacher(profesorId),
    enabled: !!profesorId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    select: (data) => data.cursos,
  })
}

/**
 * Hook para obtener todos los cursos (para admin/profesor si se necesita).
 */
export function useAllCourses() {
  return useQuery({
    queryKey: courseKeys.all,
    queryFn: () => CoursesService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export function useCourseInfo(courseId, aulaId) {
  return useQuery({
    queryKey: courseKeys.info(courseId, aulaId),
    queryFn: () => CoursesService.getInfo(courseId, aulaId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  })
}

export function useUpdateCourseInfo(courseId, aulaId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => CoursesService.updateInfo(courseId, aulaId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.info(courseId, aulaId) })
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}
