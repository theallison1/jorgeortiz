import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';

function App() {
  const [unidadesNuevas, setUnidadesNuevas] = useState([]);

  const agregarUnidad = (nueva) => {
    setUnidadesNuevas([nueva, ...unidadesNuevas]);
  };

  return (
    <Router>
      <Routes>
        {/* URL: tupagina.onrender.com/#/ */}
        <Route path="/" element={<Catalog unidadesExternas={unidadesNuevas} />} />
        
        {/* URL: tupagina.onrender.com/#/panel-jorge-2026 */}
        <Route path="/panel-jorge-2026" element={<Admin onAgregar={agregarUnidad} />} />
      </Routes>
    </Router>
  );
}

export default App;