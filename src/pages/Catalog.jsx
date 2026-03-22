import React, { useState, useEffect } from 'react';
import { db } from "../firebase"; // Agregamos un punto extra para "salir" de la carpeta pagesimport { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Escucha de datos de Firebase en tiempo real
  useEffect(() => {
    const q = query(collection(db, "autos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAutos(docs);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header Estilo Concesionaria */}
      <header className="bg-black text-white p-6 shadow-xl mb-8 border-b-4 border-blue-600">
        <h1 className="text-2xl font-black tracking-tighter text-center italic">
          JORGE ORTIZ <span className="text-blue-500 underline">AUTOMOTORES</span>
        </h1>
        <p className="text-[10px] text-center opacity-70 tracking-[0.3em] uppercase mt-1">Excelencia en Selección</p>
      </header>

      {/* Grilla de Autos */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {autos.map((auto) => (
          <CardAuto key={auto.id} auto={auto} />
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE INTERNO: TARJETA DE AUTO ---
const CardAuto = ({ auto }) => {
  // Estado para la entrega inicial (arranca en 50% del valor)
  const [entrega, setEntrega] = useState(Number(auto.precio) * 0.5);
  
  // Cálculo de financiación aproximado (TNA 65% / 12 meses)
  const saldo = Number(auto.precio) - entrega;
  const cuotaEstimada = saldo > 0 ? (saldo * 1.65) / 12 : 0;

  const handleWhatsApp = () => {
    const msg = `Hola Jorge! Me interesa el ${auto.marca} ${auto.modelo} (${auto.año}). Lo vi en la web.`;
    window.open(`https://wa.me/549261XXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-blue-200/50 transition-shadow">
      
      {/* Sección Imagen con Overlays */}
      <div className="relative h-60 w-full overflow-hidden">
        
        {/* Overlay RESERVADO */}
        {auto.estado === 'reservado' && (
          <div className="absolute inset-0 bg-orange-600/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <div className="text-center border-4 border-white p-2 rounded-lg rotate-[-10deg] shadow-2xl">
              <span className="text-white font-black text-2xl tracking-tighter uppercase">RESERVADO</span>
            </div>
          </div>
        )}

        {/* Overlay VENDIDO */}
        {auto.estado === 'vendido' && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[3px] z-20 flex items-center justify-center">
            <span className="text-white font-black text-4xl border-4 border-red-600 px-4 py-1 -rotate-12 shadow-2xl italic">
              VENDIDO
            </span>
          </div>
        )}

        <img 
          src={auto.url} 
          alt={auto.modelo}
          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${auto.estado === 'vendido' ? 'grayscale' : ''}`}
        />
      </div>

      {/* Datos del Vehículo */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">{auto.marca} {auto.modelo}</h2>
          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded italic">{auto.año}</span>
        </div>

        {/* Precio Contado */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Precio Especial</p>
          <p className="text-3xl font-black text-blue-700">
            {auto.estado === 'vendido' ? '---' : `$${Number(auto.precio).toLocaleString('es-AR')}`}
          </p>
        </div>

        {/* Simulador (Solo si está disponible o reservado) */}
        {auto.estado !== 'vendido' && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <p className="text-[9px] font-black text-blue-400 uppercase mb-3 text-center tracking-widest">Calculadora de Cuotas</p>
            
            <input 
              type="range" 
              min="0" 
              max={auto.precio} 
              step="50000"
              value={entrega}
              onChange={(e) => setEntrega(Number(e.target.value))}
              className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700 mb-4"
            />

            <div className="flex justify-between items-center text-center">
              <div className="flex-1">
                <p className="text-[9px] text-gray-500 uppercase">Entrega inicial</p>
                <p className="font-bold text-gray-800 text-sm">${Number(entrega).toLocaleString('es-AR')}</p>
              </div>
              <div className="w-px h-8 bg-blue-200 mx-2"></div>
              <div className="flex-1">
                <p className="text-[9px] text-gray-500 uppercase font-bold text-blue-600 italic">12 cuotas de</p>
                <p className="font-black text-blue-700 text-sm">${Number(cuotaEstimada).toLocaleString('es-AR', {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </div>
        )}

        {/* Botón WhatsApp */}
        <button 
          onClick={handleWhatsApp}
          disabled={auto.estado === 'vendido'}
          className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
            auto.estado === 'vendido' 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 text-white active:scale-95'
          }`}
        >
          <span className="text-xl">📲</span> 
          {auto.estado === 'vendido' ? 'Vendido' : 'Consultar'}
        </button>
      </div>
    </div>
  );
};

export default Catalogo;
