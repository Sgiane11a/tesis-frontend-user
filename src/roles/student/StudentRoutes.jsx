
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout'; // Importa tu MainLayout
import DashboardPage from './pages/DashboardPage';
import IaGeneralPage from './pages/IaGeneralPage';
import PeoplePage from './pages/PeoplePage';
const StudentRoutes = () => {
  return (
    // ¡Envuelve todo con MainLayout!
    <MainLayout> 
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ia" element={<IaGeneralPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="*" element={<div>Página de estudiante no encontrada</div>} />
      </Routes>
    </MainLayout>
  );
};

export { StudentRoutes };