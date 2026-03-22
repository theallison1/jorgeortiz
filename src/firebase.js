import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// CONFIGURACIÓN OFICIAL DE TU PROYECTO JORGE ORTIZ
const firebaseConfig = {
  apiKey: "AIzaSyA4T4xqBSEtdmnCMvE09s9BeUCqEIFgEuY",
  authDomain: "jorgeortizstock.firebaseapp.com",
  projectId: "jorgeortizstock",
  storageBucket: "jorgeortizstock.firebasestorage.app",
  messagingSenderId: "686441645759",
  appId: "1:686441645759:web:120f71cc03bd57a669680a",
  measurementId: "G-BPH5EPB4S7"
};

// Inicializamos la App
const app = initializeApp(firebaseConfig);

// EXPORTACIÓN DE MÓDULOS
// 1. Base de datos (Firestore) para el stock de autos
export const db = getFirestore(app);

// 2. Autenticación para que solo Jorge entre al panel
export const auth = getAuth(app);

// 3. Storage (Opcional: solo funciona si activás plan de pago Blaze)
export const storage = getStorage(app);

export default app;
