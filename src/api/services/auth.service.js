import apiClient from '../client/index.js'
import { endpoints } from '../endpoints/endpoints.js'
import { backendToUser } from '../mappers/users.mapper.js'

export const AuthService = {
  /**
   * Iniciar sesión
   * @param {string} credencial - correo o código
   * @param {string} contrasena
   * @returns {{ token: string, usuario: object }}
   */
  async login(credencial, contrasena) {
    const data = await apiClient(endpoints.users.login, {
      method: 'POST',
      data: { credencial, contrasena },
    })

    if (data?.token) {
      sessionStorage.setItem('token', data.token)
    }

    return {
      token: data.token,
      usuario: backendToUser(data?.usuario),
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await apiClient(endpoints.users.logout, { method: 'POST' })
    } catch {
      // ignorar error (token ya expirado, etc.)
    }
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  },
}
