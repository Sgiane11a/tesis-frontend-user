import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CourseRetos from '../../components/organisms/curso/CourseRetos';

const RetosPage = () => {
  const { aulaId, bimestre, course, courseId, setCourseChromeHidden } = useOutletContext();

  return (
    <CourseRetos
      course={course}
      courseId={courseId}
      aulaId={aulaId}
      bimestre={bimestre}
      setCourseChromeHidden={setCourseChromeHidden}
    />
  );
};

export default RetosPage;
