import React, { useState, useRef } from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Avatar } from '../atoms/Avatar';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { IconButton } from '../molecules/IconButton';

const PersonalInfoCard = ({ user, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '');
  const fileRef = useRef(null);

  const handleSave = () => {
    // Integración: aquí se subiría la imagen si cambió y luego actualizar la bio.
    const updated = { ...user, bio, avatarUrl: avatarPreview };
    if (onSave) onSave(updated);
    setEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
  <Card className="p-6 border-0 shadow-sm">
      <div>
        <Text as="h2" size="lg" weight="bold">Información Personal</Text>
        <Text size="sm" color="muted" className="mt-1">Datos del alumno — solo puedes editar tu descripción y foto</Text>
      </div>

  <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Columna izquierda: avatar y acción */}
  <div className="flex flex-col items-center lg:items-start gap-3">
          <div className="relative">
            <div className="rounded-full overflow-hidden ring-2 ring-white shadow-lg"> 
              <Avatar src={avatarPreview} name={`${user.firstName} ${user.lastName}`} className={'w-36 h-36'} />
            </div>
            <div className="absolute -bottom-2 right-0">
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" aria-label="Cambiar foto" />
              <Button variant="ghost" className="px-2 py-1 text-sm" onClick={() => fileRef.current && fileRef.current.click()}>Cambiar foto</Button>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <Text size="lg" weight="semibold">{user.firstName} {user.lastName}</Text>

            <div className="mt-3">
              <div className="text-sm text-gray-700">{user.role || 'Estudiante'}</div>
              <div className="mt-1 text-xs text-gray-600">Código: <span className="font-medium">{user.code || '-'}</span></div>
            </div>
          </div>
        </div>

        {/* Columna derecha: datos */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-2">
            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-md text-center">
                <div className="text-sm text-gray-500">Cursos</div>
                <div className="text-lg font-semibold text-gray-800">{user.coursesCount || 0}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md text-center">
                <div className="text-sm text-gray-500">Progreso</div>
                <div className="text-lg font-semibold text-gray-800">{user.overallProgress || 0}%</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md text-center">
                <div className="text-sm text-gray-500">Año Ingreso</div>
                <div className="text-lg font-semibold text-gray-800">{user.enrollmentYear || '-'}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Nombre</div>
              <div className="col-span-2 text-gray-800 font-medium">{user.firstName} {user.lastName}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Correo</div>
              <div className="col-span-2 text-gray-800">{user.email}</div>
            </div>

            {/* Código mostrado arriba como chip */}

            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Teléfono</div>
              <div className="col-span-2 text-gray-800">{user.phone || '-'}</div>
            </div>


            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Grado</div>
              <div className="col-span-2 text-gray-800">{user.grade || '-'}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Sección</div>
              <div className="col-span-2 text-gray-800">{user.section || '-'}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Dirección</div>
              <div className="col-span-2 text-gray-800">{user.address || '-'}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2 items-center">
              <div className="col-span-1 text-gray-400">Apoderado</div>
              <div className="col-span-2 text-gray-800">{user.guardianName || '-'}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <Text size="xs" color="muted" className="uppercase">Sobre mí</Text>
              {!editing && (
                <Button variant="ghost" className="text-sm" onClick={() => setEditing(true)}>Editar</Button>
              )}
            </div>

            {!editing ? (
              <div className="mt-2">
                <Text size="sm" className="text-gray-800 leading-relaxed">{bio || 'No has agregado una descripción.'}</Text>
              </div>
            ) : (
              <div className="mt-2">
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-28 resize-none focus:ring-2 focus:ring-primary" />
                <div className="mt-3 flex items-center gap-3 justify-end">
                  <Button variant="ghost" onClick={() => { setBio(user.bio || ''); setEditing(false); }}>Cancelar</Button>
                  <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PersonalInfoCard };
