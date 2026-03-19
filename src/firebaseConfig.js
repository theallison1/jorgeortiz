import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "jorge-ortiz-autos.firebaseapp.com",
  projectId: "jorge-ortiz-autos",
  storageBucket: "jorge-ortiz-autos.appspot.com",
  messagingSenderId: "XXXXX",
  appId: "XXXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);