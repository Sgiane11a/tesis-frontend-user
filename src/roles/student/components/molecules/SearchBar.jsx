import React from 'react';
import { Icon } from '../atoms/Icon';
import { Input } from '../atoms/Input';

// Ahora acepta 'value' y 'onChange' como props para controlar su estado desde fuera
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-lg"> {/* Aumentamos un poco el tamaño máximo */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="search" size={20} className="text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Busca un curso..." // Placeholder más específico
        className="pl-10"
        value={value} // El valor del input es controlado por el estado del padre
        onChange={onChange} // La función de cambio es manejada por el padre
      />
    </div>
  );
};

export { SearchBar };
export {};