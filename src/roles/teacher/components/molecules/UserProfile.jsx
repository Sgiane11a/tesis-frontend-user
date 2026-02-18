import React from 'react';
import { Avatar, Text } from '../atoms';

const UserProfile = ({ name, role, avatarUrl }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <Text size="base" weight="semibold" className="leading-tight">{name}</Text>
        <Text size="xs" color="muted" className="capitalize">{role}</Text>
      </div>
      <Avatar name={name} src={avatarUrl} size="md" />
    </div>
  );
};

export { UserProfile };
