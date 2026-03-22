import React, { useState, useEffect } from 'react';
import logoJorge from '../assets/image.png';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Catalog = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUnidades(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // MEJORA: WhatsApp con más contexto para Jorge
  const abrirWhatsApp = (u) => {
    const nro = "542615878806";
    const texto = u === "Consulta General" 
      ? "Hola Jorge, te consulto por una unidad de tu stock." 
      : `Hola Jorge, consulto por la ${u.marca} ${u.modelo} ${u.anio} que vi en la web (${u.precio}).`;
    
    const msg = encodeURIComponent(texto);
    window.open(`https://wa.me/${nro}?text=${msg}`, '_blank');
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
          <button onClick={() => abrirWhatsApp("Consulta General")} className="bg-[#009de1] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(0,157,225,0.3)]">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="py-24 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)} 
              className={`px-10 py-3 text-[10px] font-black uppercase border-2 transition-all rounded-full ${filtro === cat ? 'bg-[#009de1] border-[#009de1] text-white' : 'border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-6 pb-32">
        {loading ? (
          <div className="col-span-full text-center py-40 font-black uppercase italic animate-pulse text-gray-800 tracking-[1em]">Sincronizando Stock...</div>
        ) : filtrados.length > 0 ? (
          filtrados.map(u => (
            <div key={u.id} className="bg-[#111] rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl group hover:border-[#009de1] transition-all duration-700">
              
              <div className="h-80 overflow-hidden relative">
                {/* 🛡️ LÓGICA DE IMAGEN MULTI-COMPATIBLE */}
                <img 
                  src={u.imgPrincipal || (u.imagenes && u.imagenes[0]) || u.img || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={u.modelo} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"; }}
                />
                
                {/* BADGE DE AÑO */}
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-white/10 italic">
                  AÑO {u.anio}
                </div>

                {/* INDICADOR DE GALERÍA (Si tiene varias fotos) */}
                {u.imagenes && u.imagenes.length > 1 && (
                  <div className="absolute bottom-6 right-6 bg-[#009de1] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase italic shadow-2xl">
                    +{u.imagenes.length - 1} fotos
                  </div>
                )}
              </div>

              <div className="p-10">
                <span className="text-[#009de1] text-[10px] font-black uppercase tracking-[0.3em]">{u.marca}</span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mt-2">{u.modelo}</h3>
                
                <div className="mt-10 flex flex-col gap-6 border-t border-gray-900 pt-8">
                  <div className="flex justify-between items-end">
                    <p className="text-gray-500 text-[10px] font-black uppercase italic tracking-widest">Precio Contado</p>
                    <p className="text-4xl font-black italic tracking-tighter leading-none">{u.precio}</p>
                  </div>

                  <button 
                    onClick={() => abrirWhatsApp(u)} 
                    className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase hover:bg-[#009de1] hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    Consultar Ahora
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-40 text-gray-800 font-black uppercase tracking-[0.5em] italic">No se encontraron unidades</div>
        )}
      </main>

      {/* SECCIÓN UBICACIÓN */}
      <section className="bg-black py-32 px-6 border-y border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl font-black uppercase italic mb-8 leading-none">NUESTRO <br/><span className="text-[#009de1]">SALÓN</span></h2>
            <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-gray-900 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#009de1]"></div>
              <p className="text-white font-black text-2xl italic uppercase tracking-tighter">Jorge Ortiz Automóviles</p>
              <p className="text-gray-500 text-sm font-bold mt-2 leading-relaxed">Severo del Castillo 4024, Corralitos,<br/> Guaymallén, Mendoza</p>
              <button 
                onClick={() => window.open('https://www.google.com/maps/dir//Severo+del+Castillo+4024,+Guaymallen,+Mendoza', '_blank')} 
                className="mt-8 bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase border border-gray-800 hover:border-[#009de1] transition-all"
              >
                📍 Cómo llegar (GPS)
              </button>
            </div>
          </div>
          <div className="h-[500px] rounded-[3rem] overflow-hidden border border-gray-900 shadow-[0_0_80px_rgba(0,157,225,0.05)]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.563!2d-68.733!3d-32.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU0JzQzLjIiUyA2OMKwNDMnNTguOCJX!5e0!3m2!1ses!2sar!4v1647890000000!5m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer className="py-24 text-center">
        <img src={logoJorge} alt="Logo" className="h-16 mx-auto opacity-10 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800">Seleccionados con Historia • 2026</p>
      </footer>
    </div>
  );
};

export default Catalog;
