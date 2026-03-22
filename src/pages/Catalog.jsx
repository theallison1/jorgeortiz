import React, { useState, useEffect } from 'react';
import logoJorge from '../assets/image.png';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Catalog = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  
  // ESTADO PARA EL MODAL DE GALERÍA
  const [galeriaActiva, setGaleriaActiva] = useState(null);

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
      
      {/* --- MODAL DE GALERÍA --- */}
      {galeriaActiva && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-900 bg-black/50">
            <h2 className="text-xl font-black uppercase italic tracking-tighter">
                {galeriaActiva.marca} <span className="text-[#009de1]">{galeriaActiva.modelo}</span>
            </h2>
            <button 
                onClick={() => setGaleriaActiva(null)} 
                className="bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase hover:bg-[#009de1] hover:text-white transition-all shadow-lg"
            >
                Cerrar Galería
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 max-w-5xl mx-auto w-full">
            {(galeriaActiva.imagenes || [galeriaActiva.imgPrincipal || galeriaActiva.img]).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                className="w-full h-auto rounded-[2rem] border border-gray-900 shadow-2xl" 
                alt={`foto-${index}`}
              />
            ))}
            <div className="h-20"></div> {/* Espaciador final */}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
          <button onClick={() => abrirWhatsApp("Consulta General")} className="bg-[#009de1] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-white hover:text-black transition-all">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* HEADER & FILTROS */}
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
          <div className="col-span-full text-center py-40 font-black uppercase italic animate-pulse text-gray-800 tracking-[1em]">Cargando Stock...</div>
        ) : filtrados.length > 0 ? (
          filtrados.map(u => (
            <div key={u.id} className="bg-[#111] rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl group hover:border-[#009de1] transition-all duration-700 flex flex-col">
              
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

                {/* Overlay visual "Ver Galería" */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest">
                        Click para ver galería
                   </div>
                </div>

                {u.imagenes && u.imagenes.length > 1 && (
                  <div className="absolute bottom-6 right-6 bg-[#009de1] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase italic shadow-2xl">
                    +{u.imagenes.length - 1} FOTOS
                  </div>
                )}
              </div>

              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-[#009de1] text-[10px] font-black uppercase tracking-[0.3em]">{u.marca}</span>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mt-2">{u.modelo}</h3>
                </div>
                
                <div className="mt-10 flex flex-col gap-6 border-t border-gray-900 pt-8">
                  <div className="flex justify-between items-end">
                    <p className="text-gray-500 text-[10px] font-black uppercase italic">Precio Contado</p>
                    <p className="text-4xl font-black italic tracking-tighter leading-none">{u.precio}</p>
                  </div>

                  <button 
                    onClick={() => abrirWhatsApp(u)} 
                    className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase hover:bg-[#009de1] hover:text-white transition-all shadow-xl active:scale-95"
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

      {/* SECCIÓN UBICACIÓN (EL MAPA ESTÁ AQUÍ) */}
      <section className="bg-black py-32 px-6 border-y border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl font-black uppercase italic mb-8 leading-none tracking-tighter">NUESTRO <br/><span className="text-[#009de1]">SALÓN</span></h2>
            <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-gray-900 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#009de1]"></div>
              <p className="text-white font-black text-2xl italic uppercase tracking-tighter">Jorge Ortiz Automóviles</p>
              <p className="text-gray-500 text-sm font-bold mt-2 leading-relaxed italic uppercase">Severo del Castillo 4024, Corralitos,<br/> Guaymallén, Mendoza</p>
              <button 
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=-32.8872,-68.7067', '_blank')} 
                className="mt-8 bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase border border-gray-800 hover:border-[#009de1] transition-all"
              >
                📍 Cómo llegar (GPS)
              </button>
            </div>
          </div>
          <div className="h-[500px] rounded-[3rem] overflow-hidden border border-gray-900 shadow-[0_0_80px_rgba(0,157,225,0.05)]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.5229415814236!2d-68.7093229234857!3d-32.88431946894565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e07671d17963d%3A0xc07409249764560a!2sSevero%20del%20Castillo%204024%2C%20M5529%20Guaymall%C3%A9n%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1708500000000!5m2!1ses-419!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 text-center">
        <img src={logoJorge} alt="Logo" className="h-16 mx-auto opacity-10 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800">Concesionaria Jorge Ortiz • Mendoza 2026</p>
      </footer>
    </div>
  );
};

export default Catalog;
