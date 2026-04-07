import apiClient from '../client/index.js'
import { endpoints } from '../endpoints/endpoints.js'

export const NotificationsService = {
  async getByStudent(idAlumno, limit = 20) {
    const data = await apiClient(endpoints.users.notificacionesAlumno(idAlumno, limit))
    return {
      items: data?.items ?? [],
      total: data?.total ?? 0,
    }
  },
}
