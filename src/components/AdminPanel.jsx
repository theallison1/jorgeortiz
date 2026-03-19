import React, { useState } from 'react';

const AdminPanel = ({ onAgregar }) => {
  const [nuevoAuto, setNuevoAuto] = useState({
    marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', 
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(nuevoAuto);
    // Limpiar formulario
    setNuevoAuto({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: nuevoAuto.img });
  };

  return (
    <div className="bg-[#111] border-b border-[#009de1] p-8 animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-[#009de1] font-black italic mb-6 uppercase tracking-widest flex items-center shadow-sm">
          <span className="mr-2">⚙️</span> Panel de Gestión de Inventario
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-sm text-white focus:border-[#009de1] outline-none" 
            placeholder="MARCA" 
            value={nuevoAuto.marca} 
            onChange={e => setNuevoAuto({...nuevoAuto, marca: e.target.value.toUpperCase()})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-sm text-white focus:border-[#009de1] outline-none" 
            placeholder="MODELO" 
            value={nuevoAuto.modelo} 
            onChange={e => setNuevoAuto({...nuevoAuto, modelo: e.target.value})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-sm text-white focus:border-[#009de1] outline-none" 
            placeholder="PRECIO (ej: u$s 40.000)" 
            value={nuevoAuto.precio} 
            onChange={e => setNuevoAuto({...nuevoAuto, precio: e.target.value})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-sm text-white focus:border-[#009de1] outline-none" 
            placeholder="AÑO" 
            value={nuevoAuto.anio} 
            onChange={e => setNuevoAuto({...nuevoAuto, anio: e.target.value})} 
            required 
          />
          <select 
            className="bg-black border border-gray-800 p-3 rounded text-sm text-white focus:border-[#009de1] outline-none" 
            value={nuevoAuto.categoria} 
            onChange={e => setNuevoAuto({...nuevoAuto, categoria: e.target.value})}
          >
            <option value="Camionetas">Camionetas</option>
            <option value="Motos">Motos</option>
          </select>
          <button 
            type="submit" 
            className="bg-[#009de1] text-white font-black uppercase text-xs rounded hover:bg-white hover:text-black transition-all duration-300"
          >
            Publicar Unidad
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
