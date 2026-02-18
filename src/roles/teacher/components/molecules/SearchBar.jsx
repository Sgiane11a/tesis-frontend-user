import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../atoms';

const SearchBar = ({ value, onChange, placeholder = 'Buscar curso...' }) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      icon={<Search className="w-4 h-4" />}
      className="max-w-sm"
    />
  );
};

export { SearchBar };
