import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [nuevo, setNuevo] = useState({
    marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de seguridad
    if (!nuevo.img) {
      return alert("¡Falta la foto! Pegá el link de ImgBB primero.");
    }

    try {
      await addDoc(collection(db, "unidades"), {
        ...nuevo,
        fechaCreacion: serverTimestamp()
      });
      alert("✅ ¡Unidad publicada con éxito!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error al conectar con la base de datos.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center font-sans italic">
      <div className="w-full max-w-md bg-[#111] border-2 border-[#009de1] p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-black uppercase text-[#009de1] mb-6 text-center tracking-tighter italic">
          PANEL DE CARGA <span className="text-white">JORGE ORTIZ</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* VISTA PREVIA DE LA FOTO REAL */}
          <div className="bg-black rounded-2xl overflow-hidden border border-gray-800 h-48 flex items-center justify-center relative">
            {nuevo.img ? (
              <img src={nuevo.img} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center px-6">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">La foto aparecerá aquí</p>
              </div>
            )}
          </div>

          {/* CAMPO PARA EL LINK */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-[#009de1] font-black uppercase ml-2">1. Pegá el enlace directo (.jpg)</label>
            <input 
              className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1] text-xs transition-all" 
              placeholder="https://i.ibb.co/..."
              onChange={e => setNuevo({...nuevo, img: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1] text-sm" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1] text-sm" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
          </div>

          <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MODELO (EJ: HILUX SRX)" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} required />
          <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="PRECIO (u$s o $)" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
          
          <select className="bg-black border border-gray-800 p-4 rounded-xl font-black uppercase text-xs" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
            <option value="Camionetas">Camionetas</option>
            <option value="Motos">Motos</option>
          </select>

          <button type="submit" className="bg-[#009de1] py-5 rounded-2xl font-black uppercase mt-4 hover:bg-white hover:text-black transition-all shadow-[0_10px_20px_rgba(0,157,225,0.3)]">
            PUBLICAR AHORA
          </button>
        </form>
        
        <button onClick={() => navigate("/")} className="w-full mt-8 text-gray-700 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Admin;