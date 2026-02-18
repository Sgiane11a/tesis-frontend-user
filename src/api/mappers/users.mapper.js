export function backendToUser(b) {
  if (!b) return null
  return {
    id: b.id_usuario ?? b.id ?? null,
    codigo: b.codigo ?? '',
    nombre: b.nombre ?? '',
    apellido: b.apellido ?? '',
    correo: b.correo ?? b.email ?? '',
    rol: b.rol ?? b.role ?? 'alumno',
    grado: b.grado ?? null,
  }
}
