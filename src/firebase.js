import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4T4xqBSEtdmnCMvE09s9BeUCqEIFgEuY",
  authDomain: "jorgeortizstock.firebaseapp.com",
  projectId: "jorgeortizstock",
  storageBucket: "jorgeortizstock.firebasestorage.app",
  messagingSenderId: "686441645759",
  appId: "1:686441645759:web:120f71cc03bd57a669680a",
  measurementId: "G-BPH5EPB4S7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Esta es la base de datos que exportamos