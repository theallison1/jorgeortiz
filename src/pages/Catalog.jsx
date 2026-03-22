import React, { useState, useEffect } from 'react';
import { db } from "../firebase"; 
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Escuchamos la colección "autos"
    const q = query(collection(db, "autos")); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Datos recibidos:", docs); // ESTO ES PARA VER EN CONSOLA SI LLEGAN
      setAutos(docs);
      setCargando(false);
    }, (error) => {
      console.error("Error Firebase:", error);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-6 text-center shadow-lg mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">
           JORGE ORTIZ <span className="text-blue-500">AUTOMOTORES</span>
        </h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autos.map((auto) => (
          <div key={auto.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative">
            
            {/* --- LOS CARTELES DE ESTADO (SOLO SI EXISTE EL CAMPO ESTADO) --- */}
            {auto.estado === 'reservado' && (
              <div className="absolute inset-0 bg-orange-500/70 z-10 flex items-center justify-center">
                <span className="text-white font-black text-2xl border-2 border-white px-4 py-1 rotate-[-10deg]">RESERVADO</span>
              </div>
            )}
            {auto.estado === 'vendido' && (
              <div className="absolute inset-0 bg-gray-900/70 z-10 flex items-center justify-center">
                <span className="text-white font-black text-2xl border-2 border-red-500 px-4 py-1 rotate-[-10deg]">VENDIDO</span>
              </div>
            )}

            {/* --- IMAGEN: Cambiá 'url' por el nombre que uses en Firebase si es distinto --- */}
            <img 
              src={auto.url || auto.imagen || 'https://via.placeholder.com/400x300?text=Sin+Foto'} 
              className="w-full h-56 object-cover"
              alt="auto"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold uppercase">{auto.marca} {auto.modelo || auto.nombre}</h2>
              <p className="text-gray-500 mb-2">Año: {auto.año || auto.anio}</p>
              
              <p className="text-2xl font-black text-blue-600">
                ${Number(auto.precio || 0).toLocaleString('es-AR')}
              </p>

              <button 
                onClick={() => window.open(`https://wa.me/549261XXXXXXX?text=Me interesa el ${auto.marca}`)}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                CONSULTAR WHATSAPP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
