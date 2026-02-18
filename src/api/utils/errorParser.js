export function parseApiError(err) {
  if (!err) return { message: 'Error desconocido' }
  if (err.payload && err.payload.message) return { message: err.payload.message, details: err.payload.details }
  return { message: err.message || String(err) }
}
