import React, { useState, useEffect } from 'react';
import { db } from "../firebase"; 
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, "autos"), orderBy("fecha", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAutos(docs);
        setCargando(false);
      }, (error) => {
        console.error("Error en Firebase:", error);
        setCargando(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.error("Error al conectar:", err);
      setCargando(false);
    }
  }, []);

  if (cargando) return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3">Cargando stock...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-black text-white p-6 shadow-xl mb-8 border-b-4 border-blue-600 text-center italic">
        <h1 className="text-2xl font-black tracking-tighter uppercase">
          JORGE ORTIZ <span className="text-blue-500 underline">AUTOMOTORES</span>
        </h1>
        <p className="text-[10px] opacity-70 tracking-[0.3em] uppercase mt-1">Excelencia en Selección</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {autos.length === 0 ? (
          <div className="col-span-full text-center p-20 text-gray-500">No hay vehículos cargados actualmente.</div>
        ) : (
          autos.map((auto) => (
            <CardAuto key={auto.id} auto={auto} />
          ))
        )}
      </div>
    </div>
  );
};

const CardAuto = ({ auto }) => {
  // Validamos que el precio sea un número para que no rompa la calculadora
  const precioLimpio = Number(auto.precio) || 0;
  const [entrega, setEntrega] = useState(precioLimpio * 0.5);
  
  // Si el precio cambió externamente, actualizamos la entrega
  useEffect(() => {
    setEntrega(precioLimpio * 0.5);
  }, [precioLimpio]);

  const saldo = precioLimpio - entrega;
  const cuotaEstimada = saldo > 0 ? (saldo * 1.65) / 12 : 0;

  const handleWhatsApp = () => {
    const msg = `Hola Jorge! Me interesa el ${auto.marca || ''} ${auto.modelo || ''} (${auto.año || ''}). Lo vi en la web.`;
    window.open(`https://wa.me/549261XXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-200 transition-all hover:shadow-blue-200/50">
      <div className="relative h-60 w-full overflow-hidden bg-gray-200">
        {auto.estado === 'reservado' && (
          <div className="absolute inset-0 bg-orange-600/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <div className="text-center border-4 border-white p-2 rounded-lg rotate-[-10deg]">
              <span className="text-white font-black text-2xl uppercase">RESERVADO</span>
            </div>
          </div>
        )}

        {auto.estado === 'vendido' && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[3px] z-20 flex items-center justify-center">
            <span className="text-white font-black text-4xl border-4 border-red-600 px-4 py-1 -rotate-12 italic">VENDIDO</span>
          </div>
        )}

        {auto.url ? (
          <img 
            src={auto.url} 
            alt={auto.modelo}
            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${auto.estado === 'vendido' ? 'grayscale' : ''}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">Sin Foto</div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">{auto.marca || 'S/M'} {auto.modelo || 'S/M'}</h2>
          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded italic">{auto.año || '---'}</span>
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Precio Especial</p>
          <p className="text-3xl font-black text-blue-700">
            {auto.estado === 'vendido' ? '---' : `$${precioLimpio.toLocaleString('es-AR')}`}
          </p>
        </div>

        {auto.estado !== 'vendido' && precioLimpio > 0 && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <p className="text-[9px] font-black text-blue-400 uppercase mb-3 text-center tracking-widest">Calculadora de Cuotas</p>
            <input 
              type="range" 
              min="0" 
              max={precioLimpio} 
              step="50000"
              value={entrega}
              onChange={(e) => setEntrega(Number(e.target.value))}
              className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700 mb-4"
            />
            <div className="flex justify-between items-center text-center">
              <div className="flex-1">
                <p className="text-[9px] text-gray-500 uppercase">Entrega</p>
                <p className="font-bold text-gray-800 text-sm">${Number(entrega).toLocaleString('es-AR')}</p>
              </div>
              <div className="w-px h-8 bg-blue-200 mx-2"></div>
              <div className="flex-1">
                <p className="text-[9px] text-blue-600 uppercase font-bold italic">12 cuotas de</p>
                <p className="font-black text-blue-700 text-sm">${Number(cuotaEstimada).toLocaleString('es-AR', {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleWhatsApp}
          disabled={auto.estado === 'vendido'}
          className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 ${
            auto.estado === 'vendido' ? 'bg-gray-300 text-gray-500' : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <span>📲</span> {auto.estado === 'vendido' ? 'Vendido' : 'Consultar'}
        </button>
      </div>
    </div>
  );
};

export default Catalogo;
