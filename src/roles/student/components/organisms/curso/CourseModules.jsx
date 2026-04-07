import React, { useEffect, useMemo, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Icon } from '../../atoms/Icon';
import { TeacherModulesService } from '../../../../../api';

const toBimestreNumber = (label) => {
  if (typeof label === 'number') return label;
  const text = String(label || '').toUpperCase();
  if (text.includes('TODOS')) return null;
  if (text.includes('I') && !text.includes('II') && !text.includes('III') && !text.includes('IV')) return 1;
  if (text.includes('II') && !text.includes('III') && !text.includes('IV')) return 2;
  if (text.includes('III') && !text.includes('IV')) return 3;
  if (text.includes('IV')) return 4;
  return 1;
};

const toYouTubeEmbedUrl = (url = '') => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
  } catch {
    return url;
  }
  return url;
};

const getOfficeEmbedUrl = (url = '') => `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;

const getViewerConfig = (resource) => {
  if (!resource?.url) return null;
  if (resource.tipo === 'youtube') return { kind: 'iframe', src: toYouTubeEmbedUrl(resource.url) };
  if (resource.tipo === 'video') return { kind: 'video', src: resource.url };
  if (resource.tipo === 'pdf') return { kind: 'iframe', src: resource.url };

  if (resource.tipo === 'ppt' || resource.tipo === 'word') {
    const isLocal = /localhost|127\.0\.0\.1/.test(resource.url);
    if (isLocal) return { kind: 'local-office', src: resource.url };
    return { kind: 'iframe', src: getOfficeEmbedUrl(resource.url) };
  }

  return { kind: 'iframe', src: resource.url };
};

const CourseModules = ({ courseId, aulaId, bimestre }) => {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modules, setModules] = useState([]);
  const [viewer, setViewer] = useState({ open: false, resource: null });

  useEffect(() => {
    if (!courseId) return;

    const loadModules = async () => {
      setLoading(true);
      setError('');
      try {
        const bimestreNumero = toBimestreNumber(bimestre);
        if (bimestreNumero) {
          const data = await TeacherModulesService.getByBimesterAndCourse({
            idBimestre: bimestreNumero,
            idCurso: Number(courseId),
            idAula: aulaId ? Number(aulaId) : null,
          });
          setModules(Array.isArray(data) ? data : []);
        } else {
          const resultados = await Promise.all(
            [1, 2, 3, 4].map((b) =>
              TeacherModulesService.getByBimesterAndCourse({
                idBimestre: b,
                idCurso: Number(courseId),
                idAula: aulaId ? Number(aulaId) : null,
              })
            )
          );
          const combinados = resultados.flat().filter(Boolean);
          const unicos = Array.from(new Map(combinados.map((m) => [m.id_modulo, m])).values());
          setModules(unicos);
        }
      } catch (err) {
        setError(err?.message || 'No se pudieron cargar los modulos.');
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [aulaId, bimestre, courseId]);

  const sortedModules = useMemo(
    () => [...modules].sort((a, b) => (a.id_modulo || 0) - (b.id_modulo || 0)),
    [modules]
  );

  const viewerConfig = useMemo(() => getViewerConfig(viewer.resource), [viewer.resource]);

  return (
    <div className="space-y-2">
      {loading && <div className="text-sm text-gray-500">Cargando modulos...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {!loading && !error && sortedModules.length === 0 && (
        <div className="text-sm text-gray-500">No hay modulos visibles para este bimestre.</div>
      )}

      {sortedModules.map((m) => (
        <div key={m.id_modulo} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={() => setOpen(open === m.id_modulo ? null : m.id_modulo)} className="w-full flex items-center justify-between py-4 pr-4 pl-2 md:pl-3 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-100" />
              <div className="text-sm font-semibold text-gray-800">{m.titulo}</div>
            </div>
            <div className="text-sky-500"><Icon name={open === m.id_modulo ? 'chevrons-up' : 'chevrons-down'} /></div>
          </button>

          {open === m.id_modulo && (
            <div className="border-t px-4 py-4 bg-white">
              {!m.Recursos || m.Recursos.length === 0 ? (
                <div className="text-sm text-gray-500">No hay recursos aún.</div>
              ) : (
                <ul className="space-y-3">
                  {m.Recursos.map((it) => (
                    <li key={it.id_recurso} className="flex items-center justify-between gap-3">
                      {(() => {
                        const isDocumentType = ['pdf', 'ppt', 'word'].includes(it.tipo);
                        const actionTitle = isDocumentType ? 'Descargar documento' : 'Abrir en otra ventana';
                        const actionClass = isDocumentType
                          ? 'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors'
                          : 'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700 shadow-sm hover:bg-sky-100 transition-colors';

                        return (
                          <>
                      <button
                        type="button"
                        onClick={() => setViewer({ open: true, resource: it })}
                        className="flex items-center gap-3 text-gray-800 min-w-0 flex-1 text-left hover:bg-gray-50 rounded-lg px-2 py-2 transition-colors"
                      >
                        <div>
                          <Icon
                            name={it.tipo}
                            size={18}
                            className={`${it.tipo === 'pdf' ? 'text-red-600' : it.tipo === 'ppt' ? 'text-orange-600' : it.tipo === 'video' || it.tipo === 'youtube' ? 'text-green-600' : 'text-sky-500'}`}
                          />
                        </div>
                        <span className="text-sm truncate">{it.titulo}</span>
                      </button>
                      <div>
                        <a
                          href={it.url}
                          download={isDocumentType ? true : undefined}
                          target={isDocumentType ? undefined : '_blank'}
                          rel={isDocumentType ? undefined : 'noopener noreferrer'}
                          title={actionTitle}
                          aria-label={actionTitle}
                          className={actionClass}
                        >
                          {isDocumentType ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                        </a>
                      </div>
                          </>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      {viewer.open && viewer.resource && (
        <div className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between gap-3">
              <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">{viewer.resource.titulo}</h3>
              <button
                type="button"
                onClick={() => setViewer({ open: false, resource: null })}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>

            <div className="h-[82vh] bg-white">
              {viewerConfig?.kind === 'video' ? (
                <video src={viewerConfig.src} controls className="w-full h-full bg-black" />
              ) : viewerConfig?.kind === 'local-office' ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="text-sm font-medium text-gray-800">Vista previa no disponible en local</p>
                  <p className="text-xs text-gray-500 max-w-xs">Para archivos Word/PPT en entorno local, usa el icono de descarga para abrir el archivo en una nueva pestaña.</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModules;
