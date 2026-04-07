import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, FileText, Film, FileType2, Link as LinkIcon, MoreVertical, Plus, Trash2, X } from 'lucide-react'
import { TeacherModulesService } from '../../../../api/services/teacherModules.service'
import { useAuth } from '../../../../hooks/useAuth'

const inferTypeFromUrl = (url = '') => {
  const lower = url.toLowerCase()
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube'
  if (lower.endsWith('.pdf')) return 'pdf'
  if (lower.endsWith('.ppt') || lower.endsWith('.pptx')) return 'ppt'
  if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'word'
  if (lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.avi') || lower.endsWith('.mkv')) return 'video'
  return 'link'
}

const iconByType = {
  pdf: FileText,
  ppt: FileType2,
  word: FileType2,
  video: Film,
  youtube: Film,
  link: LinkIcon,
  otro: FileText,
}

const colorByType = {
  pdf: 'text-red-600',
  ppt: 'text-orange-600',
  word: 'text-blue-600',
  video: 'text-green-600',
  youtube: 'text-rose-600',
  link: 'text-sky-500',
  otro: 'text-gray-500',
}

const toYouTubeEmbedUrl = (url = '') => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
  } catch {
    return url
  }

  return url
}

const getOfficeEmbedUrl = (url = '') => `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`

const VisibilityDot = ({ active }) => (
  <span
    className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
      active ? 'bg-emerald-500' : 'bg-gray-300'
    }`}
  >
    {active ? (
      <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
        <line x1="3" y1="3" x2="9" y2="9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="3" x2="3" y2="9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )}
  </span>
)

const toneStyles = {
  default: {
    badge: 'bg-gray-100 text-gray-700 border-gray-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
  success: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
  error: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
}

const modalIcons = {
  default: FileText,
  success: CheckCircle2,
  error: AlertCircle,
}

const ModalShell = ({
  title,
  onClose,
  children,
  footer,
  panelClassName = '',
  bodyClassName = '',
  tone = 'default',
  subtitle = 'Completa la acción dentro del sistema.',
}) => {
  const styles = toneStyles[tone] || toneStyles.default
  const Icon = modalIcons[tone] || modalIcons.default

  return (
    <div className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className={`w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden ${panelClassName}`}>
        <div className={`px-6 py-5 border-b border-gray-200 ${styles.panel}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${styles.badge}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
                <p className={`text-sm mt-1 ${styles.subtitle}`}>{subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>
      </div>
    </div>
  )
}

