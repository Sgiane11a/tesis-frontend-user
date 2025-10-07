// src/roles/student/components/organisms/UserProfileCard.jsx (ACTUALIZADO)
import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { IconButton } from '../molecules/IconButton';
import { ProgressBar } from '../atoms/ProgressBar';

const ProfileField = ({ label, value, iconName }) => (
  <div className="flex items-start gap-4 text-left">
    <Icon name={iconName} size={18} className="text-gray-400 mt-1 shrink-0" />
    <div>
      <Text as="p" size="xs" color="muted" weight="medium" className="uppercase tracking-wider">{label}</Text>
      <Text as="p" size="sm" className="text-gray-800">{value}</Text>
    </div>
  </div>
);

const UserProfileCard = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');
  if (!user) return null;

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <Card className="p-0 overflow-hidden relative">
      <div className="absolute top-3 right-3 z-20">
        <IconButton iconName="x" onClick={onClose} />
      </div>

      <div className={`h-32 bg-gradient-to-r ${user.role === 'Profesor' ? 'from-indigo-200 to-purple-200' : 'from-blue-100 to-cyan-100'} relative mb-16`}>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center ring-4 ring-white overflow-hidden">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <div className="pb-4 px-6 text-center">
        <Text as="h3" size="lg" weight="bold">{user.firstName} {user.lastName}</Text>
        <Text color="muted">{user.role}</Text>
      </div>

      {/* Pestañas de Navegación */}
      <div className="border-b border-gray-200 px-6">
        <nav className="-mb-px flex justify-center gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las Pestañas */}
      <div className="p-6">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <ProfileField label="Código de Estudiante" value={user.code} iconName="graduation-cap" />
            <ProfileField label="Sección" value={user.section} iconName="book-open" />
            <ProfileField label="Fecha de Nacimiento" value={user.dob} iconName="calendar" />
            <div className="pt-2">
                <Text size="xs" color="muted" weight="medium" className="uppercase tracking-wider">Sobre mí</Text>
                <Text size="sm" color="muted" className="mt-1 italic">"{user.bio}"</Text>
            </div>
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <ProfileField label="Email" value={user.email} iconName="mail" />
            <ProfileField label="Teléfono" value={user.phone} iconName="phone" />
            <ProfileField label="Dirección" value={user.address} iconName="home" />
            <div className="pt-4 border-t border-gray-100">
                <ProfileField label="Nombre del Apoderado" value={user.guardianName} iconName="shield" />
            </div>
            <ProfileField label="Teléfono de Emergencia" value={user.emergencyPhone} iconName="siren" />
          </div>
        )}
      </div>
    </Card>
  );
};

export { UserProfileCard };
export {};