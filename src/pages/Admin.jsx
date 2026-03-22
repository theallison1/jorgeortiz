import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [unidades, setUnidades] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas' });

  // DATOS DE TU CUENTA CLOUDINARY
  const CLOUD_NAME = "davvba78z"; 
  const UPLOAD_PRESET = "jorge_preset"; 

  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return alert("Por favor, seleccioná una foto de la galería.");
    
    setLoading(true);
    try {
      // 1. SUBIR A CLOUDINARY (Directo desde el navegador)
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (!data.secure_url) {
        throw new Error("No se pudo obtener la URL de la imagen");
      }

      // 2. GUARDAR EN FIREBASE CON LA URL REAL
      await addDoc(collection(db, "unidades"), { 
        ...nuevo, 
        img: data.secure_url, 
        fechaCreacion: serverTimestamp() 
      });

      alert("✅ ¡Vehículo publicado con éxito!");
      setArchivo(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Error al subir. Revisá que el Preset 'jorge_preset' esté como UNSIGNED en Cloudinary.");
    }
    setLoading(false);
  };

  const borrarUnidad = async (id) => {
    if (window.confirm("¿Seguro que querés borrar esta unidad?")) {
      await deleteDoc(doc(db, "unidades", id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARGA DIRECTA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-6 rounded-3xl h-fit shadow-2xl">
          <h2 className="text-xl font-black uppercase text-[#009de1] mb-6 italic text-center">PANEL DE CARGA REAL</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10px] font-black uppercase">
            
            <label className="bg-gray-900 border-2 border-dashed border-gray-700 p-10 rounded-2xl cursor-pointer hover:border-[#009de1] text-center transition-all">
              <span className={archivo ? "text-[#009de1]" : "text-gray-500"}>
                {archivo ? `✅ FOTO SELECCIONADA: ${archivo.name}` : "📂 CLIC AQUÍ PARA SUBIR FOTO"}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setArchivo(e.target.files[0])} />
            </label>

            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MARCA (EJ: TOYOTA)" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MODELO (EJ: HILUX SW4)" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} required />
            
            <div className="grid grid-cols-2 gap-3">
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none" placeholder="PRECIO (u$s o $)" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
            </div>

            <select className="bg-black border border-gray-800 p-4 rounded-xl" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
            </select>

            <button type="submit" disabled={loading} className="bg-[#009de1] py-5 rounded-2xl font-black text-xs uppercase mt-2 shadow-lg hover:bg-white hover:text-black transition-all">
              {loading ? "SUBIENDO..." : "PUBLICAR AHORA"}
            </button>
          </form>
        </div>

        {/* LISTADO DE STOCK */}
        <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-gray-900 overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-black uppercase mb-6 italic text-center text-gray-500">STOCK ACTUAL</h2>
          <div className="flex flex-col gap-4">
            {unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-3 rounded-2xl border border-gray-800">
                <img src={u.img} className="w-16 h-16 object-cover rounded-lg" alt="car" />
                <div className="flex-1">
                  <p className="text-[10px] font-black leading-none uppercase">{u.marca} {u.modelo}</p>
                  <p className="text-[8px] text-gray-600 mt-1 uppercase font-bold">{u.precio}</p>
                </div>
                <button onClick={() => borrarUnidad(u.id)} className="bg-red-900/10 text-red-500 px-3 py-2 rounded-lg text-[8px] font-black hover:bg-red-600 hover:text-white transition-all">Borrar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/")} className="block mx-auto mt-10 text-gray-800 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-all">Regresar</button>
    </div>
  );
};

export default Admin;
