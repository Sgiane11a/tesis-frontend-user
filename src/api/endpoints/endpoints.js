export const endpoints = {
  users: {
    login: '/usuarios/login',
    logout: '/usuarios/logout',
    perfil: '/usuarios/perfil',
    byId: (id) => `/usuarios/${id}`,
    cursosDeAlumno: (id) => `/usuarios/${id}/cursos`,
    notificacionesAlumno: (id, limit = 20) => `/usuarios/${id}/notificaciones?limit=${limit}`,
  },
  courses: {
    list: '/cursos',
    byId: (id) => `/cursos/${id}`,
    byTeacher: (id) => `/cursos/profesores/${id}/cursos`,
  },
  classrooms: {
    students: (idAula) => `/aulas/${idAula}/alumnos`,
    people: (idAula) => `/aulas/${idAula}/personas`,
    peopleBySection: (grado, seccion) => `/aulas/grado/${grado}/seccion/${seccion}/personas`,
    coursesTeachers: (idAula) => `/aulas/${idAula}/cursos-profesores`,
  },
  modules: {
    byBimesterCourse: (idBimestre, idCurso, idAula) =>
      `/modulos/bimestre/${idBimestre}/curso/${idCurso}${idAula ? `?id_aula=${idAula}` : ''}`,
    create: '/modulos',
    update: (idModulo) => `/modulos/${idModulo}`,
    remove: (idModulo) => `/modulos/${idModulo}`,
    visibility: (idModulo) => `/modulos/${idModulo}/visibilidad`,
  },
  resources: {
    create: '/recursos',
    upload: '/recursos/upload',
    update: (idRecurso) => `/recursos/${idRecurso}`,
    remove: (idRecurso) => `/recursos/${idRecurso}`,
    visibility: (idRecurso) => `/recursos/${idRecurso}/visibilidad`,
  },
}
