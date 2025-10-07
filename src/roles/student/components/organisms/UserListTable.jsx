
import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { Pagination } from '../molecules/Pagination';

// Sub-componente para una fila de la tabla
const UserListRow = ({ user, isSelected, onSelect }) => {
  const selectedClasses = 'bg-primary-light border-l-4 border-primary';
  const normalClasses = 'border-l-4 border-transparent';

  return (
    <tr 
      onClick={() => onSelect(user)}
      className={`cursor-pointer border-b border-gray-200 transition-colors ${isSelected ? selectedClasses : `${normalClasses} hover:bg-gray-50`}`}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden shrink-0">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline font-medium text-sm">
            {user.name}
          </a>
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600 text-sm">{user.code}</td>
      <td className="py-3 px-4 text-gray-600 text-sm">{user.section}</td>
      <td className="py-3 px-4 text-gray-600 text-sm">{user.role}</td>
    </tr>
  );
};

const UserListTable = ({ users, selectedUser, onSelectUser, pagination, onPageChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Código</th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sección</th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserListRow 
                key={user.id} 
                user={user} 
                isSelected={selectedUser?.id === user.id}
                onSelect={onSelectUser}
              />
            ))}
          </tbody>
        </table>
      </div>
       <div className="p-4 flex justify-between items-center text-sm text-gray-600 border-t border-gray-200">
        <div>Mostrando {pagination.start} - {pagination.end} de {pagination.total}</div>
        
        {/* === AQUÍ ESTÁ LA CORRECCIÓN === */}
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages} 
          onPageChange={onPageChange}
        />

      </div>
    </div>
  );
};

export { UserListTable };
export {};