export const endpoints = {
  users: {
    login: '/usuarios/login',
    logout: '/usuarios/logout',
    perfil: '/usuarios/perfil',
    byId: (id) => `/usuarios/${id}`,
    cursosDeAlumno: (id) => `/usuarios/${id}/cursos`,
  },
  courses: {
    list: '/cursos',
    byId: (id) => `/cursos/${id}`,
  },
}
