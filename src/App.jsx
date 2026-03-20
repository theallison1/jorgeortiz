import React, { useState } from 'react';
import logoJorge from './assets/image.png';
import AdminPanel from './components/AdminPanel'; // Asegúrate de tener este archivo en src/components/

const initialUnidades = [
  { 
    id: 1, 
    marca: "TOYOTA", 
    modelo: "Hilux 2.8 SRX 4x4", 
    anio: 2023, 
    precio: "u$s 44.500", 
    categoria: "Camionetas",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKquU_TOGhefoqctLLwIN6HYlzaNLUtqdFg&s"
  },
  { 
    id: 2, 
    marca: "HONDA", 
    modelo: "CB300F Twister", 
    anio: 2024, 
    precio: "$ 6.200.000", 
    categoria: "Motos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0dAVJfcEfJtZAFdCWkrqC3qGAUAzhbWhQw&s"
  },
  { 
    id: 3, 
    marca: "VOLKSWAGEN", 
    modelo: "Amarok V6 Extreme", 
    anio: 2022, 
    precio: "u$s 39.000", 
    categoria: "Camionetas",
    img: "https://http2.mlstatic.com/D_NQ_NP_906950-MLA74116853270_012024-O.webp"
  },
  { 
    id: 4, 
    marca: "FORD", 
    modelo: "Ranger Limited V6", 
    anio: 2024, 
    precio: "u$s 48.200", 
    categoria: "Camionetas",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
  }
];

function App() {
  const [unidades, setUnidades] = useState(initialUnidades);
  const [showAdmin, setShowAdmin] = useState(false);
  const [filtro, setFiltro] = useState('Todos');

  // Función para agregar unidades desde el Panel de Admin
  const manejarNuevaUnidad = (nuevaUnidad) => {
    const unidadConId = { ...nuevaUnidad, id: Date.now() };
    setUnidades([unidadConId, ...unidades]); // Se agrega al principio de la lista
  };

  const abrirWhatsApp = (modelo = "Consulta General") => {
    const nroJorge = "542615878806"; 
    const mensaje = encodeURIComponent(`Hola Jorge, vi la unidad ${modelo} en tu web y me interesa recibir más info.`);
    window.open(`https://wa.me/${nroJorge}?text=${mensaje}`, '_blank');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo Jorge Ortiz" className="h-10 md:h-14 object-contain" />
          
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button onClick={() => scrollToSection('stock')} className="hover:text-[#009de1] transition-colors">Stock Actual</button>
            <button onClick={() => scrollToSection('ubicacion')} className="hover:text-[#009de1] transition-colors">Ubicación</button>
            <button 
              onClick={() => setShowAdmin(!showAdmin)}
              className={`transition-colors font-black ${showAdmin ? 'text-[#009de1]' : 'text-gray-700 hover:text-gray-400'}`}
            >
              {showAdmin ? "CERRAR GESTIÓN" : "ACCESO SISTEMA"}
            </button>
          </div>

          <button onClick={() => abrirWhatsApp("Tasación de usado")} className="bg-[#009de1] text-white px-5 py-2 rounded font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* PANEL DE ADMINISTRACIÓN (MODULARIZADO) */}
      {showAdmin && <AdminPanel onAgregar={manejarNuevaUnidad} />}

      {/* HEADER */}
      <header className="py-20 px-6 text-center bg-gradient-to-b from-black to-[#0a0a0a]">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h2>
        <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold mb-10">
          Unidades Seleccionadas • Calidad & Confianza • Mendoza
        </p>
        
        <div className="flex justify-center gap-2">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)}
              className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border ${
                filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE STOCK */}
      <main id="stock" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="group bg-[#111] rounded-xl overflow-hidden border border-gray-900 hover:border-[#009de1]/50 transition-all duration-500 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={u.img} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                alt={u.modelo}
                onError={(e) => {e.target.src = "https://via.placeholder.com/800x600?text=Imagen+No+Disponible"}} 
              />
              <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded text-[10px] font-black border border-gray-800">
                {u.anio}
              </div>
            </div>
            
            <div className="p-8">
              <span className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">{u.marca}</span>
              <h3 className="text-2xl font-black mt-1 uppercase italic tracking-tighter">{u.modelo}</h3>
              
              <div className="mt-6 flex justify-between items-end border-b border-gray-800 pb-6 mb-6">
                <div>
                  <p className="text-gray-600 text-[9px] font-bold uppercase">Precio Contado</p>
                  <p className="text-3xl font-black text-white italic">{u.precio}</p>
                </div>
                <div className="text-right text-[9px] text-gray-600 font-bold uppercase italic leading-none">
                  Entrega<br/>Inmediata
                </div>
              </div>

              <button 
                onClick={() => abrirWhatsApp(u.modelo)}
                className="w-full py-4 bg-white text-black font-black text-[11px] uppercase rounded hover:bg-[#009de1] hover:text-white transition-all shadow-xl"
              >
                Consultar Ahora
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* UBICACIÓN */}
      <section id="ubicacion" className="bg-[#050505] py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic mb-6">Nuestra <span className="text-[#009de1]">Ubicación</span></h2>
            <div className="space-y-4">
              <div className="bg-[#111] p-6 rounded-lg border border-[#009de1]/40 border-l-8 border-l-[#009de1]">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">Sucursal Principal</p>
                  <div className="bg-[#009de1] text-white text-[9px] font-black px-2 py-0.5 rounded italic">★ 4.5 (166)</div>
                </div>
                <p className="text-xl font-black text-white italic uppercase tracking-tighter mb-1">Jorge Ortiz Automóviles</p>
                <p className="text-gray-400 text-sm font-bold">Severo del Castillo 4024, M5527 Corralitos, Mendoza</p>
                <a 
                  href="https://maps.app.goo.gl/JeXGDhsSfpYREF1C5" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center mt-6 bg-white text-black px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-[#009de1] hover:text-white transition-all shadow-lg"
                >
                  📍 Iniciar navegación GPS
                </a>
              </div>
            </div>
          </div>
          
          <div className="h-[450px] rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl transition-all duration-700 hover:border-[#009de1]/50 group relative">
            <iframe 
              title="Ubicación Jorge Ortiz Automóviles"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.1128790098523!2d-68.703048224329!3d-32.90576397361131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e121b06c6c625%3A0x7bfc134ae4e45d1d!2sJorge%20Ortiz%20Autom%C3%B3viles!5e0!3m2!1ses-419!2sar!4v1709941234567!5m2!1ses-419!2sar"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-black p-16 text-center">
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">
          JORGE ORTIZ AUTOMOTORES • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
