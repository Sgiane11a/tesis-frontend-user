import apiClient from '../client/index.js'
import { endpoints } from '../endpoints/endpoints.js'
import { backendToUser } from '../mappers/users.mapper.js'

const toBackendProfilePayload = (values = {}) => ({
  nombre: values.nombre,
  apellido: values.apellido,
  correo: values.correo,
  telefono: values.telefono,
  direccion: values.direccion,
  fecha_nacimiento: values.fechaNacimiento,
  genero: values.genero,
  documento_identidad: values.documentoIdentidad,
  url_foto: values.avatarUrl,
  biografia: values.biografia,
  apoderado_nombre: values.apoderadoNombre,
  apoderado_parentesco: values.apoderadoParentesco,
  apoderado_telefono: values.apoderadoTelefono,
  apoderado_correo: values.apoderadoCorreo,
  apoderado_documento: values.apoderadoDocumento,
  contacto_emergencia_nombre: values.contactoEmergenciaNombre,
  contacto_emergencia_parentesco: values.contactoEmergenciaParentesco,
  contacto_emergencia_telefono: values.contactoEmergenciaTelefono,
  condicion_medica: values.condicionMedica,
  alergias: values.alergias,
  observaciones: values.observaciones,
})

export const ProfileService = {
  async getById(userId) {
    const data = await apiClient(endpoints.users.byId(userId), { method: 'GET' })
    return {
      user: backendToUser(data?.usuario),
      classrooms: data?.aulas ?? [],
      assignedClassroom: data?.aula_asignada ?? null,
      courses: data?.cursos ?? [],
      summary: data?.resumen ?? {},
    }
  },

  async uploadProfilePhoto(file) {
    if (!file) throw new Error('No file provided')
    
    const formData = new FormData()
    formData.append('foto', file)
    
    const data = await apiClient(endpoints.users.perfil, {
      method: 'PUT',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return backendToUser(data?.usuario)
  },

  async updateOwnProfile(values) {
    const data = await apiClient(endpoints.users.perfil, {
      method: 'PUT',
      data: toBackendProfilePayload(values),
    })

    return backendToUser(data?.usuario)
  },

  async changeOwnPassword({ currentPassword, newPassword }) {
    const data = await apiClient(endpoints.users.perfil, {
      method: 'PUT',
      data: {
        contrasena_actual: currentPassword,
        nueva_contrasena: newPassword,
      },
    })

    return backendToUser(data?.usuario)
  },
}
