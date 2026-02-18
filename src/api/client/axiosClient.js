import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT, API_HEADERS } from '../config/index.js'

function buildUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return path.startsWith('/') ? path : `/${path}`
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ''),
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
})

// Inyectar token automáticamente
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null
    if (token) {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
    }
  } catch {
    // ignore
  }
  return config
})

// Rutas públicas que NO deben disparar "sesión expirada" ante un 401
const PUBLIC_PATHS = ['/usuarios/login']

function isPublicRequest(config) {
  const url = config?.url || ''
  return PUBLIC_PATHS.some((p) => url.includes(p))
}

// Normalizar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      if ((status === 401 || status === 403) && !isPublicRequest(error.config)) {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        window.location.href = '/login'
      }

      const err = new Error(error.response.data?.message || error.message || 'Error del servidor')
      err.status = status
      err.payload = error.response.data
      return Promise.reject(err)
    }
    return Promise.reject(error)
  }
)

export async function apiAxiosClient(path, options = {}) {
  const { method = 'get', headers: customHeaders = {}, params, data, timeout } = options
  const url = buildUrl(path)

  const response = await axiosInstance.request({
    url,
    method: method.toLowerCase(),
    headers: { ...(customHeaders || {}) },
    params,
    data,
    timeout: timeout || API_TIMEOUT,
  })

  return response.data
}

export default apiAxiosClient
