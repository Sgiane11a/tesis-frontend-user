import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeacherCourses } from '../../../hooks/useCourses';
import { CourseDetailView } from '../components/organisms/CourseDetailView';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { data: courses = [], isLoading } = useTeacherCourses();

  // Buscar el curso específico en la lista cacheada
  const course = courses.find((c) => String(c.id) === String(courseId)) || null;

  return (
    <CourseDetailView
      course={course}
      isLoading={isLoading}
    />
  );
};

export default CourseDetailPage;
