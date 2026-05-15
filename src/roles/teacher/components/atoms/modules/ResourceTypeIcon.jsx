import React from 'react';
import { FileText, Film, FileType2, Link as LinkIcon } from 'lucide-react';

const iconByType = {
  pdf: FileText,
  ppt: FileType2,
  word: FileType2,
  video: Film,
  youtube: Film,
  link: LinkIcon,
  otro: FileText,
};

const colorByType = {
  pdf: 'text-red-600',
  ppt: 'text-orange-600',
  word: 'text-blue-600',
  video: 'text-green-600',
  youtube: 'text-rose-600',
  link: 'text-sky-500',
  otro: 'text-gray-500',
};

const ResourceTypeIcon = ({ type }) => {
  const Icon = iconByType[type] || FileText;

  return <Icon className={`w-[18px] h-[18px] ${colorByType[type] || 'text-sky-500'}`} />;
};

export default ResourceTypeIcon;
