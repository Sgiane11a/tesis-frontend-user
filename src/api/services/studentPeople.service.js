import apiClient from '../client/index.js';
import { endpoints } from '../endpoints/endpoints.js';
import { resolveAssetUrl } from '../utils/assetUrl.js';

const fullName = (raw) => {
  const joined = `${raw?.nombre ?? ''} ${raw?.apellido ?? ''}`.trim();
  return raw?.nombre_completo || raw?.name || joined || 'Estudiante';
};

const backendToClassmate = (raw, classroom = {}) => {
  const id = raw?.id_usuario ?? raw?.id_alumno ?? raw?.id ?? null;

  return {
    id,
    uid: `student-${id || raw?.correo || raw?.email || Math.random()}`,
    type: 'student',
    role: 'Alumno',
    name: fullName(raw),
    code: raw?.codigo ?? raw?.cod_alumno ?? '',
    email: raw?.correo ?? raw?.email ?? '',
    phone: raw?.telefono ?? raw?.phone ?? '',
    birthDate: raw?.fecha_nacimiento ?? raw?.fechaNacimiento ?? '',
    biography: raw?.biografia ?? raw?.biography ?? '',
    allergies: raw?.alergias ?? raw?.allergies ?? '',
    emergencyContact: {
      name: raw?.contacto_emergencia_nombre ?? '',
      relationship: raw?.contacto_emergencia_parentesco ?? '',
      phone: raw?.contacto_emergencia_telefono ?? '',
    },
    grado: raw?.grado ?? classroom.grado ?? null,
    seccion: raw?.seccion ?? classroom.seccion ?? null,
    idAula: raw?.id_aula ?? classroom.idAula ?? null,
    avatarUrl: resolveAssetUrl(raw?.url_foto ?? raw?.avatar_url),
    raw,
  };
};

const backendCourseTeacherToPeople = (courses = [], classroom = {}) => {
  const teachers = new Map();

  courses.forEach((course) => {
    const courseInfo = {
      id: course?.id_curso ?? course?.id ?? null,
      title: course?.nombre ?? course?.title ?? 'Curso',
      description: course?.descripcion ?? '',
    };

    const courseTeachers = Array.isArray(course?.profesores) ? course.profesores : [];

    courseTeachers.forEach((teacher) => {
      const id = teacher?.id_usuario ?? teacher?.id_profesor ?? teacher?.id ?? null;
      const key = id || teacher?.correo || `${teacher?.nombre ?? ''}-${teacher?.apellido ?? ''}`;
      const existing = teachers.get(key) || {
        id,
        uid: `teacher-${key}`,
        type: 'teacher',
        role: 'Profesor',
        name: fullName(teacher) || 'Profesor',
        code: teacher?.codigo ?? '',
        email: teacher?.correo ?? teacher?.email ?? '',
        phone: teacher?.telefono ?? teacher?.phone ?? '',
        birthDate: teacher?.fecha_nacimiento ?? teacher?.fechaNacimiento ?? '',
        biography: teacher?.biografia ?? teacher?.biography ?? '',
        grado: classroom.grado ?? null,
        seccion: classroom.seccion ?? null,
        idAula: classroom.idAula ?? null,
        avatarUrl: resolveAssetUrl(teacher?.url_foto ?? teacher?.avatar_url),
        courses: [],
        raw: teacher,
      };

      existing.courses.push(courseInfo);
      teachers.set(key, existing);
    });
  });

  return Array.from(teachers.values());
};

const backendTeacherToPerson = (raw, classroom = {}) => {
  const id = raw?.id_usuario ?? raw?.id_profesor ?? raw?.id ?? null;
  const courses = Array.isArray(raw?.cursos) ? raw.cursos : [];

  return {
    id,
    uid: `teacher-${id || raw?.correo || raw?.email || Math.random()}`,
    type: 'teacher',
    role: 'Profesor',
    name: fullName(raw) || 'Profesor',
    code: raw?.codigo ?? '',
    email: raw?.correo ?? raw?.email ?? '',
    phone: raw?.telefono ?? raw?.phone ?? '',
    birthDate: raw?.fecha_nacimiento ?? raw?.fechaNacimiento ?? '',
    biography: raw?.biografia ?? raw?.biography ?? '',
    grado: raw?.grado ?? classroom.grado ?? null,
    seccion: raw?.seccion ?? classroom.seccion ?? null,
    idAula: raw?.id_aula ?? classroom.idAula ?? null,
    avatarUrl: resolveAssetUrl(raw?.url_foto ?? raw?.avatar_url),
    courses: courses.map((course) => ({
      id: course?.id_curso ?? course?.id ?? null,
      title: course?.nombre ?? course?.title ?? 'Curso',
      description: course?.descripcion ?? '',
    })),
    raw,
  };
};

