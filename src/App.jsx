// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Importas el componente de rutas del estudiante que creaste
import { StudentRoutes } from './roles/student/StudentRoutes'; // Asegúrate de que la ruta de importación sea correcta

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA 1: Tu página de inicio o Landing Page */}
        {/* Cuando un usuario visite "www.tusitio.com/", verá el componente Landing. */}
        <Route path="/" element={<div><h1>404 - Página no encontrada</h1></div>} />

        {/* RUTA 2: El portal del estudiante */}
        {/* Cualquier URL que empiece con "/student/" será gestionada por StudentRoutes.
            El "/*" es crucial. Le dice a React Router que cualquier sub-ruta 
            (como /student/dashboard, /student/profile, etc.) debe ser manejada
            dentro del componente StudentRoutes. */}
        <Route path="/student/*" element={<StudentRoutes />} />

        {/* Opcional: Puedes añadir una ruta para páginas no encontradas */}
        <Route path="*" element={<div><h1>404 - Página no encontrada</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;