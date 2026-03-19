import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [unidades, setUnidades] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas' });

  // 1. LEER EL STOCK EN TIEMPO REAL (Para ver qué borrar)
  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 2. FUNCION PARA SUBIR FOTO Y GUARDAR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return alert("Por favor, seleccioná una foto de la galería.");
    
    setLoading(true);
    try {
      // Subir a Firebase Storage
      const storageRef = ref(storage, `autos/${Date.now()}-${archivo.name}`);
      await uploadBytes(storageRef, archivo);
      const urlImagen = await getDownloadURL(storageRef);

      // Guardar en Firestore Database
      await addDoc(collection(db, "unidades"), { 
        ...nuevo, 
        img: urlImagen, 
        fechaCreacion: serverTimestamp() 
      });

      alert("✅ ¡Unidad publicada con éxito!");
      setArchivo(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Error. Asegurate de haber activado 'STORAGE' en la consola de Firebase.");
    }
    setLoading(false);
  };

  // 3. FUNCION PARA BORRAR
  const borrarUnidad = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta unidad del stock?")) {
      try {
        await deleteDoc(doc(db, "unidades", id));
        alert("Unidad eliminada.");
      } catch (error) {
        alert("Error al borrar.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL DE CARGA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-8 rounded-[2.5rem] h-fit shadow-[0_0_50px_rgba(0,157,225,0.1)]">
          <h2 className="text-2xl font-black uppercase text-[#009de1] mb-8 italic tracking-tighter text-center">Cargar Nuevo Vehículo</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest">
            
            {/* INPUT DE ARCHIVO DISFRAZADO DE BOTÓN */}
            <label className="group bg-black border-2 border-dashed border-gray-800 p-10 rounded-2xl cursor-pointer hover:border-[#009de1] transition-all text-center">
              <span className={archivo ? "text-[#009de1]" : "text-gray-600 group-hover:text-white"}>
                {archivo ? `✅ LISTO: ${archivo.name}` : "📂 CLIC PARA SUBIR FOTO"}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setArchivo(e.target.files[0])} />
            </label>

            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1] transition-all" placeholder="MARCA (EJ: TOYOTA)" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1] transition-all" placeholder="MODELO (EJ: HILUX SRX)" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} required />
            
            <div className="grid grid-cols-2 gap-4">
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
            </div>

            <select className="bg-black border border-gray-800 p-4 rounded-xl font-black" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
            </select>

            <button type="submit" disabled={loading} className="bg-[#009de1] py-5 rounded-2xl font-black text-sm uppercase mt-4 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/20">
              {loading ? "SUBIENDO A LA NUBE..." : "PUBLICAR UNIDAD"}
            </button>
          </form>
        </div>

        {/* LISTADO DE STOCK PARA BORRAR */}
        <div className="bg-[#050505] border border-gray-900 p-8 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[700px]">
          <h2 className="text-xl font-black uppercase mb-8 italic tracking-tighter">Gestionar Stock Actual</h2>
          <div className="flex flex-col gap-4">
            {unidades.length > 0 ? unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-gray-800 group hover:border-red-900/50 transition-all">
                <img src={u.img} className="w-20 h-20 object-cover rounded-xl border border-gray-800" alt="thumb" />
                <div className="flex-1">
                  <p className="text-[11px] font-black leading-none uppercase">{u.marca} {u.modelo}</p>
                  <p className="text-[9px] text-gray-600 mt-2 font-bold italic">{u.precio} • {u.anio}</p>
                </div>
                <button 
                  onClick={() => borrarUnidad(u.id)} 
                  className="bg-red-900/10 text-red-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-all border border-red-900/20"
                >
                  Borrar
                </button>
              </div>
            )) : (
              <p className="text-center py-20 text-gray-700 font-black uppercase text-[10px] tracking-widest">No hay vehículos cargados</p>
            )}
          </div>
        </div>

      </div>
      
      <button onClick={() => navigate("/")} className="block mx-auto mt-12 text-gray-800 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-all">
        Ssalir del panel de control
      </button>
    </div>
  );
};

export default Admin;