import React, { useState } from 'react';
import { CourseCard } from '../molecules/CourseCard';
import { SearchBar } from '../molecules/SearchBar'; // <-- Importamos SearchBar

// Datos estáticos (los mismos que tenías)
const courses = [
  { id: 1, title: 'Historia del Perú - 1er Año', progress: 65, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. Carmen Luna', year: 2025 },
  { id: 2, title: 'Matemática Básica - 1er Año', progress: 80, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. Jorge Salas', year: 2025 },
  { id: 3, title: 'Ciencia y Ambiente - 1er Año', progress: 50, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. Ricardo Solis', year: 2025 },
  { id: 4, title: 'Comunicación Integral - 1er Año', progress: 72, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. Ana Torres', year: 2025 },
  { id: 5, title: 'Arte y Cultura - 1er Año', progress: 95, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. David Flores', year: 2025 },
  { id: 6, title: 'Educación Física - 1er Año', progress: 88, imageUrl: 'https://www.elcomercio.com/wp-content/uploads/2022/02/scrat.jpg', teacher: 'Prof. Sofia Mendoza', year: 2025 },
];

const CourseGrid = () => {
  // 1. Añadimos estado para guardar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Filtramos los cursos basándonos en el término de búsqueda
  // La búsqueda no distingue mayúsculas/minúsculas y busca en el título y el profesor
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  // Envolvemos todo en un div para posicionar la barra de búsqueda
  <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8"> {/* Contenedor para la barra de búsqueda con margen inferior */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. Renderizamos la lista de cursos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            progress={course.progress}
            imageUrl={course.imageUrl}
            teacher={course.teacher}
            year={course.year}
          />
        ))}
      </div>
    </div>
  );
};

export { CourseGrid };
export {};