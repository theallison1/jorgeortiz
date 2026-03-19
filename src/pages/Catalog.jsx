import React, { useState, useEffect } from 'react';
import logoJorge from '../assets/image.png';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Catalog = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    // Escuchamos Firebase en tiempo real
    const q = query(collection(db, "unidades"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUnidades(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const abrirWhatsApp = (modelo) => {
    const nro = "542615878806";
    const msg = encodeURIComponent(`Hola Jorge, consulto por: ${modelo}`);
    window.open(`https://wa.me/${nro}?text=${msg}`, '_blank');
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
          <button onClick={() => abrirWhatsApp("Consulta General")} className="bg-[#009de1] text-white px-4 py-2 rounded font-black text-[10px] uppercase tracking-tighter">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h1>
        <div className="flex justify-center gap-2 mt-8">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)} 
              className={`px-8 py-2 text-[10px] font-black uppercase border transition-all ${filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-500 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 p-6 pb-32">
        {loading ? (
          <div className="col-span-3 text-center py-20 font-black uppercase italic animate-pulse text-gray-700">Conectando con la base de datos...</div>
        ) : filtrados.length > 0 ? (
          filtrados.map(u => (
            <div key={u.id} className="bg-[#111] rounded-2xl border border-gray-900 overflow-hidden shadow-2xl group hover:border-[#009de1]/50 transition-all duration-500">
              <div className="h-72 overflow-hidden relative">
                {/* VALIDACIÓN DE IMAGEN */}
                <img 
                  src={u.img || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={u.modelo} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"; }}
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase border border-white/10 italic">
                  {u.anio}
                </div>
              </div>
              <div className="p-8">
                <span className="text-[#009de1] text-[10px] font-black uppercase tracking-[0.2em]">{u.marca}</span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mt-1">{u.modelo}</h3>
                <div className="mt-8 flex justify-between items-center border-t border-gray-800 pt-6">
                  <p className="text-3xl font-black italic tracking-tighter">{u.precio}</p>
                  <button 
                    onClick={() => abrirWhatsApp(u.modelo)} 
                    className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase hover:bg-[#009de1] hover:text-white transition-all shadow-xl"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-gray-500 font-bold uppercase tracking-widest">No hay unidades disponibles en {filtro}</div>
        )}
      </main>

      {/* MAPA Y UBICACIÓN */}
      <section className="bg-black py-24 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase italic mb-8">VENÍ A <span className="text-[#009de1]">VERNOS</span></h2>
            <div className="bg-[#111] p-8 rounded-3xl border-l-8 border-[#009de1] shadow-2xl">
              <p className="text-white font-black text-xl italic uppercase">Jorge Ortiz Automóviles</p>
              <p className="text-gray-400 text-sm font-medium mt-1">Severo del Castillo 4024, Corralitos, Guaymallén, Mendoza</p>
              <div className="flex gap-4 mt-6">
                 <button onClick={() => window.open('https://maps.google.com/?q=Severo+del+Castillo+4024+Mendoza', '_blank')} className="bg-gray-900 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase border border-gray-800 hover:border-[#009de1]">📍 Abrir GPS</button>
              </div>
            </div>
          </div>
          <div className="h-[450px] rounded-[2rem] overflow-hidden border border-gray-800 shadow-[0_0_60px_rgba(0,157,225,0.1)]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2!2d-68.7!3d-32.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09!2sSevero+del+Castillo+4024!5e0!3m2!1ses!2sar!4v1!5m2!1ses!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer className="p-20 text-center">
        <img src={logoJorge} alt="Logo" className="h-12 mx-auto opacity-10 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-800">Jorge Ortiz Automotores • 2026</p>
      </footer>
    </div>
  );
};

export default Catalog;