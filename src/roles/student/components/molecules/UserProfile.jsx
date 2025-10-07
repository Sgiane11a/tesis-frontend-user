// src/roles/student/components/molecules/UserProfile.jsx
import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';

const UserProfile = ({ name, role }) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar alt={name} />
      <div className="text-right">
        <Text size="sm" weight="semibold">{name}</Text>
        <Text size="xs" color="muted">{role}</Text>
      </div>
    </div>
  );
};

export { UserProfile };
export {};