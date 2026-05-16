import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Edit3,
  GraduationCap,
  Image,
  Info,
  Layers,
  Save,
  Users,
  X,
} from 'lucide-react';
import { useCourseInfo, useUpdateCourseInfo } from '../../../../hooks/useCourses';

const emptyForm = {
  nombre: '',
  descripcion: '',
  objetivos: '',
  metodologia: '',
  criterios_evaluacion: '',
  requisitos: '',
  horario_atencion: '',
  url_imagen: '',
};

const toForm = (course = {}) => ({
  nombre: course.title || '',
  descripcion: course.description || '',
  objetivos: course.objectives || '',
  metodologia: course.methodology || '',
  criterios_evaluacion: course.evaluationCriteria || '',
  requisitos: course.requirements || '',
  horario_atencion: course.officeHours || '',
  url_imagen: course.imageUrl || '',
});

const Field = ({ label, children }) => (
  <label className="block">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

const TextInput = (props) => (
  <input
    {...props}
    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
  />
);

const TextArea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
  />
);

const InfoCard = ({ title, children }) => (
  <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    <div className="mt-2 text-sm leading-relaxed text-gray-600">{children || 'Sin informacion registrada.'}</div>
  </section>
);

const MiniStat = ({ icon: Icon, label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
      <Icon className="h-4 w-4 text-sky-600" />
      {label}
    </div>
    <p className="mt-2 text-lg font-bold text-gray-800">{value || '-'}</p>
  </div>
);

const TeacherCourseInfoPanel = ({ course: fallbackCourse }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState('');
  const { data, isLoading, isError, error } = useCourseInfo(fallbackCourse?.id, fallbackCourse?.idAula);
  const updateInfo = useUpdateCourseInfo(fallbackCourse?.id, fallbackCourse?.idAula);

  const course = data?.course || fallbackCourse || {};
  const canEdit = Boolean(data?.permissions?.canEdit);
  const classroom = data?.classroom || { grado: course.grado, seccion: course.seccion };
  const aulaLabel = classroom?.grado && classroom?.seccion ? `${classroom.grado} - ${classroom.seccion}` : 'Sin aula asignada';
  const aulaQuery = course?.idAula ? `?aula=${course.idAula}` : '';
  const coursePath = `/teacher/dashboard/course/${course?.id}`;

  useEffect(() => {
    setForm(toForm(course));
  }, [
    course.title,
    course.description,
    course.objectives,
    course.methodology,
    course.evaluationCriteria,
    course.requirements,
    course.officeHours,
    course.imageUrl,
  ]);

  const teachersLabel = useMemo(() => {
    const teachers = data?.teachers || [];
    if (!teachers.length) return 'Sin profesor registrado';
    return teachers.map((teacher) => teacher.name).join(', ');
  }, [data?.teachers]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleCancel = () => {
    setForm(toForm(course));
    setFeedback('');
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      const { nombre, ...editableForm } = form;
      await updateInfo.mutateAsync(editableForm);
      setFeedback('Informacion guardada correctamente.');
      setIsEditing(false);
    } catch (err) {
      setFeedback(err?.message || 'No se pudo guardar la informacion.');
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <div className="h-36 animate-pulse rounded-lg bg-gray-100" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => <div key={item} className="h-32 animate-pulse rounded-lg bg-gray-100" />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        {error?.message || 'No se pudo cargar la informacion del curso.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <Info className="h-3.5 w-3.5" />
              Informacion general
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-800">{course.title || 'Curso seleccionado'}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {course.description || 'Resumen docente del curso, su aula asignada y los puntos clave para planificar el periodo.'}
            </p>
          </div>

          {canEdit && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              <Edit3 className="h-4 w-4" />
              Editar
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <MiniStat icon={GraduationCap} label="Aula" value={aulaLabel} />
        <MiniStat icon={Users} label="Profesor" value={teachersLabel} />
        <MiniStat icon={CalendarClock} label="Atencion" value={course.officeHours || 'No definido'} />
      </section>

      {feedback && (
        <div className={`rounded-lg border p-3 text-sm ${feedback.includes('correctamente') ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-red-100 bg-red-50 text-red-700'}`}>
          {feedback}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Nombre del curso">
              <TextInput value={form.nombre} disabled className="bg-gray-100 text-gray-500" />
            </Field>
            <Field label="URL de imagen">
              <TextInput value={form.url_imagen} onChange={handleChange('url_imagen')} placeholder="https://..." />
            </Field>
            <Field label="Descripcion">
              <TextArea value={form.descripcion} onChange={handleChange('descripcion')} />
            </Field>
            <Field label="Objetivos">
              <TextArea value={form.objetivos} onChange={handleChange('objetivos')} />
            </Field>
            <Field label="Metodologia">
              <TextArea value={form.metodologia} onChange={handleChange('metodologia')} />
            </Field>
            <Field label="Criterios de evaluacion">
              <TextArea value={form.criterios_evaluacion} onChange={handleChange('criterios_evaluacion')} />
            </Field>
            <Field label="Requisitos">
              <TextArea value={form.requisitos} onChange={handleChange('requisitos')} />
            </Field>
            <Field label="Horario de atencion">
              <TextInput value={form.horario_atencion} onChange={handleChange('horario_atencion')} placeholder="Lunes 16:00 - 17:00" />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={updateInfo.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {updateInfo.isPending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      ) : (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Objetivos">
              {course.objectives && <p className="whitespace-pre-line">{course.objectives}</p>}
            </InfoCard>
            <InfoCard title="Metodologia">
              {course.methodology && <p className="whitespace-pre-line">{course.methodology}</p>}
            </InfoCard>
            <InfoCard title="Criterios de evaluacion">
              {course.evaluationCriteria && <p className="whitespace-pre-line">{course.evaluationCriteria}</p>}
            </InfoCard>
            <InfoCard title="Requisitos">
              {course.requirements && <p className="whitespace-pre-line">{course.requirements}</p>}
            </InfoCard>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800">Continuar trabajo</h3>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => navigate(`${coursePath}/modulos${aulaQuery}`)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="inline-flex items-center gap-2"><Layers className="h-4 w-4" /> Modulos</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate(`${coursePath}/modulos/estudiantes${aulaQuery}`)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Estudiantes</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Image className="h-4 w-4 text-sky-600" />
                Imagen del curso
              </div>
              {course.imageUrl ? (
                <img src={course.imageUrl} alt={course.title} className="mt-3 aspect-video w-full rounded-lg object-cover" />
              ) : (
                <p className="mt-3 text-sm text-gray-500">No hay imagen registrada.</p>
              )}
            </div>
          </aside>
        </section>
      )}
    </div>
  );
};

export default TeacherCourseInfoPanel;
