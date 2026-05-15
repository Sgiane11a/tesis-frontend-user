import apiClient from '../client/index.js';
import { endpoints } from '../endpoints/endpoints.js';
import { buildStableStudentMetrics } from '../../roles/teacher/mocks/studentPerformance.mock.js';

const backendToTeacherStudent = (raw) => {
  const id = raw?.id_usuario ?? raw?.id ?? null;
  const name = `${raw?.nombre ?? ''} ${raw?.apellido ?? ''}`.trim() || 'Estudiante';

  return {
    id,
    name,
    email: raw?.correo ?? '',
    ...buildStableStudentMetrics(id),
  };
};

export const TeacherStudentsService = {
  async getByClassroom(idAula) {
    if (!idAula) return [];
    const data = await apiClient(endpoints.classrooms.students(idAula), { method: 'GET' });
    const students = Array.isArray(data?.alumnos) ? data.alumnos : [];
    return students.map(backendToTeacherStudent);
  },
};

export default TeacherStudentsService;
