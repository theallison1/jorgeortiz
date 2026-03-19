import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ({ onAgregar }) => {
  const navigate = useNavigate();
  const [nuevo, setNuevo] = useState({
    marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(nuevo);
    alert("Unidad agregada (en memoria)");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-xl mx-auto border border-[#009de1] p-8 rounded-2xl bg-[#111]">
        <h2 className="text-[#009de1] font-black uppercase italic mb-6">Panel de Administración</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="bg-black border border-gray-800 p-3 rounded" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value})} required />
          <input className="bg-black border border-gray-800 p-3 rounded" placeholder="MODELO" onChange={e => setNuevo({...nuevo, modelo: e.target.value})} required />
          <input className="bg-black border border-gray-800 p-3 rounded" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
          <input className="bg-black border border-gray-800 p-3 rounded" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
          <button type="submit" className="bg-[#009de1] py-3 font-black uppercase rounded mt-4">Publicar Ahora</button>
        </form>
        <button onClick={() => navigate("/")} className="w-full mt-4 text-gray-600 text-[10px] uppercase font-bold tracking-widest">Volver al inicio</button>
      </div>
    </div>
  );
};

export default Admin;