import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // ESTADOS DE AUTENTICACIÓN
  const [user, setUser] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ESTADOS DE GESTIÓN DE STOCK
  const [unidades, setUnidades] = useState([]);
  const [archivos, setArchivos] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas' });

  // CONFIGURACIÓN CLOUDINARY
  const CLOUD_NAME = "davvba78z"; 
  const UPLOAD_PRESET = "jorge_preset"; 

  // 1. MONITOR DE SESIÓN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCargandoAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Credenciales incorrectas.");
    }
  };

  // 3. ESCUCHA DE DATOS (REAL-TIME)
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [user]);

  // 4. LÓGICA DE SUBIDA MÚLTIPLE (PROMISE.ALL)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (archivos.length === 0) return alert("Seleccioná al menos una foto.");
    
    setLoading(true);
    try {
      const promesasSubida = Array.from(archivos).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        return data.secure_url;
      });

      const urlsImagenes = await Promise.all(promesasSubida);

      await addDoc(collection(db, "unidades"), { 
        ...nuevo, 
        imagenes: urlsImagenes,
        imgPrincipal: urlsImagenes[0], 
        fechaCreacion: serverTimestamp() 
      });

      alert("✅ ¡Vehículo publicado!");
      setArchivos([]);
      e.target.reset();
    } catch (err) {
      alert("Error en la subida masiva.");
    }
    setLoading(false);
  };

  const borrarUnidad = async (id) => {
    if (window.confirm("¿Eliminar esta unidad?")) {
      await deleteDoc(doc(db, "unidades", id));
    }
  };

  if (cargandoAuth) return <div className="min-h-screen bg-black flex items-center justify-center text-[#009de1] font-black uppercase text-[10px] tracking-[0.5em]">Iniciando...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 italic font-sans text-white">
        <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-[2.5rem] border-2 border-[#009de1] w-full max-w-sm">
          <h2 className="text-2xl font-black text-[#009de1] mb-8 uppercase text-center italic tracking-tighter">Panel Admin</h2>
          <div className="flex flex-col gap-4">
            <input type="email" placeholder="EMAIL" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] font-black uppercase" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="PASSWORD" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] font-black uppercase" onChange={(e) => setPassword(e.target.value)} required />
            <button className="bg-[#009de1] text-white py-5 rounded-2xl font-black text-xs uppercase mt-4 shadow-lg hover:bg-white hover:text-black transition-all">Entrar</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 border-b border-gray-900 pb-6">
        <h1 className="text-2xl font-black uppercase text-[#009de1]">Administración</h1>
        <button onClick={() => signOut(auth)} className="text-[9px] font-black uppercase text-gray-600 hover:text-red-500 transition-all border border-gray-800 px-4 py-2 rounded-xl">Cerrar Sesión</button>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* FORMULARIO CARGA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-8 rounded-[2.5rem] h-fit">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10px] font-black uppercase">
            <label className="bg-black border-2 border-dashed border-gray-800 p-12 rounded-3xl cursor-pointer hover:border-[#009de1] text-center">
              <span className={archivos.length > 0 ? "text-[#009de1]" : "text-gray-600"}>
                {archivos.length > 0 ? `✅ ${archivos.length} FOTOS LISTAS` : "📂 SELECCIONAR GALERÍA"}
              </span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => setArchivos(e.target.files)} />
            </label>

            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MODELO" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} required />
            
            <div className="grid grid-cols-2 gap-3">
              <input className="bg-black border border-gray-800 p-4 rounded-xl" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
            </div>

            <select className="bg-black border border-gray-800 p-4 rounded-xl font-black uppercase tracking-widest" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
            </select>

            <button type="submit" disabled={loading} className="bg-[#009de1] py-5 rounded-2xl font-black text-[11px] uppercase mt-4 hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
              {loading ? "SUBIENDO..." : "PUBLICAR UNIDAD"}
            </button>
          </form>
        </div>

        {/* LISTADO CON DEFENSA CONTRA UNDEFINED */}
        <div className="bg-[#050505] border border-gray-900 p-8 rounded-[2.5rem] overflow-y-auto max-h-[700px]">
          <h2 className="text-sm font-black uppercase mb-8 italic text-gray-500">Stock Actual</h2>
          <div className="flex flex-col gap-4">
            {unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-gray-800">
                {/* 🛡️ Lógica Defensiva aquí abajo: */}
                <img 
                  src={u.imgPrincipal || (u.imagenes && u.imagenes[0]) || u.img} 
                  className="w-20 h-20 object-cover rounded-xl border border-gray-900 shadow-md" 
                  alt="car" 
                />
                <div className="flex-1">
                  <p className="text-[11px] font-black leading-none uppercase">{u.marca} {u.modelo}</p>
                  <p className="text-[8px] text-gray-600 mt-2 font-bold uppercase">
                    {u.precio} • {u.imagenes ? `${u.imagenes.length} FOTOS` : "1 FOTO"}
                  </p>
                </div>
                <button onClick={() => borrarUnidad(u.id)} className="bg-red-900/10 text-red-500 px-4 py-2 rounded-xl text-[9px] font-black hover:bg-red-600 hover:text-white transition-all">Borrar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
