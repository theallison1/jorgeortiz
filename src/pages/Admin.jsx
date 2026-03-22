import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [unidades, setUnidades] = useState([]);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: '' });

  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevo.img.includes('http')) return alert("El link de la foto no es válido.");
    
    try {
      await addDoc(collection(db, "unidades"), { ...nuevo, fechaCreacion: serverTimestamp() });
      alert("✅ ¡Vehículo publicado!");
      setNuevo({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas', img: '' });
    } catch (e) { alert("Error al guardar"); }
  };

  const borrarUnidad = async (id) => {
    if (window.confirm("¿Borrar esta unidad?")) await deleteDoc(doc(db, "unidades", id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARGA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-6 rounded-3xl h-fit">
          <h2 className="text-xl font-black uppercase text-[#009de1] mb-6 tracking-tighter">Nueva Publicación</h2>
          
          {/* VISTA PREVIA REAL */}
          <div className="bg-black h-40 rounded-xl mb-4 overflow-hidden border border-gray-800 flex items-center justify-center">
            {nuevo.img ? (
              <img src={nuevo.img} className="w-full h-full object-cover" alt="preview" onError={(e) => e.target.style.display='none'}/>
            ) : (
              <span className="text-[9px] text-gray-700 uppercase font-black text-center px-4">Pegá el link abajo para ver la foto aquí</span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10px] font-black uppercase">
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" 
              placeholder="PEGÁ AQUÍ EL ENLACE DIRECTO (.JPG)" 
              value={nuevo.img}
              onChange={e => setNuevo({...nuevo, img: e.target.value})} required />
            
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} value={nuevo.marca} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="MODELO" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} value={nuevo.modelo} required />
            
            <div className="grid grid-cols-2 gap-2">
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} value={nuevo.anio} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} value={nuevo.precio} required />
            </div>

            <button type="submit" className="bg-[#009de1] py-4 rounded-xl font-black mt-2 hover:bg-white hover:text-black transition-all">PUBLICAR AHORA</button>
          </form>
          <a href="https://postimages.org/" target="_blank" className="block text-center mt-4 text-[9px] text-gray-500 underline">Abrir PostImages para subir fotos</a>
        </div>

        {/* LISTADO PARA BORRAR */}
        <div className="bg-[#0a0a0a] border border-gray-900 p-6 rounded-3xl overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-black uppercase mb-6 tracking-tighter">Stock Actual (Borrar)</h2>
          <div className="flex flex-col gap-4">
            {unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-3 rounded-2xl border border-gray-800">
                <img src={u.img} className="w-16 h-16 object-cover rounded-lg" alt="car" />
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase leading-none">{u.marca} {u.modelo}</p>
                  <p className="text-[9px] text-gray-600 mt-1">{u.precio}</p>
                </div>
                <button onClick={() => borrarUnidad(u.id)} className="bg-red-900/20 text-red-500 p-2 rounded-lg text-[8px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Borrar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
