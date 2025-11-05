import React, { useState } from 'react';
import { PersonalInfoCard } from '../components/organisms/PersonalInfoCard';
import { ChangePasswordCard } from '../components/organisms/ChangePasswordCard';

const mockUser = {
  firstName: 'Gianella',
  lastName: 'Cordova',
  email: 'gianella@tecsup.edu.pe',
  dob: '15/03/2006',
  phone: '+51 999 999 999',
  bio: 'Soy estudiante, me interesa la historia y el arte. Me gusta participar en proyectos y aprender con recursos digitales.',
  avatarUrl: 'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
  code: 'STU-452-CT1',
  role: 'Estudiante',
  coursesCount: 12,
  overallProgress: 72,
  grade: '4TO',
  section: 'B',
  address: 'Jr. Los Olivos 123, Lima',
  guardianName: 'Carlos Cordova',
  enrollmentYear: 2020,
  lastActive: 'Hace 2 días'
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);

  const handleSave = (updated) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const handleChangePassword = () => {
    // acción post cambio de contraseña (mostrar notificación, etc.)
    // debug: password cambiado (mock). Se mantiene solo para desarrollo.
    if (process.env.NODE_ENV !== 'production') {
      console.log('Password cambiado (mock)');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <PersonalInfoCard user={user} onSave={handleSave} />
      </div>
      <div>
        <ChangePasswordCard onChangePassword={handleChangePassword} />
      </div>
    </div>
  );
};

export default ProfilePage;
