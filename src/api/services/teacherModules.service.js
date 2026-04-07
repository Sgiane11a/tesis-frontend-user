import apiClient from '../client/index.js'
import { endpoints } from '../endpoints/endpoints.js'

export const TeacherModulesService = {
  async getByBimesterAndCourse({ idBimestre, idCurso, idAula }) {
    const data = await apiClient(endpoints.modules.byBimesterCourse(idBimestre, idCurso, idAula))
    return data?.data ?? []
  },

  async createModule(payload) {
    const data = await apiClient(endpoints.modules.create, {
      method: 'POST',
      data: payload,
    })
    return data?.data ?? data
  },

  async updateModule(idModulo, payload) {
    const data = await apiClient(endpoints.modules.update(idModulo), {
      method: 'PUT',
      data: payload,
    })
    return data?.data ?? data
  },

  async deleteModule(idModulo) {
    return apiClient(endpoints.modules.remove(idModulo), {
      method: 'DELETE',
    })
  },

  async toggleModuleVisibility(idModulo, visible) {
    const data = await apiClient(endpoints.modules.visibility(idModulo), {
      method: 'PATCH',
      data: { visible },
    })
    return data?.data ?? data
  },

  async createResource(payload) {
    const data = await apiClient(endpoints.resources.create, {
      method: 'POST',
      data: payload,
    })
    return data?.data ?? data
  },

  async uploadResource(formData) {
    const data = await apiClient(endpoints.resources.upload, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data?.data ?? data
  },

  async updateResource(idRecurso, payload) {
    const data = await apiClient(endpoints.resources.update(idRecurso), {
      method: 'PUT',
      data: payload,
    })
    return data?.data ?? data
  },

  async deleteResource(idRecurso) {
    return apiClient(endpoints.resources.remove(idRecurso), {
      method: 'DELETE',
    })
  },

  async toggleResourceVisibility(idRecurso, visible) {
    const data = await apiClient(endpoints.resources.visibility(idRecurso), {
      method: 'PATCH',
      data: { visible },
    })
    return data?.data ?? data
  },
}
