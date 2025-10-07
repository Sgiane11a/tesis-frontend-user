// src/roles/student/pages/PeoplePage.jsx (ACTUALIZADO)
import React, { useState, useMemo, useEffect } from 'react';
import { Text } from '../components/atoms/Text';
import { SearchBar } from '../components/molecules/SearchBar';
import { FilterDropdown } from '../components/molecules/FilterDropdown';
import { UserListTable } from '../components/organisms/UserListTable'; 
import { UserProfileCard } from '../components/organisms/UserProfileCard';
const allUsers = [
  { 
    id: 1, 
    name: 'CASTILLO MENDOZA, RICARDO', 
    firstName: 'Ricardo', lastName: 'Castillo Mendoza',
    code: 'PRO-458-TRM', section: '1ero de Secundaria', role: 'Profesor', 
    avatarUrl: 'https://i.imgur.com/OzA0Sbe.png',
    email: 'r.castillo@educativa.edu.pe', phone: '+51 987 654 321', address: 'Av. Principal 123, Lima',
    dob: '15 de Mayo, 1985', bio: 'Profesor apasionado por la historia y la tecnología educativa.',
    attendance: 100, recentGrades: [], // Los profesores no tienen notas
    guardianName: 'N/A', emergencyPhone: 'N/A'
  },
  { 
    id: 2, 
    name: 'VARGAS ROJAS, CAMILA', 
    firstName: 'Camila', lastName: 'Vargas Rojas',
    code: 'STU-101-CVR', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/i9bF9oE.png',
    email: 'c.vargas@est.educativa.edu.pe', phone: '+51 912 345 678', address: 'Jr. Los Girasoles 456, Surco',
    dob: '10 de Enero, 2011', bio: 'Me encanta dibujar y jugar vóley. Mi curso favorito es Arte.',
    attendance: 98, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 18 },
      { subject: 'Comunicación - Tarea 5', score: 15 },
      { subject: 'Ciencias - Laboratorio 3', score: 19 },
    ],
    guardianName: 'Mariela Rojas', emergencyPhone: '+51 998 877 665'
  },
  { 
    id: 3, 
    name: 'FLORES QUISPE, MATEO', 
    firstName: 'Mateo', lastName: 'Flores Quispe',
    code: 'STU-102-MFQ', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/4hKkU9L.png',
    email: 'm.flores@est.educativa.edu.pe', phone: '+51 923 456 789', address: 'Calle Las Begonias 789, Miraflores',
    dob: '22 de Marzo, 2011', bio: 'Futuro programador y fanático de los videojuegos. Disfruto de la clase de computación.',
    attendance: 95, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 14 },
      { subject: 'Comunicación - Tarea 5', score: 17 },
      { subject: 'Ciencias - Laboratorio 3', score: 15 },
    ],
    guardianName: 'Carlos Flores', emergencyPhone: '+51 997 766 554'
  },
   { 
    id: 4, 
    name: 'CASTILLO MENDOZA, RICARDO', 
    firstName: 'Ricardo', lastName: 'Castillo Mendoza',
    code: 'PRO-458-TRM', section: '1ero de Secundaria', role: 'Profesor', 
    avatarUrl: 'https://i.imgur.com/OzA0Sbe.png',
    email: 'r.castillo@educativa.edu.pe', phone: '+51 987 654 321', address: 'Av. Principal 123, Lima',
    dob: '15 de Mayo, 1985', bio: 'Profesor apasionado por la historia y la tecnología educativa.',
    attendance: 100, recentGrades: [], // Los profesores no tienen notas
    guardianName: 'N/A', emergencyPhone: 'N/A'
  },
  { 
    id: 5, 
    name: 'VARGAS ROJAS, CAMILA', 
    firstName: 'Camila', lastName: 'Vargas Rojas',
    code: 'STU-101-CVR', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/i9bF9oE.png',
    email: 'c.vargas@est.educativa.edu.pe', phone: '+51 912 345 678', address: 'Jr. Los Girasoles 456, Surco',
    dob: '10 de Enero, 2011', bio: 'Me encanta dibujar y jugar vóley. Mi curso favorito es Arte.',
    attendance: 98, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 18 },
      { subject: 'Comunicación - Tarea 5', score: 15 },
      { subject: 'Ciencias - Laboratorio 3', score: 19 },
    ],
    guardianName: 'Mariela Rojas', emergencyPhone: '+51 998 877 665'
  },
  { 
    id: 6, 
    name: 'FLORES QUISPE, MATEO', 
    firstName: 'Mateo', lastName: 'Flores Quispe',
    code: 'STU-102-MFQ', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/4hKkU9L.png',
    email: 'm.flores@est.educativa.edu.pe', phone: '+51 923 456 789', address: 'Calle Las Begonias 789, Miraflores',
    dob: '22 de Marzo, 2011', bio: 'Futuro programador y fanático de los videojuegos. Disfruto de la clase de computación.',
    attendance: 95, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 14 },
      { subject: 'Comunicación - Tarea 5', score: 17 },
      { subject: 'Ciencias - Laboratorio 3', score: 15 },
    ],
    guardianName: 'Carlos Flores', emergencyPhone: '+51 997 766 554'
  },
   { 
    id: 7, 
    name: 'CASTILLO MENDOZA, RICARDO', 
    firstName: 'Ricardo', lastName: 'Castillo Mendoza',
    code: 'PRO-458-TRM', section: '1ero de Secundaria', role: 'Profesor', 
    avatarUrl: 'https://i.imgur.com/OzA0Sbe.png',
    email: 'r.castillo@educativa.edu.pe', phone: '+51 987 654 321', address: 'Av. Principal 123, Lima',
    dob: '15 de Mayo, 1985', bio: 'Profesor apasionado por la historia y la tecnología educativa.',
    attendance: 100, recentGrades: [], // Los profesores no tienen notas
    guardianName: 'N/A', emergencyPhone: 'N/A'
  },
  { 
    id: 8, 
    name: 'VARGAS ROJAS, CAMILA', 
    firstName: 'Camila', lastName: 'Vargas Rojas',
    code: 'STU-101-CVR', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/i9bF9oE.png',
    email: 'c.vargas@est.educativa.edu.pe', phone: '+51 912 345 678', address: 'Jr. Los Girasoles 456, Surco',
    dob: '10 de Enero, 2011', bio: 'Me encanta dibujar y jugar vóley. Mi curso favorito es Arte.',
    attendance: 98, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 18 },
      { subject: 'Comunicación - Tarea 5', score: 15 },
      { subject: 'Ciencias - Laboratorio 3', score: 19 },
    ],
    guardianName: 'Mariela Rojas', emergencyPhone: '+51 998 877 665'
  },
  { 
    id: 9, 
    name: 'FLORES QUISPE, MATEO', 
    firstName: 'Mateo', lastName: 'Flores Quispe',
    code: 'STU-102-MFQ', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/4hKkU9L.png',
    email: 'm.flores@est.educativa.edu.pe', phone: '+51 923 456 789', address: 'Calle Las Begonias 789, Miraflores',
    dob: '22 de Marzo, 2011', bio: 'Futuro programador y fanático de los videojuegos. Disfruto de la clase de computación.',
    attendance: 95, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 14 },
      { subject: 'Comunicación - Tarea 5', score: 17 },
      { subject: 'Ciencias - Laboratorio 3', score: 15 },
    ],
    guardianName: 'Carlos Flores', emergencyPhone: '+51 997 766 554'
  },
   { 
    id: 10, 
    name: 'CASTILLO MENDOZA, RICARDO', 
    firstName: 'Ricardo', lastName: 'Castillo Mendoza',
    code: 'PRO-458-TRM', section: '1ero de Secundaria', role: 'Profesor', 
    avatarUrl: 'https://i.imgur.com/OzA0Sbe.png',
    email: 'r.castillo@educativa.edu.pe', phone: '+51 987 654 321', address: 'Av. Principal 123, Lima',
    dob: '15 de Mayo, 1985', bio: 'Profesor apasionado por la historia y la tecnología educativa.',
    attendance: 100, recentGrades: [], // Los profesores no tienen notas
    guardianName: 'N/A', emergencyPhone: 'N/A'
  },
  { 
    id:11, 
    name: 'VARGAS ROJAS, CAMILA', 
    firstName: 'Camila', lastName: 'Vargas Rojas',
    code: 'STU-101-CVR', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/i9bF9oE.png',
    email: 'c.vargas@est.educativa.edu.pe', phone: '+51 912 345 678', address: 'Jr. Los Girasoles 456, Surco',
    dob: '10 de Enero, 2011', bio: 'Me encanta dibujar y jugar vóley. Mi curso favorito es Arte.',
    attendance: 98, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 18 },
      { subject: 'Comunicación - Tarea 5', score: 15 },
      { subject: 'Ciencias - Laboratorio 3', score: 19 },
    ],
    guardianName: 'Mariela Rojas', emergencyPhone: '+51 998 877 665'
  },
  { 
    id: 12, 
    name: 'FLORES QUISPE, MATEO', 
    firstName: 'Mateo', lastName: 'Flores Quispe',
    code: 'STU-102-MFQ', section: '1ero de Secundaria', role: 'Alumno', 
    avatarUrl: 'https://i.imgur.com/4hKkU9L.png',
    email: 'm.flores@est.educativa.edu.pe', phone: '+51 923 456 789', address: 'Calle Las Begonias 789, Miraflores',
    dob: '22 de Marzo, 2011', bio: 'Futuro programador y fanático de los videojuegos. Disfruto de la clase de computación.',
    attendance: 95, 
    recentGrades: [
      { subject: 'Matemática - Examen Parcial', score: 14 },
      { subject: 'Comunicación - Tarea 5', score: 17 },
      { subject: 'Ciencias - Laboratorio 3', score: 15 },
    ],
    guardianName: 'Carlos Flores', emergencyPhone: '+51 997 766 554'
  },
  // ... puedes añadir más alumnos con este formato
];

