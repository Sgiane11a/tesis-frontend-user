import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  HeartPulse,
  Home,
  IdCard,
  Mail,
  Phone,
  Save,
  Shield,
  UserPen,
  UserRound,
  X,
  Loader2,
} from 'lucide-react';
import { Avatar } from '../atoms/Avatar';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { ProfileService } from '../../../../api';

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
  apoderadoNombre: '',
  apoderadoParentesco: '',
  apoderadoTelefono: '',
  apoderadoCorreo: '',
  apoderadoDocumento: '',
  contactoEmergenciaNombre: '',
  contactoEmergenciaParentesco: '',
  contactoEmergenciaTelefono: '',
  condicionMedica: '',
  alergias: '',
  observaciones: '',
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
const textareaClass = 'min-h-20 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100';

const Field = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
    {children}
  </label>
);

const InfoItem = ({ icon, label, value, children, className = '' }) => {
  const iconNode = React.createElement(icon, { className: 'h-4 w-4 text-sky-600' });

  return (
    <div className={`rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {iconNode}
        {label}
      </div>
      {children || <div className="mt-1 break-words text-sm font-semibold leading-snug text-gray-800">{formatValue(value)}</div>}
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

const PersonalInfoCard = ({ user, academic = {}, onSave, saving = false, initialEditing = false, onUserUpdate }) => {
  const [form, setForm] = useState(() => buildForm(user));
  const [editing, setEditing] = useState(initialEditing);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileRef = useRef(null);
  const fullName = `${form.nombre || ''} ${form.apellido || ''}`.trim() || 'Alumno';

  useEffect(() => {
    setForm(buildForm(user));
  }, [user]);

  useEffect(() => {
    if (initialEditing) setEditing(true);
  }, [initialEditing]);

  const classroomText = useMemo(() => {
    const classroom = academic.assignedClassroom;
    if (!classroom) return user?.grado ? `${user.grado} grado` : 'No asignada';
    return `${classroom.grado} ${classroom.seccion || ''}`.trim();
  }, [academic.assignedClassroom, user?.grado]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const updated = await ProfileService.uploadProfilePhoto(file);
      setForm((current) => ({ ...current, avatarUrl: updated.avatarUrl }));
      onUserUpdate?.(updated);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error al subir la foto. Intenta nuevamente.');
    } finally {
      setUploadingPhoto(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setForm(buildForm(user));
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave?.(form);
    setEditing(false);
  };

  return (
    <div className="space-y-3 bg-white">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative">
              <Avatar src={form.avatarUrl} name={fullName} className="h-20 w-20 text-xl" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold leading-tight text-gray-900">{fullName}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Alumno activo
                </span>
              </div>
              <p className="text-sm font-medium text-sky-700">Aula {classroomText}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {formatValue(form.correo)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IdCard className="h-4 w-4" />
                  Codigo {formatValue(user?.codigo)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button type="button" variant="ghost" onClick={() => setEditing(true)} className="h-10 border-gray-200 bg-white px-4 text-gray-700 hover:bg-gray-50">
              <UserPen className="h-4 w-4" />
              Editar perfil
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard value={user?.codigo} label="Codigo" helper="Identificador escolar" />
        <StatCard value={classroomText} label="Aula asignada" helper="Grado y seccion actual" />
        <StatCard value={academic.coursesCount ?? 0} label="Cursos matriculados" helper="Cursos disponibles" />
        <StatCard value={form.telefono} label="Telefono" helper="Contacto principal" />
      </section>

      <div className="space-y-3">
        <InfoCard
          icon={UserRound}
          title="Informacion del alumno"
          description="Datos personales y contacto principal."
        >
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem icon={Mail} label="Correo" value={form.correo} />
            <InfoItem icon={Phone} label="Telefono" value={form.telefono} />
            <InfoItem icon={IdCard} label="Documento" value={form.documentoIdentidad} />
            <InfoItem icon={CalendarDays} label="Fecha de nacimiento" value={form.fechaNacimiento} />
            <InfoItem icon={UserRound} label="Genero" value={form.genero} />
            <InfoItem icon={Home} label="Direccion" value={form.direccion} />
            <InfoItem icon={BookOpen} label="Biografia" value={form.biografia} className="sm:col-span-2 xl:col-span-2" />
          </div>
        </InfoCard>

        <div className="grid gap-3 lg:grid-cols-2">
          <InfoCard
            icon={Shield}
            title="Apoderado"
            description="Responsable registrado ante la institucion."
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <InfoItem icon={Shield} label="Nombre" value={form.apoderadoNombre} />
              <InfoItem icon={UserRound} label="Parentesco" value={form.apoderadoParentesco} />
              <InfoItem icon={Phone} label="Telefono" value={form.apoderadoTelefono} />
              <InfoItem icon={Mail} label="Correo" value={form.apoderadoCorreo} />
              <InfoItem icon={IdCard} label="Documento" value={form.apoderadoDocumento} />
            </div>
          </InfoCard>

          <InfoCard
            icon={HeartPulse}
            title="Emergencia y salud"
            description="Datos utiles para una atencion rapida."
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <InfoItem icon={AlertTriangle} label="Contacto" value={form.contactoEmergenciaNombre} />
              <InfoItem icon={UserRound} label="Parentesco" value={form.contactoEmergenciaParentesco} />
              <InfoItem icon={Phone} label="Telefono" value={form.contactoEmergenciaTelefono} />
              <InfoItem icon={HeartPulse} label="Condicion medica" value={form.condicionMedica} />
              <InfoItem icon={AlertTriangle} label="Alergias" value={form.alergias} />
              <InfoItem icon={BookOpen} label="Observaciones" value={form.observaciones} />
            </div>
          </InfoCard>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/45 px-3 py-6 backdrop-blur-sm sm:px-5">
          <form onSubmit={handleSubmit} className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Editar perfil</h2>
                <p className="mt-1 text-sm text-gray-500">Actualiza tus datos por secciones.</p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Cerrar formulario"
                disabled={saving}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-11rem)] space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-5">
              <section className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Informacion del alumno</h3>
                    <p className="mt-1 text-sm text-gray-500">Foto de perfil, identidad y contacto principal.</p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)]">
                  <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                    <Avatar src={form.avatarUrl} name={fullName} className="h-24 w-24 text-2xl" />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploadingPhoto} />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingPhoto}
                      className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadingPhoto ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Subiendo...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4" />
                          Cambiar foto
                        </>
                      )}
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
                    <Field label="Biografia" className="sm:col-span-2 xl:col-span-3">
                      <textarea value={form.biografia} onChange={handleChange('biografia')} className={textareaClass} />
                    </Field>
                  </div>
                </div>
              </section>

              <div className="grid gap-4 lg:grid-cols-2">
                <section className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Apoderado</h3>
                      <p className="mt-1 text-sm text-gray-500">Responsable registrado ante la institucion.</p>
                    </div>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <Field label="Nombre completo">
                      <Input className={inputClass} value={form.apoderadoNombre} onChange={handleChange('apoderadoNombre')} />
                    </Field>
                    <Field label="Parentesco">
                      <Input className={inputClass} value={form.apoderadoParentesco} onChange={handleChange('apoderadoParentesco')} />
                    </Field>
                    <Field label="Telefono">
                      <Input className={inputClass} value={form.apoderadoTelefono} onChange={handleChange('apoderadoTelefono')} />
                    </Field>
                    <Field label="Correo">
                      <Input className={inputClass} type="email" value={form.apoderadoCorreo} onChange={handleChange('apoderadoCorreo')} />
                    </Field>
                    <Field label="Documento" className="sm:col-span-2">
                      <Input className={inputClass} value={form.apoderadoDocumento} onChange={handleChange('apoderadoDocumento')} />
                    </Field>
                  </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Emergencia y salud</h3>
                      <p className="mt-1 text-sm text-gray-500">Datos utiles para una atencion rapida.</p>
                    </div>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <Field label="Contacto de emergencia">
                      <Input className={inputClass} value={form.contactoEmergenciaNombre} onChange={handleChange('contactoEmergenciaNombre')} />
                    </Field>
                    <Field label="Parentesco">
                      <Input className={inputClass} value={form.contactoEmergenciaParentesco} onChange={handleChange('contactoEmergenciaParentesco')} />
                    </Field>
                    <Field label="Telefono">
                      <Input className={inputClass} value={form.contactoEmergenciaTelefono} onChange={handleChange('contactoEmergenciaTelefono')} />
                    </Field>
                    <Field label="Condicion medica">
                      <Input className={inputClass} value={form.condicionMedica} onChange={handleChange('condicionMedica')} />
                    </Field>
                    <Field label="Alergias">
                      <Input className={inputClass} value={form.alergias} onChange={handleChange('alergias')} />
                    </Field>
                    <Field label="Observaciones">
                      <Input className={inputClass} value={form.observaciones} onChange={handleChange('observaciones')} />
                    </Field>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-gray-200 bg-white px-5 py-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" onClick={handleCancel} disabled={saving} className="h-10 border-gray-200 bg-white px-4 text-gray-700 hover:bg-gray-50">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={saving} className="h-10 bg-sky-600 px-4 hover:bg-sky-700">
                <Save className="h-4 w-4" />
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { PersonalInfoCard };
