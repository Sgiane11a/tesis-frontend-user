import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentRoutes } from './roles/student/StudentRoutes';
import Web from './pages/web';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Web />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="*" element={<div><h1>404 - Página no encontrada</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;

