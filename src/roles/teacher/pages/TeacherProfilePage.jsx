import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  Home,
  IdCard,
  Loader2,
  Mail,
  Phone,
  Save,
  Shield,
  UserPen,
  UserRound,
  X,
} from 'lucide-react';
import { ProfileService } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { useTeacherCourses } from '../../../hooks/useCourses';
import { Avatar, Button, Input } from '../components/atoms';

const emptyProfile = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  direccion: '',
  fechaNacimiento: '',
  genero: '',
  documentoIdentidad: '',
  avatarUrl: '',
  biografia: '',
};

const profileFields = Object.keys(emptyProfile);

const buildForm = (user = {}) =>
  profileFields.reduce((acc, field) => {
    acc[field] = user?.[field] ?? '';
    return acc;
  }, {});

const formatValue = (value) => {
  if (!value) return 'No registrado';
  if (value === 'prefiero_no_decir') return 'Prefiero no decir';
  return value.toString().replaceAll('_', ' ');
};

const inputClass = 'h-9 rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-sky-300 focus:bg-white focus:ring-sky-100';
const textareaClass = 'min-h-24 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100';

const Field = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
    {children}
  </label>
);

const InfoItem = ({ icon, label, value, className = '' }) => {
  const iconNode = React.createElement(icon, { className: 'h-4 w-4 text-sky-600' });

  return (
    <div className={`rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {iconNode}
        {label}
      </div>
      <div className="mt-1 break-words text-sm font-semibold leading-snug text-gray-800">{formatValue(value)}</div>
    </div>
  );
};

const InfoCard = ({ icon, title, description, children }) => {
  const iconNode = React.createElement(icon, { className: 'h-5 w-5' });

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          {iconNode}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 hidden text-sm text-gray-500 sm:block">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
};

const StatCard = ({ value, label, helper }) => (
  <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="text-2xl font-semibold leading-tight text-gray-900">{formatValue(value)}</div>
    <div className="mt-1 text-sm font-semibold text-gray-700">{label}</div>
    <div className="mt-1 text-xs text-gray-500">{helper}</div>
  </article>
);

const TeacherProfilePage = () => {
  const { user: sessionUser, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileRef = useRef(null);
  const [form, setForm] = useState(() => buildForm(sessionUser));
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState('');
  const shouldEdit = searchParams.get('edit') === '1';

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['teacher-profile', sessionUser?.id],
    queryFn: () => ProfileService.getById(sessionUser.id),
    enabled: !!sessionUser?.id,
  });
  const { data: teacherCourses = [] } = useTeacherCourses();

  const profileUser = data?.user || sessionUser;
  const courses = teacherCourses;
  const fullName = `${form.nombre || ''} ${form.apellido || ''}`.trim() || 'Docente';
  const uniqueCourses = useMemo(() => {
    const seen = new Set();
    return courses.filter((course) => {
      const title = course?.title || course?.nombre || course?.name || '';
      const key = title.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [courses]);

  const stats = useMemo(() => ([
    {
      label: 'Cursos asignados',
      value: uniqueCourses.length,
      helper: 'Sin duplicar por aula',
    },
    {
      label: 'Codigo docente',
      value: profileUser?.codigo || 'No registrado',
      helper: 'Identificador institucional',
    },
    {
      label: 'Rol',
      value: profileUser?.rol || 'profesor',
      helper: 'Tipo de cuenta',
    },
  ]), [profileUser?.codigo, profileUser?.rol, uniqueCourses.length]);

  useEffect(() => {
    setForm(buildForm(profileUser));
  }, [profileUser]);

  useEffect(() => {
    if (shouldEdit) setEditing(true);
  }, [shouldEdit]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, avatarUrl: reader.result || '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setForm(buildForm(profileUser));
    setEditing(false);
    if (shouldEdit) setSearchParams({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setMessage('');
    try {
      const updated = await ProfileService.updateOwnProfile(form);
      updateUser(updated);
      queryClient.setQueryData(['teacher-profile', sessionUser.id], (current) => ({
        ...(current || {}),
        user: updated,
      }));
      setEditing(false);
      if (shouldEdit) setSearchParams({});
      setMessage('Perfil actualizado correctamente.');
    } finally {
      setSavingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 text-slate-600 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-sky-600" />
          Cargando perfil docente...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-lg border border-red-100 bg-red-50 p-5 text-red-700">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-5 w-5" />
            No se pudo cargar el perfil
          </div>
          <p className="mt-2 text-sm">{error?.message || 'Intentalo nuevamente en unos minutos.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 bg-white">
      {message && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setMessage('')}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Cerrar mensaje"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto mt-1 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">Perfil actualizado</h2>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
            <button
              type="button"
              onClick={() => setMessage('')}
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name={fullName} src={form.avatarUrl} size="xl" className="h-20 w-20 text-xl" />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold leading-tight text-gray-900">{fullName}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Docente activo
                </span>
              </div>
              <p className="text-sm font-medium text-sky-700">Perfil docente</p>
              <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {formatValue(form.correo)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IdCard className="h-4 w-4" />
                  Codigo {formatValue(profileUser?.codigo)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {uniqueCourses.length > 0 ? (
                  uniqueCourses.map((course) => {
                    const title = course?.title || course?.nombre || course?.name || 'Curso';
                    return (
                      <span
                        key={title}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700"
                      >
                        <BriefcaseBusiness className="h-4 w-4 text-sky-600" />
                        {title}
                      </span>
                    );
                  })
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-600">
                    <BriefcaseBusiness className="h-4 w-4 text-sky-600" />
                    Sin cursos registrados
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={() => setEditing(true)} className="h-10 rounded-lg px-4">
            <UserPen className="h-4 w-4" />
            Editar perfil
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
        <InfoCard
          icon={BriefcaseBusiness}
          title="Informacion del docente"
          description="Datos principales de contacto y perfil profesional."
        >
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            <InfoItem icon={Mail} label="Correo" value={form.correo} />
            <InfoItem icon={Phone} label="Telefono" value={form.telefono} />
            <InfoItem icon={IdCard} label="Documento" value={form.documentoIdentidad} />
            <InfoItem icon={CalendarDays} label="Fecha de nacimiento" value={form.fechaNacimiento} />
            <InfoItem icon={UserRound} label="Genero" value={form.genero} />
            <InfoItem icon={Home} label="Direccion" value={form.direccion} />
            <InfoItem icon={BookOpen} label="Biografia" value={form.biografia} className="sm:col-span-2 xl:col-span-3" />
          </div>
        </InfoCard>

        <InfoCard
          icon={Shield}
          title="Cuenta"
          description="Datos basicos de acceso institucional."
        >
          <div className="grid gap-2">
            <InfoItem icon={IdCard} label="Codigo docente" value={profileUser?.codigo} />
            <InfoItem icon={UserRound} label="Rol" value={profileUser?.rol} />
            <InfoItem icon={CalendarDays} label="Fecha de registro" value={profileUser?.fechaRegistro} />
          </div>
        </InfoCard>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/45 px-3 py-6 backdrop-blur-sm sm:px-5">
          <form onSubmit={handleSubmit} className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Editar perfil docente</h2>
                <p className="mt-1 text-sm text-gray-500">Actualiza tus datos profesionales y de contacto.</p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Cerrar formulario"
                disabled={savingProfile}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-11rem)] space-y-4 overflow-y-auto bg-white p-4 sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Informacion del docente</h3>
                    <p className="mt-1 text-sm text-gray-500">Foto de perfil, identidad y contacto principal.</p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)]">
                  <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center">
                    <Avatar name={fullName} src={form.avatarUrl} size="xl" className="h-24 w-24 text-2xl" />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Camera className="h-4 w-4" />
                      Cambiar foto
                    </button>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                    <Field label="Nombres">
                      <Input className={inputClass} value={form.nombre} onChange={handleChange('nombre')} required />
                    </Field>
                    <Field label="Apellidos">
                      <Input className={inputClass} value={form.apellido} onChange={handleChange('apellido')} required />
                    </Field>
                    <Field label="Correo">
                      <Input className={inputClass} type="email" value={form.correo} onChange={handleChange('correo')} required />
                    </Field>
                    <Field label="Telefono">
                      <Input className={inputClass} value={form.telefono} onChange={handleChange('telefono')} />
                    </Field>
                    <Field label="Documento">
                      <Input className={inputClass} value={form.documentoIdentidad} onChange={handleChange('documentoIdentidad')} />
                    </Field>
                    <Field label="Fecha de nacimiento">
                      <Input className={inputClass} type="date" value={form.fechaNacimiento || ''} onChange={handleChange('fechaNacimiento')} />
                    </Field>
                    <Field label="Genero">
                      <select
                        value={form.genero}
                        onChange={handleChange('genero')}
                        className={`${inputClass} w-full border px-2 outline-none focus:ring-2`}
                      >
                        <option value="">Sin especificar</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Masculino</option>
                        <option value="otro">Otro</option>
                        <option value="prefiero_no_decir">Prefiero no decir</option>
                      </select>
                    </Field>
                    <Field label="URL de foto">
                      <Input className={inputClass} value={form.avatarUrl} onChange={handleChange('avatarUrl')} placeholder="https://..." />
                    </Field>
                    <Field label="Direccion" className="sm:col-span-2 xl:col-span-1">
                      <Input className={inputClass} value={form.direccion} onChange={handleChange('direccion')} />
                    </Field>
                    <Field label="Biografia / especialidad" className="sm:col-span-2 xl:col-span-3">
                      <textarea value={form.biografia} onChange={handleChange('biografia')} className={textareaClass} />
                    </Field>
                  </div>
                </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-gray-200 bg-white px-5 py-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={savingProfile} className="h-10 rounded-lg px-4">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" disabled={savingProfile} className="h-10 rounded-lg bg-sky-600 px-4 hover:bg-sky-700">
                <Save className="h-4 w-4" />
                {savingProfile ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherProfilePage;
