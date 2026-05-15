import React from 'react';
import {
  teacherProfile,
  teacherProfileStats,
  teacherRecentActivity,
  teacherSecurityItems,
} from '../mocks';
import {
  ActivityCard,
  ProfileHeaderCard,
  ProfileInfoCard,
  ProfileStatsGrid,
  SecurityCard,
} from '../components/profile';

const TeacherProfilePage = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Perfil docente</h1>
      <p className="mt-1 text-sm text-gray-500">
        Gestiona tu informacion principal y seguridad dentro de EduIA.
      </p>
    </div>

    <ProfileHeaderCard profile={teacherProfile} />
    <ProfileStatsGrid stats={teacherProfileStats} />

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <ProfileInfoCard
          title="Informacion del docente"
          description="Datos esenciales de contacto y asignacion academica."
          items={teacherProfile.profileInfo}
        />
      </div>

      <div className="space-y-4">
        <SecurityCard items={teacherSecurityItems} />
        <ActivityCard activity={teacherRecentActivity} />
      </div>
    </div>
  </div>
);

export default TeacherProfilePage;
