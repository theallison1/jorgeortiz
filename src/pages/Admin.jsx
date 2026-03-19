import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [unidades, setUnidades] = useState([]);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: '' });

  // LEER STOCK PARA PODER BORRAR
  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevo.img) return alert("Falta el link de la foto.");
    try {
      await addDoc(collection(db, "unidades"), { ...nuevo, fechaCreacion: serverTimestamp() });
      alert("✅ ¡Publicado!");
      setNuevo({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: '' });
    } catch (e) { alert("Error al guardar"); }
  };

  const borrarUnidad = async (id) => {
    if (window.confirm("¿Seguro que querés borrar esta unidad?")) {
      await deleteDoc(doc(db, "unidades", id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COLUMNA 1: FORMULARIO DE CARGA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-6 rounded-3xl h-fit shadow-2xl">
          <h2 className="text-xl font-black uppercase text-[#009de1] mb-6 tracking-tighter italic">NUEVA CARGA</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs uppercase font-black">
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="LINK DE FOTO (Clic derecho en WhatsApp -> Copiar dirección)" onChange={e => setNuevo({...nuevo, img: e.target.value})} value={nuevo.img} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} value={nuevo.marca} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MODELO" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} value={nuevo.modelo} required />
            <div className="grid grid-cols-2 gap-2">
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} value={nuevo.anio} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} value={nuevo.precio} required />
            </div>
            <select className="bg-black border border-gray-800 p-4 rounded-xl" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
            </select>
            <button type="submit" className="bg-[#009de1] py-4 rounded-xl font-black mt-2 hover:bg-white hover:text-black transition-all">PUBLICAR</button>
          </form>
        </div>

        {/* COLUMNA 2: GESTIÓN DE STOCK (PARA BORRAR) */}
        <div className="bg-[#0a0a0a] border border-gray-900 p-6 rounded-3xl shadow-2xl overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-black uppercase mb-6 tracking-tighter italic">GESTIONAR STOCK</h2>
          <div className="flex flex-col gap-4">
            {unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-3 rounded-2xl border border-gray-800 group">
                <img src={u.img} className="w-16 h-16 object-cover rounded-lg border border-gray-700" alt="thumb" />
                <div className="flex-1">
                  <p className="text-[10px] font-black leading-none">{u.marca} {u.modelo}</p>
                  <p className="text-[9px] text-gray-500 mt-1">{u.precio}</p>
                </div>
                <button onClick={() => borrarUnidad(u.id)} className="bg-red-900/20 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[8px] font-black uppercase">BORRAR</button>
              </div>
            ))}
          </div>
        </div>

      </div>
      <button onClick={() => navigate("/")} className="block mx-auto mt-10 text-gray-700 text-[9px] font-black uppercase tracking-[0.5em] hover:text-white">VOLVER AL INICIO</button>
    </div>
  );
};

export default Admin;