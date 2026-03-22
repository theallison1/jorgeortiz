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
  const [archivos, setArchivos] = useState([]); // Array para múltiples fotos
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas' });

  // CONFIGURACIÓN CLOUDINARY (Tus datos)
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
      // Mapeamos los archivos a promesas de subida a Cloudinary
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

      // Ejecutamos todas las subidas en paralelo (Nivel Senior)
      const urlsImagenes = await Promise.all(promesasSubida);

      // Guardamos en Firebase con el array completo
      await addDoc(collection(db, "unidades"), { 
        ...nuevo, 
        imagenes: urlsImagenes, // Array con todas las fotos
        imgPrincipal: urlsImagenes[0], // Foto de portada
        fechaCreacion: serverTimestamp() 
      });

      alert("✅ Vehículo publicado con galería completa.");
      setArchivos([]);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Error en la subida masiva.");
    }
    setLoading(false);
  };

  const borrarUnidad = async (id) => {
    if (window.confirm("¿Eliminar esta unidad del stock?")) {
      await deleteDoc(doc(db, "unidades", id));
    }
  };

  // PANTALLA DE CARGA INICIAL
  if (cargandoAuth) return <div className="min-h-screen bg-black flex items-center justify-center text-[#009de1] font-black uppercase text-[10px] tracking-[0.5em]">Iniciando Sistema...</div>;

  // VISTA LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 italic font-sans">
        <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-[2.5rem] border-2 border-[#009de1] w-full max-w-sm shadow-2xl">
          <h2 className="text-2xl font-black text-[#009de1] mb-8 uppercase text-center italic tracking-tighter">Acceso Jorge Ortiz</h2>
          <div className="flex flex-col gap-4">
            <input type="email" placeholder="EMAIL" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] font-black uppercase" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="PASSWORD" className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] font-black uppercase" onChange={(e) => setPassword(e.target.value)} required />
            <button className="bg-[#009de1] text-white py-5 rounded-2xl font-black text-xs uppercase hover:bg-white hover:text-black transition-all mt-4">Entrar al Panel</button>
          </div>
        </form>
      </div>
    );
  }

  // VISTA PANEL ADMIN
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 border-b border-gray-900 pb-6">
        <h1 className="text-2xl font-black uppercase text-[#009de1]">Gestión de Unidades</h1>
        <button onClick={() => signOut(auth)} className="text-[9px] font-black uppercase text-gray-600 hover:text-red-500 transition-all border border-gray-800 px-4 py-2 rounded-xl">Salir</button>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* FORMULARIO */}
        <div className="bg-[#111] border-2 border-[#009de1] p-8 rounded-[2.5rem] h-fit shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10px] font-black uppercase">
            
            <label className="bg-black border-2 border-dashed border-gray-800 p-12 rounded-3xl cursor-pointer hover:border-[#009de1] text-center transition-all group">
              <span className={archivos.length > 0 ? "text-[#009de1]" : "text-gray-600 group-hover:text-white"}>
                {archivos.length > 0 ? `✅ ${archivos.length} FOTOS SELECCIONADAS` : "📂 SELECCIONAR GALERÍA DE FOTOS"}
              </span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => setArchivos(e.target.files)} />
            </label>

            {/* PREVIEW RÁPIDO (Senior UX) */}
            {archivos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {Array.from(archivos).map((f, i) => (
                  <img key={i} src={URL.createObjectURL(f)} className="w-12 h-12 object-cover rounded-lg border border-gray-700" alt="preview" />
                ))}
              </div>
            )}

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
              {loading ? "PROCESANDO GALERÍA..." : "PUBLICAR EN LA WEB"}
            </button>
          </form>
        </div>

        {/* LISTADO */}
        <div className="bg-[#050505] border border-gray-900 p-8 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[700px]">
          <h2 className="text-sm font-black uppercase mb-8 italic tracking-widest text-gray-500">Stock en Línea</h2>
          <div className="flex flex-col gap-4">
            {unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-gray-800">
                <img src={u.imgPrincipal || u.imagenes[0]} className="w-20 h-20 object-cover rounded-xl border border-gray-900" alt="car" />
                <div className="flex-1">
                  <p className="text-[11px] font-black leading-none uppercase">{u.marca} {u.modelo}</p>
                  <p className="text-[8px] text-gray-600 mt-2 font-bold uppercase">{u.precio} • {u.imagenes?.length || 1} FOTOS</p>
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
