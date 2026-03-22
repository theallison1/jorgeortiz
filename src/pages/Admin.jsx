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

  // ESTADOS DE CARGA DE AUTOS
  const [unidades, setUnidades] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', anio: '', precio: '', categoria: 'Camionetas' });

  // CONFIGURACIÓN CLOUDINARY
  const CLOUD_NAME = "davvba78z"; 
  const UPLOAD_PRESET = "jorge_preset"; 

  // 1. ESCUCHAR ESTADO DE SESIÓN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCargandoAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. FUNCIÓN DE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Acceso denegado. Revisa tus credenciales.");
    }
  };

  // 3. LEER STOCK (Solo si está logueado)
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUnidades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [user]);

  // 4. SUBIR A CLOUDINARY Y GUARDAR EN FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return alert("Por favor, seleccioná una foto.");
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (!data.secure_url) throw new Error("Fallo en la subida");

      await addDoc(collection(db, "unidades"), { 
        ...nuevo, 
        img: data.secure_url, 
        fechaCreacion: serverTimestamp() 
      });

      alert("✅ ¡Publicado con éxito!");
      setArchivo(null);
      e.target.reset();
    } catch (err) {
      alert("Error al subir la imagen. Verificá que el preset sea UNSIGNED.");
    }
    setLoading(false);
  };

  // 5. BORRAR UNIDAD
  const borrarUnidad = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar esta unidad?")) {
      await deleteDoc(doc(db, "unidades", id));
    }
  };

  // --- RENDERIZADO CONDICIONAL ---

  if (cargandoAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-[#009de1] font-black uppercase tracking-widest text-[10px]">Verificando Credenciales...</div>;
  }

  // SI NO HAY USUARIO -> MOSTRAR LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 italic font-sans">
        <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-[2.5rem] border-2 border-[#009de1] w-full max-w-sm shadow-[0_0_60px_rgba(0,157,225,0.15)]">
          <h2 className="text-2xl font-black text-[#009de1] mb-8 uppercase text-center tracking-tighter italic">Panel Admin</h2>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="USUARIO / EMAIL" 
              className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] uppercase font-black tracking-widest" 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="CONTRASEÑA" 
              className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-[#009de1] text-[10px] uppercase font-black tracking-widest" 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button className="bg-[#009de1] text-white py-5 rounded-2xl font-black text-xs uppercase hover:bg-white hover:text-black transition-all mt-4 shadow-lg active:scale-95">
              Ingresar al Sistema
            </button>
          </div>
        </form>
      </div>
    );
  }

  // SI HAY USUARIO -> MOSTRAR PANEL DE GESTIÓN
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans italic">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10 border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase text-[#009de1] leading-none tracking-tighter">Jorge Ortiz</h1>
          <p className="text-[9px] text-gray-500 font-bold uppercase mt-1 tracking-[0.3em]">Gestión de Stock</p>
        </div>
        <button 
          onClick={() => signOut(auth)} 
          className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-[8px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
        >
          Cerrar Sesión
        </button>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* COLUMNA CARGA */}
        <div className="bg-[#111] border-2 border-[#009de1] p-8 rounded-[2.5rem] h-fit">
          <h2 className="text-sm font-black uppercase mb-8 italic tracking-widest text-center text-gray-400 underline decoration-[#009de1] underline-offset-8">Nueva Unidad</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10px] font-black uppercase">
            <label className="bg-black border-2 border-dashed border-gray-800 p-12 rounded-2xl cursor-pointer hover:border-[#009de1] text-center transition-all group">
              <span className={archivo ? "text-[#009de1]" : "text-gray-600 group-hover:text-white"}>
                {archivo ? `✅ LISTO: ${archivo.name}` : "📂 CLIC PARA ELEGIR FOTO"}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setArchivo(e.target.files[0])} />
            </label>

            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MARCA" onChange={e => setNuevo({...nuevo, marca: e.target.value.toUpperCase()})} required />
            <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="MODELO" onChange={e => setNuevo({...nuevo, modelo: e.target.value.toUpperCase()})} required />
            
            <div className="grid grid-cols-2 gap-3">
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="AÑO" onChange={e => setNuevo({...nuevo, anio: e.target.value})} required />
              <input className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#009de1]" placeholder="PRECIO" onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
            </div>

            <select className="bg-black border border-gray-800 p-4 rounded-xl font-black uppercase tracking-widest cursor-pointer" onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
            </select>

            <button type="submit" disabled={loading} className="bg-[#009de1] py-5 rounded-2xl font-black text-[11px] uppercase mt-4 hover:scale-[1.02] transition-all shadow-xl active:scale-95 disabled:opacity-50">
              {loading ? "SUBIENDO A LA NUBE..." : "PUBLICAR UNIDAD"}
            </button>
          </form>
        </div>

        {/* COLUMNA STOCK */}
        <div className="bg-[#050505] border border-gray-900 p-8 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[700px]">
          <h2 className="text-sm font-black uppercase mb-8 italic tracking-widest text-gray-500">Stock Actual</h2>
          <div className="flex flex-col gap-4">
            {unidades.length > 0 ? unidades.map(u => (
              <div key={u.id} className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-gray-800 group hover:border-red-900/40 transition-all">
                <img src={u.img} className="w-20 h-20 object-cover rounded-xl border border-gray-900 shadow-md" alt="thumb" />
                <div className="flex-1">
                  <p className="text-[11px] font-black leading-none uppercase">{u.marca} {u.modelo}</p>
                  <p className="text-[9px] text-gray-600 mt-2 font-bold italic">{u.precio} • {u.anio}</p>
                </div>
                <button 
                  onClick={() => borrarUnidad(u.id)} 
                  className="bg-red-900/10 text-red-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                >
                  Borrar
                </button>
              </div>
            )) : (
              <p className="text-center py-20 text-gray-800 font-black uppercase text-[10px] tracking-widest italic">No hay vehículos publicados</p>
            )}
          </div>
        </div>

      </div>
      
      <button onClick={() => navigate("/")} className="block mx-auto mt-12 text-gray-800 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-all">
        Ver sitio público
      </button>
    </div>
  );
};

export default Admin;
