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
    img: "data:image/jpeg;base64,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"
  },
  { 
    id: 4, 
    marca: "FORD", 
    modelo: "Ranger Limited V6", 
    anio: 2024, 
    precio: "u$s 48.200", 
    categoria: "Camionetas",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 5, 
    marca: "KAWASAKI", 
    modelo: "Ninja 400 ABS", 
    anio: 2023, 
    precio: "u$s 12.500", 
    categoria: "Motos",
    img: "https://i0.wp.com/automundo.com.ar/wp-content/uploads/2021/08/Kawasaki-2.jpg?fit=1200%2C800&ssl=1"
  }
];

function App() {
  const [filtro, setFiltro] = useState('Todos');
  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo Jorge Ortiz" className="h-10 md:h-14 object-contain" />
          
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button onClick={() => scrollToSection('stock')} className="hover:text-[#009de1] transition-colors">Stock Actual</button>
            <button onClick={() => alert('Próximamente: Simulador de créditos')} className="hover:text-[#009de1] transition-colors">Financiación</button>
            <button onClick={() => scrollToSection('ubicacion')} className="hover:text-[#009de1] transition-colors">Ubicación</button>
          </div>

          <button onClick={() => abrirWhatsApp("Tasación de usado")} className="bg-[#009de1] text-white px-5 py-2 rounded font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">
            Vender mi unidad
          </button>
        </div>
      </nav>

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
                onError={(e) => {e.target.src = "https://via.placeholder.com/800x600?text=Cargando+Imagen..."}} 
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

      {/* SECCIÓN UBICACIÓN - JORGE ORTIZ AUTOMÓVILES */}
      <section id="ubicacion" className="bg-[#050505] py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic mb-6">Nuestra <span className="text-[#009de1]">Ubicación</span></h2>
            <div className="space-y-4">
              <div className="bg-[#111] p-6 rounded-lg border border-[#009de1]/40 border-l-8 border-l-[#009de1] shadow-2xl shadow-[#009de1]/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">Sucursal Principal</p>
                  <div className="bg-[#009de1] text-white text-[9px] font-black px-2 py-0.5 rounded italic">★ 4.5 (166)</div>
                </div>
                <p className="text-xl font-black text-white italic uppercase tracking-tighter mb-1">Jorge Ortiz Automóviles</p>
                <p className="text-gray-400 text-sm font-bold">Severo del Castillo 4024, M5527 Corralitos, Mendoza</p>
                
                {/* BOTÓN DE NAVEGACIÓN DIRECTA */}
                <a 
                  href="https://www.google.com/maps/dir//Jorge+Ortiz+Autom%C3%B3viles,+Severo+del+Castillo+4024,+Corralitos,+Mendoza,+Argentina/data=!4m9!4m8!1m0!1m5!1m1!19sChIJJeXGDhsSfpYREF1C5EoT_Hg!2m2!1d-68.7004733!2d-32.905912799999996!3e0!11m1!6b1" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center mt-6 bg-white text-black px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-[#009de1] hover:text-white transition-all shadow-lg"
                >
                  <span className="mr-2">📍</span> Iniciar navegación GPS
                </a>
              </div>
              
              <div className="bg-[#111] p-5 rounded border border-gray-900 opacity-60">
                <p className="text-gray-500 text-[10px] font-black uppercase mb-1">Segunda Sucursal</p>
                <p className="text-white font-bold text-sm">Severo del Castillo 4515, Corralitos</p>
              </div>
            </div>
          </div>
          
          {/* MAPA CON EL PUNTO EXACTO */}
          <div className="h-[450px] rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl transition-all duration-700 hover:border-[#009de1]/50 group relative">
            <iframe 
              title="Ubicación Jorge Ortiz Automóviles"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.5678!2d-68.7030!3d-32.9059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e121b06c6c525%3A0x78fc134ae4425041!2sJorge%20Ortiz%20Automoviles!5e0!3m2!1ses-419!2sar!4v1710890000000!5m2!1ses-419!2sar"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl"></div>
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
