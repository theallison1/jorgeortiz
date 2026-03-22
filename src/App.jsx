import React, { useState, useEffect } from 'react';
import { db } from "../firebase"; 
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cambiamos a la colección que uses (autos o vehiculos)
    const q = query(collection(db, "autos")); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAutos(docs);
      setCargando(false);
    }, (error) => {
      console.error("Error Firebase:", error);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) return <div className="p-10 text-center text-white">Cargando catálogo...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {autos.map((auto) => (
        <div key={auto.id} className="bg-white rounded-2xl shadow-2xl overflow-hidden relative border border-gray-200">
          
          {/* OVERLAYS DE ESTADO */}
          {auto.estado === 'reservado' && (
            <div className="absolute inset-0 bg-orange-600/80 z-10 flex items-center justify-center backdrop-blur-[1px]">
              <span className="text-white font-black text-2xl border-4 border-white px-4 py-1 rotate-[-10deg] uppercase">RESERVADO</span>
            </div>
          )}
          {auto.estado === 'vendido' && (
            <div className="absolute inset-0 bg-gray-900/80 z-10 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-black text-3xl border-4 border-red-600 px-4 py-1 -rotate-12 uppercase italic">VENDIDO</span>
            </div>
          )}

          {/* IMAGEN: Probamos con url o imagen (lo que tengas en Firebase) */}
          <div className="h-60 overflow-hidden">
            <img 
              src={auto.url || auto.imagen || 'https://via.placeholder.com/400x300?text=Cargando+Foto...'} 
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${auto.estado === 'vendido' ? 'grayscale' : ''}`}
              alt={auto.modelo}
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-black text-gray-800 uppercase italic leading-none">
                {auto.marca} <span className="block text-sm font-normal text-gray-500 not-italic">{auto.modelo}</span>
              </h2>
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded">{auto.año}</span>
            </div>
            
            <p className="text-3xl font-black text-blue-700 mt-2 mb-4">
              {auto.estado === 'vendido' ? '---' : `$${Number(auto.precio || 0).toLocaleString('es-AR')}`}
            </p>

            {/* CALCULADORA RÁPIDA (Solo si no está vendido) */}
            {auto.estado !== 'vendido' && auto.precio > 0 && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-4 text-center">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter mb-1 italic">Financiación Sugerida</p>
                <p className="text-sm font-bold text-gray-700">
                  Cuotas desde <span className="text-blue-700 font-black">${Number((auto.precio * 0.5 * 1.6) / 12).toLocaleString('es-AR', {maximumFractionDigits:0})}</span>
                </p>
                <p className="text-[8px] text-gray-400 uppercase mt-1">Entregando el 50%</p>
              </div>
            )}

            <button 
              onClick={() => window.open(`https://wa.me/549261XXXXXXX?text=Hola Jorge! Me interesa el ${auto.marca} ${auto.modelo}`)}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                auto.estado === 'vendido' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 active:scale-95'
              }`}
            >
              {auto.estado === 'vendido' ? 'Unidad Vendida' : 'Consultar WhatsApp'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
