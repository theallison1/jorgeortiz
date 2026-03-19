import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
// Por ahora crearemos un componente simple de Admin para que no tire error
const AdminTemp = () => <div className="p-20 text-white font-black uppercase">Próximamente: Panel de Jorge</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* LA WEB QUE VEN TODOS */}
        <Route path="/" element={<Catalog />} />
        
        {/* LA WEB SECRETA (Ponele el nombre que quieras) */}
        <Route path="/panel-jorge-2026" element={<AdminTemp />} />
      </Routes>
    </Router>
  );
}

export default App;
