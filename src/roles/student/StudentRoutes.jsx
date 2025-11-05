
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout'; // Importa tu MainLayout
import DashboardPage from './pages/DashboardPage';
import IaGeneralPage from './pages/IaGeneralPage';
import PeoplePage from './pages/PeoplePage';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';
import ModulesPage from './pages/curso/ModulesPage';
import RetosPage from './pages/curso/RetosPage';
import ChatIAPage from './pages/curso/ChatIAPage';
import InfoPage from './pages/curso/InfoPage';
import { Navigate } from 'react-router-dom';
const StudentRoutes = () => {
  return (
    // ¡Envuelve todo con MainLayout!
    <MainLayout> 
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ia" element={<IaGeneralPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Ruta del curso y subpáginas */}
        <Route path="dashboard/course/:courseId" element={<CoursePage />}>
          <Route index element={<Navigate to="modulos" replace />} />
          <Route path="modulos" element={<ModulesPage />} />
          <Route path="retos" element={<RetosPage />} />
          <Route path="chatia" element={<ChatIAPage />} />
          <Route path="info" element={<InfoPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export { StudentRoutes };