import React from 'react';
import { ChevronDown, ChevronUp, MoreVertical, Plus } from 'lucide-react';
import { ResourceTypeIcon, VisibilityDot } from '../../atoms/modules';
import { teacherModulesCopy } from '../../../mocks';

const OptionsMenu = ({ children, onMouseDown }) => (
  <div
    onMouseDown={onMouseDown}
    className="absolute right-0 top-8 z-50 w-44 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
  >
    {children}
  </div>
);

const ModulesList = ({
  loading,
  error,
  modules,
  openModuleId,
  moduleMenuOpenId,
  resourceMenuOpenId,
  onAddResource,
  onDeleteModule,
  onDeleteResource,
  onEditModule,
  onEditResource,
  onOpenResource,
  onToggleModule,
  onToggleModuleVisibility,
  onToggleResourceMenu,
  onToggleResourceVisibility,
  onToggleModuleMenu,
}) => (
  <>
    {loading && <div className="text-sm text-gray-500">{teacherModulesCopy.loading}</div>}
    {error && <div className="text-sm text-red-500">{error}</div>}

    {!loading && modules.length === 0 && (
      <div className="text-sm text-gray-500">{teacherModulesCopy.empty}</div>
    )}

    {modules.map((module) => {
      const isOpen = openModuleId === module.id_modulo;

      return (
        <div key={module.id_modulo} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 py-3 pr-3 pl-3 rounded-t-lg">
            <button
              type="button"
              onClick={() => onToggleModule(module.id_modulo)}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={isOpen ? 'Contraer modulo' : 'Expandir modulo'}
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => onToggleModule(module.id_modulo)}
              className="min-w-0 flex-1 text-left"
            >
              <div className="text-sm font-semibold text-gray-800 truncate">{module.titulo}</div>
              <div className="text-xs text-gray-500">
                {module.visible ? 'Disponible para visualizacion' : 'No visible para el estudiante'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onToggleModuleVisibility(module)}
              title={module.visible ? 'Deshabilitar visualizacion' : 'Habilitar visualizacion'}
              aria-label={module.visible ? 'Deshabilitar visualizacion' : 'Habilitar visualizacion'}
              className="shrink-0 transition-opacity hover:opacity-75"
            >
              <VisibilityDot active={module.visible} />
            </button>

            <button
              type="button"
              onClick={() => onAddResource(module)}
              className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
              title="Agregar recurso"
              aria-label="Agregar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <div className="relative shrink-0">
              <button
                type="button"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleModuleMenu(module.id_modulo);
                }}
                className="inline-flex h-7 w-7 items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                title="Mas opciones"
                aria-label="Mas opciones"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {moduleMenuOpenId === module.id_modulo && (
                <OptionsMenu onMouseDown={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => onEditModule(module)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteModule(module)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </OptionsMenu>
              )}
            </div>
          </div>

          {isOpen && (
            <div className="border-t px-4 py-4 bg-white">
              {!module.Recursos || module.Recursos.length === 0 ? (
                <div className="text-sm text-gray-500">{teacherModulesCopy.noResources}</div>
              ) : (
                <ul className="space-y-3">
                  {module.Recursos.map((resource) => (
                    <li key={resource.id_recurso} className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenResource(resource)}
                        className="flex items-center gap-3 text-gray-800 min-w-0 flex-1 text-left hover:bg-gray-50 rounded-lg px-2 py-2 transition-colors"
                      >
                        <ResourceTypeIcon type={resource.tipo} />
                        <span className="text-sm truncate">{resource.titulo}</span>
                      </button>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onToggleResourceVisibility(resource)}
                          title={resource.visible ? 'Ocultar recurso' : 'Publicar recurso'}
                          aria-label={resource.visible ? 'Ocultar recurso' : 'Publicar recurso'}
                          className="shrink-0 transition-opacity hover:opacity-75"
                        >
                          <VisibilityDot active={resource.visible} />
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleResourceMenu(resource.id_recurso);
                            }}
                            className="inline-flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                            title="Mas opciones"
                            aria-label="Mas opciones"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {resourceMenuOpenId === resource.id_recurso && (
                            <div
                              onMouseDown={(event) => event.stopPropagation()}
                              className="absolute right-0 top-7 z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
                            >
                              <button
                                type="button"
                                onClick={() => onEditResource(resource)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteResource(resource)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      );
    })}
  </>
);

export default ModulesList;
