import { useCallback, useEffect, useMemo, useState } from 'react';
import { TeacherModulesService } from '../../../api/services/teacherModules.service';
import { useAuth } from '../../../hooks/useAuth';
import {
  buildInitialModuleForm,
  buildViewerConfig,
  inferTypeFromUrl,
  initialConfirmDialog,
  initialEditModuleForm,
  initialEditResourceForm,
  initialFeedbackDialog,
  initialResourceForm,
  sortModulesById,
} from '../utils/teacherModules';

export const useTeacherCourseModules = ({ aulaId, bimestre, courseId }) => {
  const { user } = useAuth();
  const [openModuleId, setOpenModuleId] = useState(null);
  const [moduleMenuOpenId, setModuleMenuOpenId] = useState(null);
  const [resourceMenuOpenId, setResourceMenuOpenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modules, setModules] = useState([]);
  const [feedbackDialog, setFeedbackDialog] = useState(initialFeedbackDialog);
  const [moduleForm, setModuleForm] = useState(() => buildInitialModuleForm(bimestre));
  const [resourceForm, setResourceForm] = useState(initialResourceForm);
  const [confirmDialog, setConfirmDialog] = useState(initialConfirmDialog);
  const [viewer, setViewer] = useState({ open: false, resource: null });
  const [editModuleForm, setEditModuleForm] = useState(initialEditModuleForm);
  const [editResourceForm, setEditResourceForm] = useState(initialEditResourceForm);

  const sortedModules = useMemo(() => sortModulesById(modules), [modules]);
  const viewerConfig = useMemo(() => buildViewerConfig(viewer.resource), [viewer.resource]);

  const resetModuleForm = () => setModuleForm(buildInitialModuleForm(bimestre));
  const closeResourceForm = () => setResourceForm(initialResourceForm);
  const closeConfirmDialog = () => setConfirmDialog(initialConfirmDialog);
  const closeFeedbackDialog = () => setFeedbackDialog(initialFeedbackDialog);
  const closeEditModuleForm = () => setEditModuleForm(initialEditModuleForm);
  const closeEditResourceForm = () => setEditResourceForm(initialEditResourceForm);
  const closeViewer = () => setViewer({ open: false, resource: null });

  const showFeedback = (type, text) => {
    setFeedbackDialog({
      open: true,
      title: type === 'error' ? 'No se pudo completar la accion' : 'Accion completada',
      description: text,
      tone: type,
    });

    if (type !== 'error') {
      setTimeout(() => setFeedbackDialog((prev) => ({ ...prev, open: false })), 500);
    }
  };

  const loadModules = useCallback(async () => {
    if (!courseId || !aulaId) return;
    setLoading(true);
    setError('');

    try {
      if (bimestre) {
        const data = await TeacherModulesService.getByBimesterAndCourse({
          idBimestre: bimestre,
          idCurso: courseId,
          idAula: aulaId,
        });
        setModules(Array.isArray(data) ? data : []);
      } else {
        const results = await Promise.all(
          [1, 2, 3, 4].map((item) =>
            TeacherModulesService.getByBimesterAndCourse({
              idBimestre: item,
              idCurso: courseId,
              idAula: aulaId,
            })
          )
        );
        const merged = results.flat().filter(Boolean);
        setModules(Array.from(new Map(merged.map((item) => [item.id_modulo, item])).values()));
      }
    } catch (err) {
      setError(err?.message || 'No se pudieron cargar los modulos');
    } finally {
      setLoading(false);
    }
  }, [aulaId, bimestre, courseId]);

  useEffect(() => {
    loadModules();
  }, [loadModules]);

  useEffect(() => {
    if (!moduleMenuOpenId) return undefined;
    const close = () => setModuleMenuOpenId(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [moduleMenuOpenId]);

  useEffect(() => {
    if (!resourceMenuOpenId) return undefined;
    const close = () => setResourceMenuOpenId(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [resourceMenuOpenId]);

  useEffect(() => {
    const handler = () => setModuleForm({ ...buildInitialModuleForm(bimestre), open: true });
    document.addEventListener('teacher:openCreateModule', handler);
    return () => document.removeEventListener('teacher:openCreateModule', handler);
  }, [bimestre]);

  const submitEditResource = async (event) => {
    event.preventDefault();
    const title = editResourceForm.titulo?.trim();
    if (!title) return showFeedback('error', 'Ingresa el titulo del recurso.');

    setEditResourceForm((prev) => ({ ...prev, saving: true }));
    try {
      await TeacherModulesService.updateResource(editResourceForm.id, { titulo: title });
      closeEditResourceForm();
      showFeedback('success', 'Recurso actualizado correctamente.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar el recurso');
      setEditResourceForm((prev) => ({ ...prev, saving: false }));
    }
  };

  const submitEditModule = async (event) => {
    event.preventDefault();
    const title = editModuleForm.titulo?.trim();
    if (!title) return showFeedback('error', 'Ingresa el titulo del modulo.');

    setEditModuleForm((prev) => ({ ...prev, saving: true }));
    try {
      await TeacherModulesService.updateModule(editModuleForm.id, {
        titulo: title,
        descripcion: editModuleForm.descripcion.trim(),
      });
      closeEditModuleForm();
      showFeedback('success', 'Modulo actualizado correctamente.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar el modulo');
      setEditModuleForm((prev) => ({ ...prev, saving: false }));
    }
  };

  const submitCreateModule = async (event) => {
    event.preventDefault();
    const title = moduleForm.titulo?.trim();
    const selectedBimester = Number(moduleForm.id_bimestre);
    if (!title) return showFeedback('error', 'Ingresa el titulo del modulo.');
    if (!selectedBimester || selectedBimester < 1 || selectedBimester > 4) {
      return showFeedback('error', 'Selecciona un bimestre valido (I a IV).');
    }

    setModuleForm((prev) => ({ ...prev, saving: true }));
    try {
      await TeacherModulesService.createModule({
        id_bimestre: selectedBimester,
        id_curso: Number(courseId),
        id_aula: Number(aulaId),
        titulo: title,
        descripcion: moduleForm.descripcion.trim(),
        visible: moduleForm.visible,
      });
      resetModuleForm();
      showFeedback('success', 'Modulo creado correctamente.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo crear el modulo');
      setModuleForm((prev) => ({ ...prev, saving: false }));
    }
  };

  const submitAddResource = async (event) => {
    event.preventDefault();
    const module = resourceForm.module;
    const title = resourceForm.titulo?.trim();
    if (!module) return;
    if (!title) return showFeedback('error', 'Ingresa el titulo del recurso.');
    if (resourceForm.sourceType === 'file' && !resourceForm.file) return showFeedback('error', 'Selecciona un archivo para subir.');
    if (resourceForm.sourceType === 'url' && !resourceForm.url.trim()) return showFeedback('error', 'Ingresa la URL del recurso.');

    setResourceForm((prev) => ({ ...prev, saving: true }));
    try {
      if (resourceForm.sourceType === 'file') {
        const formData = new FormData();
        formData.append('archivo', resourceForm.file);
        formData.append('id_modulo', String(module.id_modulo));
        formData.append('id_profesor', String(user?.id || ''));
        formData.append('id_bimestre', String(module.id_bimestre));
        formData.append('id_curso', String(module.id_curso));
        formData.append('id_aula', String(module.id_aula));
        formData.append('titulo', title);
        formData.append('visible', String(resourceForm.visible));
        await TeacherModulesService.uploadResource(formData);
      } else {
        const url = resourceForm.url.trim();
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
        });
      }

      closeResourceForm();
      showFeedback('success', 'Recurso guardado correctamente.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo agregar el recurso');
      setResourceForm((prev) => ({ ...prev, saving: false }));
    }
  };

  const requestDeleteModule = (module) => {
    setConfirmDialog({
      open: true,
      title: 'Eliminar modulo',
      description: `Seguro que deseas eliminar "${module.titulo}"? Tambien se eliminaran sus archivos.`,
      saving: false,
      onConfirm: async () => {
        await TeacherModulesService.deleteModule(module.id_modulo);
        showFeedback('success', 'Modulo eliminado correctamente.');
        await loadModules();
      },
    });
  };

  const requestDeleteResource = (resource) => {
    setConfirmDialog({
      open: true,
      title: 'Eliminar recurso',
      description: `Seguro que deseas eliminar "${resource.titulo}"?`,
      saving: false,
      onConfirm: async () => {
        await TeacherModulesService.deleteResource(resource.id_recurso);
        showFeedback('success', 'Recurso eliminado correctamente.');
        await loadModules();
      },
    });
  };

  const handleToggleModuleVisibility = async (module) => {
    try {
      await TeacherModulesService.toggleModuleVisibility(module.id_modulo, !module.visible);
      showFeedback('success', module.visible ? 'Modulo deshabilitado.' : 'Modulo habilitado para visualizacion.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar visibilidad del modulo');
    }
  };

  const handleToggleResourceVisibility = async (resource) => {
    try {
      await TeacherModulesService.toggleResourceVisibility(resource.id_recurso, !resource.visible);
      showFeedback('success', resource.visible ? 'Recurso deshabilitado.' : 'Recurso publicado.');
      await loadModules();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo actualizar visibilidad del recurso');
    }
  };

  const runConfirmDialog = async () => {
    if (!confirmDialog.onConfirm) return;
    setConfirmDialog((prev) => ({ ...prev, saving: true }));

    try {
      await confirmDialog.onConfirm();
      closeConfirmDialog();
    } catch (err) {
      showFeedback('error', err?.message || 'No se pudo completar la accion');
      setConfirmDialog((prev) => ({ ...prev, saving: false }));
    }
  };

  return {
    dialogs: {
      confirmDialog,
      editModuleForm,
      editResourceForm,
      feedbackDialog,
      moduleForm,
      resourceForm,
      viewer,
      viewerConfig,
    },
    list: {
      error,
      loading,
      moduleMenuOpenId,
      modules: sortedModules,
      openModuleId,
      resourceMenuOpenId,
    },
    actions: {
      closeConfirmDialog,
      closeEditModuleForm,
      closeEditResourceForm,
      closeFeedbackDialog,
      closeResourceForm,
      closeViewer,
      handleToggleModuleVisibility,
      handleToggleResourceVisibility,
      requestDeleteModule,
      requestDeleteResource,
      runConfirmDialog,
      setEditModuleForm,
      setEditResourceForm,
      setModuleForm,
      setResourceForm,
      submitAddResource,
      submitCreateModule,
      submitEditModule,
      submitEditResource,
      toggleModule: (id) => setOpenModuleId((prev) => (prev === id ? null : id)),
      toggleModuleMenu: (id) => {
        setResourceMenuOpenId(null);
        setModuleMenuOpenId((prev) => (prev === id ? null : id));
      },
      toggleResourceMenu: (id) => {
        setModuleMenuOpenId(null);
        setResourceMenuOpenId((prev) => (prev === id ? null : id));
      },
      openAddResource: (module) => setResourceForm({ ...initialResourceForm, open: true, module }),
      openEditModule: (module) => {
        setModuleMenuOpenId(null);
        setEditModuleForm({ open: true, id: module.id_modulo, titulo: module.titulo, descripcion: module.descripcion || '', saving: false });
      },
      openEditResource: (resource) => {
        setResourceMenuOpenId(null);
        setEditResourceForm({ open: true, id: resource.id_recurso, titulo: resource.titulo, saving: false });
      },
      openResource: (resource) => resource?.url && setViewer({ open: true, resource }),
      resetModuleForm,
    },
  };
};