const TeacherCourseModulesPanel = ({ courseId, aulaId, bimestre }) => {
  const [open, setOpen] = useState(null)
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [resourceMenuOpenId, setResourceMenuOpenId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [modules, setModules] = useState([])
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    title: '',
    description: '',
    tone: 'success',
  })
  const [moduleForm, setModuleForm] = useState({
    open: false,
    titulo: '',
    descripcion: '',
    visible: false,
    saving: false,
  })
  const [resourceForm, setResourceForm] = useState({
    open: false,
    module: null,
    titulo: '',
    sourceType: 'file',
    file: null,
    url: '',
    visible: false,
    saving: false,
  })
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    description: '',
    saving: false,
    onConfirm: null,
  })
  const [viewer, setViewer] = useState({
    open: false,
    resource: null,
  })
  const [editModuleForm, setEditModuleForm] = useState({
    open: false,
    id: null,
    titulo: '',
    descripcion: '',
    saving: false,
  })
  const [editResourceForm, setEditResourceForm] = useState({
    open: false,
    id: null,
    titulo: '',
    saving: false,
  })
  const { user } = useAuth()

  const showFeedback = (type, text) => {
    setFeedbackDialog({
      open: true,
      title: type === 'error' ? 'No se pudo completar la acción' : 'Acción completada',
      description: text,
      tone: type,
    })
    if (type !== 'error') {
      setTimeout(() => {
        setFeedbackDialog((prev) => ({ ...prev, open: false }))
      }, 500)
    }
  }

  const loadModules = useCallback(async () => {
    if (!courseId || !aulaId || !bimestre) return
    setLoading(true)
    setError('')
    try {
      const data = await TeacherModulesService.getByBimesterAndCourse({
        idBimestre: bimestre,
        idCurso: courseId,
        idAula: aulaId,
      })
      setModules(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err?.message || 'No se pudieron cargar los módulos')
    } finally {
      setLoading(false)
    }
  }, [aulaId, bimestre, courseId])

  useEffect(() => {
    loadModules()
  }, [loadModules])

  useEffect(() => {
    if (!menuOpenId) return
    const close = () => setMenuOpenId(null)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpenId])

  useEffect(() => {
    if (!resourceMenuOpenId) return
    const close = () => setResourceMenuOpenId(null)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [resourceMenuOpenId])

  useEffect(() => {
    const handler = () => openCreateModuleQuestionnaire()
    document.addEventListener('teacher:openCreateModule', handler)
    return () => document.removeEventListener('teacher:openCreateModule', handler)
  }, [])

  const sortedModules = useMemo(() => {
    return [...modules].sort((a, b) => (a.orden || 0) - (b.orden || 0))
  }, [modules])

  const submitEditResource = async (e) => {
    e.preventDefault()
    const title = editResourceForm.titulo?.trim()
    if (!title) {
      showFeedback('error', 'Ingresa el título del recurso.')
      return
    }
    setEditResourceForm((prev) => ({ ...prev, saving: true }))
    try {
      await TeacherModulesService.updateResource(editResourceForm.id, { titulo: title })
      setEditResourceForm({ open: false, id: null, titulo: '', saving: false })
      showFeedback('success', 'Recurso actualizado correctamente.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar el recurso')
      setEditResourceForm((prev) => ({ ...prev, saving: false }))
    }
  }

  const submitEditModule = async (e) => {
    e.preventDefault()
    const title = editModuleForm.titulo?.trim()
    if (!title) {
      showFeedback('error', 'Ingresa el título del módulo.')
      return
    }
    setEditModuleForm((prev) => ({ ...prev, saving: true }))
    try {
      await TeacherModulesService.updateModule(editModuleForm.id, {
        titulo: title,
        descripcion: editModuleForm.descripcion.trim(),
      })
      setEditModuleForm({ open: false, id: null, titulo: '', descripcion: '', saving: false })
      showFeedback('success', 'Módulo actualizado correctamente.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar el módulo')
      setEditModuleForm((prev) => ({ ...prev, saving: false }))
    }
  }

  const openCreateModuleQuestionnaire = () => {
    setModuleForm({
      open: true,
      titulo: '',
      descripcion: '',
      visible: false,
      saving: false,
    })
  }

  const submitCreateModule = async (e) => {
    e.preventDefault()
    const title = moduleForm.titulo?.trim()
    if (!title) {
      showFeedback('error', 'Ingresa el título del módulo.')
      return
    }

    setModuleForm((prev) => ({ ...prev, saving: true }))

    try {
      await TeacherModulesService.createModule({
        id_bimestre: bimestre,
        id_curso: Number(courseId),
        id_aula: Number(aulaId),
        titulo: title,
        descripcion: moduleForm.descripcion.trim(),
        visible: moduleForm.visible,
      })
      setModuleForm({
        open: false,
        titulo: '',
        descripcion: '',
        visible: false,
        saving: false,
      })
      showFeedback('success', 'Módulo creado correctamente.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo crear el módulo')
      setModuleForm((prev) => ({ ...prev, saving: false }))
    }
  }

  const requestDeleteModule = (module) => {
    setConfirmDialog({
      open: true,
      title: 'Eliminar módulo',
      description: `¿Seguro que deseas eliminar "${module.titulo}"? También se eliminarán sus archivos.`,
      saving: false,
      onConfirm: async () => {
        await TeacherModulesService.deleteModule(module.id_modulo)
        showFeedback('success', 'Módulo eliminado correctamente.')
        await loadModules()
      },
    })
  }

  const handleToggleModuleVisibility = async (module) => {
    try {
      await TeacherModulesService.toggleModuleVisibility(module.id_modulo, !module.visible)
      showFeedback('success', module.visible ? 'Módulo deshabilitado.' : 'Módulo habilitado para visualización.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar visibilidad del módulo')
    }
  }

  const openAddResourceQuestionnaire = (module) => {
    setResourceForm({
      open: true,
      module,
      titulo: '',
      sourceType: 'file',
      file: null,
      url: '',
      visible: false,
      saving: false,
    })
  }

  const submitAddResource = async (e) => {
    e.preventDefault()
    const module = resourceForm.module
    const title = resourceForm.titulo?.trim()
    if (!module) return
    if (!title) {
      showFeedback('error', 'Ingresa el título del recurso.')
      return
    }
    if (resourceForm.sourceType === 'file' && !resourceForm.file) {
      showFeedback('error', 'Selecciona un archivo para subir.')
      return
    }
    if (resourceForm.sourceType === 'url' && !resourceForm.url.trim()) {
      showFeedback('error', 'Ingresa la URL del recurso.')
      return
    }

    setResourceForm((prev) => ({ ...prev, saving: true }))

    try {
      if (resourceForm.sourceType === 'file') {
        const formData = new FormData()
        formData.append('archivo', resourceForm.file)
        formData.append('id_modulo', String(module.id_modulo))
        formData.append('id_profesor', String(user?.id || ''))
        formData.append('id_bimestre', String(module.id_bimestre))
        formData.append('id_curso', String(module.id_curso))
        formData.append('id_aula', String(module.id_aula))
        formData.append('titulo', title)
        formData.append('visible', String(resourceForm.visible))

        await TeacherModulesService.uploadResource(formData)
      } else {
        const url = resourceForm.url.trim()

        await TeacherModulesService.createResource({
          id_modulo: module.id_modulo,
          id_profesor: user?.id,
          id_bimestre: module.id_bimestre,
          id_curso: module.id_curso,
          id_aula: module.id_aula,
          titulo: title,
          tipo: inferTypeFromUrl(url),
          url,
          visible: resourceForm.visible,
        })
      }

      setResourceForm({
        open: false,
        module: null,
        titulo: '',
        sourceType: 'file',
        file: null,
        url: '',
        visible: false,
        saving: false,
      })
      showFeedback('success', 'Recurso guardado correctamente.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo agregar el recurso')
      setResourceForm((prev) => ({ ...prev, saving: false }))
    }
  }

  const requestDeleteResource = (resource) => {
    setConfirmDialog({
      open: true,
      title: 'Eliminar recurso',
      description: `¿Seguro que deseas eliminar "${resource.titulo}"?`,
      saving: false,
      onConfirm: async () => {
        await TeacherModulesService.deleteResource(resource.id_recurso)
        showFeedback('success', 'Recurso eliminado correctamente.')
        await loadModules()
      },
    })
  }

  const handleToggleResourceVisibility = async (resource) => {
    try {
      await TeacherModulesService.toggleResourceVisibility(resource.id_recurso, !resource.visible)
      showFeedback('success', resource.visible ? 'Recurso deshabilitado.' : 'Recurso publicado.')
      await loadModules()
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar visibilidad del recurso')
    }
  }

  const runConfirmDialog = async () => {
    if (!confirmDialog.onConfirm) return
    setConfirmDialog((prev) => ({ ...prev, saving: true }))
    try {
      await confirmDialog.onConfirm()
      setConfirmDialog({ open: false, title: '', description: '', saving: false, onConfirm: null })
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo completar la acción')
      setConfirmDialog((prev) => ({ ...prev, saving: false }))
    }
  }

  const openResource = (resource) => {
    if (!resource?.url) return
    setViewer({ open: true, resource })
  }

  const viewerConfig = useMemo(() => {
    const resource = viewer.resource
    if (!resource?.url) return null

    if (resource.tipo === 'youtube') {
      return {
        kind: 'iframe',
        src: toYouTubeEmbedUrl(resource.url),
      }
    }

    if (resource.tipo === 'video') {
      return {
        kind: 'video',
        src: resource.url,
      }
    }

    if (resource.tipo === 'pdf') {
      return {
        kind: 'iframe',
        src: resource.url,
      }
    }

    if (resource.tipo === 'ppt' || resource.tipo === 'word') {
      const isLocal = /localhost|127\.0\.0\.1/.test(resource.url)
      if (isLocal) {
        return { kind: 'local-office', src: resource.url }
      }
      return {
        kind: 'iframe',
        src: getOfficeEmbedUrl(resource.url),
      }
    }

    return {
      kind: 'iframe',
      src: resource.url,
    }
  }, [viewer.resource])

  if (!aulaId) {
    return <div className="text-sm text-amber-600">No se encontró aula para este curso.</div>
  }

  return (
    <div className="space-y-2">

      {loading && <div className="text-sm text-gray-500">Cargando módulos...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {!loading && sortedModules.length === 0 && (
        <div className="text-sm text-gray-500">No hay módulos para este bimestre.</div>
      )}

      {sortedModules.map((m) => (
        <div key={m.id_modulo} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 py-3 pr-3 pl-3 rounded-t-lg">

            {/* Flecha desplegable — extremo izquierdo */}
            <button
              type="button"
              onClick={() => setOpen(open === m.id_modulo ? null : m.id_modulo)}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={open === m.id_modulo ? 'Contraer módulo' : 'Expandir módulo'}
            >
              {open === m.id_modulo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Nombre + subtítulo */}
            <button
              type="button"
              onClick={() => setOpen(open === m.id_modulo ? null : m.id_modulo)}
              className="min-w-0 flex-1 text-left"
            >
              <div className="text-sm font-semibold text-gray-800 truncate">{m.titulo}</div>
              <div className="text-xs text-gray-500">
                {m.visible ? 'Disponible para visualización' : 'No visible para el estudiante'}
              </div>
            </button>

            {/* Visibilidad */}
            <button
              type="button"
              onClick={() => handleToggleModuleVisibility(m)}
              title={m.visible ? 'Deshabilitar visualización' : 'Habilitar visualización'}
              aria-label={m.visible ? 'Deshabilitar visualización' : 'Habilitar visualización'}
              className="shrink-0 transition-opacity hover:opacity-75"
            >
              <VisibilityDot active={m.visible} />
            </button>

            {/* Agregar recurso (+) */}
            <button
              type="button"
              onClick={() => openAddResourceQuestionnaire(m)}
              className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
              title="Agregar recurso"
              aria-label="Agregar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Tres puntos verticales */}
            <div className="relative shrink-0">
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  setResourceMenuOpenId(null)
                  setMenuOpenId(menuOpenId === m.id_modulo ? null : m.id_modulo)
                }}
                className="inline-flex h-7 w-7 items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                title="Más opciones"
                aria-label="Más opciones"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpenId === m.id_modulo && (
                <div
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute right-0 top-8 z-50 w-44 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpenId(null)
                      setEditModuleForm({ open: true, id: m.id_modulo, titulo: m.titulo, descripcion: m.descripcion || '', saving: false })
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpenId(null)
                      requestDeleteModule(m)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>

          {open === m.id_modulo && (
            <div className="border-t px-4 py-4 bg-white">

              {!m.Recursos || m.Recursos.length === 0 ? (
                <div className="text-sm text-gray-500">No hay recursos aún.</div>
              ) : (
                <ul className="space-y-3">
                  {m.Recursos.map((it) => {
                    const IconCmp = iconByType[it.tipo] || FileText
                    return (
                      <li key={it.id_recurso} className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => openResource(it)}
                          className="flex items-center gap-3 text-gray-800 min-w-0 flex-1 text-left hover:bg-gray-50 rounded-lg px-2 py-2 transition-colors"
                        >
                          <div>
                            <IconCmp className={`w-[18px] h-[18px] ${colorByType[it.tipo] || 'text-sky-500'}`} />
                          </div>
                          <span className="text-sm truncate">{it.titulo}</span>
                        </button>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleResourceVisibility(it)}
                            title={it.visible ? 'Ocultar recurso' : 'Publicar recurso'}
                            aria-label={it.visible ? 'Ocultar recurso' : 'Publicar recurso'}
                            className="shrink-0 transition-opacity hover:opacity-75"
                          >
                            <VisibilityDot active={it.visible} />
                          </button>

                          {/* Tres puntos del recurso */}
                          <div className="relative">
                            <button
                              type="button"
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation()
                                setMenuOpenId(null)
                                setResourceMenuOpenId(resourceMenuOpenId === it.id_recurso ? null : it.id_recurso)
                              }}
                              className="inline-flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                              title="Más opciones"
                              aria-label="Más opciones"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>

                            {resourceMenuOpenId === it.id_recurso && (
                              <div
                                onMouseDown={(e) => e.stopPropagation()}
                                className="absolute right-0 top-7 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setResourceMenuOpenId(null)
                                    setEditResourceForm({ open: true, id: it.id_recurso, titulo: it.titulo, saving: false })
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setResourceMenuOpenId(null)
                                    requestDeleteResource(it)
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      {moduleForm.open && (
        <ModalShell
          title="Cuestionario: Crear módulo"
          subtitle="Define el nombre, la descripción y si el módulo quedará visible para tus estudiantes."
          onClose={() => setModuleForm({ open: false, titulo: '', descripcion: '', visible: false, saving: false })}
          footer={(
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModuleForm({ open: false, titulo: '', descripcion: '', visible: false, saving: false })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="create-module-form"
                disabled={moduleForm.saving}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60"
              >
                {moduleForm.saving ? 'Guardando...' : 'Guardar módulo'}
              </button>
            </div>
          )}
        >
          <form id="create-module-form" onSubmit={submitCreateModule} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del módulo</label>
              <input
                type="text"
                value={moduleForm.titulo}
                onChange={(e) => setModuleForm((prev) => ({ ...prev, titulo: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                placeholder="Semana01-Este es el primer módulo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={moduleForm.descripcion}
                onChange={(e) => setModuleForm((prev) => ({ ...prev, descripcion: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                placeholder="Descripción opcional"
              />
            </div>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={moduleForm.visible}
                onChange={(e) => setModuleForm((prev) => ({ ...prev, visible: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-200"
              />
              <span className="font-medium">Publicar módulo al guardar</span>
            </label>
          </form>
        </ModalShell>
      )}

      {resourceForm.open && (
        <ModalShell
          title="Cuestionario: Agregar recurso"
          subtitle="Carga un archivo local o registra una URL para mostrar el material dentro del módulo."
          onClose={() => setResourceForm({ open: false, module: null, titulo: '', sourceType: 'file', file: null, url: '', visible: false, saving: false })}
          footer={(
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setResourceForm({ open: false, module: null, titulo: '', sourceType: 'file', file: null, url: '', visible: false, saving: false })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="create-resource-form"
                disabled={resourceForm.saving}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60"
              >
                {resourceForm.saving ? 'Guardando...' : 'Guardar recurso'}
              </button>
            </div>
          )}
        >
          <form id="create-resource-form" onSubmit={submitAddResource} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del recurso</label>
              <input
                type="text"
                value={resourceForm.titulo}
                onChange={(e) => setResourceForm((prev) => ({ ...prev, titulo: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                placeholder="Guía, PPT, video, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de carga</label>
              <div className="flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setResourceForm((prev) => ({ ...prev, sourceType: 'file', url: '' }))}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${resourceForm.sourceType === 'file' ? 'bg-white border-gray-300 text-gray-800 shadow-sm' : 'border-transparent text-gray-600 hover:bg-white/70'}`}
                >
                  Archivo local
                </button>
                <button
                  type="button"
                  onClick={() => setResourceForm((prev) => ({ ...prev, sourceType: 'url', file: null }))}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${resourceForm.sourceType === 'url' ? 'bg-white border-gray-300 text-gray-800 shadow-sm' : 'border-transparent text-gray-600 hover:bg-white/70'}`}
                >
                  URL / YouTube
                </button>
              </div>
            </div>

            {resourceForm.sourceType === 'file' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivo</label>
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.mov,.avi,.mkv,.zip,.rar"
                  onChange={(e) => setResourceForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-800 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-900"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL del recurso</label>
                <input
                  type="url"
                  value={resourceForm.url}
                  onChange={(e) => setResourceForm((prev) => ({ ...prev, url: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                  placeholder="https://..."
                />
              </div>
            )}

            <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={resourceForm.visible}
                onChange={(e) => setResourceForm((prev) => ({ ...prev, visible: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-200"
              />
              <span className="font-medium">Publicar recurso al guardar</span>
            </label>
          </form>
        </ModalShell>
      )}

      {confirmDialog.open && (
        <ModalShell
          title={confirmDialog.title}
          subtitle="Esta acción afectará la información publicada en el módulo." 
          onClose={() => setConfirmDialog({ open: false, title: '', description: '', saving: false, onConfirm: null })}
          tone="error"
          footer={(
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDialog({ open: false, title: '', description: '', saving: false, onConfirm: null })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
                disabled={confirmDialog.saving}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={runConfirmDialog}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-red-700 disabled:opacity-60"
                disabled={confirmDialog.saving}
              >
                {confirmDialog.saving ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          )}
        >
          <p className="text-sm text-gray-600">{confirmDialog.description}</p>
        </ModalShell>
      )}

      {viewer.open && viewer.resource && (
        <ModalShell
          title={viewer.resource.titulo}
          subtitle="Vista previa del recurso dentro de la plataforma."
          onClose={() => setViewer({ open: false, resource: null })}
          panelClassName="max-w-6xl w-[92vw]"
          bodyClassName="p-0 bg-gray-50"
          footer={(
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-gray-500 truncate">{viewer.resource.url}</div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={viewer.resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Abrir externo
                </a>
                <button
                  type="button"
                  onClick={() => setViewer({ open: false, resource: null })}
                  className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        >
          <div className="h-[62vh] bg-white">
            {viewerConfig?.kind === 'video' ? (
              <video src={viewerConfig.src} controls className="w-full h-full bg-black" />
            ) : viewerConfig?.kind === 'local-office' ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-1">Vista previa no disponible en local</p>
                  <p className="text-xs text-gray-500 max-w-xs">El visor de Office Online requiere una URL pública. Descarga el archivo para abrirlo directamente.</p>
                </div>
                <a
                  href={viewerConfig.src}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700"
                >
                  Descargar archivo
                </a>
              </div>
            ) : viewerConfig?.kind === 'iframe' ? (
              <iframe
                src={viewerConfig.src}
                title={viewer.resource.titulo}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No se pudo previsualizar este recurso.
              </div>
            )}
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-white text-xs text-gray-500">
            Si el archivo no se renderiza por restricciones del navegador o del proveedor, usa "Abrir externo".
          </div>
        </ModalShell>
      )}

      {feedbackDialog.open && (
        <ModalShell
          title={feedbackDialog.title}
          onClose={() => setFeedbackDialog({ open: false, title: '', description: '', tone: 'success' })}
          tone={feedbackDialog.tone === 'error' ? 'error' : 'success'}
          subtitle={feedbackDialog.tone === 'error' ? 'Revisa el detalle y vuelve a intentarlo.' : 'La información ya fue actualizada en el módulo.'}
          footer={(
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setFeedbackDialog({ open: false, title: '', description: '', tone: 'success' })}
                className={`px-4 py-2 rounded-xl text-sm font-semibold text-white ${feedbackDialog.tone === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-sky-600 hover:bg-sky-700'}`}
              >
                Entendido
              </button>
            </div>
          )}
        >
          <div className={`rounded-xl border px-4 py-4 text-sm leading-relaxed ${feedbackDialog.tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            {feedbackDialog.description}
          </div>
        </ModalShell>
      )}

      {editModuleForm.open && (
        <ModalShell
          title="Editar módulo"
          subtitle="Modifica el título o la descripción del módulo."
          onClose={() => setEditModuleForm({ open: false, id: null, titulo: '', descripcion: '', saving: false })}
          footer={(
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModuleForm({ open: false, id: null, titulo: '', descripcion: '', saving: false })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="edit-module-form"
                disabled={editModuleForm.saving}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60"
              >
                {editModuleForm.saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          )}
        >
          <form id="edit-module-form" onSubmit={submitEditModule} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del módulo</label>
              <input
                type="text"
                value={editModuleForm.titulo}
                onChange={(e) => setEditModuleForm((prev) => ({ ...prev, titulo: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={editModuleForm.descripcion}
                onChange={(e) => setEditModuleForm((prev) => ({ ...prev, descripcion: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                placeholder="Descripción opcional"
              />
            </div>
          </form>
        </ModalShell>
      )}

      {editResourceForm.open && (
        <ModalShell
          title="Editar recurso"
          subtitle="Modifica el título del archivo o enlace."
          onClose={() => setEditResourceForm({ open: false, id: null, titulo: '', saving: false })}
          footer={(
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditResourceForm({ open: false, id: null, titulo: '', saving: false })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="edit-resource-form"
                disabled={editResourceForm.saving}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60"
              >
                {editResourceForm.saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          )}
        >
          <form id="edit-resource-form" onSubmit={submitEditResource} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del recurso</label>
              <input
                type="text"
                value={editResourceForm.titulo}
                onChange={(e) => setEditResourceForm((prev) => ({ ...prev, titulo: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
              />
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  )
}

export default TeacherCourseModulesPanel
