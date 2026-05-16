import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CourseInfo from '../../components/organisms/curso/CourseInfo';

const InfoPage = () => {
  const { course } = useOutletContext() || {};

  return (
    <div>
      <CourseInfo course={course} />
    </div>
  );
};

export default InfoPage;
