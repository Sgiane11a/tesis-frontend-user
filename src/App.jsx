import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/molecules/ProtectedRoute';
import { StudentRoutes } from './roles/student/StudentRoutes';
import { TeacherRoutes } from './roles/teacher/teacherRoutes';
import Web from './pages/web';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;

