import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { PersonalInfoCard } from '../components/organisms/PersonalInfoCard';
import { ProfileService } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';

const ProfilePage = () => {
  const { user: sessionUser, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState('');
  const shouldEdit = searchParams.get('edit') === '1';

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['student-profile', sessionUser?.id],
    queryFn: () => ProfileService.getById(sessionUser.id),
    enabled: !!sessionUser?.id,
  });

  const profileUser = data?.user || sessionUser;
  const academic = useMemo(() => ({
    assignedClassroom: data?.assignedClassroom,
    classrooms: data?.classrooms || [],
    courses: data?.courses || [],
    coursesCount: data?.summary?.total_cursos ?? data?.courses?.length ?? 0,
  }), [data]);

  const handleSaveProfile = async (values) => {
    setSavingProfile(true);
    setMessage('');
    try {
      const updated = await ProfileService.updateOwnProfile(values);
      updateUser(updated);
      queryClient.setQueryData(['student-profile', sessionUser.id], (current) => ({
        ...(current || {}),
        user: updated,
      }));
      setMessage('Perfil actualizado correctamente.');
      if (shouldEdit) setSearchParams({});
    } finally {
      setSavingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 text-slate-600 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-sky-600" />
          Cargando perfil del alumno...
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
    <div className="w-full">
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

      <PersonalInfoCard
        user={profileUser}
        academic={academic}
        saving={savingProfile}
        initialEditing={shouldEdit}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;