export const StudentPeopleService = {
  async getStudentClassrooms(studentId) {
    if (!studentId) return [];
    const data = await apiClient(endpoints.users.cursosDeAlumno(studentId), { method: 'GET' });
    const aulasFromCourses = (Array.isArray(data?.cursos) ? data.cursos : [])
      .filter((course) => course?.id_aula || course?.grado || course?.seccion)
      .map((course) => ({
        id_aula: course.id_aula ?? null,
        grado: course.grado ?? null,
        seccion: course.seccion ?? null,
      }));
    const source = [
      ...(data?.aula_asignada ? [data.aula_asignada] : []),
      ...aulasFromCourses,
    ];
    const seen = new Set();

    return source.map((aula) => {
      const idAula = aula?.id_aula ?? aula?.idAula ?? null;

      return {
        idAula,
        grado: aula?.grado ?? null,
        seccion: aula?.seccion ?? null,
        key: idAula ? `aula-${idAula}` : `${aula?.grado || 'grado'}-${aula?.seccion || 'seccion'}`,
      };
    }).filter((aula) => {
      if (!aula.idAula && (!aula.grado || !aula.seccion)) return false;
      if (seen.has(aula.key)) return false;
      seen.add(aula.key);
      return true;
    });
  },

  async getPeopleByClassroom(idAula, classroom = {}) {
    if (!idAula) return { students: [], teachers: [], courses: [], classroom };
    const data = await apiClient(endpoints.classrooms.people(idAula), { method: 'GET' });
    const aula = data?.aula ?? {};
    const normalizedClassroom = {
      ...classroom,
      idAula,
      grado: aula.grado ?? classroom.grado,
      seccion: aula.seccion ?? classroom.seccion,
    };

    return {
      classroom: normalizedClassroom,
      students: (Array.isArray(data?.alumnos) ? data.alumnos : [])
        .map((student) => backendToClassmate(student, normalizedClassroom)),
      teachers: (Array.isArray(data?.profesores) ? data.profesores : [])
        .map((teacher) => backendTeacherToPerson(teacher, normalizedClassroom)),
      courses: Array.isArray(data?.cursos) ? data.cursos : [],
    };
  },

  async getPeopleBySection(grado, seccion, classroom = {}) {
    if (!grado || !seccion) return { students: [], teachers: [], courses: [], classroom };
    const data = await apiClient(endpoints.classrooms.peopleBySection(grado, seccion), { method: 'GET' });
    const aula = data?.aula ?? {};
    const normalizedClassroom = {
      ...classroom,
      idAula: aula.id_aula ?? classroom.idAula ?? null,
      grado: aula.grado ?? grado,
      seccion: aula.seccion ?? seccion,
    };

    return {
      classroom: normalizedClassroom,
      students: (Array.isArray(data?.alumnos) ? data.alumnos : [])
        .map((student) => backendToClassmate(student, normalizedClassroom)),
      teachers: (Array.isArray(data?.profesores) ? data.profesores : [])
        .map((teacher) => backendTeacherToPerson(teacher, normalizedClassroom)),
      courses: Array.isArray(data?.cursos) ? data.cursos : [],
    };
  },

  async getClassmatesByClassroom(idAula, classroom = {}) {
    if (!idAula) return [];
    const data = await apiClient(endpoints.classrooms.students(idAula), { method: 'GET' });
    const students = Array.isArray(data?.alumnos) ? data.alumnos : [];
    return students.map((student) => backendToClassmate(student, { ...classroom, idAula }));
  },

  async getCoursesTeachersByClassroom(idAula, classroom = {}) {
    if (!idAula) return { courses: [], teachers: [] };
    const data = await apiClient(endpoints.classrooms.coursesTeachers(idAula), { method: 'GET' });
    const courses = Array.isArray(data?.cursos) ? data.cursos : [];
    const aula = data?.aula ?? {};
    const normalizedClassroom = {
      ...classroom,
      idAula,
      grado: aula.grado ?? classroom.grado,
      seccion: aula.seccion ?? classroom.seccion,
    };

    return {
      courses,
      teachers: backendCourseTeacherToPeople(courses, normalizedClassroom),
    };
  },
};
