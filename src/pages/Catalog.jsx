import React, { useState } from 'react';
import logoJorge from '../assets/image.png';

const initialUnidades = [
  { id: 1, marca: "TOYOTA", modelo: "Hilux 2.8 SRX 4x4", anio: 2023, precio: "u$s 44.500", categoria: "Camionetas", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKquU_TOGhefoqctLLwIN6HYlzaNLUtqdFg&s" },
  { id: 2, marca: "HONDA", modelo: "CB300F Twister", anio: 2024, precio: "$ 6.200.000", categoria: "Motos", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0dAVJfcEfJtZAFdCWkrqC3qGAUAzhbWhQw&s" },
  { id: 3, marca: "VOLKSWAGEN", modelo: "Amarok V6 Extreme", anio: 2022, precio: "u$s 39.000", categoria: "Camionetas", img: "https://http2.mlstatic.com/D_NQ_NP_906950-MLA74116853270_012024-O.webp" },
  { id: 4, marca: "FORD", modelo: "Ranger Limited V6", anio: 2024, precio: "u$s 48.200", categoria: "Camionetas", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" }
];

const Catalog = ({ unidadesExternas = [] }) => {
  // Combinamos el stock inicial con lo que se agregue desde el panel
  const todasLasUnidades = [...unidadesExternas, ...initialUnidades];
  const [filtro, setFiltro] = useState('Todos');

  const abrirWhatsApp = (modelo) => {
    const nro = "542615878806";
    const msg = encodeURIComponent(`Hola Jorge, consulto por: ${modelo}`);
    window.open(`https://wa.me/${nro}?text=${msg}`, '_blank');
  };

  const filtrados = filtro === 'Todos' ? todasLasUnidades : todasLasUnidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
          <button onClick={() => abrirWhatsApp("Tasación")} className="bg-[#009de1] text-white px-4 py-2 rounded font-black text-[10px] uppercase">
            Vender mi unidad
          </button>
        </div>
      </nav>

      <header className="py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h1>
        <div className="flex justify-center gap-2 mt-8">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)} 
              className={`px-6 py-2 text-[10px] font-black uppercase border transition-all ${filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="bg-[#111] rounded-xl border border-gray-900 overflow-hidden shadow-2xl group">
            <div className="h-64 overflow-hidden">
              <img src={u.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={u.modelo} />
            </div>
            <div className="p-8">
              <span className="text-[#009de1] text-[10px] font-black uppercase">{u.marca} {u.anio}</span>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{u.modelo}</h3>
              <div className="mt-6 flex justify-between items-center border-t border-gray-800 pt-6">
                <p className="text-3xl font-black italic">{u.precio}</p>
                <button onClick={() => abrirWhatsApp(u.modelo)} className="bg-white text-black px-4 py-2 rounded font-black text-[10px] uppercase hover:bg-[#009de1] hover:text-white transition-all">Consultar</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <section className="bg-[#050505] py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic mb-6">Nuestra <span className="text-[#009de1]">Ubicación</span></h2>
            <div className="bg-[#111] p-6 rounded-lg border-l-8 border-[#009de1]">
              <p className="text-white font-bold text-lg italic">Jorge Ortiz Automóviles</p>
              <p className="text-gray-400 text-sm">Severo del Castillo 4024, Corralitos, Mendoza</p>
              <a href="https://maps.google.com/?q=-32.915722,-68.735111" target="_blank" rel="noreferrer" className="inline-block mt-4 text-[#009de1] text-[10px] font-black uppercase tracking-widest">📍 Iniciar GPS</a>
            </div>
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden border-2 border-gray-800 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.563654486524!2d-68.7376859243315!3d-32.91503377360699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0f2f588c576d%3A0xc3f92e9e38f9720!2sJorge%20Ortiz%20Automoviles!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer className="p-16 text-center opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Jorge Ortiz Automotores • 2026</p>
      </footer>
    </div>
  );
};

export default Catalog;