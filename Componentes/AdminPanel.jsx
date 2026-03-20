import React, { useState } from 'react';

const AdminPanel = ({ onAgregar }) => {
  const [nuevoAuto, setNuevoAuto] = useState({
    marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', 
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(nuevoAuto);
    // Resetear solo los campos de texto, mantenemos la imagen por defecto
    setNuevoAuto({ 
      marca: '', modelo: '', anio: '', precio: '', 
      categoria: nuevoAuto.categoria, 
      img: nuevoAuto.img 
    });
  };

  return (
    <div className="bg-[#111] border-b-2 border-[#009de1] p-8 shadow-2xl transition-all duration-500 ease-in-out">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 bg-[#009de1] rounded-full animate-ping"></div>
          <h3 className="text-[#009de1] font-black italic uppercase tracking-tighter text-lg">
            Sistema de Gestión de Unidades
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-xs text-white focus:border-[#009de1] outline-none transition-colors" 
            placeholder="MARCA" 
            value={nuevoAuto.marca} 
            onChange={e => setNuevoAuto({...nuevoAuto, marca: e.target.value.toUpperCase()})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-xs text-white focus:border-[#009de1] outline-none transition-colors" 
            placeholder="MODELO" 
            value={nuevoAuto.modelo} 
            onChange={e => setNuevoAuto({...nuevoAuto, modelo: e.target.value})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-xs text-white focus:border-[#009de1] outline-none transition-colors" 
            placeholder="AÑO" 
            value={nuevoAuto.anio} 
            onChange={e => setNuevoAuto({...nuevoAuto, anio: e.target.value})} 
            required 
          />
          <input 
            className="bg-black border border-gray-800 p-3 rounded text-xs text-white focus:border-[#009de1] outline-none transition-colors" 
            placeholder="PRECIO" 
            value={nuevoAuto.precio} 
            onChange={e => setNuevoAuto({...nuevoAuto, precio: e.target.value})} 
            required 
          />
          <select 
            className="bg-black border border-gray-800 p-3 rounded text-xs text-white focus:border-[#009de1] outline-none cursor-pointer" 
            value={nuevoAuto.categoria} 
            onChange={e => setNuevoAuto({...nuevoAuto, categoria: e.target.value})}
          >
            <option value="Camionetas">Camionetas</option>
            <option value="Motos">Motos</option>
          </select>
          
          <button 
            type="submit" 
            className="bg-[#009de1] text-white font-black uppercase text-[10px] rounded hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-blue-900/20"
          >
            Añadir al Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;

