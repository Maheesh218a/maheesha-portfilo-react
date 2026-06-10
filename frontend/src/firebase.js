import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr1ZGwrwT6dCYHxD6Q__cSvmivGYYNyq0",
  authDomain: "maheeshaportfolio.firebaseapp.com",
  projectId: "maheeshaportfolio",
  storageBucket: "maheeshaportfolio.firebasestorage.app",
  messagingSenderId: "566094521200",
  appId: "1:566094521200:web:a229cdca6c79f1de0d65b5",
  measurementId: "G-MFTKRJV2TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
