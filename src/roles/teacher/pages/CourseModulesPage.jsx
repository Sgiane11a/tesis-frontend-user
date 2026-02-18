import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeacherCourses } from '../../../hooks/useCourses';
import { CourseModulesView } from '../components/organisms/CourseModulesView';

const CourseModulesPage = () => {
  const { courseId } = useParams();
  const { data: courses = [] } = useTeacherCourses();

  const course = courses.find((c) => String(c.id) === String(courseId)) || null;

  return <CourseModulesView course={course} courseId={courseId} />;
};

export default CourseModulesPage;
