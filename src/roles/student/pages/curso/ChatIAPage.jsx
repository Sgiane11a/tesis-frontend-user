import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CourseChat from '../../components/organisms/curso/CourseChat';

const ChatIAPage = () => {
  const { course } = useOutletContext();

  return (
    <CourseChat course={course} />
  );
};

export default ChatIAPage;
