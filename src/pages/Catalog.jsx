import React, { useState, useEffect } from 'react';
import logoJorge from '../assets/image.png';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Catalog = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  
  // ESTADO PARA EL MODAL DE GALERÍA
  const [fotoExpandida, setFotoExpandida] = useState(null); // Para ver una foto en grande
  const [galeriaActiva, setGaleriaActiva] = useState(null); // Para saber qué auto estamos viendo

  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUnidades(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const abrirWhatsApp = (u) => {
    const nro = "542615878806";
    const texto = u === "Consulta General" 
      ? "Hola Jorge, te consulto por una unidad de tu stock." 
      : `Hola Jorge, consulto por la ${u.marca} ${u.modelo} ${u.anio} que vi en la web (${u.precio}).`;
    window.open(`https://wa.me/${nro}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* --- MODAL DE GALERÍA (Se activa al tocar un auto con fotos) --- */}
      {galeriaActiva && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-4 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase italic">{galeriaActiva.marca} {galeriaActiva.modelo}</h2>
            <button onClick={() => setGaleriaActiva(null)} className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase">Cerrar</button>
          </div>
          
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {(galeriaActiva.imagenes || [galeriaActiva.img]).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                className="w-full h-auto rounded-3xl border border-gray-900 shadow-2xl" 
                alt="galeria"
              />
            ))}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
          <button onClick={() => abrirWhatsApp("Consulta General")} className="bg-[#009de1] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* GRILLA DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-6 py-20">
        {loading ? (
          <div className="col-span-full text-center py-40 font-black uppercase italic animate-pulse text-gray-800 tracking-[1em]">Cargando...</div>
        ) : filtrados.map(u => (
          <div key={u.id} className="bg-[#111] rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl group hover:border-[#009de1] transition-all duration-700">
            
            {/* Click en la imagen abre la galería */}
            <div 
              className="h-80 overflow-hidden relative cursor-pointer"
              onClick={() => setGaleriaActiva(u)}
            >
              <img 
                src={u.imgPrincipal || (u.imagenes && u.imagenes[0]) || u.img} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={u.modelo} 
              />
              
              <div className="absolute top-6 left-6 bg-black/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-white/10 italic">
                AÑO {u.anio}
              </div>

              {/* Botón visual de "Ver Galería" */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase">Ver Galería Completa</span>
              </div>

              {u.imagenes && u.imagenes.length > 1 && (
                <div className="absolute bottom-6 right-6 bg-[#009de1] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase italic">
                  +{u.imagenes.length - 1} FOTOS
                </div>
              )}
            </div>

            <div className="p-10">
              <span className="text-[#009de1] text-[10px] font-black uppercase tracking-[0.3em]">{u.marca}</span>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mt-2">{u.modelo}</h3>
              
              <div className="mt-10 flex flex-col gap-6 border-t border-gray-900 pt-8">
                <div className="flex justify-between items-end">
                  <p className="text-gray-500 text-[10px] font-black uppercase italic">Precio</p>
                  <p className="text-4xl font-black italic tracking-tighter leading-none">{u.precio}</p>
                </div>

                <button 
                  onClick={() => abrirWhatsApp(u)} 
                  className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase hover:bg-[#009de1] hover:text-white transition-all shadow-xl"
                >
                  Consultar Ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="py-24 text-center border-t border-gray-900">
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800">Jorge Ortiz Automotores • 2026</p>
      </footer>
    </div>
  );
};

export default Catalog;
