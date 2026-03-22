import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Asegurate de que la ruta a tu config de firebase sea correcta
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const CatalogoPublico = () => {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. ESCUCHA DE DATOS EN TIEMPO REAL
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
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header Estilo Concesionaria */}
      <header className="bg-black text-white p-6 shadow-xl mb-8">
        <h1 className="text-2xl font-black tracking-tighter text-center">
          JORGE ORTIZ <span className="text-blue-500">AUTOMOTORES</span>
        </h1>
        <p className="text-[10px] text-center opacity-70 tracking-[0.2em] uppercase">Mendoza • Argentina</p>
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

// --- COMPONENTE HIJO: LA TARJETA DEL AUTO ---
const CardAuto = ({ auto }) => {
  const [entrega, setEntrega] = useState(auto.precio * 0.5); // Default 50% de entrega
  
  // Cálculo de financiación (TNA 65% aprox)
  const saldo = auto.precio - entrega;
  const cuotaEstimada = saldo > 0 ? (saldo * 1.65) / 12 : 0;

  const handleWhatsApp = () => {
    const msg = `Hola Jorge! Me interesa el ${auto.marca} ${auto.modelo} (${auto.año}) que vi en la App.`;
    window.open(`https://wa.me/549261XXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100">
      
      {/* Sección Imagen con Overlays de Estado */}
      <div className="relative h-64 w-full">
        {/* Cartel RESERVADO */}
        {auto.estado === 'reservado' && (
          <div className="absolute inset-0 bg-orange-600/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <div className="text-center border-2 border-white p-4 rounded-xl rotate-[-5deg] shadow-2xl">
              <span className="text-white font-black text-3xl tracking-tighter">RESERVADO</span>
            </div>
          </div>
        )}

        {/* Cartel VENDIDO */}
        {auto.estado === 'vendido' && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[4px] z-20 flex items-center justify-center">
            <span className="text-white font-black text-4xl border-4 border-red-500 px-6 py-2 -rotate-12 shadow-2xl italic">
              VENDIDO
            </span>
          </div>
        )}

        <img 
          src={auto.url} 
          alt={auto.modelo}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${auto.estado === 'vendido' ? 'grayscale' : ''}`}
        />
      </div>

      {/* Info del Vehículo */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-2xl font-extrabold text-gray-800 uppercase leading-tight">{auto.marca}</h2>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{auto.año}</span>
        </div>
        <p className="text-lg text-gray-600 font-medium mb-4">{auto.modelo}</p>

        {/* Precio */}
        <div className="mb-6">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Precio Contado</p>
          <p className="text-3xl font-black text-blue-700">
            {auto.estado === 'vendido' ? '---' : `$${Number(auto.precio).toLocaleString('es-AR')}`}
          </p>
        </div>

        {/* Simulador de Cuotas (Solo si no está vendido) */}
        {auto.estado !== 'vendido' && (
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-6">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-3 text-center tracking-widest italic">Simulador de Financiación</p>
            
            <input 
              type="range" 
              min="0" 
              max={auto.precio} 
              step="100000"
              value={entrega}
              onChange={(e) => setEntrega(Number(e.target.value))}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-4"
            />

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="border-r border-gray-200">
                <p className="text-[10px] text-gray-400">Entrega inicial</p>
                <p className="font-bold text-gray-700 text-sm">${Number(entrega).toLocaleString('es-AR')}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">12 cuotas de</p>
                <p className="font-bold text-blue-600 text-sm">${Number(cuotaEstimada).toLocaleString('es-AR', {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </div>
        )}

        {/* Botonera Acción */}
        <div className="mt-auto space-y-3">
          <button 
            onClick={handleWhatsApp}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              auto.estado === 'vendido' 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white active:scale-95'
            }`}
            disabled={auto.estado === 'vendido'}
          >
            <span className="text-xl">📲</span> 
            {auto.estado === 'vendido' ? 'UNIDAD NO DISPONIBLE' : 'CONSULTAR DISPONIBILIDAD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogoPublico;
