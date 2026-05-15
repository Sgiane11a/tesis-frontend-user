import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CourseRetos from '../../components/organisms/curso/CourseRetos';

const RetosPage = () => {
  const { course } = useOutletContext();

  return (
    <CourseRetos course={course} />
  );
};

export default RetosPage;
