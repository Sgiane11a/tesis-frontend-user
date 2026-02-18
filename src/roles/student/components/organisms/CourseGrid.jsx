import React, { useState, useMemo } from 'react';
import { CourseCard } from '../molecules/CourseCard';
import { CourseCardSkeleton } from '../molecules/CourseCardSkeleton';
import { EmptyStateCourses } from '../molecules/EmptyStateCourses';
import { ErrorState } from '../molecules/ErrorState';
import { SearchBar } from '../molecules/SearchBar';
import { useStudentCourses } from '../../../../hooks/useCourses';

const SKELETON_COUNT = 6;

const CourseGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: courses = [], isLoading, isError, error, refetch } = useStudentCourses();

  // Filtrado por título (case-insensitive)
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    const term = searchTerm.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        (c.description && c.description.toLowerCase().includes(term))
    );
  }, [courses, searchTerm]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Encabezado con búsqueda */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Cursos</h1>
          {!isLoading && (
            <p className="text-sm text-gray-500 mt-1">
              {courses.length} {courses.length === 1 ? 'curso asignado' : 'cursos asignados'}
            </p>
          )}
        </div>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Estado de error */}
      {isError && (
        <ErrorState
          message={error?.message || 'No se pudieron cargar tus cursos.'}
          onRetry={refetch}
        />
      )}

      {/* Sin resultados tras búsqueda */}
      {!isLoading && !isError && courses.length > 0 && filteredCourses.length === 0 && (
        <EmptyStateCourses
          message={`No se encontraron cursos con "${searchTerm}".`}
        />
      )}

      {/* Sin cursos asignados */}
      {!isLoading && !isError && courses.length === 0 && (
        <EmptyStateCourses />
      )}

      {/* Grid de cursos */}
      {!isLoading && !isError && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              progress={course.progress ?? 0}
              imageUrl={course.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { CourseGrid };
export {};