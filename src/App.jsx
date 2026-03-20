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
    img: "https://http2.mlstatic.com/D_NQ_NP_629828-MLA74649725510_022024-O.webp"
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
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 5, 
    marca: "KAWASAKI", 
    modelo: "Ninja 400 ABS", 
    anio: 2023, 
    precio: "u$s 12.500", 
    categoria: "Motos",
    img: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?auto=format&fit=crop&q=80&w=800"
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic text-white">
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

      {/* GRILLA */}
      <main id="stock" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="group bg-[#111] rounded-xl overflow-hidden border border-gray-900 hover:border-[#009de1]/50 transition-all duration-500 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={u.img} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt={u.modelo} />
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
                  <p className="text-3xl font-black text-white">{u.precio}</p>
                </div>
                <div className="text-right text-[9px] text-gray-600 font-bold uppercase italic leading-none">Entrega<br/>Inmediata</div>
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

      {/* SECCIÓN UBICACIÓN CON MAPA */}
      <section id="ubicacion" className="bg-[#050505] py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic mb-6">Nuestra <span className="text-[#009de1]">Casa Central</span></h2>
            <p className="text-gray-400 mb-8 font-bold text-sm tracking-wide uppercase">
              Vení a conocer tu próximo vehículo en nuestras sucursales de Corralitos, Guaymallén.
            </p>
            <div className="space-y-4">
              <div className="bg-[#111] p-5 rounded border border-gray-800">
                <p className="text-[#009de1] text-[10px] font-black uppercase mb-1">Sucursal 1</p>
                <p className="text-white font-bold text-sm">Severo del Castillo 4024, Mendoza</p>
              </div>
              <div className="bg-[#111] p-5 rounded border border-gray-800">
                <p className="text-[#009de1] text-[10px] font-black uppercase mb-1">Sucursal 2</p>
                <p className="text-white font-bold text-sm">Severo del Castillo 4515, Mendoza</p>
              </div>
            </div>
          </div>
          <div className="h-[400px] rounded-xl overflow-hidden border-2 border-gray-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.882483168233!2d-68.7303023!3d-32.9012435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e121b0ec6e525%3A0x7cfc134ae4425d11!2sJorge%20Ortiz%20Autom%C3%B3viles!5e0!3m2!1ses-419!2sar!4v1709850000000!5m2!1ses-419!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-black p-16 text-center">
        <div className="flex justify-center gap-12 opacity-20 grayscale mb-8 pointer-events-none flex-wrap">
          <span className="font-black text-xs">SANTANDER</span>
          <span className="font-black text-xs">BBVA</span>
          <span className="font-black text-xs">MERCADO PAGO</span>
        </div>
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">
          JORGE ORTIZ AUTOMOTORES • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
