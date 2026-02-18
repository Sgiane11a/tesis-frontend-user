import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/molecules/ProtectedRoute';
import { StudentRoutes } from './roles/student/StudentRoutes';
import { TeacherRoutes } from './roles/teacher/teacherRoutes';
import Web from './pages/web';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Web />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['alumno']}>
                <StudentRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute allowedRoles={['profesor']}>
                <TeacherRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div><h1>404 - Página no encontrada</h1></div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

