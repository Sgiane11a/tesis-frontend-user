import React from 'react';
import { Camera, CheckCircle2, Mail, MapPin, Pencil } from 'lucide-react';
import { Avatar } from '../atoms';

const ProfileHeaderCard = ({ profile }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar name={profile.fullName} src={profile.avatarUrl} size="xl" className="h-20 w-20 text-xl" />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            aria-label="Cambiar foto"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">{profile.fullName}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {profile.status}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-sky-700">{profile.specialty}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              {profile.profileInfo[0]?.value}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {profile.school}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        <Pencil className="h-4 w-4" />
        Editar perfil
      </button>
    </div>
  </section>
);

export default ProfileHeaderCard;
