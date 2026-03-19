import React, { useState } from 'react';
import logoJorge from './assets/image.png'; // Tu logo oficial

const unidades = [
  { 
    id: 1, 
    marca: "TOYOTA", 
    modelo: "Hilux 2.8 SRX 4x4", 
    anio: 2023, 
    precio: "u$s 44.500", 
    categoria: "Camionetas",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 2, 
    marca: "HONDA", 
    modelo: "CB300F Twister", 
    anio: 2024, 
    precio: "$ 6.200.000", 
    categoria: "Motos",
    img: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 3, 
    marca: "VOLKSWAGEN", 
    modelo: "Amarok V6 Extreme", 
    anio: 2022, 
    precio: "u$s 39.000", 
    categoria: "Camionetas",
    img: "https://images.unsplash.com/photo-1606577924006-27d39b132ee6?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 4, 
    marca: "FORD", 
    modelo: "Ranger Limited V6", 
    anio: 2024, 
    precio: "u$s 48.200", 
    categoria: "Camionetas",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 5, 
    marca: "KAWASAKI", 
    modelo: "Ninja 400 ABS", 
    anio: 2023, 
    precio: "u$s 12.500", 
    categoria: "Motos",
    img: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800"
  }
];

function App() {
  const [filtro, setFiltro] = useState('Todos');
  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  // Función de WhatsApp centralizada
  const abrirWhatsApp = (modelo = "Consulta General") => {
    const mensaje = encodeURIComponent(`Hola Jorge, estoy viendo la unidad ${modelo} en tu web y me interesa recibir más información.`);
    // He puesto un número de Mendoza de ejemplo (cámbialo por el real de Jorge)
    window.open(`https://wa.me/5492610000000?text=${mensaje}`, '_blank');
  };

  // Función para scroll suave al stock
  const scrollToStock = () => {
    const element = document.getElementById('stock-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased selection:bg-[#009de1] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Jorge Ortiz Automoviles" className="h-10 md:h-14 object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button onClick={scrollToStock} className="hover:text-[#009de1] transition-all border-b-2 border-transparent hover:border-[#009de1] pb-1">Stock Actual</button>
            <button onClick={() => alert('Próximamente: Simulador de créditos prendarios Santander/BBVA.')} className="hover:text-[#009de1] transition-all border-b-2 border-transparent hover:border-[#009de1] pb-1">Financiación</button>
            <button onClick={() => abrirWhatsApp()} className="hover:text-[#009de1] transition-all border-b-2 border-transparent hover:border-[#009de1] pb-1">Contacto</button>
          </div>

          <button onClick={() => abrirWhatsApp("Tasación de mi usado")} className="bg-[#009de1] hover:bg-blue-500 text-white px-6 py-2 rounded font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* HERO / HEADER */}
      <header className="py-24 px-6 text-center bg-gradient-to-b from-black via-[#0a0a0a] to-[#111]">
        <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h2>
        <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold mb-14 max-w-2xl mx-auto">
          Ingeniería en Automotores • Unidades Seleccionadas • Mendoza
        </p>
        
        {/* FILTROS INTERACTIVOS */}
        <div className="flex justify-center gap-4 flex-wrap">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)}
              className={`px-12 py-4 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all border ${
                filtro === cat 
                  ? 'bg-[#009de1] border-[#009de1] text-white shadow-2xl shadow-blue-900/50 scale-105' 
                  : 'bg-transparent border-gray-800 text-gray-600 hover:border-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE VEHICULOS */}
      <main id="stock-section" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6 pb-40">
        {filtrados.map(u => (
          <div key={u.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-900 hover:border-[#009de1]/60 transition-all duration-500 shadow-2xl">
            {/* Contenedor Imagen con Efecto Zoom */}
            <div className="relative h-72 overflow-hidden">
              <img 
                src={u.img} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" 
                alt={u.modelo} 
              />
              <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg text-[12px] font-black border border-gray-800 shadow-2xl">
                MODELO {u.anio}
              </div>
              <div className="absolute bottom-4 left-6">
                <span className="bg-[#009de1] text-white text-[9px] font-black px-3 py-1 rounded uppercase tracking-tighter shadow-lg">
                  Disponible
                </span>
              </div>
            </div>
            
            <div className="p-10">
              <div className="mb-8">
                <span className="text-[#009de1] text-[11px] font-black uppercase tracking-[0.3em]">{u.marca}</span>
                <h3 className="text-3xl font-black tracking-tighter mt-2 italic uppercase leading-none">{u.modelo}</h3>
              </div>

              <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-8">
                <div>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-1">Precio Sugerido</p>
                  <p className="text-4xl font-black text-white leading-none tracking-tighter">{u.precio}</p>
                </div>
                <div className="text-right text-[10px] text-gray-600 font-bold uppercase italic leading-tight">
                  Entrega <br/> Final Hoy
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => abrirWhatsApp(u.modelo)}
                  className="w-full py-5 bg-white text-black font-black text-[12px] uppercase rounded-xl hover:bg-[#009de1] hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-[#009de1]/20"
                >
                  Consultar Disponibilidad
                </button>
                <button className="w-full py-3 text-gray-600 font-black text-[10px] uppercase hover:text-white transition-colors tracking-widest border border-transparent hover:border-gray-800 rounded-lg">
                  Ver Detalles Técnicos
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-black py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-12 md:gap-24 opacity-20 grayscale mb-12 pointer-events-none flex-wrap">
            <span className="font-black text-[11px] tracking-[0.2em]">SANTANDER RIO</span>
            <span className="font-black text-[11px] tracking-[0.2em]">BBVA PRENDARIOS</span>
            <span className="font-black text-[11px] tracking-[0.2em]">VISA EXCLUSIVE</span>
          </div>
          <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.6em] mb-4">
            Desarrollado con Arquitectura de Alta Performance Digital
          </p>
          <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest">
            JORGE ORTIZ AUTOMOTORES © 2026 • Mendoza, Argentina
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;