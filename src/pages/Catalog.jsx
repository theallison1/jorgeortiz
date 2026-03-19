import React, { useState } from 'react';
import logoJorge from '../assets/image.png';

const initialUnidades = [
  { id: 1, marca: "TOYOTA", modelo: "Hilux 2.8 SRX 4x4", anio: 2023, precio: "u$s 44.500", categoria: "Camionetas", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKquU_TOGhefoqctLLwIN6HYlzaNLUtqdFg&s" },
  { id: 2, marca: "HONDA", modelo: "CB300F Twister", anio: 2024, precio: "$ 6.200.000", categoria: "Motos", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0dAVJfcEfJtZAFdCWkrqC3qGAUAzhbWhQw&s" },
  { id: 3, marca: "VOLKSWAGEN", modelo: "Amarok V6 Extreme", anio: 2022, precio: "u$s 39.000", categoria: "Camionetas", img: "https://http2.mlstatic.com/D_NQ_NP_906950-MLA74116853270_012024-O.webp" },
];

const Catalog = () => {
  const [unidades] = useState(initialUnidades);
  const [filtro, setFiltro] = useState('Todos');

  const abrirWhatsApp = (modelo) => {
    const nro = "542615878806";
    const msg = encodeURIComponent(`Hola Jorge, consulto por: ${modelo}`);
    window.open(`https://wa.me/${nro}?text=${msg}`, '_blank');
  };

  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* NAVBAR CLIENTE */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 sticky top-0 z-50 flex justify-between items-center">
        <img src={logoJorge} alt="Logo" className="h-10 md:h-14" />
        <button onClick={() => abrirWhatsApp("Consulta General")} className="bg-[#009de1] text-white px-4 py-2 rounded font-black text-[10px] uppercase">
          Vender mi unidad
        </button>
      </nav>

      <header className="py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h1>
        <div className="flex justify-center gap-2 mt-8">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)} className={`px-6 py-2 text-[10px] font-black uppercase border ${filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-500'}`}>{cat}</button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 pb-20">
        {filtrados.map(u => (
          <div key={u.id} className="bg-[#111] rounded-xl border border-gray-900 overflow-hidden shadow-2xl">
            <img src={u.img} className="h-64 w-full object-cover" alt={u.modelo} />
            <div className="p-6">
              <span className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">{u.marca}</span>
              <h3 className="text-xl font-black uppercase italic">{u.modelo}</h3>
              <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-4">
                <p className="text-2xl font-black italic">{u.precio}</p>
                <button onClick={() => abrirWhatsApp(u.modelo)} className="bg-white text-black px-4 py-2 rounded font-black text-[9px] uppercase">Consultar</button>
              </div>
            </div>
          </div>
        ))}
      </main>
      
      {/* Ubicación simplificada aquí si querés mantenerla */}
    </div>
  );
};

export default Catalog;