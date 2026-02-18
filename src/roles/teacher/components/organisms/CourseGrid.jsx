import React, { useState, useMemo } from 'react';
import { CourseCard, CourseCardSkeleton, EmptyStateCourses, ErrorState, SearchBar } from '../molecules';
import { Text } from '../atoms';
import { useTeacherCourses } from '../../../../hooks/useCourses';

const SKELETON_COUNT = 6;

const CourseGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: courses = [], isLoading, isError, error, refetch } = useTeacherCourses();

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
    <div>
      {/* Encabezado con título y búsqueda */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
        <div>
          <Text as="h1" size="3xl" weight="extrabold" className="tracking-tight text-2xl sm:text-3xl">
            CURSOS
          </Text>
          <div className="w-16 h-1 bg-primary rounded-full mt-2" />
          {!isLoading && (
            <Text size="sm" color="muted" className="mt-3">
              {courses.length} {courses.length === 1 ? 'curso asignado' : 'cursos asignados'}
            </Text>
          )}
        </div>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <ErrorState
          message={error?.message || 'No se pudieron cargar tus cursos.'}
          onRetry={refetch}
        />
      )}

      {/* Sin resultados */}
      {!isLoading && !isError && courses.length > 0 && filteredCourses.length === 0 && (
        <EmptyStateCourses message={`No se encontraron cursos con "${searchTerm}".`} />
      )}

      {/* Sin cursos */}
      {!isLoading && !isError && courses.length === 0 && (
        <EmptyStateCourses />
      )}

      {/* Grid de cursos */}
      {!isLoading && !isError && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              studentCount={course.studentCount ?? 0}
              averageScore={course.averageScore ?? 0}
              progress={course.progress ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { CourseGrid };
