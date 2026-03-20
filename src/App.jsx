import React, { useState } from 'react';
import logoJorge from './assets/image.png';
import AdminPanel from './components/AdminPanel';

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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [filtro, setFiltro] = useState('Todos');

  const checkAccess = () => {
    if (isAuthorized) {
      setShowAdmin(!showAdmin);
    } else {
      const pin = prompt("Ingrese el PIN de seguridad:");
      if (pin === "2026") {
        setIsAuthorized(true);
        setShowAdmin(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        alert("Acceso denegado.");
      }
    }
  };

  const manejarNuevaUnidad = (nuevaUnidad) => {
    const unidadConId = { ...nuevaUnidad, id: Date.now() };
    setUnidades([unidadConId, ...unidades]);
  };

  const abrirWhatsApp = (modelo = "Consulta General") => {
    const nroJorge = "542615878806"; 
    const mensaje = encodeURIComponent(`Hola Jorge, vi la unidad ${modelo} en tu web.`);
    window.open(`https://wa.me/${nroJorge}?text=${mensaje}`, '_blank');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img 
            src={logoJorge} 
            alt="Logo" 
            className="h-10 md:h-14 cursor-pointer" 
            onClick={checkAccess} 
          />
          <div className="flex items-center gap-4">
            <button onClick={() => abrirWhatsApp("Tasación")} className="bg-[#009de1] text-white px-4 py-2 rounded font-black text-[10px] uppercase">
              Vender mi unidad
            </button>
            {isAuthorized && (
              <button onClick={() => setShowAdmin(!showAdmin)} className={`w-3 h-3 rounded-full ${showAdmin ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></button>
            )}
          </div>
        </div>
      </nav>

      {showAdmin && isAuthorized && <AdminPanel onAgregar={manejarNuevaUnidad} />}

      <header className="py-20 text-center bg-gradient-to-b from-black to-[#0a0a0a]">
        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h2>
        <div className="flex justify-center gap-2 mt-8">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)}
              className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase border ${filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main id="stock" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="bg-[#111] rounded-xl overflow-hidden border border-gray-900 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={u.img} className="w-full h-full object-cover opacity-90" alt={u.modelo} />
              <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-black border border-gray-800">{u.anio}</div>
            </div>
            <div className="p-8">
              <span className="text-[#009de1] text-[10px] font-black tracking-widest uppercase">{u.marca}</span>
              <h3 className="text-2xl font-black mt-1 uppercase italic tracking-tighter">{u.modelo}</h3>
              <div className="mt-6 flex justify-between items-center border-t border-gray-800 pt-6">
                <p className="text-3xl font-black text-white italic">{u.precio}</p>
                <button onClick={() => abrirWhatsApp(u.modelo)} className="bg-white text-black px-4 py-2 rounded font-black text-[10px] uppercase">Consultar</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* UBICACIÓN - MAPA CORREGIDO */}
      <section id="ubicacion" className="bg-[#050505] py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic mb-6">Nuestra <span className="text-[#009de1]">Ubicación</span></h2>
            <div className="bg-[#111] p-6 rounded-lg border-l-8 border-[#009de1]">
              <p className="text-white font-bold text-lg">Jorge Ortiz Automóviles</p>
              <p className="text-gray-400 text-sm">Severo del Castillo 4024, Corralitos, Mendoza</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=-32.9059128,-68.7004733" target="_blank" rel="noreferrer" className="inline-block mt-4 text-[#009de1] text-[10px] font-black uppercase tracking-widest">📍 Iniciar GPS</a>
            </div>
          </div>
          <div className="h-[450px] rounded-2xl overflow-hidden border-2 border-gray-800 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.56708761214!2d-68.7030482243315!3d-32.90590837361118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e121b1ac6c625%3A0xf87c134ae4425d5d!2sJorge%20Ortiz%20Autom%C3%B3viles!5e0!3m2!1ses-419!2sar!4v1708630000000!5m2!1ses-419!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer className="p-16 text-center opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Jorge Ortiz Automotores • 2026</p>
      </footer>
    </div>
  );
}

export default App;
