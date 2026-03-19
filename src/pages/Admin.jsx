import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [nuevo, setNuevo] = useState({
    marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800' // Imagen por defecto
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "unidades"), {
        ...nuevo,
        fechaCreacion: serverTimestamp() // Para que se ordenen por fecha
      });
      alert("¡Unidad guardada con éxito en la base de datos!");
      navigate("/");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al conectar con Firebase.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-[#111] border-2 border-[#009de1] p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-black italic uppercase text-[#009de1] mb-6 tracking-tighter text-center">Panel de Carga Real</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="bg-black border border-gray-800 p-4 rounded-xl focus:border-[#009de1] transition-all outline-none" placeholder="MARCA (ej: TOYOTA)" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
          <input className="bg-black border border-gray-800 p-4 rounded-xl focus:border-[#009de1] transition-all outline-none" placeholder="MODELO (ej: HILUX SW4)" onChange={e => setNuevo({...nuevo, modelo: e.target.value})} required />
          <input className="bg-black border border-gray-800 p-4 rounded-xl focus:border-[#009de1] transition-all outline-none" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
          <input className="bg-black border border-gray-800 p-4 rounded-xl focus:border-[#009de1] transition-all outline-none" placeholder="PRECIO (u$s o $)" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
          <select className="bg-black border border-gray-800 p-4 rounded-xl" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
            <option value="Camionetas">Camionetas</option>
            <option value="Motos">Motos</option>
          </select>
          <button type="submit" className="bg-[#009de1] py-4 rounded-xl font-black uppercase italic mt-2 hover:bg-blue-500 transition-all">Publicar ahora</button>
        </form>
        <button onClick={() => navigate("/")} className="w-full mt-6 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">Volver al inicio</button>
      </div>
    </div>
  );
};

export default Admin;