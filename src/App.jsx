import React, { useState } from 'react';
import logoJorge from './assets/image.png';
import AdminPanel from './components/AdminPanel'; // Importamos el nuevo componente

const initialUnidades = [
  // ... tus unidades iniciales aquí
];

function App() {
  const [unidades, setUnidades] = useState(initialUnidades);
  const [showAdmin, setShowAdmin] = useState(false);
  const [filtro, setFiltro] = useState('Todos');

  const manejarNuevaUnidad = (nuevaUnidad) => {
    const unidadConId = { ...nuevaUnidad, id: Date.now() };
    setUnidades([unidadConId, ...unidades]); // La pone al principio de la lista
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-gray-900 p-4 bg-black/90 flex justify-between items-center sticky top-0 z-50">
        <img src={logoJorge} alt="Logo" className="h-12" />
        <button 
          onClick={() => setShowAdmin(!showAdmin)}
          className="text-[10px] font-black text-gray-600 hover:text-[#009de1] transition-colors"
        >
          {showAdmin ? "CERRAR GESTIÓN" : "ACCESO SISTEMA"}
        </button>
      </nav>

      {/* Solo mostramos el panel si showAdmin es true */}
      {showAdmin && <AdminPanel onAgregar={manejarNuevaUnidad} />}

      {/* ... Resto de tu código (Header, Filtros, Grilla) ... */}
    </div>
  );
}

export default App;
