import React, { useState, useEffect } from 'react';
import logoJorge from './assets/image.png';
import AdminPanel from './components/AdminPanel';

const initialUnidades = [
  { id: 1, marca: "TOYOTA", modelo: "Hilux 2.8 SRX 4x4", anio: 2023, precio: "u$s 44.500", categoria: "Camionetas", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKquU_TOGhefoqctLLwIN6HYlzaNLUtqdFg&s" },
  { id: 2, marca: "HONDA", modelo: "CB300F Twister", anio: 2024, precio: "$ 6.200.000", categoria: "Motos", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0dAVJfcEfJtZAFdCWkrqC3qGAUAzhbWhQw&s" },
  { id: 3, marca: "VOLKSWAGEN", modelo: "Amarok V6 Extreme", anio: 2022, precio: "u$s 39.000", categoria: "Camionetas", img: "https://http2.mlstatic.com/D_NQ_NP_906950-MLA74116853270_012024-O.webp" },
  { id: 4, marca: "FORD", modelo: "Ranger Limited V6", anio: 2024, precio: "u$s 48.200", categoria: "Camionetas", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" }
];

function App() {
  const [unidades, setUnidades] = useState(initialUnidades);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado de seguridad
  const [filtro, setFiltro] = useState('Todos');

  // Función de Seguridad: Pide un PIN para mostrar el panel
  const checkAccess = () => {
    if (isAuthorized) {
      setShowAdmin(!showAdmin);
    } else {
      const pin = prompt("Ingrese el PIN de seguridad para acceder al sistema:");
      if (pin === "2026") { // <--- CAMBIA TU PIN AQUÍ
        setIsAuthorized(true);
        setShowAdmin(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        alert("PIN Incorrecto. Acceso denegado.");
      }
    }
  };

  const manejarNuevaUnidad = (nuevaUnidad) => {
    const unidadConId = { ...nuevaUnidad, id: Date.now() };
    setUnidades([unidadConId, ...unidades]);
  };

  const abrirWhatsApp = (modelo = "Consulta General") => {
    const nroJorge = "542615878806"; 
    const mensaje = encodeURIComponent(`Hola Jorge, vi la unidad ${modelo} en tu web y me interesa recibir más info.`);
    window.open(`https://wa.me/${nroJorge}?text=${mensaje}`, '_blank');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* NAVBAR OPTIMIZADO */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo con "Truco": Si lo tocas, activa la seguridad */}
          <img 
            src={logoJorge} 
            alt="Logo" 
            className="h-10 md:h-14 object-contain cursor-pointer" 
            onClick={checkAccess} 
          />
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('stock')} 
              className="text-[9px] font-black text-gray-500 uppercase md:block hidden"
            >
              Stock
            </button>
            
            {/* Botón de Vender siempre visible */}
            <button 
              onClick={() => abrirWhatsApp("Tasación de usado")} 
              className="bg-[#009de1] text-white px-4 py-2 rounded font-black text-[10px] uppercase tracking-tighter hover:bg-blue-500 transition-all"
            >
              Vender mi unidad
            </button>

            {/* Indicador de Admin: Solo aparece si ya te logueaste una vez */}
            {isAuthorized && (
              <button 
                onClick={() => setShowAdmin(!showAdmin)}
                className={`p-2 rounded-full ${showAdmin ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}
                title="Panel de Control"
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* PANEL DE ADMINISTRACIÓN (Protegido) */}
      {showAdmin && isAuthorized && <AdminPanel onAgregar={manejarNuevaUnidad} />}

      {/* HEADER */}
      <header className="py-16 px-6 text-center bg-gradient-to-b from-black to-[#0a0a0a]">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h2>
        <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold mb-10">
          Unidades Seleccionadas • Mendoza
        </p>
        
        <div className="flex justify-center gap-2">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)}
              className={`px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border ${
                filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE STOCK */}
      <main id="stock" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="group bg-[#111] rounded-xl overflow-hidden border border-gray-900 shadow-2xl transition-all">
            <div className="relative h-60 overflow-hidden">
              <img src={u.img} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt={u.modelo} />
              <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-black border border-gray-800">{u.anio}</div>
            </div>
            <div className="p-6">
              <span className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">{u.marca}</span>
              <h3 className="text-xl font-black mt-1 uppercase italic">{u.modelo}</h3>
              <div className="mt-4 border-t border-gray-800 pt-4 flex justify-between items-center">
                <p className="text-2xl font-black text-white italic">{u.precio}</p>
                <button onClick={() => abrirWhatsApp(u.modelo)} className="bg-white text-black px-4 py-2 rounded font-black text-[9px] uppercase hover:bg-[#009de1] hover:text-white transition-all">Consultar</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* UBICACIÓN */}
      <section id="ubicacion" className="bg-[#050505] py-16 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase italic mb-6 italic tracking-tighter">Nuestra <span className="text-[#009de1]">Ubicación</span></h2>
            <div className="bg-[#111] p-6 rounded-lg border-l-4 border-l-[#009de1]">
              <p className="text-white font-bold text-sm">Jorge Ortiz Automóviles</p>
              <p className="text-gray-400 text-xs">Severo del Castillo 4024, Corralitos, Mendoza</p>
              <a href="https://maps.google.com/maps/contrib/111261004271738004999" target="_blank" rel="noreferrer" className="inline-block mt-4 text-[#009de1] text-[9px] font-black uppercase tracking-widest">📍 Abrir GPS</a>
            </div>
          </div>
          <div className="h-[350px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all border border-gray-800">
            <iframe title="Mapa" src="https://maps.google.com/?cid=8717864191060499728&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ5" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer className="p-10 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">Jorge Ortiz Automotores • 2026</p>
      </footer>
    </div>
  );
}

export default App;
