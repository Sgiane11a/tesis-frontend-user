import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CourseModules from '../../components/organisms/curso/CourseModules';

const ModulesPage = () => {
  const { courseId, aulaId, bimestre } = useOutletContext();

  return (
    <div>
      <CourseModules courseId={courseId} aulaId={aulaId} bimestre={bimestre} />
    </div>
  );
};

export default ModulesPage;