// El resto de la página (la lógica de estado y el layout) no necesita cambios.
const ITEMS_PER_PAGE = 10;
const PeoplePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  useEffect(() => {
    setSelectedUser(allUsers.find(u => u.role === 'Profesor'));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsProfileVisible(true);
  };
  
  const filteredUsers = useMemo(() => allUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).filter(user => selectedRole === 'Todos' || user.role === selectedRole), [searchTerm, selectedRole]);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginationInfo = {
    currentPage, totalPages, total: filteredUsers.length,
    start: filteredUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0,
    end: Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length),
  };

  return (
    <div className="space-y-6">
      <Text as="h2" size="xl" weight="bold">Integrantes del Aula</Text>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar 
            placeholder="Busca un integrante..."
            value={searchTerm} 
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
          />
        </div>
        <FilterDropdown 
          options={[ { value: 'Todos', label: 'Todos' }, { value: 'Alumno', label: 'Alumnos' }, { value: 'Profesor', label: 'Profesor' } ]}
          selected={selectedRole}
          onSelect={(value) => { setSelectedRole(value); setCurrentPage(1); }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className={`transition-all duration-300 ease-in-out ${isProfileVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="h-[600px]">
            <UserListTable
              users={paginatedUsers}
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
              pagination={paginationInfo}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        {isProfileVisible && selectedUser && (
          <div>
            <UserProfileCard user={selectedUser} onClose={() => setIsProfileVisible(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PeoplePage;